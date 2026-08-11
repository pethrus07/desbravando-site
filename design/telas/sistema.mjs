// 00 · Sistema — a régua da direção V3 · ÍNDICE TIPOGRÁFICO.
// Marca: marca/IDENTIDADE_VISUAL.md (SPEC_MD do Estúdio de Briefing) + arquivo do logo.
import { col, row, texto, frame, ret, vao, mola } from '../lib/pen.mjs';
import { COR, T, FONTE, TRACO } from '../lib/tokens.mjs';
import {
  botao, pilula, status, overline, fio, fioForte, tituloLista, linhaIndice,
  itemNumerado, itemLista, dado, faixaDados, logo, imagem, contorno,
} from '../lib/componentes.mjs';
import { EXPEDICOES, fotoExpedicao } from '../lib/dados.mjs';

export function sistema(x, y) {
  return col({ name: '00 · Sistema de design', x, y, width: 1440, fill: COR.papel, clip: true, padding: 80, gap: 64 }, [
    row({ width: 'fill_container', alignItems: 'start', gap: 60 }, [
      col({ width: 'fill_container', gap: 16 }, [
        overline('Repaginação Desbravando UTV · agosto 2026'),
        texto('V3 · ÍNDICE TIPOGRÁFICO', { ...T.display, fill: COR.tinta }),
        texto('A página abre como um sumário, não como uma vitrine. Tipo grande, fio fino, dado tabulado, foto pequena e contida. O preto é pontuação — nav, faixa de pausa e botão —, não fundo.', {
          ...T.corpoG, fill: COR.cinza, width: 'fill_container',
        }),
      ]),
      col({ width: 300, gap: 12, padding: 20, fill: COR.preto, alignItems: 'center' }, [logo(48)]),
    ]),

    /* a regra da marca */
    col({ width: 'fill_container', gap: 0 }, [
      fioForte(),
      row({ width: 'fill_container', padding: 30, gap: 50, alignItems: 'start' }, [
        col({ width: 'fill_container', gap: 14 }, [
          overline('A regra'),
          texto('“PRETO E BRANCO, SEM NENHUMA COR DE DESTAQUE.\nA ÚNICA COR, QUANDO HÁ, VEM DA FOTOGRAFIA.”', { ...T.h2, fill: COR.tinta, width: 'fill_container' }),
        ]),
        col({ width: 480, gap: 12 }, [
          texto('Do guia de identidade que já existe. O site é registro NÚCLEO — o mesmo dos decks, propostas e documentos.', { ...T.corpo, fill: COR.cinza, width: 'fill_container' }),
          texto('Conferido no arquivo do logo (2300×813): 100% dos pixels opacos são #FFFFFF. A marca não tem cor.', { ...T.corpoP, fill: COR.cinza, width: 'fill_container' }),
        ]),
      ]),
      fioForte(),
    ]),

    /* por que claro */
    col({ width: 'fill_container', padding: 30, gap: 14, fill: COR.branco }, [
      overline('Por que claro, e não preto'),
      texto('O site de hoje é claro (#F2F2F2), centrado, com blocos pretos. A primeira proposta virou tudo preto e ficou destoante — era um site novo, não uma repaginação. E preto + tipo condensado gigante + foto sangrando é a fórmula mais batida que existe. Aqui o fundo continua claro e o preto vira pontuação.', {
        ...T.corpo, fill: COR.cinza, width: 900,
      }),
    ]),

    /* cores */
    bloco('Cores', [
      row({ gap: 16, width: 'fill_container' }, [
        amostra('Papel', COR.papel, 'Fundo — o mesmo cinza do site atual'),
        amostra('Branco', COR.branco, 'Faixa de leitura longa'),
        amostra('Preto', COR.preto, 'Nav, faixa de pausa, botão'),
        amostra('Tinta', COR.tinta, 'Texto principal'),
      ]),
      row({ gap: 16, width: 'fill_container' }, [
        amostra('Cinza', COR.cinza, 'Texto secundário — também o do site atual'),
        amostra('Cinza fraco', COR.cinzaFraco, 'Numeração e apoio'),
        amostra('Linha', COR.linha, 'Fio leve, entre itens'),
        amostra('Fio', COR.fio, 'Fio forte, abre e fecha lista'),
      ]),
      row({ gap: 12, alignItems: 'center' }, [
        texto('↗', { ...T.corpo, fontWeight: '700', fill: COR.tinta }),
        texto('O acento azul/verde do guia é raro e para peça de marca — não entra no site. Fica declarado como variável, desligado.', { ...T.corpoP, fill: COR.cinza }),
      ]),
    ]),

    /* tipografia */
    bloco('Tipografia', [
      row({ gap: 56, width: 'fill_container', alignItems: 'start' }, [
        col({ gap: 8, width: 300 }, [
          texto('Anton', { ...T.h1, fill: COR.tinta }),
          texto('Títulos e nomes do índice.', { ...T.corpoP, fill: COR.cinza, width: 280 }),
        ]),
        col({ gap: 8, width: 300 }, [
          texto('Archivo', { fontFamily: FONTE.texto, fontSize: 46, fontWeight: '700', lineHeight: 1, fill: COR.tinta }),
          texto('Corpo, sobrelinha, botão.', { ...T.corpoP, fill: COR.cinza, width: 280 }),
        ]),
        col({ gap: 8, width: 'fill_container' }, [
          texto('JetBrains Mono', { fontFamily: FONTE.mono, fontSize: 26, fontWeight: '400', lineHeight: 1.2, fill: COR.tinta }),
          texto('Número, código e rótulo de dado — o que dá cara de documento.', { ...T.corpoP, fill: COR.cinza, width: 'fill_container' }),
        ]),
      ]),
      fio(),
      col({ gap: 18, width: 'fill_container' }, [
        linhaTipo('Display 72', 'ISSO NÃO É PASSEIO.', T.display),
        linhaTipo('Índice 44', 'SERRA DA CANASTRA', T.indice),
        linhaTipo('H1 48', 'AGENDA 2026', T.h1),
        linhaTipo('H2 34', 'ESCOLHA A SUA ACOMODAÇÃO', T.h2),
        linhaTipo('Corpo 16', 'Urubici fica no alto da serra catarinense, a 1.500 metros.', T.corpo),
        linhaTipo('Mono 12', '01 · 26–30 AGO 2026 · R$ 19.500', T.mono),
        linhaTipo('Sobrelinha 11', 'AGENDA 2026', T.eti),
      ]),
    ]),

    /* peças */
    bloco('Peças', [
      row({ gap: 16, alignItems: 'center' }, [
        botao('Garantir vaga', { seta: true }),
        botao('Ver a agenda', { variante: 'contorno' }),
        botao('Ver mais', { variante: 'texto', seta: true }),
        row({ padding: 16, gap: 16, fill: COR.preto, alignItems: 'center' }, [botao('Solicitar orçamento', { variante: 'claro', seta: true })]),
      ]),
      row({ gap: 12, alignItems: 'center' }, [
        pilula('Todos os estados', true), pilula('Todos os meses'), pilula('Qualquer dificuldade'),
        frame({ width: 30, height: 1 }),
        status('Últimas vagas', 'ultimas'), status('Lista de espera', 'espera'), status('Esgotado', 'esgotado'),
      ]),
      texto('Status é etiqueta de texto com marcador, não pílula colorida — o guia não permite cor de destaque.', { ...T.corpoP, fill: COR.cinza }),
    ]),

    /* o componente central */
    bloco('A linha do índice — o componente central', [
      col({ width: 'fill_container', gap: 0 }, [
        tituloLista('Agenda 2026', 'Vaga avulsa'),
        ...EXPEDICOES.slice(0, 2).map((e, i) =>
          linhaIndice({ n: i + 1, titulo: e.destino, colunas: [[e.uf, e.duracao], [e.datasCurtas, e.status.rotulo]], foto: fotoExpedicao(e.fotoIdx, 300) }),
        ),
      ]),
      texto('As colunas de largura fixa precisam somar menos que 1.148px (1.200 − padding): nenhuma delas encolhe, e o excedente vaza para fora da linha.', {
        ...T.corpoP, fill: COR.cinza, width: 900,
      }),
    ]),

    bloco('Listas e dados', [
      row({ gap: 56, width: 'fill_container', alignItems: 'start' }, [
        col({ width: 'fill_container', gap: 0 }, [
          fioForte(),
          itemNumerado('01', 'Passo numerado', 'Usado em roteiro dia a dia, como funciona e etapas de formulário.'),
          itemNumerado('02', 'Sempre com fio', 'O fio forte abre e fecha; o leve separa os itens.', { fim: true }),
          fioForte(),
        ]),
        col({ width: 'fill_container', gap: 14 }, [
          itemLista('Marcador ↗, como manda o guia'),
          itemLista('Item de fora fica apagado, não vermelho', 'fora'),
          vao(6),
          faixaDados([['expedições', '12'], ['pilotos', '340+'], ['estados', '9']]),
        ]),
      ]),
    ]),

    /* o que falta */
    col({ width: 'fill_container', padding: 40, gap: 24, fill: COR.preto }, [
      col({ gap: 10 }, [
        texto('PARA O DESBRAVANDO', { ...T.eti, fill: COR.s55 }),
        texto('O QUE PRECISA CHEGAR PRONTO', { ...T.h1, fill: COR.branco }),
        texto('O layout está de pé. Falta o conteúdo — e isso ninguém faz no lugar de vocês.', { ...T.corpoG, fill: COR.s82, width: 720 }),
      ]),
      row({ gap: 48, width: 'fill_container', alignItems: 'start' }, [
        listaCheck('Por expedição', [
          'Texto do destino (2 parágrafos)', 'Roteiro dia a dia', 'Km aproximado e dificuldade',
          'O que está e o que não está incluso', 'Aeroporto, distâncias e ponto de encontro',
          '8 a 12 fotos boas', 'Uma foto de cada acomodação', 'Respostas do FAQ',
        ]),
        listaCheck('Uma vez só', [
          'Texto de “o Desbravando”', 'Números de prova (hoje são exemplo)', '4 a 6 depoimentos com nome',
          'Logo em SVG (só temos o PNG)', 'Arte do Can-Am para o selo', 'Confirmar o gateway da conta Wix',
          'Política de cancelamento', 'Regras do programa de membros',
        ]),
      ]),
    ]),
  ]);
}

/* ── auxiliares ── */

const bloco = (titulo, filhos) =>
  col({ width: 'fill_container', gap: 22 }, [
    row({ gap: 18, alignItems: 'center', width: 'fill_container' }, [
      texto(titulo.toUpperCase(), { ...T.eti, fill: COR.cinza }),
      ret({ width: 'fill_container', height: TRACO.leve, fill: COR.linha }),
    ]),
    col({ width: 'fill_container', gap: 18 }, filhos),
  ]);

const amostra = (nome, cor, uso) =>
  col({ width: 'fill_container', gap: 10 }, [
    frame({ width: 'fill_container', height: 84, fill: cor, stroke: contorno(COR.linha, 1) }),
    col({ gap: 3 }, [
      texto(`${nome}  ${cor.toUpperCase()}`, { ...T.corpoP, fontWeight: '700', fill: COR.tinta }),
      texto(uso, { ...T.corpoP, fontSize: 12, fill: COR.cinza, width: 'fill_container' }),
    ]),
  ]);

const linhaTipo = (rotulo, exemplo, estilo) =>
  row({ width: 'fill_container', gap: 36, alignItems: 'center' }, [
    texto(rotulo, { ...T.mono, fontSize: 11, fill: COR.cinza, width: 120 }),
    texto(exemplo, { ...estilo, fill: COR.tinta, width: 'fill_container' }),
  ]);

const listaCheck = (titulo, itens) =>
  col({ width: 'fill_container', gap: 12 }, [
    texto(titulo.toUpperCase(), { ...T.eti, fill: COR.s55 }),
    ...itens.map((i) =>
      row({ gap: 12, alignItems: 'center', width: 'fill_container' }, [
        frame({ width: 14, height: 14, stroke: contorno(COR.s38, 1) }),
        texto(i, { ...T.corpo, fill: COR.s82, width: 'fill_container' }),
      ]),
    ),
  ]);
