// Lê o .pen e emite a FICHA TÉCNICA de cada módulo — é o que alimenta o manual de
// montagem. A ideia: ninguém mede nada na mão nem confere na prévia. O que está aqui
// é literalmente o que o arquivo de design diz.
//
// Rodar:  node design/ficha.mjs            → escreve design/fichas.md
//         node design/ficha.mjs "roteiro"  → só os módulos que casam com o termo
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const doc = JSON.parse(fs.readFileSync(path.join(DIR, 'desbravando-repaginacao.pen'), 'utf8'));
const filtro = process.argv[2]?.toLowerCase();

/* ── nomes humanos para o que a Wix chama de outra coisa ── */
const COR_NOME = {
  '#F2F2F2': 'papel', '#FFFFFF': 'branco', '#000000': 'preto', '#111111': 'tinta',
  '#717171': 'cinza', '#9A9A9A': 'cinza fraco', '#D9D9D9': 'linha',
  '#FFFFFFD1': 'branco 82%', '#FFFFFF8C': 'branco 55%', '#FFFFFF61': 'branco 38%',
  '#FFFFFF29': 'branco 16%', '#FFFFFFA6': 'branco 65%', '#FFFFFF59': 'branco 35%',
  '#FFFFFFE6': 'branco 90%', '#FFFFFF14': 'branco 8%', '#00000099': 'preto 60%',
};
const cor = (c) => {
  if (!c) return '';
  if (typeof c === 'object') {
    if (c.type === 'image') return 'FOTO';
    if (c.type === 'gradient') return `degradê ${c.rotation}° (${c.colors.map((p) => p.color).join(' → ')})`;
    return '';
  }
  const u = String(c).toUpperCase();
  return COR_NOME[u] ? `${u} ${COR_NOME[u]}` : u;
};

const medida = (v) => (v === 'fill_container' ? 'estica' : v === undefined ? '—' : `${v}`);

/** Uma linha de tipografia do jeito que se digita no painel da Wix. */
function tipo(n) {
  const p = [];
  p.push(`${n.fontFamily || 'Archivo'} ${n.fontSize ?? 16}`);
  if (n.fontWeight && n.fontWeight !== '400') p.push(`peso ${n.fontWeight}`);
  if (n.lineHeight) p.push(`entrelinha ${n.lineHeight}`);
  if (n.letterSpacing) p.push(`espaçamento ${n.letterSpacing > 0 ? '+' : ''}${n.letterSpacing}`);
  if (n.textAlign && n.textAlign !== 'left') p.push(`alinhado à ${n.textAlign === 'right' ? 'direita' : 'centro'}`);
  return p.join(' · ');
}

function traco(s) {
  if (!s) return '';
  const t = s.thickness;
  if (t == null) return `contorno ${cor(s.fill)}`;
  if (typeof t === 'number') return `contorno ${t}px ${cor(s.fill)}`;
  const lados = Object.entries(t).map(([l, v]) => `${{ top: 'topo', bottom: 'base', left: 'esquerda', right: 'direita' }[l]} ${v}px`);
  return `fio ${lados.join(' + ')} ${cor(s.fill)}`;
}

/** Descreve um nó em uma linha. */
function linha(n, nivel) {
  const rec = '  '.repeat(nivel);
  if (n.type === 'text') {
    const txt = (n.content || '').replace(/\n/g, ' ⏎ ');
    const larg = n.width ? ` · largura ${medida(n.width)}` : '';
    return `${rec}T  «${txt}»\n${rec}   ${tipo(n)} · ${cor(n.fill)}${larg}`;
  }
  if (n.type === 'icon_font') return `${rec}◆  ícone ${n.iconFontName} ${n.width}×${n.height} · ${cor(n.fill)}`;
  if (n.type === 'rectangle') {
    if (n.height <= 2 && n.width === 'fill_container') return `${rec}─  fio ${n.height}px ${cor(n.fill)} (largura toda)`;
    return `${rec}▪  retângulo ${medida(n.width)}×${medida(n.height)} · ${cor(n.fill)}`;
  }
  // frame
  const semFilhos = !n.children?.length;
  if (semFilhos && !n.fill && !n.stroke) {
    if (n.width === 'fill_container' && n.height >= 2) return `${rec}⇕  respiro ${n.height}px`;
    if (n.width === 'fill_container' && n.height === 1) return `${rec}↔  mola (empurra o resto)`;
    if (n.height === 1) return `${rec}↔  recuo lateral ${n.width}px`;
    return `${rec}□  caixa vazia ${medida(n.width)}×${medida(n.height)}`;
  }
  if (semFilhos && typeof n.fill === 'object' && n.fill.type === 'image') {
    return `${rec}▣  FOTO ${medida(n.width)}×${medida(n.height)}${n.cornerRadius ? ` · canto ${n.cornerRadius}` : ''}`;
  }
  const partes = [];
  partes.push(n.layout === 'horizontal' ? 'linha' : n.layout === 'vertical' ? 'coluna' : 'caixa');
  if (n.width !== undefined) partes.push(`largura ${medida(n.width)}`);
  if (n.height !== undefined) partes.push(`altura ${medida(n.height)}`);
  if (n.padding) partes.push(`recuo ${n.padding}`);
  if (n.gap) partes.push(`espaço ${n.gap}`);
  if (n.alignItems && n.alignItems !== 'start') partes.push(`alinha ${{ center: 'ao centro', end: 'ao fim', baseline: 'pela base' }[n.alignItems] || n.alignItems}`);
  if (n.justifyContent) partes.push(`distribui ${{ center: 'ao centro', end: 'ao fim', space_between: 'nas pontas' }[n.justifyContent] || n.justifyContent}`);
  if (n.fill) partes.push(`fundo ${cor(n.fill)}`);
  if (n.stroke) partes.push(traco(n.stroke));
  if (n.cornerRadius) partes.push(`canto ${n.cornerRadius}`);
  if (n.opacity) partes.push(`opacidade ${n.opacity}`);
  const rotulo = n.name && !/^(frame|row|col)$/.test(n.name) ? `  «${n.name}»` : '';
  return `${rec}▸  ${partes.join(', ')}${rotulo}`;
}

/** Percorre a subárvore, colapsando os recuos laterais para não poluir. */
function arvore(n, nivel, saida) {
  saida.push(linha(n, nivel));
  for (const f of n.children || []) arvore(f, nivel + 1, saida);
}

/* ── módulos de primeiro nível de cada tela ── */
const IGNORAR = /^(frame|row|col|sobrelinha|botão\/|ícone\/|status\/|logo\/|marca\/)/;

function modulosDe(tela) {
  const achados = [];
  const anda = (n, profundidade) => {
    const nome = n.name;
    if (nome && !IGNORAR.test(nome) && nome !== tela.name && profundidade <= 3) {
      achados.push(n);
      return; // não desce mais: o módulo inteiro já vai na ficha
    }
    for (const f of n.children || []) anda(f, profundidade + 1);
  };
  for (const f of tela.children || []) anda(f, 1);
  return achados;
}

let md = `# Fichas técnicas dos módulos

Gerado de \`design/desbravando-repaginacao.pen\` por \`design/ficha.mjs\`. **Não editar na mão** —
se algo aqui estiver errado, o errado é o design; corrige lá e roda de novo.

Como ler:

| Símbolo | O que é |
|---|---|
| \`▸\` | um container (linha ou coluna com auto-layout) |
| \`T\` | um texto — a segunda linha traz fonte, tamanho, peso, espaçamento e cor |
| \`▣\` | uma foto |
| \`─\` | um fio (retângulo de 1 ou 2px na largura toda) |
| \`▪\` | um retângulo com medida |
| \`◆\` | um ícone |
| \`⇕\` | respiro vertical — na Wix vira margem/padding |
| \`↔\` | mola (empurra o resto para a ponta) ou recuo lateral |

**"estica"** = ocupar o espaço que sobra (na Wix: largura 100% / *stretch*).
**"recuo"** = padding igual nos quatro lados.

`;

for (const tela of doc.children) {
  const mods = modulosDe(tela);
  const visiveis = filtro ? mods.filter((m) => m.name.toLowerCase().includes(filtro)) : mods;
  if (!visiveis.length) continue;
  md += `\n---\n\n## ${tela.name}\n\nLargura da tela: **${tela.width}px** · fundo **${cor(tela.fill)}** · ${mods.length} módulos\n`;
  for (const m of visiveis) {
    const saida = [];
    arvore(m, 0, saida);
    md += `\n### ${m.name}\n\n\`\`\`\n${saida.join('\n')}\n\`\`\`\n`;
  }
}

const arq = path.join(DIR, 'fichas.md');
fs.writeFileSync(arq, md, 'utf8');
const linhas = md.split('\n').length;
console.log(`${doc.children.length} telas · ${linhas} linhas\n→ design/fichas.md`);
