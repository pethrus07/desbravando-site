// Importa o conteúdo para as coleções do CMS, a partir da MESMA fonte que gera o layout
// (design/lib/dados.mjs). Assim página e banco nunca divergem.
//
// Idempotente por chave natural: cada item tem um `_id` derivado do conteúdo, então rodar
// de novo ATUALIZA em vez de duplicar. É o que permite corrigir um texto nos dados,
// rodar de novo, e o site acompanhar.
//
// Rodar:  node design/wix-importar.mjs --seco    (mostra o que faria)
//         node design/wix-importar.mjs           (grava)
import { wix, SITE } from './wix.mjs';
import {
  COSTA_DOCE, ROTEIRO_COSTA, HOSPEDAGENS, HOSPEDAGEM_NOTA, INCLUSO_COSTA,
  NAO_INCLUSO_COSTA, RESERVA, EXPEDICOES, GUIA, PERGUNTAS, DESTAQUES, fotoExpedicao,
  RESPOSTAS_TESTE,
} from './lib/dados.mjs';

const SECO = process.argv.includes('--seco');

/**
 * --mockup-faq preenche as respostas que faltam com o texto de TESTE, para conferir a
 * sanfona funcionando. Rodar SEM o sinalizador devolve tudo a vazio — o estado honesto.
 * Não é conteúdo aprovado: ver RESPOSTAS_TESTE em lib/dados.mjs, onde cada uma está
 * marcada como [DOSSIÊ] ou [INVENTADO].
 */
const MOCKUP_FAQ = process.argv.includes('--mockup-faq');

/** id estável e legível, para o import ser repetível */
const idDe = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase().slice(0, 60);

const lista = (itens) => itens.map((i) => `<p>• ${i}</p>`).join('');

/**
 * Imagem na Wix Data: o formato que os elementos entendem é `wix:image://v1/<id>/<nome>`.
 * A API aceita https puro e o id solto sem reclamar — a doc avisa que ela não valida
 * estrutura — mas aí o elemento de Imagem não renderiza. Usar sempre o wix:image.
 */
const idMidia = (url) => url.match(/\/media\/([^/]+)/)[1];
const imagemWix = (url) => `wix:image://v1/${idMidia(url)}/foto.jpg`;
const galeriaWix = (urls, titulo) => urls.map((u, i) => ({
  type: 'image', src: imagemWix(u), title: titulo, slug: `foto-${i}`,
}));
const dado = (chave) => COSTA_DOCE.dados.find(([r]) => r === chave)?.[1] || '';

/**
 * Grava um item. `save` cria ou substitui pelo `_id` — é o que dá idempotência.
 *
 * ⚠️ O `id` tem que aparecer DUAS vezes: no `dataItem` e dentro de `data._id`, com o
 * mesmo valor. Se mandar só um, a API responde `WDE0080: Validation failed` com a
 * mensagem "dataItem id and data._id fields must match" — que não aparece no `message`,
 * só em `details.validationError.fieldViolations`.
 */
async function salvar(colecao, item) {
  if (SECO) { console.log(`    → ${colecao.padEnd(12)} ${item._id}`); return true; }
  try {
    await wix('/wix-data/v2/items/save', {
      corpo: { dataCollectionId: colecao, dataItem: { id: item._id, data: item } },
      escopo: SITE,
    });
    return true;
  } catch (e) {
    const viol = e.dados?.details?.validationError?.fieldViolations?.map((v) => `${v.field}: ${v.description}`).join(' | ');
    console.log(`    ✘ ${colecao} ${item._id}: ${viol || String(e.message).replace(/\s+/g, ' ').slice(0, 160)}`);
    return false;
  }
}

let ok = 0, erro = 0;
const conta = async (c, i) => ((await salvar(c, i)) ? ok++ : erro++);

/* ── 1 · Expedicoes ─────────────────────────────────────────────────────
   A Costa Doce vai completa. As outras quatro entram como rascunho: hoje só existe o
   cabeçalho da agenda, e `publicado` fica FALSE em todas. */
console.log('\nExpedicoes');
const idCosta = idDe(COSTA_DOCE.nome);
await conta('Expedicoes', {
  _id: idCosta,
  titulo: COSTA_DOCE.nome,
  subtitulo: COSTA_DOCE.subtitulo,
  uf: 'RS',
  nomeEdicao: `Expedição ${COSTA_DOCE.nome}`,
  chamada: COSTA_DOCE.chamada,
  // ⚠️ `situacao` é o RÓTULO que o visitante lê ("Pré-reserva aberta"), não o slug
  // ("pre-reserva"). Errei isso na primeira carga e o site mostrou "espera" e "ultimas"
  // na agenda — o desenho manda `status.rotulo` (ver linhaIndice em telas/expedicoes.mjs).
  situacao: COSTA_DOCE.status?.rotulo || 'Pré-reserva aberta',
  dataInicio: '2026-12-02',
  dataFim: '2026-12-06',
  duracao: dado('duração'),
  percurso: dado('percurso'),
  formato: COSTA_DOCE.formato,
  regiao: COSTA_DOCE.regiao,
  base: dado('base'),
  veiculos: dado('veículos'),
  destaques: dado('destaques'),
  aeroporto: 'Porto Alegre · transfer incluso',
  pontoEncontro: 'Mostardas, 02/12 a partir das 15:00',
  fotoCapa: imagemWix(fotoExpedicao(3, 900)),
  galeria: galeriaWix([3, 0, 1, 2].map((i) => fotoExpedicao(i, 1400)), COSTA_DOCE.nome),
  sobreDestino: `<p>${COSTA_DOCE.sobre}</p>`,
  hospedagemNota: HOSPEDAGEM_NOTA,
  incluso: lista(INCLUSO_COSTA),
  naoIncluso: lista(NAO_INCLUSO_COSTA),
  // ⚠️ o dossiê NÃO traz preço — fica vazio de propósito, não inventar
  valorPorPessoa: '', valorPorCasal: '',
  formasPagamento: RESERVA.formasPagamento.join(' · '),
  sinal: '', saldo: '', politicaCriancas: '', cancelamento: '',
  rotuloBotao: 'Fazer pré-reserva',
  linkCheckout: '',
  publicado: false,
});

for (const e of EXPEDICOES.slice(1)) {
  await conta('Expedicoes', {
    _id: idDe(e.destino),
    titulo: e.destino, uf: e.uf, nomeEdicao: e.titulo || '',
    chamada: e.resumo, situacao: e.status.rotulo, // rótulo, não slug — ver acima
    duracao: e.duracao, formato: e.formato,
    fotoCapa: imagemWix(fotoExpedicao(e.fotoIdx, 900)),
    publicado: false,
  });
}

/* ── 2 · Roteiro ── */
console.log('Roteiro');
for (const [dia, data, local, titulo, texto, km] of ROTEIRO_COSTA) {
  await conta('Roteiro', {
    _id: `${idCosta}-dia-${dia}`,
    expedicao: idCosta,
    dia: Number(dia), data, local, titulo,
    texto: `<p>${texto}</p>`, km,
  });
}

/* ── 3 · Hospedagens ── */
console.log('Hospedagens');
for (const [i, h] of HOSPEDAGENS.entries()) {
  await conta('Hospedagens', {
    _id: `${idCosta}-${idDe(h.nome)}`,
    expedicao: idCosta,
    ordem: i + 1, nome: h.nome, papel: h.papel, onde: h.onde, noites: h.noites,
    texto: `<p>${h.texto}</p>`,
  });
}

/* ── 4 · Guia ──────────────────────────────────────────────────────────
   Categorias vazias, prontas para receber o conteúdo operacional. As perguntas NÃO
   entram aqui — têm coleção própria. */
console.log('Guia');
for (const [categoria] of GUIA.filter(([c]) => c !== 'Perguntas frequentes')) {
  await conta('Guia', {
    _id: `${idCosta}-${idDe(categoria)}`,
    expedicao: idCosta, categoria, titulo: '', conteudo: '',
  });
}

/* ── 5 · Destaques ── */
console.log('Destaques');
for (const [i, d] of DESTAQUES.entries()) {
  await conta('Destaques', {
    _id: idDe(d.titulo),
    ativo: true, ordem: i + 1, etiqueta: d.etiqueta, titulo: d.titulo,
    texto: d.texto, rotuloBotao: d.cta, link: '',
  });
}

/* ── 6 · FAQ ───────────────────────────────────────────────────────────
   `expedicao` fica VAZIO nas gerais — é o que faz a resposta valer para todas. */
console.log('FAQ');
for (const [i, [pergunta, resposta, escopo]] of PERGUNTAS.entries()) {
  const texto = resposta || (MOCKUP_FAQ ? RESPOSTAS_TESTE[pergunta] || '' : '');
  const item = {
    _id: idDe(pergunta),
    ativo: true, ordem: i + 1, escopo, pergunta,
    resposta: texto ? `<p>${texto}</p>` : '',
  };
  if (escopo === 'expedicao') item.expedicao = idCosta;
  await conta('FAQ', item);
}

console.log(`\n${SECO ? '[SECO] ' : ''}${ok} itens gravados${erro ? ` · ${erro} falharam` : ''}`);
if (!SECO) {
  console.log('\nconferindo o que ficou no site:');
  for (const c of ['Expedicoes', 'Roteiro', 'Hospedagens', 'Guia', 'Destaques', 'FAQ']) {
    try {
      const r = await wix('/wix-data/v2/items/query', { corpo: { dataCollectionId: c, query: { cursorPaging: { limit: 100 } } }, escopo: SITE });
      console.log(`   ${c.padEnd(12)} ${(r.dataItems || []).length} itens`);
    } catch (e) { console.log(`   ${c.padEnd(12)} não consegui contar: ${String(e.message).slice(0, 80)}`); }
  }
  console.log('\n⚠️ `publicado` está FALSE em todas as expedições — nada aparece no site ainda.');
  if (MOCKUP_FAQ) {
    console.log('⚠️ AS RESPOSTAS DO FAQ SÃO DE TESTE — não é conteúdo aprovado pelo cliente.');
    console.log('   Limpar:  node design/wix-importar.mjs');
  }
}
