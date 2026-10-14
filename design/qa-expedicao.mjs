// QA da PÁGINA DA EXPEDIÇÃO no ar: desktop e celular, expedição por expedição.
//
// Confere o que só se vê rodando: rolagem lateral, imagem quebrada, erro de console,
// texto ilegível por contraste, e — o que mais importa numa página dinâmica — se as
// seções sem dado realmente recolheram em vez de deixar buraco.
//
// Rodar:  node design/qa-expedicao.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '/Users/olive/Projetos/qa-parresia/node_modules/playwright/index.mjs';

/** ⚠️ A Wix cacheia a página publicada no CDN. Sem furar esse cache, o teste lê uma
 *  versão antiga e mente — aconteceu duas vezes: reportei filtro faltando que já estava
 *  aplicado. Todo goto passa por aqui. */
const SEM_CACHE = { 'Cache-Control': 'no-cache', Pragma: 'no-cache' };
const semCache = (url) => url + (url.includes('?') ? '&' : '?') + 'nocache=' + Date.now();

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SAIDA = path.join(RAIZ, 'qa');
fs.mkdirSync(SAIDA, { recursive: true });

const BASE = 'https://www.desbravandoutv.com/expedicoes';

// ⚠️ O endereço vem do campo `Título` e a Wix MANTÉM O ACENTO: "Macaé" → /expedicoes/macaé.
// Por isso o slug sai do título de verdade, lido do CMS — chutar sem acento dá 404.
const { wix, SITE } = await import('./wix.mjs');
const EXPEDICOES = (await wix('/wix-data/v2/items/query', {
  corpo: { dataCollectionId: 'Expedicoes', query: { cursorPaging: { limit: 20 } } }, escopo: SITE,
})).dataItems
  .map((x) => x.data.titulo)
  .sort()
  .map((t) => ({ nome: t, slug: String(t).toLowerCase().trim().replace(/\s+/g, '-') }));
const TELAS = [
  { id: 'desktop', largura: 1440, altura: 900, movel: false },
  { id: 'celular', largura: 390, altura: 844, movel: true },
];

/** ruído de telemetria da Wix que falha à toa e não é defeito da página */
const RUIDO = /favicon|frog\.wix|panorama\.wixapps|google-analytics|doubleclick|facebook|hotjar|clarity/;

const nav = await chromium.launch();
const relatorio = [];

for (const exp of EXPEDICOES) {
  const slug = exp.slug;
  for (const tela of TELAS) {
    const ctx = await nav.newContext({
      viewport: { width: tela.largura, height: tela.altura },
      isMobile: tela.movel, hasTouch: tela.movel, deviceScaleFactor: 1,
      userAgent: tela.movel
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
        : undefined,
    });
    await ctx.setExtraHTTPHeaders(SEM_CACHE);
    const pg = await ctx.newPage();
    const erros = [];
    const falhas = [];
    pg.on('console', (m) => { if (m.type() === 'error') erros.push(m.text().replace(/\s+/g, ' ').slice(0, 160)); });
    pg.on('pageerror', (e) => erros.push('[pageerror] ' + String(e.message).slice(0, 160)));
    pg.on('requestfailed', (r) => { if (!RUIDO.test(r.url())) falhas.push(r.url().slice(0, 110)); });

    let resposta = null;
    try { resposta = await pg.goto(semCache(`${BASE}/${slug}`), { waitUntil: 'load', timeout: 60000 }); }
    catch (e) { relatorio.push({ slug: exp.nome, tela: tela.id, fatal: String(e.message).slice(0, 120) }); await ctx.close(); continue; }

    // a Wix carrega repetidor e imagem sob demanda
    await pg.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight + 3000; y += 700) {
        window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 200));
      }
      window.scrollTo(0, 0); await new Promise((r) => setTimeout(r, 400));
    });
    await pg.waitForTimeout(3000);

    const d = await pg.evaluate(() => {
      const de = document.documentElement;
      const corpo = document.body.innerText || '';

      const imgs = [...document.querySelectorAll('img')];
      const quebradas = imgs.filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => (i.currentSrc || i.src || i.alt || '?').slice(0, 90));

      // títulos de seção, para ver o que ficou na página
      const titulos = [...document.querySelectorAll('h1,h2,h3')]
        .filter((e) => e.getBoundingClientRect().height > 0)
        .map((e) => (e.innerText || '').trim().replace(/\s+/g, ' ')).filter(Boolean);

      // buraco: título de seção seguido de nada até o próximo título
      const marcos = ['DIA A DIA', 'ONDE O GRUPO FICA', 'ESTÁ INCLUSO', 'NÃO ESTÁ INCLUSO',
        'A EXPEDIÇÃO POR DENTRO', 'GUIA DA EXPEDIÇÃO', 'PERGUNTAS FREQUENTES', 'INVESTIMENTO'];
      const presentes = marcos.filter((m) => titulos.some((t) => t.toUpperCase().includes(m)));

      // texto de FAQ visível = respostas abertas
      const sinais = [...document.querySelectorAll('*')].filter((e) => e.children.length === 0
        && ['+', '−', '-'].includes((e.innerText || '').trim()) && e.getBoundingClientRect().height > 0);

      // contraste ruim: texto quase da cor do fundo
      const lum = (c) => { const m = c.match(/\d+/g); if (!m) return null;
        const [r, g, b] = m.map(Number).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
      const fundoDe = (el) => { let n = el; while (n && n !== document.body) {
        const bg = getComputedStyle(n).backgroundColor;
        if (bg && !/rgba\(0, 0, 0, 0\)|transparent/.test(bg)) return bg; n = n.parentElement; } return 'rgb(255,255,255)'; };
      const fracos = [];
      for (const el of document.querySelectorAll('h1,h2,h3,p,span,div')) {
        if (el.children.length || !(el.innerText || '').trim()) continue;
        const r = el.getBoundingClientRect(); if (r.height <= 0 || r.width <= 0) continue;
        const s = getComputedStyle(el);
        const lt = lum(s.color), lf = lum(fundoDe(el));
        if (lt == null || lf == null) continue;
        const razao = (Math.max(lt, lf) + 0.05) / (Math.min(lt, lf) + 0.05);
        if (razao < 2.2) fracos.push({ t: (el.innerText || '').trim().slice(0, 44), razao: +razao.toFixed(2) });
      }

      return {
        titulo: document.title,
        altura: Math.max(document.body.scrollHeight, de.scrollHeight),
        larguraDoc: Math.max(document.body.scrollWidth, de.scrollWidth),
        janela: window.innerWidth,
        imgs: imgs.length, quebradas,
        secoes: presentes, nTitulos: titulos.length,
        sinais: sinais.length, sinaisTexto: sinais.map((s) => (s.innerText || '').trim()).join(''),
        valor: (corpo.match(/R\$\s*[\d.]+/g) || [])[0] || null,
        fracos: fracos.slice(0, 5),
      };
    });

    await pg.screenshot({ path: path.join(SAIDA, `exp-${slug.normalize('NFD').replace(/[̀-ͯ]/g,'')}-${tela.id}.png`), fullPage: true });

    relatorio.push({ slug: exp.nome, tela: tela.id, http: resposta?.status() ?? null, ...d, erros, falhas });
    const lateral = d.larguraDoc > d.janela;
    console.log(`${exp.nome.padEnd(19)} ${tela.id.padEnd(8)} ${String(d.altura).padStart(5)}px · ` +
      `${d.secoes.length}/8 seções · ${d.imgs} imgs · sinais "${d.sinaisTexto}" · ` +
      `${d.valor || '—'}${lateral ? ' ⚠️ ROLAGEM LATERAL' : ''}${d.quebradas.length ? ` ⚠️ ${d.quebradas.length} img quebrada` : ''}` +
      `${erros.length ? ` ⚠️ ${new Set(erros).size} erro` : ''}`);
    await ctx.close();
  }
}

await nav.close();
fs.writeFileSync(path.join(SAIDA, 'qa-expedicao.json'), JSON.stringify(relatorio, null, 1), 'utf8');

/* ── resumo ── */
console.log('\n══ resumo ══');
const lateral = relatorio.filter((r) => r.larguraDoc > r.janela);
const img = relatorio.filter((r) => r.quebradas?.length);
const err = [...new Set(relatorio.flatMap((r) => r.erros || []))];
const fracos = [...new Map(relatorio.flatMap((r) => (r.fracos || []).map((f) => [f.t, f]))).values()];

console.log(`rolagem lateral: ${lateral.length ? lateral.map((r) => r.slug + '/' + r.tela).join(', ') : 'nenhuma ✓'}`);
console.log(`imagem quebrada: ${img.length ? img.map((r) => r.slug + '/' + r.tela).join(', ') : 'nenhuma ✓'}`);
console.log(`contraste fraco: ${fracos.length ? fracos.map((f) => `"${f.t}" (${f.razao}:1)`).join(' · ') : 'nenhum ✓'}`);
console.log(`erros distintos no console: ${err.length}`);
err.forEach((e) => console.log('   · ' + e));
console.log('\n→ qa/qa-expedicao.json + prints');
