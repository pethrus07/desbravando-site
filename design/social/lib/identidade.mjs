// Os dois REGISTROS da marca, como tokens.
// Fonte da verdade: marca/IDENTIDADE_VISUAL.md.
//
// A peça é a MESMA nos dois: mesmos ossos (Anton + Archivo, sobrelinha, pílula,
// divisor 1,5px, escada de opacidade). O que troca é só a paleta — é exatamente
// o que o guia manda ("mesmos ossos, o P&B abre pra cor").

/** Escada de opacidade do guia: .82 texto secundário / .55 label / .38 borda / .13 divisor. */
const escada = (base) => ({
  t82: `${base}D1`,
  t55: `${base}8C`,
  borda: `${base}61`,
  divisor: `${base}21`,
});

/**
 * NÚCLEO — P&B estrito. É o desempate do guia: "na dúvida, é núcleo".
 * Sem nenhuma cor de destaque: a hierarquia vem de peso e opacidade.
 */
export const NUCLEO = {
  nome: 'nucleo',
  rotulo: 'Núcleo — P&B estrito (padrão do Estúdio de Briefing)',
  fundo: '#000000',
  texto: '#FFFFFF',
  acento: '#FFFFFF', // no núcleo o "acento" não é cor, é branco cheio
  acentoEhCor: false,
  logo: '#FFFFFF',
  montanha: '#FFFFFF14', // marca d'água discreta
  ...escada('#FFFFFF'),
};

/**
 * EVENTO — a paleta da imagem base que o cliente já publica (tabela de preços):
 * fundo marinho + verde-limão. NÃO está registrada no guia — ver o README.
 * Hex AMOSTRADOS A OLHO da imagem base; confirmar no arquivo-fonte.
 */
export const EVENTO = {
  nome: 'evento',
  rotulo: 'Evento — marinho + verde-limão (paleta da imagem base)',
  fundo: '#151E5F',
  texto: '#FFFFFF',
  acento: '#A2D62E',
  acentoEhCor: true,
  logo: '#A2D62E',
  montanha: '#A2D62E',
  ...escada('#FFFFFF'),
};

export const TEMAS = { nucleo: NUCLEO, evento: EVENTO };

/** Feed 4:5 — o formato de arte única da tabela de formatos do guia. */
export const FEED = { largura: 1080, altura: 1350 };

/* ── recortes do arquivo do logo (2300×813) ──
   O logo é um lockup: montanha em cima, "DESBRAVANDO UTV" embaixo. Para usar a
   montanha sozinha como elemento gráfico, recorto ela por máscara em vez de
   gerar um segundo arquivo. */
export const LOGO = { largura: 2300, altura: 813 };
export const MONTANHA = { x: 634, y: 15, largura: 1060, altura: 348 };

/**
 * CSS de máscara que pinta um PNG branco na cor pedida — e, opcionalmente,
 * mostra só um recorte dele. Usado para o logo e para a montanha.
 */
export function mascara({ uri, cor, larguraAlvo, recorte = null }) {
  const fonte = recorte || { x: 0, y: 0, largura: LOGO.largura, altura: LOGO.altura };
  const s = larguraAlvo / fonte.largura;
  return [
    `width:${larguraAlvo}px`,
    `height:${Math.round(fonte.altura * s)}px`,
    `background:${cor}`,
    `-webkit-mask-image:url(${uri})`,
    `-webkit-mask-repeat:no-repeat`,
    `-webkit-mask-size:${LOGO.largura * s}px ${LOGO.altura * s}px`,
    `-webkit-mask-position:${-fonte.x * s}px ${-fonte.y * s}px`,
  ].join(';');
}
