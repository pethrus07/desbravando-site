// Monta o JSON do DOSSIÊ de uma expedição a partir do CMS do site, e grava na esteira de
// artes, que é quem sabe renderizar com as fontes e a marca.
//
//   node design/dossie-dados.mjs lencois-maranhenses
//
// POR QUE O CMS É A FONTE
// O dossiê e a página do site dizem a mesma coisa para a mesma pessoa. Se o PDF for digitado
// à parte, os dois divergem no primeiro ajuste — e quem percebe é o cliente, lendo um preço
// ou um roteiro que não bate. Aqui o PDF é mais uma saída do mesmo conteúdo.
//
// O QUE NÃO VEM DAQUI, e por isso fica declarado como pendência no próprio JSON: o texto de
// "quem somos" (é da empresa, não da expedição), o transfer (origem e embarque não existem no
// CMS) e as fotos, que entram por nome de arquivo.
import fs from 'node:fs';
import path from 'node:path';
import { wix, SITE } from './wix.mjs';

const ID = process.argv[2];
if (!ID) {
  console.error('uso: node design/dossie-dados.mjs <id-da-expedicao>');
  process.exit(1);
}
const ESTEIRA = path.join('C:', 'Users', 'olive', 'Projetos', 'estudio-briefing-desbravando-utv', 'artes', 'dados');

const q = async (c) => (await wix('/wix-data/v2/items/query', {
  corpo: { dataCollectionId: c, query: { paging: { limit: 200 } } }, escopo: SITE,
})).dataItems.map((i) => i.data);

const e = (await q('Expedicoes')).find((d) => d._id === ID);
if (!e) { console.error(`não achei a expedição "${ID}"`); process.exit(1); }

/** Itens de um campo rico, sem marcador e sem tag. */
const lista = (html) => [...String(html || '').matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)]
  .map((m) => m[1].replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim())
  .filter(Boolean);
/* O FIM DE PARÁGRAFO SOBREVIVE, como linha em branco. Até 29/10/2026 isto colapsava tudo num
   espaço só, e o dia 3 da Lençóis (a travessia de barco) chegou do CMS em dois parágrafos
   escritos pela cliente, um para o deslocamento e outro para o passeio: no PDF os dois saíram
   grudados num bloco de oito linhas, sem a pausa que ela tinha posto ali. Quem lê o texto cru
   não vê diferença; quem lê a peça, vê. */
const texto = (html) => String(html || '')
  .replace(/<\/p>\s*<p[^>]*>/gi, '\n\n')
  .replace(/<br\s*\/?>/gi, '\n')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
  .replace(/[ \t]+/g, ' ')
  .replace(/ ?\n ?/g, '\n')
  .trim();

const roteiro = (await q('Roteiro')).filter((x) => x.expedicao === ID).sort((a, b) => a.dia - b.dia)
  .map((r) => ({ dia: r.dia, data: r.data || '', local: r.local || '', titulo: r.titulo || '', texto: texto(r.texto), km: r.km || '' }));

const hospedagens = (await q('Hospedagens')).filter((x) => x.expedicao === ID).sort((a, b) => a.ordem - b.ordem)
  .map((h) => ({ nome: h.nome, onde: h.onde || '', noites: h.noites || '', papel: h.papel || '', texto: texto(h.texto), fotos: [] }));

const pendencias = [];
const exigir = (v, oque) => { if (!v) pendencias.push(oque); return v || ''; };

const dossie = {
  _nota: `Gerado de design/dossie-dados.mjs a partir do CMS do site em ${new Date().toISOString().slice(0, 10)}. ` +
    'Não editar à mão: corrige no CMS e roda de novo, senão o PDF e a página do site divergem.',
  _pendencias: pendencias,
  slug: ID,
  titulo: e.titulo,
  subtitulo: exigir(e.subtitulo, 'subtitulo (a linha abaixo do nome na capa)'),
  regiao: exigir(e.regiao, 'regiao (as cidades do roteiro, na capa)'),
  duracao: exigir(e.duracao, 'duracao'),
  destaques: exigir(e.destaques, 'destaques (as três palavras da capa)'),
  percurso: exigir(e.percurso, 'percurso'),
  formato: e.formato || '',
  situacao: e.situacao || '',
  aeroporto: e.aeroporto || '',
  pontoEncontro: e.pontoEncontro || '',
  chamada: texto(e.chamada),
  tituloSobre: exigir(e.tituloSobre, 'tituloSobre (a manchete da página do destino)'),
  sobreDestino: exigir(texto(e.sobreDestino), 'sobreDestino (o texto do destino)'),
  dataInicio: e.dataInicio || '',
  dataFim: e.dataFim || '',
  roteiro,
  hospedagens,
  hospedagemNota: texto(e.hospedagemNota),
  incluso: lista(e.incluso),
  naoIncluso: lista(e.naoIncluso),
  formasPagamento: e.formasPagamento || '',
  politicaCriancas: texto(e.politicaCriancas),
  cancelamento: texto(e.cancelamento),
  // Preenchidos à mão no JSON, porque não existem no CMS:
  fotos: { capa: '', dias: {}, equipe: '', encerramento: '' },
  transfer: null,
};
if (!roteiro.length) pendencias.push('roteiro vazio');
if (!hospedagens.length) pendencias.push('nenhuma hospedagem');
if (!dossie.incluso.length) pendencias.push('o que está incluso');
pendencias.push('transfer (origem, embarque e chegada) — não existe campo no CMS');
pendencias.push('fotos — entram por nome de arquivo no bloco "fotos"');

const arq = path.join(ESTEIRA, `dossie-${ID}.json`);

/* MESCLA, não sobrescreve. O CMS é dono do CONTEÚDO (texto, roteiro, hospedagens, listas);
   o arquivo guarda também o que não existe lá: as fotos escolhidas, a geometria de cada dia,
   o texto de quem somos, a lista do padrão e a linha de crédito das licenças.

   Em 28/10/2026 rodei isto só para pegar um texto que a cliente tinha reescrito e apaguei as
   três chaves de uma vez; precisei restaurar do git. É a mesma lição que o briefing do site
   já tinha aprendido em 15/10: gerador que reescreve o arquivo inteiro destrói o que não
   conhece, e o estrago só aparece no render seguinte. */
const MEUS = ['quemSomos', 'padrao', 'creditos', 'fotos'];
if (fs.existsSync(arq)) {
  const antigo = JSON.parse(fs.readFileSync(arq, 'utf8'));
  const herdadas = MEUS.filter((k) => antigo[k] !== undefined);
  for (const k of herdadas) dossie[k] = antigo[k];
  // a geometria de cada dia também é escolha minha, e mora dentro do roteiro
  const layouts = Object.fromEntries((antigo.roteiro ?? []).map((r) => [r.dia, r.layout]));
  let n = 0;
  for (const r of dossie.roteiro) if (layouts[r.dia]) { r.layout = layouts[r.dia]; n++; }
  console.log(`mesclado: ${herdadas.join(', ')} + geometria de ${n} dia(s)`);
}

fs.writeFileSync(arq, JSON.stringify(dossie, null, 2) + '\n', 'utf8');

console.log(`${e.titulo}`);
console.log(`  ${roteiro.length} dias · ${hospedagens.length} hospedagens · ${dossie.incluso.length} inclusos · ${dossie.naoIncluso.length} não inclusos`);
console.log(`  km por dia: ${roteiro.map((r) => r.km || '—').join(' · ')}`);
console.log(`\nPENDÊNCIAS (${pendencias.length}):`);
for (const p of pendencias) console.log('  · ' + p);
console.log(`\n-> ${arq}`);
