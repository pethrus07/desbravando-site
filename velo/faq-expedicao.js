// ─────────────────────────────────────────────────────────────────────────────
// FAQ DA PÁGINA DA EXPEDIÇÃO — duas listas, mesma sanfona
//
// Cole no código DA PÁGINA da expedição.
//
// ⚠️ SE JÁ EXISTIR um `$w.onReady` nesta página: não cole o daqui. Cole as funções e
//    acrescente as duas chamadas dentro do onReady que já está lá.
//
// POR QUE DUAS LISTAS: um dataset de página dinâmica não filtra "referência = esta OU
// referência vazia" numa tacada. As gerais têm `expedicao` vazio de propósito, para valerem
// em toda expedição. Então: um dataset para as próprias, outro para as gerais.
//
// Hoje o CMS tem 3 próprias por expedição e 6 gerais → a página mostra 9.
// ─────────────────────────────────────────────────────────────────────────────

// 1º repetidor: "Sobre esta expedição" — filtrado pelo item atual da página
const FAQ_EXPEDICAO = {
  repetidor: '#repeaterFaqExp',
  linha: '#containerFaqExp',      // a caixa que envolve pergunta, sinal e resposta
  resposta: '#textFaqExpResposta',
  sinal: '#textFaqExpSinal',
  dataset: '#datasetFaqExp',
  rotulo: '#textRotuloFaqExp',    // o título "Sobre esta expedição"
};

// 2º repetidor: "Dúvidas gerais" — as que valem para todas
const FAQ_GERAL = {
  repetidor: '#repeaterFaqGeral',
  linha: '#containerFaqGeral',
  resposta: '#textFaqGeralResposta',
  sinal: '#textFaqGeralSinal',
};

$w.onReady(function () {
  // a primeira lista abre a primeira pergunta; a segunda começa fechada, senão a página
  // abre com duas respostas abertas e o bloco fica desalinhado
  sanfona(FAQ_EXPEDICAO, true);
  sanfona(FAQ_GERAL, false);

  // rótulo não pode ficar órfão: se a lista das próprias vier vazia, ele sai junto
  recolherSeVazio(FAQ_EXPEDICAO.dataset, [FAQ_EXPEDICAO.repetidor, FAQ_EXPEDICAO.rotulo]);
});

/**
 * Transforma um repetidor ligado ao CMS numa sanfona — uma aberta por vez.
 *
 * @param {object} ids
 * @param {boolean} abrirPrimeira  abre a primeira COM resposta
 */
function sanfona(ids, abrirPrimeira) {
  const rep = $w(ids.repetidor);

  if (!rep || typeof rep.onItemReady !== 'function') {
    // ID errado é o erro mais comum aqui; listar os que existem economiza a caçada
    let lista = [];
    try { lista = $w('Repeater').map(function (r) { return r.id; }); } catch (e) { /* nenhum */ }
    console.warn('FAQ: não achei ' + ids.repetidor + '. Repetidores nesta página: ' + lista.join(', '));
    return;
  }

  let jaAbriu = false;

  rep.onItemReady(function ($item, dados) {
    const resposta = $item(ids.resposta);
    const sinal = $item(ids.sinal);
    const gatilho = ids.linha ? $item(ids.linha) : resposta;

    // texto rico vazio vem como "<p></p>" ou "&nbsp;", nunca como ""
    const texto = String(dados.resposta == null ? '' : dados.resposta)
      .replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();

    if (!texto) {
      // pergunta sem resposta não vira sanfona: sem sinal, sem clique
      resposta.collapse();
      sinal.text = '';
      return;
    }

    // "a primeira" é a primeira COM resposta, não a de índice 0 — senão, numa expedição
    // cujas primeiras perguntas estejam sem resposta, nada abriria
    if (abrirPrimeira && !jaAbriu) {
      jaAbriu = true;
      resposta.expand();
      sinal.text = '−';
    } else {
      resposta.collapse();
      sinal.text = '+';
    }

    gatilho.onClick(function () {
      // ⚠️ ler ANTES do forEachItem: o laço abaixo fecha tudo, inclusive esta linha, e aí
      // `collapsed` já não diz o que o usuário queria. Ler depois faz o clique nunca abrir.
      const vaiAbrir = resposta.collapsed;

      rep.forEachItem(function ($outro) {
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

/** Recolhe elementos quando o dataset não trouxe item nenhum. */
function recolherSeVazio(idDataset, idsParaRecolher) {
  const ds = $w(idDataset);
  if (!ds || typeof ds.onReady !== 'function') {
    console.warn('FAQ: não achei ' + idDataset);
    return;
  }
  ds.onReady(function () {
    if (ds.getTotalCount() > 0) return;
    idsParaRecolher.forEach(function (id) {
      try { $w(id).collapse(); } catch (e) { console.warn('FAQ: não consegui recolher ' + id); }
    });
    console.log('FAQ: sem perguntas próprias nesta expedição → rótulo e lista recolhidos');
  });
}
