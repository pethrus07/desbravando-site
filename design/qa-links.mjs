// Testa os cartões da agenda CLICANDO neles, um a um.
//
// Por que clicando: o link é posto por Velo (`onClick`), não é um `href` no HTML — então
// inspecionar o DOM não diz nada. O único teste honesto é clicar e ver onde para.
//
// Rodar:  node design/qa-links.mjs
import { chromium } from '/Users/olive/Projetos/qa-parresia/node_modules/playwright/index.mjs';

/** ⚠️ A Wix cacheia a página publicada no CDN. Sem furar esse cache, o teste lê uma
 *  versão antiga e mente — aconteceu duas vezes: reportei filtro faltando que já estava
 *  aplicado. Todo goto passa por aqui. */
const SEM_CACHE = { 'Cache-Control': 'no-cache', Pragma: 'no-cache' };
const semCache = (url) => url + (url.includes('?') ? '&' : '?') + 'nocache=' + Date.now();

const AGENDA = 'https://www.desbravandoutv.com/blank-2';

// nome na tela → para onde DEVE ir
const ESPERADO = {
  'Costa Doce': '/expedicoes/costa-doce',
  'Serra Catarinense': '/expedicoes/serra-catarinense',
  'Serra da Canastra': '/expedicoes/serra-da-canastra',
  'Visconde de Mauá': '/expedicoes/visconde-de-mauá',
  'Macaé': '/expedicoes/macaé',
};

const nav = await chromium.launch();
const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
    await ctx.setExtraHTTPHeaders(SEM_CACHE);

/* ── 1 · o console diz que ligou? ────────────────────────────────────────── */
{
  const pg = await ctx.newPage();
  const logs = [];
  pg.on('console', (m) => logs.push(m.type().padEnd(7) + ' ' + m.text().replace(/\s+/g, ' ').slice(0, 150)));
  await pg.goto(semCache(AGENDA), { waitUntil: 'load', timeout: 60000 });
  await pg.evaluate(async () => {
    for (let y = 0; y < 3000; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 200)); }
    window.scrollTo(0, 0);
  });
  await pg.waitForTimeout(3500);

  console.log('── console do Grupo Avulso ──');
  const nossos = logs.filter((l) => /Agenda:|FAQ:|Reserva:/.test(l));
  if (nossos.length) nossos.forEach((l) => console.log('  ' + l));
  else console.log('  (nenhuma mensagem nossa — o código rodou?)');

  const erros = logs.filter((l) => l.startsWith('error'));
  console.log('  erros: ' + (erros.length ? erros.length : 'nenhum ✓'));
  [...new Set(erros)].slice(0, 3).forEach((e) => console.log('    · ' + e.slice(0, 130)));
  await pg.close();
}

/* ── 2 · clicar em cada cartão ───────────────────────────────────────────── */
console.log('\n── clicando cartão por cartão ──');
let acertos = 0;

for (const [nome, esperado] of Object.entries(ESPERADO)) {
  const pg = await ctx.newPage();
  try {
    await pg.goto(semCache(AGENDA), { waitUntil: 'load', timeout: 60000 });
    await pg.evaluate(async () => {
      for (let y = 0; y < 3000; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 200)); }
      window.scrollTo(0, 0);
    });
    await pg.waitForTimeout(3000);

    // acha o texto do título daquele cartão
    const alvo = pg.locator(`text="${nome}"`).first();
    if (!(await alvo.count())) { console.log(`  ✘ ${nome.padEnd(19)} não achei o cartão na página`); await pg.close(); continue; }

    await alvo.scrollIntoViewIfNeeded();
    await alvo.click({ timeout: 15000 });
    await pg.waitForTimeout(4000);

    const url = decodeURIComponent(pg.url().replace('https://www.desbravandoutv.com', ''));
    const ok = url.startsWith(esperado);
    if (ok) acertos++;
    console.log(`  ${ok ? '✓' : '✘'} ${nome.padEnd(19)} → ${url}${ok ? '' : `   (esperado ${esperado})`}`);
  } catch (e) {
    console.log(`  ✘ ${nome.padEnd(19)} ${String(e.message).replace(/\s+/g, ' ').slice(0, 80)}`);
  }
  await pg.close();
}

console.log(`\n${acertos} de ${Object.keys(ESPERADO).length} cartões abrindo a página certa`);

/* ── 3 · a sanfona do FAQ continua funcionando? ──────────────────────────── */
{
  const pg = await ctx.newPage();
  await pg.goto(semCache(AGENDA), { waitUntil: 'load', timeout: 60000 });
  await pg.evaluate(async () => {
    for (let y = 0; y < 3000; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 200)); }
  });
  await pg.waitForTimeout(3000);

  // se o clique navegar (o bug de antes), o contexto morre — capturo em vez de estourar
  const urlAntes = pg.url();
  let faq = null;
  try {
    faq = await pg.evaluate(async () => {
    const espera = (ms) => new Promise((r) => setTimeout(r, ms));
    const abertas = () => [...document.querySelectorAll('*')].filter((e) => {
      const t = (e.innerText || '').trim();
      return e.children.length === 0 && t.length > 80 && e.getBoundingClientRect().height > 0
        && /não necessariamente|sim\.|a expedição|o combustível|a política/i.test(t);
    }).length;
    const sinais = [...document.querySelectorAll('*')].filter((e) => e.children.length === 0
      && ['+', '−'].includes((e.innerText || '').trim()) && e.getBoundingClientRect().height > 0);

    const antes = abertas();
    const perguntas = [...document.querySelectorAll('*')].filter((e) => e.children.length === 0
      && /\?$/.test((e.innerText || '').trim()) && (e.innerText || '').trim().length > 15);
      if (perguntas[2]) { perguntas[2].click(); await espera(900); }
      return { antes, depois: abertas(), sinais: sinais.map((s) => (s.innerText || '').trim()).join(''), n: perguntas.length };
    });
  } catch (e) {
    console.log('\n── sanfona do FAQ ──');
    console.log('  ⚠️ o clique na pergunta NAVEGOU — o handler do cartão está preso no FAQ');
    console.log('     saiu de ' + urlAntes.replace('https://www.desbravandoutv.com', '') +
      ' para ' + pg.url().replace('https://www.desbravandoutv.com', ''));
    await pg.close();
    await nav.close();
    process.exit(1);
  }

  const navegou = pg.url() !== urlAntes;
  console.log('\n── sanfona do FAQ ──');
  console.log(`  ${faq.n} perguntas · sinais "${faq.sinais}"`);
  if (navegou) {
    console.log('  ⚠️ o clique NAVEGOU para ' + pg.url().replace('https://www.desbravandoutv.com', ''));
  } else {
    console.log(`  abertas: ${faq.antes} → ${faq.depois} depois do clique  ` +
      (faq.antes === 1 && faq.depois === 1 ? '✓ uma por vez, sem navegar' : '⚠️ conferir'));
  }
  await pg.close();
}

await nav.close();
