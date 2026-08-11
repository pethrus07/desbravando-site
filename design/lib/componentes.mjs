// Componentes da direção V3 · ÍNDICE TIPOGRÁFICO.
// Vocabulário: fio, número, lista, dado tabulado, foto pequena e contida.
// O preto é pontuação (nav, faixa de pausa, botão), não fundo.
import { frame, col, row, texto, ret, vao, mola, imagem, gradiente, contorno, sombra } from './pen.mjs';
import { icone } from './icones.mjs';
import { COR, T, TM, LARGURA, MARGEM, RAIO, TRACO, LOGO_URL, LOGO_MONTANHA, LOGO_MONTANHA_PROPORCAO } from './tokens.mjs';

/* ─────────────────────────── fios e recuo ─────────────────────────── */

/** Fio leve, entre itens de uma lista. */
export const fio = (props = {}) => ret({ width: 'fill_container', height: TRACO.leve, fill: COR.linha, ...props });
/** Fio forte, abre e fecha uma lista. */
export const fioForte = (props = {}) => ret({ width: 'fill_container', height: TRACO.forte, fill: COR.fio, ...props });
export const divisor = fio;

/** Recuo só nas laterais — o `padding` do .pen é um número igual nos 4 lados. */
export function recuoH(padX, props = {}, filhos = []) {
  const { gap, justifyContent, alignItems = 'center', ...resto } = props;
  return row({ width: 'fill_container', alignItems: 'center', ...resto }, [
    frame({ width: padX, height: 1 }),
    row({ width: 'fill_container', gap, justifyContent, alignItems }, filhos),
    frame({ width: padX, height: 1 }),
  ]);
}

/** Faixa de seção com o conteúdo recuado em 120. */
export function secao({ fundo = COR.papel, padY = 88, padX = MARGEM.desktop, nome = 'seção', gap = 36, alignItems = 'start' }, filhos) {
  return col({ name: nome, width: 'fill_container', fill: fundo, alignItems: 'center' }, [
    vao(padY),
    row({ width: 'fill_container' }, [
      frame({ width: padX, height: 1 }),
      col({ width: 'fill_container', gap, alignItems }, filhos),
      frame({ width: padX, height: 1 }),
    ]),
    vao(padY),
  ]);
}

export function secaoMobile({ fundo = COR.papel, padY = 44, nome = 'seção', gap = 20, alignItems = 'start' }, filhos) {
  return col({ name: nome, width: 'fill_container', fill: fundo, alignItems: 'center' }, [
    vao(padY),
    row({ width: 'fill_container' }, [
      frame({ width: MARGEM.mobile, height: 1 }),
      col({ width: 'fill_container', gap, alignItems }, filhos),
      frame({ width: MARGEM.mobile, height: 1 }),
    ]),
    vao(padY),
  ]);
}

/* ─────────────────────────── texto ─────────────────────────── */

export const overline = (t, esc = T, cor = COR.cinza) =>
  texto(t.toUpperCase(), { ...esc.eti, fill: cor, name: 'sobrelinha' });

/**
 * Abertura tipográfica: é a marca registrada da V3. Sobrelinha pequena, título
 * grande, texto de apoio à esquerda e as ações à direita — sem foto por baixo.
 */
export function abertura({ over, titulo, texto: corpo, acoes, larguraTexto = 620, esc = T }) {
  return col({ name: 'abertura', width: 'fill_container', gap: 26 }, [
    over && overline(over, esc),
    texto1(titulo, esc),
    (corpo || acoes) &&
      row({ width: 'fill_container', gap: 60, alignItems: 'start' }, [
        corpo && texto(corpo, { ...esc.corpoG, fill: COR.cinza, width: larguraTexto }),
        mola(),
        acoes && col({ gap: 12, alignItems: 'end' }, acoes),
      ]),
  ]);
}
const texto1 = (t, esc) => texto(t, { ...esc.display, fill: COR.tinta, width: 'fill_container' });

/** Cabeçalho menor, para seções internas. */
export function cabecalho(over, titulo, sub, { esc = T, largura = 780 } = {}) {
  return col({ width: largura, gap: 14, name: 'cabeçalho' }, [
    over && overline(over, esc),
    texto(titulo, { ...esc.h1, fill: COR.tinta, width: 'fill_container' }),
    sub && texto(sub, { ...esc.corpo, fill: COR.cinza, width: 'fill_container' }),
  ]);
}

/* ─────────────────────────── ações ─────────────────────────── */

/** variante: 'solido' (preto) · 'contorno' · 'texto' · 'claro' (sobre preto) */
export function botao(rotulo, { variante = 'solido', seta = false, largura, alt = 48, esc = T } = {}) {
  const e = {
    solido: { fill: COR.preto, cor: COR.branco },
    contorno: { fill: undefined, cor: COR.tinta, stroke: contorno(COR.tinta, TRACO.leve) },
    texto: { fill: undefined, cor: COR.tinta },
    claro: { fill: COR.branco, cor: COR.preto },
    'contorno-claro': { fill: undefined, cor: COR.branco, stroke: contorno(COR.s38, TRACO.leve) },
  }[variante];
  return row(
    {
      name: `botão/${variante}`,
      fill: e.fill, stroke: e.stroke, cornerRadius: RAIO.nenhum,
      height: alt, width: largura,
      padding: variante === 'texto' ? 0 : Math.min(24, Math.floor((alt - 4) / 2)),
      gap: 9, alignItems: 'center', justifyContent: 'center',
    },
    [
      texto(rotulo.toUpperCase(), { ...esc.botao, fill: e.cor }),
      seta && icone('arrow-right', { width: 13, height: 13, fill: e.cor }),
    ],
  );
}

/** Status como etiqueta de texto, não como pílula colorida. */
export function status(rotulo, tipo = 'padrao', esc = T) {
  const forte = tipo === 'ultimas';
  return row({ name: `status/${tipo}`, gap: 7, alignItems: 'center' }, [
    ret({ width: 5, height: 5, fill: forte ? COR.tinta : COR.cinzaFraco }),
    texto(rotulo, { ...esc.corpoP, fontWeight: forte ? '700' : '400', fill: forte ? COR.tinta : COR.cinza }),
  ]);
}

/** Pílula de filtro / âncora. */
export const pilula = (rotulo, ativa = false, esc = T) =>
  row(
    {
      height: esc === TM ? 32 : 38, padding: 14, gap: 8, alignItems: 'center',
      cornerRadius: RAIO.pill,
      fill: ativa ? COR.tinta : undefined,
      stroke: ativa ? undefined : contorno(COR.linha, TRACO.leve),
    },
    [texto(rotulo, { ...esc.corpoP, fontWeight: '600', fill: ativa ? COR.branco : COR.cinza })],
  );

/* ─────────────────────────── listas e tabelas ─────────────────────────── */

/**
 * A linha do índice — o componente central da V3.
 * As colunas de largura fixa precisam caber em 1200 − 52 de padding; nenhuma encolhe.
 */
export function linhaIndice({ n, titulo, colunas = [], foto, fotoW = 92, fotoH = 62, esc = T }) {
  // orçamento de largura: 1200 − 52 de padding = 1148, e nada aqui encolhe.
  // o título cede espaço quando há mais colunas ou foto grande.
  const reservado = 40 + fotoW + 20 + colunas.length * 130 + (colunas.length + 3) * 24;
  const larguraTitulo = Math.max(240, Math.min(430, 1148 - reservado));
  return row(
    { name: `índice/${titulo}`, width: 'fill_container', padding: 26, gap: 24, alignItems: 'center', stroke: contorno(COR.linha, { bottom: 1 }) },
    [
      texto(String(n).padStart(2, '0'), { ...esc.mono, fill: COR.cinzaFraco, width: 40 }),
      foto && frame({ width: fotoW, height: fotoH, fill: imagem(foto) }),
      texto(titulo.toUpperCase(), { ...esc.indice, fill: COR.tinta, width: larguraTitulo }),
      ...colunas.map(([a, b], i) =>
        col({ width: i === colunas.length - 1 ? 190 : 130, gap: 3 }, [
          texto(a, { ...esc.corpo, fontSize: 15, fill: COR.tinta }),
          b && texto(b, { ...esc.corpoP, fill: COR.cinza }),
        ]),
      ),
      mola(),
      icone('arrow-right', { width: 20, height: 20, fill: COR.tinta }),
    ],
  );
}

/** Cabeçalho de uma lista: sobrelinha à esquerda, nota à direita, fio forte embaixo. */
export const tituloLista = (esq, dir, esc = T) =>
  col({ width: 'fill_container', gap: 14 }, [
    row({ width: 'fill_container', alignItems: 'end' }, [overline(esq, esc), mola(), dir && overline(dir, esc)]),
    fioForte(),
  ]);

/** Linha de tabela genérica: [[texto, largura, forte?], …] */
export function linhaTabela(celulas, { esc = T, cabecalho = false, fim } = {}) {
  return row(
    { width: 'fill_container', padding: cabecalho ? 12 : 18, gap: 20, alignItems: 'center', stroke: fim ? undefined : contorno(COR.linha, { bottom: 1 }) },
    celulas.map(([t, largura, forte]) =>
      texto(String(t), {
        ...(cabecalho ? { ...esc.mono, fontSize: 10 } : forte ? esc.h4 : { ...esc.corpo, fontSize: 15 }),
        fill: cabecalho ? COR.cinza : forte ? COR.tinta : COR.cinza,
        width: largura || 'fill_container',
      }),
    ),
  );
}

/** Item numerado (passos, roteiro). */
export function itemNumerado(n, titulo, corpo, { esc = T, fim = false } = {}) {
  return row({ width: 'fill_container', padding: 24, gap: 28, alignItems: 'start', stroke: fim ? undefined : contorno(COR.linha, { bottom: 1 }) }, [
    texto(n, { ...esc.mono, fill: COR.cinzaFraco, width: 46 }),
    texto(titulo, { ...esc.h3, fill: COR.tinta, width: 300 }),
    texto(corpo, { ...esc.corpo, fill: COR.cinza, width: 'fill_container' }),
  ]);
}

/** Item de lista do núcleo: marcador ↗, como manda o guia. */
export function itemLista(t, tipo = 'dentro', esc = T) {
  const fora = tipo === 'fora';
  return row({ gap: 12, alignItems: 'start', width: 'fill_container' }, [
    texto(fora ? '—' : '↗', { ...esc.corpo, fontWeight: '700', fill: fora ? COR.cinzaFraco : COR.tinta, width: 16 }),
    texto(t, { ...esc.corpo, fill: fora ? COR.cinza : COR.tinta, width: 'fill_container' }),
  ]);
}

/** Par rótulo/valor com fio embaixo — a unidade de dado da V3. */
export const dado = (rotulo, valor, { esc = T, largura = 'fill_container' } = {}) =>
  col({ width: largura, gap: 6 }, [
    texto(rotulo.toUpperCase(), { ...esc.mono, fontSize: 10, fill: COR.cinza }),
    texto(valor, { ...esc.h4, fill: COR.tinta }),
  ]);

/** Faixa de dados separada por fios. */
export const faixaDados = (pares, esc = T) =>
  col({ width: 'fill_container', gap: 0 }, [
    fioForte(),
    row({ width: 'fill_container', padding: 20, gap: 0 }, pares.map(([r, v]) => dado(r, v, { esc }))),
    fioForte(),
  ]);

/** Pergunta do FAQ como linha de lista. */
export const faq = (pergunta, aberta = false, resposta = '', esc = T) =>
  col({ width: 'fill_container', gap: 14, padding: 22, stroke: contorno(COR.linha, { bottom: 1 }) }, [
    row({ width: 'fill_container', alignItems: 'center', gap: 20 }, [
      texto(pergunta, { ...esc.h4, fill: COR.tinta, width: 'fill_container' }),
      icone(aberta ? 'minus' : 'plus', { width: 18, height: 18, fill: COR.cinza }),
    ]),
    aberta && resposta && texto(resposta, { ...esc.corpo, fill: COR.cinza, width: 860 }),
  ]);

/* ─────────────────────────── marca e navegação ─────────────────────────── */

/** Logo completo (montanha + letreiro). Usado só onde a marca precisa se apresentar. */
export const logo = (altura = 28) =>
  frame({ name: 'logo Desbravando', width: Math.round(altura * 2.83), height: altura, fill: imagem(LOGO_URL, 'fit') });

/** Só a montanha — o que o cliente pediu para o cabeçalho de todo o site. */
export const marca = (altura = 26) =>
  frame({ name: 'marca/montanha', width: Math.round(altura * LOGO_MONTANHA_PROPORCAO), height: altura, fill: imagem(LOGO_MONTANHA, 'fit') });

export const MENU = ['Expedições', 'Estoque Off-Road', 'Produtos', 'O Desbravando'];

/**
 * Cabeçalho v2. Mudanças pedidas: só a montanha no logo, nova ordem do menu, e fora o
 * botão de WhatsApp e o carrinho. No lugar deles, a assinatura institucional —
 * que fica SEMPRE em inglês, mesmo com o site em português.
 */
/*
 * ⚠️ O SELETOR PT | EN SAIU (08/08). Não é esquecimento: a forma de fazer a tradução vai
 * mudar, e enquanto o mecanismo não estiver decidido não faz sentido desenhar o controle.
 * Quando decidir, ele volta aqui — à direita, alinhado embaixo da assinatura.
 * A assinatura institucional em inglês FICA: é conteúdo aprovado pelo cliente, não
 * mecanismo de tradução, e ela é sempre em inglês mesmo com o site em português.
 */
export function nav({ ativo = '' } = {}) {
  const item = (t) =>
    texto(t, { ...T.corpo, fontSize: 15, fontWeight: t === ativo ? '700' : '400', fill: t === ativo ? COR.branco : COR.s82 });
  return recuoH(MARGEM.desktop, { name: 'nav', height: 78, fill: COR.preto, gap: 40 }, [
    marca(26),
    row({ gap: 30, alignItems: 'center' }, MENU.map(item)),
    mola(),
    row({ gap: 7, alignItems: 'center' }, [
      icone('globe', { width: 13, height: 13, fill: COR.s55 }),
      texto('Ready to welcome riders from around the world.', { ...T.corpoP, fontSize: 12, fill: COR.s55 }),
    ]),
  ]);
}

export const navMobile = () =>
  recuoH(MARGEM.mobile, { name: 'nav/mobile', height: 58, fill: COR.preto }, [
    icone('menu', { width: 22, height: 22, fill: COR.branco }),
    mola(),
    marca(22),
    mola(),
    // o espaço do PT | EN fica reservado até o mecanismo de tradução ser decidido
    frame({ width: 22, height: 1 }),
  ]);

/* ─────────────────────────── faixas pretas (pausa) ─────────────────────────── */

/** Bloco preto usado como pausa e chamada. Aparece pouco, de propósito. */
export function faixaPreta({ nome = 'faixa preta', blocos, acao, altura = 240, esc = T }) {
  return row({ name: nome, width: 'fill_container', height: altura, fill: COR.preto, alignItems: 'center' }, [
    frame({ width: MARGEM.desktop, height: 1 }),
    row({ width: 'fill_container', gap: 40, alignItems: 'center' }, [
      ...blocos.flatMap((b, i) => [
        i > 0 && ret({ width: 1, height: 110, fill: COR.sLinha }),
        col({ width: 'fill_container', gap: 12 }, [
          texto(b[0], { ...esc.h3, fill: COR.branco }),
          texto(b[1], { ...esc.corpoP, fill: COR.s55, width: 'fill_container' }),
        ]),
      ]),
      acao && botao(acao, { variante: 'claro', seta: true, esc }),
    ]),
    frame({ width: MARGEM.desktop, height: 1 }),
  ]);
}

/* ─────────────────────── blocos da v3 ─────────────────────── */
/*
 * Crítica que originou esta rodada (06/08): os blocos que entraram na v2 "perderam a
 * sofisticação e o minimalismo do PDF aprovado" e ficaram parecidos entre si — todos
 * foto-em-cima-texto-embaixo. O cliente apontou os módulos que ESTÃO certos como
 * referência: a abertura da Home, os depoimentos, a abertura da página da expedição e
 * a faixa de dados. Vocabulário deles: sobrelinha pequena · tipo grande · fio · dado
 * tabulado · muito branco.
 *
 * A regra desta versão: cada módulo tem uma GEOMETRIA própria.
 *   abertura      → empilhado à esquerda
 *   expedições    → apresentação + duas colunas divididas por fio vertical
 *   galeria       → faixa de imagem, uma por vez
 *   parceiros     → uma linha só: texto · fio · logo
 *   depoimentos   → linhas de lista
 *   comunidade    → centrado (não se repete em lugar nenhum)
 *   pilares       → três colunas, foto só como selo
 *   reserva       → painel de números
 */

/** Vídeo em tela cheia — o primeiro elemento visual da página. */
export const videoCheio = (poster, { altura = 560, rotulo = 'vídeo em tela cheia', esc = T } = {}) =>
  col({ name: `vídeo/${rotulo}`, width: 'fill_container', height: altura, fill: poster ? imagem(poster) : COR.preto }, [
    col({ width: 'fill_container', height: 'fill_container', fill: gradiente(180, [['#00000047', 0], ['#0000007A', 1]]), alignItems: 'center', justifyContent: 'center', gap: 14 }, [
      frame({ width: 62, height: 62, cornerRadius: 999, stroke: contorno('#FFFFFFB3', 1.5), layout: 'horizontal', alignItems: 'center', justifyContent: 'center' }, [
        icone('play', { width: 20, height: 20, fill: COR.branco }),
      ]),
      texto(rotulo.toUpperCase(), { ...esc.eti, fill: '#FFFFFFA6' }),
    ]),
  ]);

/** Área de Destaques — um banner por vez. Na Wix é Pro Gallery ligada a uma coleção. */
export function carrosselDestaques({ destaques, atual = 0, altura = 440, esc = T }) {
  const d = destaques[atual];
  return col({ name: 'destaques (carrossel automático)', width: 'fill_container', height: altura, fill: imagem(d.foto) }, [
    col({ width: 'fill_container', height: 'fill_container', fill: gradiente(100, [['#000000D9', 0], ['#00000026', 0.7]]) }, [
      row({ width: 'fill_container', height: 'fill_container', alignItems: 'center' }, [
        frame({ width: MARGEM.desktop, height: 1 }),
        col({ width: 620, gap: 18 }, [
          texto(d.etiqueta.toUpperCase(), { ...esc.eti, fill: '#FFFFFFA6' }),
          texto(d.titulo, { ...esc.h1, fill: COR.branco, width: 'fill_container' }),
          texto(d.texto, { ...esc.corpo, fill: '#FFFFFFD1', width: 'fill_container' }),
          vao(4),
          botao(d.cta, { variante: 'claro', seta: true, esc }),
        ]),
        mola(),
        frame({ width: MARGEM.desktop, height: 1 }),
      ]),
      row({ width: 'fill_container', height: 38, gap: 8, alignItems: 'center', justifyContent: 'center' },
        destaques.map((_, i) => ret({ width: i === atual ? 26 : 8, height: 3, fill: i === atual ? COR.branco : '#FFFFFF59' }))),
      vao(16),
    ]),
  ]);
}

/**
 * Card de formato — SEM imagem nenhuma, por pedido literal dele. A percepção de
 * qualidade tem de vir só de tipo, fio e ar: índice em mono, nome em Anton grande,
 * uma frase, e o dado tabulado — a mesma gramática do "resumo inicial da expedição",
 * que ele citou como referência do que está certo. Sem caixa e sem sombra: os dois
 * cards só se separam por um fio vertical.
 */
export const cardFormato = ({ n, titulo, texto: corpo, linhas = [], cta, primeiro = false, esc = T, pad = 48 }) =>
  col(
    { name: `formato/${titulo}`, width: 'fill_container', padding: pad, gap: 0, stroke: primeiro ? undefined : contorno(COR.linha, { left: 1 }) },
    [
      texto(n, { ...esc.mono, fill: COR.cinzaFraco, letterSpacing: 2 }),
      vao(esc === TM ? 22 : 34),
      texto(titulo, { ...esc.h1, fill: COR.tinta, width: 'fill_container' }),
      vao(16),
      texto(corpo, { ...esc.corpo, fill: COR.cinza, width: 'fill_container' }),
      vao(esc === TM ? 24 : 36),
      linhas.length
        ? col({ width: 'fill_container', gap: 0 }, [
            fio(),
            ...linhas.map(([r, v]) =>
              row({ width: 'fill_container', padding: 13, gap: 20, alignItems: 'start' }, [
                texto(r.toUpperCase(), { ...esc.eti, fontSize: esc === TM ? 9 : 10, fill: COR.cinzaFraco, width: esc === TM ? 92 : 128 }),
                texto(v, { ...esc.corpoP, fill: COR.tinta, width: 'fill_container' }),
              ]),
            ),
            fio(),
          ])
        : null,
      vao(esc === TM ? 22 : 32),
      botao(cta, { variante: 'texto', seta: true, esc }),
    ],
  );

/**
 * Parceiros Oficiais — CENTRADO, com a logomarca em cima e a frase de apoio embaixo.
 * A v3 tinha virado uma linha só (frase · fio · logo); ele pediu de volta o arranjo
 * aprovado antes: "retornar ao layout original, onde a frase de apoio fica posicionada
 * abaixo da logomarca do parceiro; centralizar todos os elementos do módulo".
 * Três elementos e nada mais — a marca parceira aparece sem virar publicidade.
 */
export const blocoParceiros = ({ logos = ['Can-Am'], esc = T } = {}) =>
  col({ name: 'parceiros oficiais', width: 'fill_container', fill: COR.papel, alignItems: 'center' }, [
    vao(88),
    row({ gap: 34, alignItems: 'center', justifyContent: 'center' },
      logos.map((l) =>
        frame({ name: `logo/${l}`, width: 180, height: 54, layout: 'horizontal', alignItems: 'center', justifyContent: 'center' }, [
          texto(l, { ...esc.h2, fill: COR.cinzaFraco }),
        ]),
      )),
    vao(24),
    overline(logos.length > 1 ? 'Parceiros oficiais das Expedições' : 'Parceira oficial das Expedições', esc),
    vao(12),
    // 820 para a frase caber numa linha só — em 620 ela quebra e sobra "paixão." sozinho
    texto('Ao lado de quem compartilha a mesma paixão.', {
      ...esc.h2, fill: COR.tinta, textAlign: 'center', width: 820,
    }),
    vao(88),
  ]);

/**
 * Comunidade — o único módulo CENTRADO do site. É o que garante identidade própria
 * sem inventar ornamento. Textos exatamente como aprovados.
 */
export const blocoComunidade = ({ esc = T } = {}) =>
  col({ name: 'comunidade', width: 'fill_container', fill: COR.preto, alignItems: 'center' }, [
    vao(104),
    marca(34),
    vao(26),
    overline('Comunidade Desbravando', esc, COR.s55),
    vao(20),
    texto('Faça parte da\nComunidade Desbravando', { ...esc.display, fontSize: 62, fill: COR.branco, textAlign: 'center', width: 900 }),
    vao(20),
    texto('Cada nova experiência e cada nova conquista fortalecem sua trajetória e desbloqueiam benefícios exclusivos.', {
      ...esc.corpoG, fill: COR.s82, textAlign: 'center', width: 640,
    }),
    vao(32),
    botao('Conheça sua jornada', { variante: 'claro', seta: true, esc }),
    vao(104),
  ]);

/**
 * Pilar — três colunas divididas por fio, SEM FOTO.
 *
 * Histórico: na v2 a foto era grande e competia com a mensagem; na v3 virou selo de
 * 56×56. Em 08/08 o Pedro tirou o selo também — e está certo. Numa seção cujo objetivo
 * é apresentar três frentes em três palavras, qualquer imagem rouba a leitura. O peso
 * agora vem do número, do nome em Anton e do fio que separa as colunas.
 */
export const cardPilar = ({ n, titulo, mantra, cta, primeiro = false, esc = T }) =>
  col(
    { name: `pilar/${titulo}`, width: 'fill_container', padding: 32, gap: 18, stroke: primeiro ? undefined : contorno(COR.linha, { left: 1 }) },
    [
      texto(n, { ...esc.mono, fill: COR.cinzaFraco, letterSpacing: 2 }),
      vao(esc === TM ? 6 : 14),
      col({ width: 'fill_container', gap: 12 }, [
        texto(titulo, { ...esc.h2, fill: COR.tinta }),
        texto(mantra, { ...esc.corpoG, fill: COR.cinza, width: 'fill_container' }),
      ]),
      vao(2),
      cta && botao(cta, { variante: 'texto', seta: true, esc }),
    ],
  );

/**
 * Galeria: UMA foto por vez, navegação lateral — no lugar das quatro fotos lado a lado
 * da v2. "O objetivo é valorizar melhor cada fotografia."
 * `margem` = 0 quando o carrossel já está dentro de uma seção recuada.
 */
export const carrosselFotos = ({ fotos, atual = 0, altura = 500, legenda, margem = MARGEM.desktop, esc = T }) =>
  col({ name: 'galeria (carrossel · 1 foto por vez)', width: 'fill_container', gap: 14 }, [
    col({ width: 'fill_container', height: altura, fill: imagem(fotos[atual]) }, [
      row({ width: 'fill_container', height: 'fill_container', padding: 22, alignItems: 'center' }, [
        seta('chevron-left'), mola(), seta('chevron-right'),
      ]),
    ]),
    row({ width: 'fill_container', alignItems: 'center', gap: 14 }, [
      margem ? frame({ width: margem, height: 1 }) : null,
      legenda && texto(legenda, { ...esc.corpoP, fill: COR.cinza }),
      mola(),
      texto(`${atual + 1} / ${fotos.length}`, { ...esc.mono, fill: COR.cinza }),
      row({ gap: 6, alignItems: 'center' }, fotos.map((_, i) => ret({ width: i === atual ? 22 : 8, height: 3, fill: i === atual ? COR.tinta : COR.linha }))),
      margem ? frame({ width: margem, height: 1 }) : null,
    ]),
  ]);

/** No celular a próxima foto fica espiando na borda, convidando a arrastar. */
export const carrosselPeek = ({ fotos, altura = 220, esc = TM }) =>
  col({ name: 'galeria (carrossel · espia a próxima)', width: 'fill_container', gap: 10 }, [
    row({ width: 'fill_container', gap: 8 }, [
      frame({ width: MARGEM.mobile, height: 1 }),
      frame({ width: 300, height: altura, fill: imagem(fotos[0]) }),
      frame({ width: 'fill_container', height: altura, fill: imagem(fotos[1]) }),
    ]),
    row({ width: 'fill_container', padding: MARGEM.mobile, gap: 8, alignItems: 'center' }, [
      texto(`1 / ${fotos.length}`, { ...esc.mono, fill: COR.cinza }),
      mola(),
      row({ gap: 5 }, fotos.map((_, i) => ret({ width: i === 0 ? 18 : 6, height: 3, fill: i === 0 ? COR.tinta : COR.linha }))),
    ]),
  ]);

const seta = (qual) =>
  frame({ width: 44, height: 44, cornerRadius: 999, fill: '#FFFFFFE6', layout: 'horizontal', alignItems: 'center', justifyContent: 'center' }, [
    icone(qual, { width: 19, height: 19, fill: COR.tinta }),
  ]);

/**
 * Guia da Expedição — busca + índice numerado por categoria.
 * ATENÇÃO: a busca por termo livre precisa de código (Velo) na Wix; o índice com
 * âncora é nativo. Ver o documento de implementação.
 */
export const guiaExpedicao = ({ categorias, esc = T }) =>
  col({ width: 'fill_container', gap: 28 }, [
    col({ width: 'fill_container', gap: 12 }, [
      overline('Guia da expedição', esc),
      texto('ENCONTRE QUALQUER INFORMAÇÃO\nDA SUA EXPEDIÇÃO', { ...esc.h1, fill: COR.tinta, width: 'fill_container' }),
      texto('Pesquise um termo ou navegue pelos tópicos. É a mesma base que o atendimento e o agente no WhatsApp consultam.', {
        ...esc.corpo, fill: COR.cinza, width: 720,
      }),
    ]),
    row({ width: 'fill_container', height: 56, gap: 14, alignItems: 'center', stroke: contorno(COR.fio, { bottom: 1.5 }) }, [
      icone('search', { width: 18, height: 18, fill: COR.cinza }),
      texto('hotel · transfer · check-in · cardápio · clima · combustível · aeroporto', { ...esc.corpo, fill: COR.cinzaFraco, width: 'fill_container' }),
    ]),
    col({ width: 'fill_container', gap: 0 },
      categorias.map(([nome, qtd], i) =>
        row({ width: 'fill_container', padding: 16, gap: 14, alignItems: 'center', stroke: i === categorias.length - 1 ? undefined : contorno(COR.linha, { bottom: 1 }) }, [
          texto(String(i + 1).padStart(2, '0'), { ...esc.mono, fill: COR.cinzaFraco, width: 34 }),
          texto(nome, { ...esc.h4, fill: COR.tinta, width: 300 }),
          texto(qtd, { ...esc.corpoP, fill: COR.cinzaFraco, width: 'fill_container' }),
          icone('arrow-right', { width: 16, height: 16, fill: COR.tinta }),
        ]),
      )),
  ]);

/**
 * Roteiro — SEM nenhuma foto, por pedido literal. A leitura cronológica se sustenta
 * numa régua tipográfica: dia grande à esquerda, fio vertical, e o conteúdo do dia
 * indentado. Nada aqui se parece com a linha do índice do Grupo Avulso (que tem foto
 * e seta) nem com o card de formato — que era exatamente a queixa dele.
 */
export const linhaRoteiro = ({ dia, data, local, titulo, texto: corpo, km, primeira = false, esc = T }) =>
  row(
    {
      name: `roteiro/dia ${dia}`, width: 'fill_container', gap: esc === TM ? 18 : 40,
      padding: esc === TM ? 20 : 30, alignItems: 'start',
      stroke: primeira ? undefined : contorno(COR.linha, { top: 1 }),
    },
    [
      col({ width: esc === TM ? 52 : 108, gap: 6 }, [
        texto('DIA', { ...esc.eti, fontSize: esc === TM ? 9 : 10, fill: COR.cinzaFraco }),
        texto(dia, { ...esc.indice, fill: COR.tinta }),
      ]),
      // o fio vertical vem do stroke esquerdo do conteúdo — é o que dá a régua
      col({ width: 'fill_container', gap: 10, padding: 0, stroke: contorno(COR.linha, { left: 1 }) }, [
        row({ width: 'fill_container' }, [
          frame({ width: esc === TM ? 16 : 32, height: 1 }),
          col({ width: 'fill_container', gap: 10 }, [
            // no celular a meta-linha quebra em vez de disputar espaço com a km
            esc === TM
              ? texto(`${data} · ${local}${km ? ` · ${km}` : ''}`, { ...esc.mono, fill: COR.cinzaFraco, width: 'fill_container' })
              : row({ width: 'fill_container', gap: 12, alignItems: 'center' }, [
                  texto(`${data} · ${local}`, { ...esc.mono, fill: COR.cinzaFraco }),
                  mola(),
                  km ? texto(km, { ...esc.mono, fill: COR.tinta }) : null,
                ]),
            texto(titulo.toUpperCase(), { ...esc.h3, fill: COR.tinta, width: 'fill_container' }),
            texto(corpo, { ...esc.corpo, fill: COR.cinza, width: 'fill_container' }),
          ]),
        ]),
      ]),
    ],
  );

/**
 * "O que está incluso" — era uma lista de marcadores e ele achou "excessivamente
 * simples". Virou um inventário numerado em duas colunas, com contagem no topo:
 * a mesma gramática de dado tabulado dos módulos que ele aprovou, e é a contagem
 * ("11 itens") que faz o valor aparecer antes mesmo da leitura.
 */
export function blocoIncluso({ itens, esc = T, colunas = 2 }) {
  const porColuna = Math.ceil(itens.length / colunas);
  const fatias = Array.from({ length: colunas }, (_, c) => itens.slice(c * porColuna, (c + 1) * porColuna));
  const linha = (t, n, ultimo) =>
    row({ width: 'fill_container', padding: 14, gap: 16, alignItems: 'start', stroke: ultimo ? undefined : contorno(COR.linha, { bottom: 1 }) }, [
      texto(String(n).padStart(2, '0'), { ...esc.mono, fill: COR.cinzaFraco, width: esc === TM ? 26 : 32 }),
      texto(t, { ...esc.corpo, fill: COR.tinta, width: 'fill_container' }),
    ]);
  // no celular a sobrelinha e a contagem não cabem na mesma linha — empilham
  const cabeca = esc === TM
    ? col({ width: 'fill_container', gap: 6 }, [
        texto(`${itens.length} itens`, { ...esc.mono, fill: COR.tinta }),
        overline('Tudo isto acompanha a expedição', esc),
      ])
    : row({ width: 'fill_container', alignItems: 'end', gap: 20 }, [
        overline('Tudo isto acompanha a expedição', esc),
        mola(),
        texto(`${itens.length} itens`, { ...esc.mono, fill: COR.tinta }),
      ]);
  return col({ name: 'o que está incluso', width: 'fill_container', gap: 0, fill: COR.branco, padding: esc === TM ? 20 : 40 }, [
    cabeca,
    vao(esc === TM ? 16 : 22),
    fioForte(),
    row({ width: 'fill_container', gap: esc === TM ? 0 : 48, alignItems: 'start' },
      fatias.map((fatia, c) =>
        col({ width: 'fill_container', gap: 0 },
          fatia.map((t, i) => linha(t, c * porColuna + i + 1, i === fatia.length - 1)),
        ),
      ),
    ),
    fioForte(),
  ]);
}

/**
 * "O que não está incluso" — de propósito o módulo mais leve da página: colunas
 * separadas por fio vertical, sem marcador, sem caixa. Não repete nenhuma outra
 * composição e não disputa atenção com o que está incluso.
 */
export const blocoNaoIncluso = ({ itens, esc = T }) =>
  row({ name: 'o que não está incluso', width: 'fill_container', gap: 0 },
    itens.map((t, i) =>
      col({ width: 'fill_container', padding: esc === TM ? 16 : 24, gap: 10, stroke: i === 0 ? undefined : contorno(COR.linha, { left: 1 }) }, [
        texto(String(i + 1).padStart(2, '0'), { ...esc.mono, fill: COR.cinzaFraco }),
        texto(t, { ...esc.corpoP, fill: COR.cinza, width: 'fill_container' }),
      ]),
    ),
  );

/**
 * Hospedagem — uma entrada por hotel, todas dentro do mesmo módulo. O cliente pediu
 * isso explicitamente: "quando a expedição utilizar mais de uma hospedagem, apresentar
 * todas dentro do mesmo módulo, sem criar um bloco separado para cada hotel".
 * Cada entrada tem sua própria galeria horizontal — a última foto entra cortada, que é
 * o sinal de que há mais para arrastar.
 */
export const entradaHospedagem = ({ h, fotos, primeira = false, esc = T }) =>
  col({ name: `hospedagem/${h.nome}`, width: 'fill_container', gap: 20, padding: esc === TM ? 20 : 30, stroke: primeira ? undefined : contorno(COR.linha, { top: 1 }) }, [
    row({ width: 'fill_container', gap: esc === TM ? 16 : 40, alignItems: 'start' }, [
      col({ width: esc === TM ? 'fill_container' : 360, gap: 8 }, [
        overline(h.papel, esc),
        texto(h.nome, { ...esc.h3, fill: COR.tinta, width: 'fill_container' }),
        row({ gap: 10, alignItems: 'center' }, [
          texto(h.onde, { ...esc.mono, fill: COR.cinzaFraco }),
          ret({ width: 3, height: 3, fill: COR.cinzaFraco }),
          texto(h.noites, { ...esc.mono, fill: COR.tinta }),
        ]),
      ]),
      esc === TM ? null : texto(h.texto, { ...esc.corpoG, fill: COR.cinza, width: 'fill_container' }),
    ]),
    esc === TM ? texto(h.texto, { ...esc.corpo, fill: COR.cinza, width: 'fill_container' }) : null,
    // galeria horizontal: a quarta foto entra cortada, indicando que há mais
    row({ width: 'fill_container', gap: 6 }, [
      ...fotos.map((f) => frame({ width: 'fill_container', height: esc === TM ? 116 : 176, fill: imagem(f) })),
      frame({ width: esc === TM ? 34 : 70, height: esc === TM ? 116 : 176, fill: imagem(fotos[0]), opacity: 0.45 }),
    ]),
  ]);

/**
 * Reserva — o foco virou o investimento. Valor por pessoa e por casal em destaque,
 * condições ao lado. A escolha do quarto SAIU: acontece depois do clique, no fluxo de
 * compra, como ele definiu.
 */
export const painelReserva = ({ reserva, chamada, esc = T }) =>
  col({ width: 'fill_container', gap: 0 }, [
    ret({ width: 'fill_container', height: 2, fill: COR.sLinha }),
    row({ width: 'fill_container', padding: 40, gap: 40, alignItems: 'center' }, [
      col({ width: 'fill_container', gap: 8 }, [
        texto('POR PESSOA', { ...esc.mono, fontSize: 10, fill: COR.s55 }),
        texto(reserva.porPessoa, { ...esc.display, fontSize: 56, fill: COR.branco }),
      ]),
      col({ width: 'fill_container', gap: 8, stroke: contorno(COR.sLinha, { left: 1 }) }, [
        row({ width: 'fill_container' }, [frame({ width: 34, height: 1 }), col({ gap: 8 }, [
          texto('POR CASAL', { ...esc.mono, fontSize: 10, fill: COR.s55 }),
          texto(reserva.porCasal, { ...esc.display, fontSize: 56, fill: COR.branco }),
        ])]),
      ]),
      botao(chamada, { variante: 'claro', seta: true, esc, alt: 60 }),
    ]),
    ret({ width: 'fill_container', height: 2, fill: COR.sLinha }),
    vao(16),
    texto(reserva.nota, { ...esc.corpoP, fontSize: 12, fill: COR.s55, width: 'fill_container' }),
  ]);

/**
 * Encerramento do Grupo Avulso — "Ainda não encontrou sua próxima experiência?".
 * Texto intocado; só a composição mudou. Antes era mais uma faixa preta, o mesmo
 * recurso já usado em outras páginas — que é exatamente o que ele pediu para evitar.
 * Agora: assimétrico, claro, com o cadastro numa LINHA DE CAMPO sublinhada. Nenhum
 * outro módulo do site tem campo de entrada, então esta geometria não se repete.
 */
export function chamadaInteresse({ over, titulo, texto: corpo, placeholder, acao, esc = T }) {
  return col({ name: 'chamada final · cadastro de interesse', width: 'fill_container', fill: COR.branco, alignItems: 'center' }, [
    vao(100),
    row({ width: 'fill_container' }, [
      frame({ width: MARGEM.desktop, height: 1 }),
      col({ width: 'fill_container', gap: 0 }, [
        fioForte(),
        vao(40),
        row({ width: 'fill_container', gap: 80, alignItems: 'start' }, [
          col({ width: 560, gap: 16 }, [
            overline(over, esc),
            texto(titulo, { ...esc.h1, fill: COR.tinta, width: 'fill_container' }),
          ]),
          col({ width: 'fill_container', gap: 34 }, [
            texto(corpo, { ...esc.corpoG, fill: COR.cinza, width: 'fill_container' }),
            // a linha de campo: sublinhada, sem caixa — só tipografia e fio
            row({ width: 'fill_container', height: 58, gap: 20, alignItems: 'center', stroke: contorno(COR.fio, { bottom: 1.5 }) }, [
              texto(placeholder, { ...esc.corpoG, fill: COR.cinzaFraco, width: 'fill_container' }),
              row({ gap: 9, alignItems: 'center' }, [
                texto(acao.toUpperCase(), { ...esc.botao, fill: COR.tinta }),
                icone('arrow-right', { width: 14, height: 14, fill: COR.tinta }),
              ]),
            ]),
          ]),
        ]),
      ]),
      frame({ width: MARGEM.desktop, height: 1 }),
    ]),
    vao(100),
  ]);
}

/** A mesma chamada no celular: empilhada, o campo ocupa a largura toda. */
export function chamadaInteresseMobile({ over, titulo, texto: corpo, placeholder, acao }) {
  return col({ name: 'chamada final/mobile', width: 'fill_container', fill: COR.branco, alignItems: 'center' }, [
    vao(48),
    row({ width: 'fill_container' }, [
      frame({ width: MARGEM.mobile, height: 1 }),
      col({ width: 'fill_container', gap: 0 }, [
        fioForte(),
        vao(24),
        overline(over, TM),
        vao(12),
        texto(titulo, { ...TM.h1, fill: COR.tinta, width: 'fill_container' }),
        vao(14),
        texto(corpo, { ...TM.corpo, fill: COR.cinza, width: 'fill_container' }),
        vao(26),
        row({ width: 'fill_container', height: 48, gap: 12, alignItems: 'center', stroke: contorno(COR.fio, { bottom: 1.5 }) }, [
          texto(placeholder, { ...TM.corpo, fill: COR.cinzaFraco, width: 'fill_container' }),
          icone('arrow-right', { width: 15, height: 15, fill: COR.tinta }),
        ]),
        vao(14),
        texto(acao, { ...TM.corpoP, fill: COR.cinza }),
      ]),
      frame({ width: MARGEM.mobile, height: 1 }),
    ]),
    vao(48),
  ]);
}

/** A mesma reserva no celular: os dois valores e o botão. Nada mais. */
export const painelReservaMobile = ({ reserva, chamada }) =>
  col({ name: 'reserva/mobile', width: 'fill_container', gap: 0 }, [
    ret({ width: 'fill_container', height: 2, fill: COR.sLinha }),
    row({ width: 'fill_container', gap: 0 }, [
      col({ width: 'fill_container', padding: 18, gap: 5 }, [
        texto('POR PESSOA', { ...TM.mono, fontSize: 9, fill: COR.s55 }),
        texto(reserva.porPessoa, { ...TM.h1, fill: COR.branco }),
      ]),
      col({ width: 'fill_container', padding: 18, gap: 5, stroke: contorno(COR.sLinha, { left: 1 }) }, [
        texto('POR CASAL', { ...TM.mono, fontSize: 9, fill: COR.s55 }),
        texto(reserva.porCasal, { ...TM.h1, fill: COR.branco }),
      ]),
    ]),
    ret({ width: 'fill_container', height: 2, fill: COR.sLinha }),
    vao(18),
    botao(chamada, { variante: 'claro', seta: true, largura: 'fill_container', esc: TM, alt: 52 }),
    vao(10),
    texto(reserva.nota, { ...TM.corpoP, fontSize: 11, fill: COR.s55, width: 'fill_container' }),
  ]);

/* ─────────────────────────── rodapé ─────────────────────────── */

/**
 * Rodapé v3 — três instruções literais do retorno: "manter apenas o ícone da montanha",
 * "links institucionais em uma única linha horizontal", "remover o número de telefone
 * exposto, mantendo apenas os ícones de redes sociais".
 * Sobrou: montanha · uma linha de links · três ícones · linha legal. Nada mais.
 */
export function rodape() {
  const elo = (t) => texto(t, { ...T.corpoP, fill: COR.s82 });
  return col({ name: 'rodapé', width: 'fill_container', fill: COR.preto, alignItems: 'center' }, [
    vao(58),
    row({ width: 'fill_container' }, [
      frame({ width: MARGEM.desktop, height: 1 }),
      col({ width: 'fill_container', gap: 26 }, [
        // uma linha só: montanha à esquerda, links no meio, redes à direita.
        row({ width: 'fill_container', gap: 44, alignItems: 'center' }, [
          marca(28),
          mola(),
          row({ gap: 28, alignItems: 'center' }, MENU.map(elo)),
          ret({ width: 1, height: 16, fill: COR.sLinha }),
          row({ gap: 16, alignItems: 'center' }, [
            icone('message-circle', { width: 18, height: 18, fill: COR.s82 }),
            icone('instagram', { width: 18, height: 18, fill: COR.s82 }),
            icone('youtube', { width: 18, height: 18, fill: COR.s82 }),
          ]),
        ]),
        ret({ width: 'fill_container', height: 1, fill: COR.sLinha }),
        row({ width: 'fill_container', gap: 26, alignItems: 'center' }, [
          texto('© 2026 Desbravando UTV', { ...T.corpoP, fontSize: 13, fill: COR.s55 }),
          mola(),
          texto('Privacidade', { ...T.corpoP, fontSize: 13, fill: COR.s55 }),
          texto('Termos', { ...T.corpoP, fontSize: 13, fill: COR.s55 }),
        ]),
      ]),
      frame({ width: MARGEM.desktop, height: 1 }),
    ]),
    vao(44),
  ]);
}

/** No celular a linha única vira duas, mas a regra é a mesma: sem telefone, só ícones. */
export function rodapeMobile() {
  return col({ name: 'rodapé/mobile', width: 'fill_container', fill: COR.preto, alignItems: 'center' }, [
    vao(34),
    row({ width: 'fill_container' }, [
      frame({ width: MARGEM.mobile, height: 1 }),
      col({ width: 'fill_container', gap: 20, alignItems: 'center' }, [
        marca(24),
        row({ width: 'fill_container', gap: 14, justifyContent: 'center', alignItems: 'center' },
          MENU.map((m) => texto(m, { ...TM.corpoP, fill: COR.s82 }))),
        ret({ width: 'fill_container', height: 1, fill: COR.sLinha }),
        row({ gap: 20 }, [
          icone('message-circle', { width: 19, height: 19, fill: COR.branco }),
          icone('instagram', { width: 19, height: 19, fill: COR.branco }),
          icone('youtube', { width: 19, height: 19, fill: COR.branco }),
        ]),
        texto('© 2026 Desbravando UTV', { ...TM.corpoP, fontSize: 11, fill: COR.s55 }),
      ]),
      frame({ width: MARGEM.mobile, height: 1 }),
    ]),
    vao(30),
  ]);
}

/** Barra fixa de reserva no celular. */
export const barraReservaMobile = (preco, chamada = 'Garantir vaga') =>
  recuoH(MARGEM.mobile, { name: 'barra-fixa/reserva', height: 82, gap: 14, fill: COR.preto, stroke: contorno(COR.sLinha, { top: 1 }) }, [
    col({ gap: 3 }, [
      texto('A PARTIR DE', { ...TM.eti, fontSize: 9, fill: COR.s55 }),
      texto(preco, { ...TM.h3, fill: COR.branco }),
    ]),
    mola(),
    botao(chamada, { variante: 'claro', seta: true, largura: 176, alt: 48, esc: TM }),
  ]);

/** Grade de fotos contidas — a V3 nunca usa foto sangrando. */
export const faixaFotos = (fotos, { altura = 190, legendas } = {}) =>
  row({ name: 'faixa de fotos', width: 'fill_container', gap: 2 },
    fotos.map((f, i) =>
      col({ width: 'fill_container', gap: 0 }, [
        frame({ width: 'fill_container', height: altura, fill: imagem(f) }),
        legendas && row({ width: 'fill_container', padding: 10, gap: 8, fill: COR.tinta, alignItems: 'center' }, [
          texto(String(i + 1).padStart(2, '0'), { ...T.mono, fontSize: 10, fill: COR.s55 }),
          texto(legendas[i], { ...T.corpoP, fontWeight: '600', fill: COR.branco }),
        ]),
      ]),
    ),
  );

export { imagem, gradiente, contorno, sombra, icone };
