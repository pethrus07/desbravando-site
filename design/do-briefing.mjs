// Transforma o PACOTE DE COMUNICAÇÃO de uma expedição (o .zip que sai do Controle de
// Eventos, aba Comunicação) nos CSVs das coleções do CMS da Wix.
//
//   node design/do-briefing.mjs <caminho do briefing.json ou da pasta do pacote>
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
import { fileURLToPath } from 'node:url';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

/* ── entrada ───────────────────────────────────────────────────────── */
const alvo = process.argv[2];
if (!alvo) {
  console.error('uso: node design/do-briefing.mjs <briefing.json | pasta do pacote>');
  process.exit(1);
}
const arq = fs.statSync(alvo).isDirectory() ? path.join(alvo, 'briefing.json') : alvo;
const brf = JSON.parse(fs.readFileSync(arq, 'utf8'));

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
  roteiro.push({
    dia: n,
    data: inicio ? maisDias(inicio, n - 1) : '',
    local: tr ? `${tr[1]} → ${tr[2]}` : '',
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

const VAZIOS_DE_PROPOSITO = {
  uf: 'o roteiro cruza mais de um estado — qual entra na ficha é decisão sua',
  chamada: 'frase de chamada é escrita de marca, não sai do briefing',
  subtitulo: 'idem',
  formato: 'Família / Só Homens / Casais / Corporativa — o briefing não pergunta',
  percurso: 'quilometragem total não existe no briefing',
  destaques: 'não perguntado',
  aeroporto: 'não perguntado',
  pontoEncontro: 'não perguntado (hora e local da chegada do Dia 01)',
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
  regiao: '',
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
  '## Em branco de propósito',
  '',
  ...notas.map((n) => `- ${n}`),
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
