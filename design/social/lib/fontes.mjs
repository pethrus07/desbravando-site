// Fontes reais (Anton + Archivo) embutidas em base64, para o PNG sair com a
// tipografia da marca e não com um fallback do sistema.
//
// Reaproveita o mesmo cache do `design/exportar.mjs` (mesmo esquema de chave),
// então quem já rodou a exportação não baixa nada de novo.
import fs from 'node:fs';
import path from 'node:path';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';

export async function fontesEmbutidas(cacheDir) {
  fs.mkdirSync(cacheDir, { recursive: true });

  const embutir = async (url) => {
    const chave = path.join(cacheDir, Buffer.from(url).toString('base64url').slice(0, 100));
    if (fs.existsSync(chave)) return fs.readFileSync(chave, 'utf8');
    const r = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!r.ok) throw new Error(`${r.status} em ${url.slice(0, 70)}`);
    const tipo = r.headers.get('content-type')?.split(';')[0] || 'font/woff2';
    const uri = `data:${tipo};base64,${Buffer.from(await r.arrayBuffer()).toString('base64')}`;
    fs.writeFileSync(chave, uri);
    return uri;
  };

  const familias = 'family=Anton&family=Archivo:wght@400;600;700';
  const css = await fetch(`https://fonts.googleapis.com/css2?${familias}&display=swap`, {
    headers: { 'User-Agent': UA }, // UA de navegador → devolve woff2
  }).then((r) => r.text());

  // só os blocos latinos, para não carregar cirílico/grego
  const blocos = css.split('/*').filter((b) => /latin/.test(b) && !/latin-ext/.test(b));
  let out = '';
  for (const b of blocos) {
    const url = b.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
    if (!url) continue;
    const familia = b.match(/font-family:\s*'([^']+)'/)?.[1];
    const peso = b.match(/font-weight:\s*(\d+)/)?.[1] || '400';
    const estilo = b.match(/font-style:\s*(\w+)/)?.[1] || 'normal';
    const uri = await embutir(url);
    out += `@font-face{font-family:'${familia}';font-style:${estilo};font-weight:${peso};font-display:block;src:url(${uri}) format('woff2')}\n`;
  }
  if (!/Anton/.test(out) || !/Archivo/.test(out)) throw new Error('faltou Anton ou Archivo no CSS do Google');
  return out;
}

/** O logo (branco, 100% opaco) vira data URI para ser usado como MÁSCARA. */
export function logoDataUri(caminho) {
  return `data:image/png;base64,${fs.readFileSync(caminho).toString('base64')}`;
}
