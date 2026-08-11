// Gera UM PAINEL DE MONTAGEM POR PÁGINA, em 5 passes.
//
// Substitui o `montagem.mjs`, que só sabia montar a Home. A estrutura de passes é a
// mesma — mudou só que agora vale para as três páginas, e o celular entrou como Passe 5.
//
//   Passe 1 · Esqueleto   as seções vazias, com fundo e respiro certos
//   Passe 2 · Conteúdo    os textos, aplicando o estilo do tema (que já está configurado)
//   Passe 3 · Estrutura   containers, colunas e fios
//   Passe 4 · Retoques    o que difere do tema: largura exata, espaço, exceção
//   Passe 5 · Celular     módulo inteiro de uma vez — o desenho já é conhecido
//
// Rodar:  node design/paginas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { nomeArquivo } from './recorte-nome.mjs';
import {
  esqueletoDe, conteudoDe, estruturaDe, retoquesDe, modulosDaTela, esc, chip,
  fichaDoModulo, specTexto,
} from './lib/leitura-pen.mjs';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.join(DIR, '..');
const doc = JSON.parse(fs.readFileSync(path.join(DIR, 'desbravando-repaginacao.pen'), 'utf8'));

const PAGINAS = [
  {
    slug: 'home', nome: 'Home', endereco: '/', desktop: '01', mobile: 'M1',
    arquivo: 'montagem-home.html',
    nota: '<b>Já está no ar.</b> O que sobrou aqui é acabamento — confira contra os recortes.',
  },
  {
    slug: 'grupo-avulso', nome: 'Grupo Avulso', endereco: '/expedicoes', desktop: '02', mobile: 'M3',
    arquivo: 'montagem-grupo-avulso.html',
    nota: '<b>Comece por esta.</b> Página estática, e as coleções do CMS <b>já existem</b> — a agenda pode ser repetidor ligado a <code>Expedicoes</code> desde já, filtrado por <code>publicado = sim</code> e ordenado por <code>dataInicio</code>. As 5 expedições já estão cadastradas.',
  },
  {
    slug: 'expedicao', nome: 'Página da Expedição', endereco: '/expedicoes/{titulo}', desktop: '03', mobile: 'M2',
    arquivo: 'montagem-expedicao.html',
    nota: '<b>Página dinâmica</b> — UMA página serve todas as expedições. A coleção <code>Expedicoes</code> <b>já existe e está carregada</b> (Costa Doce completa + 4 rascunhos), então dá para criar a página dinâmica agora. Roteiro, Hospedagens e Guia são repetidores ligados às tabelas-filhas; o FAQ são <b>dois</b> repetidores (desta expedição + gerais).',
  },
];

/* ─────────────────────────── pedaços de tabela ─────────────────────────── */

const cabecaModulo = (d, pref, extra) =>
  `<h3><label class="feito"><input type="checkbox" class="passo" data-id="${pref}|${esc(d.chave)}"><span></span></label>` +
  `<span class="tit">${d.i}. ${esc(d.nome)}</span><em>${extra}</em></h3>`;

/** Barra de ferramentas do módulo: contagem honesta + copiar tudo + modo foco. */
const ferramentas = (d, pref) => {
  const aux = d.ficha.filter((e) => e.aux).length;
  const real = d.ficha.length - aux;
  const spec = specTexto({
    modulo: d.nome, tela: d.telaNome, elementos: d.ficha,
    elementosNaWix: real, aux, recorte: `previa/modulos/${d.base}.png`,
  });
  return `<p class="conta"><b>${real}</b> elementos para montar na Wix` +
    (aux ? ` <span>· os outros ${aux} são espaçamento e viram recuo, não elemento</span>` : '') +
    `<button class="copiar-spec" data-copia="${esc(spec)}">copiar especificação</button>` +
    `<button class="foco" data-foco="${pref}|${esc(d.chave)}">Modo foco →</button></p>` +
    `<script type="application/json" class="dados">${JSON.stringify(d.ficha).replace(/</g, '\u003c')}</script>`;
};

const figura = (d) =>
  `<figure><img loading="lazy" src="previa/modulos/${d.base}.png" alt="${esc(d.nome)}">` +
  `<figcaption>clique para ampliar</figcaption></figure>`;

const tabEsqueleto = (dados) => `
<div class="rolagem"><table class="grande">
<thead><tr><th></th><th>#</th><th>Seção</th><th>Fundo</th><th>Respiro topo</th><th>Respiro base</th><th>Altura final</th></tr></thead>
<tbody>${dados.map((d) => `<tr>
<td><label class="feito"><input type="checkbox" class="passo" data-id="p1|${esc(d.chave)}"><span></span></label></td>
<td class="num">${d.i}</td><td><b>${esc(d.nome)}</b></td>
<td>${chip(d.esqueleto.fundo, d.esqueleto.fundoHex)}</td>
<td class="mono">${d.esqueleto.alturaTravada ? '—' : (d.esqueleto.respiroTopo ?? '—') + ' px'}</td>
<td class="mono">${d.esqueleto.alturaTravada ? '—' : (d.esqueleto.respiroBase ?? '—') + ' px'}</td>
<td class="mono">${d.esqueleto.alturaTravada ? `travada ${d.esqueleto.alturaTravada} px` : (d.esqueleto.altura || '—') + ' px'}</td>
</tr>`).join('')}</tbody></table></div>`;

// O nome do estilo do tema é o que acelera a montagem; os números ao lado são para
// conferir. Ontem eu tinha só os números, hoje quase só o estilo — os dois juntos.
const tabTextos = (d) => (d.conteudo.length
  ? `<div class="rolagem"><table><thead><tr><th>nº</th><th>Texto</th><th>Estilo</th><th>Cor</th><th>Fonte</th><th>Tam.</th><th>Peso</th><th>Entrelinha</th><th>Entre letras</th><th>Largura</th><th>Alinh.</th></tr></thead><tbody>${
      d.conteudo.map((c) => {
        const f = d.ficha.find((x) => x.num === c.num);
        const v = (rot) => f?.campos.find((k) => k[0] === rot)?.[1] ?? '—';
        return `<tr><td class="num">${c.num}</td>
<td class="cont"><button class="copiar" data-copia="${esc(c.texto)}">${esc(c.texto.replace(/\n/g, ' ⏎ '))}</button></td>
<td>${c.estilo ? `<b>${c.estilo}</b>` : '<span class="vazio">—</span>'}</td>
<td>${chip(c.cor, c.corHex)}</td>
<td>${v('Fonte')}</td><td class="mono">${v('Tamanho')}</td><td class="mono">${v('Peso')}</td>
<td class="mono">${v('Entrelinha')}</td><td class="mono">${v('Entre letras')}</td>
<td class="mono">${v('Largura')}</td><td>${v('Alinhamento')}</td></tr>`;
      }).join('')}</tbody></table></div>`
  : '<p class="vazio">Nenhum texto — este módulo é só imagem ou estrutura.</p>');

const tabEstrutura = (d) => `<div class="rolagem"><table>
<thead><tr><th>nº</th><th>O quê</th><th>Largura</th><th>Altura</th><th>Fundo</th></tr></thead>
<tbody>${d.estrutura.map((s) => `<tr><td class="num">${s.num}</td>
<td><span class="prof">${'·'.repeat(Math.min(s.prof, 8))}</span><b>${s.tipo}</b>${s.nome ? ` <em>${esc(s.nome)}</em>` : ''}</td>
<td class="mono">${s.largura}</td><td class="mono">${s.altura}</td><td>${chip(s.fundo, s.fundoHex)}</td>
</tr>`).join('')}</tbody></table></div>`;

const listaRetoques = (d) => (d.retoques.length
  ? `<ul class="retoques">${d.retoques.map((r) => `<li><span class="n">${r.num}</span>
<span class="q"><span class="prof">${'·'.repeat(Math.min(r.prof, 8))}</span>${esc(r.rotulo)}</span>
<span class="v">${r.itens.map((x) => esc(x)).join(' · ')}</span></li>`).join('')}</ul>`
  : '<p class="vazio">Nada a retocar — este módulo segue o tema inteiro.</p>');

/* ─────────────────────────── dados por tela ─────────────────────────── */

function dadosDaTela(prefixo) {
  const tela = doc.children.find((t) => t.name.startsWith(prefixo));
  if (!tela) return [];
  return modulosDaTela(tela).map((mod, i) => {
    const chave = `${prefixo}|${mod.name}`;
    return {
      i: i + 1, nome: mod.name, chave, prefixo, telaNome: tela.name,
      base: nomeArquivo(prefixo, mod.name),
      esqueleto: esqueletoDe(mod, chave),
      conteudo: conteudoDe(mod),
      ficha: fichaDoModulo(mod),
      estrutura: estruturaDe(mod),
      retoques: retoquesDe(mod),
    };
  });
}

const CSS = fs.readFileSync(path.join(DIR, 'lib', 'painel.css'), 'utf8');
const JS = fs.readFileSync(path.join(DIR, 'lib', 'painel.js'), 'utf8');

const relatorio = [];

for (const pg of PAGINAS) {
  const dados = dadosDaTela(pg.desktop);
  const dadosM = dadosDaTela(pg.mobile);
  if (!dados.length) { console.log(`  ! tela ${pg.desktop} não achada — pulei ${pg.nome}`); continue; }

  const alturaTotal = dados.reduce((s, d) => s + (d.esqueleto.altura || 0), 0);
  const alturaTotalM = dadosM.reduce((s, d) => s + (d.esqueleto.altura || 0), 0);

  const passe2 = dados.map((d) => `<section class="mod" id="p2-${d.base}">${cabecaModulo(d, 'p2', d.conteudo.length + ' textos')}${tabTextos(d)}</section>`).join('');
  const passe3 = dados.map((d) => `<section class="mod" id="p3-${d.base}" data-chave="p3|${esc(d.chave)}">${cabecaModulo(d, 'p3', d.estrutura.length + ' caixas')}${ferramentas(d, 'p3')}${figura(d)}${tabEstrutura(d)}</section>`).join('');
  const passe4 = dados.map((d) => `<section class="mod" id="p4-${d.base}" data-chave="p4|${esc(d.chave)}">${cabecaModulo(d, 'p4', d.retoques.length + ' ajustes')}${ferramentas(d, 'p4')}${listaRetoques(d)}</section>`).join('');

  // no celular o módulo vem inteiro: quando você chega aqui o desenho já é conhecido,
  // e quebrar em passes só atrasaria
  const passe5 = dadosM.length
    ? dadosM.map((d) => `<section class="mod" id="p5-${d.base}" data-chave="p5|${esc(d.chave)}">${cabecaModulo(d, 'p5', d.esqueleto.altura + ' px')}${ferramentas(d, 'p5')}${figura(d)}
<p class="nota">Fundo ${chip(d.esqueleto.fundo, d.esqueleto.fundoHex)}${
        d.esqueleto.alturaTravada
          ? ` · altura travada ${d.esqueleto.alturaTravada} px`
          : ` · respiro ${d.esqueleto.respiroTopo ?? '—'} / ${d.esqueleto.respiroBase ?? '—'} px`
      } · recuo lateral 20 px</p>
${tabTextos(d)}${listaRetoques(d)}</section>`).join('')
    : '<p class="vazio">Sem tela de celular desenhada para esta página.</p>';

  const outras = PAGINAS.filter((o) => o.slug !== pg.slug)
    .map((o) => `<a href="${o.arquivo}">${o.nome}</a>`).join(' · ');

  const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Montagem · ${pg.nome} · Desbravando v3</title>
<style>${CSS}</style></head><body>

<div id="topo"><b>${pg.nome} · v3</b>
<div class="barra"><i id="pgb"></i></div><span class="n" id="pgt">0 / 0</span>
<button id="zerar">Zerar</button></div>

<div class="tudo">
<nav id="idx"></nav>
<main>

<h1>Montagem · ${pg.nome}</h1>
<div class="intro">
<p>Endereço <code>${pg.endereco}</code> · <b>${dados.length} módulos</b> no computador${dadosM.length ? ` e <b>${dadosM.length}</b> no celular` : ''}.</p>
<p>${pg.nota}</p>
<p><b>A ordem é arquitetura primeiro, retoque depois.</b> Monte todas as seções vazias, depois
jogue o conteúdo em todas, depois estruture todas, depois refine todas. Não perfeccione o
módulo 1 antes de começar o 2 — assim a página inteira aparece no primeiro dia e o refino fica
rápido, porque é só ajustar o que já existe.</p>
<p><b>O tema já está configurado</b> — cores, fontes e estilos de texto. É por isso que o
Passe 2 diz "aplique o estilo <code>h1</code>" em vez de repetir seis números.</p>
<p>Grade: tela <b>1440</b> · conteúdo <b>1200</b> (o padrão da Wix é 980, troque) · recuo
lateral <b>120</b>. Outras páginas: ${outras}.</p>
</div>

<h2><span class="p">Passe 1 · de 5</span>Esqueleto</h2>
<p>Crie as ${dados.length} seções na ordem, com o fundo e o respiro certos. <b>Nada dentro
ainda.</b> Ao terminar você rola a página e vê o ritmo dela.</p>
${tabEsqueleto(dados)}
<p class="nota">Altura total quando tudo estiver montado: <b>${alturaTotal.toLocaleString('pt-BR')} px</b>.
Se ao fim do Passe 1 a sua página estiver muito longe disso, algum respiro saiu errado.</p>

<h2><span class="p">Passe 2 · de 5</span>Conteúdo</h2>
<p>O texto entra em todas as seções. Aplique o <b>estilo do tema</b> indicado e a cor. Não
ajuste largura nem espaçamento agora — isso é o Passe 4. Clique no texto para copiar.</p>
${passe2}

<h2><span class="p">Passe 3 · de 5</span>Estrutura</h2>
<p>As caixas: o que é coluna, o que é linha, o que fica lado a lado, onde entram os fios e as
fotos. Os pontinhos mostram o aninhamento — mais pontinhos, mais dentro.</p>
<p class="nota"><b>Fio leve</b> = caixa de 1 px, fundo <code>#D9D9D9</code>. <b>Fio forte</b> =
2 px, fundo <code>#111111</code>, abre e fecha toda lista. Caixa com fundo, nunca o elemento
"Divisor" da Wix — ele tem margem própria.</p>
${passe3}

<h2><span class="p">Passe 4 · de 5</span>Retoques</h2>
<p>O acabamento: recuo, espaço entre itens, largura fixa, alinhamento, fio, e as exceções ao
tema. Só o que precisa de valor exato — o que segue o tema não aparece aqui.</p>
${passe4}

<h2><span class="p">Passe 5 · de 5</span>Celular</h2>
<p>Aqui o módulo vem inteiro de uma vez: quando você chega no celular o desenho já é conhecido,
e quebrar em passes só atrasaria. Recuo lateral <b>20 px</b> em tudo.${
    alturaTotalM ? ` Altura total: <b>${alturaTotalM.toLocaleString('pt-BR')} px</b>.` : ''}</p>
<p class="nota">No <b>Wix Studio</b> isto é ajuste de breakpoint — reordena e troca os tamanhos
pelo tema de celular. No <b>Editor clássico</b> é remontagem numa segunda tela, e é o pedaço
mais longo do projeto.</p>
${passe5}

<h2>Armadilhas</h2>
<ul class="arm">
<li><b>Anton não tem negrito.</b> Só existe o peso 400. Se a Wix "engordar" um título, é
falso-negrito e fica sujo.</li>
<li><b>A largura de conteúdo padrão da Wix é 980 px.</b> O projeto é 1200. Troque na primeira
seção do Passe 1, antes de posicionar qualquer coisa.</li>
<li><b>Não use o elemento "Divisor" para os fios.</b> Margem própria. Caixa de 1 ou 2 px.</li>
<li><b>Caixa alta é digitada, não é efeito.</b> A transformação automática se comporta
diferente entre desktop e celular.</li>
<li><b>Suba as fotos no dobro do tamanho de exibição.</b> A Wix recomprime.</li>
<li><b>Não cole texto do Word.</b> Vem HTML junto e a tipografia do tema morre — use o botão de
copiar do Passe 2, que entrega limpo.</li>
<li><b>Canto reto em tudo.</b> O único arredondamento é o círculo das setas do carrossel.</li>
</ul>

<h2>Ainda travando o projeto</h2>
<p class="nota"><b>Valores da Costa Doce</b> (por pessoa, por casal, sinal, saldo, política para
crianças, cancelamento) · <b>fotos e vídeo oficiais</b> — as de hoje são referência · documento do
<b>Grupo Fechado</b> (a tela 04 no arquivo de design é a versão ANTIGA, não montar) · arte do logo
da <b>Can-Am</b> · como a venda funciona hoje, porque <b>não existe nenhum evento no Wix Events</b>.</p>
<p class="nota">✔ Resolvidos: chave de API, as 6 coleções do CMS e a carga da Costa Doce.</p>

</main></div>
<div id="lupa"><img alt=""></div><div id="ok">copiado</div>
<div id="foco" hidden>
  <div class="cabeca"><b id="f-mod"></b><span class="n" id="f-pos"></span><button id="f-fechar">Fechar · Esc</button></div>
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
<script>${JS}</script>
</body></html>`;

  fs.writeFileSync(path.join(RAIZ, pg.arquivo), html, 'utf8');
  relatorio.push({
    pagina: pg.nome, arquivo: pg.arquivo, nota: pg.nota,
    modulos: dados.length, mobile: dadosM.length,
    passos: dados.length * 4 + dadosM.length,
    textos: dados.reduce((s, d) => s + d.conteudo.length, 0),
    retoques: dados.reduce((s, d) => s + d.retoques.length, 0),
    altura: alturaTotal,
    kb: Math.round(fs.statSync(path.join(RAIZ, pg.arquivo)).size / 1024),
  });
}

/* ─────────────────────────── índice das páginas ─────────────────────────── */

fs.writeFileSync(path.join(RAIZ, 'montagem.html'), `<!doctype html><meta charset="utf-8">
<title>Montagem · Desbravando v3</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;600&family=JetBrains+Mono&display=swap');
body{font:15px/1.6 'Archivo',system-ui;max-width:700px;margin:0 auto;padding:60px 24px 100px;background:#F2F2F2;color:#111}
h1{font:400 32px/1.05 'Anton';margin:0 0 6px;letter-spacing:-.4px}
.sub{color:#717171;margin:0 0 26px}
a.pg{display:block;text-decoration:none;color:#111;background:#fff;border:1px solid #D9D9D9;padding:20px;margin:0 0 12px}
a.pg:hover{border-color:#111}
a.pg>b{font:400 22px/1.1 'Anton';display:block;margin-bottom:6px}
a.pg .obs b{font:inherit;font-weight:600}
a.pg .obs code{font-size:.86em}
a.pg .n{font:11px 'JetBrains Mono';color:#717171;display:block;margin-bottom:8px}
a.pg .obs{color:#717171;font-size:13px}
code{background:#0000000d;padding:1px 5px;font-size:.9em}
.ordem{background:#fff;border-left:2px solid #111;padding:14px 18px;margin:26px 0 0;font-size:13.5px}
.ordem b{display:block;margin-bottom:4px}
</style>
<h1>Montagem · Desbravando v3</h1>
<p class="sub">Um painel por página, cada um em 5 passes: esqueleto, conteúdo, estrutura, retoques, celular.</p>
${relatorio.map((r) => `<a class="pg" href="${r.arquivo}"><b>${r.pagina}</b>
<span class="n">${r.modulos} módulos no computador · ${r.mobile} no celular · ${r.passos} passos · ${r.textos} textos · ${r.altura.toLocaleString('pt-BR')} px de altura</span>
<span class="obs">${r.nota}</span></a>`).join('')}
<div class="ordem"><b>A ordem que faz sentido</b>
Grupo Avulso agora — é estática e não depende de nada. A Página da Expedição por último,
porque ela é dinâmica e precisa das coleções do CMS. A Home já está no ar; o painel dela serve
para conferir o acabamento.</div>
`, 'utf8');

console.log(`${relatorio.length} páginas`);
for (const r of relatorio) {
  console.log(`  ${r.pagina.padEnd(22)} ${String(r.passos).padStart(3)} passos · ${String(r.modulos).padStart(2)}+${r.mobile} módulos · ${String(r.textos).padStart(3)} textos · ${String(r.retoques).padStart(3)} retoques · ${r.kb} KB`);
}
console.log(`\n→ montagem.html (índice) · ${relatorio.map((r) => r.arquivo).join(' · ')}`);
