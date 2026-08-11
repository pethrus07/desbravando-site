// Cliente mínimo da API da Wix, usado pelos scripts de CMS.
//
// A chave NUNCA fica no código. Ela vem de `.env.local` (que está no .gitignore) ou da
// variável de ambiente WIX_API_KEY. A doc da Wix é explícita: chave só em código de
// servidor, nunca versionada.
//
// O Account ID vem de graça: está dentro do próprio token, no campo `tenant`. O Site ID
// é descoberto pela API de sites — não precisa pedir para ninguém.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Lê `.env.local` no formato CHAVE=valor, sem depender de pacote. */
function env() {
  const arq = path.join(RAIZ, '.env.local');
  const out = { ...process.env };
  if (fs.existsSync(arq)) {
    for (const linha of fs.readFileSync(arq, 'utf8').split('\n')) {
      const m = linha.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
      if (m) out[m[1]] = m[2].trim();
    }
  }
  return out;
}

const E = env();
export const CHAVE = E.WIX_API_KEY;
if (!CHAVE) {
  console.error('Falta a chave. Crie design/../.env.local com WIX_API_KEY=... (o arquivo está no .gitignore).');
  process.exit(1);
}

/**
 * O Account ID mora dentro do token — não precisa pedir a ninguém.
 *
 * ⚠️ A chave da Wix é `IST.<cabeçalho>.<payload>.<assinatura>` — QUATRO partes, por causa
 * do prefixo `IST.`. O payload é o índice 2, não o 1 como num JWT normal. Errar isso
 * devolve o cabeçalho (kid/alg) e o `tenant` vem undefined.
 */
export function contaDoToken(chave = CHAVE) {
  const partes = chave.split('.');
  // procura a primeira parte que decodifica para um JSON com `data`
  for (const parte of partes) {
    try {
      const json = JSON.parse(Buffer.from(parte, 'base64url').toString('utf8'));
      if (!json.data) continue;
      const dados = typeof json.data === 'string' ? JSON.parse(json.data) : json.data;
      return {
        conta: dados.tenant?.id,
        tipo: dados.tenant?.type,
        app: dados.identity?.id,
        criadoEm: json.iat ? new Date(json.iat * 1000) : undefined,
      };
    } catch { /* não é esta parte */ }
  }
  return {};
}

export const CONTA = E.WIX_ACCOUNT_ID || contaDoToken().conta;

/** Chamada crua. `escopo` = 'conta' ou um siteId. */
export async function wix(caminho, { metodo = 'POST', corpo, escopo = 'conta' } = {}) {
  const cab = { Authorization: CHAVE, 'Content-Type': 'application/json' };
  if (escopo === 'conta') cab['wix-account-id'] = CONTA;
  else cab['wix-site-id'] = escopo;

  const r = await fetch(`https://www.wixapis.com${caminho}`, {
    method: metodo,
    headers: cab,
    body: corpo === undefined ? undefined : JSON.stringify(corpo),
  });
  const txt = await r.text();
  let dados;
  try { dados = txt ? JSON.parse(txt) : null; } catch { dados = txt; }
  if (!r.ok) {
    const erro = new Error(`${r.status} em ${caminho}: ${typeof dados === 'string' ? dados.slice(0, 300) : dados?.message || JSON.stringify(dados).slice(0, 300)}`);
    erro.status = r.status;
    erro.dados = dados;
    throw erro;
  }
  return dados;
}

/** Site em que os scripts operam. */
export const SITE = env().WIX_SITE_ID;

/** Coleções do CMS. É GET, não query POST — /collections/query não existe. */
export async function colecoes() {
  const r = await wix('/wix-data/v2/collections', { metodo: 'GET', escopo: SITE });
  return r.collections || [];
}

/** Lista os sites da conta — exige o escopo Read Site Data, que esta chave não tem. */
export async function sites() {
  const r = await wix('/site-list/v2/sites/query', { corpo: { query: { cursorPaging: { limit: 100 } } } });
  return r.sites || [];
}
