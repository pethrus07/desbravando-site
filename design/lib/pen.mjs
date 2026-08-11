// Helpers para gerar arquivos .pen (pen.dev) — formato JSON, auto-layout tipo Figma.
// Regras aprendidas do formato:
//   frame  : layout "none" | "vertical" | "horizontal", gap, padding (numero), alignItems,
//            justifyContent ("start"|"center"|"end"|"space_between"), width/height numero
//            ou "fill_container"; OMITIR height = hug contents.
//   text   : content, fontFamily, fontSize, fontWeight, lineHeight, letterSpacing,
//            textAlign, textGrowth ("auto"|"fixed-width"|"fixed-width-height")
//   fill   : "#RRGGBB" | "$--variavel" | { type:"image"|"gradient", ... }
//   stroke : { align:"inside", thickness: n | {top,right,bottom,left}, fill }

const ALFABETO = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
let contador = 0;
export function id() {
  contador += 1;
  let n = contador * 7919 + 100000; // espalha, mantendo determinismo
  let s = '';
  for (let i = 0; i < 5; i++) { s = ALFABETO[n % ALFABETO.length] + s; n = Math.floor(n / ALFABETO.length); }
  return s;
}
export function zerarIds() { contador = 0; }

const limpo = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined && v !== null));

/** Frame genérico. `filhos` é array (pode conter null/false, que são descartados). */
export function frame(props = {}, filhos = []) {
  const kids = filhos.flat(Infinity).filter(Boolean);
  return limpo({
    type: 'frame',
    id: id(),
    ...props,
    children: kids.length ? kids : undefined,
  });
}

/** Coluna com auto-layout vertical. */
export const col = (props = {}, filhos = []) =>
  frame({ layout: 'vertical', ...props }, filhos);

/** Linha com auto-layout horizontal. */
export const row = (props = {}, filhos = []) =>
  frame({ layout: 'horizontal', ...props }, filhos);

/** Texto. Por padrão cresce em largura (hug). */
export function texto(content, props = {}) {
  return limpo({
    type: 'text',
    id: id(),
    content,
    textGrowth: props.width ? 'fixed-width' : 'auto',
    ...props,
  });
}

/** Ícone lucide. */
export const icone = (nome, props = {}) =>
  limpo({ type: 'icon_font', id: id(), iconFontFamily: 'lucide', iconFontName: nome, width: 20, height: 20, ...props });

/** Retângulo simples (usado para divisórias e barras). */
export const ret = (props = {}) => limpo({ type: 'rectangle', id: id(), width: 100, height: 1, ...props });

/** Divisória horizontal de 1px que preenche o container. */
export const linha = (cor = '$--linha', props = {}) =>
  ret({ width: 'fill_container', height: 1, fill: cor, ...props });

/** Espaçador vertical (para padding assimétrico, que o formato numérico não cobre). */
export const vao = (h) => frame({ width: 'fill_container', height: h });

/** Espaçador horizontal. */
export const vaoH = (w) => frame({ width: w, height: 1 });

/** Empurra o resto para a direita/baixo dentro de um auto-layout. */
export const mola = () => frame({ width: 'fill_container', height: 1 });

/** Preenchimento por imagem remota. */
export const imagem = (url, mode = 'fill') => ({ type: 'image', enabled: true, url, mode });

/** Gradiente linear. `paradas` = [[cor, posicao 0..1], ...] */
export const gradiente = (rotation, paradas) => ({
  type: 'gradient',
  gradientType: 'linear',
  enabled: true,
  rotation,
  size: { height: 1 },
  colors: paradas.map(([color, position]) => ({ color, position })),
});

/** Sombra externa. */
export const sombra = (y, blur, color, spread = 0) => [
  { type: 'shadow', shadowType: 'outer', color, offset: { x: 0, y }, blur, spread },
];

/** Contorno. `thickness` pode ser número ou {top,right,bottom,left}. */
export const contorno = (fill, thickness = 1, align = 'inside') => ({ align, thickness, fill });

/** Serializa o documento .pen. */
export function documento({ children, variables, themes, version = '2.13' }) {
  return JSON.stringify(limpo({ version, children, themes, variables }), null, 2);
}
