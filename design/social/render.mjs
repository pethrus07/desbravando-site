// Renderiza as peças sociais em PNG nas dimensões exatas, e CONFERE o resultado
// antes de dizer que está pronto. Mesmo espírito do design/previa.mjs.
//
// Rodar:  node design/social/render.mjs                    (toda edição × registro)
//         node design/social/render.mjs setembro           (uma edição, os 2 registros)
//         node design/social/render.mjs setembro nucleo    (uma peça só)
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '/Users/olive/Projetos/qa-parresia/node_modules/@playwright/test/index.mjs';
import { fontesEmbutidas, logoDataUri } from './lib/fontes.mjs';
import { arte } from '../lib/artes.mjs';
import { TEMAS, FEED } from './lib/identidade.mjs';
import { cegonha, meta, EDICOES } from './pecas/cegonha.mjs';

const DIR = path.dirname(new URL(import.meta.url).pathname).replace(/^\//, '');
const RAIZ = path.join(DIR, '..', '..');
const SAIDA = path.join(DIR, 'saida');
fs.mkdirSync(SAIDA, { recursive: true });

const fontes = await fontesEmbutidas(path.join(RAIZ, 'design', '.cache-web'));
const logoUri = logoDataUri(arte('marca', 'logo-desbravando-original.png'));
console.log(`fontes embutidas: ${(fontes.match(/@font-face/g) || []).length}`);

/* argumentos soltos: o que for nome de edição filtra edição, o que for tema filtra tema */
const args = process.argv.slice(2);
const escolhe = (mapa) => {
  const pedidos = args.filter((a) => a in mapa);
  const invalido = args.find((a) => !(a in EDICOES) && !(a in TEMAS));
  if (invalido) throw new Error(`não conheço "${invalido}" (edições: ${Object.keys(EDICOES).join(', ')} · registros: ${Object.keys(TEMAS).join(', ')})`);
  return pedidos.length ? pedidos : Object.keys(mapa);
};
const edicoes = escolhe(EDICOES);
const temas = escolhe(TEMAS);

const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 1 });
let problemas = 0;

for (const nomeEdicao of edicoes) for (const chave of temas) {
  const tema = TEMAS[chave];
  const edicao = EDICOES[nomeEdicao];
  const arquivo = `${meta.nome}-${nomeEdicao}-${chave}`;

  const page = await ctx.newPage();
  await page.setViewportSize({ width: FEED.largura, height: FEED.altura });
  const html = cegonha({ tema, fontes, logoUri, edicao });
  fs.writeFileSync(path.join(SAIDA, `${arquivo}.html`), html);
  await page.setContent(`<html><head><meta charset="utf-8"></head><body>${html}</body></html>`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);

  console.log(`\n── ${nomeEdicao} · ${tema.rotulo}`);

  /* 1. as fontes da marca carregaram de verdade? (fallback silencioso arruína a fidelidade) */
  const semFonte = await page.evaluate(() =>
    ['88px Anton', '700 24px Archivo', '600 17px Archivo'].filter((f) => !document.fonts.check(f)));
  if (semFonte.length) { console.log(`   ! fonte não carregou: ${semFonte.join(' | ')}`); problemas++; }

  /* 2. algo vazando da arte, ou conteúdo passando da altura travada? */
  const estouros = await page.evaluate(() => {
    const peca = document.querySelector('.peca').getBoundingClientRect();
    const achados = [];
    for (const el of document.querySelectorAll('.conteudo *')) {
      const r = el.getBoundingClientRect();
      if (r.height < 1 && r.width < 1) continue;
      const vaza = Math.max(r.bottom - peca.bottom, peca.top - r.top, r.right - peca.right, peca.left - r.left);
      if (vaza > 1) achados.push({ cls: el.className || el.tagName, vaza: Math.round(vaza), txt: el.textContent.trim().slice(0, 28) });
    }
    return achados.sort((a, b) => b.vaza - a.vaza).slice(0, 8);
  });
  for (const e of estouros) { console.log(`   ! "${e.cls}" vaza ${e.vaza}px — ${e.txt}`); problemas++; }

  /* 3. contraste de cada texto contra o fundo real (compõe as camadas translúcidas) */
  const fracos = await page.evaluate(() => {
    const rgba = (c) => { const m = (c || '').match(/[\d.]+/g); return m ? { r: +m[0], g: +m[1], b: +m[2], a: m.length > 3 ? +m[3] : 1 } : null; };
    const lum = ({ r, g, b }) => { const f = (v) => { const s = v / 255; return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const fundo = rgba(getComputedStyle(document.querySelector('.peca')).backgroundColor);
    const achados = [];
    for (const el of document.querySelectorAll('.conteudo *')) {
      const txt = el.textContent.trim();
      if (!txt || el.children.length) continue;
      const cor = rgba(getComputedStyle(el).color);
      if (!cor) continue;
      // texto translúcido se compõe sobre o fundo
      const comp = { r: cor.r * cor.a + fundo.r * (1 - cor.a), g: cor.g * cor.a + fundo.g * (1 - cor.a), b: cor.b * cor.a + fundo.b * (1 - cor.a) };
      const lt = lum(comp), lf = lum(fundo);
      const razao = (Math.max(lt, lf) + 0.05) / (Math.min(lt, lf) + 0.05);
      const px = parseFloat(getComputedStyle(el).fontSize);
      const minimo = px >= 24 ? 3 : 4.5; // WCAG AA: texto grande afrouxa
      if (razao < minimo) achados.push({ txt: txt.slice(0, 30), razao: razao.toFixed(2), px: Math.round(px), minimo });
    }
    return achados;
  });
  for (const f of fracos) { console.log(`   ! contraste ${f.razao}:1 (mín ${f.minimo}) em ${f.px}px — "${f.txt}"`); problemas++; }

  const alvo = await page.$('.peca');
  const caixa = await alvo.boundingBox();
  const arq = path.join(SAIDA, `${arquivo}.png`);
  await alvo.screenshot({ path: arq });
  const ok = Math.round(caixa.width) === FEED.largura && Math.round(caixa.height) === FEED.altura;
  console.log(`   ${Math.round(caixa.width)}×${Math.round(caixa.height)} ${ok ? 'OK' : `! esperado ${FEED.largura}×${FEED.altura}`}`);
  if (!ok) problemas++;
  console.log(`   → ${path.relative(RAIZ, arq)}`);
  await page.close();
}

await browser.close();
console.log(problemas ? `\n${problemas} problema(s) a resolver.` : '\nSem problemas.');
