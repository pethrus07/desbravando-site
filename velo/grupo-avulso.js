// ─────────────────────────────────────────────────────────────────────────────
// GRUPO AVULSO — código completo da página
//
//   1. SANFONA DO FAQ — seu código, sem alteração nenhuma
//   2. CARTÕES DA AGENDA — cada cartão abre a página da SUA expedição
//
// Substitua o código da página inteiro por este.
// ─────────────────────────────────────────────────────────────────────────────

import wixLocation from 'wix-location';

const FAQ_AVULSO = {
  repetidor: '#repeater2',
  linha: '#container2',
  pergunta: '#text85',
  resposta: '#text86',
  sinal: '#text87',
};

const PREFIXO = '/expedicoes';

// ⚠️ Hoje o endereço vem do campo `Título` e a Wix MANTÉM O ACENTO: "Macaé" → /expedicoes/macaé.
// Se trocar o campo de endereço da página dinâmica, mude aqui para 'slug'.
const CAMPO_DO_ENDERECO = 'titulo';

$w.onReady(function () {
  sanfona(FAQ_AVULSO);
  ligarCartoes();
});

/* ── 1 · SANFONA DO FAQ — inalterada ─────────────────────────────────────── */

function sanfona(ids) {
  const rep = $w(ids.repetidor);

  if (!rep || typeof rep.onItemReady !== 'function') {
    let lista = [];
    try { lista = $w('Repeater').map((r) => r.id); } catch (e) { /* nenhum */ }
    console.warn('FAQ: não achei ' + ids.repetidor + '. Repetidores nesta página: ' + lista.join(', '));
    return;
  }

  rep.onItemReady(($item, dados, indice) => {
    const resposta = $item(ids.resposta);
    const sinal = $item(ids.sinal);
    const gatilho = ids.linha ? $item(ids.linha) : $item(ids.pergunta);

    // `resposta` é texto rico: vazio vem como "<p></p>" ou "&nbsp;", não como "".
    const texto = String(dados.resposta || '').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
    const temResposta = texto.trim().length > 0;

    if (!temResposta) {
      resposta.collapse();
      sinal.text = '';
      return;
    }

    if (indice === 0) {
      resposta.expand();
      sinal.text = '−';
    } else {
      resposta.collapse();
      sinal.text = '+';
    }

    gatilho.onClick(() => {
      // ⚠️ ler ANTES do forEachItem — ler depois faz o clique não abrir nunca
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

/* ── 2 · CARTÕES DA AGENDA ───────────────────────────────────────────────── */

/**
 * Cada cartão abre a página da SUA expedição.
 *
 * ⚠️ DUAS ARMADILHAS, as duas descobertas testando no ar:
 *
 * 1 · `$item('Container')` — seletor de TIPO — **não escopa no item**: devolve os
 *     elementos da PÁGINA INTEIRA. Prendendo o clique assim, cada item sobrescrevia o do
 *     anterior e os cinco cartões iam para o último processado. Era o "clico na Costa
 *     Doce e vai para o Macaé".
 *
 * 2 · Corrigi descobrindo os ids pelo tipo e prendendo com `$item('#id')` — que ESCOPA
 *     certo. Só que a descoberta trouxe 23 ids, incluindo `container2`, `text85`, `text86`
 *     e `text87`, que são do FAQ. Aí o clique de navegação foi parar na pergunta, e clicar
 *     no FAQ passou a sair da página.
 *
 * Conclusão: **lista fechada, sem descoberta.** Um id só, o do cartão. O clique num filho
 * sem handler próprio sobe para o container, então o cartão inteiro fica clicável — foto,
 * nome e as colunas de dados.
 */

// O container do item do repetidor da agenda. Se um dia mudar, o console lista os
// candidatos quando não encontra.
const CARTAO = '#container1';

function ligarCartoes() {
  let repetidores = [];
  try { repetidores = $w('Repeater'); } catch (e) { /* página sem repetidor */ }

  const idFaq = FAQ_AVULSO.repetidor.replace('#', '');
  let avisou = false;

  repetidores.forEach(function (rep) {
    // o do FAQ já tem dono: dois `onItemReady` no mesmo repetidor brigam
    if (rep.id === idFaq) return;

    rep.onItemReady(function ($item, dados) {
      if (!dados.titulo || !dados.uf) return;   // não é cartão de expedição

      let cartao = null;
      try { cartao = $item(CARTAO); } catch (e) { /* não existe */ }

      if (!cartao || typeof cartao.onClick !== 'function') {
        if (!avisou) {
          avisou = true;
          let candidatos = [];
          try { candidatos = $item('Container').map(function (c) { return c.id; }); } catch (e) { /* nada */ }
          console.warn('Agenda: não achei ' + CARTAO + '. Containers vistos: ' + candidatos.join(', ') +
            ' — escolha o do cartão e troque em CARTAO.');
        }
        return;
      }

      const chave = dados[CAMPO_DO_ENDERECO] || dados.titulo;
      // minúscula, hífen no lugar do espaço, e o acento SE MANTÉM
      const destino = PREFIXO + '/' + String(chave).toLowerCase().trim().replace(/\s+/g, '-');

      cartao.onClick(function () { wixLocation.to(destino); });

      if (!avisou) { avisou = true; console.log('Agenda: cartões de "' + rep.id + '" ligados via ' + CARTAO + '.'); }
    });
  });
}
