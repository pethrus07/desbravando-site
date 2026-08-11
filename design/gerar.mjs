// Monta o arquivo .pen da repaginação do desbravandoutv.com.
// Rodar:  node design/gerar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { documento, zerarIds } from './lib/pen.mjs';
import { VARIAVEIS } from './lib/tokens.mjs';
import { sistema } from './telas/sistema.mjs';
import { home } from './telas/home.mjs';
import { grupoAvulso } from './telas/expedicoes.mjs';
import { destino } from './telas/destino.mjs';
import { grupoFechado } from './telas/grupo-fechado.mjs';
import { homeMobile, destinoMobile, agendaMobile } from './telas/mobile.mjs';

zerarIds();

// Layout do canvas. Tudo em coordenada POSITIVA a partir de 0,0 — assim a origem do
// canvas é o canto superior esquerdo do conteúdo e nada fica "acima" da vista inicial.
// Fileira de cima: desktop. Fileira de baixo: celular (abaixo da tela mais alta).
const COL = 1560; // largura do frame desktop + respiro
const COL_M = 470; // largura do frame mobile + respiro
const LINHA_MOBILE = 11200; // abaixo da tela mais alta (Destino, ~10.600px)

const children = [
  home(0, 0),
  grupoAvulso(COL, 0),
  destino(COL * 2, 0),
  grupoFechado(COL * 3, 0),
  sistema(COL * 4, 0),

  homeMobile(0, LINHA_MOBILE),
  destinoMobile(COL_M, LINHA_MOBILE),
  agendaMobile(COL_M * 2, LINHA_MOBILE),
];

const saida = new URL('./desbravando-repaginacao.pen', import.meta.url);
const caminho = fileURLToPath(saida);

/**
 * TRAVA CONTRA PERDA DE TRABALHO.
 * A partir do momento em que o arquivo é editado no canvas do pen.dev, ELE passa a ser
 * a fonte da verdade — regenerar por cima apagaria tudo o que foi arrastado na mão.
 * Se o .pen for mais novo que qualquer fonte daqui, o gerador se recusa a escrever.
 * Para forçar mesmo assim:  node design/gerar.mjs --forcar
 */
if (fs.existsSync(caminho) && !process.argv.includes('--forcar')) {
  const dir = path.dirname(caminho);
  const fontes = [
    ...fs.readdirSync(`${dir}/lib`).map((f) => `${dir}/lib/${f}`),
    ...fs.readdirSync(`${dir}/telas`).map((f) => `${dir}/telas/${f}`),
    `${dir}/gerar.mjs`,
  ].filter((f) => f.endsWith('.mjs'));
  const maisNovaFonte = Math.max(...fontes.map((f) => fs.statSync(f).mtimeMs));
  const doPen = fs.statSync(caminho).mtimeMs;

  if (doPen > maisNovaFonte + 1000) {
    const backup = caminho.replace(/\.pen$/, `.backup.pen`);
    fs.copyFileSync(caminho, backup);
    console.error(
      `\n  O .pen foi editado DEPOIS do código — provavelmente no canvas do pen.dev.\n` +
      `  Regenerar apagaria essas edições, então parei aqui.\n\n` +
      `  Cópia de segurança: ${path.basename(backup)}\n\n` +
      `  Se as edições do canvas são as boas, o código está desatualizado: mexa no .pen\n` +
      `  direto (ou peça uma transformação sobre ele) em vez de regenerar.\n` +
      `  Se você quer mesmo jogar o canvas fora:  node design/gerar.mjs --forcar\n`,
    );
    process.exit(1);
  }
}

fs.writeFileSync(saida, documento({ children, variables: VARIAVEIS }), 'utf8');

// resumo
const contar = (n) => 1 + (n.children || []).reduce((a, c) => a + contar(c), 0);
const total = children.reduce((a, c) => a + contar(c), 0);
console.log(`${children.length} telas · ${total} nós`);
for (const c of children) console.log(`  ${String(contar(c)).padStart(4)} nós  ${c.name}`);
console.log(`\n→ ${saida.pathname.replace(/^\//, '')}`);
