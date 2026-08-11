// Quatro direções para a home, para escolher ANTES de aplicar nas nove telas.
//
// Crítica que originou isto: a primeira proposta ficou destoante do site atual e
// batida (preto + Anton gigante + foto sangrando = fórmula de agência).
// O site de hoje tem uma assinatura própria que eu tinha descartado:
//   fundo claro · composição centrada · blocos pretos com ícone de linha branco.
// As quatro respeitam o guia (P&B estrito, Anton + Archivo) e mudam de postura.
import { col, row, texto, frame, ret, vao, mola } from '../lib/pen.mjs';
import { icone } from '../lib/icones.mjs';
import { FONTE } from '../lib/tokens.mjs';
import { imagem, gradiente, contorno } from '../lib/componentes.mjs';
import { EXPEDICOES, fotoExpedicao, fotoHome } from '../lib/dados.mjs';

const L = 1440;
const M = 120;

/* paleta clara — o cinza do site de hoje, mantido de propósito */
const C = {
  papel: '#F2F2F2',
  branco: '#FFFFFF',
  preto: '#000000',
  tinta: '#111111',
  cinza: '#717171',
  linha: '#D9D9D9',
  linhaForte: '#111111',
};

const t = {
  hero: { fontFamily: FONTE.titulo, fontSize: 58, fontWeight: '400', lineHeight: 1.02, letterSpacing: -0.5 },
  h1: { fontFamily: FONTE.titulo, fontSize: 40, fontWeight: '400', lineHeight: 1.05, letterSpacing: -0.4 },
  h2: { fontFamily: FONTE.titulo, fontSize: 26, fontWeight: '400', lineHeight: 1.1, letterSpacing: -0.3 },
  h3: { fontFamily: FONTE.texto, fontSize: 17, fontWeight: '700', lineHeight: 1.3 },
  corpo: { fontFamily: FONTE.texto, fontSize: 16, fontWeight: '400', lineHeight: 1.6 },
  corpoP: { fontFamily: FONTE.texto, fontSize: 13, fontWeight: '400', lineHeight: 1.5 },
  eti: { fontFamily: FONTE.texto, fontSize: 11, fontWeight: '600', lineHeight: 1.2, letterSpacing: 3 },
  mono: { fontFamily: 'JetBrains Mono', fontSize: 12, fontWeight: '400', lineHeight: 1.4, letterSpacing: 0.4 },
};

/* ── peças claras ── */
const navClara = (fundo = C.preto) =>
  row({ name: 'nav', width: 'fill_container', height: 78, fill: fundo, alignItems: 'center' }, [
    frame({ width: M, height: 1 }),
    row({ width: 'fill_container', gap: 34, alignItems: 'center' }, [
      frame({ name: 'logo', width: 128, height: 30, fill: imagem('https://static.wixstatic.com/media/596511_67f4e0bf83fc4da0b1402969946a5306~mv2.png', 'fit') }),
      ...['Expedições', 'Off Road', 'Vestuário', 'o Desbravando'].map((x) =>
        texto(x, { ...t.corpo, fontSize: 15, fill: '#FFFFFFCC' }),
      ),
      mola(),
      icone('search', { width: 18, height: 18, fill: '#FFFFFFCC' }),
      icone('shopping-bag', { width: 18, height: 18, fill: '#FFFFFFCC' }),
    ]),
    frame({ width: M, height: 1 }),
  ]);

const btn = (rot, { escuro = true, largura, alt = 48, seta = false } = {}) =>
  row(
    {
      height: alt, width: largura, padding: Math.min(24, Math.floor((alt - 4) / 2)), gap: 9,
      alignItems: 'center', justifyContent: 'center',
      fill: escuro ? C.preto : undefined,
      stroke: escuro ? undefined : contorno(C.tinta, 1),
    },
    [
      texto(rot.toUpperCase(), { ...t.eti, letterSpacing: 1.4, fontSize: 12, fill: escuro ? C.branco : C.tinta }),
      seta && icone('arrow-right', { width: 13, height: 13, fill: escuro ? C.branco : C.tinta }),
    ],
  );

const secaoClara = ({ fundo = C.papel, padY = 88, nome, gap = 40, centro = false }, filhos) =>
  col({ name: nome, width: 'fill_container', fill: fundo, alignItems: 'center' }, [
    vao(padY),
    row({ width: 'fill_container' }, [
      frame({ width: M, height: 1 }),
      col({ width: 'fill_container', gap, alignItems: centro ? 'center' : 'start' }, filhos),
      frame({ width: M, height: 1 }),
    ]),
    vao(padY),
  ]);

/* ══════════════════════════════════════════════════════════════
   V1 · CLARO CENTRADO — evolução direta do que já existe
   Mantém fundo claro, composição centrada e o bloco preto com
   ícone. O que muda: o bloco passa a informar, e entram as
   seções que hoje não existem.
   ══════════════════════════════════════════════════════════════ */
export function v1(x, y) {
  const blocoPilar = (ic, titulo, linha1, linha2) =>
    col({ width: 'fill_container', gap: 0, alignItems: 'center' }, [
      col({ width: 'fill_container', height: 300, fill: C.preto, alignItems: 'center', justifyContent: 'center', gap: 22 }, [
        icone(ic, { width: 56, height: 56, fill: C.branco }),
        col({ gap: 6, alignItems: 'center' }, [
          texto(titulo.toUpperCase(), { ...t.h2, fill: C.branco, textAlign: 'center' }),
          texto(linha1, { ...t.corpoP, fill: '#FFFFFF99', textAlign: 'center', width: 260 }),
        ]),
      ]),
      row({ width: 'fill_container', height: 52, fill: C.tinta, alignItems: 'center', justifyContent: 'center', gap: 8, stroke: contorno('#FFFFFF26', { top: 1 }) }, [
        texto(linha2.toUpperCase(), { ...t.eti, letterSpacing: 1.6, fontSize: 12, fill: C.branco }),
        icone('arrow-right', { width: 13, height: 13, fill: C.branco }),
      ]),
    ]);

  return col({ name: 'V1 · Claro centrado (evolução do atual)', x, y, width: L, fill: C.papel, clip: true }, [
    // hero: o vídeo continua, o texto sai de cima dele e vai para o claro — como hoje
    col({ width: 'fill_container', height: 520, fill: imagem(fotoHome(0, 1800)) }, [
      col({ width: 'fill_container', height: 'fill_container', fill: gradiente(180, [['#000000B3', 0], ['#00000000', 0.55]]) }, [navClara('#00000000')]),
    ]),
    secaoClara({ nome: 'chamada', padY: 76, gap: 26, centro: true }, [
      texto('MAIS DO QUE UMA MARCA,\nUM ESTILO DE VIDA', { ...t.hero, fill: C.tinta, textAlign: 'center', width: 'fill_container' }),
      texto('Expedições off-road de UTV pelo Brasil. A gente monta o roteiro, a hospedagem, o apoio mecânico e o resgate — você só dirige.', {
        ...t.corpo, fontSize: 18, fill: C.cinza, textAlign: 'center', width: 700,
      }),
      row({ gap: 12 }, [btn('Ver próximas expedições', { seta: true }), btn('Montar a do meu grupo', { escuro: false })]),
    ]),
    // os três pilares — o gesto que a marca já tem, agora informando
    col({ width: 'fill_container', fill: C.papel, alignItems: 'center' }, [
      row({ width: 'fill_container' }, [
        frame({ width: M, height: 1 }),
        row({ width: 'fill_container', gap: 24 }, [
          blocoPilar('mountain', 'Expedições', 'Roteiro fechado, grupo e estrutura completa', 'Ver a agenda'),
          blocoPilar('car-front', 'Off Road', 'Compra e venda de UTV com avaliação técnica', 'Ver o estoque'),
          blocoPilar('shirt', 'Vestuário', 'Série curta e programa de membros', 'Ver a coleção'),
        ]),
        frame({ width: M, height: 1 }),
      ]),
      vao(88),
    ]),
    // próximas expedições em faixa clara
    secaoClara({ fundo: C.branco, nome: 'próximas', gap: 34 }, [
      row({ width: 'fill_container', alignItems: 'end' }, [
        col({ gap: 10 }, [
          texto('AGENDA 2026', { ...t.eti, fill: C.cinza }),
          texto('PRÓXIMAS EXPEDIÇÕES', { ...t.h1, fill: C.tinta }),
        ]),
        mola(),
        btn('Ver todas', { escuro: false, seta: true, alt: 44 }),
      ]),
      row({ width: 'fill_container', gap: 22 }, EXPEDICOES.slice(0, 3).map((e) =>
        col({ width: 'fill_container', gap: 0 }, [
          frame({ width: 'fill_container', height: 210, fill: imagem(fotoExpedicao(e.fotoIdx, 700)) }),
          col({ width: 'fill_container', padding: 22, gap: 14, fill: C.papel }, [
            texto(e.status.rotulo.toUpperCase(), { ...t.eti, fill: C.cinza }),
            texto(`${e.destino} · ${e.uf}`, { ...t.h2, fill: C.tinta }),
            texto(e.datas, { ...t.corpoP, fill: C.cinza }),
            ret({ width: 'fill_container', height: 1, fill: C.linha }),
            row({ width: 'fill_container', alignItems: 'center' }, [
              texto(e.preco, { ...t.h3, fill: C.tinta }),
              mola(),
              icone('arrow-right', { width: 16, height: 16, fill: C.tinta }),
            ]),
          ]),
        ]),
      )),
    ]),
  ]);
}

/* ══════════════════════════════════════════════════════════════
   V2 · ROADBOOK — caderno de bordo / ficha de expedição
   Fio, numeração, dado tabulado, tipo pequeno. Conversa com o
   vocabulário da marca ("padrão", "operação") e não parece
   template de agência.
   ══════════════════════════════════════════════════════════════ */
export function v2(x, y) {
  const campo = (rot, val, largura) =>
    col({ width: largura || 'fill_container', gap: 7 }, [
      texto(rot.toUpperCase(), { ...t.mono, fontSize: 10, fill: C.cinza }),
      texto(val, { ...t.h3, fill: C.tinta }),
    ]);

  const fio = () => ret({ width: 'fill_container', height: 1, fill: C.linhaForte });

  return col({ name: 'V2 · Roadbook (ficha de expedição)', x, y, width: L, fill: C.branco, clip: true }, [
    navClara(),
    // cabeçalho tipo capa de documento
    col({ width: 'fill_container', fill: C.branco, alignItems: 'center' }, [
      vao(64),
      row({ width: 'fill_container' }, [
        frame({ width: M, height: 1 }),
        col({ width: 'fill_container', gap: 0 }, [
          row({ width: 'fill_container', alignItems: 'end', gap: 20 }, [
            texto('DESBRAVANDO UTV', { ...t.mono, fill: C.cinza }),
            mola(),
            texto('DOC. 001 — AGENDA 2026', { ...t.mono, fill: C.cinza }),
          ]),
          vao(14), fio(), vao(30),
          row({ width: 'fill_container', gap: 60, alignItems: 'start' }, [
            col({ width: 'fill_container', gap: 20 }, [
              texto('EXPEDIÇÕES\nOFF-ROAD DE UTV', { ...t.hero, fontSize: 54, fill: C.tinta }),
              texto('Isso não é passeio. É o padrão Desbravando.', { ...t.corpo, fontSize: 18, fill: C.tinta }),
            ]),
            col({ width: 460, gap: 16 }, [
              texto('A gente reconhece a trilha antes, escolhe a hospedagem, garante apoio mecânico e resgate no comboio, e registra tudo em foto e vídeo.', {
                ...t.corpo, fill: C.cinza, width: 'fill_container',
              }),
              row({ gap: 10 }, [btn('Ver a agenda', { seta: true, alt: 44 }), btn('Grupo fechado', { escuro: false, alt: 44 })]),
            ]),
          ]),
          vao(30), fio(), vao(18),
          row({ width: 'fill_container', gap: 0 }, [
            campo('expedições realizadas', '12'),
            campo('pilotos e famílias', '340+'),
            campo('estados rodados', '9'),
            campo('fotos entregues', '15 mil'),
            campo('próxima saída', '26 ago 2026'),
          ]),
          vao(18), fio(),
        ]),
        frame({ width: M, height: 1 }),
      ]),
      vao(44),
    ]),
    // faixa de fotos catalogadas
    row({ width: 'fill_container', gap: 2, fill: C.branco }, EXPEDICOES.map((e) =>
      col({ width: 'fill_container', gap: 0 }, [
        frame({ width: 'fill_container', height: 190, fill: imagem(fotoExpedicao(e.fotoIdx, 600)) }),
        row({ width: 'fill_container', padding: 10, gap: 8, fill: C.tinta, alignItems: 'center' }, [
          texto(String(e.fotoIdx + 1).padStart(2, '0'), { ...t.mono, fontSize: 10, fill: '#FFFFFF80' }),
          texto(`${e.destino} · ${e.uf}`, { ...t.corpoP, fontWeight: '600', fill: C.branco }),
        ]),
      ]),
    )),
    // a agenda como tabela
    secaoClara({ fundo: C.branco, nome: 'agenda', padY: 64, gap: 22 }, [
      row({ width: 'fill_container', alignItems: 'end' }, [
        texto('AGENDA 2026', { ...t.h1, fill: C.tinta }),
        mola(),
        texto('4 EXPEDIÇÕES · VAGA AVULSA', { ...t.mono, fill: C.cinza }),
      ]),
      col({ width: 'fill_container', gap: 0 }, [
        fio(),
        row({ width: 'fill_container', padding: 12, gap: 20 }, [
          texto('Nº', { ...t.mono, fontSize: 10, fill: C.cinza, width: 40 }),
          texto('DESTINO', { ...t.mono, fontSize: 10, fill: C.cinza, width: 300 }),
          texto('DATAS', { ...t.mono, fontSize: 10, fill: C.cinza, width: 220 }),
          texto('DIAS', { ...t.mono, fontSize: 10, fill: C.cinza, width: 90 }),
          texto('NÍVEL', { ...t.mono, fontSize: 10, fill: C.cinza, width: 130 }),
          texto('A PARTIR DE', { ...t.mono, fontSize: 10, fill: C.cinza, width: 'fill_container' }),
        ]),
        ret({ width: 'fill_container', height: 1, fill: C.linha }),
        ...EXPEDICOES.map((e, i) =>
          row({ width: 'fill_container', padding: 18, gap: 20, alignItems: 'center', stroke: contorno(C.linha, { bottom: 1 }) }, [
            texto(String(i + 1).padStart(2, '0'), { ...t.mono, fill: C.cinza, width: 40 }),
            texto(`${e.destino} · ${e.uf}`, { ...t.h3, fill: C.tinta, width: 300 }),
            texto(e.datas, { ...t.corpo, fontSize: 15, fill: C.tinta, width: 220 }),
            texto(e.duracao, { ...t.corpo, fontSize: 15, fill: C.cinza, width: 90 }),
            texto(e.dificuldade, { ...t.corpo, fontSize: 15, fill: C.cinza, width: 130 }),
            texto(e.preco, { ...t.h3, fill: C.tinta, width: 'fill_container' }),
            btn('Abrir', { escuro: false, alt: 38 }),
          ]),
        ),
      ]),
    ]),
  ]);
}

/* ══════════════════════════════════════════════════════════════
   V3 · ÍNDICE TIPOGRÁFICO — a home abre como um sumário
   Quase sem foto no topo. Os destinos viram uma lista em tipo
   grande, tipo cartaz. Seco, editorial, muito pouco usado.
   ══════════════════════════════════════════════════════════════ */
export function v3(x, y) {
  const linhaDestino = (e, i) =>
    // as colunas fixas precisam caber em 1148px (1200 − padding); com mais que isso
    // a linha vaza para fora, porque nenhuma delas encolhe
    row({ width: 'fill_container', padding: 26, gap: 24, alignItems: 'center', stroke: contorno(C.linhaForte, { bottom: 1 }) }, [
      texto(String(i + 1).padStart(2, '0'), { ...t.mono, fill: C.cinza, width: 44 }),
      texto(e.destino.toUpperCase(), { ...t.h1, fontSize: 44, fill: C.tinta, width: 430 }),
      col({ width: 120, gap: 3 }, [
        texto(e.uf, { ...t.corpoP, fill: C.cinza }),
        texto(e.duracao, { ...t.corpoP, fill: C.cinza }),
      ]),
      col({ width: 190, gap: 3 }, [
        texto(e.datasCurtas, { ...t.corpo, fontSize: 15, fill: C.tinta }),
        texto(e.status.rotulo, { ...t.corpoP, fill: C.cinza }),
      ]),
      mola(),
      frame({ width: 92, height: 62, fill: imagem(fotoExpedicao(e.fotoIdx, 300)) }),
      icone('arrow-right', { width: 20, height: 20, fill: C.tinta }),
    ]);

  return col({ name: 'V3 · Índice tipográfico', x, y, width: L, fill: C.papel, clip: true }, [
    navClara(),
    secaoClara({ nome: 'abertura', padY: 92, gap: 30 }, [
      texto('O DESBRAVANDO', { ...t.eti, fill: C.cinza }),
      texto('ISSO NÃO É PASSEIO.\nÉ O PADRÃO DESBRAVANDO.', { ...t.hero, fontSize: 72, fill: C.tinta, width: 'fill_container' }),
      row({ width: 'fill_container', gap: 60, alignItems: 'start' }, [
        texto('Expedições off-road de UTV pelos destinos mais bonitos do Brasil. Roteiro reconhecido antes, hospedagem escolhida pela equipe, apoio mecânico e resgate no comboio.', {
          ...t.corpo, fontSize: 18, fill: C.cinza, width: 620,
        }),
        mola(),
        col({ gap: 12, alignItems: 'end' }, [btn('Ver a agenda 2026', { seta: true }), btn('Montar a do meu grupo', { escuro: false })]),
      ]),
    ]),
    // o sumário
    col({ width: 'fill_container', fill: C.papel, alignItems: 'center' }, [
      row({ width: 'fill_container' }, [
        frame({ width: M, height: 1 }),
        col({ width: 'fill_container', gap: 0 }, [
          row({ width: 'fill_container', alignItems: 'end', gap: 16 }, [
            texto('AGENDA 2026', { ...t.eti, fill: C.cinza }),
            mola(),
            texto('VAGA AVULSA', { ...t.eti, fill: C.cinza }),
          ]),
          vao(14),
          ret({ width: 'fill_container', height: 2, fill: C.linhaForte }),
          ...EXPEDICOES.map(linhaDestino),
        ]),
        frame({ width: M, height: 1 }),
      ]),
      vao(80),
    ]),
    // faixa preta com os dois formatos — único bloco escuro da página
    row({ width: 'fill_container', height: 260, fill: C.preto }, [
      frame({ width: M, height: 1 }),
      row({ width: 'fill_container', gap: 0, alignItems: 'center' }, [
        col({ width: 'fill_container', gap: 12 }, [
          texto('VAGA AVULSA', { ...t.h2, fill: C.branco }),
          texto('Entre numa expedição já montada. Data fechada, valor por acomodação.', { ...t.corpoP, fill: '#FFFFFFA6', width: 380 }),
        ]),
        ret({ width: 1, height: 120, fill: '#FFFFFF33' }),
        col({ width: 'fill_container', gap: 12, padding: 40 }, [
          texto('GRUPO FECHADO', { ...t.h2, fill: C.branco }),
          texto('A gente monta a expedição do seu grupo — destino, data e roteiro sob medida.', { ...t.corpoP, fill: '#FFFFFFA6', width: 380 }),
        ]),
        col({ gap: 10 }, [
          row({ height: 48, padding: 22, fill: C.branco, alignItems: 'center', justifyContent: 'center', gap: 9 }, [
            texto('SOLICITAR ORÇAMENTO', { ...t.eti, letterSpacing: 1.4, fontSize: 12, fill: C.preto }),
            icone('arrow-right', { width: 13, height: 13, fill: C.preto }),
          ]),
        ]),
      ]),
      frame({ width: M, height: 1 }),
    ]),
  ]);
}

/* ══════════════════════════════════════════════════════════════
   V4 · ESCURO CONTIDO — para quem quer manter o preto
   Mesmo fundo escuro, sem o clichê: nav sólida, foto emoldurada
   em vez de sangrando, tipo médio, grade visível.
   ══════════════════════════════════════════════════════════════ */
export function v4(x, y) {
  const D = { fundo: '#0B0B0B', cartao: '#141414', linha: '#FFFFFF1F', texto: '#FFFFFF', fraco: '#FFFFFF8C' };

  return col({ name: 'V4 · Escuro contido (sem o clichê)', x, y, width: L, fill: D.fundo, clip: true }, [
    navClara(),
    col({ width: 'fill_container', fill: D.fundo, alignItems: 'center' }, [
      vao(72),
      row({ width: 'fill_container' }, [
        frame({ width: M, height: 1 }),
        // foto emoldurada, não sangrando — muda completamente a leitura
        row({ width: 'fill_container', gap: 48, alignItems: 'center' }, [
          col({ width: 'fill_container', gap: 22 }, [
            texto('EXPEDIÇÕES OFF-ROAD DE UTV · BRASIL', { ...t.eti, fill: D.fraco }),
            texto('MAIS DO QUE UMA MARCA,\nUM ESTILO DE VIDA', { ...t.hero, fontSize: 52, fill: D.texto, width: 'fill_container' }),
            texto('A gente monta a expedição inteira — roteiro, hospedagem, apoio mecânico, resgate e o registro em foto e vídeo.', {
              ...t.corpo, fill: D.fraco, width: 'fill_container',
            }),
            vao(4),
            row({ gap: 12 }, [
              row({ height: 48, padding: 22, fill: D.texto, alignItems: 'center', gap: 9 }, [
                texto('VER PRÓXIMAS EXPEDIÇÕES', { ...t.eti, letterSpacing: 1.4, fontSize: 12, fill: C.preto }),
                icone('arrow-right', { width: 13, height: 13, fill: C.preto }),
              ]),
              row({ height: 48, padding: 22, stroke: contorno(D.linha, 1), alignItems: 'center' }, [
                texto('GRUPO FECHADO', { ...t.eti, letterSpacing: 1.4, fontSize: 12, fill: D.texto }),
              ]),
            ]),
          ]),
          frame({ width: 620, height: 420, fill: imagem(fotoExpedicao(0, 900)) }),
        ]),
        frame({ width: M, height: 1 }),
      ]),
      vao(64),
      // faixa de dados com fios, em vez do bloco de números solto
      row({ width: 'fill_container', stroke: contorno(D.linha, { top: 1, bottom: 1 }) }, [
        frame({ width: M, height: 1 }),
        row({ width: 'fill_container' }, [
          ...[['12', 'expedições'], ['340+', 'pilotos'], ['9', 'estados'], ['15 mil', 'fotos entregues']].map(([n, r], i) =>
            row({ width: 'fill_container', padding: 26, gap: 12, alignItems: 'center', stroke: i ? contorno(D.linha, { left: 1 }) : undefined }, [
              texto(n, { ...t.h2, fill: D.texto }),
              texto(r, { ...t.corpoP, fill: D.fraco }),
            ]),
          ),
        ]),
        frame({ width: M, height: 1 }),
      ]),
      vao(64),
      row({ width: 'fill_container' }, [
        frame({ width: M, height: 1 }),
        col({ width: 'fill_container', gap: 26 }, [
          row({ width: 'fill_container', alignItems: 'end' }, [
            texto('PRÓXIMAS EXPEDIÇÕES', { ...t.h1, fill: D.texto }),
            mola(),
            texto('VER TODAS', { ...t.eti, fill: D.fraco }),
          ]),
          row({ width: 'fill_container', gap: 20 }, EXPEDICOES.slice(0, 3).map((e) =>
            row({ width: 'fill_container', gap: 0, fill: D.cartao, stroke: contorno(D.linha, 1) }, [
              frame({ width: 118, height: 'fill_container', fill: imagem(fotoExpedicao(e.fotoIdx, 400)) }),
              col({ width: 'fill_container', padding: 20, gap: 10 }, [
                texto(e.status.rotulo.toUpperCase(), { ...t.eti, fontSize: 10, fill: D.fraco }),
                texto(`${e.destino} · ${e.uf}`, { ...t.h2, fontSize: 22, fill: D.texto }),
                texto(e.datasCurtas, { ...t.corpoP, fill: D.fraco }),
                ret({ width: 'fill_container', height: 1, fill: D.linha }),
                texto(e.preco, { ...t.h3, fill: D.texto }),
              ]),
            ]),
          )),
        ]),
        frame({ width: M, height: 1 }),
      ]),
      vao(72),
    ]),
  ]);
}
