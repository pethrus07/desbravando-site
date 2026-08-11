// 03 · PÁGINA DA EXPEDIÇÃO — v3, com a COSTA DOCE real no lugar do exemplo.
//
// A arquitetura é a mesma que ele aprovou ("as alterações referem-se apenas à
// apresentação visual"):
//   Comercial   1 apresentação · 2 resumo · 3 galeria · 4 sobre o destino
//               5 roteiro · 6 hospedagem · 7 o que está incluso · 8 reserva
//   Informativa 9 o que não está incluso · 10 guia da expedição · 11 FAQ · 12 rodapé
//
// O que mudou na v3:
//   · roteiro       → sem nenhuma foto; régua tipográfica por dia
//   · hospedagem    → DOIS hotéis dentro do mesmo módulo, cada um com sua galeria
//   · incluso       → inventário numerado com contagem, no lugar da lista de marcadores
//   · reserva       → foco no investimento (por pessoa / por casal); a escolha do quarto
//                     saiu da página e passou a acontecer depois do clique
//   · não incluso · guia · FAQ → cada um com sua própria composição
//
// ⚠️ O dossiê da Costa Doce NÃO traz valores. Tudo que é preço está como "a confirmar".
import { col, row, texto, frame, ret, vao, mola } from '../lib/pen.mjs';
import { COR, T, LARGURA, MARGEM } from '../lib/tokens.mjs';
import {
  nav, botao, secao, overline, fio, fioForte, dado, videoCheio, carrosselFotos,
  linhaRoteiro, entradaHospedagem, blocoIncluso, blocoNaoIncluso, painelReserva,
  guiaExpedicao, faq, status, rodape, imagem, contorno, icone,
} from '../lib/componentes.mjs';
import {
  COSTA_DOCE as E, ROTEIRO_COSTA, HOSPEDAGENS, HOSPEDAGEM_NOTA, INCLUSO_COSTA,
  NAO_INCLUSO_COSTA, RESERVA, PERGUNTAS, GUIA, BOTAO_POR_SITUACAO, fotoExpedicao,
} from '../lib/dados.mjs';

const CHAMADA = BOTAO_POR_SITUACAO[E.status.tipo] || 'Fazer pré-reserva';

export function destino(x, y) {
  return col({ name: '03 · Página da Expedição — Costa Doce', x, y, width: LARGURA.desktop, fill: COR.papel, clip: true }, [
    nav({ ativo: 'Expedições' }),

    /* 1 · apresentação — módulo APROVADO, é a referência de linguagem da página */
    videoCheio(fotoExpedicao(3, 1800), { altura: 520, rotulo: 'vídeo da expedição' }),
    secao({ nome: 'apresentação', padY: 64, gap: 24 }, [
      row({ gap: 10, alignItems: 'center' }, [
        texto('Expedições', { ...T.corpoP, fill: COR.cinza }),
        texto('/', { ...T.corpoP, fill: COR.cinzaFraco }),
        texto('Grupo Avulso', { ...T.corpoP, fill: COR.cinza }),
        texto('/', { ...T.corpoP, fill: COR.cinzaFraco }),
        texto('Costa Doce · RS', { ...T.corpoP, fill: COR.tinta }),
      ]),
      row({ width: 'fill_container', gap: 60, alignItems: 'start' }, [
        col({ width: 'fill_container', gap: 20 }, [
          overline(`Expedição ${E.nome} · ${E.datas}`),
          texto('COSTA DOCE\nRIO GRANDE DO SUL', { ...T.display, fill: COR.tinta, width: 'fill_container' }),
          texto(E.chamada, { ...T.corpoG, fill: COR.cinza, width: 620 }),
          status(E.status.rotulo, E.status.tipo),
        ]),
        col({ gap: 12, alignItems: 'end' }, [
          botao(CHAMADA, { seta: true, alt: 54 }),
          texto('sem precisar rolar a página inteira', { ...T.corpoP, fill: COR.cinzaFraco }),
        ]),
      ]),
    ]),

    /* 2 · resumo da expedição — módulo APROVADO, mantido tal e qual */
    secao({ fundo: COR.branco, nome: 'resumo da expedição', padY: 52, gap: 0 }, [
      col({ width: 'fill_container', gap: 0 }, [
        fioForte(),
        row({ width: 'fill_container', padding: 22, gap: 0 }, E.dados.slice(0, 3).map(([r, v]) => dado(r, v))),
        fio(),
        row({ width: 'fill_container', padding: 22, gap: 0 }, E.dados.slice(3).map(([r, v]) => dado(r, v))),
        fio(),
        row({ width: 'fill_container', padding: 22, gap: 0 }, [
          dado('datas', E.datas), dado('formato', E.formato), dado('região', E.regiao),
        ]),
        fioForte(),
      ]),
    ]),

    /* 3 · galeria — uma foto por vez */
    secao({ nome: 'galeria', padY: 72, gap: 24 }, [
      row({ width: 'fill_container', alignItems: 'end', gap: 40 }, [
        col({ gap: 12 }, [
          overline('Registro'),
          texto('A EXPEDIÇÃO POR DENTRO', { ...T.h1, fill: COR.tinta }),
        ]),
        mola(),
        texto('Dunas, lagoas e beira-oceano.', { ...T.corpoP, fill: COR.cinzaFraco }),
      ]),
      carrosselFotos({
        fotos: [3, 0, 1, 2].map((i) => fotoExpedicao(i, 1400)),
        atual: 0,
        altura: 520,
        legenda: 'Parque Nacional da Lagoa do Peixe',
        margem: 0,
      }),
    ]),

    /* 4 · sobre o destino */
    secao({ fundo: COR.branco, nome: 'sobre o destino', padY: 76, gap: 24 }, [
      col({ width: 780, gap: 14 }, [
        overline('O destino'),
        texto('O TRECHO MAIS BRUTO\nDO LITORAL GAÚCHO.', { ...T.h1, fill: COR.tinta, width: 'fill_container' }),
      ]),
      row({ width: 'fill_container', gap: 56, alignItems: 'start' }, [
        texto(E.sobre, { ...T.corpo, fill: COR.cinza, width: 'fill_container' }),
        col({ width: 'fill_container', gap: 0 }, [
          fio(),
          ...[['Base', 'Mostardas & Tramandaí'], ['Trilha', '3 dias · ~540 km'], ['Seu carro', 'Vai de cegonha, com seguro contra roubo']].map(([r, v]) =>
            row({ width: 'fill_container', padding: 14, gap: 20, alignItems: 'start', stroke: contorno(COR.linha, { bottom: 1 }) }, [
              texto(r.toUpperCase(), { ...T.eti, fontSize: 10, fill: COR.cinzaFraco, width: 110 }),
              texto(v, { ...T.corpoP, fill: COR.tinta, width: 'fill_container' }),
            ]),
          ),
        ]),
      ]),
    ]),

    /* 5 · roteiro — SEM foto. Régua tipográfica, leitura cronológica. */
    secao({ nome: 'roteiro', padY: 84, gap: 0 }, [
      col({ width: 820, gap: 14 }, [
        overline('Roteiro'),
        texto('DIA A DIA DA EXPEDIÇÃO', { ...T.h1, fill: COR.tinta }),
        texto('O roteiro pode mudar por causa do tempo ou das condições da trilha — a equipe decide em campo, sempre pela segurança do grupo.', {
          ...T.corpo, fill: COR.cinza, width: 'fill_container',
        }),
      ]),
      vao(46),
      col({ width: 'fill_container', gap: 0 }, [
        fioForte(),
        ...ROTEIRO_COSTA.map(([dia, data, local, titulo, corpo, km], i) =>
          linhaRoteiro({ dia, data, local, titulo, texto: corpo, km, primeira: i === 0 }),
        ),
        fioForte(),
      ]),
    ]),

    /* 6 · hospedagem — DOIS hotéis, um módulo só, cada um com sua galeria */
    secao({ fundo: COR.branco, nome: 'hospedagem', padY: 80, gap: 0 }, [
      row({ width: 'fill_container', alignItems: 'end', gap: 40 }, [
        col({ width: 640, gap: 14 }, [
          overline('Hospedagem'),
          texto('ONDE O GRUPO FICA', { ...T.h1, fill: COR.tinta }),
        ]),
        mola(),
        texto(`${HOSPEDAGENS.length} hospedagens · 4 pernoites`, { ...T.mono, fill: COR.tinta }),
      ]),
      vao(18),
      texto(HOSPEDAGEM_NOTA, { ...T.corpo, fill: COR.cinza, width: 780 }),
      vao(40),
      col({ width: 'fill_container', gap: 0 }, [
        fioForte(),
        ...HOSPEDAGENS.map((h, i) =>
          entradaHospedagem({ h, fotos: h.fotos.map((f) => fotoExpedicao(f, 700)), primeira: i === 0 }),
        ),
        fioForte(),
      ]),
    ]),

    /* 7 · o que está incluso — inventário numerado, com contagem */
    secao({ nome: 'está incluso', padY: 84, gap: 0 }, [
      col({ width: 780, gap: 14 }, [
        overline('O pacote'),
        texto('O QUE ESTÁ INCLUSO', { ...T.h1, fill: COR.tinta }),
      ]),
      vao(36),
      blocoIncluso({ itens: INCLUSO_COSTA }),
    ]),

    /* 8 · reserva — enxuta: investimento e botão, e mais nada. Formas de pagamento,
       condições e parcelamento saíram da página e acontecem dentro do fluxo da
       reserva; o subtítulo abaixo do título também saiu. */
    secao({ fundo: COR.preto, nome: 'reserva', padY: 84, gap: 0 }, [
      col({ width: 820, gap: 14 }, [
        texto('RESERVA', { ...T.eti, fill: COR.s55 }),
        texto('O INVESTIMENTO DA EXPEDIÇÃO', { ...T.h1, fill: COR.branco }),
      ]),
      vao(44),
      painelReserva({ reserva: RESERVA, chamada: CHAMADA }),
    ]),

    /* ─── daqui para baixo é a etapa INFORMATIVA ─── */

    /* 9 · o que não está incluso — o módulo mais leve da página, de propósito */
    secao({ nome: 'não está incluso', padY: 64, gap: 22 }, [
      row({ width: 'fill_container', alignItems: 'end', gap: 30 }, [
        col({ gap: 10 }, [
          overline('Complemento'),
          texto('O QUE NÃO ESTÁ INCLUSO', { ...T.h2, fill: COR.tinta }),
        ]),
        mola(),
        texto('por conta do participante', { ...T.corpoP, fill: COR.cinzaFraco }),
      ]),
      col({ width: 'fill_container', gap: 0 }, [
        fio(),
        blocoNaoIncluso({ itens: NAO_INCLUSO_COSTA }),
        fio(),
      ]),
    ]),

    /* 10 · guia da expedição — busca + índice numerado, identidade só dele */
    secao({ fundo: COR.branco, nome: 'guia da expedição', padY: 84, gap: 26 }, [
      guiaExpedicao({ categorias: GUIA }),
    ]),

    /* 11 · perguntas frequentes — sanfona */
    secao({ nome: 'faq', padY: 76, gap: 24 }, [
      col({ width: 780, gap: 14 }, [
        overline('Dúvidas'),
        texto('PERGUNTAS FREQUENTES', { ...T.h1, fill: COR.tinta }),
      ]),
      col({ width: 'fill_container', gap: 0 }, [
        fioForte(),
        faq(PERGUNTAS[0][0], true, PERGUNTAS[0][1]),
        ...PERGUNTAS.slice(1).map(([p]) => faq(p)),
      ]),
    ]),

    /* 12 · rodapé */
    rodape(),
  ]);
}
