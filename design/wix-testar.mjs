// Confere a chave da Wix ANTES de escrever qualquer coisa.
//
// Ordem de propósito: primeiro o que é só leitura. Se um escopo faltar, descobrimos aqui
// e não no meio de uma importação pela metade.
//
// Rodar:  node design/wix-testar.mjs
import { wix, sites, contaDoToken, CONTA } from './wix.mjs';

const ok = (t) => console.log(`  ✔ ${t}`);
const nao = (t) => console.log(`  ✘ ${t}`);

console.log('\n── o que vem dentro do token ──');
const t = contaDoToken();
console.log(`  conta      ${t.conta}  (${t.tipo})`);
console.log(`  aplicação  ${t.app}`);
console.log(`  criado em  ${t.criadoEm?.toLocaleString('pt-BR')}`);
console.log(`  em uso     ${CONTA === t.conta ? 'mesma conta do .env ✔' : 'DIVERGE do .env ✘'}`);

console.log('\n── sites da conta ──');
let siteId = null;
try {
  const lista = await sites();
  for (const s of lista) {
    const nome = s.displayName || s.name || '(sem nome)';
    console.log(`  ${s.id}  ${nome}`);
    if (/desbravando/i.test(JSON.stringify(s))) siteId = s.id;
  }
  if (!lista.length) nao('a conta não devolveu nenhum site');
  if (siteId) ok(`Site ID do Desbravando: ${siteId}`);
  else if (lista.length === 1) { siteId = lista[0].id; ok(`só um site na conta, usando: ${siteId}`); }
} catch (e) {
  nao(`listar sites falhou — ${e.message}`);
  console.log('     (o escopo de contas/sites pode não estar na chave; dá para seguir com o Site ID na mão)');
}

if (!siteId) {
  console.log('\nSem Site ID não consigo testar os escopos de site. Pegue na URL do painel,');
  console.log('depois de /dashboard/, e rode:  node design/wix-testar.mjs <siteId>');
  if (process.argv[2]) siteId = process.argv[2];
}
if (process.argv[2]) siteId = process.argv[2];

if (siteId) {
  console.log(`\n── escopos no site ${siteId} ──`);

  // Wix Data — o que mais importa: é o que cria as coleções e importa a Costa Doce
  try {
    const r = await wix('/wix-data/v2/collections/query', { corpo: { query: { cursorPaging: { limit: 50 } } }, escopo: siteId });
    const cols = r.collections || [];
    ok(`Wix Data: leitura funciona · ${cols.length} coleções já existem`);
    for (const c of cols.slice(0, 20)) console.log(`       ${c.id}${c.displayName && c.displayName !== c.id ? `  (${c.displayName})` : ''}`);
  } catch (e) { nao(`Wix Data: ${e.message}`); }

  // Media Manager — para subir as fotos
  try {
    await wix('/site-media/v1/files/list', { metodo: 'GET', escopo: siteId });
    ok('Media Manager: leitura funciona');
  } catch (e) { nao(`Media Manager: ${e.message}`); }

  // Wix Events — para o evento e os tipos de ingresso
  try {
    const r = await wix('/events/v3/events/query', { corpo: { query: { cursorPaging: { limit: 5 } } }, escopo: siteId });
    ok(`Wix Events: leitura funciona · ${(r.events || []).length} eventos`);
  } catch (e) { nao(`Wix Events: ${e.message}`); }
}

console.log('\nNada foi criado nem alterado — este script só lê.\n');
