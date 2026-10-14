// Retrato do CMS: campo por campo, o que está preenchido e o que está vazio.
//
// Serve para dois fins: conferir uma carga, e — mais importante — saber o que a página
// dinâmica pode mostrar hoje. Ligar elemento a campo vazio é o jeito mais rápido de
// achar que a página quebrou quando o que falta é conteúdo.
//
// Rodar:  node design/wix-estado.mjs
import { wix, SITE, colecoes } from './wix.mjs';

const COLS = ['Expedicoes', 'Roteiro', 'Hospedagens', 'Guia', 'Destaques', 'FAQ'];

const vazio = (v) => v == null || v === '' || (Array.isArray(v) && !v.length) ||
  (typeof v === 'string' && !v.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim());

const defs = await colecoes();

for (const nome of COLS) {
  const def = defs.find((c) => c.id === nome);
  const r = await wix('/wix-data/v2/items/query', {
    corpo: { dataCollectionId: nome, query: { cursorPaging: { limit: 100 } } }, escopo: SITE,
  });
  const itens = r.dataItems.map((x) => x.data);
  // campos do sistema não interessam para ligar elemento
  const campos = (def?.fields || []).filter((f) => !/^_/.test(f.key) && f.key !== 'title');

  console.log(`\n═══ ${nome} · ${itens.length} itens · ${campos.length} campos`);
  const cheios = [], parciais = [], vazios = [];
  for (const f of campos) {
    const n = itens.filter((i) => !vazio(i[f.key])).length;
    const linha = `${f.key.padEnd(18)} ${String(f.type).replace('MEDIA_', '').padEnd(14)} ${n}/${itens.length}`;
    if (n === itens.length && n > 0) cheios.push(linha);
    else if (n > 0) parciais.push(linha);
    else vazios.push(linha);
  }
  if (cheios.length) { console.log('  ✓ em todos os itens'); cheios.forEach((l) => console.log('      ' + l)); }
  if (parciais.length) { console.log('  ◐ em parte dos itens'); parciais.forEach((l) => console.log('      ' + l)); }
  if (vazios.length) { console.log('  ✘ vazio em todos — NÃO ligar elemento nisso ainda'); vazios.forEach((l) => console.log('      ' + l)); }
}

/* Amarração das referências: sem isso a página dinâmica mostra repetidor vazio. */
console.log('\n\n═══ referências para a Costa Doce');
for (const nome of ['Roteiro', 'Hospedagens', 'Guia', 'FAQ']) {
  const r = await wix('/wix-data/v2/items/query', {
    corpo: { dataCollectionId: nome, query: { cursorPaging: { limit: 100 } } }, escopo: SITE,
  });
  const itens = r.dataItems.map((x) => x.data);
  const ligados = itens.filter((i) => i.expedicao === 'costa-doce' || i.expedicao?._id === 'costa-doce');
  const soltos = itens.filter((i) => vazio(i.expedicao));
  console.log(`  ${nome.padEnd(12)} ${ligados.length} ligados à Costa Doce · ${soltos.length} sem referência${nome === 'FAQ' ? ' (correto: são as gerais)' : soltos.length ? ' ⚠️' : ''}`);
}

console.log('\n═══ o que a página da expedição consegue mostrar hoje');
const e = (await wix('/wix-data/v2/items/query', {
  corpo: { dataCollectionId: 'Expedicoes', query: { filter: { _id: 'costa-doce' } } }, escopo: SITE,
})).dataItems[0]?.data || {};
const secoes = {
  'hero (título, chamada, foto)': ['titulo', 'subtitulo', 'chamada', 'fotoCapa'],
  'faixa de dados': ['duracao', 'percurso', 'formato', 'regiao', 'base', 'veiculos', 'destaques'],
  'sobre o destino': ['sobreDestino'],
  'roteiro dia a dia': ['__ref:Roteiro'],
  'hospedagem': ['hospedagemNota', '__ref:Hospedagens'],
  'incluso / não incluso': ['incluso', 'naoIncluso'],
  'galeria': ['galeria'],
  'guia da expedição': ['__ref:Guia'],
  'FAQ': ['__ref:FAQ'],
  'reserva': ['valorPorPessoa', 'valorPorCasal', 'rotuloBotao', 'linkCheckout'],
  'vídeo de abertura': ['videoAbertura'],
};
for (const [secao, campos] of Object.entries(secoes)) {
  const faltam = campos.filter((c) => !c.startsWith('__ref:') && vazio(e[c]));
  const marca = faltam.length === 0 ? '✓ pronta' : faltam.length === campos.length ? '✘ sem nada' : '◐ falta ' + faltam.join(', ');
  console.log(`  ${secao.padEnd(30)} ${marca}`);
}
