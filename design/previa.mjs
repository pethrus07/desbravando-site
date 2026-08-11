// Renderiza o .pen em PNG, para conferir o layout sem depender do editor.
// O modelo do pen.dev (frame + auto-layout) mapeia quase 1:1 em flexbox.
// Rodar:  node design/previa.mjs
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '/Users/olive/Projetos/qa-parresia/node_modules/@playwright/test/index.mjs';
import { criarRenderizador } from './lib/render-html.mjs';

const RAIZ = path.dirname(new URL(import.meta.url).pathname).replace(/^\//, '');
const ARQ = path.join(RAIZ, process.argv[2] || 'desbravando-repaginacao.pen');
const SAIDA = path.join(RAIZ, '..', 'previa');
const CACHE_ICONES = path.join(RAIZ, '.cache-icones');
fs.mkdirSync(SAIDA, { recursive: true });
fs.mkdirSync(CACHE_ICONES, { recursive: true });

const doc = JSON.parse(fs.readFileSync(ARQ, 'utf8'));

/* ── renderizador compartilhado com exportar.mjs ── */
const { renderizar } = criarRenderizador({ variables: doc.variables });

/* ── monta uma página HTML por tela ── */
const CSS_BASE = `
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
body{background:#2a2a2c}
`;

const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 2 });

const resumo = [];
for (const tela of doc.children) {
  const larg = typeof tela.width === 'number' ? tela.width : 1440;
  const page = await ctx.newPage();
  await page.setViewportSize({ width: larg, height: 900 });
  await page.setContent(
    `<html><head><meta charset="utf-8"><style>${CSS_BASE}</style></head><body>${renderizar(tela, 'none')}</body></html>`,
    { waitUntil: 'load' },
  );
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2500); // fotos do Wix

  // detecta conteúdo estourando frame de altura fixa (o erro mais fácil de cometer
  // num layout com padding grande dentro de hero de altura travada)
  // qualquer filho cuja caixa saia da caixa do pai — pega padding grande em barra
  // de altura travada, texto que não coube, coluna estourando etc.
  const estouros = await page.evaluate(() => {
    const achados = [];
    for (const pai of document.querySelectorAll('div')) {
      if (!pai.children.length) continue;
      const p = pai.getBoundingClientRect();
      if (p.height < 2) continue;
      let pior = 0;
      for (const f of pai.children) {
        const c = f.getBoundingClientRect();
        pior = Math.max(pior, c.bottom - p.bottom, p.top - c.top, c.right - p.right, p.left - c.left);
      }
      if (pior > 2) {
        // reporta o ancestral nomeado mais próximo, para o aviso ser útil
        let n = pai;
        while (n && !n.dataset.nome) n = n.parentElement;
        const nome = pai.dataset.nome || `dentro de ${n?.dataset.nome || '?'}`;
        // faixa que passa da tela de propósito (rola na horizontal) não é defeito
        if (/rolagem horizontal/.test(nome)) continue;
        achados.push({ nome, vaza: Math.round(pior), alt: Math.round(p.height) });
      }
    }
    return achados.sort((a, b) => b.vaza - a.vaza).slice(0, 12);
  });
  for (const e of estouros) console.log(`   ! "${e.nome}" (${e.alt}px) vaza ${e.vaza}px`);

  // contraste: pega texto branco sobre superfície branca (e vizinhos), que é o erro
  // mais fácil de introduzir ao migrar uma paleta clara para uma escura
  const semContraste = await page.evaluate(() => {
    const rgba = (c) => {
      const m = (c || '').match(/[\d.]+/g);
      if (!m) return null;
      return { r: +m[0], g: +m[1], b: +m[2], a: m.length > 3 ? parseFloat(m[3]) : 1 };
    };
    const lumDe = ({ r, g, b }) => {
      const f = (v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    /**
     * Fundo real: um véu como #FFFFFF0F não É o fundo, ele se compõe sobre o que vem
     * atrás. Sobe empilhando as camadas translúcidas até achar uma opaca e compõe.
     */
    const fundoDe = (el) => {
      const camadas = [];
      for (let n = el; n; n = n.parentElement) {
        if (getComputedStyle(n).backgroundImage !== 'none') return null; // sobre foto não dá pra medir
        const c = rgba(getComputedStyle(n).backgroundColor);
        if (!c || c.a === 0) continue;
        camadas.push(c);
        if (c.a >= 0.999) {
          let base = camadas.pop();
          while (camadas.length) {
            const t = camadas.pop();
            base = {
              r: t.r * t.a + base.r * (1 - t.a),
              g: t.g * t.a + base.g * (1 - t.a),
              b: t.b * t.a + base.b * (1 - t.a),
              a: 1,
            };
          }
          return { l: lumDe(base), el: n };
        }
      }
      return null;
    };
    const achados = [];
    for (const el of document.querySelectorAll('div')) {
      if (el.children.length || !el.textContent.trim()) continue;
      const f = fundoDe(el.parentElement);
      if (!f) continue;
      const ct = rgba(getComputedStyle(el).color);
      if (!ct || ct.a < 0.3) continue;
      const lt = lumDe(ct);
      const razao = (Math.max(lt, f.l) + 0.05) / (Math.min(lt, f.l) + 0.05);
      if (razao < 2.5) {
        let n = el; while (n && !n.dataset.nome) n = n.parentElement;
        achados.push({ txt: el.textContent.trim().slice(0, 32), razao: razao.toFixed(2), onde: n?.dataset.nome || '?' });
      }
    }
    const vistos = new Set();
    return achados.filter((a) => !vistos.has(a.txt + a.onde) && vistos.add(a.txt + a.onde)).slice(0, 10);
  });
  for (const c of semContraste) console.log(`   ! contraste ${c.razao}:1 — "${c.txt}" em ${c.onde}`);

  // fotos que não carregaram
  const quebradas = await page.evaluate(async () => {
    const urls = [...new Set([...document.querySelectorAll('div')]
      .map((el) => getComputedStyle(el).backgroundImage)
      .filter((b) => b && b !== 'none' && b.includes('url('))
      .map((b) => b.slice(b.indexOf('url(') + 4).replace(/^["']|["']\)?$/g, '').split(')')[0]))];
    const ruins = [];
    for (const u of urls) {
      const ok = await new Promise((r) => { const i = new Image(); i.onload = () => r(true); i.onerror = () => r(false); i.src = u; });
      if (!ok) ruins.push(u.slice(0, 80));
    }
    return { total: urls.length, ruins };
  });
  if (quebradas.ruins.length) console.log(`   ! ${quebradas.ruins.length}/${quebradas.total} fotos não carregaram`);

  const alvo = await page.$('body > div');
  const caixa = await alvo.boundingBox();
  const nomeArq = tela.name.replace(/[^\w\dÀ-ú·. ()—-]/g, '').replace(/\s+/g, '-').toLowerCase();
  await alvo.screenshot({ path: path.join(SAIDA, `${nomeArq}.png`) });
  resumo.push({ tela: tela.name, largura: Math.round(caixa.width), altura: Math.round(caixa.height) });
  console.log(`${String(Math.round(caixa.width)).padStart(5)} × ${String(Math.round(caixa.height)).padStart(6)}   ${tela.name}`);
  await page.close();
}

await browser.close();
fs.writeFileSync(path.join(SAIDA, 'medidas.json'), JSON.stringify(resumo, null, 2));
console.log(`\n→ ${SAIDA}`);
