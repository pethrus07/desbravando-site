// ─────────────────────────────────────────────────────────────────────────────
// DESBRAVANDO UTV — cole e pronto. Não precisa de ID nenhum.
//
// Funciona em QUALQUER página do site: Grupo Avulso, página da expedição, o que for.
// Cole no código DA PÁGINA e não mexa em mais nada.
//
// O que ele faz sozinho:
//
//   1. CARTÃO DA AGENDA → clica em qualquer lugar do cartão e abre a página daquela
//      expedição. Um link por item, correto — que é justamente o que a conexão do painel
//      NÃO faz: lá o link sai igual para os cinco.
//
//   2. SANFONA DO FAQ → uma resposta aberta por vez, sinal + / −, e pergunta sem resposta
//      não vira sanfona.
//
// Como ele acha as coisas sem ID: percorre os repetidores da página e olha os DADOS de
// cada item. Item com `titulo` e `uf` é expedição → vira cartão clicável. Item com
// `pergunta` é FAQ → vira sanfona. Os elementos de dentro são encontrados por TIPO
// (`$item('Text')`), não por nome.
//
// Se algo não funcionar, ele NÃO morre calado: abra a prévia e leia o console.
// ─────────────────────────────────────────────────────────────────────────────

import wixLocation from 'wix-location';

// prefixo da página dinâmica. Se você trocar o endereço dela no Editor, troque aqui.
const PREFIXO = '/expedicoes';

// ⚠️ Hoje o endereço da página dinâmica é montado a partir do campo `Título`, e a Wix
// MANTÉM O ACENTO: "Macaé" vira /expedicoes/macaé. Se um dia você trocar o campo de
// endereço para `Endereço da página (sem acento)`, mude aqui para 'slug'.
const CAMPO_DO_ENDERECO = 'titulo';

$w.onReady(function () {
  let repetidores = [];
  try { repetidores = $w('Repeater'); } catch (e) { /* página sem repetidor */ }

  if (!repetidores.length) {
    console.log('Desbravando: nenhum repetidor nesta página.');
    return;
  }

  console.log('Desbravando: ' + repetidores.length + ' repetidor(es) nesta página.');
  repetidores.forEach(function (rep) { ligar(rep); });
});

/** Olha o primeiro item e decide o que aquele repetidor é. */
function ligar(rep) {
  let jaDecidiu = false;

  rep.onItemReady(function ($item, dados, indice) {
    if (!jaDecidiu) {
      jaDecidiu = true;
      const tipo = dados.pergunta ? 'FAQ' : (dados.titulo && dados.uf) ? 'agenda' : 'não reconhecido';
      console.log('  · ' + rep.id + ' → ' + tipo +
        (tipo === 'não reconhecido' ? '  (campos: ' + Object.keys(dados).filter(function (k) { return k[0] !== '_'; }).join(', ') + ')' : ''));
    }

    if (dados.pergunta) sanfona(rep, $item, dados);
    else if (dados.titulo && dados.uf) cartao($item, dados);
  });
}

/* ── 1 · CARTÃO DA AGENDA ────────────────────────────────────────────────── */

function cartao($item, dados) {
  const chave = dados[CAMPO_DO_ENDERECO] || dados.titulo || '';
  if (!chave) return;

  // a Wix monta o endereço em minúscula, com hífen no lugar do espaço, e MANTÉM o acento
  const destino = PREFIXO + '/' + String(chave).toLowerCase().trim().replace(/\s+/g, '-');

  // o cartão inteiro clicável: caixas, textos e fotos. No celular isso é o que importa —
  // ninguém acerta só a palavra do título
  cadaElemento($item, ['Container', 'Box', 'Text', 'Image'], function (el) {
    if (typeof el.onClick !== 'function') return;
    el.onClick(function () { wixLocation.to(destino); });
    // deixa claro que é clicável
    try { el.style.cursor = 'pointer'; } catch (e) { /* nem todo elemento aceita */ }
  });
}

/* ── 2 · SANFONA DO FAQ ──────────────────────────────────────────────────── */

// guarda, por repetidor, quem já abriu — para abrir só a PRIMEIRA com resposta
const jaAbriu = {};

function sanfona(rep, $item, dados) {
  // texto rico vazio vem como "<p></p>" ou "&nbsp;", nunca como ""
  const resposta = limpo(dados.resposta);

  const textos = cadaElemento($item, ['Text'], null);

  // o SINAL é o texto que só tem + ou −
  const sinal = textos.find(function (t) {
    const v = String(t.text || '').trim();
    return v === '+' || v === '−' || v === '-';
  });

  // a RESPOSTA é o texto cujo conteúdo bate com o campo `resposta` do item
  const elResposta = resposta
    ? textos.find(function (t) { return limpo(t.text).slice(0, 30) === resposta.slice(0, 30); })
    : null;

  if (!elResposta) {
    // pergunta sem resposta não vira sanfona: sem sinal, sem clique
    if (sinal) sinal.text = '';
    return;
  }

  if (!jaAbriu[rep.id]) {
    jaAbriu[rep.id] = true;
    elResposta.expand();
    if (sinal) sinal.text = '−';
  } else {
    elResposta.collapse();
    if (sinal) sinal.text = '+';
  }

  cadaElemento($item, ['Container', 'Box', 'Text'], function (el) {
    if (el === elResposta || typeof el.onClick !== 'function') return;
    el.onClick(function () {
      // ⚠️ ler ANTES de fechar as outras: o laço abaixo fecha esta também, e aí
      // `collapsed` deixa de dizer o que o usuário queria. Ler depois faz o clique
      // nunca abrir — é o bug clássico deste padrão.
      const vaiAbrir = elResposta.collapsed;

      rep.forEachItem(function ($outro) {
        cadaElemento($outro, ['Text'], function (t) {
          const v = String(t.text || '').trim();
          if (v === '−') t.text = '+';
          else if (limpo(t.text).length > 30) t.collapse();
        });
      });

      if (vaiAbrir) {
        elResposta.expand();
        if (sinal) sinal.text = '−';
      }
    });
    try { el.style.cursor = 'pointer'; } catch (e) { /* ok */ }
  });
}

/* ── ferramentas ─────────────────────────────────────────────────────────── */

/** Junta os elementos do item por TIPO. Se `fn` vier, aplica; sempre devolve a lista. */
function cadaElemento($item, tipos, fn) {
  const todos = [];
  tipos.forEach(function (tipo) {
    let achados = [];
    try { achados = $item(tipo); } catch (e) { /* tipo não existe nesta página */ }
    (achados || []).forEach(function (el) { todos.push(el); });
  });
  if (fn) todos.forEach(fn);
  return todos;
}

/** Tira tags e espaço de texto rico. */
function limpo(v) {
  return String(v == null ? '' : v)
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();
}
