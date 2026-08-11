// Monta o .pen com as quatro direções de home, para escolher uma.
// Rodar: node design/gerar-variacoes.mjs
import fs from 'node:fs';
import { documento, zerarIds } from './lib/pen.mjs';
import { VARIAVEIS } from './lib/tokens.mjs';
import { v1, v2, v3, v4 } from './telas/variacoes.mjs';

zerarIds();
const COL = 1560;
const children = [v1(0, 0), v2(COL, 0), v3(COL * 2, 0), v4(COL * 3, 0)];

const saida = new URL('./variacoes.pen', import.meta.url);
fs.writeFileSync(saida, documento({ children, variables: VARIAVEIS }), 'utf8');

const contar = (n) => 1 + (n.children || []).reduce((a, c) => a + contar(c), 0);
for (const c of children) console.log(`  ${String(contar(c)).padStart(4)} nós  ${c.name}`);
console.log(`\n→ design/variacoes.pen`);
