// Monta o PAINEL DE MONTAGEM: o manual em HTML, feito para ficar aberto ao lado do
// Editor da Wix. Junta as três peças que hoje estão soltas —
//   5-manual-de-montagem.md   (os passos)
//   design/fichas.md          (a medida exata, gerada do .pen)
//   previa/modulos/*.png      (o recorte de cada módulo)
// — e acrescenta o que só faz sentido na tela: caixa de "feito" por módulo, com o
// progresso gravado no navegador, e um índice fixo para pular entre módulos.
//
// Rodar:  node design/manual.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.join(DIR, '..');
const md = fs.readFileSync(path.join(RAIZ, '5-manual-de-montagem.md'), 'utf8');
const doc = JSON.parse(fs.readFileSync(path.join(DIR, 'desbravando-repaginacao.pen'), 'utf8'));

import { nomeArquivo } from './recorte-nome.mjs';
import { custoReal } from './lib/leitura-pen.mjs';

const arquivoDoRecorte = (prefixo, modulo) => nomeArquivo(prefixo, modulo) + '.png';

/* ══════════════════════════════════════════════════════════════════════
   FICHA POR ELEMENTO
   A versão anterior mostrava uma árvore em texto, escondida atrás de um
   "detalhes". Quem está montando na Wix precisa do contrário: a propriedade
   com o nome dela, visível, na ordem dos campos do painel do Editor.
   Daqui saem duas tabelas por módulo — TEXTOS e CAIXAS — numeradas contra a
   mesma árvore, que fica embaixo só para conferir o aninhamento.
   ══════════════════════════════════════════════════════════════════════ */

const NOME_COR = {
  '#F2F2F2': 'papel', '#FFFFFF': 'branco', '#000000': 'preto', '#111111': 'tinta',
  '#717171': 'cinza', '#9A9A9A': 'cinza fraco', '#D9D9D9': 'linha',
  '#FFFFFFD1': 'branco 82%', '#FFFFFF8C': 'branco 55%', '#FFFFFF61': 'branco 38%',
  '#FFFFFF29': 'branco 16%', '#FFFFFFA6': 'branco 65%', '#FFFFFF59': 'branco 35%',
  '#FFFFFFE6': 'branco 90%', '#FFFFFF14': 'branco 8%', '#00000099': 'preto 60%',
  '#00000047': 'preto 28%', '#0000007A': 'preto 48%', '#000000D9': 'preto 85%',
  '#00000026': 'preto 15%', '#FFFFFFB3': 'branco 70%',
};

/** Amostra de cor clicável — copia o hexadecimal. */
function chipCor(c) {
  if (!c) return '<span class="vazio">—</span>';
  if (typeof c === 'object') {
    if (c.type === 'image') return '<span class="tag">foto</span>';
    if (c.type === 'gradient') {
      const paradas = c.colors.map((p) => `${p.color} ${Math.round(p.position * 100)}%`).join(' → ');
      return `<span class="tag">degradê ${c.rotation}°</span> <span class="mono">${paradas}</span>`;
    }
    return '<span class="vazio">—</span>';
  }
  const hex = String(c).toUpperCase();
  const nome = NOME_COR[hex];
  return `<button class="cor" data-copia="${hex}" title="clique para copiar"><i style="background:${hex}"></i>` +
         `<span class="mono">${hex}</span>${nome ? `<em>${nome}</em>` : ''}</button>`;
}

const px = (v) => (v === 'fill_container' ? '<span class="tag">estica</span>'
  : v === undefined || v === null ? '<span class="vazio">automática</span>' : `${v} px`);

function traco(s) {
  if (!s) return '<span class="vazio">—</span>';
  const t = s.thickness;
  const lado = { top: 'topo', bottom: 'base', left: 'esquerda', right: 'direita' };
  const onde = t == null ? '' : typeof t === 'number' ? `${t} px nos 4 lados`
    : Object.entries(t).map(([l, v]) => `${v} px ${lado[l]}`).join(' + ');
  return `${onde} · ${chipCor(s.fill)}`;
}

/** Percorre o módulo em profundidade e numera cada elemento. */
function elementos(raiz) {
  const lista = [];
  const anda = (n, prof) => {
    lista.push({ n, prof, num: lista.length + 1 });
    for (const f of n.children || []) anda(f, prof + 1);
  };
  anda(raiz, 0);
  return lista;
}

const recuo = (p) => '<span class="prof">' + '·'.repeat(Math.min(p, 10)) + '</span>';

function tipoDe(n) {
  if (n.type === 'text') return 'texto';
  if (n.type === 'icon_font') return 'ícone';
  if (n.type === 'rectangle') return n.height <= 2 && n.width === 'fill_container' ? 'fio' : 'retângulo';
  if (!n.children?.length) {
    if (typeof n.fill === 'object' && n.fill.type === 'image') return 'foto';
    if (n.width === 'fill_container' && n.height === 1) return 'mola';
    if (n.width === 'fill_container' && n.height >= 2) return 'respiro';
    if (n.height === 1) return 'recuo lateral';
    return 'caixa';
  }
  return n.layout === 'horizontal' ? 'linha' : n.layout === 'vertical' ? 'coluna' : 'caixa';
}

const TELA_NOME = { '00': 'Sistema', '01': 'Home', '02': 'Grupo Avulso', '03': 'Página da Expedição', '04': 'Grupo Fechado', M1: 'Home (mobile)', M2: 'Página da Expedição (mobile)', M3: 'Grupo Avulso (mobile)' };

const ALINHA = { center: 'centro', end: 'fim', start: 'início', baseline: 'base', space_between: 'nas pontas' };

/** Auxiliares do formato .pen que NÃO viram elemento na Wix — viram recuo/espaço. */
const AUXILIAR = new Set(['respiro', 'mola', 'recuo lateral']);

/** Valor cru, sem HTML — é o que o modo foco mostra e o que a tabela formata. */
const cru = (v) => (v === 'fill_container' ? 'estica' : v === undefined || v === null ? 'automática' : `${v} px`);
function crMap(c) {
  if (!c) return ['—', null];
  if (typeof c === 'object') {
    if (c.type === 'image') return ['foto', null];
    if (c.type === 'gradient') return [`degradê ${c.rotation}° · ${c.colors.map((p) => `${p.color} ${Math.round(p.position * 100)}%`).join(' → ')}`, null];
    return ['—', null];
  }
  const hex = String(c).toUpperCase();
  return [NOME_COR[hex] ? `${hex} ${NOME_COR[hex]}` : hex, hex];
}
function crTraco(s) {
  if (!s) return ['—', null];
  const t = s.thickness;
  const lado = { top: 'topo', bottom: 'base', left: 'esquerda', right: 'direita' };
  const onde = t == null ? '' : typeof t === 'number' ? `${t} px nos 4 lados`
    : Object.entries(t).map(([l, v]) => `${v} px ${lado[l]}`).join(' + ');
  const [txt, hex] = crMap(s.fill);
  return [`${onde} · ${txt}`, hex];
}

/** Descreve cada elemento uma vez; tabela e modo foco leem daqui. */
function fichaDoModulo(raiz) {
  return elementos(raiz).map((e) => {
    const t = e.n;
    const tipo = tipoDe(t);
    if (t.type === 'text') {
      const [corTxt, corHex] = crMap(t.fill);
      return {
        num: e.num, prof: e.prof, tipo: 'texto', aux: false,
        conteudo: t.content || '',
        campos: [
          ['Fonte', t.fontFamily || 'Archivo', null],
          ['Tamanho', `${t.fontSize ?? 16} px`, null],
          ['Peso', String(t.fontWeight || '400'), null],
          ['Cor', corTxt, corHex],
          ['Entrelinha', String(t.lineHeight ?? '—'), null],
          ['Entre letras', t.letterSpacing ? (t.letterSpacing > 0 ? '+' : '') + t.letterSpacing : '0', null],
          ['Largura', cru(t.width), null],
          ['Alinhamento', ALINHA[t.textAlign] || 'esquerda', null],
        ],
      };
    }
    const [fundoTxt, fundoHex] = crMap(t.fill);
    const [tracoTxt, tracoHex] = crTraco(t.stroke);
    return {
      num: e.num, prof: e.prof, tipo, aux: AUXILIAR.has(tipo),
      nome: t.name && !/^(frame|row|col)$/.test(t.name) ? t.name : '',
      campos: [
        ['Largura', cru(t.width), null],
        ['Altura', cru(t.height), null],
        ['Fundo', fundoTxt, fundoHex],
        ['Recuo', t.padding ? `${t.padding} px` : '—', null],
        ['Espaço', t.gap ? `${t.gap} px` : '—', null],
        ['Contorno', tracoTxt, tracoHex],
        ['Alinha', ALINHA[t.alignItems] || 'início', null],
        ['Distribui', ALINHA[t.justifyContent] || '—', null],
        ['Canto', t.cornerRadius ? (t.cornerRadius > 100 ? 'redondo' : `${t.cornerRadius} px`) : 'reto', null],
      ],
    };
  });
}

function tabelasDoModulo(raiz) {
  const todos = elementos(raiz);
  const textos = todos.filter((e) => e.n.type === 'text');
  const caixas = todos.filter((e) => e.n.type !== 'text');

  const escT = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const tabTextos = !textos.length ? '' : `
<div class="rolagem"><table class="ficha-tab">
<thead><tr><th>nº</th><th>Conteúdo</th><th>Fonte</th><th>Tam.</th><th>Peso</th><th>Cor</th><th>Entrelinha</th><th>Entre letras</th><th>Largura</th><th>Alinhamento</th></tr></thead>
<tbody>${textos.map((e) => {
    const t = e.n;
    const conteudo = (t.content || '').replace(/\n/g, ' ⏎ ');
    return `<tr>
<td class="num">${e.num}</td>
<td class="cont"><button class="copiar" data-copia="${escT(t.content || '')}" title="clique para copiar o texto">${escT(conteudo)}</button></td>
<td>${t.fontFamily || 'Archivo'}</td>
<td class="mono">${t.fontSize ?? 16} px</td>
<td class="mono">${t.fontWeight || '400'}</td>
<td>${chipCor(t.fill)}</td>
<td class="mono">${t.lineHeight ?? '—'}</td>
<td class="mono">${t.letterSpacing ? (t.letterSpacing > 0 ? '+' : '') + t.letterSpacing : '0'}</td>
<td>${px(t.width)}</td>
<td>${ALINHA[t.textAlign] || 'esquerda'}</td>
</tr>`;
  }).join('')}</tbody></table></div>`;

  const tabCaixas = !caixas.length ? '' : `
<div class="rolagem"><table class="ficha-tab">
<thead><tr><th>nº</th><th>O quê</th><th>Largura</th><th>Altura</th><th>Fundo</th><th>Recuo</th><th>Espaço</th><th>Contorno</th><th>Alinha</th><th>Distribui</th><th>Canto</th></tr></thead>
<tbody>${caixas.map((e) => {
    const b = e.n;
    const tipo = tipoDe(b);
    const rotulo = b.name && !/^(frame|row|col)$/.test(b.name) ? ` <em>${escT(b.name)}</em>` : '';
    return `<tr class="${tipo === 'respiro' || tipo === 'mola' || tipo === 'recuo lateral' ? 'aux' : ''}">
<td class="num">${e.num}</td>
<td>${recuo(e.prof)}<b>${tipo}</b>${rotulo}</td>
<td>${px(b.width)}</td>
<td>${px(b.height)}</td>
<td>${chipCor(b.fill)}</td>
<td class="mono">${b.padding ? b.padding + ' px' : '—'}</td>
<td class="mono">${b.gap ? b.gap + ' px' : '—'}</td>
<td>${traco(b.stroke)}</td>
<td>${ALINHA[b.alignItems] || '<span class="vazio">início</span>'}</td>
<td>${ALINHA[b.justifyContent] || '<span class="vazio">—</span>'}</td>
<td class="mono">${b.cornerRadius ? (b.cornerRadius > 100 ? 'redondo' : b.cornerRadius + ' px') : 'reto'}</td>
</tr>`;
  }).join('')}</tbody></table></div>`;

  // árvore, só para conferir o aninhamento — os números batem com as tabelas
  const arvore = todos.map((e) => {
    const t = e.n;
    const rec = '  '.repeat(e.prof);
    const cab = String(e.num).padStart(3) + '  ' + rec;
    if (t.type === 'text') return cab + '«' + (t.content || '').replace(/\n/g, ' ⏎ ').slice(0, 60) + '»';
    const nome = t.name && !/^(frame|row|col)$/.test(t.name) ? '  ← ' + t.name : '';
    return cab + tipoDe(t) + nome;
  }).join('\n');

  const nAux = caixas.filter((e) => AUXILIAR.has(tipoDe(e.n))).length;
  return {
    tabTextos, tabCaixas, arvore,
    nTextos: textos.length,
    nCaixas: caixas.length,
    nAux,
    // o que realmente vira elemento no Editor da Wix
    nReal: textos.length + caixas.length - nAux,
    dados: fichaDoModulo(raiz),
  };
}

/* ── índice de módulos do .pen, por prefixo de tela + nome ── */
const IGNORAR_MOD = /^(frame|row|col|sobrelinha|botão\/|ícone\/|status\/|logo\/|marca\/)/;
const modulos = {};
for (const tela of doc.children) {
  const prefixo = tela.name.match(/^(M?\d+)/)?.[1] || '';
  const anda = (n, p) => {
    if (n.name && !IGNORAR_MOD.test(n.name) && n.name !== tela.name && p <= 3) {
      modulos[`${prefixo}|${n.name}`] = n;
      return;
    }
    for (const f of n.children || []) anda(f, p + 1);
  };
  for (const f of tela.children || []) anda(f, 1);
}

/* ── renderizador de markdown, só o que este manual usa ── */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s) =>
  esc(s)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(])\*([^*]+)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

function render(texto) {
  const linhas = texto.split('\n');
  const out = [];
  let i = 0;
  // contexto: em qual tela da Parte 3 estamos, para achar o recorte certo
  let prefixoTela = '';
  let nModulo = 0;

  const fecharLista = (tipo) => out.push(`</${tipo}>`);

  while (i < linhas.length) {
    const l = linhas[i];

    // bloco de código — os longos ganham botão de copiar (são os comandos do Chrome)
    if (l.startsWith('```')) {
      const corpo = [];
      i++;
      while (i < linhas.length && !linhas[i].startsWith('```')) corpo.push(linhas[i++]);
      i++;
      const txt = corpo.join('\n');
      const botao = txt.length > 200
        ? `<button class="copiar-bloco" data-copia="${txt.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')}">copiar comando</button>`
        : '';
      out.push(`<div class="bloco">${botao}<pre><code>${esc(txt)}</code></pre></div>`);
      continue;
    }

    // tabela
    if (l.startsWith('|') && linhas[i + 1]?.match(/^\|[\s:|-]+\|$/)) {
      const cabeca = l.split('|').slice(1, -1).map((c) => c.trim());
      i += 2;
      const corpo = [];
      while (i < linhas.length && linhas[i].startsWith('|')) {
        corpo.push(linhas[i].split('|').slice(1, -1).map((c) => c.trim()));
        i++;
      }
      out.push(
        `<div class="rolagem"><table><thead><tr>${cabeca.map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead>` +
        `<tbody>${corpo.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`,
      );
      continue;
    }

    // citação
    if (l.startsWith('> ')) {
      const corpo = [];
      while (i < linhas.length && linhas[i].startsWith('>')) corpo.push(linhas[i++].replace(/^>\s?/, ''));
      out.push(`<blockquote>${render(corpo.join('\n'))}</blockquote>`);
      continue;
    }

    // lista de conferência
    if (l.match(/^- \[ \] /)) {
      out.push('<ul class="conferencia">');
      while (i < linhas.length && linhas[i].match(/^- \[ \] /)) {
        out.push(`<li><label><input type="checkbox" class="qa"> ${inline(linhas[i].slice(6))}</label></li>`);
        i++;
      }
      fecharLista('ul');
      continue;
    }

    // listas
    const marca = l.match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
    if (marca) {
      const ordenada = /\d/.test(marca[2]);
      out.push(ordenada ? '<ol>' : '<ul>');
      while (i < linhas.length) {
        const m = linhas[i].match(/^(\s*)([-*]|\d+\.)\s+(.*)$/);
        if (!m) {
          // continuação recuada da mesma linha
          if (linhas[i].match(/^\s{2,}\S/) && out[out.length - 1]?.startsWith('<li>')) {
            out[out.length - 1] = out[out.length - 1].replace(/<\/li>$/, ' ' + inline(linhas[i].trim()) + '</li>');
            i++;
            continue;
          }
          break;
        }
        out.push(`<li>${inline(m[3])}</li>`);
        i++;
      }
      fecharLista(ordenada ? 'ol' : 'ul');
      continue;
    }

    // títulos
    const t = l.match(/^(#{1,4})\s+(.*)$/);
    if (t) {
      const nivel = t[1].length;
      const texto = t[2];
      const id = texto.replace(/[^\wÀ-ú]+/g, '-').toLowerCase();

      // em que tela da Parte 3 estamos
      const secao3 = texto.match(/^3\.(\d)\s*·/);
      if (secao3) { prefixoTela = { 1: '01', 2: '02', 3: '03', 4: '04' }[secao3[1]] || ''; nModulo = 0; }

      // módulo: "### 7. `roteiro` — 1440 × 1136"
      const mod = texto.match(/^\d+\.\s+`([^`]+)`/);
      const vocab = texto.match(/^(V\d+)\s+·\s+(.+)$/);

      if (mod && prefixoTela) {
        nModulo++;
        const nome = mod[1];
        const chave = `${prefixoTela}|${nome}`;
        const png = arquivoDoRecorte(prefixoTela, nome);
        const existe = fs.existsSync(path.join(RAIZ, 'previa', 'modulos', png));
        const raiz = modulos[chave];
        out.push(`<section class="modulo" id="${id}" data-chave="${esc(chave)}">`);
        out.push(
          `<h3><label class="feito"><input type="checkbox" class="passo" data-id="${esc(chave)}"><span></span></label>` +
          `<span class="tit">${custoReal(chave, modulos[chave] || {}).repetidor ? '↻ ' : ''}${inline(texto)}</span></h3>`,
        );
        if (existe) {
          out.push(
            `<figure><img loading="lazy" src="previa/modulos/${png}" alt="${esc(nome)}">` +
            `<figcaption>recorte do módulo · clique para ampliar</figcaption></figure>`,
          );
        }
        if (raiz) {
          const f = tabelasDoModulo(raiz);
          out.push('<div class="ficha">');
          // a mesma spec em texto puro, para colar no Claude in Chrome sem depender de rede
          const spec = specTexto({
            modulo: nome, telaNome: TELA_NOME[prefixoTela] || prefixoTela,
            elementosNaWix: f.nReal, espacamentoQueNaoViraElemento: f.nAux,
            recorte: `previa/modulos/${png}`, elementos: f.dados,
          });
          const custo = custoReal(chave, raiz);
          out.push(
            `<p class="conta">` +
            (custo.repetidor
              ? `<b>${custo.montar}</b> elementos para montar <span>· ↻ <b>repetidor</b>: você monta UM item (${custo.porItem} elementos) e a coleção <code>${custo.repetidor.colecao}</code> multiplica por ${custo.repetidor.repete}. O design desenha os ${custo.repetidor.repete} para dar para conferir — daí os ${custo.desenhado} da ficha. Ver Parte 4.0</span>`
              : `<b>${f.nReal}</b> elementos para montar na Wix` +
                (f.nAux ? ` <span>· os outros ${f.nAux} são espaçamento do arquivo de design e viram recuo/margem, não elemento</span>` : '')) +
            `<button class="copiar-spec" data-copia="${spec.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')}">copiar especificação</button>` +
            `<button class="foco" data-foco="${esc(chave)}">Modo foco →</button></p>`,
          );
          out.push(`<p class="ficha-t">Textos <span>${f.nTextos}</span></p>${f.tabTextos}`);
          out.push(`<p class="ficha-t">Caixas, fios e fotos <span>${f.nCaixas}</span></p>${f.tabCaixas}`);
          out.push(
            `<details class="arvore"><summary>estrutura — como os elementos ficam aninhados</summary>` +
            `<pre><code>${esc(f.arvore)}</code></pre></details>`,
          );
          out.push(`<script type="application/json" class="dados">${JSON.stringify(f.dados).replace(/</g, '\\u003c')}</script>`);
          out.push('</div>');
        }
        i++;
        continue;
      }

      if (vocab) {
        out.push(
          `<h3 class="vocab" id="${id}"><label class="feito"><input type="checkbox" class="passo" data-id="V|${vocab[1]}"><span></span></label>` +
          `<span class="tit"><b>${vocab[1]}</b> ${inline(vocab[2])}</span></h3>`,
        );
        i++;
        continue;
      }

      out.push(`<h${nivel} id="${id}">${inline(texto)}</h${nivel}>`);
      i++;
      continue;
    }

    if (l.trim() === '---') { out.push('<hr>'); i++; continue; }
    if (!l.trim()) { i++; continue; }

    // parágrafo (junta linhas até a próxima em branco)
    const p = [l];
    i++;
    while (i < linhas.length && linhas[i].trim() && !linhas[i].match(/^(#{1,4}\s|[-*]\s|\d+\.\s|>|\||```|---)/)) p.push(linhas[i++]);
    out.push(`<p>${inline(p.join(' '))}</p>`);
  }
  return out.join('\n');
}

const corpo = render(md);

/* ── índice: só os módulos e as peças do vocabulário ── */
const itens = [...corpo.matchAll(/data-id="([^"]+)"[\s\S]{0,400}?<span class="tit">([\s\S]*?)<\/span>/g)].map((m) => ({
  id: m[1],
  rotulo: m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim(),
}));

const html = `<!doctype html>
<html lang="pt-BR"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Montagem na Wix · Desbravando v3</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<style>
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
:root{
  --papel:#F2F2F2; --branco:#fff; --tinta:#111; --cinza:#717171; --fraco:#9A9A9A;
  --linha:#D9D9D9; --marca:#111; --ok:#1FA35A;
  --texto:'Archivo',system-ui,sans-serif; --titulo:'Anton',sans-serif; --mono:'JetBrains Mono',monospace;
}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--papel);color:var(--tinta);font-family:var(--texto);font-size:15px;line-height:1.6}

/* barra fixa: onde estou + progresso */
#topo{position:sticky;top:0;z-index:40;background:#000;color:#fff;display:flex;align-items:center;gap:14px;padding:10px 16px}
#topo b{font-family:var(--titulo);font-weight:400;font-size:15px;letter-spacing:.3px}
#topo .barra{flex:1;height:4px;background:#ffffff29;position:relative;min-width:60px}
#topo .barra i{position:absolute;inset:0 auto 0 0;background:#fff;width:0;transition:width .2s}
#topo .n{font-family:var(--mono);font-size:11px;color:#ffffff8c;white-space:nowrap}
#topo button{font:600 11px/1 var(--texto);letter-spacing:1px;background:none;border:1px solid #ffffff61;color:#fff;padding:7px 10px;cursor:pointer}
#topo button:hover{background:#ffffff14}

.tudo{display:grid;grid-template-columns:236px minmax(0,1fr);gap:0;align-items:start}
@media (max-width:900px){.tudo{grid-template-columns:1fr}#indice{display:none}}

/* índice lateral */
#indice{position:sticky;top:47px;max-height:calc(100vh - 47px);overflow:auto;padding:18px 12px 40px;
  border-right:1px solid var(--linha);background:var(--papel)}
#indice h4{font:600 10px/1.2 var(--texto);letter-spacing:2.4px;text-transform:uppercase;color:var(--fraco);margin:14px 6px 8px}
#indice a{display:flex;gap:7px;align-items:baseline;text-decoration:none;color:var(--cinza);font-size:12.5px;padding:5px 6px;border-radius:3px}
#indice a:hover{background:#0000000a;color:var(--tinta)}
#indice a.pronto{color:var(--fraco)}
#indice a.pronto .r{text-decoration:line-through}
#indice a .m{font-family:var(--mono);font-size:10px;color:var(--fraco);flex:none}

/* coluna de leitura — largura pensada para meia tela */
main{max-width:760px;padding:26px 30px 120px}
h1{font-family:var(--titulo);font-weight:400;font-size:32px;line-height:1.05;margin:34px 0 12px;letter-spacing:-.4px}
h2{font-family:var(--titulo);font-weight:400;font-size:24px;line-height:1.1;margin:38px 0 12px;padding-top:14px;border-top:2px solid var(--tinta)}
h3{font-family:var(--titulo);font-weight:400;font-size:18px;line-height:1.2;margin:28px 0 10px;display:flex;gap:10px;align-items:flex-start;scroll-margin-top:60px}
h4{font:700 14px/1.3 var(--texto);margin:20px 0 8px}
p{margin:0 0 12px}
a{color:var(--tinta)}
hr{border:0;border-top:1px solid var(--linha);margin:28px 0}
code{font-family:var(--mono);font-size:.86em;background:#0000000d;padding:1px 5px;border-radius:3px}
pre{background:#fff;border:1px solid var(--linha);padding:14px;overflow:auto;margin:0}
pre code{background:none;padding:0;font-size:11.5px;line-height:1.55;white-space:pre}
blockquote{margin:14px 0;padding:12px 16px;background:#fff;border-left:2px solid var(--tinta)}
blockquote p:last-child{margin:0}
ul,ol{margin:0 0 12px;padding-left:22px}
li{margin:3px 0}
.rolagem{overflow-x:auto;margin:0 0 16px}
table{border-collapse:collapse;width:100%;font-size:13px}
th{text-align:left;font:600 10px/1.2 var(--texto);letter-spacing:1.6px;text-transform:uppercase;color:var(--cinza);
  border-bottom:2px solid var(--tinta);padding:8px 10px 8px 0;white-space:nowrap}
td{border-bottom:1px solid var(--linha);padding:9px 10px 9px 0;vertical-align:top}

/* módulo */
.modulo{scroll-margin-top:60px}
.modulo h3 .tit,.vocab .tit{flex:1}
.feito{flex:none;cursor:pointer;padding-top:2px}
.feito input{position:absolute;opacity:0;width:0;height:0}
.feito span{display:block;width:17px;height:17px;border:1.5px solid var(--tinta);background:#fff}
.feito input:checked + span{background:var(--tinta);position:relative}
.feito input:checked + span::after{content:"";position:absolute;left:5px;top:1px;width:5px;height:10px;
  border:solid #fff;border-width:0 2px 2px 0;transform:rotate(45deg)}
.modulo.pronto > h3 .tit,h3.vocab.pronto .tit{opacity:.42;text-decoration:line-through}
.modulo.pronto figure,.modulo.pronto details{opacity:.42}

figure{margin:12px 0 16px}
figure img{width:100%;display:block;border:1px solid var(--linha);background:#fff;cursor:zoom-in}
figcaption{font-family:var(--mono);font-size:10px;color:var(--fraco);margin-top:5px}

/* ficha: as tabelas de propriedade, sempre visíveis */
.ficha{margin:0 0 18px}
.ficha-t{font:600 10px/1.2 var(--texto);letter-spacing:2.4px;text-transform:uppercase;color:var(--cinza);
  margin:14px 0 6px;display:flex;gap:8px;align-items:baseline}
.ficha-t span{font-family:var(--mono);font-size:10px;color:var(--fraco);letter-spacing:0}
table.ficha-tab{font-size:12px;background:#fff;border:1px solid var(--linha);width:auto;min-width:100%}
table.ficha-tab th{padding:6px 8px;white-space:nowrap;font-size:9px;letter-spacing:1.2px;
  background:#fff;position:sticky;top:0}
table.ficha-tab td{padding:5px 8px;white-space:nowrap;vertical-align:middle}
table.ficha-tab td.num{font-family:var(--mono);font-size:10px;color:var(--fraco);text-align:right}
table.ficha-tab td.cont{white-space:normal;min-width:190px;max-width:340px}
table.ficha-tab td em{font-style:normal;color:var(--fraco);font-size:11px}
table.ficha-tab tr.aux td{color:var(--fraco)}
table.ficha-tab tr:hover td{background:#0000000a}
.mono{font-family:var(--mono);font-size:11px}
.vazio{color:var(--fraco)}
.tag{font-family:var(--mono);font-size:10px;background:#0000000d;padding:1px 5px;border-radius:3px}
.prof{color:var(--linha);letter-spacing:1px;margin-right:5px;font-family:var(--mono);font-size:10px}

/* clicar copia */
button.cor,button.copiar{font:inherit;background:none;border:0;padding:0;cursor:copy;text-align:left;color:inherit}
button.cor{display:inline-flex;gap:6px;align-items:center}
button.cor i{width:11px;height:11px;flex:none;border:1px solid #00000026;display:block}
button.cor em{font-style:normal;color:var(--fraco);font-size:11px}
button.copiar{border-bottom:1px dotted var(--linha)}
button.cor:hover,button.copiar:hover{background:#ffd88a66}
#copiado{position:fixed;bottom:18px;left:50%;transform:translateX(-50%);background:#111;color:#fff;
  font:600 11px/1 var(--texto);letter-spacing:1px;padding:10px 16px;z-index:95;opacity:0;
  transition:opacity .15s;pointer-events:none}
#copiado.on{opacity:1}

/* bloco de comando com botão de copiar */
.bloco{position:relative;margin:0 0 16px}
.bloco pre{max-height:340px;overflow:auto}
button.copiar-bloco{position:absolute;top:8px;right:8px;z-index:2;font:600 10px/1 var(--texto);
  letter-spacing:1.4px;text-transform:uppercase;background:var(--tinta);color:#fff;border:0;
  padding:8px 11px;cursor:pointer}
button.copiar-bloco:hover{background:#000}

/* contagem honesta + entrada do modo foco */
.conta{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;background:#fff;border:1px solid var(--linha);
  padding:10px 12px;margin:0 0 4px;font-size:12.5px}
.conta>b{font-family:var(--titulo);font-weight:400;font-size:17px}
.conta span b{font:inherit;font-weight:600;color:var(--tinta)}
.conta span code{font-size:.9em}
.conta span{color:var(--cinza);font-size:11.5px}
button.copiar-spec{margin-left:auto;font:600 10px/1 var(--texto);letter-spacing:1.4px;text-transform:uppercase;
  background:none;border:1px solid var(--tinta);color:var(--tinta);padding:8px 11px;cursor:pointer;white-space:nowrap}
button.copiar-spec:hover{background:#ffd88a66}
button.foco{font:600 10px/1 var(--texto);letter-spacing:1.4px;text-transform:uppercase;
  background:var(--tinta);color:#fff;border:0;padding:8px 12px;cursor:pointer;white-space:nowrap}
button.foco:hover{background:#000}

/* MODO FOCO — um elemento por vez, para não perder o lugar entre o manual e o Editor */
#foco{position:fixed;right:16px;bottom:16px;width:min(430px,calc(100vw - 32px));z-index:80;
  background:#fff;border:2px solid var(--tinta);box-shadow:0 18px 50px #00000038;display:flex;flex-direction:column}
#foco[hidden]{display:none}
#foco .cabeca{display:flex;gap:10px;align-items:center;background:var(--tinta);color:#fff;padding:9px 12px}
#foco .cabeca b{font-family:var(--titulo);font-weight:400;font-size:14px;flex:1;
  overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
#foco .cabeca .n{font-family:var(--mono);font-size:11px;color:#ffffff8c;white-space:nowrap}
#foco .cabeca button{font:600 10px/1 var(--texto);letter-spacing:1px;background:none;border:1px solid #ffffff61;
  color:#fff;padding:6px 8px;cursor:pointer}
#foco .corpo{padding:14px 16px;max-height:52vh;overflow:auto}
#foco .tipo{margin:0 0 8px;font:600 10px/1.2 var(--texto);letter-spacing:2.4px;text-transform:uppercase;color:var(--cinza)}
#foco .tipo em{font-style:normal;color:var(--fraco);margin-left:8px;letter-spacing:0;text-transform:none;font-weight:400;font-size:11px}
#foco .conteudo{margin:0 0 14px;font-size:17px;line-height:1.35;color:var(--tinta);cursor:copy;
  border-left:2px solid var(--tinta);padding-left:12px;white-space:pre-wrap}
#foco .conteudo:hover{background:#ffd88a66}
#foco .conteudo:empty{display:none}
#foco dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:0 14px;font-size:13.5px}
#foco dt{color:var(--cinza);padding:5px 0;border-top:1px solid var(--linha);font-size:11.5px}
#foco dd{margin:0;padding:5px 0;border-top:1px solid var(--linha);font-family:var(--mono);font-size:12.5px;
  display:flex;gap:7px;align-items:center}
#foco dd i{width:11px;height:11px;border:1px solid #00000026;flex:none}
#foco dd.copiavel{cursor:copy}
#foco dd.copiavel:hover{background:#ffd88a66}
#foco .pe{display:flex;gap:8px;align-items:center;border-top:1px solid var(--linha);padding:10px 12px}
#foco .pe button{font:600 11px/1 var(--texto);letter-spacing:.8px;background:none;border:1px solid var(--linha);
  padding:10px 12px;cursor:pointer}
#foco .pe button.forte{background:var(--tinta);color:#fff;border-color:var(--tinta);flex:1}
#foco .pe label{margin-left:auto;font-size:11px;color:var(--cinza);display:flex;gap:5px;align-items:center;cursor:pointer}
@media(max-width:620px){#foco{right:8px;left:8px;bottom:8px;width:auto}}

details.arvore{margin:12px 0 0;border:1px solid var(--linha);background:#fff}
details.arvore summary{cursor:pointer;padding:9px 12px;font:600 10px/1.2 var(--texto);letter-spacing:1.6px;
  text-transform:uppercase;color:var(--cinza);user-select:none}
details.arvore summary:hover{color:var(--tinta)}
details.arvore[open] summary{border-bottom:1px solid var(--linha)}
details.arvore pre{border:0}

ul.conferencia{list-style:none;padding:0}
ul.conferencia li{margin:0;border-bottom:1px solid var(--linha)}
ul.conferencia label{display:flex;gap:10px;align-items:flex-start;padding:9px 2px;cursor:pointer}
ul.conferencia input{margin-top:4px;flex:none;accent-color:var(--tinta);width:15px;height:15px}
ul.conferencia input:checked + *{opacity:.45}

/* lupa */
#lupa{position:fixed;inset:0;z-index:90;background:#000000e8;display:none;overflow:auto;padding:20px;cursor:zoom-out}
#lupa img{display:block;margin:0 auto;max-width:100%;background:#fff}
#lupa.on{display:block}
@media print{#topo,#indice{display:none}.tudo{display:block}main{max-width:none}}
</style>
</head><body>

<div id="topo">
  <b>Montagem · Desbravando v3</b>
  <div class="barra"><i id="pgb"></i></div>
  <span class="n" id="pgt">0 / 0</span>
  <button id="limpar">Zerar</button>
</div>

<div class="tudo">
  <nav id="indice"></nav>
  <main>${corpo}</main>
</div>

<div id="lupa"><img alt=""></div>
<div id="copiado">copiado</div>

<div id="foco" hidden>
  <div class="cabeca">
    <b id="f-mod"></b>
    <span class="n" id="f-pos"></span>
    <button id="f-fechar">Fechar · Esc</button>
  </div>
  <div class="corpo">
    <p class="tipo"><span id="f-tipo"></span><em id="f-nome"></em></p>
    <p class="conteudo" id="f-conteudo"></p>
    <dl id="f-campos"></dl>
  </div>
  <div class="pe">
    <button id="f-ant">← anterior</button>
    <button id="f-prox" class="forte">próximo →</button>
    <label><input type="checkbox" id="f-pular"> pular espaçamento</label>
  </div>
</div>

<script>
(function () {
  var CHAVE = 'desbravando-montagem-v3';
  var estado = {};
  try { estado = JSON.parse(localStorage.getItem(CHAVE) || '{}'); } catch (e) {}

  var passos = [].slice.call(document.querySelectorAll('.passo'));
  var qa = [].slice.call(document.querySelectorAll('.qa'));
  var barra = document.getElementById('pgb');
  var txt = document.getElementById('pgt');

  /* índice lateral, montado a partir dos próprios módulos */
  var indice = document.getElementById('indice');
  var grupoAtual = '';
  var htmlIdx = '';
  passos.forEach(function (p) {
    var id = p.dataset.id;
    var alvo = p.closest('.modulo') || p.closest('h3');
    var rotulo = alvo.querySelector('.tit').textContent.replace(/\\s+/g, ' ').trim();
    var grupo = id.split('|')[0];
    var nomeGrupo = { 'V': 'Vocabulário', '01': 'Home', '02': 'Grupo Avulso', '03': 'Página da Expedição', '04': 'Grupo Fechado' }[grupo] || grupo;
    if (grupo !== grupoAtual) { htmlIdx += '<h4>' + nomeGrupo + '</h4>'; grupoAtual = grupo; }
    var num = rotulo.match(/^(V?\\d+)/);
    var limpo = rotulo.replace(/^\\d+\\.\\s*/, '').replace(/\\s+—.*$/, '');
    htmlIdx += '<a href="#' + alvo.id + '" data-id="' + id + '"><span class="m">' + (num ? num[1] : '·') + '</span><span class="r">' + limpo + '</span></a>';
  });
  indice.innerHTML = htmlIdx;
  var elos = [].slice.call(indice.querySelectorAll('a'));

  function pintar() {
    var feitos = 0;
    passos.forEach(function (p) {
      var alvo = p.closest('.modulo') || p.closest('h3');
      if (p.checked) { feitos++; alvo.classList.add('pronto'); } else { alvo.classList.remove('pronto'); }
    });
    elos.forEach(function (a) {
      a.classList.toggle('pronto', !!estado[a.dataset.id]);
    });
    var pct = passos.length ? (feitos / passos.length) * 100 : 0;
    barra.style.width = pct + '%';
    txt.textContent = feitos + ' / ' + passos.length;
  }

  function guardar() { localStorage.setItem(CHAVE, JSON.stringify(estado)); }

  passos.forEach(function (p) {
    p.checked = !!estado[p.dataset.id];
    p.addEventListener('change', function () {
      estado[p.dataset.id] = p.checked;
      guardar(); pintar();
    });
  });
  qa.forEach(function (c, i) {
    c.checked = !!estado['qa' + i];
    c.addEventListener('change', function () { estado['qa' + i] = c.checked; guardar(); });
  });

  document.getElementById('limpar').addEventListener('click', function () {
    if (!confirm('Zerar todo o progresso da montagem?')) return;
    estado = {}; guardar();
    passos.forEach(function (p) { p.checked = false; });
    qa.forEach(function (c) { c.checked = false; });
    pintar();
  });

  /* clicar num hexadecimal ou num texto copia para a área de transferência */
  var aviso = document.getElementById('copiado');
  var t0;
  function avisar(txt) {
    aviso.textContent = txt.length > 40 ? 'copiado: ' + txt.slice(0, 37) + '…' : 'copiado: ' + txt;
    aviso.classList.add('on');
    clearTimeout(t0);
    t0 = setTimeout(function () { aviso.classList.remove('on'); }, 1300);
  }
  // atenção: aberto por file:// o navegador não considera contexto seguro e a API
  // de área de transferência REJEITA. O plano B com textarea é o que realmente roda aqui.
  function copiar(txt) {
    var ta = document.createElement('textarea');
    ta.value = txt;
    ta.style.cssText = 'position:fixed;left:-9999px;top:0';
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
    ta.remove();
    return ok;
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copia]');
    if (!b) return;
    var txt = b.dataset.copia;
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(txt).then(function () { avisar(txt); },
        function () { if (copiar(txt)) avisar(txt); });
    } else if (copiar(txt)) {
      avisar(txt);
    }
  });

  /* ── MODO FOCO — um elemento por vez ─────────────────────────────────
     Existe porque o custo real não é achar a medida, é PERDER O LUGAR entre
     a tabela e o Editor. Aqui o elemento fica sozinho na tela e a seta avança. */
  var foco = document.getElementById('foco');
  var fLista = [], fIdx = 0, fMod = '';
  var elTipo = document.getElementById('f-tipo'), elNome = document.getElementById('f-nome');
  var elCont = document.getElementById('f-conteudo'), elCampos = document.getElementById('f-campos');
  var elPos = document.getElementById('f-pos'), elMod = document.getElementById('f-mod');
  var pular = document.getElementById('f-pular');

  function visiveis() {
    return pular.checked ? fLista.filter(function (i) { return !i.aux; }) : fLista;
  }
  function desenhar() {
    var lista = visiveis();
    if (!lista.length) return;
    if (fIdx >= lista.length) fIdx = lista.length - 1;
    if (fIdx < 0) fIdx = 0;
    var it = lista[fIdx];
    elTipo.textContent = it.tipo;
    elNome.textContent = it.nome || '';
    elCont.textContent = it.conteudo || '';
    elCont.dataset.copia = it.conteudo || '';
    elPos.textContent = (fIdx + 1) + ' / ' + lista.length + '  ·  nº ' + it.num;
    elCampos.innerHTML = it.campos.map(function (c) {
      var amostra = c[2] ? '<i style="background:' + c[2] + '"></i>' : '';
      var copia = c[2] ? ' class="copiavel" data-copia="' + c[2] + '"' : '';
      return '<dt>' + c[0] + '</dt><dd' + copia + '>' + amostra + c[1] + '</dd>';
    }).join('');
  }
  function abrirFoco(chave) {
    var sec = document.querySelector('[data-chave="' + chave + '"]');
    if (!sec) return;
    var dados = sec.querySelector('script.dados');
    if (!dados) return;
    fLista = JSON.parse(dados.textContent);
    fMod = sec.querySelector('.tit').textContent.replace(/\\s+/g, ' ').trim();
    elMod.textContent = fMod;
    fIdx = 0;
    foco.hidden = false;
    desenhar();
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-foco]');
    if (b) { abrirFoco(b.dataset.foco); return; }
    // clicar numa linha da tabela abre o foco já naquele elemento
    var tr = e.target.closest('table.ficha-tab tbody tr');
    if (tr && !e.target.closest('[data-copia]')) {
      var sec = tr.closest('.modulo');
      if (!sec) return;
      abrirFoco(sec.dataset.chave);
      var num = parseInt(tr.querySelector('td.num').textContent, 10);
      var lista = visiveis();
      for (var i = 0; i < lista.length; i++) if (lista[i].num === num) { fIdx = i; break; }
      desenhar();
    }
  });
  document.getElementById('f-fechar').addEventListener('click', function () { foco.hidden = true; });
  document.getElementById('f-prox').addEventListener('click', function () { fIdx++; desenhar(); });
  document.getElementById('f-ant').addEventListener('click', function () { fIdx--; desenhar(); });
  pular.addEventListener('change', function () { fIdx = 0; desenhar(); });
  document.addEventListener('keydown', function (e) {
    if (foco.hidden) return;
    if (e.target.matches('input,textarea')) return;
    if (e.key === 'ArrowRight' || e.key === 'Enter') { e.preventDefault(); fIdx++; desenhar(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); fIdx--; desenhar(); }
    if (e.key === 'Escape') foco.hidden = true;
  });

  /* lupa nas figuras */
  var lupa = document.getElementById('lupa');
  var lupaImg = lupa.querySelector('img');
  document.addEventListener('click', function (e) {
    if (e.target.tagName === 'IMG' && e.target.closest('figure')) {
      lupaImg.src = e.target.src; lupa.classList.add('on');
    } else if (lupa.classList.contains('on')) {
      lupa.classList.remove('on');
    }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lupa.classList.remove('on'); });

  pintar();
})();
</script>
</body></html>`;

const saida = path.join(RAIZ, 'manual-de-montagem.html');
fs.writeFileSync(saida, html, 'utf8');
console.log(`${itens.length} passos com caixa de conferência`);
console.log(`${(fs.statSync(saida).size / 1024).toFixed(0)} KB\n→ manual-de-montagem.html`);

/* ── a mesma especificação, UM ARQUIVO POR MÓDULO ───────────────────────
   O painel em HTML é para gente. Um agente de navegador lê valor cru melhor do que
   interpreta tabela na tela.
   Um arquivo só não serve: junto dá 1,4 MB e o agente não consegue ler a página
   inteira. Quebrado por módulo, cada um fica em 5–40 KB e ele busca só o que precisa. */
const DIR_DADOS = path.join(RAIZ, 'dados');
fs.rmSync(DIR_DADOS, { recursive: true, force: true });
fs.mkdirSync(DIR_DADOS, { recursive: true });

/** Versão em texto puro — para colar direto no chat quando não der para navegar. */
function specTexto(m) {
  const linhas = [
    `MÓDULO: ${m.modulo}   ·   tela: ${m.telaNome}`,
    `${m.elementosNaWix} elementos para montar na Wix` +
      (m.espacamentoQueNaoViraElemento ? ` (+${m.espacamentoQueNaoViraElemento} de espaçamento, que viram recuo/margem e NÃO são elemento)` : ''),
    `Recorte de como deve ficar: ${m.recorte}`,
    '',
    'Grade do projeto: tela 1440 · conteúdo 1200 · recuo lateral 120 (celular 20)',
    '',
    '─'.repeat(72),
  ];
  for (const e of m.elementos) {
    const marca = e.aux ? '  [espaçamento — vira recuo, não é elemento]' : '';
    linhas.push('', `nº ${e.num} · ${e.tipo.toUpperCase()}${e.nome ? ` "${e.nome}"` : ''}${marca}`);
    if (e.conteudo) linhas.push(`   texto: "${e.conteudo.replace(/\n/g, '\\n')}"`);
    const pares = e.campos.filter((c) => c[1] !== '—').map((c) => `${c[0]}: ${c[1]}`);
    // quebra em linhas de no máximo ~76 colunas
    let atual = '  ';
    for (const p of pares) {
      if ((atual + p).length > 76) { linhas.push(atual.trimEnd()); atual = '  '; }
      atual += ' ' + p + '  ·';
    }
    if (atual.trim()) linhas.push(atual.replace(/·$/, '').trimEnd());
  }
  return linhas.join('\n') + '\n';
}

const indice = [];
for (const [chave, raiz] of Object.entries(modulos)) {
  const f = tabelasDoModulo(raiz);
  const [tela, nome] = chave.split('|');
  const base = nomeArquivo(tela, nome);
  const m = {
    tela, telaNome: TELA_NOME[tela] || tela, modulo: nome,
    elementosNaWix: f.nReal,
    espacamentoQueNaoViraElemento: f.nAux,
    recorte: `previa/modulos/${arquivoDoRecorte(tela, nome)}`,
    elementos: f.dados,
  };
  fs.writeFileSync(path.join(DIR_DADOS, `${base}.json`), JSON.stringify(m, null, 1), 'utf8');
  fs.writeFileSync(path.join(DIR_DADOS, `${base}.txt`), specTexto(m), 'utf8');
  indice.push({ chave, tela, telaNome: m.telaNome, modulo: nome, base, elementosNaWix: f.nReal });
}
fs.writeFileSync(path.join(DIR_DADOS, 'index.json'), JSON.stringify({
  projeto: 'Desbravando UTV · repaginação v3',
  grade: { larguraTela: 1440, larguraConteudo: 1200, recuoLateral: 120, recuoLateralMobile: 20 },
  cores: NOME_COR,
  comoUsar: 'Cada módulo tem dois arquivos nesta pasta: <base>.json (estruturado) e <base>.txt (texto puro). Use o campo "base" de cada item abaixo.',
  modulos: indice,
}, null, 1), 'utf8');

// página de índice, para o agente (ou você) achar o módulo sem adivinhar nome de arquivo
const porTela = {};
for (const i of indice) (porTela[i.telaNome] = porTela[i.telaNome] || []).push(i);
fs.writeFileSync(path.join(DIR_DADOS, 'index.html'), `<!doctype html><meta charset="utf-8">
<title>Especificação por módulo · Desbravando v3</title>
<style>body{font:14px/1.6 system-ui;max-width:760px;margin:40px auto;padding:0 20px}
h1{font-size:20px}h2{font-size:14px;text-transform:uppercase;letter-spacing:2px;color:#717171;margin-top:28px}
table{border-collapse:collapse;width:100%}td{padding:5px 10px 5px 0;border-bottom:1px solid #eee}
a{color:#111}code{background:#f2f2f2;padding:1px 5px}</style>
<h1>Especificação por módulo</h1>
<p>Cada módulo em dois formatos: <code>.json</code> estruturado e <code>.txt</code> em texto puro.
O número é quantos elementos realmente se cria no Editor da Wix.</p>
${Object.entries(porTela).map(([tela, itens]) => `<h2>${tela}</h2><table>${itens.map((i) =>
  `<tr><td><b>${i.modulo}</b></td><td>${i.elementosNaWix} elementos</td>` +
  `<td><a href="${i.base}.json">json</a> · <a href="${i.base}.txt">txt</a></td></tr>`).join('')}</table>`).join('')}
`, 'utf8');

const kb = (f) => (fs.statSync(path.join(DIR_DADOS, f)).size / 1024).toFixed(0);
console.log(`${indice.length} módulos → dados/ (json + txt)`);
console.log(`  maior: ${Math.max(...fs.readdirSync(DIR_DADOS).filter((f) => f.endsWith('.json')).map((f) => +kb(f)))} KB · índice em dados/index.html`);

/* ══════════════════════════════════════════════════════════════════════
   BRIEFING DO AGENTE — uma URL só
   O painel é escrito para o Pedro. Esta página é escrita PARA O AGENTE de
   navegador: é a tarefa inteira, não a referência. Assim basta mandar a URL
   e dizer "siga as instruções desta página".
   ══════════════════════════════════════════════════════════════════════ */
const B = 'http://localhost:8787';
const homeMods = indice.filter((i) => i.tela === '01');

const agente = `<!doctype html><meta charset="utf-8">
<title>Instruções · reconstruir a Home do desbravandoutv.com</title>
<style>
body{font:15px/1.65 system-ui,sans-serif;max-width:820px;margin:0 auto;padding:40px 24px 120px;color:#111}
h1{font-size:26px;line-height:1.2;margin:0 0 6px}
h2{font-size:13px;text-transform:uppercase;letter-spacing:2.4px;color:#717171;margin:38px 0 10px;
   border-top:2px solid #111;padding-top:14px}
h3{font-size:16px;margin:22px 0 6px}
.sub{color:#717171;margin:0 0 8px}
table{border-collapse:collapse;width:100%;font-size:14px;margin:10px 0 18px}
th{text-align:left;font-size:11px;letter-spacing:1.4px;text-transform:uppercase;color:#717171;
   border-bottom:2px solid #111;padding:7px 10px 7px 0}
td{border-bottom:1px solid #e2e2e2;padding:7px 10px 7px 0;vertical-align:top}
code{background:#f2f2f2;padding:1px 5px;font-size:.9em}
ol,ul{padding-left:22px}li{margin:5px 0}
.alerta{border-left:3px solid #111;background:#f7f7f7;padding:12px 16px;margin:16px 0}
.alerta b{display:block;margin-bottom:4px}
.alerta ul{margin:0}.alerta li{margin:6px 0}
a{color:#111}
.sw{display:inline-block;width:11px;height:11px;border:1px solid #0002;vertical-align:-1px;margin-right:6px}
</style>

<h1>Reconstruir a Home do desbravandoutv.com</h1>
<p class="sub">Instruções para um agente de navegador. Leia esta página inteira antes de agir.</p>

<div class="alerta">
<b>Regras que valem o tempo todo</b>
<ul>
<li><b>NÃO PUBLIQUE</b> em momento nenhum. Salve como rascunho e avise quando terminar.</li>
<li>Trabalhe só na página <b>Home</b> — não toque em outras páginas, no tema já configurado, nem nas coleções do CMS.</li>
<li>Não invente conteúdo. Todo texto vem da especificação de cada módulo.</li>
<li>Se algo travar por mais de duas tentativas, <b>pule o módulo</b>, anote o motivo e siga.</li>
</ul>
</div>

<h2>O que você vai fazer</h2>
<p>Substituir o conteúdo atual da Home por uma versão nova, montada módulo a módulo.
São <b>12 módulos</b>. Para cada um existe: uma <b>especificação em texto</b> com todos os
elementos e suas propriedades, e um <b>recorte em imagem</b> de como deve ficar.</p>
<p>Monte <b>um módulo por vez</b>. Ao terminar cada um: compare com o recorte, diga o que
ficou diferente e por quê, e só então vá para o próximo. Vá removendo as seções antigas da
Home conforme a nova equivalente ficar pronta — não apague tudo de uma vez.</p>

<h2>A grade</h2>
<table>
<tr><td>Largura da tela de referência</td><td><b>1440 px</b></td></tr>
<tr><td>Largura de conteúdo das seções</td><td><b>1200 px</b> — o padrão da Wix é 980, troque</td></tr>
<tr><td>Recuo lateral</td><td><b>120 px</b> de cada lado</td></tr>
</table>

<h2>A paleta</h2>
<table><tr><th>Cor</th><th>Onde</th></tr>
${[['#F2F2F2', 'papel', 'fundo padrão das seções'], ['#FFFFFF', 'branco', 'faixas de leitura longa'],
   ['#000000', 'preto', 'nav, rodapé, comunidade'], ['#111111', 'tinta', 'texto principal e fio forte'],
   ['#717171', 'cinza', 'texto secundário'], ['#9A9A9A', 'cinza fraco', 'rótulo e número'],
   ['#D9D9D9', 'linha', 'fio leve entre itens']]
  .map(([h, n, u]) => `<tr><td><span class="sw" style="background:${h}"></span><code>${h}</code> ${n}</td><td>${u}</td></tr>`).join('')}
</table>
<p>Sobre fundo preto, o texto usa branco com transparência: <b>82%</b> corpo, <b>55%</b>
rótulo, <b>16%</b> fio. <b>Não existe cor de destaque no projeto</b> — se aparecer azul ou
verde em algum lugar, é erro.</p>

<h2>A tipografia</h2>
<table><tr><th>Estilo</th><th>Fonte</th><th>Tam.</th><th>Peso</th><th>Entrelinha</th><th>Entre letras</th></tr>
${[['display', 'Anton', 72, 400, '1.0', '−0.5'], ['h1', 'Anton', 48, 400, '1.04', '−0.4'],
   ['h2', 'Anton', 34, 400, '1.08', '−0.4'], ['h3', 'Anton', 24, 400, '1.12', '−0.3'],
   ['índice', 'Anton', 44, 400, '1.0', '−0.4'], ['corpo grande', 'Archivo', 18, 400, '1.6', '0'],
   ['corpo', 'Archivo', 16, 400, '1.6', '0'], ['corpo pequeno', 'Archivo', 13.5, 400, '1.5', '0'],
   ['sobrelinha', 'Archivo', 11, 600, '1.2', '+3'], ['mono', 'JetBrains Mono', 12, 400, '1.4', '+0.4'],
   ['botão', 'Archivo', 12, 600, '1.0', '+1.4']]
  .map((r) => `<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]} px</td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td></tr>`).join('')}
</table>
<p><b>Anton só existe no peso 400.</b> Se o painel oferecer negrito para ela, deixe
desmarcado — negrito falso deixa o título sujo. <b>Sobrelinha é digitada em caixa alta</b>,
não use transformação automática.</p>

<h2>Peças que se repetem — monte uma vez e reaproveite</h2>
<p>Estas aparecem em vários módulos. Monte cada uma, salve como seção reutilizável e
reaproveite. É o que evita refazer a mesma coisa dezenas de vezes.</p>
<ul>
<li><b>Fio leve</b> — caixa de altura <b>1 px</b>, largura 100%, fundo <code>#D9D9D9</code></li>
<li><b>Fio forte</b> — caixa de altura <b>2 px</b>, largura 100%, fundo <code>#111111</code>. Abre e fecha toda lista</li>
<li><b>Botão sólido</b> — caixa preta, altura 48, recuo 22, canto reto; dentro, texto no estilo botão em branco + seta 13×13, espaço 9</li>
<li><b>Linha de dado tabulado</b> — linha com recuo 13, fio leve embaixo: rótulo em sobrelinha cinza fraco numa coluna de 128 px + valor em corpo pequeno que estica</li>
</ul>
<div class="alerta"><b>Não use o elemento "Divisor" da Wix para os fios.</b>
Ele tem margem própria que você vai brigar para zerar. Use caixa com fundo.</div>
<p><b>Canto reto em tudo.</b> O único arredondamento do projeto é o círculo das setas do carrossel.</p>

<h2>Os 12 módulos, nesta ordem</h2>
<table><tr><th>#</th><th>Módulo</th><th>Elementos</th><th>Especificação</th><th>Como deve ficar</th></tr>
${homeMods.map((m, i) => `<tr><td>${i + 1}</td><td><b>${m.modulo}</b></td>` +
  `<td>${m.elementosNaWix}</td>` +
  `<td><a href="${B}/dados/${m.base}.txt">texto</a> · <a href="${B}/dados/${m.base}.json">json</a></td>` +
  `<td><a href="${B}/previa/modulos/${m.base}.png">imagem</a></td></tr>`).join('')}
</table>
<p>A coluna <b>Elementos</b> é quantos elementos você realmente cria no Editor. A
especificação lista mais itens do que isso: os marcados como
<b>espaçamento</b> (<code>respiro</code>, <code>mola</code>, <code>recuo lateral</code>)
existem só no arquivo de design e viram <b>recuo, margem ou espaço entre itens</b> do
container — não são elemento.</p>

<h2>Como ler a especificação</h2>
<p>Cada elemento vem assim:</p>
<pre style="background:#f2f2f2;padding:14px;overflow:auto;font-size:13px">nº 6 · TEXTO
   texto: "O DESBRAVANDO"
   Fonte: Archivo · Tamanho: 11 px · Peso: 600 · Cor: #717171 cinza ·
   Entrelinha: 1.2 · Entre letras: +3 · Largura: automática</pre>
<p><code>Largura: estica</code> significa ocupar o espaço disponível (largura 100%).
<code>Largura: automática</code> significa encolher no conteúdo. Os números indentam por
nível: um elemento mais indentado está dentro do anterior.</p>

<h2>Quando terminar</h2>
<p>Me devolva uma lista, módulo por módulo:</p>
<ol>
<li>o que ficou fiel ao recorte;</li>
<li>o que ficou diferente, e por quê;</li>
<li>o que não deu para fazer — campo que não existe no painel, recurso indisponível, etc.</li>
</ol>
<p>E diga também: <b>o Editor é o clássico ou o Wix Studio?</b> E um print da página inteira.</p>
`;
fs.writeFileSync(path.join(RAIZ, 'agente.html'), agente, 'utf8');
console.log(`briefing do agente (${homeMods.length} módulos da Home)\n→ agente.html`);
