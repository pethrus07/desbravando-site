// Transforma o PACOTE DE COMUNICAÇÃO de uma expedição (o .zip que sai do Controle de
// Eventos, aba Comunicação) nos CSVs das coleções do CMS da Wix.
//
//   node design/do-briefing.mjs <pacote>            só escreve os CSVs
//   node design/do-briefing.mjs <pacote> --subir    escreve e MANDA para o CMS da Wix
//   node design/do-briefing.mjs <pacote> --subir --seco   mostra o que mandaria
//
// <pacote> é o .zip baixado na aba Comunicação, a pasta dele, ou o briefing.json solto.
//
// POR QUE EXISTE
// O briefing foi feito para matar as voltas entre o pedido e a peça. Se o mesmo conteúdo
// precisar ser redigitado no site, as voltas voltam — só que agora no Editor da Wix. Aqui o
// que a pessoa escreveu UMA vez no painel vira linha de coleção, com a data de cada dia
// calculada e a ordem certa de importação.
//
// AS TRÊS REGRAS QUE ESTE ARQUIVO NÃO QUEBRA
//
// 1. NADA INVENTADO. Campo que o briefing não traz sai VAZIO, e a auditoria no fim diz
//    qual é e por quê. `publicado` sai FALSE em tudo: nada vai ao ar sem o Pedro olhar.
//    Preço não existe aqui — nem campo, nem chute (ver cms/LEIA-ME.md).
//
// 2. ".." NÃO É CONTEÚDO. Quem fecha o briefing às vezes põe dois pontos para destravar o
//    campo obrigatório. Isso é campo VAZIO com disfarce; se entrasse como texto, viraria um
//    ".." publicado na página. Aqui vira vazio e entra na lista do que falta.
//
// 3. ERRO DE DIGITAÇÃO É CORRIGIDO E DECLARADO. O texto vai para uma página pública, então
//    "Trevho" não pode subir; mas trocar palavra do cliente em silêncio é pior que o erro.
//    Cada troca sai nomeada na auditoria, com antes e depois.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

/* ── entrada ───────────────────────────────────────────────────────── */
const alvo = process.argv[2];
if (!alvo) {
  console.error('uso: node design/do-briefing.mjs <briefing.json | pasta do pacote>');
  process.exit(1);
}
const SUBIR = process.argv.includes('--subir');
const SECO = process.argv.includes('--seco');

/**
 * Lê `briefing.json` de dentro do .zip, sem descompactar na mão e sem dependência.
 * O pacote do painel grava os arquivos SEM compressão (método 0), então quase sempre é um
 * fatiamento; `inflateRawSync` cobre o caso de alguém recompactar o zip no caminho.
 */
function doZip(caminho) {
  const b = fs.readFileSync(caminho);
  for (let i = 0; i < b.length - 4; i++) {
    if (b.readUInt32LE(i) !== 0x04034b50) continue;          // assinatura do cabeçalho local
    const metodo = b.readUInt16LE(i + 8);
    const compr = b.readUInt32LE(i + 18);
    const nLen = b.readUInt16LE(i + 26);
    const eLen = b.readUInt16LE(i + 28);
    const nome = b.subarray(i + 30, i + 30 + nLen).toString('utf8');
    const ini = i + 30 + nLen + eLen;
    if (!/(^|\/)briefing\.json$/.test(nome)) continue;
    const cru = b.subarray(ini, ini + compr);
    return (metodo === 0 ? cru : zlib.inflateRawSync(cru)).toString('utf8');
  }
  throw new Error(`não achei briefing.json dentro de ${path.basename(caminho)}`);
}

const texto = /\.zip$/i.test(alvo)
  ? doZip(alvo)
  : fs.readFileSync(fs.statSync(alvo).isDirectory() ? path.join(alvo, 'briefing.json') : alvo, 'utf8');
const brf = JSON.parse(texto);

/* ── as duas leituras que valem ─────────────────────────────────────── */
const notas = [];       // o que ficou em branco e por quê
const correcoes = [];   // toda palavra que eu troquei

/** Valor de um campo do briefing. '..', '.', '-' e espaço são ausência, não conteúdo. */
function campo(peca, nome) {
  const p = brf.pecas.find((x) => x.peca === peca);
  const c = p && p.campos.find((x) => x.campo === nome);
  const v = c && c.valor != null ? String(c.valor).trim() : '';
  if (!v || /^[.\-–—\s]+$/.test(v)) {
    if (c && c.obrigatorio) notas.push(`${peca}.${nome} — obrigatório, mas veio ${v ? `"${v}"` : 'vazio'}`);
    return '';
  }
  return v;
}

/** Ortografia só onde o erro é inequívoco. Nada de reescrever a frase da pessoa. */
const TROCAS = [
  [/Len[çc][õo]is/g, 'Lençóis'],
  [/\bTrevho\b/gi, 'Trecho'],
  [/\bCamocin\b/g, 'Camocim'],
  [/\bpercursso\b/gi, 'percurso'],
  // "de X á Y" é crase, não acento agudo. ⚠️ NÃO usar \b aqui: em JavaScript \b é fronteira
  // ASCII, então `á` conta como não-palavra dos dois lados e /\bá\b/ NUNCA casa. A primeira
  // versão disto passou calada e ainda levou junto o `local` de cada dia, que é extraído
  // justamente pela crase. Separador é o espaço, que é o que existe de verdade na frase.
  [/(^|\s)á(?=\s)/g, '$1à'],
];
function limpar(txt) {
  let s = txt;
  for (const [re, bom] of TROCAS) {
    s = s.replace(re, (achado, ...resto) => {
      const trocado = bom.includes('$1') ? bom.replace('$1', resto[0] ?? '') : bom;
      if (achado.trim() !== trocado.trim()) correcoes.push(`${achado.trim() || achado} → ${trocado.trim()}`);
      return trocado;
    });
  }
  return s.replace(/\s+/g, ' ').trim();
}

/* ── datas ─────────────────────────────────────────────────────────── */
const iso = (d) => d.toISOString().slice(0, 10);
const maisDias = (base, n) => { const d = new Date(base + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return iso(d); };

const inicio = campo('contagem', 'data_saida');
// O fim vem na frase do cronograma geral ("Início: … · Fim: …"), não num campo próprio.
const geral = campo('cronograma_geral', 'dias');
const fim = (geral.match(/Fim:\s*(\d{4}-\d{2}-\d{2})/) || [])[1] || '';

/* ── roteiro, dia a dia ────────────────────────────────────────────── */
// "Dia 01: chegada …; Dia 02: Trecho de A à B; Dia 03 Trecho de …"
// O separador é ';' e o 'Dia NN' às vezes vem sem dois-pontos. Tolerar é o trabalho.
const agenda = campo('cronograma_dia', 'agenda');
const roteiro = [];
for (const bruto of agenda.split(';')) {
  const t = bruto.trim();
  if (!t) continue;
  const m = t.match(/^Dia\s*(\d+)\s*:?\s*(.+)$/i);
  if (!m) { notas.push(`roteiro — trecho sem "Dia NN": "${t.slice(0, 50)}"`); continue; }
  const n = Number(m[1]);
  const texto = limpar(m[2]);
  // "Trecho de A à B" é a única coisa que dá para extrair sem inventar.
  // "Trecho de A à B" e também "A à B" solto (o Dia 04 veio sem o "Trecho de"). A exigência
  // de MAIÚSCULA nas duas pontas é o que impede "chegada do grupo à Barreirinhas" de virar
  // trecho — ali "grupo" é minúsculo, e não é origem de nada.
  const tr = texto.match(/(?:de\s+)?\b([A-ZÁÂÃÉÊÍÓÔÕÚÇ][\wÀ-ÿ]*)\s+à\s+([A-ZÁÂÃÉÊÍÓÔÕÚÇ][\wÀ-ÿ]*)/);
  // Dia que não é trecho ainda tem lugar: "chegada do grupo à Barreirinhas", "Exploração pela
  // região de Camocim". Sem isto, 3 dos 7 dias ficam sem local na página.
  const parado = !tr && (texto.match(/(?:à|região de)\s+([A-ZÁÂÃÉÊÍÓÔÕÚÇ][\wÀ-ÿ]*)/) || [])[1];
  const diaIso = inicio ? maisDias(inicio, n - 1) : '';
  roteiro.push({
    dia: n,
    // dd/mm: a página imprime este campo como está, e em ISO saía "2027-05-24" na cara do
    // visitante nos sete dias.
    data: diaIso ? diaIso.split('-').slice(1).reverse().join('/') : '',
    local: tr ? `${tr[1]} → ${tr[2]}` : parado || '',
    titulo: tr ? `${tr[1]} → ${tr[2]}` : texto.replace(/[,;].*$/, ''),
    texto,
    km: '',   // o briefing não pergunta quilometragem
  });
}
if (!roteiro.some((r) => r.km)) notas.push('roteiro.km — o briefing não pergunta quilometragem de trecho');

/* ── hospedagens ───────────────────────────────────────────────────── */
const hospedagens = campo('guia_logistico', 'hospedagem')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)
  .map((nome, i) => ({ expedicao: '', ordem: i + 1, nome, papel: '', onde: '', noites: '', texto: '' }));
if (hospedagens.length) notas.push(`hospedagens — ${hospedagens.length} nomes; falta cidade, noites e papel de cada uma`);

/* ── guia ──────────────────────────────────────────────────────────── */
const guia = [];
const apoio = campo('guia_logistico', 'pontos_apoio');
const levar = campo('guia_logistico', 'o_que_levar');
const conduta = campo('conduta', 'itens');
if (apoio) guia.push({ expedicao: '', categoria: 'Apoio', titulo: 'Pontos de apoio', conteudo: limpar(apoio) });
if (levar) guia.push({ expedicao: '', categoria: 'Preparo', titulo: 'O que levar', conteudo: limpar(levar) });
if (conduta) guia.push({ expedicao: '', categoria: 'Conduta', titulo: 'Off-road consciente', conteudo: limpar(conduta) });

/* ── a expedição ───────────────────────────────────────────────────── */
const nome = limpar(brf.expedicao);
const slug = nome.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const veiculos = campo('adesivo', 'numeros');
const duracaoDias = inicio && fim ? Math.round((Date.parse(fim) - Date.parse(inicio)) / 86400000) + 1 : 0;

// Trava: dia a dia e intervalo de datas TÊM que contar a mesma coisa. Se divergirem, alguém
// escreveu um dia a mais ou a menos e a página sairia com data errada — melhor abortar.
if (duracaoDias && roteiro.length && duracaoDias !== roteiro.length) {
  console.error(`\nABORTADO: o intervalo ${inicio} → ${fim} dá ${duracaoDias} dias, mas o cronograma tem ${roteiro.length}.`);
  console.error('Um dos dois está errado no briefing. Corrija no painel e gere o pacote de novo.');
  process.exit(1);
}

/* ── o que dá para derivar do texto DELE ───────────────────────────────
   Derivar não é inventar: tudo aqui sai de palavra que a pessoa escreveu no briefing. Mas
   também não é afirmação dela, então cada um entra declarado na auditoria. */
const derivados = [];

/* `uf` e `situacao` o script NUNCA chuta: a sigla do estado quando o roteiro cruza três, e o
   rótulo comercial da etiqueta, são escolha de quem vende. Entram por opção de linha de
   comando, ditas em voz alta, ou não entram. */
const opcao = (nome) => {
  const i = process.argv.findIndex((a) => a === `--${nome}` || a.startsWith(`--${nome}=`));
  if (i === -1) return '';
  const a = process.argv[i];
  return (a.includes('=') ? a.split('=').slice(1).join('=') : process.argv[i + 1] || '').trim();
};
const UF_ESCOLHIDA = opcao('uf');
const SITUACAO = opcao('situacao');

// A sequência de cidades, na ordem em que o roteiro passa. Mesmo formato da Costa Doce
// ("Mostardas · Lagoa do Peixe · Tramandaí").
const cidades = [];
for (const r of roteiro) {
  for (const c of (r.local ? r.local.split('→') : []).map((s) => s.trim()).filter(Boolean))
    if (!cidades.includes(c)) cidades.push(c);
}
const regiao = cidades.join(' · ');
if (regiao) derivados.push(`regiao = "${regiao}" (a ordem das cidades do próprio roteiro)`);

// Ponto de encontro: cidade e data do Dia 01. A HORA o briefing não pergunta.
const dia1 = roteiro.find((r) => r.dia === 1);
const cidade1 = dia1 && (dia1.texto.match(/à\s+([A-ZÁÂÃÉÊÍÓÔÕÚÇ][\wÀ-ÿ]*)/) || [])[1];
const pontoEncontro = cidade1 && dia1.data
  ? `${cidade1}, ${dia1.data.split('-').reverse().slice(0, 2).join('/')}`
  : '';
if (pontoEncontro) derivados.push(`pontoEncontro = "${pontoEncontro}" (Dia 01; falta a HORA)`);

const VAZIOS_DE_PROPOSITO = {
  chamada: 'frase de chamada é escrita de marca, não sai do briefing',
  subtitulo: 'idem',
  formato: 'Família / Só Homens / Casais / Corporativa — o briefing não pergunta',
  percurso: 'quilometragem total não existe no briefing',
  destaques: 'não perguntado',
  aeroporto: 'não perguntado',
  sobreDestino: 'texto sobre o destino é redação, não briefing',
  incluso: 'não perguntado',
  naoIncluso: 'não perguntado',
  valorPorPessoa: 'preço nunca é inventado — ver cms/LEIA-ME.md',
  valorPorCasal: 'idem',
  formasPagamento: 'idem', sinal: 'idem', saldo: 'idem',
  politicaCriancas: 'idem', cancelamento: 'idem',
  linkCheckout: 'sai do evento no Wix Events, criado depois',
};

const expedicao = {
  titulo: nome,
  nomeEdicao: `Expedição ${nome}`,
  situacao: 'rascunho',
  dataInicio: inicio,
  dataFim: fim,
  duracao: duracaoDias ? `${duracaoDias} dias` : '',
  uf: UF_ESCOLHIDA,
  regiao,
  pontoEncontro,
  base: roteiro.length ? (roteiro[0].texto.match(/à\s+([A-ZÁÂÃÉÊÍÓÔÕÚÇ][\wÀ-ÿ]*)/) || [])[1] || '' : '',
  veiculos: veiculos ? `${veiculos} UTVs` : '',
  hospedagemNota: '',
  rotuloBotao: '',
  publicado: 'FALSE',
  ...Object.fromEntries(Object.keys(VAZIOS_DE_PROPOSITO).map((k) => [k, ''])),
};
for (const [k, pq] of Object.entries(VAZIOS_DE_PROPOSITO)) notas.push(`${k} — ${pq}`);
for (const r of roteiro) r.expedicao = expedicao.nomeEdicao;
for (const h of hospedagens) h.expedicao = expedicao.nomeEdicao;
for (const g of guia) g.expedicao = expedicao.nomeEdicao;

/* ── escrever, no mesmo formato do csv.mjs ─────────────────────────── */
function csv(colunas, linhas) {
  const cel = (v) => {
    const s = v == null ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [colunas.join(','), ...linhas.map((l) => colunas.map((c) => cel(l[c])).join(','))].join('\n');
}
const DIR = path.join(RAIZ, 'cms', slug);
fs.mkdirSync(DIR, { recursive: true });
const escrever = (nome_, colunas, linhas) => {
  fs.writeFileSync(path.join(DIR, `${nome_}.csv`), '﻿' + csv(colunas, linhas), 'utf8');
  console.log(`${String(linhas.length).padStart(3)} linha(s)  ${slug}/${nome_}.csv`);
};

escrever('1-Expedicoes', ['titulo','subtitulo','uf','nomeEdicao','chamada','situacao','dataInicio','dataFim',
  'duracao','percurso','formato','regiao','base','veiculos','destaques','aeroporto','pontoEncontro','sobreDestino',
  'hospedagemNota','incluso','naoIncluso','valorPorPessoa','valorPorCasal','formasPagamento','sinal','saldo',
  'politicaCriancas','cancelamento','rotuloBotao','linkCheckout','publicado'], [expedicao]);
escrever('2-Roteiro', ['expedicao','dia','data','local','titulo','texto','km'], roteiro);
escrever('3-Hospedagens', ['expedicao','ordem','nome','papel','onde','noites','texto'], hospedagens);
escrever('4-Guia', ['expedicao','categoria','titulo','conteudo'], guia);

/* ── auditoria ─────────────────────────────────────────────────────── */
console.log(`\n${nome} · ${inicio} a ${fim} · ${duracaoDias} dias · ${roteiro.length} dias de roteiro · ${hospedagens.length} hospedagens`);
console.log(`briefing ${brf.status}, ${brf.preenchimento}`);

const unicas = [...new Set(correcoes)];
if (unicas.length) {
  console.log(`\nTROQUEI ${unicas.length} palavra(s) — confira, é texto do cliente:`);
  for (const c of unicas) console.log('  ' + c);
}
console.log(`\nEM BRANCO (${notas.length}) — nada aqui foi chutado:`);
for (const n of notas) console.log('  · ' + n);
console.log('\npublicado=FALSE em tudo. Importe 1-Expedicoes primeiro; as outras referenciam.');

// A auditoria também vai para arquivo: na hora de importar, quem está no Editor da Wix não
// tem mais o terminal aberto, e é justamente ali que a pergunta "isto está vazio por quê?"
// aparece. Lista no terminal é lista que some.
fs.writeFileSync(path.join(DIR, 'FALTA.md'), [
  `# ${nome} — o que falta antes de publicar`,
  '',
  `Gerado de \`briefing.json\` (${brf.status}, ${brf.preenchimento}) em ${new Date().toISOString().slice(0, 10)}.`,
  `Importe \`1-Expedicoes.csv\` primeiro; as outras coleções referenciam a expedição.`,
  '',
  `**\`publicado\` está FALSE.** Vire para TRUE só quando as linhas abaixo estiverem resolvidas.`,
  '',
  ...(derivados.length ? ['## Derivado do texto do briefing, não afirmado por ninguém', '',
    'Saiu de palavra que a pessoa escreveu, mas não é resposta dela. Confira:',
    '', ...derivados.map((d) => `- ${d}`), ''] : []),
  '## Em branco de propósito',
  '',
  ...notas.map((n) => `- ${n}`),
  '',
  '## Dois campos que a página NÃO desenha hoje',
  '',
  'Medido em 15/10/2026 comparando o valor no CMS com o HTML da página, na Costa Doce',
  '(a mais preenchida) e aqui. Todo o resto aparece.',
  '',
  '- `pontoEncontro` não está ligado a nenhum elemento',
  '- `naoIncluso` idem (o "não está incluso" da página vem do repetidor da coleção `Itens`)',
  '',
  'Preencher esses dois no CMS não muda nada na tela até alguém ligar o elemento no Editor.',
  '',
  '## Quem preenche o quê, daqui para a frente',
  '',
  'O briefing manda nos campos que ele conhece: datas, duração, roteiro, hospedagens, veículos.',
  'Reenviar o zip ATUALIZA esses e **não toca em mais nada** — foto, textos de venda e o que',
  'inclui, escritos no CMS, ficam onde estão. Valor vazio nunca sobrescreve conteúdo.',
  '',
  '⚠️ Mudar o `titulo` muda o ENDEREÇO da página, porque a URL dinâmica sai dele.',
  'Depois de divulgar o link, título não se mexe.',
  '',
  ...(unicas.length ? ['## Palavras que eu corrigi no texto do cliente', '',
    'Vai para página pública, então erro de digitação não sobe. Mas é texto dele:',
    '', ...unicas.map((c) => `- \`${c}\``), ''] : []),
  '## O que o briefing trouxe pronto',
  '',
  `- ${roteiro.length} dias de roteiro, com a data de cada um calculada a partir de ${inicio}`,
  `- ${hospedagens.length} hospedagens (só o nome)`,
  `- ${veiculos || '—'} UTVs`,
  '',
].join('\n'), 'utf8');
console.log(`\n${path.relative(RAIZ, path.join(DIR, 'FALTA.md'))} escrito.`);

/* ── subir para o CMS ──────────────────────────────────────────────────
   Mesmas convenções de `wix-importar.mjs`, que não dá para adivinhar e custaram QA no site
   no ar: `_id` é o slug e tem que ir DUAS vezes (no `dataItem.id` e no `data._id`), senão a
   API devolve WDE0080 com a explicação escondida em details.validationError; campo rico vai
   em `<p>`; e `expedicao` é referência, que se liga pelo `_id` da expedição.

   `save` cria ou substitui pelo `_id`, então rodar de novo com o mesmo zip ATUALIZA em vez
   de duplicar. É o que permite o cliente corrigir o briefing, reenviar, e o site acompanhar. */
if (!SUBIR) {
  console.log('\nPara mandar ao CMS da Wix:  node design/do-briefing.mjs <pacote> --subir');
  process.exit(0);
}

const { wix, SITE } = await import('./wix.mjs');
const idDe = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase().slice(0, 60);
const rico = (t) => (t ? `<p>${t}</p>` : '');
const id = slug;

let gravados = 0, falhos = 0;
const preservados = [];
const cache = new Map();

/** Todos os itens de uma coleção, uma vez só. */
async function todos(colecao) {
  if (!cache.has(colecao)) {
    const r = await wix('/wix-data/v2/items/query', {
      corpo: { dataCollectionId: colecao, query: { paging: { limit: 200 } } }, escopo: SITE,
    });
    cache.set(colecao, (r.dataItems || []).map((i) => i.data));
  }
  return cache.get(colecao);
}

/**
 * LER, MESCLAR, ESCREVER — e nunca o contrário.
 *
 * `items/save` substitui o item INTEIRO. Enquanto só o briefing escrevia aqui, isso era a
 * idempotência que a gente queria. A partir do momento em que uma PESSOA passa a preencher
 * no CMS (fotos, textos de venda, o que inclui), substituir vira destruição: o cliente fecha
 * outro briefing, eu rodo de novo, e some tudo que ela escreveu.
 *
 * Então o briefing escreve só o que ele sabe, e o que ele não sabe fica como está. Valor
 * vazio NÃO sobrescreve — `false` e `0` sim, que são respostas de verdade, não ausência.
 */
async function gravar(colecao, item) {
  const antigo = (await todos(colecao)).find((x) => x._id === item._id);
  const novos = Object.fromEntries(
    Object.entries(item).filter(([, v]) => v !== '' && v !== null && v !== undefined)
  );
  if (antigo) {
    for (const [k, v] of Object.entries(antigo)) {
      if (k.startsWith('_') || k === 'slug') continue;
      if (!(k in novos) && v !== '' && v != null) preservados.push(`${colecao}.${item._id}.${k}`);
    }
  }
  const final = { ...(antigo || {}), ...novos, _id: item._id };
  if (SECO) { console.log(`    → ${colecao.padEnd(12)} ${item._id}${antigo ? ' (mescla)' : ' (novo)'}`); gravados++; return; }
  try {
    await wix('/wix-data/v2/items/save', {
      corpo: { dataCollectionId: colecao, dataItem: { id: item._id, data: final } },
      escopo: SITE,
    });
    gravados++;
  } catch (e) {
    const viol = e.dados?.details?.validationError?.fieldViolations?.map((v) => `${v.field}: ${v.description}`).join(' | ');
    console.log(`    x ${colecao} ${item._id}: ${viol || String(e.message).replace(/\s+/g, ' ').slice(0, 160)}`);
    falhos++;
  }
}
const salvar = gravar;

const novaExpedicao = !(await todos('Expedicoes')).some((x) => x._id === id);

console.log(`\n${SECO ? 'SECO · ' : ''}subindo para o CMS${novaExpedicao ? '' : ' (expedição já existe: campos de semente não são reescritos)'}`);
console.log('Expedicoes');
await salvar('Expedicoes', {
  _id: id, slug: id,
  titulo: nome,
  nomeEdicao: expedicao.nomeEdicao,
  // ⚠️ `situacao` é o RÓTULO que o visitante lê ("Lista de espera", "Vagas abertas",
  // "Pré-reserva aberta"), não um slug. Só entra por --situacao: é estado comercial, não sai
  // do briefing, e escrever "rascunho" aqui publicaria a palavra na etiqueta da agenda.
  situacao: SITUACAO,
  dataInicio: inicio, dataFim: fim,
  duracao: expedicao.duracao,
  publicado: false,
  /* SEMENTE: escrito só quando a expedição ainda não existe. Depois disso quem manda é quem
     edita no CMS. `uf`, `regiao` e `pontoEncontro` são derivação minha, não afirmação de
     ninguém; reescrever a cada zip apagaria a correção da pessoa em silêncio, toda vez.

     ⚠️ `veiculos` NÃO entra mais, nem como semente. Eu o preenchia com o número de adesivos
     do briefing ("11 UTVs"), e o campo quer dizer OUTRA coisa: qual carro você usa (na Costa
     Doce, "O seu UTV · transporte incluso"). A Ana apagou em 15/10 e pediu para tirar o
     campo. Ela estava certa: não era o campo errado, era o meu valor errado. `base` saiu
     junto, por ser palpite meu sobre a cidade-base a partir do Dia 01. */
  ...(novaExpedicao ? { uf: UF_ESCOLHIDA, regiao, pontoEncontro } : {}),
});

console.log('Roteiro');
const diasQueExistem = new Set((await todos('Roteiro')).filter((x) => x.expedicao === id).map((x) => x._id));
for (const r of roteiro) {
  const idDia = `${id}-dia-${r.dia}`;
  /* SEMENTE também no roteiro, desde 20/10/2026. O briefing escreve o dia uma vez; depois,
     quem manda é quem edita no CMS. A Ana reescreveu os sete dias à mão ("Dia 01 - Chegada à
     Barreirinhas. Chegada pelo Aeroporto de São Luís, com transfer até...") e preencheu a
     quilometragem. Com `titulo` e `texto` ainda pertencendo ao briefing, bastava o cliente
     reenviar o zip para apagar tudo isso de uma vez — e a mescla não salva, porque o briefing
     TEM valor para esses campos, só que o valor dele é a frase crua de origem.

     A data agora vai em dd/mm. Em ISO ela aparecia crua na página, "2027-05-24", nos sete
     dias: o campo é texto e a tela imprime o que está lá. */
  const base = { _id: idDia, expedicao: id, dia: r.dia };
  await salvar('Roteiro', diasQueExistem.has(idDia)
    ? base
    : { ...base, data: r.data, local: r.local, titulo: r.titulo, texto: rico(r.texto), km: '' });
}

console.log('Hospedagens');
for (const h of hospedagens) {
  await salvar('Hospedagens', {
    _id: `${id}-${idDe(h.nome)}`, expedicao: id,
    ordem: h.ordem, nome: h.nome, papel: '', onde: '', noites: '', texto: '',
  });
}

console.log('Guia');
for (const [i, g] of guia.entries()) {
  await salvar('Guia', {
    _id: `${id}-${idDe(g.categoria)}`, expedicao: id,
    categoria: g.categoria, ordem: i + 1, titulo: g.titulo, conteudo: rico(g.conteudo),
  });
}

/* Dia que sumiu do briefing continua na coleção e continua na página. Não apago sozinho,
   porque pode ter foto e texto que alguém escreveu ali — mas calar seria pior. */
const orfaos = [];
const esperado = {
  Roteiro: new Set(roteiro.map((r) => `${id}-dia-${r.dia}`)),
  Hospedagens: new Set(hospedagens.map((h) => `${id}-${idDe(h.nome)}`)),
};
for (const [col, ids] of Object.entries(esperado)) {
  for (const x of await todos(col)) {
    if (x.expedicao === id && !ids.has(x._id)) orfaos.push(`${col}  ${x._id}`);
  }
}

console.log(`\n${gravados} item(ns) ${SECO ? 'iriam' : 'gravados'}${falhos ? `, ${falhos} com erro` : ''}.`);
if (preservados.length) {
  console.log(`\n${preservados.length} campo(s) que já tinham conteúdo foram PRESERVADOS (o briefing não manda neles):`);
  for (const p of preservados.slice(0, 20)) console.log('  · ' + p);
}
if (orfaos.length) {
  console.log(`\n⚠️ ${orfaos.length} item(ns) sobraram de um briefing anterior e ainda aparecem na página:`);
  for (const o of orfaos) console.log('  · ' + o);
  console.log('  Apague no CMS se não valem mais. Não apago sozinho: pode ter foto ou texto escrito ali.');
}
/* ⚠️ A URL da página dinâmica sai do TÍTULO, com acento e tudo — não do `slug`. Descoberto
   na marra em 15/10: procurei por /expedicoes/lencois-maranhenses, levei 404, e concluí que
   a página não existia. Ela existia, em /expedicoes/lençóis-maranhenses. */
const url = 'https://www.desbravandoutv.com/expedicoes/' +
  encodeURIComponent(nome.toLowerCase().replace(/\s+/g, '-'));
console.log(`\npágina: ${url}`);
console.log(`(o endereço sai do TÍTULO, não do slug — mudar o título muda o endereço)`);
process.exit(falhos ? 1 : 0);
