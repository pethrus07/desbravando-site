// ─────────────────────────────────────────────────────────────────────────────
// SEÇÃO DO INVESTIMENTO (Reserva) — Desbravando UTV
// Página da expedição (dinâmica). Cole no código DA PÁGINA.
//
// ⚠️ SE JÁ EXISTIR um `$w.onReady` nesta página (do expedicao.js, por exemplo):
//    NÃO cole o `$w.onReady` daqui. Cole só a função `montarReserva` e acrescente a
//    linha `montarReserva();` dentro do onReady que já está lá.
//
// ⚠️ NÃO conecte estes elementos pelo painel do CMS. Um mecanismo só — se metade viesse
//    da conexão e metade daqui, os dois brigariam pelo mesmo elemento.
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

$w.onReady(function () {
  montarReserva();
});

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
    // cima, e o Anton 56 fica só com o número — senão a tela lê "A PARTIR DE / A partir
    // de R$ 19.500", repetido.
    const valor = bruto.replace(/^a\s+partir\s+de\s+/i, '').trim();

    if (!valor) {
      // Sem preço, o bloco inteiro sai. Se a Seção do seu Editor não aceitar collapse
      // (acontece em versões antigas), embrulhe o conteúdo numa caixa e aponte `secao`
      // para a caixa.
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
    // Não existe um segundo preço neste produto. Melhor recolher do que deixar
    // "POR CASAL · A confirmar" no ar para sempre.
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
    const linhas = [
      [ids.sinal, 'Sinal', item.sinal],
      [ids.saldo, 'Saldo', item.saldo],
      [ids.cancelamento, 'Cancelamento', item.cancelamento],
      [ids.pagamento, 'Pagamento', item.formasPagamento],
    ];
    linhas.forEach(function (par) {
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
