// Renderiza nós .pen em HTML. Usado por dois consumidores:
//   previa.mjs   → PNG de conferência (com detector de estouro e contraste)
//   exportar.mjs → arquivo único editável para mandar ao cliente
// O modelo do pen.dev (frame + auto-layout) mapeia quase 1:1 em flexbox.

const EIXO = {
  start: 'flex-start', center: 'center', end: 'flex-end',
  space_between: 'space-between', space_around: 'space-around', baseline: 'baseline',
};

const px = (n) => (typeof n === 'number' ? `${n}px` : n);
const escapar = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/**
 * @param variables  variáveis do documento, para resolver `$--token`
 * @param editavel   marca os textos como contenteditable (modo cliente)
 * @param urlDeFoto  troca a URL da foto (para embutir em base64)
 */
export function criarRenderizador({ variables = {}, editavel = false, urlDeFoto = (u) => u } = {}) {
  let seqTexto = 0;

  const corDe = (v) => {
    if (typeof v !== 'string') return v;
    if (v.startsWith('$--')) {
      const val = variables[v.slice(1)]?.value;
      return typeof val === 'string' ? val : Array.isArray(val) ? val[0].value : '#FF00FF';
    }
    return v;
  };

  function fundo(fill) {
    if (!fill) return '';
    if (typeof fill === 'string') return `background:${corDe(fill)};`;
    if (fill.type === 'image') {
      // aspas SIMPLES: o style vai dentro de um atributo com aspas duplas
      return fill.url
        ? `background-image:url('${urlDeFoto(fill.url)}');background-size:cover;background-position:center;`
        : 'background:#dddddd;';
    }
    if (fill.type === 'gradient') {
      const paradas = (fill.colors || []).map((c) => `${corDe(c.color)} ${Math.round((c.position ?? 0) * 100)}%`).join(',');
      return `background:linear-gradient(${fill.rotation ?? 180}deg,${paradas});`;
    }
    return '';
  }

  function traco(stroke) {
    if (!stroke) return '';
    const cor = corDe(stroke.fill || '#000');
    const t = stroke.thickness;
    if (typeof t === 'number') return `box-shadow: inset 0 0 0 ${t}px ${cor};`;
    if (t && typeof t === 'object') {
      return Object.entries(t).map(([lado, v]) => `border-${lado}:${v}px solid ${cor};`).join('');
    }
    return '';
  }

  const efeito = (effect) => {
    if (!Array.isArray(effect)) return '';
    const s = effect.filter((e) => e.type === 'shadow')
      .map((e) => `${e.offset?.x ?? 0}px ${e.offset?.y ?? 0}px ${e.blur ?? 0}px ${e.spread ?? 0}px ${corDe(e.color)}`)
      .join(',');
    return s ? `box-shadow:${s};` : '';
  };

  /**
   * width/height do .pen → CSS.
   * Cuidado: `flex: 0 0 <n>px` fixa o eixo PRINCIPAL. Num pai em coluna o principal é
   * a ALTURA — usar a largura ali forçaria a altura e estufaria a página inteira.
   */
  function dimensao(n, layoutPai, hugLargura = true) {
    const principalEhLargura = layoutPai === 'horizontal';
    const dentroDeFlex = layoutPai === 'horizontal' || layoutPai === 'vertical';
    const out = [];

    if (n.width === 'fill_container') out.push(principalEhLargura ? 'flex:1 1 0;min-width:0' : 'align-self:stretch');
    else if (typeof n.width === 'number') out.push(`width:${n.width}px`, principalEhLargura ? 'flex:0 0 auto' : '');
    else if (hugLargura) out.push('width:fit-content');

    if (n.height === 'fill_container') out.push(!principalEhLargura && dentroDeFlex ? 'flex:1 1 0;min-height:0' : 'align-self:stretch');
    else if (typeof n.height === 'number') out.push(`height:${n.height}px`, !principalEhLargura ? 'flex:0 0 auto' : 'flex-shrink:0');

    return out.filter(Boolean).join(';');
  }

  function renderizar(n, layoutPai = 'none') {
    if (!n) return '';
    const t = n.type;

    if (t === 'text') {
      const est = [
        `font-family:'${n.fontFamily || 'Archivo'}',sans-serif`,
        `font-size:${n.fontSize || 16}px`,
        `font-weight:${n.fontWeight || 400}`,
        `line-height:${n.lineHeight || 1.4}`,
        n.letterSpacing != null ? `letter-spacing:${n.letterSpacing}px` : '',
        `color:${corDe(n.fill) || '#000'}`,
        n.textAlign ? `text-align:${n.textAlign}` : '',
        n.opacity != null ? `opacity:${n.opacity}` : '',
        'white-space:pre-wrap', 'margin:0',
      ].filter(Boolean).join(';');
      const tam = dimensao(n, layoutPai, false) || 'flex:0 0 auto';
      const attrs = editavel
        ? ` contenteditable="true" spellcheck="false" class="ed" data-i="${seqTexto++}" data-orig="${escapar(n.content)}"`
        : '';
      return `<div style="${est};${tam}"${attrs}>${escapar(n.content)}</div>`;
    }

    // ícone vetorial: a geometria do lucide (quadro 24×24) vive dentro do .pen
    if (t === 'path') {
      const w = n.width || 20, h = n.height || 20;
      const cor = corDe(n.stroke) || '#000';
      const esp = ((n.strokeWidth ?? 2) * 24) / Math.max(w, h);
      return (
        `<div style="flex:0 0 auto;width:${w}px;height:${h}px">` +
        `<svg viewBox="0 0 24 24" width="${w}" height="${h}" fill="none" stroke="${cor}" ` +
        `stroke-width="${esp}" stroke-linecap="${n.strokeLinecap || 'round'}" ` +
        `stroke-linejoin="${n.strokeLinejoin || 'round'}" style="display:block">` +
        `<path d="${String(n.geometry || '').replace(/"/g, '')}"/></svg></div>`
      );
    }

    if (t === 'rectangle' || t === 'ellipse') {
      const est = [
        dimensao(n, layoutPai, false), fundo(n.fill), traco(n.stroke),
        t === 'ellipse' ? 'border-radius:50%' : n.cornerRadius ? `border-radius:${px(n.cornerRadius)}` : '',
      ].filter(Boolean).join(';');
      return `<div style="${est}"></div>`;
    }

    if (t === 'frame') {
      const layout = n.layout || 'none';
      const flex = layout === 'vertical' ? 'column' : layout === 'horizontal' ? 'row' : null;
      const est = [
        'box-sizing:border-box', 'position:relative',
        flex ? `display:flex;flex-direction:${flex}` : 'display:block',
        n.gap != null ? `gap:${n.gap}px` : '',
        n.padding != null ? `padding:${typeof n.padding === 'number' ? n.padding + 'px' : Object.values(n.padding).join('px ') + 'px'}` : '',
        n.alignItems ? `align-items:${EIXO[n.alignItems] || n.alignItems}` : '',
        n.justifyContent ? `justify-content:${EIXO[n.justifyContent] || n.justifyContent}` : '',
        dimensao(n, layoutPai),
        fundo(n.fill),
        n.cornerRadius ? `border-radius:${px(n.cornerRadius)}` : '',
        n.clip ? 'overflow:hidden' : '',
        n.opacity != null ? `opacity:${n.opacity}` : '',
        traco(n.stroke), efeito(n.effect),
      ].filter(Boolean).join(';');
      const filhos = (n.children || []).map((c) => renderizar(c, layout)).join('');
      return `<div data-nome="${(n.name || '').replace(/"/g, '')}" style="${est}">${filhos}</div>`;
    }

    return '';
  }

  return { renderizar, corDe, totalTextos: () => seqTexto };
}

/** Lista as URLs de imagem usadas no documento, sem repetir. */
export function urlsDeImagem(doc) {
  const urls = new Set();
  (function anda(n) {
    if (Array.isArray(n)) return n.forEach(anda);
    if (!n || typeof n !== 'object') return;
    if (n.fill && typeof n.fill === 'object' && n.fill.type === 'image' && n.fill.url) urls.add(n.fill.url);
    Object.values(n).forEach(anda);
  })(doc.children);
  return [...urls];
}
