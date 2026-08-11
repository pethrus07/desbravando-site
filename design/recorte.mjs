// Recorta cada MÓDULO em PNG — é a figura que acompanha a ficha técnica no manual.
// Rodar:  node design/recorte.mjs             → todos os módulos de todas as telas
//         node design/recorte.mjs roteiro     → só os que casam com o termo
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from '/Users/olive/Projetos/qa-parresia/node_modules/@playwright/test/index.mjs';
import { criarRenderizador } from './lib/render-html.mjs';
import { nomeArquivo } from './recorte-nome.mjs';

const RAIZ = path.dirname(new URL(import.meta.url).pathname).replace(/^\//, '');
const doc = JSON.parse(fs.readFileSync(path.join(RAIZ, 'desbravando-repaginacao.pen'), 'utf8'));
const SAIDA = path.join(RAIZ, '..', 'previa', 'modulos');
fs.mkdirSync(SAIDA, { recursive: true });

const filtro = process.argv[2]?.toLowerCase();
const IGNORAR = /^(frame|row|col|sobrelinha|botão\/|ícone\/|status\/|logo\/|marca\/)/;

/** Mesma regra da ficha: módulo é o primeiro nó nomeado até 3 níveis abaixo da tela. */
function modulosDe(tela) {
  const achados = [];
  const anda = (n, p) => {
    if (n.name && !IGNORAR.test(n.name) && n.name !== tela.name && p <= 3) { achados.push(n.name); return; }
    for (const f of n.children || []) anda(f, p + 1);
  };
  for (const f of tela.children || []) anda(f, 1);
  return achados;
}

const { renderizar } = criarRenderizador({ variables: doc.variables });
const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 2 });
const CSS = `@import url('https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');*{margin:0;padding:0;box-sizing:border-box}body{background:#2a2a2c}`;

const indice = [];
let total = 0;
for (const tela of doc.children) {
  const mods = modulosDe(tela).filter((m) => !filtro || m.toLowerCase().includes(filtro));
  if (!mods.length) continue;
  const page = await ctx.newPage();
  await page.setViewportSize({ width: typeof tela.width === 'number' ? tela.width : 1440, height: 900 });
  await page.setContent(`<html><head><meta charset="utf-8"><style>${CSS}</style></head><body>${renderizar(tela, 'none')}</body></html>`, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2500);

  const prefixo = tela.name.match(/^(M?\d+)/)?.[1] || 'x';
  for (const m of mods) {
    const el = await page.$(`[data-nome="${CSS.escape ? m : m}"]`).catch(() => null)
      || await page.$(`[data-nome="${m.replace(/"/g, '\\"')}"]`);
    if (!el) { console.log(`   ! não achei "${m}" em ${tela.name}`); continue; }
    const nome = nomeArquivo(prefixo, m);
    await el.screenshot({ path: path.join(SAIDA, `${nome}.png`) });
    const b = await el.boundingBox();
    indice.push({ tela: tela.name, modulo: m, arquivo: `${nome}.png`, w: Math.round(b.width), h: Math.round(b.height) });
    total++;
  }
  await page.close();
}
await browser.close();

fs.writeFileSync(path.join(SAIDA, 'indice.json'), JSON.stringify(indice, null, 2));
console.log(`${total} módulos recortados\n→ previa/modulos/`);
