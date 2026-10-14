// Importa as fotos para a BIBLIOTECA DE MÍDIA do site e devolve os ids resolvíveis.
//
// Por que isso existe, que foi o achado do QA: as fotos do mockup vinham de URLs do
// static.wixstatic.com que o CDN serve (200) mas que NÃO estão na biblioteca do site.
// Guardar essa URL em campo IMAGE não dá erro na API — só que o Editor não consegue
// resolver a mídia na hora de ligar o elemento, a ligação falha com
//
//   Wix code SDK error: The "src" property cannot be set to "src".
//
// e o elemento cai na foto de tempo de desenho. Resultado no ar: as 5 expedições da
// agenda mostrando a MESMA foto. Importar para a biblioteca resolve na raiz.
//
// Escreve um cache em cms/midia.json para não reimportar a cada rodada.
//
// Rodar:  node design/wix-midia.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { wix, SITE } from './wix.mjs';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = path.join(RAIZ, 'cms', 'midia.json');

const ler = () => { try { return JSON.parse(fs.readFileSync(CACHE, 'utf8')); } catch { return {}; } };
const gravar = (o) => fs.writeFileSync(CACHE, JSON.stringify(o, null, 1), 'utf8');

/** id de mídia dentro de uma URL do static.wixstatic.com */
export const idDaUrl = (url) => (String(url).match(/\/media\/([^/?]+)/) || [])[1] || null;

/** URL crua da mídia, sem os parâmetros de corte */
const urlCrua = (url) => `https://static.wixstatic.com/media/${idDaUrl(url)}`;

/**
 * O formato que os elementos da Wix realmente entendem. As dimensões de origem no
 * fragmento não são enfeite: sem elas alguns elementos não sabem calcular o corte.
 */
export const uri = (m) =>
  `wix:image://v1/${m.id}/${m.nome}` +
  (m.largura && m.altura ? `#originWidth=${m.largura}&originHeight=${m.altura}` : '');

/** Espera o arquivo sair de PENDING. A importação é assíncrona. */
async function aguardar(id, tentativas = 12) {
  for (let i = 0; i < tentativas; i++) {
    try {
      const r = await wix(`/site-media/v1/files/${encodeURIComponent(id)}`, { metodo: 'GET', escopo: SITE });
      const f = r.file || r;
      if (f.operationStatus && f.operationStatus !== 'PENDING') {
        return { estado: f.operationStatus, largura: f.media?.image?.image?.width, altura: f.media?.image?.image?.height };
      }
    } catch (e) { /* ainda não indexou */ }
    await new Promise((r) => setTimeout(r, 1500));
  }
  return { estado: 'PENDING' };
}

/**
 * Garante uma foto na biblioteca. Devolve { id, nome, largura, altura }.
 * Idempotente pelo id de origem, via cache em disco.
 */
export async function garantir(urlOrigem, nome) {
  const cache = ler();
  const chave = idDaUrl(urlOrigem);
  if (!chave) throw new Error('não consegui extrair o id de mídia de ' + urlOrigem);
  if (cache[chave]?.id) return cache[chave];

  const r = await wix('/site-media/v1/files/import', {
    corpo: { url: urlCrua(urlOrigem), mediaType: 'IMAGE', displayName: nome, parentFolderId: 'media-root' },
    escopo: SITE,
  });
  const f = r.file || r;
  const situacao = await aguardar(f.id);
  const registro = {
    id: f.id, nome,
    largura: situacao.largura ?? null, altura: situacao.altura ?? null,
    estado: situacao.estado, origem: chave,
  };
  cache[chave] = registro;
  gravar(cache);
  console.log(`  ↑ ${nome.padEnd(30)} ${f.id}  ${situacao.estado}${situacao.largura ? ` ${situacao.largura}x${situacao.altura}` : ''}`);
  return registro;
}

/**
 * CAPAS — atribuição EXPLÍCITA de foto por expedição.
 *
 * Explícita de propósito. Antes eu derivava a capa de um índice sobre as fotos raspadas
 * do site, e duas expedições caíam na mesma imagem sem ninguém notar. Tabela na mão erra
 * na cara.
 *
 * Todos estes ids estão na biblioteca de mídia DO SITE — é o que a ligação do Editor
 * exige. Confira com `node design/wix-midia.mjs --conferir` antes de trocar qualquer um.
 *
 * ⚠️ Fotos de MOCKUP. Quando as oficiais chegarem, troque o id e as dimensões aqui e
 * rode `node design/wix-importar.mjs` — o resto se ajusta.
 */
export const CAPAS = {
  'Costa Doce':        { id: 'bc3632_d070c9144e0a46dcb3dd9741ee583e6a~mv2.png', nome: 'capa-costa-doce.jpg',        largura: 1284, altura: 731 },
  'Urubici':           { id: 'bc3632_2315fe080d3444568bd6a1a929a94e46~mv2.jpeg', nome: 'capa-urubici.jpg',          largura: 883,  altura: 1280 },
  'Serra da Canastra': { id: 'bc3632_4c4f52eef7bb415bb1768facc719a0a7~mv2.jpg', nome: 'capa-serra-da-canastra.jpg', largura: 725,  altura: 1280 },
  'Visconde de Mauá':  { id: 'bc3632_1316c156551b46d1968b54412ff2de66~mv2.jpg', nome: 'capa-visconde-de-maua.jpg',  largura: 540,  altura: 960 },
  // já estava na biblioteca dele; entrou para o Macaé não repetir a capa da Costa Doce
  'Macaé':             { id: '596511_b96717891d1e4dd8acdfcfb81da8b696~mv2.jpeg', nome: 'capa-macae.jpg',            largura: 1280, altura: 720 },
};

/** Galeria da Costa Doce — as 4 distintas que existem, mais uma da biblioteca dele. */
export const GALERIA_COSTA = [
  CAPAS['Costa Doce'],
  { id: 'b7e201_81b3769b182e4c7094a97a2af381b877~mv2.jpeg', nome: 'costa-doce-2.jpg', largura: 1600, altura: 1066 },
  CAPAS['Serra da Canastra'],
  CAPAS['Visconde de Mauá'],
];

/** Fotos das hospedagens — duas cada, sem repetir dentro da mesma hospedagem. */
export const FOTOS_HOSPEDAGEM = [
  [GALERIA_COSTA[1], CAPAS['Costa Doce']],
  [CAPAS['Urubici'], CAPAS['Macaé']],
];

/** Confere que todo id das tabelas acima existe de fato na biblioteca do site. */
export async function conferir() {
  let cursor = null, ids = new Set(), v = 0;
  do {
    const q = '/site-media/v1/files?paging.limit=100' + (cursor ? '&paging.cursor=' + encodeURIComponent(cursor) : '');
    const r = await wix(q, { metodo: 'GET', escopo: SITE });
    for (const f of r.files || []) ids.add(f.id);
    // ⚠️ o cursor mora em nextCursor.cursors.next e é STRING; nextCursor em si é objeto.
    // Tratar o objeto como string faz a paginação repetir a mesma página para sempre.
    cursor = r.nextCursor?.hasNext ? r.nextCursor.cursors.next : null;
  } while (cursor && ++v < 80);

  const usadas = [...Object.entries(CAPAS).map(([k, m]) => [`capa ${k}`, m]),
    ...GALERIA_COSTA.map((m, i) => [`galeria ${i + 1}`, m]),
    ...FOTOS_HOSPEDAGEM.flatMap((par, i) => par.map((m, j) => [`hospedagem ${i + 1}.${j + 1}`, m]))];
  let faltando = 0;
  console.log(`biblioteca: ${ids.size} arquivos`);
  for (const [rotulo, m] of usadas) {
    const ok = ids.has(m.id);
    if (!ok) faltando++;
    console.log(`  ${ok ? '✓' : '✘'} ${String(rotulo).padEnd(22)} ${m.id}`);
  }
  console.log(faltando ? `\n✘ ${faltando} fora da biblioteca — a ligação no Editor vai falhar nesses` : '\n✓ tudo na biblioteca');
  return faltando === 0;
}

/* Rodando direto: importa tudo que o CMS precisa. */
if (import.meta.url === `file:///${process.argv[1].replace(/\\/g, '/')}`) {
  if (process.argv.includes('--conferir')) {
    process.exit((await conferir()) ? 0 : 1);
  }
  const { EXPEDICOES, HOSPEDAGENS, fotoExpedicao } = await import('./lib/dados.mjs');

  console.log('capas das expedições');
  for (const e of EXPEDICOES) {
    const u = fotoExpedicao(e.fotoIdx, 1600);
    if (u) await garantir(u, `capa-${e.destino.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}.jpg`);
  }

  console.log('\ngaleria da Costa Doce');
  for (const [i, idx] of [3, 0, 1, 2].entries()) {
    const u = fotoExpedicao(idx, 1600);
    if (u) await garantir(u, `costa-doce-galeria-${i + 1}.jpg`);
  }

  console.log('\nfotos das hospedagens');
  for (const [i, h] of HOSPEDAGENS.entries()) {
    for (const j of [0, 1]) {
      const u = fotoExpedicao((i * 2 + j) % 4, 1400);
      if (u) await garantir(u, `hospedagem-${i + 1}-${j + 1}.jpg`);
    }
  }

  const cache = ler();
  const n = Object.keys(cache).length;
  const prontos = Object.values(cache).filter((m) => m.estado === 'READY').length;
  console.log(`\n${n} na biblioteca · ${prontos} READY · cache em cms/midia.json`);
}
