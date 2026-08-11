// Vetoriza a montanha do logo: PNG → SVG com curvas de verdade.
//
// Não existe SVG da marca em lugar nenhum — só o PNG de 2300×813 que está no ar na Wix.
// Este script tira o contorno dele e ajusta curvas de Bézier em cima, para a marca poder
// ser usada em qualquer tamanho sem serrilhar.
//
// Como funciona:
//   1. Chromium desenha o PNG num canvas e devolve o canal ALFA (a montanha é branca
//      sólida sobre fundo transparente — ver marca/IDENTIDADE_VISUAL.md).
//   2. Marching squares COM INTERPOLAÇÃO no alfa: usa o antisserrilhado da borda para
//      achar o contorno em precisão de subpixel. Traçar pixel a pixel daria escada.
//   3. Douglas-Peucker tira os pontos redundantes.
//   4. Algoritmo de Schneider ajusta cúbicas de Bézier ao contorno.
//
// Rodar:  node marca/vetorizar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '/Users/olive/Projetos/qa-parresia/node_modules/@playwright/test/index.mjs';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const ORIGEM = path.join(DIR, 'logo-desbravando-original.png');
const LIMIAR = 0.5;        // alfa a partir do qual é "dentro"
const ESCALA = 2;          // amostra o PNG ampliado: contorno mais macio
const EPS_DP = 0.9;        // simplificação, em pixels da amostragem
const ERRO_FIT = 1.6;      // erro máximo do ajuste de Bézier, em pixels

/* ── 1 · alfa do PNG, via canvas ── */
const b64 = fs.readFileSync(ORIGEM).toString('base64');
const navegador = await chromium.launch();
const pagina = await navegador.newPage();
const bruto = await pagina.evaluate(async ({ b64, escala }) => {
  const img = new Image();
  img.src = 'data:image/png;base64,' + b64;
  await img.decode();
  const L = Math.round(img.naturalWidth * escala);
  const A = Math.round(img.naturalHeight * escala);
  const c = document.createElement('canvas');
  c.width = L; c.height = A;
  const ctx = c.getContext('2d', { willReadFrequently: true });
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(img, 0, 0, L, A);
  const d = ctx.getImageData(0, 0, L, A).data;
  // só o alfa, como string base64 (1 byte por pixel)
  const alfa = new Uint8Array(L * A);
  for (let i = 0; i < alfa.length; i++) alfa[i] = d[i * 4 + 3];
  let s = '';
  for (let i = 0; i < alfa.length; i += 8192) s += String.fromCharCode(...alfa.subarray(i, i + 8192));
  return { L, A, alfa: btoa(s), largOriginal: img.naturalWidth, altOriginal: img.naturalHeight };
}, { b64, escala: ESCALA });
await navegador.close();

const { L, A } = bruto;
const alfa = Buffer.from(bruto.alfa, 'base64');
console.log(`origem ${bruto.largOriginal}×${bruto.altOriginal} · amostrado ${L}×${A}`);

/* ── 2 · recorta a faixa da montanha ─────────────────────────────────
   O arquivo tem montanha em cima e o letreiro "DESBRAVANDO UTV" embaixo, separados por
   uma faixa transparente. Acho essa faixa procurando a linha vazia mais alta depois do
   primeiro conteúdo — assim o recorte não depende de número mágico. */
const linhaTemPixel = (y) => {
  for (let x = 0; x < L; x++) if (alfa[y * L + x] >= 128) return true;
  return false;
};
let primeira = 0;
while (primeira < A && !linhaTemPixel(primeira)) primeira++;
let corte = primeira;
while (corte < A && linhaTemPixel(corte)) corte++;
console.log(`montanha: linhas ${primeira} a ${corte} (faixa transparente começa em ${corte})`);

const dentroDoRecorte = (x, y) => y >= primeira && y < corte;
const va = (x, y) => (x < 0 || y < 0 || x >= L || y >= A || !dentroDoRecorte(x, y) ? 0 : alfa[y * L + x] / 255);

/* ── 3 · marching squares com interpolação ── */
const TABELA = {
  1: [[3, 0]], 2: [[0, 1]], 3: [[3, 1]], 4: [[1, 2]], 6: [[0, 2]], 7: [[3, 2]],
  8: [[2, 3]], 9: [[0, 2]], 11: [[1, 2]], 12: [[3, 1]], 13: [[0, 1]], 14: [[3, 0]],
};
const lerp = (t, a, b) => (Math.abs(b - a) < 1e-9 ? 0.5 : (t - a) / (b - a));

const segmentos = [];
for (let y = primeira - 1; y <= corte; y++) {
  for (let x = -1; x <= L; x++) {
    const v00 = va(x, y), v10 = va(x + 1, y), v11 = va(x + 1, y + 1), v01 = va(x, y + 1);
    const caso = (v00 >= LIMIAR ? 1 : 0) | (v10 >= LIMIAR ? 2 : 0) | (v11 >= LIMIAR ? 4 : 0) | (v01 >= LIMIAR ? 8 : 0);
    if (caso === 0 || caso === 15) continue;
    const ponto = (aresta) => {
      if (aresta === 0) return [x + lerp(LIMIAR, v00, v10), y];
      if (aresta === 1) return [x + 1, y + lerp(LIMIAR, v10, v11)];
      if (aresta === 2) return [x + lerp(LIMIAR, v01, v11), y + 1];
      return [x, y + lerp(LIMIAR, v00, v01)];
    };
    let pares = TABELA[caso];
    if (!pares) {
      // 5 e 10 são ambíguos — decide pelo valor médio do centro da célula
      const centro = (v00 + v10 + v11 + v01) / 4 >= LIMIAR;
      pares = caso === 5
        ? (centro ? [[3, 2], [0, 1]] : [[3, 0], [1, 2]])
        : (centro ? [[0, 2], [2, 3]] : [[0, 1], [2, 3]]);
    }
    for (const [a, b] of pares) segmentos.push([ponto(a), ponto(b)]);
  }
}
console.log(`${segmentos.length} segmentos de contorno`);

/* ── 4 · costura os segmentos em anéis fechados ── */
const chave = (p) => `${p[0].toFixed(3)},${p[1].toFixed(3)}`;
const porPonto = new Map();
for (const s of segmentos) {
  for (const [i, p] of s.entries()) {
    const k = chave(p);
    if (!porPonto.has(k)) porPonto.set(k, []);
    porPonto.get(k).push({ seg: s, ponta: i });
  }
}
const usados = new Set();
const aneis = [];
for (const s of segmentos) {
  if (usados.has(s)) continue;
  usados.add(s);
  const anel = [s[0], s[1]];
  let atual = s[1];
  for (let guarda = 0; guarda < segmentos.length + 5; guarda++) {
    const vizinhos = (porPonto.get(chave(atual)) || []).filter((v) => !usados.has(v.seg));
    if (!vizinhos.length) break;
    const { seg, ponta } = vizinhos[0];
    usados.add(seg);
    atual = seg[1 - ponta];
    anel.push(atual);
    if (chave(atual) === chave(anel[0])) break;
  }
  if (anel.length > 12) aneis.push(anel);
}
aneis.sort((a, b) => b.length - a.length);
console.log(`${aneis.length} anel(éis): ${aneis.map((a) => a.length).join(', ')} pontos`);

/* ── 5 · Douglas-Peucker ── */
function simplificar(pts, eps) {
  if (pts.length < 3) return pts;
  const distancia = (p, a, b) => {
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const l2 = dx * dx + dy * dy;
    if (l2 === 0) return Math.hypot(p[0] - a[0], p[1] - a[1]);
    let t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(p[0] - (a[0] + t * dx), p[1] - (a[1] + t * dy));
  };
  const anda = (ini, fim) => {
    let pior = 0, idx = -1;
    for (let i = ini + 1; i < fim; i++) {
      const d = distancia(pts[i], pts[ini], pts[fim]);
      if (d > pior) { pior = d; idx = i; }
    }
    if (pior <= eps) return [pts[ini]];
    return [...anda(ini, idx), ...anda(idx, fim)];
  };
  return [...anda(0, pts.length - 1), pts[pts.length - 1]];
}

/* ── 6 · ajuste de cúbicas (Schneider) ── */
const sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1]];
const mul = (a, k) => [a[0] * k, a[1] * k];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1];
const norm = (v) => { const m = Math.hypot(v[0], v[1]); return m < 1e-12 ? [0, 0] : [v[0] / m, v[1] / m]; };
const B0 = (t) => (1 - t) ** 3, B1 = (t) => 3 * t * (1 - t) ** 2, B2 = (t) => 3 * t * t * (1 - t), B3 = (t) => t ** 3;
const emQ = (bz, t) => add(add(mul(bz[0], B0(t)), mul(bz[1], B1(t))), add(mul(bz[2], B2(t)), mul(bz[3], B3(t))));

function parametrizar(pts) {
  const u = [0];
  for (let i = 1; i < pts.length; i++) u.push(u[i - 1] + Math.hypot(...sub(pts[i], pts[i - 1])));
  const fim = u[u.length - 1] || 1;
  return u.map((v) => v / fim);
}

function gerarBezier(pts, u, t1, t2) {
  const n = pts.length;
  const A = u.map((ui) => [mul(t1, B1(ui)), mul(t2, B2(ui))]);
  let c00 = 0, c01 = 0, c11 = 0, x0 = 0, x1 = 0;
  for (let i = 0; i < n; i++) {
    c00 += dot(A[i][0], A[i][0]);
    c01 += dot(A[i][0], A[i][1]);
    c11 += dot(A[i][1], A[i][1]);
    const tmp = sub(pts[i], add(add(mul(pts[0], B0(u[i])), mul(pts[0], B1(u[i]))), add(mul(pts[n - 1], B2(u[i])), mul(pts[n - 1], B3(u[i])))));
    x0 += dot(A[i][0], tmp);
    x1 += dot(A[i][1], tmp);
  }
  const det = c00 * c11 - c01 * c01;
  const corda = Math.hypot(...sub(pts[n - 1], pts[0]));
  let a1, a2;
  if (Math.abs(det) < 1e-12) {
    a1 = a2 = corda / 3;
  } else {
    a1 = (x0 * c11 - x1 * c01) / det;
    a2 = (c00 * x1 - c01 * x0) / det;
  }
  // TRAVA — sem ela o sistema mal condicionado devolve amplitudes enormes e o ponto de
  // controle dispara para longe da figura. No traçado da montanha isso virava duas
  // agulhas saindo do pico e inflava a caixa da marca em 6×.
  const minimo = corda * 1e-6;
  const teto = corda * 1.5;
  if (!(a1 > minimo) || !(a2 > minimo) || a1 > teto || a2 > teto) {
    a1 = a2 = corda / 3;
  }
  return [pts[0], add(pts[0], mul(t1, a1)), add(pts[n - 1], mul(t2, a2)), pts[n - 1]];
}

function maiorErro(pts, u, bz) {
  let pior = 0, idx = Math.floor(pts.length / 2);
  for (let i = 1; i < pts.length - 1; i++) {
    const d = Math.hypot(...sub(emQ(bz, u[i]), pts[i]));
    if (d * d > pior) { pior = d * d; idx = i; }
  }
  return [Math.sqrt(pior), idx];
}

function ajustar(pts, t1, t2, erro, saida) {
  if (pts.length === 2) {
    const d = Math.hypot(...sub(pts[1], pts[0])) / 3;
    saida.push([pts[0], add(pts[0], mul(t1, d)), add(pts[1], mul(t2, d)), pts[1]]);
    return;
  }
  const u = parametrizar(pts);
  let bz = gerarBezier(pts, u, t1, t2);
  let [e, idx] = maiorErro(pts, u, bz);
  if (e < erro) { saida.push(bz); return; }
  if (e < erro * erro) {
    // reparametriza algumas vezes antes de desistir e partir a curva
    let uu = u;
    for (let k = 0; k < 12; k++) {
      uu = uu.map((ui, i) => {
        const q = emQ(bz, ui);
        const d1 = add(add(mul(sub(bz[1], bz[0]), 3 * (1 - ui) ** 2), mul(sub(bz[2], bz[1]), 6 * (1 - ui) * ui)), mul(sub(bz[3], bz[2]), 3 * ui * ui));
        const d2 = add(mul(add(sub(bz[2], mul(bz[1], 2)), bz[0]), 6 * (1 - ui)), mul(add(sub(bz[3], mul(bz[2], 2)), bz[1]), 6 * ui));
        const num = dot(sub(q, pts[i]), d1);
        const den = dot(d1, d1) + dot(sub(q, pts[i]), d2);
        return Math.abs(den) < 1e-12 ? ui : ui - num / den;
      });
      bz = gerarBezier(pts, uu, t1, t2);
      [e, idx] = maiorErro(pts, uu, bz);
      if (e < erro) { saida.push(bz); return; }
    }
  }
  const centro = norm(sub(pts[idx - 1], pts[idx + 1]));
  ajustar(pts.slice(0, idx + 1), t1, centro, erro, saida);
  ajustar(pts.slice(idx), mul(centro, -1), t2, erro, saida);
}

/* ── 7 · monta o path ── */
const caminhos = [];
for (const anel of aneis) {
  const pts = simplificar(anel, EPS_DP);
  if (pts.length < 4) continue;
  const fechado = pts.slice(0, -1);
  const t1 = norm(sub(fechado[1], fechado[fechado.length - 1]));
  const t2 = norm(sub(fechado[fechado.length - 2], fechado[0]));
  const curvas = [];
  ajustar([...fechado, fechado[0]], t1, t2, ERRO_FIT, curvas);
  caminhos.push(curvas);
}

// caixa justa: mede a CURVA, não os pontos de controle (que ficam fora do desenho)
let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
for (const c of caminhos) for (const bz of c) {
  for (let i = 0; i <= 24; i++) {
    const [px, py] = emQ(bz, i / 24);
    minX = Math.min(minX, px); maxX = Math.max(maxX, px);
    minY = Math.min(minY, py); maxY = Math.max(maxY, py);
  }
}
// viewBox em 1000 de largura, coordenadas com 2 casas
const k = 1000 / (maxX - minX);
const altura = Math.round((maxY - minY) * k * 100) / 100;
const n = (v) => Math.round(v * 100) / 100;
const X = (v) => n((v - minX) * k);
const Y = (v) => n((v - minY) * k);

const d = caminhos.map((curvas) => {
  let s = `M${X(curvas[0][0][0])} ${Y(curvas[0][0][1])}`;
  for (const bz of curvas) s += `C${X(bz[1][0])} ${Y(bz[1][1])} ${X(bz[2][0])} ${Y(bz[2][1])} ${X(bz[3][0])} ${Y(bz[3][1])}`;
  return s + 'Z';
}).join('');

const totalCurvas = caminhos.reduce((s, c) => s + c.length, 0);
console.log(`${totalCurvas} curvas de Bézier · path com ${d.length} caracteres`);

const svg = (fill, nome) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 ${altura}" role="img" aria-label="Desbravando UTV">
  <title>Desbravando UTV — marca da montanha</title>
  <path fill="${fill}" fill-rule="evenodd" d="${d}"/>
</svg>
`;

fs.writeFileSync(path.join(DIR, 'logo-montanha.svg'), svg('currentColor'), 'utf8');
fs.writeFileSync(path.join(DIR, 'logo-montanha-preto.svg'), svg('#111111'), 'utf8');
fs.writeFileSync(path.join(DIR, 'logo-montanha-branco.svg'), svg('#FFFFFF'), 'utf8');
console.log(`\nproporção 1000 × ${altura}  (${(1000 / altura).toFixed(3)} : 1)`);
console.log('→ marca/logo-montanha.svg (currentColor) · -preto.svg · -branco.svg');
