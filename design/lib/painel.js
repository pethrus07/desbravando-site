
(function(){
var CH='desbravando-montagem-passes';
var est={};try{est=JSON.parse(localStorage.getItem(CH)||'{}')}catch(e){}
var passos=[].slice.call(document.querySelectorAll('.passo'));
var barra=document.getElementById('pgb'),txt=document.getElementById('pgt');

/* índice: um grupo por passe */
var NOMES={p1:'Passe 1 · Esqueleto',p2:'Passe 2 · Conteúdo',p3:'Passe 3 · Estrutura',p4:'Passe 4 · Retoques',p5:'Passe 5 · Celular'};
var atual='',h='';
passos.forEach(function(p){
  var g=p.dataset.id.split('|')[0];
  var mod=p.dataset.id.split('|')[2]||p.dataset.id.split('|')[1];
  var alvo=p.closest('.mod')||p.closest('tr');
  var rot=alvo.classList.contains('mod')?alvo.querySelector('.tit').textContent:alvo.querySelectorAll('td')[2].textContent;
  if(g!==atual){h+='<h4>'+NOMES[g]+'</h4>';atual=g}
  var id=alvo.id||('x-'+p.dataset.id.replace(/[^\w]/g,'-'));
  if(!alvo.id)alvo.id=id;
  // Nos passes 2 a 5 o rótulo já começa com o número ("3. posicionamento"). No Passe 1
  // cada passo é uma LINHA de tabela e o número está na célula .num.
  // Atenção: este arquivo é JS puro, não template — barra simples nas regex.
  var m=rot.match(/^(\d+)/);
  var cel=alvo.querySelector?alvo.querySelector('td.num'):null;
  var rotulo=m?rot.replace(/^\d+\.\s*/,''):rot;
  var marca=m?m[1]:(cel?cel.textContent.trim():'·');
  h+='<a href="#'+id+'" data-id="'+p.dataset.id+'"><span class="m">'+marca+'</span><span class="r">'+rotulo+'</span></a>';
});
document.getElementById('idx').innerHTML=h;
var elos=[].slice.call(document.querySelectorAll('#idx a'));

function pintar(){
  var f=0;
  passos.forEach(function(p){
    var alvo=p.closest('.mod')||p.closest('tr');
    if(p.checked){f++;alvo.classList.add('ok')}else{alvo.classList.remove('ok')}
  });
  elos.forEach(function(a){a.classList.toggle('ok',!!est[a.dataset.id])});
  barra.style.width=(passos.length?f/passos.length*100:0)+'%';
  txt.textContent=f+' / '+passos.length;
}
passos.forEach(function(p){
  p.checked=!!est[p.dataset.id];
  p.addEventListener('change',function(){est[p.dataset.id]=p.checked;localStorage.setItem(CH,JSON.stringify(est));pintar()});
});
document.getElementById('zerar').addEventListener('click',function(){
  if(!confirm('Zerar todo o progresso?'))return;
  est={};localStorage.setItem(CH,'{}');passos.forEach(function(p){p.checked=false});pintar();
});

/* copiar ao clique — file:// não é contexto seguro, então o textarea é o que funciona */
var av=document.getElementById('ok'),t0;
document.addEventListener('click',function(e){
  var b=e.target.closest('[data-copia]');if(!b)return;
  var s=b.dataset.copia,ta=document.createElement('textarea');
  ta.value=s;ta.style.cssText='position:fixed;left:-9999px';document.body.appendChild(ta);ta.select();
  try{document.execCommand('copy')}catch(err){}
  ta.remove();
  av.textContent='copiado: '+(s.length>40?s.slice(0,37)+'…':s);
  av.classList.add('on');clearTimeout(t0);t0=setTimeout(function(){av.classList.remove('on')},1300);
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
    fMod = sec.querySelector('.tit').textContent.replace(/\s+/g, ' ').trim();
    elMod.textContent = fMod;
    fIdx = 0;
    foco.hidden = false;
    desenhar();
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-foco]');
    if (b) { abrirFoco(b.dataset.foco); return; }
    // clicar numa linha da tabela abre o foco já naquele elemento
    var tr = e.target.closest('table tbody tr');
    if (tr && !e.target.closest('[data-copia]')) {
      var sec = tr.closest('.mod');
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


/* lupa */
var lupa=document.getElementById('lupa'),li=lupa.querySelector('img');
document.addEventListener('click',function(e){
  if(e.target.tagName==='IMG'&&e.target.closest('figure')){li.src=e.target.src;lupa.classList.add('on')}
  else if(lupa.classList.contains('on'))lupa.classList.remove('on');
});
document.addEventListener('keydown',function(e){if(e.key==='Escape')lupa.classList.remove('on')});
pintar();
})();
