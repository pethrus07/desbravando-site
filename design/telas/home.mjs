// 01 · HOME — v3.
// A ordem dos módulos é a mesma que ele aprovou ("o objetivo não é alterar a estrutura
// da Home"): 1 vídeo · 2 posicionamento · 3 destaques · 4 expedições · 5 galeria ·
// 6 parceiros · 7 depoimentos · 8 comunidade · 9 três pilares · 10 rodapé.
// (o módulo "estoque e produtos" saiu em 08/08 — ver o comentário no fim do arquivo)
//
// O que mudou na v3 é só COMPOSIÇÃO, módulo a módulo:
//   · expedições  → duas etapas visuais separadas; cards sem nenhuma foto
//   · galeria     → carrossel de uma foto por vez (era faixa com quatro)
//   · parceiros   → linha única (não repete o padrão do bloco vizinho)
//   · comunidade  → o único módulo centrado do site
//   · pilares     → SEM foto nenhuma (08/08); só número, nome e mantra
//   · rodapé      → montanha, uma linha de links, sem telefone
import { col, row, texto, vao, mola } from '../lib/pen.mjs';
import { COR, T, LARGURA, MARGEM } from '../lib/tokens.mjs';
import {
  nav, botao, secao, overline, fio, fioForte,
  videoCheio, carrosselDestaques, cardFormato, cardPilar, blocoParceiros,
  blocoComunidade, carrosselFotos, rodape, contorno,
} from '../lib/componentes.mjs';
import { MARCA, DESTAQUES, FORMATOS, PILARES, EXPEDICOES, DEPOIMENTOS, fotoExpedicao, fotoHome } from '../lib/dados.mjs';

export function home(x, y) {
  return col({ name: '01 · Home', x, y, width: LARGURA.desktop, fill: COR.papel, clip: true }, [
    nav(),

    /* 1 · vídeo em tela cheia — o primeiro impacto */
    videoCheio(fotoHome(0, 1800), { altura: 560, rotulo: 'vídeo de abertura' }),

    /* 2 · posicionamento — módulo APROVADO, é a referência de linguagem do site inteiro */
    secao({ nome: 'posicionamento', padY: 84, gap: 24 }, [
      overline('o Desbravando'),
      texto(MARCA.titulo, { ...T.display, fill: COR.tinta, width: 'fill_container' }),
      texto(MARCA.posicionamento, { ...T.corpoG, fill: COR.cinza, width: 900 }),
    ]),

    /* 3 · área de destaques — um banner por vez, conteúdo trocável sem mexer na Home */
    carrosselDestaques({ destaques: DESTAQUES.map((d) => ({ ...d, foto: fotoExpedicao(d.fotoIdx, 1600) })), atual: 0 }),

    /* 4 · expedições — DUAS ETAPAS VISUAIS, como ele definiu.
       Etapa 1: a apresentação do modelo, no cinza do papel.
       Etapa 2: os dois formatos, num plano branco destacado — a troca de fundo é o que
       impede a seção de parecer "um único bloco visual". */
    secao({ nome: 'expedições', padY: 96, gap: 0 }, [
      // ── etapa 1 · apresentação da seção
      col({ name: 'etapa 1 · apresentação', width: 'fill_container', gap: 20 }, [
        overline('Expedições'),
        texto('ESCOLHA A EXPERIÊNCIA\nQUE COMBINA COM VOCÊ.', { ...T.h1, fill: COR.tinta, width: 'fill_container' }),
        texto(
          'Dois formatos de expedições desenvolvidos para diferentes perfis, com o mesmo padrão de organização, segurança e experiência Desbravando.',
          { ...T.corpoG, fill: COR.cinza, width: 720 },
        ),
      ]),
      vao(56),
      // ── etapa 2 · as opções
      col({ name: 'etapa 2 · opções', width: 'fill_container', fill: COR.branco }, [
        row({ width: 'fill_container', gap: 0 },
          FORMATOS.map((f, i) => cardFormato({ ...f, primeiro: i === 0 })),
        ),
      ]),
    ]),

    /* 5 · galeria — uma foto por vez. No celular a próxima espia na borda. */
    secao({ fundo: COR.branco, nome: 'galeria', padY: 76, gap: 26 }, [
      row({ width: 'fill_container', alignItems: 'end', gap: 40 }, [
        col({ gap: 12 }, [
          overline('Galeria'),
          texto('O QUE ACONTECE\nQUANDO A ESTRADA ACABA.', { ...T.h1, fill: COR.tinta }),
        ]),
        mola(),
        texto('Fotos das últimas expedições.', { ...T.corpoP, fill: COR.cinzaFraco }),
      ]),
      carrosselFotos({
        fotos: EXPEDICOES.map((e) => fotoExpedicao(e.fotoIdx, 1400)),
        atual: 0,
        altura: 480,
        legenda: 'Urubici · Santa Catarina',
        margem: 0,
      }),
    ]),

    /* 6 · parceiros oficiais — uma linha só, o módulo mais quieto do site */
    blocoParceiros({ logos: ['Can-Am'] }),

    /* 7 · depoimentos — módulo APROVADO, mantido tal e qual */
    secao({ fundo: COR.branco, nome: 'quem já foi', padY: 76, gap: 24 }, [
      col({ width: 780, gap: 14 }, [
        overline('Quem já foi'),
        texto('A EXPEDIÇÃO ACABA.\nO GRUPO CONTINUA.', { ...T.h1, fill: COR.tinta, width: 'fill_container' }),
      ]),
      col({ width: 'fill_container', gap: 0 }, [
        fioForte(),
        ...DEPOIMENTOS.slice(0, 2).map(([frase, autor], i) =>
          row(
            { width: 'fill_container', padding: 26, gap: 40, alignItems: 'start', stroke: i === 1 ? undefined : contorno(COR.linha, { bottom: 1 }) },
            [
              texto('↗', { ...T.h3, fill: COR.tinta, width: 34 }),
              texto(frase, { ...T.corpoG, fill: COR.tinta, width: 'fill_container' }),
              texto(autor, { ...T.corpoP, fill: COR.cinza, width: 240, textAlign: 'right' }),
            ],
          ),
        ),
        fioForte(),
      ]),
    ]),

    /* 8 · comunidade — centrado, e só ele */
    blocoComunidade(),

    /* 9 · os três pilares — SEM foto. Sem indicadores numéricos, a pedido dele. */
    secao({ nome: 'três pilares', padY: 92, gap: 0 }, [
      col({ width: 780, gap: 14 }, [
        overline('As três frentes'),
        texto('TRÊS PILARES.\nUMA ÚNICA PAIXÃO.', { ...T.h1, fill: COR.tinta, width: 'fill_container' }),
        texto('Conheça as três frentes que dão vida ao universo Desbravando.', { ...T.corpoG, fill: COR.cinza, width: 'fill_container' }),
      ]),
      vao(48),
      col({ width: 'fill_container', gap: 0 }, [
        fioForte(),
        row({ width: 'fill_container', gap: 0 },
          PILARES.map((p, i) => cardPilar({ ...p, primeiro: i === 0 })),
        ),
        fioForte(),
      ]),
    ]),

    /* 10 · rodapé
       ⚠️ O módulo "estoque e produtos" SAIU daqui em 08/08 — decisão do Pedro depois de
       ver a Home no ar: ela estava ficando infinita. Eram 581 px e a página caiu de
       6.321 para 5.740. O conteúdo não se perdeu: Estoque Off-Road e Produtos são
       páginas próprias no menu, e o bloco dos três pilares já leva para as duas. */
    rodape(),
  ]);
}
