// QA de CELULAR: o que só quebra em tela estreita.
//
// Mede o que dá para medir — transbordo, texto cortado, alvo de toque pequeno, fonte
// ilegível — e guarda prints em fatias para olhar o que só se vê olhando.
//
// Rodar:  node design/qa-mobile.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '/Users/olive/Projetos/qa-parresia/node_modules/playwright/index.mjs';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SAIDA = path.join(RAIZ, 'qa', 'mobile');
fs.mkdirSync(SAIDA, { recursive: true });

const PAGINAS = [
  { id: 'home', nome: 'Home', url: 'https://www.desbravandoutv.com/' },
  { id: 'avulso', nome: 'Grupo Avulso', url: 'https://www.desbravandoutv.com/grupos-avulsos' },
  { id: 'expedicao', nome: 'Costa Doce', url: 'https://www.desbravandoutv.com/expedicoes/costa-doce' },
];

// iPhone 14 — a tela mais comum no público dele
const LARGURA = 390;
const ALTURA = 844;

const nav = await chromium.launch();
const relatorio = [];

for (const p of PAGINAS) {
  const ctx = await nav.newContext({
    viewport: { width: LARGURA, height: ALTURA },
    isMobile: true, hasTouch: true, deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  });
  const pg = await ctx.newPage();

  // ⚠️ no-cache SÓ no documento: global, derruba o CORS do CDN da Wix
  await pg.route('**/*', (r) => {
    const q = r.request();
    if (q.resourceType() === 'document' && q.url().includes('desbravandoutv.com')) {
      return r.continue({ headers: { ...q.headers(), 'cache-control': 'no-cache', pragma: 'no-cache' } });
    }
    return r.continue();
  });
  const cdp = await ctx.newCDPSession(pg);
  await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });

  await pg.goto(p.url, { waitUntil: 'load', timeout: 60000 });
  await pg.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight + 3000; y += 500) {
      window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 190));
    }
    window.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 500));
  });
  await pg.waitForTimeout(3000);

  const d = await pg.evaluate((LARG) => {
    const de = document.documentElement;
    const vis = (e) => {
      const r = e.getBoundingClientRect();
      const s = getComputedStyle(e);
      return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && Number(s.opacity) > 0.05;
    };
    const Y = (e) => Math.round(e.getBoundingClientRect().top + window.scrollY);

    // 1 · algo mais largo que a tela
    const largos = [...document.querySelectorAll('*')].filter((e) => {
      const r = e.getBoundingClientRect();
      return vis(e) && r.width > LARG + 2;
    }).map((e) => ({
      tag: e.tagName.toLowerCase(), id: e.id.slice(0, 34),
      w: Math.round(e.getBoundingClientRect().width), y: Y(e),
      txt: (e.innerText || '').trim().slice(0, 34),
    }));

    // 2 · texto cortado pelo próprio pai
    const cortados = [...document.querySelectorAll('h1,h2,h3,h4,p,span,div')].filter((e) => {
      if (e.children.length || !(e.innerText || '').trim()) return false;
      return vis(e) && e.scrollWidth > e.clientWidth + 2 && e.clientWidth > 40;
    }).map((e) => ({ t: (e.innerText || '').trim().slice(0, 40), cabe: e.clientWidth, precisa: e.scrollWidth, y: Y(e) }));

    // 3 · fonte pequena demais para ler no celular
    const miudos = [...document.querySelectorAll('p,span,div,li')].filter((e) => {
      if (e.children.length || !(e.innerText || '').trim()) return false;
      const px = parseFloat(getComputedStyle(e).fontSize);
      return vis(e) && px > 0 && px < 12 && (e.innerText || '').trim().length > 12;
    }).map((e) => ({ t: (e.innerText || '').trim().slice(0, 36), px: +parseFloat(getComputedStyle(e).fontSize).toFixed(1), y: Y(e) }));

    // 4 · alvo de toque menor que 44px (recomendação da Apple)
    const alvos = [...document.querySelectorAll('a,button,[role="button"]')].filter(vis).map((e) => {
      const r = e.getBoundingClientRect();
      return { t: (e.innerText || '').trim().slice(0, 28), w: Math.round(r.width), h: Math.round(r.height), y: Y(e) };
    }).filter((a) => a.h < 44 && a.t);

    // 5 · imagens
    const imgs = [...document.querySelectorAll('img')];
    const quebradas = imgs.filter((i) => i.complete && i.naturalWidth === 0).length;

    // 6 · títulos grandes: no celular Anton em 48 costuma estourar
    const titulos = [...document.querySelectorAll('h1,h2')].filter(vis).map((e) => ({
      t: (e.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 34),
      px: Math.round(parseFloat(getComputedStyle(e).fontSize)),
      w: Math.round(e.getBoundingClientRect().width), y: Y(e),
    }));

    return {
      altura: Math.max(document.body.scrollHeight, de.scrollHeight),
      larguraDoc: Math.max(document.body.scrollWidth, de.scrollWidth),
      janela: window.innerWidth,
      largos, cortados, miudos, alvos, quebradas, imgs: imgs.length, titulos,
    };
  }, LARGURA);

  // prints em fatias, para olhar
  const fatia = 1400;
  const n = Math.min(Math.ceil(d.altura / fatia), 10);
  for (let i = 0; i < n; i++) {
    await pg.screenshot({
      path: path.join(SAIDA, `${p.id}-${String(i).padStart(2, '0')}.png`),
      clip: { x: 0, y: i * fatia, width: LARGURA, height: Math.min(fatia, d.altura - i * fatia) },
      fullPage: true,
    });
  }

  relatorio.push({ ...p, ...d, fatias: n });

  const lateral = d.larguraDoc > d.janela;
  console.log(`\n■ ${p.nome}  ${d.altura}px  (${n} fatias)`);
  console.log(`   rolagem lateral: ${lateral ? `SIM — doc ${d.larguraDoc} vs tela ${d.janela} ⚠️` : 'não ✓'}`);
  console.log(`   mais largo que a tela: ${d.largos.length || 'nenhum ✓'}`);
  console.log(`   texto cortado: ${d.cortados.length || 'nenhum ✓'}`);
  console.log(`   fonte < 12px: ${d.miudos.length || 'nenhuma ✓'}`);
  console.log(`   alvo de toque < 44px: ${d.alvos.length || 'nenhum ✓'}`);
  console.log(`   imagem quebrada: ${d.quebradas || 'nenhuma ✓'}`);

  await ctx.close();
}

await nav.close();
fs.writeFileSync(path.join(SAIDA, 'mobile.json'), JSON.stringify(relatorio, null, 1), 'utf8');
console.log('\n→ qa/mobile/mobile.json + prints');
