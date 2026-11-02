// Baixa os SVGs do lucide que o design usa para design/.cache-icones (fora do git).
//
//   node design/baixar-icones.mjs
//
// A lista fica em design/icones.txt, um nome por linha. Ícone que já está no cache não é
// baixado de novo. Sem o SVG, lib/icones.mjs desenha um quadrado no lugar do ícone.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const CACHE = path.join(DIR, '.cache-icones');
const VERSAO = '0.469.0';
fs.mkdirSync(CACHE, { recursive: true });

const nomes = fs.readFileSync(path.join(DIR, 'icones.txt'), 'utf8').split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
let baixados = 0, falhas = 0;
for (const nome of nomes) {
  const alvo = path.join(CACHE, `${nome}.svg`);
  if (fs.existsSync(alvo)) continue;
  const r = await fetch(`https://unpkg.com/lucide-static@${VERSAO}/icons/${nome}.svg`);
  if (!r.ok) { console.warn(`! ${nome}: HTTP ${r.status}`); falhas++; continue; }
  fs.writeFileSync(alvo, await r.text(), 'utf8');
  baixados++;
}
console.log(`${nomes.length} ícones na lista · ${baixados} baixados · ${falhas} falhas`);
process.exitCode = falhas ? 1 : 0;
