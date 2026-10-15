// Transforma os campos ricos `incluso` e `naoIncluso` de uma expedição nas linhas da coleção
// `Itens`, que é de onde a PÁGINA realmente desenha as duas listas.
//
//   node design/itens-do-texto.mjs <id-da-expedicao>           mostra
//   node design/itens-do-texto.mjs <id-da-expedicao> --gravar  grava
//
// POR QUE EXISTE, com data. Em 15/10/2026 a Ana preencheu "o que está incluso" e "o que não
// está incluso" no CMS e escreveu: "adicionei o que tá incluso e o que não tá mas não
// apareceu no site". Ela estava certa, e o motivo não é óbvio nem para quem montou a página:
//
//   · os campos `incluso` e `naoIncluso` EXISTEM na coleção e aceitam texto;
//   · o texto dela chegou ao HTML da página, dá para achar com Ctrl+F no código;
//   · mas o elemento ligado a esses campos está OCULTO. O que o visitante vê é um repetidor
//     da coleção `Itens`, o "inventário numerado" do desenho. Sem linha em `Itens`, a seção
//     fica só com o título.
//
// Medido assim: na Costa Doce a seção tem 319px e `Itens` tem 15 linhas; na Lençóis tinha
// 187px, só o título, e zero linhas. O texto nos dois casos estava no DOM e invisível.
//
// Ou seja: dois campos que parecem ser o conteúdo da página não são. Enquanto o Editor não
// for mexido, quem manda é `Itens` — e este arquivo faz a ponte, para ninguém ter que saber
// disso para preencher o site.
import { wix, SITE } from './wix.mjs';

const ID = process.argv[2];
const GRAVAR = process.argv.includes('--gravar');
if (!ID) {
  console.error('uso: node design/itens-do-texto.mjs <id-da-expedicao> [--gravar]');
  process.exit(1);
}

const q = async (col) => (await wix('/wix-data/v2/items/query', {
  corpo: { dataCollectionId: col, query: { paging: { limit: 200 } } }, escopo: SITE,
})).dataItems.map((i) => i.data);

const exp = (await q('Expedicoes')).find((d) => d._id === ID);
if (!exp) { console.error(`não achei a expedição "${ID}"`); process.exit(1); }

/**
 * Tira os itens de um campo rico. O editor da Wix grava `<ul><li><p>texto</p></li></ul>`,
 * mas uma lista colada à mão pode vir como parágrafos com marcador. Os dois casos entram.
 */
function itensDoTexto(html) {
  if (!html) return [];
  const limpo = (s) => s
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n))
    .replace(/^[\s•·\-–—*]+/, '')
    .replace(/\s+/g, ' ').trim();

  const lis = [...html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((m) => limpo(m[1]));
  if (lis.length) return lis.filter(Boolean);
  return html.split(/<\/p>|<br\s*\/?>|\n/i).map(limpo).filter(Boolean);
}

const incluso = itensDoTexto(exp.incluso);
const nao = itensDoTexto(exp.naoIncluso);

console.log(`${exp.titulo}`);
console.log(`\nINCLUSO (${incluso.length})`);
incluso.forEach((t, i) => console.log(`  ${String(i + 1).padStart(2, '0')}  ${t}`));
console.log(`\nNÃO INCLUSO (${nao.length})`);
nao.forEach((t, i) => console.log(`  ${String(i + 1).padStart(2, '0')}  ${t}`));

const antigos = (await q('Itens')).filter((x) => x.expedicao === ID);
const linhas = [
  ...incluso.map((texto, i) => ({ escopo: 'incluso', i, texto })),
  ...nao.map((texto, i) => ({ escopo: 'nao-incluso', i, texto })),
].map(({ escopo, i, texto }) => ({
  _id: `${ID}-${escopo === 'incluso' ? 'inc' : 'nao'}-${String(i + 1).padStart(2, '0')}`,
  expedicao: ID, escopo, ordem: i + 1, numero: String(i + 1).padStart(2, '0'), texto,
}));

const sobrando = antigos.filter((a) => !linhas.some((l) => l._id === a._id));

if (!GRAVAR) {
  console.log(`\n${linhas.length} linha(s) seriam gravadas em Itens (hoje: ${antigos.length}).`);
  if (sobrando.length) console.log(`${sobrando.length} linha(s) antiga(s) sobrariam: ${sobrando.map((s) => s._id).join(', ')}`);
  console.log('\nRode de novo com --gravar.');
  process.exit(0);
}

let ok = 0;
for (const l of linhas) {
  await wix('/wix-data/v2/items/save', {
    corpo: { dataCollectionId: 'Itens', dataItem: { id: l._id, data: l } }, escopo: SITE,
  });
  ok++;
}
// Lista que encolheu deixa linha órfã aparecendo na página. Aqui apagar é seguro: a linha é
// gerada do texto, não tem foto nem nada que alguém tenha escrito direto nela.
for (const s of sobrando) {
  await wix(`/wix-data/v2/items/${encodeURIComponent(s._id)}?dataCollectionId=Itens`, { metodo: 'DELETE', escopo: SITE });
}
console.log(`\n${ok} gravada(s)${sobrando.length ? `, ${sobrando.length} antiga(s) apagada(s)` : ''}.`);
