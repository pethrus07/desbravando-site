// Gera UM arquivo HTML autocontido para mandar ao cliente.
// Ele abre com duplo clique, funciona offline (fontes e fotos embutidas) e o cliente
// pode clicar em qualquer texto e reescrever. No fim, baixa um arquivo só com o que
// mudou — que volta pra mim.
//
// Rodar: node design/exportar.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { criarRenderizador, urlsDeImagem } from './lib/render-html.mjs';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const ENTREGA = path.join(DIR, '..', 'entrega');
const CACHE = path.join(DIR, '.cache-web');
fs.mkdirSync(ENTREGA, { recursive: true });
fs.mkdirSync(CACHE, { recursive: true });

const doc = JSON.parse(fs.readFileSync(path.join(DIR, 'desbravando-repaginacao.pen'), 'utf8'));

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36';

/** Baixa uma vez e guarda em cache; devolve data URI. */
async function embutir(url, tipoPadrao) {
  const chave = path.join(CACHE, Buffer.from(url).toString('base64url').slice(0, 100));
  if (fs.existsSync(chave)) return fs.readFileSync(chave, 'utf8');
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  if (!r.ok) throw new Error(`${r.status} em ${url.slice(0, 70)}`);
  const tipo = r.headers.get('content-type')?.split(';')[0] || tipoPadrao;
  const b64 = Buffer.from(await r.arrayBuffer()).toString('base64');
  const uri = `data:${tipo};base64,${b64}`;
  fs.writeFileSync(chave, uri);
  return uri;
}

/* ── fontes: pega o CSS do Google, extrai os woff2 e embute ── */
async function fontesEmbutidas() {
  const famílias = 'family=Anton&family=Archivo:wght@400;600;700&family=JetBrains+Mono:wght@400';
  const css = await fetch(`https://fonts.googleapis.com/css2?${famílias}&display=swap`, {
    headers: { 'User-Agent': UA }, // UA de navegador → devolve woff2
  }).then((r) => r.text());

  // só os blocos latinos, para não embutir cirílico/grego
  const blocos = css.split('/*').filter((b) => /latin/.test(b) && !/latin-ext/.test(b));
  let out = '';
  for (const b of blocos) {
    const url = b.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
    if (!url) continue;
    const familia = b.match(/font-family:\s*'([^']+)'/)?.[1];
    const peso = b.match(/font-weight:\s*(\d+)/)?.[1] || '400';
    const estilo = b.match(/font-style:\s*(\w+)/)?.[1] || 'normal';
    const uri = await embutir(url, 'font/woff2');
    out += `@font-face{font-family:'${familia}';font-style:${estilo};font-weight:${peso};font-display:swap;src:url(${uri}) format('woff2')}\n`;
  }
  return out;
}

/* ── fotos ── */
const urls = urlsDeImagem(doc);
const mapaFoto = {};
let ok = 0, falhou = 0;
for (const u of urls) {
  try { mapaFoto[u] = await embutir(u, 'image/jpeg'); ok++; } catch { mapaFoto[u] = u; falhou++; }
}
console.log(`fotos embutidas: ${ok}${falhou ? ` (${falhou} ficaram como link)` : ''}`);

const fontes = await fontesEmbutidas();
console.log(`fontes embutidas: ${(fontes.match(/@font-face/g) || []).length}`);

/* ── renderiza cada tela ── */
const { renderizar } = criarRenderizador({
  variables: doc.variables,
  editavel: true,
  urlDeFoto: (u) => mapaFoto[u] || u,
});

// O cliente abre no que interessa a ele. O "Sistema de design" é régua técnica
// e vai para o fim, como anexo.
const ehSistema = (n) => /Sistema de design/.test(n);
const telas = doc.children
  .slice()
  .sort((a, b) => Number(ehSistema(a.name)) - Number(ehSistema(b.name)))
  .map((t) => ({
    nome: t.name,
    id: t.name.replace(/[^\w\dÀ-ú]+/g, '-').toLowerCase(),
    largura: typeof t.width === 'number' ? t.width : 1440,
    anexo: ehSistema(t.name),
    html: renderizar(t, 'none'),
  }));

const desktop = telas.filter((t) => t.largura > 800 && !t.anexo);
const mobile = telas.filter((t) => t.largura <= 800);
const anexos = telas.filter((t) => t.anexo);

const menu = (lista, rotulo) =>
  lista.length
    ? `<div class="grupo"><span class="grupo-t">${rotulo}</span>${lista
        .map((t) => `<a href="#${t.id}">${t.nome.replace(/^\d+ · |^M\d+ · /, '')}</a>`)
        .join('')}</div>`
    : '';

const secoes = telas
  .map(
    (t) => `<section id="${t.id}"${t.anexo ? ' class="anexo"' : ''}>
  <header class="cab"><h2>${t.nome}</h2><span>${t.largura}px de largura</span>${
      t.anexo ? '<em>anexo técnico — não precisa revisar</em>' : ''
    }</header>
  <div class="palco"><div class="tela" style="width:${t.largura}px">${t.html}</div></div>
</section>`,
  )
  .join('\n');

const html = `<!doctype html>
<html lang="pt-BR"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Desbravando UTV — repaginação v3 (para revisão)</title>
<style>
${fontes}
*{box-sizing:border-box}
html,body{margin:0;padding:0;background:#2a2a2c;font-family:'Archivo',system-ui,sans-serif;-webkit-text-size-adjust:100%}
a{color:inherit}
#topo{position:sticky;top:0;z-index:50;background:#141416;border-bottom:1px solid #3a3a3e;padding:12px 20px;display:flex;gap:18px;align-items:center;flex-wrap:wrap}
#topo b{color:#fff;font-size:14px;letter-spacing:.3px}
#topo .grupo{display:flex;gap:10px;align-items:center;flex-wrap:wrap}
#topo .grupo-t{color:#8a8a90;font-size:10px;letter-spacing:2px;text-transform:uppercase}
#topo a{color:#d8d8dc;text-decoration:none;font-size:12px;border:1px solid #3a3a3e;padding:5px 10px;border-radius:99px}
#topo a:hover{background:#26262a}
#acoes{margin-left:auto;display:flex;gap:8px}
button{font-family:inherit;font-size:12px;font-weight:600;letter-spacing:.4px;padding:9px 14px;border-radius:99px;border:0;cursor:pointer;background:#fff;color:#111}
button.sec{background:transparent;color:#d8d8dc;border:1px solid #3a3a3e}
#ajuda{background:#1c1c1f;color:#c9c9cf;padding:18px 20px;font-size:13.5px;line-height:1.65;border-bottom:1px solid #3a3a3e}
#ajuda p{margin:0 0 8px;max-width:900px}
#ajuda strong{color:#fff}
#ajuda code{background:#2c2c31;padding:1px 6px;border-radius:4px;font-family:'JetBrains Mono',monospace;font-size:12px}
section{padding:26px 0 40px}
.cab{display:flex;align-items:baseline;gap:14px;padding:0 20px 12px}
.cab h2{color:#fff;font-family:'Anton',sans-serif;font-weight:400;font-size:21px;letter-spacing:.3px;margin:0}
.cab span{color:#77777d;font-family:'JetBrains Mono',monospace;font-size:11px}
.cab em{color:#77777d;font-size:11px;font-style:normal;border:1px solid #3a3a3e;padding:3px 8px;border-radius:99px}
section.anexo{border-top:1px solid #3a3a3e;margin-top:20px}
.palco{overflow-x:auto;padding:0 20px 6px}
.tela{box-shadow:0 10px 40px rgba(0,0,0,.45)}
.ed{outline:0}
body.editando .ed{cursor:text}
body.editando .ed:hover{box-shadow:0 0 0 2px rgba(255,132,0,.55);border-radius:2px}
.ed:focus{box-shadow:0 0 0 2px #ff8400;border-radius:2px}
.ed.mudou{background:rgba(255,132,0,.16)}
#contador{color:#8a8a90;font-size:12px;align-self:center}
@media print{#topo,#ajuda,.cab span{display:none}body{background:#fff}.palco{overflow:visible}}
</style>
</head><body class="editando">

<div id="topo">
  <b>Desbravando UTV · repaginação v3</b>
  ${menu(desktop, 'Computador')}
  ${menu(mobile, 'Celular')}
  ${menu(anexos, 'Anexo')}
  <div id="acoes">
    <span id="contador">nenhuma alteração</span>
    <button class="sec" id="btn-modo">Travar edição</button>
    <button id="btn-baixar">Baixar minhas alterações</button>
  </div>
</div>

<div id="ajuda">
  <p><strong>Versão 3 — refinamento visual, com os seus três documentos aplicados.</strong> Isto é uma proposta de layout, não o site no ar. Nada aqui mexe no desbravandoutv.com.</p>
  <p><strong>A estrutura das páginas não mudou</strong>, como você pediu. O que mudou foi a composição dos módulos que tinham perdido a linguagem do PDF aprovado — cada bloco ganhou geometria própria, para nenhum parecer repetição do anterior.</p>
  <p><strong>Home:</strong> o bloco Expedições virou <strong>duas etapas</strong> — a apresentação em cima e, separados dela, os dois formatos <strong>sem nenhuma imagem</strong>, sustentados por tipografia e dado tabulado · a galeria virou <strong>carrossel de uma foto por vez</strong> (no celular, a próxima aparece espiando na borda) · Parceiros virou uma linha só · Comunidade é o único módulo centrado da página · nos três pilares a foto virou selo pequeno e o texto passou a mandar · rodapé com <strong>só a montanha, links numa linha e sem telefone</strong>.</p>
  <p><strong>Grupo Avulso:</strong> saiu o nível da expedição (leve/média/difícil) e entrou o <strong>formato</strong> — Família, Só Homens, Casais e Família, Corporativa · a chamada final ganhou composição nova, com o cadastro numa linha de campo.</p>
  <p><strong>Página da Expedição:</strong> o roteiro está <strong>sem foto nenhuma</strong>, numa régua de dias · a hospedagem mostra <strong>os dois hotéis dentro do mesmo módulo</strong>, cada um com sua galeria horizontal · “o que está incluso” virou um inventário numerado com a contagem no topo · a <strong>Reserva</strong> foi reestruturada em cima do investimento (por pessoa, por casal, formas de pagamento e condições) e <strong>a escolha do quarto saiu da página</strong>, passa a acontecer depois do clique · “o que não está incluso”, o Guia e o FAQ ficaram cada um com o seu desenho.</p>
  <p><strong>A expedição da página agora é a Costa Doce, com o conteúdo real do seu dossiê</strong> — roteiro dos 5 dias, quilometragem, as duas hospedagens, os 11 itens inclusos e os 4 não inclusos. <strong>Os valores ficaram como “a confirmar”: o dossiê não traz preço, e eu não invento número.</strong> Assim que você passar valor por pessoa, valor por casal, sinal, saldo e política para crianças, entra no lugar.</p>
  <p><strong>Ainda é exemplo, só para o layout não ficar vazio:</strong> as outras quatro expedições da agenda · os banners da área de destaques · os depoimentos · o estoque de UTVs · as respostas do FAQ · os tópicos e as contagens do Guia. As fotos são as que já estão no site hoje, usadas como referência de posição.</p>
  <p><strong>Refinamentos finais aplicados:</strong> o <strong>Parceiro Oficial</strong> voltou ao arranjo aprovado — logomarca em cima, frase de apoio embaixo, tudo centralizado · a <strong>Reserva</strong> ficou só com o investimento e o botão (formas de pagamento, condições e parcelamento saíram da página e acontecem durante o fluxo da reserva) · no <strong>Grupo Avulso</strong> entrou uma faixa de transição entre a apresentação e a agenda, para a primeira foto não parecer parte do topo da página.</p>
  <p><strong>Ajustes de 08/08, já refletidos aqui e no site:</strong> o bloco de <strong>Estoque Off-Road e Produtos</strong> saiu da Home — ela estava ficando longa demais, e as duas frentes já têm página própria no menu, com o bloco dos três pilares levando para elas. E os <strong>três pilares perderam as fotos</strong>: numa seção que apresenta três frentes em três palavras, a imagem competia com a leitura. A Home caiu de 6.321 para <strong>5.758 px</strong>.</p>
  <p><strong>Ainda provisório no site:</strong> as fotos e o vídeo são de referência, aguardando o material oficial. E o seletor <strong>PT | EN</strong> não está no cabeçalho porque a forma de fazer a tradução vai mudar — entra quando isso estiver definido.</p>
  <p><strong>Sobre o rodapé:</strong> ele não tem botão nenhum — a montanha, os links numa linha e os ícones sociais, como combinado. O botão que aparecia ali era a <strong>barra de reserva do celular</strong>, que no material vinha desenhada depois do rodapé. Ela não é conteúdo de rodapé: é a barra que acompanha a rolagem na página da expedição, e agora está marcada como tal, antes do fim da página.</p>
  <p><strong>Falta de você:</strong> a tela do <strong>Grupo Fechado</strong> — está aqui na versão antiga só para referência, aguardando o documento · e a arte do logotipo da <strong>Can-Am</strong> para o bloco de parceiros.</p>
  <p><strong>Você pode escrever direto nas telas</strong> igual às outras vezes. Clique em qualquer texto, reescreva, e no fim use <strong>“Baixar minhas alterações”</strong>.</p>
</div>

${secoes}

<script>
(function () {
  var eds = Array.prototype.slice.call(document.querySelectorAll('.ed'));
  var contador = document.getElementById('contador');

  function tela(el) {
    var s = el.closest('section');
    return s ? s.querySelector('.cab h2').textContent : '?';
  }
  function secao(el) {
    var n = el.parentElement;
    while (n && n !== document.body) {
      var nome = n.getAttribute('data-nome');
      if (nome && nome.length > 1 && !/^(frame|row|col)$/.test(nome)) return nome;
      n = n.parentElement;
    }
    return '';
  }
  function mudados() {
    return eds.filter(function (e) { return e.textContent !== e.dataset.orig; });
  }
  function atualizar() {
    var m = mudados();
    m.forEach(function (e) { e.classList.add('mudou'); });
    eds.forEach(function (e) { if (e.textContent === e.dataset.orig) e.classList.remove('mudou'); });
    contador.textContent = m.length === 0 ? 'nenhuma alteração'
      : m.length === 1 ? '1 alteração' : m.length + ' alterações';
  }

  eds.forEach(function (e) {
    e.addEventListener('input', atualizar);
    // colar sempre como texto puro, senão entra HTML do Word
    e.addEventListener('paste', function (ev) {
      ev.preventDefault();
      var t = (ev.clipboardData || window.clipboardData).getData('text');
      document.execCommand('insertText', false, t.replace(/\\r/g, ''));
    });
  });

  document.getElementById('btn-modo').addEventListener('click', function () {
    var travado = document.body.classList.toggle('travado');
    eds.forEach(function (e) { e.contentEditable = travado ? 'false' : 'true'; });
    this.textContent = travado ? 'Liberar edição' : 'Travar edição';
  });

  document.getElementById('btn-baixar').addEventListener('click', function () {
    var m = mudados();
    if (!m.length) { alert('Nenhum texto foi alterado ainda.'); return; }
    var porTela = {};
    m.forEach(function (e) {
      var t = tela(e);
      (porTela[t] = porTela[t] || []).push({ onde: secao(e), de: e.dataset.orig, para: e.textContent });
    });
    var linhas = ['ALTERAÇÕES — Desbravando UTV / repaginação do site', ''];
    Object.keys(porTela).forEach(function (t) {
      linhas.push('=== ' + t + ' ===', '');
      porTela[t].forEach(function (a, i) {
        linhas.push((i + 1) + '. ' + (a.onde ? 'seção: ' + a.onde : 'sem seção'));
        linhas.push('   ANTES: ' + a.de.replace(/\\n/g, ' / '));
        linhas.push('   AGORA: ' + a.para.replace(/\\n/g, ' / '));
        linhas.push('');
      });
    });
    var blob = new Blob([linhas.join('\\n')], { type: 'text/plain;charset=utf-8' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'desbravando-alteracoes.txt';
    a.click();
  });

  atualizar();
})();
</script>
</body></html>`;

const saida = path.join(ENTREGA, 'desbravando-repaginacao-v3.html');
fs.writeFileSync(saida, html, 'utf8');
const mb = (fs.statSync(saida).size / 1024 / 1024).toFixed(2);
console.log(`\n${telas.length} telas · ${mb} MB\n→ entrega/desbravando-repaginacao-v3.html`);
