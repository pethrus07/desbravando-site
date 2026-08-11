// Telas mobile — 390px. Os documentos repetem que o celular é PRIORIDADE ("foco
// principal na experiência mobile"), então cada mudança da v3 aparece aqui também:
//   · cards de formato SEM foto, um embaixo do outro
//   · galeria com a próxima foto espiando na borda (pedido literal)
//   · roteiro sem foto nenhuma
//   · as duas hospedagens dentro do mesmo módulo
//   · reserva por pessoa / por casal, sem escolha de quarto
//   · rodapé com montanha, links numa linha e sem telefone
import { col, row, texto, frame, ret, vao, mola } from '../lib/pen.mjs';
import { COR, TM, LARGURA, MARGEM } from '../lib/tokens.mjs';
import {
  navMobile, barraReservaMobile, secaoMobile, botao, overline, fio, fioForte,
  cardFormato, carrosselPeek, linhaRoteiro, entradaHospedagem, blocoIncluso,
  blocoNaoIncluso, painelReservaMobile, chamadaInteresseMobile,
  itemLista, status, videoCheio, rodapeMobile, marca, imagem, contorno, icone,
} from '../lib/componentes.mjs';
import {
  MARCA, DESTAQUES, FORMATOS, PILARES, EXPEDICOES, PERGUNTAS, GUIA,
  COSTA_DOCE, ROTEIRO_COSTA, HOSPEDAGENS, HOSPEDAGEM_NOTA, INCLUSO_COSTA,
  NAO_INCLUSO_COSTA, RESERVA, BOTAO_POR_SITUACAO, fotoExpedicao, fotoHome,
} from '../lib/dados.mjs';

const L = LARGURA.mobile;
const M = MARGEM.mobile;

/** Bloco de largura total com o recuo lateral do celular. */
const faixaM = (props, filhos) =>
  col({ width: 'fill_container', alignItems: 'center', ...props }, [
    row({ width: 'fill_container' }, [
      frame({ width: M, height: 1 }),
      col({ width: 'fill_container', gap: props.gap ?? 16 }, filhos),
      frame({ width: M, height: 1 }),
    ]),
  ]);

/** Card de expedição no celular: foto grande, FORMATO no lugar da dificuldade. */
const cardExpM = (e, i) =>
  col({ width: 'fill_container', gap: 0, stroke: contorno(COR.linha, { bottom: 1 }) }, [
    frame({ width: 'fill_container', height: 210, fill: imagem(fotoExpedicao(e.fotoIdx, 700)) }),
    col({ width: 'fill_container', padding: 18, gap: 10 }, [
      row({ gap: 10, alignItems: 'center' }, [
        texto(String(i + 1).padStart(2, '0'), { ...TM.mono, fill: COR.cinzaFraco }),
        texto(`${e.uf} · ${e.duracao} · ${e.formato}`, { ...TM.corpoP, fill: COR.cinza }),
      ]),
      texto(e.destino.toUpperCase(), { ...TM.indice, fill: COR.tinta, width: 'fill_container' }),
      texto(e.datasCurtas, { ...TM.corpo, fill: COR.cinza }),
      status(e.status.rotulo, e.status.tipo, TM),
      row({ width: 'fill_container', alignItems: 'center' }, [
        mola(),
        texto('VER EXPEDIÇÃO →', { ...TM.botao, fill: COR.tinta }),
      ]),
    ]),
  ]);

/* ═══════════════ M1 · HOME ═══════════════ */

export function homeMobile(x, y) {
  return col({ name: 'M1 · Home (mobile)', x, y, width: L, fill: COR.papel, clip: true }, [
    navMobile(),

    /* vídeo primeiro */
    videoCheio(fotoHome(0, 900), { altura: 380, rotulo: 'vídeo de abertura', esc: TM }),

    /* posicionamento — módulo aprovado */
    secaoMobile({ nome: 'posicionamento', padY: 40, gap: 16 }, [
      overline('o Desbravando', TM),
      texto(MARCA.titulo, { ...TM.display, fill: COR.tinta, width: 'fill_container' }),
      texto(MARCA.posicionamento, { ...TM.corpo, fill: COR.cinza, width: 'fill_container' }),
    ]),

    /* destaques — um banner por vez */
    col({ name: 'destaques', width: 'fill_container', height: 420, fill: imagem(fotoExpedicao(DESTAQUES[0].fotoIdx, 800)) }, [
      col({ width: 'fill_container', height: 'fill_container', fill: '#00000099', justifyContent: 'end' }, [
        faixaM({ gap: 12 }, [
          texto(DESTAQUES[0].etiqueta.toUpperCase(), { ...TM.eti, fill: '#FFFFFFA6' }),
          texto(DESTAQUES[0].titulo, { ...TM.h1, fill: COR.branco, width: 'fill_container' }),
          texto(DESTAQUES[0].texto, { ...TM.corpoP, fill: '#FFFFFFD1', width: 'fill_container' }),
          botao(DESTAQUES[0].cta, { variante: 'claro', seta: true, largura: 'fill_container', esc: TM, alt: 48 }),
        ]),
        vao(16),
        row({ width: 'fill_container', gap: 6, justifyContent: 'center' },
          DESTAQUES.map((_, i) => ret({ width: i === 0 ? 20 : 6, height: 3, fill: i === 0 ? COR.branco : '#FFFFFF59' })),
        ),
        vao(16),
      ]),
    ]),

    /* expedições — DUAS ETAPAS também no celular: a apresentação fica no cinza do
       papel, os dois formatos num plano branco logo abaixo. Sem nenhuma foto. */
    secaoMobile({ nome: 'expedições · etapa 1', padY: 40, gap: 14 }, [
      overline('Expedições', TM),
      texto('ESCOLHA A EXPERIÊNCIA QUE COMBINA COM VOCÊ.', { ...TM.h1, fill: COR.tinta, width: 'fill_container' }),
      texto('Dois formatos de expedições desenvolvidos para diferentes perfis, com o mesmo padrão de organização, segurança e experiência Desbravando.', {
        ...TM.corpo, fill: COR.cinza, width: 'fill_container',
      }),
    ]),
    col({ name: 'expedições · etapa 2', width: 'fill_container', gap: 0, fill: COR.branco },
      FORMATOS.map((f, i) =>
        col({ width: 'fill_container', gap: 0, stroke: i === 0 ? undefined : contorno(COR.linha, { top: 1 }) }, [
          cardFormato({ ...f, primeiro: true, esc: TM, pad: 22 }),
        ]),
      ),
    ),
    vao(40),

    /* galeria — carrossel com a PRÓXIMA FOTO ESPIANDO, como ele pediu */
    faixaM({ gap: 10 }, [
      overline('Galeria', TM),
      texto('O QUE ACONTECE QUANDO A ESTRADA ACABA.', { ...TM.h1, fill: COR.tinta, width: 'fill_container' }),
    ]),
    vao(16),
    carrosselPeek({ fotos: EXPEDICOES.map((e) => fotoExpedicao(e.fotoIdx, 700)), altura: 230 }),
    vao(36),

    /* parceiros — centrado, logomarca em cima e frase de apoio embaixo */
    col({ name: 'parceiros oficiais', width: 'fill_container', fill: COR.branco, alignItems: 'center' }, [
      vao(44),
      frame({ name: 'logo/Can-Am', width: 150, height: 46, layout: 'horizontal', alignItems: 'center', justifyContent: 'center' }, [
        texto('Can-Am', { ...TM.h2, fill: COR.cinzaFraco }),
      ]),
      vao(18),
      overline('Parceira oficial das Expedições', TM),
      vao(10),
      faixaM({ gap: 0 }, [
        texto('Ao lado de quem compartilha a mesma paixão.', {
          ...TM.h2, fill: COR.tinta, textAlign: 'center', width: 'fill_container',
        }),
      ]),
      vao(44),
    ]),

    /* depoimentos — módulo aprovado */
    secaoMobile({ nome: 'quem já foi', padY: 40, gap: 16 }, [
      overline('Quem já foi', TM),
      texto('A EXPEDIÇÃO ACABA.\nO GRUPO CONTINUA.', { ...TM.h1, fill: COR.tinta, width: 'fill_container' }),
      col({ width: 'fill_container', gap: 0 }, [
        fioForte(),
        col({ width: 'fill_container', padding: 18, gap: 10 }, [
          texto('↗', { ...TM.h3, fill: COR.tinta }),
          texto('“Foi a primeira vez que levei minha mulher e meus dois filhos numa expedição. Não faltou nada — e é isso que faz a diferença.”', {
            ...TM.corpo, fill: COR.tinta, width: 'fill_container',
          }),
          texto('Participante da 2ª Expedição Família', { ...TM.corpoP, fill: COR.cinza }),
        ]),
        fioForte(),
      ]),
    ]),

    /* comunidade — o único módulo centrado, e a única pausa preta da Home */
    col({ name: 'comunidade', width: 'fill_container', fill: COR.preto, alignItems: 'center' }, [
      vao(48),
      marca(28),
      vao(18),
      faixaM({ gap: 14 }, [
        texto('Faça parte da\nComunidade Desbravando', { ...TM.h1, fill: COR.branco, textAlign: 'center', width: 'fill_container' }),
        texto('Cada nova experiência e cada nova conquista fortalecem sua trajetória e desbloqueiam benefícios exclusivos.', {
          ...TM.corpo, fill: COR.s82, textAlign: 'center', width: 'fill_container',
        }),
      ]),
      vao(22),
      botao('Conheça sua jornada', { variante: 'claro', seta: true, esc: TM, alt: 48 }),
      vao(48),
    ]),

    /* três pilares — foto reduzida a selo, o texto manda */
    secaoMobile({ nome: 'três pilares', padY: 40, gap: 16 }, [
      overline('As três frentes', TM),
      texto('TRÊS PILARES.\nUMA ÚNICA PAIXÃO.', { ...TM.h1, fill: COR.tinta, width: 'fill_container' }),
      texto('Conheça as três frentes que dão vida ao universo Desbravando.', { ...TM.corpo, fill: COR.cinza, width: 'fill_container' }),
      col({ width: 'fill_container', gap: 0 }, [
        fioForte(),
        ...PILARES.map((p, i) =>
          // sem foto: o Pedro tirou o selo em 08/08, e numa seção de três palavras
          // qualquer imagem rouba a leitura
          col({ width: 'fill_container', padding: 18, gap: 6, stroke: i === PILARES.length - 1 ? undefined : contorno(COR.linha, { bottom: 1 }) }, [
            texto(p.n, { ...TM.mono, fill: COR.cinzaFraco }),
            texto(p.titulo, { ...TM.h2, fill: COR.tinta }),
            texto(p.mantra, { ...TM.corpoP, fill: COR.cinza, width: 'fill_container' }),
          ]),
        ),
        fioForte(),
      ]),
    ]),

    rodapeMobile(),
  ]);
}

/* ═══════════════ M2 · PÁGINA DA EXPEDIÇÃO ═══════════════ */

export function destinoMobile(x, y) {
  const E = COSTA_DOCE;
  const CHAMADA = BOTAO_POR_SITUACAO[E.status.tipo] || 'Fazer pré-reserva';

  return col({ name: 'M2 · Página da Expedição (mobile)', x, y, width: L, fill: COR.papel, clip: true }, [
    navMobile(),

    /* foto grande primeiro, título depois — pedido dele ainda na v2 */
    videoCheio(fotoExpedicao(3, 900), { altura: 320, rotulo: 'vídeo da expedição', esc: TM }),

    secaoMobile({ nome: 'apresentação', padY: 32, gap: 14 }, [
      overline(`Expedição ${E.nome} · Grupo Avulso`, TM),
      texto('COSTA DOCE\nRIO GRANDE DO SUL', { ...TM.display, fill: COR.tinta, width: 'fill_container' }),
      texto(E.datas, { ...TM.corpo, fill: COR.cinza, width: 'fill_container' }),
      status(E.status.rotulo, E.status.tipo, TM),
      botao(CHAMADA, { seta: true, largura: 'fill_container', esc: TM, alt: 50 }),
    ]),

    /* resumo da expedição — módulo aprovado, dois dados por linha */
    faixaM({ fill: COR.branco, gap: 0 }, [
      vao(18),
      fioForte(),
      ...[[E.dados[0], E.dados[1]], [E.dados[2], E.dados[3]], [E.dados[4], E.dados[5]]].map(([a, b], i, arr) =>
        row({ width: 'fill_container', padding: 14, gap: 14, stroke: i === arr.length - 1 ? undefined : contorno(COR.linha, { bottom: 1 }) }, [
          col({ width: 'fill_container', gap: 3 }, [
            texto(a[0].toUpperCase(), { ...TM.mono, fontSize: 9, fill: COR.cinza }),
            texto(a[1], { ...TM.h4, fill: COR.tinta, width: 'fill_container' }),
          ]),
          col({ width: 'fill_container', gap: 3 }, [
            texto(b[0].toUpperCase(), { ...TM.mono, fontSize: 9, fill: COR.cinza }),
            texto(b[1], { ...TM.h4, fill: COR.tinta, width: 'fill_container' }),
          ]),
        ]),
      ),
      fioForte(),
      vao(18),
    ]),
    vao(28),

    /* galeria — a próxima foto espiando */
    faixaM({ gap: 8 }, [
      overline('Registro', TM),
      texto('A EXPEDIÇÃO POR DENTRO', { ...TM.h1, fill: COR.tinta, width: 'fill_container' }),
    ]),
    vao(14),
    carrosselPeek({ fotos: [3, 0, 1, 2].map((i) => fotoExpedicao(i, 700)), altura: 250 }),
    vao(28),

    secaoMobile({ fundo: COR.branco, nome: 'sobre', padY: 36, gap: 14 }, [
      overline('O destino', TM),
      texto('O TRECHO MAIS BRUTO DO LITORAL GAÚCHO.', { ...TM.h1, fill: COR.tinta, width: 'fill_container' }),
      texto(E.sobre, { ...TM.corpo, fill: COR.cinza, width: 'fill_container' }),
    ]),

    /* roteiro — SEM foto nenhuma, régua tipográfica */
    secaoMobile({ nome: 'roteiro', padY: 36, gap: 14 }, [
      overline('Roteiro', TM),
      texto('DIA A DIA', { ...TM.h1, fill: COR.tinta }),
      col({ width: 'fill_container', gap: 0 }, [
        fioForte(),
        ...ROTEIRO_COSTA.map(([dia, data, local, titulo, corpo, km], i) =>
          linhaRoteiro({ dia, data, local, titulo, texto: corpo, km, primeira: i === 0, esc: TM }),
        ),
        fioForte(),
      ]),
    ]),

    /* hospedagem — as DUAS dentro do mesmo módulo */
    secaoMobile({ fundo: COR.branco, nome: 'hospedagem', padY: 36, gap: 14 }, [
      overline('Hospedagem', TM),
      texto('ONDE O GRUPO FICA', { ...TM.h1, fill: COR.tinta }),
      texto(HOSPEDAGEM_NOTA, { ...TM.corpoP, fill: COR.cinza, width: 'fill_container' }),
      col({ width: 'fill_container', gap: 0 }, [
        fioForte(),
        ...HOSPEDAGENS.map((h, i) =>
          entradaHospedagem({ h, fotos: h.fotos.slice(0, 2).map((f) => fotoExpedicao(f, 500)), primeira: i === 0, esc: TM }),
        ),
        fioForte(),
      ]),
    ]),

    /* incluso — inventário numerado, uma coluna */
    secaoMobile({ nome: 'incluso', padY: 36, gap: 14 }, [
      overline('O pacote', TM),
      texto('O QUE ESTÁ INCLUSO', { ...TM.h1, fill: COR.tinta }),
      blocoIncluso({ itens: INCLUSO_COSTA, esc: TM, colunas: 1 }),
    ]),

    /* reserva — por pessoa / por casal. Sem escolha de quarto. */
    col({ name: 'reserva', width: 'fill_container', fill: COR.preto, alignItems: 'center' }, [
      vao(40),
      faixaM({ gap: 16 }, [
        texto('RESERVA', { ...TM.eti, fill: COR.s55 }),
        texto('O INVESTIMENTO DA EXPEDIÇÃO', { ...TM.h1, fill: COR.branco, width: 'fill_container' }),
        painelReservaMobile({ reserva: RESERVA, chamada: CHAMADA }),
      ]),
      vao(40),
    ]),

    /* não incluso — o mais leve da página */
    secaoMobile({ nome: 'não incluso', padY: 32, gap: 12 }, [
      overline('Complemento', TM),
      texto('O QUE NÃO ESTÁ INCLUSO', { ...TM.h2, fill: COR.tinta, width: 'fill_container' }),
      col({ width: 'fill_container', gap: 0 }, [
        fio(),
        ...NAO_INCLUSO_COSTA.map((t, i) =>
          row({ width: 'fill_container', padding: 13, gap: 14, alignItems: 'start', stroke: contorno(COR.linha, { bottom: 1 }) }, [
            texto(String(i + 1).padStart(2, '0'), { ...TM.mono, fill: COR.cinzaFraco, width: 24 }),
            texto(t, { ...TM.corpoP, fill: COR.cinza, width: 'fill_container' }),
          ]),
        ),
      ]),
    ]),

    /* guia da expedição */
    secaoMobile({ fundo: COR.branco, nome: 'guia', padY: 36, gap: 14 }, [
      overline('Guia da expedição', TM),
      texto('ENCONTRE QUALQUER INFORMAÇÃO', { ...TM.h1, fill: COR.tinta, width: 'fill_container' }),
      texto('Pesquise um termo ou navegue pelos tópicos. É a mesma base que o atendimento consulta.', { ...TM.corpo, fill: COR.cinza, width: 'fill_container' }),
      row({ width: 'fill_container', height: 50, padding: 16, gap: 12, alignItems: 'center', stroke: contorno(COR.fio, { bottom: 1.5 }) }, [
        icone('search', { width: 17, height: 17, fill: COR.cinza }),
        texto('hotel, transfer, check-in, clima…', { ...TM.corpo, fill: COR.cinzaFraco, width: 'fill_container' }),
      ]),
      col({ width: 'fill_container', gap: 0 }, [
        fioForte(),
        ...GUIA.slice(0, 6).map(([nome, qtd], i) =>
          row({ width: 'fill_container', padding: 15, gap: 12, alignItems: 'center', stroke: i === 5 ? undefined : contorno(COR.linha, { bottom: 1 }) }, [
            texto(String(i + 1).padStart(2, '0'), { ...TM.mono, fontSize: 10, fill: COR.cinzaFraco, width: 24 }),
            texto(nome, { ...TM.h4, fill: COR.tinta, width: 'fill_container' }),
            texto(qtd, { ...TM.mono, fontSize: 10, fill: COR.cinzaFraco }),
            icone('arrow-right', { width: 15, height: 15, fill: COR.tinta }),
          ]),
        ),
        fioForte(),
      ]),
    ]),

    /* faq */
    secaoMobile({ nome: 'faq', padY: 36, gap: 14 }, [
      overline('Dúvidas', TM),
      texto('PERGUNTAS FREQUENTES', { ...TM.h1, fill: COR.tinta, width: 'fill_container' }),
      col({ width: 'fill_container', gap: 0 }, [
        fioForte(),
        ...PERGUNTAS.slice(0, 5).map(([p], i) =>
          row({ width: 'fill_container', padding: 16, gap: 12, alignItems: 'center', stroke: i === 4 ? undefined : contorno(COR.linha, { bottom: 1 }) }, [
            texto(p, { ...TM.corpo, fontWeight: '600', fill: COR.tinta, width: 'fill_container' }),
            texto('+', { ...TM.h3, fill: COR.cinza }),
          ]),
        ),
        fioForte(),
      ]),
    ]),

    /* A barra de reserva vem ANTES do rodapé.
       Ela estava depois, e no PDF isso a fazia parecer um botão solto encerrando a
       página — foi exatamente a leitura do cliente ("botões de ação no rodapé, sem
       função clara"). Ela não é conteúdo de rodapé: é a barra que acompanha a rolagem
       na página da expedição. A anotação abaixo existe só no material de aprovação. */
    vao(28),
    row({ width: 'fill_container' }, [
      frame({ width: M, height: 1 }),
      texto('▼ BARRA FIXA · ACOMPANHA A ROLAGEM DA PÁGINA', { ...TM.mono, fontSize: 9, fill: COR.cinzaFraco }),
      frame({ width: M, height: 1 }),
    ]),
    vao(8),
    // o valor ainda não veio no dossiê — a barra mostra a fase comercial, não um preço
    barraReservaMobile(E.status.rotulo, CHAMADA),
    vao(28),

    rodapeMobile(),
  ]);
}

/* ═══════════════ M3 · GRUPO AVULSO ═══════════════ */

export function agendaMobile(x, y) {
  return col({ name: 'M3 · Grupo Avulso (mobile)', x, y, width: L, fill: COR.papel, clip: true }, [
    navMobile(),

    secaoMobile({ nome: 'abertura', padY: 36, gap: 14 }, [
      overline('Grupo Avulso', TM),
      texto('PRÓXIMAS EXPEDIÇÕES', { ...TM.display, fill: COR.tinta, width: 'fill_container' }),
      texto('Escolha seu próximo destino, conheça todos os detalhes da expedição e reserve sua vaga em um grupo já formado.', {
        ...TM.corpo, fill: COR.cinza, width: 'fill_container',
      }),
    ]),

    /* transição — a mesma faixa preta do desktop, para a primeira foto da agenda não
       parecer continuação do hero */
    row({ name: 'transição · começa a agenda', width: 'fill_container', height: 54, fill: COR.preto, alignItems: 'center' }, [
      frame({ width: M, height: 1 }),
      overline('Agenda 2026', TM, COR.s82),
      mola(),
      texto(`${EXPEDICOES.length} expedições`, { ...TM.mono, fill: COR.s55 }),
      frame({ width: M, height: 1 }),
    ]),
    vao(28),

    /* agenda — foto grande, FORMATO no lugar do nível, sem valor */
    col({ name: 'agenda', width: 'fill_container', gap: 0 }, [
      fioForte(),
      ...EXPEDICOES.map(cardExpM),
    ]),
    vao(44),

    /* faq logo abaixo da agenda */
    secaoMobile({ fundo: COR.branco, nome: 'faq', padY: 40, gap: 14 }, [
      overline('Dúvidas', TM),
      texto('PERGUNTAS FREQUENTES', { ...TM.h1, fill: COR.tinta, width: 'fill_container' }),
      col({ width: 'fill_container', gap: 0 }, [
        fioForte(),
        ...PERGUNTAS.slice(0, 5).map(([p], i) =>
          row({ width: 'fill_container', padding: 16, gap: 12, alignItems: 'center', stroke: i === 4 ? undefined : contorno(COR.linha, { bottom: 1 }) }, [
            texto(p, { ...TM.corpo, fontWeight: '600', fill: COR.tinta, width: 'fill_container' }),
            texto('+', { ...TM.h3, fill: COR.cinza }),
          ]),
        ),
        fioForte(),
      ]),
    ]),

    /* chamada final — mesmo conteúdo, composição nova (não é mais faixa preta) */
    chamadaInteresseMobile({
      over: 'Novas expedições',
      titulo: 'AINDA NÃO ENCONTROU SUA PRÓXIMA EXPERIÊNCIA?',
      texto:
        'Nossa agenda é atualizada constantemente. Cadastre seu interesse e seja avisado quando uma nova expedição estiver disponível para o seu perfil.',
      placeholder: 'seu e-mail',
      acao: 'Avise-me sobre novas expedições',
    }),

    rodapeMobile(),
  ]);
}
