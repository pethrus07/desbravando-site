// Segunda passada: o erro de "src", as fotos da agenda, e o texto da Home.
import fs from 'node:fs';
import { chromium } from '/Users/olive/Projetos/qa-parresia/node_modules/playwright/index.mjs';

const nav = await chromium.launch();

/* ── 1 · Grupo Avulso: erro de src + fotos ─────────────────────────────── */
{
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
  const pg = await ctx.newPage();
  const erros = [];
  pg.on('console', (m) => {
    if (m.type() !== 'error') return;
    erros.push({ texto: m.text().replace(/\s+/g, ' ').slice(0, 200), onde: m.location() });
  });
  await pg.goto('https://www.desbravandoutv.com/blank-2', { waitUntil: 'load', timeout: 60000 });
  await pg.evaluate(async () => {
    for (let y = 0; y < 4000; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 200)); }
    window.scrollTo(0, 0);
  });
  await pg.waitForTimeout(4000);

  console.log('── ERROS com origem ──');
  for (const e of erros) console.log('  ' + (e.onde?.url || '?').split('/').pop().slice(0, 46) + ':' + (e.onde?.lineNumber ?? '?') + '  ' + e.texto);

  const imgs = await pg.evaluate(() => [...document.querySelectorAll('img')].map((i) => {
    const r = i.getBoundingClientRect();
    return {
      alt: (i.alt || '').slice(0, 40),
      w: Math.round(r.width), h: Math.round(r.height),
      nat: i.naturalWidth + 'x' + i.naturalHeight,
      src: (i.currentSrc || i.src || '').replace('https://static.wixstatic.com/media/', '').slice(0, 76),
    };
  }));
  console.log('\n── IMAGENS (Grupo Avulso) ──');
  imgs.forEach((i) => console.log(`  ${String(i.w).padStart(4)}x${String(i.h).padStart(3)} nat ${i.nat.padEnd(11)} ${i.src}`));

  // elementos de imagem VAZIOS: o Wix desenha um placeholder sem <img>
  const vazios = await pg.evaluate(() => [...document.querySelectorAll('[id^="comp-"]')]
    .filter((el) => {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return r.width > 60 && r.height > 40 && !el.querySelector('img') &&
        (s.backgroundImage === 'none') && /image|wphoto/i.test(el.className + el.getAttribute('data-testid'));
    })
    .map((el) => el.id + ' ' + Math.round(el.getBoundingClientRect().width) + 'x' + Math.round(el.getBoundingClientRect().height)));
  console.log('\n── elementos de imagem sem foto: ' + (vazios.length ? vazios.join(' | ') : 'nenhum'));

  await ctx.close();
}

/* ── 2 · Home: texto e estrutura ───────────────────────────────────────── */
{
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
  const pg = await ctx.newPage();
  await pg.goto('https://www.desbravandoutv.com/', { waitUntil: 'load', timeout: 60000 });
  await pg.evaluate(async () => {
    for (let y = 0; y < 6000; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 220)); }
    window.scrollTo(0, 0);
  });
  await pg.waitForTimeout(4000);

  const d = await pg.evaluate(() => {
    const vis = (el) => {
      const r = el.getBoundingClientRect(); const s = getComputedStyle(el);
      return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && Number(s.opacity) > 0.05;
    };
    const blocos = [...document.querySelectorAll('h1,h2,h3,h4,p,span,div,a,button')]
      .filter((el) => vis(el) && el.children.length === 0)
      .map((el) => {
        const t = (el.innerText || '').trim().replace(/\s+/g, ' ');
        if (!t || t.length > 200) return null;
        const s = getComputedStyle(el);
        return { t, f: s.fontFamily.split(',')[0].replace(/["']/g, ''), px: Math.round(parseFloat(s.fontSize)),
                 p: s.fontWeight, c: s.color, y: Math.round(el.getBoundingClientRect().top + window.scrollY) };
      }).filter(Boolean).sort((a, b) => a.y - b.y);

    const imgs = [...document.querySelectorAll('img')].map((i) => {
      const r = i.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), nat: i.naturalWidth + 'x' + i.naturalHeight,
               y: Math.round(r.top + window.scrollY), src: (i.currentSrc || '').replace('https://static.wixstatic.com/media/', '').slice(0, 50) };
    });
    const vids = [...document.querySelectorAll('video')].map((v) => ({
      w: v.videoWidth, h: v.videoHeight, pronto: v.readyState, pausado: v.paused,
      loop: v.loop, mudo: v.muted, src: (v.currentSrc || '').slice(-46),
    }));
    return { blocos, imgs, vids, altura: document.body.scrollHeight };
  });

  console.log('\n\n════════ HOME · texto visível ════════ (' + d.altura + 'px)');
  d.blocos.forEach((b) => console.log(String(b.y).padStart(5) + ' ' + String(b.px).padStart(3) + 'px ' + b.f.padEnd(9) + ' p' + String(b.p).padEnd(4) + ' ' + b.c.replace('rgb', '').padEnd(16) + ' ' + b.t.slice(0, 72)));
  console.log('\n── HOME imagens (' + d.imgs.length + ') ──');
  d.imgs.forEach((i) => console.log('  y' + String(i.y).padStart(5) + '  ' + String(i.w).padStart(4) + 'x' + String(i.h).padStart(4) + ' nat ' + i.nat.padEnd(11) + ' ' + i.src));
  console.log('── HOME vídeo ──'); d.vids.forEach((v) => console.log('  ' + JSON.stringify(v)));
  await ctx.close();
}

await nav.close();
