// Confere o .pen gerado contra o vocabulário real do formato, extraído das
// bibliotecas que vêm dentro da extensão pen.dev. Pega typo de propriedade,
// valor de enum errado, id repetido e cor mal formada — antes de abrir o editor.
import fs from 'node:fs';

const ALVO = new URL('./desbravando-repaginacao.pen', import.meta.url);

// A versão da extensão muda quando o VS Code atualiza — achar a pasta em vez de fixar o
// número. Em 08/08 ela passou de 0.6.64 para 0.6.65 e o validador quebrou sozinho.
const EXT = 'C:/Users/olive/.vscode/extensions';
const versao = fs.readdirSync(EXT).filter((d) => d.startsWith('highagency.pencildev-')).sort().pop();
if (!versao) { console.error(`extensão pen.dev não encontrada em ${EXT}`); process.exit(1); }
const DIR_LIB = `${EXT}/${versao}/out/data`;

/* ── vocabulário de referência, lido das libs oficiais ── */
const props = new Set();
const tipos = new Set();
const enums = { layout: new Set(), justifyContent: new Set(), alignItems: new Set(), textGrowth: new Set(), align: new Set() };

// `descendants` e `variables` têm ids/nomes como CHAVES — não são propriedades do formato.
const CHAVE_LIVRE = new Set(['descendants', 'variables', 'themes', 'slot']);

function varrer(n, dentroDeChaveLivre = false) {
  if (Array.isArray(n)) return n.forEach((c) => varrer(c, dentroDeChaveLivre));
  if (!n || typeof n !== 'object') return;
  for (const [k, v] of Object.entries(n)) {
    if (!dentroDeChaveLivre && !k.startsWith('--')) props.add(k);
    if (k === 'type' && typeof v === 'string') tipos.add(v);
    if (enums[k] && typeof v === 'string') enums[k].add(v);
    varrer(v, CHAVE_LIVRE.has(k));
  }
}
for (const f of fs.readdirSync(DIR_LIB).filter((f) => f.endsWith('.pen'))) {
  varrer(JSON.parse(fs.readFileSync(`${DIR_LIB}/${f}`, 'utf8')));
}
const PROPS_OK = props;

// as libs não exercitam todos os valores de enum; completa com os que o formato aceita
['start', 'center', 'end', 'space_between', 'space_around'].forEach((v) => enums.justifyContent.add(v));
['start', 'center', 'end', 'baseline'].forEach((v) => enums.alignItems.add(v));
['none', 'vertical', 'horizontal'].forEach((v) => enums.layout.add(v));
['auto', 'fixed-width', 'fixed-width-height'].forEach((v) => enums.textGrowth.add(v));
['inside', 'center', 'outside'].forEach((v) => enums.align.add(v));

/* ── varredura do nosso arquivo ── */
const doc = JSON.parse(fs.readFileSync(ALVO, 'utf8'));
const erros = [];
const avisos = [];
const ids = new Map();
let nos = 0;

const CAMINHO = [];
const onde = () => CAMINHO.slice(-4).join(' › ') || '(raiz)';

function checar(n) {
  if (Array.isArray(n)) return n.forEach(checar);
  if (!n || typeof n !== 'object') return;

  const nomeado = n.name || n.type;
  if (nomeado) CAMINHO.push(nomeado);
  if (n.type) nos++;

  if (n.id) {
    if (ids.has(n.id)) erros.push(`id repetido "${n.id}" em ${onde()} (já usado em ${ids.get(n.id)})`);
    else ids.set(n.id, onde());
  }
  if (n.type && !tipos.has(n.type)) erros.push(`tipo de nó desconhecido "${n.type}" em ${onde()}`);

  for (const [k, v] of Object.entries(n)) {
    if (k.startsWith('--')) continue;
    if (!PROPS_OK.has(k)) erros.push(`propriedade desconhecida "${k}" em ${onde()}`);
    if (enums[k] && typeof v === 'string' && !enums[k].has(v)) {
      erros.push(`valor inválido ${k}="${v}" em ${onde()} — esperado: ${[...enums[k]].join(' | ')}`);
    }
    if ((k === 'fill' || k === 'color') && typeof v === 'string') {
      if (!/^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(v) && !v.startsWith('$--')) {
        erros.push(`cor mal formada ${k}="${v}" em ${onde()}`);
      }
    }
    if (k === 'width' || k === 'height') {
      if (typeof v === 'string' && v !== 'fill_container') erros.push(`${k}="${v}" inválido em ${onde()} — use número ou "fill_container"`);
    }
    if (k === 'content' && typeof v !== 'string') erros.push(`content não-texto em ${onde()}`);
    checar(v);
  }

  // um texto sem fill herda preto e some no fundo escuro
  if (n.type === 'text' && !n.fill) avisos.push(`texto sem cor em ${onde()}: "${String(n.content).slice(0, 40)}"`);
  // frame com layout mas sem filhos costuma ser espaçador — ok; sem layout e com filhos empilha em 0,0
  if (n.type === 'frame' && n.children?.length > 1 && !n.layout) {
    avisos.push(`frame com ${n.children.length} filhos e sem layout em ${onde()} — os filhos vão se sobrepor`);
  }
  if (nomeado) CAMINHO.pop();
}

checar(doc.children);

/* ── relatório ── */
console.log(`${nos} nós · ${ids.size} ids únicos · versão ${doc.version}`);
console.log(`vocabulário de referência: ${PROPS_OK.size} propriedades, ${tipos.size} tipos de nó\n`);

if (erros.length) {
  console.log(`ERROS (${erros.length}):`);
  const agrup = {};
  for (const e of erros) { const c = e.split(' em ')[0]; (agrup[c] ||= []).push(e); }
  for (const [c, lista] of Object.entries(agrup)) console.log(`  ${lista.length}×  ${c}\n        ex.: ${lista[0]}`);
} else console.log('nenhum erro');

if (avisos.length) {
  console.log(`\nAVISOS (${avisos.length}):`);
  const agrup = {};
  for (const a of avisos) { const c = a.split(' em ')[0]; (agrup[c] ||= []).push(a); }
  for (const [c, lista] of Object.entries(agrup)) console.log(`  ${lista.length}×  ${c}\n        ex.: ${lista[0]}`);
}

process.exit(erros.length ? 1 : 0);
