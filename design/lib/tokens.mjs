// Design tokens — direção V3 · ÍNDICE TIPOGRÁFICO.
//
// FONTE DA VERDADE da marca: marca/IDENTIDADE_VISUAL.md (o SPEC_MD embutido no
// Estúdio de Briefing) + o arquivo do logo (100% dos pixels opacos são #FFFFFF).
// P&B estrito: "a única cor, quando há, vem da fotografia".
//
// POR QUE CLARO, E NÃO PRETO: o site de hoje é claro (#F2F2F2), com composição
// centrada e blocos pretos. A primeira proposta virou tudo preto e ficou destoante —
// era um site novo, não uma repaginação. Aqui o preto vira PONTUAÇÃO (nav, faixa de
// pausa, botão), não o fundo.
//
// A postura da V3: a página abre como um SUMÁRIO, não como uma vitrine. Tipo grande,
// fio fino, dado tabulado, foto pequena e contida. Nada de foto sangrando com título
// gigante por cima — que é a fórmula batida.

export const COR = {
  papel: '#F2F2F2',  // fundo — o mesmo cinza do site atual
  branco: '#FFFFFF', // faixa de leitura longa e cartão
  preto: '#000000',  // nav, faixa de pausa, botão sólido
  tinta: '#111111',  // texto principal
  cinza: '#717171',  // texto secundário — também o do site atual
  cinzaFraco: '#9A9A9A',
  linha: '#D9D9D9',  // fio leve, entre itens
  fio: '#111111',    // fio forte, abre e fecha lista

  // sobre as faixas pretas
  sBranco: '#FFFFFF',
  s82: '#FFFFFFD1',
  s55: '#FFFFFF8C',
  s38: '#FFFFFF61',
  sLinha: '#FFFFFF29',

  // acento da marca — raro, e NÃO usado no site (fica declarado)
  azul: '#2F80ED',
  verde: '#1FA35A',
};

export const FONTE = { titulo: 'Anton', texto: 'Archivo', mono: 'JetBrains Mono' };

export const T = {
  display: { fontFamily: FONTE.titulo, fontSize: 72, fontWeight: '400', lineHeight: 1.0, letterSpacing: -0.5 },
  h1: { fontFamily: FONTE.titulo, fontSize: 48, fontWeight: '400', lineHeight: 1.04, letterSpacing: -0.4 },
  h2: { fontFamily: FONTE.titulo, fontSize: 34, fontWeight: '400', lineHeight: 1.08, letterSpacing: -0.4 },
  h3: { fontFamily: FONTE.titulo, fontSize: 24, fontWeight: '400', lineHeight: 1.12, letterSpacing: -0.3 },
  // o nome do destino nas linhas do índice
  indice: { fontFamily: FONTE.titulo, fontSize: 44, fontWeight: '400', lineHeight: 1.0, letterSpacing: -0.4 },
  h4: { fontFamily: FONTE.texto, fontSize: 17, fontWeight: '700', lineHeight: 1.3 },
  corpoG: { fontFamily: FONTE.texto, fontSize: 18, fontWeight: '400', lineHeight: 1.6 },
  corpo: { fontFamily: FONTE.texto, fontSize: 16, fontWeight: '400', lineHeight: 1.6 },
  corpoP: { fontFamily: FONTE.texto, fontSize: 13.5, fontWeight: '400', lineHeight: 1.5 },
  eti: { fontFamily: FONTE.texto, fontSize: 11, fontWeight: '600', lineHeight: 1.2, letterSpacing: 3 },
  mono: { fontFamily: FONTE.mono, fontSize: 12, fontWeight: '400', lineHeight: 1.4, letterSpacing: 0.4 },
  botao: { fontFamily: FONTE.texto, fontSize: 12, fontWeight: '600', lineHeight: 1, letterSpacing: 1.4 },
};

export const TM = {
  display: { fontFamily: FONTE.titulo, fontSize: 38, fontWeight: '400', lineHeight: 1.02, letterSpacing: -0.4 },
  h1: { fontFamily: FONTE.titulo, fontSize: 30, fontWeight: '400', lineHeight: 1.04, letterSpacing: -0.4 },
  h2: { fontFamily: FONTE.titulo, fontSize: 24, fontWeight: '400', lineHeight: 1.08, letterSpacing: -0.3 },
  h3: { fontFamily: FONTE.titulo, fontSize: 19, fontWeight: '400', lineHeight: 1.12, letterSpacing: -0.2 },
  indice: { fontFamily: FONTE.titulo, fontSize: 27, fontWeight: '400', lineHeight: 1.0, letterSpacing: -0.3 },
  h4: { fontFamily: FONTE.texto, fontSize: 15, fontWeight: '700', lineHeight: 1.3 },
  corpoG: { fontFamily: FONTE.texto, fontSize: 16, fontWeight: '400', lineHeight: 1.55 },
  corpo: { fontFamily: FONTE.texto, fontSize: 15, fontWeight: '400', lineHeight: 1.55 },
  corpoP: { fontFamily: FONTE.texto, fontSize: 12.5, fontWeight: '400', lineHeight: 1.45 },
  eti: { fontFamily: FONTE.texto, fontSize: 10, fontWeight: '600', lineHeight: 1.2, letterSpacing: 2.4 },
  mono: { fontFamily: FONTE.mono, fontSize: 11, fontWeight: '400', lineHeight: 1.4, letterSpacing: 0.3 },
  botao: { fontFamily: FONTE.texto, fontSize: 12, fontWeight: '600', lineHeight: 1, letterSpacing: 1.2 },
};

export const LARGURA = { desktop: 1440, conteudo: 1200, mobile: 390 };
export const MARGEM = { desktop: 120, mobile: 20 };
// canto reto em quase tudo: a marca é dura e a linguagem é de documento
export const RAIO = { nenhum: 0, foto: 0, pill: 999 };
export const TRACO = { leve: 1, forte: 2 };

/** Logo completo (montanha + letreiro), o arquivo que já está no ar. */
export const LOGO_URL = 'https://static.wixstatic.com/media/596511_67f4e0bf83fc4da0b1402969946a5306~mv2.png';

/**
 * Só a montanha — pedido do cliente (v2): "remover o texto Desbravando UTV, mantendo
 * apenas o ícone da montanha". Recortada do arquivo oficial (a faixa transparente em
 * y 380–420 separa a montanha do letreiro), reduzida para 300px e embutida em base64
 * para não depender de rede nem de hospedagem.
 */
import fs from 'node:fs';
import { arte } from './artes.mjs';
// O arquivo é arte do cliente e fica fora do git (ver design/lib/artes.mjs).
const _b64 = fs.readFileSync(arte('marca', 'logo-montanha.b64'), 'utf8').trim();
export const LOGO_MONTANHA = `data:image/png;base64,${_b64}`;
export const LOGO_MONTANHA_PROPORCAO = 300 / 83; // 3.61, gerado por atualizar-logo.py // 2,65

export const VARIAVEIS = {
  '--papel': { type: 'color', value: COR.papel },
  '--branco': { type: 'color', value: COR.branco },
  '--preto': { type: 'color', value: COR.preto },
  '--tinta': { type: 'color', value: COR.tinta },
  '--cinza': { type: 'color', value: COR.cinza },
  '--linha': { type: 'color', value: COR.linha },
  '--fio': { type: 'color', value: COR.fio },
  '--sobre-preto-82': { type: 'color', value: COR.s82 },
  '--sobre-preto-55': { type: 'color', value: COR.s55 },
  '--acento-azul-raro': { type: 'color', value: COR.azul },
  '--acento-verde-raro': { type: 'color', value: COR.verde },
  '--fonte-titulo': { type: 'string', value: FONTE.titulo },
  '--fonte-texto': { type: 'string', value: FONTE.texto },
  '--fonte-mono': { type: 'string', value: FONTE.mono },
};
