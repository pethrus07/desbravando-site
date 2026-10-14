// QA do site no ar: funcional + visual, desktop e celular.
//
// Não compara com o desenho para "achar defeito" — muita divergência é decisão do Pedro.
// O que este script faz é MEDIR e listar, separando o que é quebra objetiva (imagem que
// não carrega, erro no console, rolagem lateral) do que é só diferença a conferir.
//
// Rodar:  node design/qa-site.mjs
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

const PAGINAS = [
  { id: 'home', nome: 'Home', url: 'https://www.desbravandoutv.com/' },
  { id: 'avulso', nome: 'Grupo Avulso', url: 'https://www.desbravandoutv.com/blank-2' },
];
const TELAS = [
  { id: 'desktop', largura: 1440, altura: 900, movel: false },
  { id: 'celular', largura: 390, altura: 844, movel: true },
];

const relatorio = [];

const navegador = await chromium.launch();

for (const pg of PAGINAS) {
  for (const tela of TELAS) {
    const ctx = await navegador.newContext({
      viewport: { width: tela.largura, height: tela.altura },
      isMobile: tela.movel,
      hasTouch: tela.movel,
      deviceScaleFactor: 1,
      userAgent: tela.movel
        ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
        : undefined,
    });
    await ctx.setExtraHTTPHeaders(SEM_CACHE);
    const pagina = await ctx.newPage();

    const erros = [];
    const falhas = [];
    pagina.on('console', (m) => {
      if (m.type() === 'error') erros.push(m.text().replace(/\s+/g, ' ').slice(0, 220));
    });
    pagina.on('pageerror', (e) => erros.push('[pageerror] ' + String(e.message).slice(0, 220)));
    pagina.on('requestfailed', (r) => {
      // favicon e beacons de analytics falham à toa e não são defeito da página
      if (/favicon|google-analytics|doubleclick|facebook|hotjar|clarity/.test(r.url())) return;
      falhas.push(r.url().slice(0, 140) + ' — ' + (r.failure()?.errorText || '?'));
    });

    const t0 = Date.now();
    let resposta = null;
    try {
      resposta = await pagina.goto(semCache(pg.url), { waitUntil: 'networkidle', timeout: 90000 });
    } catch (e) {
      // networkidle às vezes nunca chega na Wix (websocket aberto); cai pro load
      try { resposta = await pagina.goto(semCache(pg.url), { waitUntil: 'load', timeout: 60000 }); }
      catch (e2) { relatorio.push({ pg: pg.nome, tela: tela.id, fatal: String(e2.message).slice(0, 160) }); continue; }
    }
    const carga = Date.now() - t0;

    // rolar até o fim: a Wix carrega imagem e repetidor sob demanda
    await pagina.evaluate(async () => {
      const passo = () => new Promise((r) => setTimeout(r, 220));
      for (let y = 0; y < document.body.scrollHeight + 3000; y += 700) {
        window.scrollTo(0, y);
        await passo();
      }
      window.scrollTo(0, 0);
      await passo();
    });
    await pagina.waitForTimeout(2500);

    const medida = await pagina.evaluate(() => {
      const vis = (el) => {
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && Number(s.opacity) > 0.05;
      };

      // imagens: naturalWidth 0 depois de carregar = quebrada
      const imgs = [...document.querySelectorAll('img')];
      const quebradas = imgs.filter((i) => i.complete && i.naturalWidth === 0)
        .map((i) => (i.currentSrc || i.src || i.alt || '?').slice(0, 120));

      // vídeos
      const videos = [...document.querySelectorAll('video')].map((v) => ({
        pronto: v.readyState, largura: v.videoWidth, fonte: (v.currentSrc || '').slice(0, 100),
      }));

      // texto visível, para conferir conteúdo sem depender de print
      const blocos = [...document.querySelectorAll('h1,h2,h3,h4,p,span,div,a,button')]
        .filter((el) => vis(el) && el.children.length === 0)
        .map((el) => {
          const t = (el.innerText || '').trim().replace(/\s+/g, ' ');
          if (!t || t.length > 260) return null;
          const s = getComputedStyle(el);
          const r = el.getBoundingClientRect();
          return {
            t,
            fonte: s.fontFamily.split(',')[0].replace(/["']/g, ''),
            px: Math.round(parseFloat(s.fontSize)),
            peso: s.fontWeight,
            cor: s.color,
            tag: el.tagName.toLowerCase(),
            y: Math.round(r.top + window.scrollY),
            esp: s.letterSpacing,
            caixa: s.textTransform,
          };
        })
        .filter(Boolean);

      // links
      const links = [...document.querySelectorAll('a')].filter(vis).map((a) => ({
        texto: (a.innerText || '').trim().replace(/\s+/g, ' ').slice(0, 60),
        href: a.getAttribute('href') || '',
        alvo: a.getAttribute('target') || '',
      }));

      // repetidores da Wix — o atributo muda de versão, então tento vários sinais
      const repetidores = [...document.querySelectorAll('[id^="repeater"],[data-testid*="repeater"],[class*="repeater"]')]
        .filter(vis)
        .map((r) => ({
          id: r.id || r.getAttribute('data-testid') || '?',
          itens: r.querySelectorAll(':scope > * > [id]').length,
          filhos: r.children.length,
          altura: Math.round(r.getBoundingClientRect().height),
        }));

      // fontes que o navegador realmente aplicou
      const familias = {};
      for (const b of blocos) familias[b.fonte] = (familias[b.fonte] || 0) + 1;

      const cores = {};
      for (const b of blocos) cores[b.cor] = (cores[b.cor] || 0) + 1;

      const de = document.documentElement;
      return {
        titulo: document.title,
        altura: Math.max(document.body.scrollHeight, de.scrollHeight),
        larguraDoc: Math.max(document.body.scrollWidth, de.scrollWidth),
        larguraJanela: window.innerWidth,
        imgs: imgs.length, quebradas, videos, blocos, links, repetidores,
        familias, cores,
        fundoCorpo: getComputedStyle(document.body).backgroundColor,
      };
    });

    // ── funcional: a sanfona do FAQ ──────────────────────────────────────────
    let sanfona = null;
    if (pg.id === 'avulso') {
      sanfona = await pagina.evaluate(async () => {
        const espera = (ms) => new Promise((r) => setTimeout(r, ms));
        const alvo = (t) => [...document.querySelectorAll('*')].find(
          (el) => el.children.length === 0 && (el.innerText || '').trim().startsWith(t));

        // acha as perguntas pelo texto que eu mesmo pus no CMS
        const perguntas = ['Preciso ter UTV próprio', 'Criança pode ir', 'Como funciona o apoio',
          'O que acontece se eu precisar', 'Dá para levar acompanhante', 'Quando recebo as fotos'];
        const achadas = perguntas.map((p) => ({ p, el: alvo(p) })).filter((x) => x.el);
        if (!achadas.length) return { achou: 0, nota: 'nenhuma pergunta do CMS na página' };

        // sinais + / −
        const sinais = [...document.querySelectorAll('*')].filter(
          (el) => el.children.length === 0 && ['+', '−', '-'].includes((el.innerText || '').trim()));

        // conta quanta resposta está visível agora
        const respostaVisivel = () => [...document.querySelectorAll('*')].filter((el) => {
          const t = (el.innerText || '').trim();
          return el.children.length === 0 && t.length > 80 &&
            /não necessariamente|média\. são|sim\. esta|a expedição roda|a política|o combustível|sim\. há acompanhantes|a expedição tem equipe/i.test(t) &&
            el.getBoundingClientRect().height > 0;
        }).length;

        const antes = respostaVisivel();

        // clica na 2ª pergunta e mede
        const segunda = achadas[1];
        let depois = null, voltou = null;
        if (segunda) {
          segunda.el.click();
          await espera(900);
          depois = respostaVisivel();
          segunda.el.click();
          await espera(900);
          voltou = respostaVisivel();
        }

        return {
          achou: achadas.length,
          perguntasNaPagina: achadas.map((a) => a.p),
          sinais: sinais.length,
          sinaisTexto: sinais.map((s) => (s.innerText || '').trim()).join(''),
          abertasInicio: antes,
          abertasAposClique: depois,
          abertasAposSegundoClique: voltou,
        };
      });
    }

    // ── prints ───────────────────────────────────────────────────────────────
    const base = `${pg.id}-${tela.id}`;
    await pagina.screenshot({ path: path.join(SAIDA, `${base}.png`), fullPage: true });

    // fatias de ~1600px para dar pra olhar de verdade
    const fatia = 1600;
    const n = Math.min(Math.ceil(medida.altura / fatia), 12);
    for (let i = 0; i < n; i++) {
      await pagina.screenshot({
        path: path.join(SAIDA, `${base}-f${String(i).padStart(2, '0')}.png`),
        clip: { x: 0, y: i * fatia, width: tela.largura, height: Math.min(fatia, medida.altura - i * fatia) },
        fullPage: true,
      });
    }

    relatorio.push({
      pg: pg.nome, id: pg.id, tela: tela.id, url: pg.url,
      http: resposta?.status() ?? null, ms: carga,
      ...medida, erros, falhas, sanfona, fatias: n,
    });
    console.log(`✓ ${pg.nome} · ${tela.id}  ${medida.altura}px  ${medida.imgs} imgs  ${erros.length} erros`);
    await ctx.close();
  }
}

await navegador.close();
fs.writeFileSync(path.join(SAIDA, 'qa.json'), JSON.stringify(relatorio, null, 1), 'utf8');
console.log('\n→ qa/qa.json  +  prints');
