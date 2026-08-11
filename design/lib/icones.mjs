// Converte os SVGs do lucide (já em cache em design/.cache-icones) num nó `path` do
// .pen, com a geometria embutida.
//
// Por quê: o nó `icon_font` depende de a fonte do lucide estar disponível no
// renderizador, e neste ambiente ela não está — o canvas fica em branco. O nó `path`
// não depende de nada de fora; é o mesmo recurso que o arquivo de boas-vindas da
// própria extensão usa para desenhar a seta.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { id } from './pen.mjs';

const CACHE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.cache-icones');

const n = (v) => Math.round(parseFloat(v) * 1000) / 1000;

/** Converte primitivas do SVG (rect/circle/line/polyline/ellipse) em comandos de path. */
function primitivaParaPath(tag, a) {
  const g = (k, d = 0) => (a[k] !== undefined ? parseFloat(a[k]) : d);
  switch (tag) {
    case 'path':
      return a.d || '';
    case 'line':
      return `M${n(g('x1'))} ${n(g('y1'))}L${n(g('x2'))} ${n(g('y2'))}`;
    case 'polyline':
    case 'polygon': {
      const pts = (a.points || '').trim().split(/[\s,]+/).map(Number);
      if (pts.length < 4) return '';
      let d = `M${n(pts[0])} ${n(pts[1])}`;
      for (let i = 2; i < pts.length; i += 2) d += `L${n(pts[i])} ${n(pts[i + 1])}`;
      return tag === 'polygon' ? d + 'Z' : d;
    }
    case 'rect': {
      const x = g('x'), y = g('y'), w = g('width'), h = g('height'), r = Math.min(g('rx', 0), w / 2, h / 2);
      if (!r) return `M${n(x)} ${n(y)}H${n(x + w)}V${n(y + h)}H${n(x)}Z`;
      return (
        `M${n(x + r)} ${n(y)}H${n(x + w - r)}A${n(r)} ${n(r)} 0 0 1 ${n(x + w)} ${n(y + r)}` +
        `V${n(y + h - r)}A${n(r)} ${n(r)} 0 0 1 ${n(x + w - r)} ${n(y + h)}` +
        `H${n(x + r)}A${n(r)} ${n(r)} 0 0 1 ${n(x)} ${n(y + h - r)}` +
        `V${n(y + r)}A${n(r)} ${n(r)} 0 0 1 ${n(x + r)} ${n(y)}Z`
      );
    }
    case 'circle': {
      const cx = g('cx'), cy = g('cy'), r = g('r');
      return `M${n(cx - r)} ${n(cy)}A${n(r)} ${n(r)} 0 1 0 ${n(cx + r)} ${n(cy)}A${n(r)} ${n(r)} 0 1 0 ${n(cx - r)} ${n(cy)}Z`;
    }
    case 'ellipse': {
      const cx = g('cx'), cy = g('cy'), rx = g('rx'), ry = g('ry');
      return `M${n(cx - rx)} ${n(cy)}A${n(rx)} ${n(ry)} 0 1 0 ${n(cx + rx)} ${n(cy)}A${n(rx)} ${n(ry)} 0 1 0 ${n(cx - rx)} ${n(cy)}Z`;
    }
    default:
      return '';
  }
}

const cache = new Map();
const avisados = new Set();

/** Lê o SVG do lucide e devolve a geometria unificada num único `d`. */
export function geometriaDe(nome) {
  if (cache.has(nome)) return cache.get(nome);
  const arq = path.join(CACHE, `${nome}.svg`);
  if (!fs.existsSync(arq)) { cache.set(nome, null); return null; }
  const svg = fs.readFileSync(arq, 'utf8');
  const partes = [];
  for (const m of svg.matchAll(/<(path|rect|circle|line|polyline|polygon|ellipse)\b([^>]*)\/?>/g)) {
    const attrs = {};
    for (const a of m[2].matchAll(/([\w-]+)="([^"]*)"/g)) attrs[a[1]] = a[2];
    const d = primitivaParaPath(m[1], attrs);
    if (d) partes.push(d.trim());
  }
  // Cada <path> do SVG começa com o ponto corrente em (0,0). Ao concatenar tudo num
  // `d` só, um `m` minúsculo passaria a ser relativo ao fim do subpath anterior e o
  // desenho sairia deslocado.
  // Não dá para simplesmente trocar por `M`: depois de um moveto, os pares de números
  // soltos são linetos implícitos que herdam o caso do comando — virariam absolutos e
  // deformariam o traço. A saída é reancorar em (0,0) e deixar o `m` relativo como está.
  const geo = partes.map((p) => (/^\s*m/.test(p) ? `M0 0 ${p.trim()}` : p)).join(' ') || null;
  cache.set(nome, geo);
  return geo;
}

/**
 * Ícone como nó `path`. Mantém a mesma assinatura do antigo `icone()`, então as telas
 * não precisam mudar. O lucide desenha num quadro de 24×24; escalamos por aí.
 */
export function icone(nome, props = {}) {
  const { width = 20, height = 20, fill = '#FFFFFF', ...resto } = props;
  const geo = geometriaDe(nome);
  if (!geo) {
    // Sem SVG em cache o ícone vira um quadradinho — e isso já passou batido uma vez.
    // Avisa alto: baixe com
    //   curl -sf https://unpkg.com/lucide-static@0.469.0/icons/<nome>.svg -o design/.cache-icones/<nome>.svg
    if (!avisados.has(nome)) {
      avisados.add(nome);
      console.warn(`! ícone sem SVG em cache: "${nome}" — vai sair como quadrado. Baixe em design/.cache-icones/${nome}.svg`);
    }
    return { type: 'rectangle', id: id(), width, height, fill, opacity: 0.35, ...resto };
  }
  const lado = Math.max(width, height);
  return {
    type: 'path',
    id: id(),
    name: `ícone/${nome}`,
    geometry: geo,
    width: lado,
    height: lado,
    stroke: fill,
    strokeWidth: (2 * lado) / 24, // lucide usa traço 2 num quadro de 24
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    ...resto,
  };
}

/** Lista os ícones usados que não têm SVG em cache. */
export function faltando(nomes) {
  return [...new Set(nomes)].filter((n) => !geometriaDe(n));
}
