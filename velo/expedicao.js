// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA DA EXPEDIÇÃO (dinâmica)  ·  Desbravando UTV
//
// Cola no código DA PÁGINA. Não no masterPage.js.
//
// Faz três coisas, e as três pela mesma razão: a página serve 5 expedições, e só a
// Costa Doce tem conteúdo completo. Sem isto, as outras 4 abrem cheias de linha vazia
// e seção fantasma — e parece defeito quando é só conteúdo que ainda não chegou.
//
//   1. sanfona nos DOIS repetidores do FAQ — o próprio da expedição e o geral
//   2. recolhe as seções que não têm dado nenhum para esta expedição
//
// Os IDs abaixo são os do Editor. Confira os seus com o Modo Dev ligado e troque aqui —
// se algum estiver errado, o console diz qual e lista os que existem, em vez de morrer
// calado.
// ─────────────────────────────────────────────────────────────────────────────

/* O módulo "guia da expedição" SAIU do escopo em 12/08 — o FAQ cobre o mesmo papel. A
   coleção `Guia` segue no CMS com o conteúdo intacto, só não é exibida. Por isso não há
   mais sanfona de guia aqui, nem `#datasetGuia` na lista de seções abaixo. */

/* ── 2 · FAQ, dois repetidores ─────────────────────────────────────────────
   Dois porque um dataset de página dinâmica não filtra "referência = esta OU referência
   vazia" numa tacada, e as perguntas gerais têm `expedicao` vazio de propósito.

   O 1º é "sobre esta expedição": na Costa Doce traz 2 perguntas; nas outras 4 expedições
   vem VAZIO, porque ninguém escreveu pergunta específica para elas. Vazio ali é correto
   — e a função `recolherSeVazio` lá embaixo esconde o rótulo junto, para não sobrar um
   título "Sobre esta expedição" com nada embaixo. */
const FAQ_EXPEDICAO = {
  repetidor: '#repeaterFaqExp',
  linha: '#containerFaqExp',
  pergunta: '#textFaqExpPergunta',
  resposta: '#textFaqExpResposta',
  sinal: '#textFaqExpSinal',
};

const FAQ_GERAL = {
  repetidor: '#repeaterFaqGeral',
  linha: '#containerFaqGeral',
  pergunta: '#textFaqGeralPergunta',
  resposta: '#textFaqGeralResposta',
  sinal: '#textFaqGeralSinal',
};

/* ── 3 · Seções que dependem de repetidor ──────────────────────────────────
   Sem isto, as 4 expedições que ainda não têm conteúdo abrem com título de seção e
   repetidor vazio embaixo — o que parece defeito, e não é: é conteúdo que não chegou.

   Medido no CMS hoje: a Costa Doce tem 5 dias de roteiro e 2 hospedagens. Urubici,
   Canastra, Visconde e Macaé têm ZERO das duas. Recolher é o que separa "página enxuta"
   de "página quebrada".

   Quando o conteúdo entrar, a seção reaparece sozinha. */
const SECOES_DE_REPETIDOR = [
  ['#datasetRoteiro',     '#secaoRoteiro'],
  ['#datasetHospedagens', '#secaoHospedagem'],
];

$w.onReady(function () {
  // a primeira sanfona de cada bloco abre; a segunda lista do FAQ começa fechada, senão
  // a página abre com duas respostas abertas e o bloco fica desalinhado
  sanfona(FAQ_EXPEDICAO, { abrirPrimeira: true });
  sanfona(FAQ_GERAL, { abrirPrimeira: false });

  // rótulo "Sobre esta expedição" desaparece junto com a lista quando ela vem vazia
  recolherSeVazio('#datasetFaqExp', ['#repeaterFaqExp', '#textRotuloFaqExp']);

  // seções inteiras que ficam sem lista
  for (const [dataset, secao] of SECOES_DE_REPETIDOR) {
    recolherSeVazio(dataset, [secao]);
  }

  esconderSecoesSemDado();
});

/**
 * Transforma um repetidor ligado ao CMS numa sanfona de verdade — uma aberta por vez.
 *
 * @param {{repetidor:string, resposta:string, sinal:string, pergunta:string, linha?:string}} ids
 * @param {{abrirPrimeira?:boolean}} opcoes
 */
function sanfona(ids, { abrirPrimeira = true } = {}) {
  const rep = $w(ids.repetidor);

  if (!rep || typeof rep.onItemReady !== 'function') {
    // acontece se o ID mudou no Editor; imprime os que existem para não caçar
    let lista = [];
    try { lista = $w('Repeater').map((r) => r.id); } catch (e) { /* nenhum */ }
    console.warn('sanfona: não achei ' + ids.repetidor + '. Repetidores nesta página: ' + lista.join(', '));
    return;
  }

  let jaAbriu = false;

  rep.onItemReady(($item, dados, indice) => {
    const resposta = $item(ids.resposta);
    const sinal = $item(ids.sinal);
    const gatilho = ids.linha ? $item(ids.linha) : $item(ids.pergunta);

    // O campo é texto rico: vazio vem como "<p></p>" ou "&nbsp;", nunca como "".
    // Sem tirar as tags antes, TODA linha pareceria ter conteúdo.
    const bruto = dados.resposta ?? dados.conteudo ?? '';
    const texto = String(bruto).replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
    const temConteudo = texto.trim().length > 0;

    if (!temConteudo) {
      resposta.collapse();
      sinal.text = '';
      return; // sem onClick: linha que não abre nada não deve parecer que abre
    }

    // "a primeira" é a primeira COM conteúdo, não a de índice 0 — senão, numa expedição
    // cujas primeiras categorias estão vazias, nada abriria
    if (abrirPrimeira && !jaAbriu) {
      jaAbriu = true;
      resposta.expand();
      sinal.text = '−';
    } else {
      resposta.collapse();
      sinal.text = '+';
    }

    gatilho.onClick(() => {
      // ⚠️ ler ANTES do forEachItem: o laço abaixo fecha tudo, inclusive esta linha, e aí
      // `collapsed` já não diz o que o usuário queria. Ler depois faz o clique nunca
      // abrir — é o bug clássico deste padrão.
      const vaiAbrir = resposta.collapsed;

      rep.forEachItem(($outro) => {
        $outro(ids.resposta).collapse();
        if ($outro(ids.sinal).text !== '') $outro(ids.sinal).text = '+';
      });

      if (vaiAbrir) {
        resposta.expand();
        sinal.text = '−';
      }
    });
  });
}

/**
 * Recolhe elementos quando o dataset não trouxe nenhum item.
 * Serve para o rótulo não ficar órfão acima de uma lista vazia.
 */
function recolherSeVazio(idDataset, idsParaRecolher) {
  const ds = $w(idDataset);
  if (!ds || typeof ds.onReady !== 'function') {
    console.warn('recolherSeVazio: não achei ' + idDataset);
    return;
  }
  ds.onReady(() => {
    if (ds.getTotalCount() > 0) return;
    for (const id of idsParaRecolher) {
      try { $w(id).collapse(); } catch (e) { console.warn('não consegui recolher ' + id); }
    }
  });
}

/**
 * Esconde as seções que não têm dado NENHUM para a expedição atual.
 *
 * Por que existe: hoje só a Costa Doce está completa. Nas outras 4, campos como
 * `sobreDestino`, `incluso`, `galeria` e os valores da Reserva estão vazios — e campo
 * vazio na Wix aparece em BRANCO, não desaparece. Sem isto, a página do Urubici abre com
 * cinco seções tituladas e vazias.
 *
 * Quando o conteúdo chegar, a seção volta sozinha. Não precisa mexer aqui.
 */
function esconderSecoesSemDado() {
  const ds = $w('#dynamicDataset');
  if (!ds || typeof ds.onReady !== 'function') {
    console.warn('esconderSecoesSemDado: não achei #dynamicDataset');
    return;
  }

  ds.onReady(() => {
    const item = ds.getCurrentItem() || {};
    const vazio = (v) => v == null || v === '' ||
      (Array.isArray(v) && v.length === 0) ||
      (typeof v === 'string' && !v.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim());

    // seção → os campos que a sustentam. Se TODOS estiverem vazios, a seção recolhe.
    const secoes = [
      // ⚠️ o hero exige que os DOIS estejam vazios para recolher. `videoAbertura` está
      // vazio nas 5 expedições, então checar só ele apagaria o topo de toda página — e
      // `fotoCapa` está preenchida nas 5. Na prática: o hero nunca desaparece, o que é o
      // certo. Vira foto enquanto não houver vídeo.
      ['#secaoVideo',      ['videoAbertura', 'fotoCapa']],
      ['#secaoSobre',      ['sobreDestino', 'tituloSobre']],
      ['#secaoGaleria',    ['galeria']],
      ['#secaoIncluso',    ['incluso']],
      ['#secaoNaoIncluso', ['naoIncluso']],
      ['#secaoReserva',    ['valorPorPessoa', 'valorPorCasal']],
    ];

    const recolhidas = [];
    for (const [id, campos] of secoes) {
      if (!campos.every((c) => vazio(item[c]))) continue;
      try { $w(id).collapse(); recolhidas.push(id); } catch (e) { /* seção pode não existir ainda */ }
    }
    if (recolhidas.length) {
      console.log('expedição "' + (item.titulo || '?') + '": recolhi ' + recolhidas.length +
        ' seções sem dado → ' + recolhidas.join(', '));
    }
  });
}
