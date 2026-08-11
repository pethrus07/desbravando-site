// Servidor estático da pasta do projeto, só para o manual ficar acessível por http.
//
// Por que existe: o Claude in Chrome (e qualquer extensão) só lê `file://` se a permissão
// "Permitir acesso a URLs de arquivo" estiver ligada na página da extensão. Servindo por
// localhost, o manual vira uma URL comum e some essa dependência.
//
// Rodar:  node design/servir.mjs        → http://localhost:8787/manual-de-montagem.html
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORTA = Number(process.argv[2]) || 8787;

const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.md': 'text/plain; charset=utf-8', '.csv': 'text/csv; charset=utf-8',
};

http.createServer((req, res) => {
  const pedido = decodeURIComponent(req.url.split('?')[0]);
  const alvo = path.join(RAIZ, pedido === '/' ? 'montagem-home.html' : pedido);

  // não deixa sair da pasta do projeto
  if (!alvo.startsWith(RAIZ)) { res.writeHead(403).end('fora da pasta'); return; }
  if (!fs.existsSync(alvo) || fs.statSync(alvo).isDirectory()) {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('não encontrado: ' + pedido);
    return;
  }
  res.writeHead(200, {
    'content-type': TIPOS[path.extname(alvo).toLowerCase()] || 'application/octet-stream',
    'cache-control': 'no-store',
  });
  fs.createReadStream(alvo).pipe(res);
}).listen(PORTA, () => {
  console.log(`servindo ${RAIZ}`);
  console.log(`\n  manual   http://localhost:${PORTA}/manual-de-montagem.html`);
  console.log(`  dados    http://localhost:${PORTA}/manual-dados.json\n`);
  console.log('Ctrl+C para parar.');
});
