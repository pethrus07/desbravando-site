import { col, row, texto, frame, vao, mola } from '../lib/pen.mjs';
import { COR, T, LARGURA, MARGEM } from '../lib/tokens.mjs';
import {
  nav, botao, abertura, cabecalho, secao, overline, fio, fioForte, tituloLista,
  linhaIndice, itemNumerado, itemLista, faixaDados, faixaFotos, rodape, imagem, contorno,
} from '../lib/componentes.mjs';
import { PERSONALIZAVEL, EXPEDICOES, fotoExpedicao } from '../lib/dados.mjs';

export function grupoFechado(x, y) {
  return col({ name: '04 · Grupo Fechado (aguardando documento)', x, y, width: LARGURA.desktop, fill: COR.papel, clip: true }, [
    nav({ ativo: 'Expedições' }),

    secao({ nome: 'abertura', padY: 88, gap: 30 }, [
      abertura({
        over: 'Expedições · Grupo fechado',
        titulo: 'SUA EXPEDIÇÃO,\nDO SEU JEITO.',
        texto:
          'Empresas, concessionárias e turmas de amigos. Você escolhe o destino, a data e o padrão — a gente monta a operação inteira e devolve o orçamento em até 48 horas.',
        acoes: [botao('Solicitar orçamento', { seta: true }), botao('Ver destinos possíveis', { variante: 'contorno' })],
      }),
      faixaDados([['prazo da proposta', 'até 48h'], ['grupo mínimo', '6 carros'], ['destinos no mapa', '4 + sob medida'], ['duração', 'de 2 a 7 dias']]),
    ]),

    /* como funciona */
    secao({ fundo: COR.branco, nome: 'como funciona', padY: 76, gap: 26 }, [
      cabecalho('Como funciona', 'DO PEDIDO À ESTRADA EM TRÊS ETAPAS'),
      col({ width: 'fill_container', gap: 0 }, [
        fioForte(),
        itemNumerado('01', 'Você preenche o pedido', 'Destino, quantidade de carros, datas possíveis e o padrão que vocês querem. Leva uns três minutos.'),
        itemNumerado('02', 'A gente monta a proposta', 'Roteiro, hospedagem, apoio e valores num documento com fotos do destino. Em até 48h no seu e-mail.'),
        itemNumerado('03', 'Ajusta e fecha', 'Mexeu no que quiser, assinou o contrato e a gente entra em modo operação.', { fim: true }),
        fioForte(),
      ]),
    ]),

    /* para quem é */
    secao({ nome: 'para quem é', padY: 76, gap: 26 }, [
      cabecalho('Para quem é', 'TRÊS TIPOS DE GRUPO QUE RODAM COM A GENTE'),
      row({ width: 'fill_container', gap: 24 }, [
        publico('Empresas', 'Incentivo de vendas, convenção ou confraternização. Kit personalizado com a marca da empresa e material de mídia para vocês usarem depois.', fotoExpedicao(1, 700)),
        publico('Concessionárias', 'Test-drive de verdade com os seus clientes, no terreno em que o carro foi feito para rodar. A gente cuida da operação, vocês cuidam da relação.', fotoExpedicao(0, 700)),
        publico('Grupos de amigos', 'Vocês já rodam juntos e querem fazer uma viagem grande sem ninguém precisar organizar. A gente organiza.', fotoExpedicao(3, 700)),
      ]),
    ]),

    /* o que dá para personalizar — duas colunas de lista */
    secao({ fundo: COR.branco, nome: 'personalizável', padY: 76, gap: 26 }, [
      cabecalho('Sob medida', 'O QUE DÁ PARA PERSONALIZAR', 'Praticamente tudo. A régua de segurança e apoio é a única coisa que não muda.'),
      row({ width: 'fill_container', gap: 56, alignItems: 'start' }, [
        col({ width: 'fill_container', gap: 0 }, [
          fioForte(),
          ...PERSONALIZAVEL.slice(0, 4).map(([, t, d], i) => linhaPerson(t, d, i === 3)),
          fioForte(),
        ]),
        col({ width: 'fill_container', gap: 0 }, [
          fioForte(),
          ...PERSONALIZAVEL.slice(4).map(([, t, d], i) => linhaPerson(t, d, i === 3)),
          fioForte(),
        ]),
      ]),
    ]),

    /* destinos possíveis — o mesmo índice da agenda */
    col({ width: 'fill_container', fill: COR.papel, alignItems: 'center' }, [
      vao(76),
      row({ width: 'fill_container' }, [
        frame({ width: MARGEM.desktop, height: 1 }),
        col({ width: 'fill_container', gap: 0 }, [
          tituloLista('Destinos que já rodamos', 'Ou proponha outro'),
          ...EXPEDICOES.map((e, i) =>
            linhaIndice({ n: i + 1, titulo: e.destino, colunas: [[e.uf, e.duracao], [e.dificuldade, e.perfil]], foto: fotoExpedicao(e.fotoIdx, 300) }),
          ),
        ]),
        frame({ width: MARGEM.desktop, height: 1 }),
      ]),
      vao(76),
    ]),

    /* formulário em quatro etapas */
    secao({ fundo: COR.branco, nome: 'formulário de orçamento', padY: 84, gap: 30 }, [
      cabecalho('Orçamento', 'MONTE O PEDIDO DO SEU GRUPO', 'Quatro etapas. No fim, a proposta chega no seu e-mail com fotos e valores.'),
      // as etapas como régua numerada
      col({ width: 'fill_container', gap: 0 }, [
        fioForte(),
        row({ width: 'fill_container', padding: 18, gap: 0 }, [
          etapa('01', 'Destino', true),
          etapa('02', 'Grupo'),
          etapa('03', 'Datas'),
          etapa('04', 'Contato'),
        ]),
        fioForte(),
      ]),
      col({ width: 'fill_container', padding: 40, gap: 28, fill: COR.papel }, [
        col({ gap: 10 }, [
          texto('ETAPA 01 DE 04', { ...T.mono, fill: COR.cinza }),
          texto('Para onde vocês querem ir?', { ...T.h2, fill: COR.tinta }),
          texto('Escolha um destino do nosso mapa ou diga qual região você tem em mente. Dá para abrir a página do destino sem perder o que já preencheu.', {
            ...T.corpo, fill: COR.cinza, width: 720,
          }),
        ]),
        col({ width: 'fill_container', gap: 0 }, [
          fio(),
          ...EXPEDICOES.map((e, i) =>
            row({ width: 'fill_container', padding: 18, gap: 18, alignItems: 'center', fill: i === 0 ? COR.branco : undefined, stroke: contorno(COR.linha, { bottom: 1 }) }, [
              frame({ width: 18, height: 18, cornerRadius: 999, fill: i === 0 ? COR.tinta : undefined, stroke: contorno(i === 0 ? COR.tinta : COR.linha, 2) }),
              frame({ width: 70, height: 48, fill: imagem(fotoExpedicao(e.fotoIdx, 250)) }),
              col({ width: 'fill_container', gap: 3 }, [
                texto(`${e.destino} · ${e.uf}`, { ...T.h4, fill: COR.tinta }),
                texto(`${e.duracao} · ${e.dificuldade}`, { ...T.corpoP, fill: COR.cinza }),
              ]),
            ]),
          ),
        ]),
        col({ width: 'fill_container', gap: 8 }, [
          texto('Ou proponha uma região', { ...T.corpoP, fontWeight: '700', fill: COR.tinta }),
          row({ width: 'fill_container', height: 52, padding: 18, alignItems: 'center', fill: COR.branco, stroke: contorno(COR.linha, 1) }, [
            texto('Ex.: Chapada dos Veadeiros, Jalapão, Serra Gaúcha…', { ...T.corpo, fill: COR.cinzaFraco }),
          ]),
        ]),
        fio(),
        row({ width: 'fill_container', alignItems: 'center' }, [
          texto('Leva cerca de 3 minutos.', { ...T.corpoP, fill: COR.cinza }),
          mola(),
          row({ gap: 12 }, [botao('Voltar', { variante: 'contorno' }), botao('Continuar', { seta: true })]),
        ]),
      ]),
      row({ gap: 12, alignItems: 'center' }, [
        texto('↗', { ...T.corpo, fontWeight: '700', fill: COR.tinta }),
        texto('Prefere conversar? Chame no WhatsApp (19) 99711-1188 — o mesmo pedido pode ser feito por lá.', { ...T.corpoP, fill: COR.cinza }),
      ]),
    ]),

    rodape(),
  ]);
}

const publico = (titulo, corpo, foto) =>
  col({ width: 'fill_container', gap: 0, fill: COR.branco }, [
    frame({ width: 'fill_container', height: 190, fill: imagem(foto) }),
    col({ width: 'fill_container', padding: 26, gap: 12 }, [
      texto(titulo, { ...T.h3, fill: COR.tinta }),
      texto(corpo, { ...T.corpoP, fill: COR.cinza, width: 'fill_container' }),
    ]),
  ]);

const linhaPerson = (titulo, corpo, fim) =>
  row({ width: 'fill_container', padding: 20, gap: 20, alignItems: 'start', stroke: fim ? undefined : contorno(COR.linha, { bottom: 1 }) }, [
    texto('↗', { ...T.corpo, fontWeight: '700', fill: COR.tinta, width: 20 }),
    col({ width: 'fill_container', gap: 4 }, [
      texto(titulo, { ...T.h4, fill: COR.tinta }),
      texto(corpo, { ...T.corpoP, fill: COR.cinza, width: 'fill_container' }),
    ]),
  ]);

const etapa = (n, rotulo, ativa = false) =>
  row({ width: 'fill_container', gap: 12, alignItems: 'center' }, [
    texto(n, { ...T.mono, fill: ativa ? COR.tinta : COR.cinzaFraco }),
    texto(rotulo, { ...T.corpo, fontSize: 15, fontWeight: ativa ? '700' : '400', fill: ativa ? COR.tinta : COR.cinza }),
  ]);
