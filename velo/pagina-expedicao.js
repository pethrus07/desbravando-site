// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA DA EXPEDIÇÃO (dinâmica) — código completo da página
//
//   1. SEÇÃO DO INVESTIMENTO — funcionando, inalterada
//   2. SANFONAS DO FAQ — as duas listas
//
// ⚠️ Preencha os IDs em FAQ_LISTAS antes de esperar o FAQ funcionar. Enquanto estiverem
//    `null`, o código só imprime no console os repetidores que encontrou, para você saber
//    quais são — e não quebra nada.
// ─────────────────────────────────────────────────────────────────────────────

const IDS = {
  // ── par da ESQUERDA: é o que mostra o valor ──
  rotuloEsq: '#text137',   // hoje diz "POR PESSOA" → o código troca
  valorEsq: '#text139',    // hoje diz "A confirmar" → recebe o preço

  // ── par da DIREITA: recolhido, porque não existe segundo preço ──
  rotuloDir: '#text138',   // "POR CASAL"
  valorDir: '#text140',    // "A confirmar"

  fioVertical: null,       // não há fio vertical nesta montagem
  botao: '#button2',
  secao: '#section9',      // recolhe o bloco quando a expedição não tem valor

  // ── opcionais: preencha quando montar as linhas de condição ──
  condicoes: null,         // a caixa que envolve as quatro linhas
  sinal: null,
  saldo: null,
  cancelamento: null,
  pagamento: null,
};

/* ── As DUAS listas do FAQ ───────────────────────────────────────────────────
   Preencha com os IDs de dentro do item de cada repetidor, olhando no Modo Dev.
   É o mesmo formato que já funciona no Grupo Avulso. */
const FAQ_LISTAS = [
  {
    nome: 'sobre esta expedição',
    repetidor: null,      // ex.: '#repeater3'
    linha: null,          // a caixa que envolve pergunta, resposta e sinal — ex.: '#container4'
    resposta: null,       // ex.: '#text141'
    sinal: null,          // ex.: '#text142'
    abrirPrimeira: true,  // esta abre a primeira pergunta
  },
  {
    nome: 'dúvidas gerais',
    repetidor: null,      // ex.: '#repeater4'
    linha: null,
    resposta: null,
    sinal: null,
    abrirPrimeira: false, // esta começa toda fechada, senão a página abre com duas abertas
  },
];

$w.onReady(function () {
  montarReserva();
  FAQ_LISTAS.forEach(function (lista) { sanfona(lista); });
  conferirRepetidores();
});

/* ═══ 1 · SEÇÃO DO INVESTIMENTO — inalterada ══════════════════════════════ */

function montarReserva(ids = IDS) {
  const ds = $w('#dynamicDataset');
  if (!ds || typeof ds.onReady !== 'function') {
    console.warn('Reserva: não achei #dynamicDataset — confira o ID do dataset da página');
    return;
  }

  ds.onReady(function () {
    const item = ds.getCurrentItem() || {};

    // devolve null em vez de estourar quando o ID não existe na página
    const pegar = (id) => {
      if (!id) return null;
      try { return $w(id); } catch (e) { console.warn('Reserva: não achei ' + id); return null; }
    };
    // texto rico vem "<p></p>" quando vazio, nunca ""
    const limpo = (v) => String(v == null ? '' : v).replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
    const escrever = (id, texto) => { const el = pegar(id); if (el) el.text = texto; return el; };

    /* ── 1 · o valor ──────────────────────────────────────────────────────── */
    const bruto = limpo(item.valorExibido) || limpo(item.valorPorCasal);

    // O CMS guarda "A partir de R$ 19.500". O "a partir de" vai para o rótulo pequeno em
    // cima, e o Anton 56 fica só com o número — senão a tela lê a mesma coisa duas vezes.
    const valor = bruto.replace(/^a\s+partir\s+de\s+/i, '').trim();

    if (!valor) {
      const secao = pegar(ids.secao);
      if (secao && typeof secao.collapse === 'function') {
        secao.collapse();
        console.log('Reserva: "' + item.titulo + '" sem valor → seção recolhida');
        return;
      }
      escrever(ids.valorEsq, '—');
      console.warn('Reserva: "' + item.titulo + '" sem valor, e ' + ids.secao + ' não aceita recolher');
    } else {
      const secao = pegar(ids.secao);
      if (secao && typeof secao.expand === 'function') secao.expand();
      escrever(ids.valorEsq, valor);
    }

    // A venda é por ACOMODAÇÃO (2 a 4 pessoas), não por pessoa: "POR PESSOA" com preço de
    // acomodação erraria por uns R$ 10 mil.
    escrever(ids.rotuloEsq, /^a\s+partir\s+de/i.test(bruto)
      ? 'A PARTIR DE · POR ACOMODAÇÃO'
      : 'POR ACOMODAÇÃO');

    /* ── 2 · o par da direita sai ─────────────────────────────────────────── */
    [ids.rotuloDir, ids.valorDir, ids.fioVertical].forEach(function (id) {
      const el = pegar(id);
      if (el && typeof el.collapse === 'function') el.collapse();
    });

    /* ── 3 · o botão ──────────────────────────────────────────────────────── */
    const botao = pegar(ids.botao);
    if (botao) {
      const rotulo = limpo(item.rotuloBotao);
      if (rotulo) botao.label = rotulo;

      const link = limpo(item.linkCheckout);
      if (link) {
        botao.link = link;
        botao.target = '_blank';        // o checkout do Wix Events abre em aba nova
        if (typeof botao.enable === 'function') botao.enable();
      } else {
        // botão que não leva a nada é pior que botão apagado
        if (typeof botao.disable === 'function') botao.disable();
        console.log('Reserva: "' + item.titulo + '" sem Link do checkout → botão desabilitado');
      }
    }

    /* ── 4 · as condições, quando você montar as quatro linhas ────────────── */
    let visiveis = 0;
    [[ids.sinal, 'Sinal', item.sinal],
     [ids.saldo, 'Saldo', item.saldo],
     [ids.cancelamento, 'Cancelamento', item.cancelamento],
     [ids.pagamento, 'Pagamento', item.formasPagamento]
    ].forEach(function (par) {
      const el = pegar(par[0]);
      if (!el) return;
      const texto = limpo(par[2]);
      if (texto) {
        el.text = par[1] + ' · ' + texto;
        if (typeof el.expand === 'function') el.expand();
        visiveis++;
      } else if (typeof el.collapse === 'function') {
        el.collapse();
      }
    });

    const caixa = pegar(ids.condicoes);
    if (caixa) {
      if (visiveis && typeof caixa.expand === 'function') caixa.expand();
      else if (!visiveis && typeof caixa.collapse === 'function') caixa.collapse();
    }

    console.log('Reserva: "' + item.titulo + '" · ' + (valor || '(sem valor)') +
      ' · botão "' + (limpo(item.rotuloBotao) || '—') + '" · ' + visiveis + ' condições');
  });
}

/* ═══ 2 · SANFONAS DO FAQ ═════════════════════════════════════════════════ */

/**
 * Mesma função que já roda no Grupo Avulso, com IDs explícitos.
 *
 * ⚠️ NÃO usar `$item('Text')` aqui. Seletor de TIPO dentro de `$item` **não escopa no
 * item** — devolve os elementos da página inteira, e foi o que fez os cinco cartões da
 * agenda apontarem todos para o Macaé. Só `$item('#id')` escopa de verdade.
 */
function sanfona(cfg) {
  if (!cfg.repetidor) return;   // ainda não configurada

  let rep = null;
  try { rep = $w(cfg.repetidor); } catch (e) { /* não existe */ }

  if (!rep || typeof rep.onItemReady !== 'function') {
    console.warn('FAQ (' + cfg.nome + '): não achei ' + cfg.repetidor);
    return;
  }

  let jaAbriu = false;

  rep.onItemReady(function ($item, dados) {
    const resposta = $item(cfg.resposta);
    const sinal = $item(cfg.sinal);
    const gatilho = cfg.linha ? $item(cfg.linha) : resposta;

    // texto rico vazio vem como "<p></p>" ou "&nbsp;", nunca como ""
    const texto = String(dados.resposta == null ? '' : dados.resposta)
      .replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();

    if (!texto) {
      // pergunta sem resposta não vira sanfona: sem sinal, sem clique
      resposta.collapse();
      sinal.text = '';
      return;
    }

    // "a primeira" é a primeira COM resposta, não a de índice 0
    if (cfg.abrirPrimeira && !jaAbriu) {
      jaAbriu = true;
      resposta.expand();
      sinal.text = '−';
    } else {
      resposta.collapse();
      sinal.text = '+';
    }

    gatilho.onClick(function () {
      // ⚠️ ler ANTES do forEachItem — ler depois faz o clique não abrir nunca
      const vaiAbrir = resposta.collapsed;

      rep.forEachItem(function ($outro) {
        $outro(cfg.resposta).collapse();
        if ($outro(cfg.sinal).text !== '') $outro(cfg.sinal).text = '+';
      });

      if (vaiAbrir) {
        resposta.expand();
        sinal.text = '−';
      }
    });
  });

  console.log('FAQ (' + cfg.nome + '): sanfona ligada em ' + cfg.repetidor + '.');
}

/* ═══ 3 · DIAGNÓSTICO ═════════════════════════════════════════════════════ */

/**
 * Descobre QUAL repetidor é o FAQ e QUAIS são os IDs de dentro do item, e imprime tudo
 * pronto para colar em FAQ_LISTAS. Some sozinho quando as duas listas estiverem
 * configuradas.
 *
 * Como funciona, e por que dá para confiar apesar do seletor de tipo ser furado:
 *
 *   `$item('Text')` devolve os textos da PÁGINA INTEIRA — serve só para levantar a lista
 *   de ids candidatos. Aí cada id volta por `$item('#id')`, que ESCOPA no item de verdade,
 *   e eu comparo o conteúdo com os dados daquele item. O que bate está dentro; o que não
 *   bate é de fora. É a mesma diferença que fez os cartões da agenda apontarem todos para
 *   o Macaé — só que aqui ela vira o método.
 */
function conferirRepetidores() {
  if (FAQ_LISTAS.every(function (l) { return l.repetidor; })) return;

  let reps = [];
  try { reps = $w('Repeater'); } catch (e) { /* nenhum */ }

  if (!reps.length) { console.log('Diagnóstico: nenhum repetidor nesta página.'); return; }
  console.log('Diagnóstico: ' + reps.length + ' repetidores → ' +
    reps.map(function (r) { return r.id; }).join(', '));

  const jaConfigurados = FAQ_LISTAS.map(function (l) { return l.repetidor; }).filter(Boolean);

  reps.forEach(function (rep) {
    if (jaConfigurados.indexOf('#' + rep.id) !== -1) return;   // já tem dono

    // ⚠️ NÃO parar no primeiro item: só uma das perguntas tem resposta hoje, e se ela não
    // for a primeira, o id da resposta nunca aparece. Varre até completar os três.
    const achado = { pergunta: null, resposta: null, sinal: null };
    let anunciouTipo = false;
    let jaImprimiu = false;

    rep.onItemReady(function ($item, dados) {
      if (jaImprimiu) return;

      if (!dados.pergunta) {
        if (anunciouTipo) return;
        anunciouTipo = true;
        const campos = Object.keys(dados).filter(function (k) { return k[0] !== '_'; });
        console.log('  · #' + rep.id + ' → não é FAQ  (campos: ' + campos.slice(0, 6).join(', ') + ')');
        return;
      }

      // levanta os ids candidatos e testa cada um ESCOPADO no item
      let candidatos = [];
      try { candidatos = $item('Text').map(function (t) { return t.id; }); } catch (e) { /* nada */ }

      const resposta = String(dados.resposta == null ? '' : dados.resposta)
        .replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();

      candidatos.forEach(function (id) {
        let el = null;
        try { el = $item('#' + id); } catch (e) { return; }
        if (!el || typeof el.text !== 'string') return;
        const t = el.text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();

        if (!achado.pergunta && t === String(dados.pergunta).trim()) achado.pergunta = id;
        else if (!achado.sinal && (t === '+' || t === '−' || t === '-')) achado.sinal = id;
        else if (!achado.resposta && resposta && t.slice(0, 30) === resposta.slice(0, 30)) achado.resposta = id;
      });

      // só imprime quando tiver o essencial, ou no último item do repetidor
      const completo = achado.pergunta && achado.resposta && achado.sinal;
      const ultimo = rep.data && rep.data.length
        && dados._id === rep.data[rep.data.length - 1]._id;
      if (!completo && !ultimo) return;

      jaImprimiu = true;
      console.log('  ✓ #' + rep.id + ' É FAQ — cole isto em FAQ_LISTAS:');
      console.log("      repetidor: '#" + rep.id + "',");
      // o gatilho do clique: a caixa da linha é melhor, mas a pergunta serve e é confiável
      console.log("      linha:     " + (achado.pergunta ? "'#" + achado.pergunta + "',  // a pergunta; troque pela caixa da linha se quiser a linha toda clicável" : 'null,'));
      console.log("      resposta:  " + (achado.resposta ? "'#" + achado.resposta + "'," : 'null,  // NENHUMA pergunta desta lista tem resposta preenchida'));
      console.log("      sinal:     " + (achado.sinal ? "'#" + achado.sinal + "'," : 'null,'));
    });
  });

  console.log('→ se um repetidor do FAQ mostrar SEMPRE a mesma pergunta, ele não está ligado ao ' +
    'dataset: clique NO REPETIDOR (não no texto) e conecte.');
}
