// Leitura do arquivo .pen para os painéis de montagem.
//
// Mora separado porque três geradores precisam das mesmas funções: `paginas.mjs` (os
// painéis por página), `ficha.mjs` e `manual.mjs`. Antes estava duplicado dentro do
// `montagem.mjs`, que só sabia montar a Home.
//
// A ideia central de `estiloDe()`: o tema do site JÁ está configurado, então o que
// interessa não é o valor absoluto do texto, e sim a DIFERENÇA dele em relação ao estilo
// do tema. É por isso que o Passe 2 diz "aplique o estilo h1" em vez de repetir seis
// números, e o Passe 4 lista só as exceções.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.join(DIR, '..', '..');

/** Altura final de cada módulo, medida na prévia por `recorte.mjs`. */
const alturas = {};
for (const r of JSON.parse(fs.readFileSync(path.join(RAIZ, 'previa', 'modulos', 'indice.json'), 'utf8'))) {
  alturas[r.tela.match(/^(M?\d+)/)[1] + '|' + r.modulo] = r.h;
}

export const COR_NOME = {
  '#F2F2F2': 'papel', '#FFFFFF': 'branco', '#000000': 'preto', '#111111': 'tinta',
  '#717171': 'cinza', '#9A9A9A': 'cinza fraco', '#D9D9D9': 'linha',
  '#FFFFFFD1': 'branco 82%', '#FFFFFF8C': 'branco 55%', '#FFFFFF61': 'branco 38%',
  '#FFFFFF29': 'branco 16%', '#FFFFFFA6': 'branco 65%', '#FFFFFF59': 'branco 35%',
  '#FFFFFFE6': 'branco 90%', '#FFFFFF14': 'branco 8%', '#00000099': 'preto 60%',
  '#00000047': 'preto 28%', '#0000007A': 'preto 48%', '#000000D9': 'preto 85%',
  '#00000026': 'preto 15%', '#FFFFFFB3': 'branco 70%',
};

/** Os estilos do tema, já configurados no site. Casamos o texto contra eles. */
export const ESTILOS = [
  { nome: 'display', fonte: 'Anton', tam: 72, peso: '400', lh: 1.0, ls: -0.5 },
  { nome: 'h1', fonte: 'Anton', tam: 48, peso: '400', lh: 1.04, ls: -0.4 },
  { nome: 'índice', fonte: 'Anton', tam: 44, peso: '400', lh: 1.0, ls: -0.4 },
  { nome: 'h2', fonte: 'Anton', tam: 34, peso: '400', lh: 1.08, ls: -0.4 },
  { nome: 'h3', fonte: 'Anton', tam: 24, peso: '400', lh: 1.12, ls: -0.3 },
  { nome: 'h4', fonte: 'Archivo', tam: 17, peso: '700', lh: 1.3, ls: 0 },
  { nome: 'corpo grande', fonte: 'Archivo', tam: 18, peso: '400', lh: 1.6, ls: 0 },
  { nome: 'corpo', fonte: 'Archivo', tam: 16, peso: '400', lh: 1.6, ls: 0 },
  { nome: 'corpo pequeno', fonte: 'Archivo', tam: 13.5, peso: '400', lh: 1.5, ls: 0 },
  { nome: 'sobrelinha', fonte: 'Archivo', tam: 11, peso: '600', lh: 1.2, ls: 3 },
  { nome: 'mono', fonte: 'JetBrains Mono', tam: 12, peso: '400', lh: 1.4, ls: 0.4 },
  { nome: 'botão', fonte: 'Archivo', tam: 12, peso: '600', lh: 1.0, ls: 1.4 },
];

export const cor = (c) => {
  if (!c) return null;
  if (typeof c === 'object') return c.type === 'image' ? 'FOTO'
    : c.type === 'gradient' ? `degradê ${c.rotation}° (${c.colors.map((p) => p.color).join(' → ')})` : null;
  const h = String(c).toUpperCase();
  return COR_NOME[h] ? `${h} ${COR_NOME[h]}` : h;
};
export const hexDe = (c) => (typeof c === 'string' ? String(c).toUpperCase() : null);

/**
 * Casa um texto contra os estilos do tema e devolve o nome do estilo + o que difere.
 * O tema está configurado, então o que importa é a DIFERENÇA, não o valor absoluto.
 */
export function estiloDe(t) {
  const fonte = t.fontFamily || 'Archivo';
  const peso = String(t.fontWeight || '400');
  const cands = ESTILOS.filter((e) => e.fonte === fonte && e.peso === peso);
  const pool = cands.length ? cands : ESTILOS.filter((e) => e.fonte === fonte);
  if (!pool.length) return { estilo: null, difs: [`fonte ${fonte} ${t.fontSize}px peso ${peso}`] };
  const alvo = pool.reduce((a, b) => (Math.abs(b.tam - (t.fontSize ?? 16)) < Math.abs(a.tam - (t.fontSize ?? 16)) ? b : a));
  const difs = [];
  if ((t.fontSize ?? 16) !== alvo.tam) difs.push(`tamanho ${t.fontSize} px (o estilo é ${alvo.tam})`);
  if (peso !== alvo.peso) difs.push(`peso ${peso} (o estilo é ${alvo.peso})`);
  const ls = t.letterSpacing || 0;
  if (ls !== alvo.ls) difs.push(`entre letras ${ls > 0 ? '+' : ''}${ls} (o estilo é ${alvo.ls > 0 ? '+' : ''}${alvo.ls})`);
  if (t.lineHeight && t.lineHeight !== alvo.lh) difs.push(`entrelinha ${t.lineHeight} (o estilo é ${alvo.lh})`);
  return { estilo: alvo.nome, difs };
}

/* ─────────────────────────── leitura do .pen ─────────────────────────── */

export const AUX = new Set(['respiro', 'mola', 'recuo lateral']);

/** Nomes legíveis para os valores de alinhamento do .pen. */
export const ALINHA = { center: 'centro', end: 'fim', start: 'início', baseline: 'base', space_between: 'nas pontas' };

/** Prefixo da tela → nome que aparece no painel. */
export const TELA_NOME = {
  '00': 'Sistema', '01': 'Home', '02': 'Grupo Avulso', '03': 'Página da Expedição',
  '04': 'Grupo Fechado', M1: 'Home (mobile)', M2: 'Página da Expedição (mobile)',
  M3: 'Grupo Avulso (mobile)',
};
export function tipoDe(n) {
  if (n.type === 'text') return 'texto';
  if (n.type === 'icon_font') return 'ícone';
  if (n.type === 'rectangle') return n.height <= 2 && n.width === 'fill_container' ? 'fio' : 'retângulo';
  if (!n.children?.length) {
    if (typeof n.fill === 'object' && n.fill?.type === 'image') return 'foto';
    if (n.width === 'fill_container' && n.height === 1) return 'mola';
    if (n.width === 'fill_container' && n.height >= 2) return 'respiro';
    if (n.height === 1) return 'recuo lateral';
    return 'caixa';
  }
  return n.layout === 'horizontal' ? 'linha' : n.layout === 'vertical' ? 'coluna' : 'caixa';
}

const IGNORAR = /^(frame|row|col|sobrelinha|botão\/|ícone\/|status\/|logo\/|marca\/)/;
export function modulosDaTela(tela) {
  const out = [];
  const anda = (n, p) => {
    if (n.name && !IGNORAR.test(n.name) && n.name !== tela.name && p <= 3) { out.push(n); return; }
    for (const f of n.children || []) anda(f, p + 1);
  };
  for (const f of tela.children || []) anda(f, 1);
  return out;
}

export function planos(raiz) {
  const lista = [];
  const anda = (n, prof) => { lista.push({ n, prof, num: lista.length + 1 }); (n.children || []).forEach((f) => anda(f, prof + 1)); };
  anda(raiz, 0);
  return lista;
}

/** Passe 1 — o que a seção é por fora. */
export function esqueletoDe(mod, chave) {
  const filhos = mod.children || [];
  const primeiro = filhos[0], ultimo = filhos[filhos.length - 1];
  const resp = (n) => (n && tipoDe(n) === 'respiro' ? n.height : null);
  // seções montadas com o helper `secao` têm respiro como primeiro e último filho
  let topo = resp(primeiro), base = resp(ultimo);
  if (topo === null) {
    // faixas com altura travada (nav, rodapé) ou seções com respiro interno
    const dentro = filhos.flatMap((f) => f.children || []);
    topo = resp(dentro[0]);
    base = resp(dentro[dentro.length - 1]);
  }
  return {
    fundo: cor(mod.fill) || 'nenhum (herda a página)',
    fundoHex: hexDe(mod.fill),
    alturaTravada: typeof mod.height === 'number' ? mod.height : null,
    respiroTopo: topo, respiroBase: base,
    altura: alturas[chave] || null,
  };
}

/** Passe 2 — os textos, na ordem de leitura, com o estilo do tema. */
export function conteudoDe(raiz) {
  return planos(raiz).filter((e) => e.n.type === 'text').map((e) => {
    const { estilo, difs } = estiloDe(e.n);
    return { num: e.num, texto: e.n.content || '', estilo, difs, cor: cor(e.n.fill), corHex: hexDe(e.n.fill) };
  });
}

/** Passe 3 — só os containers e os fios: a estrutura, sem o espaçamento fino. */
export function estruturaDe(raiz) {
  return planos(raiz)
    .filter((e) => {
      const t = tipoDe(e.n);
      return !AUX.has(t) && t !== 'texto';
    })
    .map((e) => {
      const t = tipoDe(e.n);
      const n = e.n;
      return {
        num: e.num, prof: e.prof, tipo: t,
        nome: n.name && !/^(frame|row|col)$/.test(n.name) ? n.name : '',
        largura: n.width === 'fill_container' ? 'estica' : n.width === undefined ? 'automática' : `${n.width} px`,
        altura: n.height === 'fill_container' ? 'estica' : n.height === undefined ? 'automática' : `${n.height} px`,
        fundo: cor(n.fill), fundoHex: hexDe(n.fill),
      };
    });
}

/** Passe 4 — tudo que precisa de valor exato. É a lista de acabamento. */
export function retoquesDe(raiz) {
  const out = [];
  for (const e of planos(raiz)) {
    const n = e.n, t = tipoDe(n);
    const itens = [];
    if (n.padding) itens.push(`recuo ${n.padding} px`);
    if (n.gap) itens.push(`espaço entre itens ${n.gap} px`);
    if (typeof n.width === 'number' && t !== 'recuo lateral') itens.push(`largura fixa ${n.width} px`);
    if (t === 'respiro') itens.push(`respiro de ${n.height} px (na Wix: margem ou recuo)`);
    if (t === 'recuo lateral') itens.push(`recuo lateral de ${n.width} px`);
    if (n.stroke) {
      const th = n.stroke.thickness;
      const lado = { top: 'topo', bottom: 'base', left: 'esquerda', right: 'direita' };
      const onde = th == null ? '' : typeof th === 'number' ? `${th} px nos 4 lados`
        : Object.entries(th).map(([l, v]) => `${v} px na ${lado[l]}`).join(' + ');
      const corFio = cor(n.stroke.fill);
      // sem espessura e sem cor não é contorno de verdade — é resíduo do formato
      if (onde || corFio) itens.push(`fio ${[onde, corFio].filter(Boolean).join(' · ')}`);
    }
    if (n.alignItems && n.alignItems !== 'start') itens.push(`alinha ao ${({ center: 'centro', end: 'fim', baseline: 'base' })[n.alignItems] || n.alignItems}`);
    if (n.justifyContent) itens.push(`distribui ${({ center: 'ao centro', end: 'ao fim', space_between: 'nas pontas' })[n.justifyContent] || n.justifyContent}`);
    if (n.cornerRadius) itens.push(n.cornerRadius > 100 ? 'canto redondo' : `canto ${n.cornerRadius} px`);
    if (n.opacity) itens.push(`opacidade ${n.opacity}`);
    if (n.type === 'text') {
      const { difs } = estiloDe(n);
      itens.push(...difs);
      if (typeof n.width === 'number') { /* já contado acima */ }
      if (n.textAlign && n.textAlign !== 'left') itens.push(`alinhado à ${n.textAlign === 'right' ? 'direita' : 'centro'}`);
    }
    if (!itens.length) continue;
    const rotulo = n.type === 'text'
      ? `texto «${(n.content || '').replace(/\n/g, ' ⏎ ').slice(0, 44)}»`
      : `${t}${n.name && !/^(frame|row|col)$/.test(n.name) ? ` «${n.name}»` : ''}`;
    out.push({ num: e.num, prof: e.prof, rotulo, itens });
  }
  return out;
}

/* ─────────────────────────── montagem do painel ─────────────────────────── */

export const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const chip = (txt, hex) => (hex
  ? `<button class="cor" data-copia="${hex}"><i style="background:${hex}"></i><span class="mono">${esc(txt)}</span></button>`
  : txt ? `<span class="mono">${esc(txt)}</span>` : '<span class="vazio">—</span>');

/* ══════════════════════════════════════════════════════════════════════
   FICHA POR ELEMENTO — o detalhe completo, propriedade por propriedade.
   O Passe 2 mostra o NOME do estilo do tema (que é o que acelera a
   montagem), mas quem está conferindo precisa dos números. Estes dois
   dão isso: `fichaDoModulo` para a tela, `specTexto` para colar.
   ══════════════════════════════════════════════════════════════════════ */

/** Auxiliares do formato .pen que NÃO viram elemento na Wix — viram recuo/espaço. */
export const AUXILIAR = AUX;

const cru = (v) => (v === 'fill_container' ? 'estica' : v === undefined || v === null ? 'automática' : `${v} px`);

/** Cada elemento com todos os campos, na ordem dos painéis da Wix. */
export function fichaDoModulo(raiz) {
  return planos(raiz).map((e) => {
    const t = e.n;
    const tipo = tipoDe(t);
    if (t.type === 'text') {
      const { estilo, difs } = estiloDe(t);
      return {
        num: e.num, prof: e.prof, tipo: 'texto', aux: false,
        conteudo: t.content || '', estilo, difs,
        campos: [
          ['Estilo do tema', estilo || '—', null],
          ['Fonte', t.fontFamily || 'Archivo', null],
          ['Tamanho', `${t.fontSize ?? 16} px`, null],
          ['Peso', String(t.fontWeight || '400'), null],
          ['Cor', cor(t.fill) || '—', hexDe(t.fill)],
          ['Entrelinha', String(t.lineHeight ?? '—'), null],
          ['Entre letras', t.letterSpacing ? (t.letterSpacing > 0 ? '+' : '') + t.letterSpacing : '0', null],
          ['Largura', cru(t.width), null],
          ['Alinhamento', ALINHA[t.textAlign] || 'esquerda', null],
        ],
      };
    }
    const traco = t.stroke
      ? (() => {
          const th = t.stroke.thickness;
          const lado = { top: 'topo', bottom: 'base', left: 'esquerda', right: 'direita' };
          const onde = th == null ? '' : typeof th === 'number' ? `${th} px nos 4 lados`
            : Object.entries(th).map(([l, v]) => `${v} px na ${lado[l]}`).join(' + ');
          return [onde, cor(t.stroke.fill)].filter(Boolean).join(' · ') || '—';
        })()
      : '—';
    return {
      num: e.num, prof: e.prof, tipo, aux: AUXILIAR.has(tipo),
      nome: t.name && !/^(frame|row|col)$/.test(t.name) ? t.name : '',
      campos: [
        ['Largura', cru(t.width), null],
        ['Altura', cru(t.height), null],
        ['Fundo', cor(t.fill) || '—', hexDe(t.fill)],
        ['Recuo', t.padding ? `${t.padding} px` : '—', null],
        ['Espaço', t.gap ? `${t.gap} px` : '—', null],
        ['Contorno', traco, t.stroke ? hexDe(t.stroke.fill) : null],
        ['Alinha', ALINHA[t.alignItems] || 'início', null],
        ['Distribui', ALINHA[t.justifyContent] || '—', null],
        ['Canto', t.cornerRadius ? (t.cornerRadius > 100 ? 'redondo' : `${t.cornerRadius} px`) : 'reto', null],
      ],
    };
  });
}

/** A mesma ficha em texto puro, para colar em qualquer lugar. */
export function specTexto({ modulo, tela, elementos, elementosNaWix, aux, recorte }) {
  const l = [
    `MÓDULO: ${modulo}   ·   tela: ${tela}`,
    `${elementosNaWix} elementos para montar na Wix` +
      (aux ? ` (+${aux} de espaçamento, que viram recuo/margem e NÃO são elemento)` : ''),
    recorte ? `Recorte: ${recorte}` : '',
    '',
    'Grade: tela 1440 · conteúdo 1200 · recuo lateral 120 (celular 20)',
    '─'.repeat(72),
  ].filter(Boolean);
  for (const e of elementos) {
    l.push('', `nº ${e.num} · ${e.tipo.toUpperCase()}${e.nome ? ` "${e.nome}"` : ''}` +
      (e.aux ? '  [espaçamento — vira recuo, não é elemento]' : ''));
    if (e.conteudo) l.push(`   texto: "${e.conteudo.replace(/\n/g, '\n')}"`);
    const pares = e.campos.filter((c) => c[1] !== '—').map((c) => `${c[0]}: ${c[1]}`);
    let linha = ' ';
    for (const p of pares) {
      if ((linha + p).length > 76) { l.push(linha.replace(/·$/, '').trimEnd()); linha = ' '; }
      linha += ' ' + p + '  ·';
    }
    if (linha.trim()) l.push(linha.replace(/·$/, '').trimEnd());
  }
  return l.join('\n') + '\n';
}

/**
 * Módulos que na Wix são REPETIDOR: você monta um item e a coleção multiplica.
 *
 * Existe porque o arquivo de design desenha as listas inteiras (5 expedições, 5 dias,
 * 8 perguntas) para dar para conferir o ritmo — e isso faz a contagem de elementos
 * parecer 5× maior que o trabalho real. Sem esta tabela o painel mostra 59 elementos
 * na agenda quando o que se monta são 11.
 *
 * `marca` = prefixo do nome do primeiro item repetido, quando existe no .pen.
 * `porItem` = quando o item não é nomeado (o FAQ), o número medido na mão.
 */
export const REPETIDORES = {
  '02|agenda': { colecao: 'Expedicoes', marca: 'índice/', repete: 5 },
  '02|faq': { colecao: 'FAQ', porItem: 5, repete: 6 },
  '03|roteiro': { colecao: 'Roteiro', marca: 'roteiro/dia', repete: 5 },
  '03|hospedagem': { colecao: 'Hospedagens', marca: 'hospedagem/', repete: 2 },
  '03|faq': { colecao: 'FAQ', porItem: 4, repete: 8 },
  '03|guia da expedição': { colecao: 'Guia', porItem: 4, repete: 10 },
};

/** Quantos elementos realmente se monta num módulo, considerando repetidor. */
export function custoReal(chave, raiz) {
  const ficha = fichaDoModulo(raiz);
  const desenhado = ficha.filter((e) => !e.aux).length;
  const rep = REPETIDORES[chave];
  if (!rep) return { desenhado, montar: desenhado, repetidor: null };
  let porItem = rep.porItem;
  if (!porItem && rep.marca) {
    const item = planos(raiz).find((e) => e.n.name && e.n.name.startsWith(rep.marca));
    if (item) porItem = fichaDoModulo(item.n).filter((e) => !e.aux).length;
  }
  // fora do item repetido sobra o cabeçalho do módulo e os fios que abrem/fecham
  const cabecalho = Math.max(0, desenhado - (porItem || 0) * rep.repete);
  return { desenhado, montar: (porItem || 0) + cabecalho, porItem, repetidor: rep };
}
