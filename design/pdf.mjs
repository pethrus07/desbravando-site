// Monta um PDF a partir dos PNGs da prévia — o formato para quem só quer olhar e
// repassar (WhatsApp, e-mail, imprimir).
//
// Duas decisões que importam:
//  · página de tamanho ÚNICO. O Chrome só aceita um tamanho por PDF, então as telas
//    altas são FATIADAS em páginas em vez de esmagadas ou de sobrar branco.
//  · JPEG em vez de PNG. Os PNGs da prévia são 2× (2880px de largura); em PNG o PDF
//    passava de 20 MB, acima do limite do WhatsApp.
//
// Rodar: node design/pdf.mjs   (depois de design/previa.mjs)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '/Users/olive/Projetos/qa-parresia/node_modules/@playwright/test/index.mjs';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const PREVIA = path.join(DIR, '..', 'previa');
const ENTREGA = path.join(DIR, '..', 'entrega');
fs.mkdirSync(ENTREGA, { recursive: true });

const LARG = 1200;   // largura da página, em px de CSS
const ALT = 1700;    // altura da página
const FAIXA = 46;    // faixa preta com o nome da tela
const QUAL = 0.82;   // qualidade do JPEG

const doc = JSON.parse(fs.readFileSync(path.join(DIR, 'desbravando-repaginacao.pen'), 'utf8'));
const ehSistema = (n) => /Sistema de design/.test(n);

const telas = doc.children
  .slice()
  .sort((a, b) => Number(ehSistema(a.name)) - Number(ehSistema(b.name)))
  .map((t) => {
    const arq = `${t.name.replace(/[^\w\dÀ-ú·. ()—-]/g, '').replace(/\s+/g, '-').toLowerCase()}.png`;
    const caminho = path.join(PREVIA, arq);
    if (!fs.existsSync(caminho)) { console.warn(`! sem PNG: ${arq}`); return null; }
    return { nome: t.name, uri: `data:image/png;base64,${fs.readFileSync(caminho).toString('base64')}` };
  })
  .filter(Boolean);

const b = await chromium.launch();
const p = await b.newPage();
await p.goto('about:blank');

/* corta cada tela em páginas e reencoda em JPEG, dentro do navegador */
const paginas = [];
for (const t of telas) {
  const fatias = await p.evaluate(
    async ({ uri, LARG, ALT, FAIXA, QUAL }) => {
      const img = new Image();
      img.src = uri;
      await img.decode();
      const escala = LARG / img.width;
      const altTotal = img.height * escala;
      const utilPrimeira = ALT - FAIXA;
      const n = altTotal <= utilPrimeira ? 1 : 1 + Math.ceil((altTotal - utilPrimeira) / ALT);
      const out = [];
      let consumido = 0;
      for (let i = 0; i < n; i++) {
        const util = i === 0 ? utilPrimeira : ALT;
        const alturaFatia = Math.min(util, altTotal - consumido);
        const cv = document.createElement('canvas');
        cv.width = LARG;
        cv.height = Math.round(alturaFatia);
        const cx = cv.getContext('2d');
        cx.fillStyle = '#ffffff';
        cx.fillRect(0, 0, cv.width, cv.height);
        cx.drawImage(img, 0, consumido / escala, img.width, alturaFatia / escala, 0, 0, LARG, alturaFatia);
        out.push({ uri: cv.toDataURL('image/jpeg', QUAL), altura: Math.round(alturaFatia), primeira: i === 0, de: n });
        consumido += alturaFatia;
      }
      return out;
    },
    { uri: t.uri, LARG, ALT, FAIXA, QUAL },
  );
  fatias.forEach((f, i) => paginas.push({ ...f, nome: t.nome, parte: i + 1 }));
}

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;600&display=swap');
*{margin:0;padding:0;box-sizing:border-box}
@page{margin:0;size:${LARG}px ${ALT}px}
body{background:#fff}
.pg{width:${LARG}px;height:${ALT}px;overflow:hidden;page-break-after:always;background:#fff;display:flex;flex-direction:column}
.pg:last-child{page-break-after:auto}
.rot{height:${FAIXA}px;flex:0 0 ${FAIXA}px;background:#000;color:#fff;display:flex;gap:14px;align-items:center;
     padding:0 22px;font-family:'Archivo',sans-serif}
.rot b{font-family:'Anton',sans-serif;font-weight:400;font-size:19px;letter-spacing:.3px}
.rot span{font-size:11px;opacity:.55;margin-left:auto}
img{display:block;width:${LARG}px}
</style></head><body>
${paginas
  .map(
    (f) => `<div class="pg">${
      f.primeira
        ? `<div class="rot"><b>${f.nome}</b><span>Desbravando UTV · proposta de layout${f.de > 1 ? ` · parte 1 de ${f.de}` : ''}</span></div>`
        : ''
    }<img src="${f.uri}"></div>`,
  )
  .join('\n')}
</body></html>`;

const tmp = path.join(ENTREGA, '_pdf.html');
fs.writeFileSync(tmp, html, 'utf8');
await p.goto(`file:///${tmp.replace(/\\/g, '/')}`, { waitUntil: 'load' });
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(1200);

const saida = path.join(ENTREGA, 'desbravando-repaginacao-v3.pdf');
await p.pdf({ path: saida, printBackground: true, width: `${LARG}px`, height: `${ALT}px` });
await b.close();
fs.rmSync(tmp);

console.log(`${telas.length} telas em ${paginas.length} páginas · ${(fs.statSync(saida).size / 1024 / 1024).toFixed(2)} MB`);
console.log('→ entrega/desbravando-repaginacao-v3.pdf');
