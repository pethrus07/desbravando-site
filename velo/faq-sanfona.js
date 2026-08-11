// ─────────────────────────────────────────────────────────────────────────────
// SANFONA DO FAQ  ·  Desbravando UTV  ·  página Grupo Avulso
//
// Cola no código DA PÁGINA. Não no masterPage.js — lá valeria para o site inteiro.
//
// O que resolve: repetidor conecta ao CMS mas não abre e fecha linha por linha; o
// Acordeão nativo abre e fecha mas não conecta ao CMS. Isto dá os dois.
//
// Comportamento:
//   · a primeira pergunta que TEM resposta já vem aberta;
//   · clicar numa linha fecha as outras — sanfona de verdade, uma por vez;
//   · o sinal alterna + / − ;
//   · pergunta SEM resposta não vira sanfona: sem sinal, sem clique. É de propósito —
//     item que não abre nada não deve parecer que abre. Hoje as 8 têm resposta DE TESTE,
//     justamente para dar o que clicar; quando as reais chegarem, nada muda no código.
// ─────────────────────────────────────────────────────────────────────────────

const FAQ_AVULSO = {
  repetidor: '#repeater2',
  linha: '#container2', // a caixa da linha — clique na linha inteira, melhor no celular
  pergunta: '#text85',
  resposta: '#text86',
  sinal: '#text87',
};

$w.onReady(function () {
  sanfona(FAQ_AVULSO);
});

/**
 * Transforma um repetidor ligado à coleção FAQ numa sanfona.
 *
 * @param {{repetidor:string, resposta:string, sinal:string, pergunta:string, linha?:string}} ids
 */
function sanfona(ids) {
  const rep = $w(ids.repetidor);

  if (!rep || typeof rep.onItemReady !== 'function') {
    // acontece se o ID mudou no Editor; imprime os que existem para não caçar
    let lista = [];
    try { lista = $w('Repeater').map((r) => r.id); } catch (e) { /* nenhum */ }
    console.warn('FAQ: não achei ' + ids.repetidor + '. Repetidores nesta página: ' + lista.join(', '));
    return;
  }

  rep.onItemReady(($item, dados, indice) => {
    const resposta = $item(ids.resposta);
    const sinal = $item(ids.sinal);
    const gatilho = ids.linha ? $item(ids.linha) : $item(ids.pergunta);

    // `resposta` é texto rico: vazio costuma vir como "<p></p>" ou "&nbsp;", não como "".
    // Sem tirar as tags antes, toda pergunta pareceria ter resposta.
    const texto = String(dados.resposta || '').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
    const temResposta = texto.trim().length > 0;

    // sem resposta não há o que abrir: some o sinal e não liga o clique
    if (!temResposta) {
      resposta.collapse();
      sinal.text = '';
      return;
    }

    // a primeira já vem aberta — é o que o desenho mostra
    if (indice === 0) {
      resposta.expand();
      sinal.text = '−';
    } else {
      resposta.collapse();
      sinal.text = '+';
    }

    gatilho.onClick(() => {
      // ⚠️ ler ANTES do forEachItem: o laço abaixo fecha tudo, inclusive esta linha,
      // e aí `collapsed` já não diz mais o que o usuário queria. Ler depois faz o
      // clique não abrir nunca — é o bug clássico deste padrão.
      const vaiAbrir = resposta.collapsed;

      rep.forEachItem(($outro) => {
        $outro(ids.resposta).collapse();
        // não devolve o "+" para quem não tem resposta
        if ($outro(ids.sinal).text !== '') $outro(ids.sinal).text = '+';
      });

      if (vaiAbrir) {
        resposta.expand();
        sinal.text = '−';
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA DA EXPEDIÇÃO — dois repetidores
//
// Lá são duas listas: "sobre esta expedição" e "dúvidas gerais". IDs são únicos por
// página, então o segundo conjunto sai numerado pela Wix. Confira os IDs reais no
// Editor e chame a função duas vezes:
//
// $w.onReady(function () {
//   sanfona({ repetidor:'#repeater1', linha:'#container1', pergunta:'#text85',  resposta:'#text86',  sinal:'#text87'  });
//   sanfona({ repetidor:'#repeater2', linha:'#container2', pergunta:'#text851', resposta:'#text861', sinal:'#text871' });
// });
//
// ─────────────────────────────────────────────────────────────────────────────
// SE A RESPOSTA DEIXAR BURACO BRANCO ao fechar: ela está IRMÃ do container2, não
// DENTRO dele. Arraste para dentro no painel de camadas. É o único erro de montagem
// que este código não contorna.
// ─────────────────────────────────────────────────────────────────────────────
