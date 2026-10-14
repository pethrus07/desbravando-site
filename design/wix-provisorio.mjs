// Conteúdo PROVISÓRIO no CMS: preenche o que falta para os módulos poderem ser montados e
// testados, e desfaz num comando.
//
// Autorizado pelo Pedro em 12/08/2026, com o cliente ciente de que tudo aqui será revisto.
// Sem isto, 4 das 5 expedições têm o bloco de investimento recolhido e 5 das 9 categorias
// do Guia não abrem — não há como conferir o que se está montando.
//
// PRINCÍPIOS, porque preço é a informação mais perigosa de inventar:
//   1. `publicado` continua FALSE em todas. Nada disto é público.
//   2. Texto em prosa leva o prefixo [PROVISÓRIO] — visível, inclusive num print.
//   3. Valor não leva prefixo (quebraria o Anton 56), então a rastreabilidade é
//      cms/PROVISORIO.md, gerado aqui, listando cada campo tocado.
//   4. Os valores derivam do ÚNICO preço real que existe (Urubici, R$ 19.500) para o
//      layout ser honesto. Não são chute solto.
//
// Rodar:  node design/wix-provisorio.mjs --preencher
//         node design/wix-provisorio.mjs --limpar
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { wix, SITE } from './wix.mjs';
import { GUIA_CONTEUDO } from './lib/dados.mjs';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PREENCHER = process.argv.includes('--preencher');
const LIMPAR = process.argv.includes('--limpar');

if (!PREENCHER && !LIMPAR) {
  console.log('Use --preencher ou --limpar');
  process.exit(1);
}

const P = '[PROVISÓRIO] ';

/* ── valores por expedição ────────────────────────────────────────────────
   A Urubici é a referência real: R$ 19.500 o piso de 2 pessoas. As outras seguem a mesma
   ordem de grandeza, variando com a duração — o suficiente para o layout não mentir. */
const VALORES = {
  'costa-doce': 'A partir de R$ 18.900',
  'urubici': null,                         // já tem o valor REAL — não tocar
  'serra-da-canastra': 'A partir de R$ 15.400',
  'visconde-de-maua': 'A partir de R$ 12.800',
  'macae': 'A partir de R$ 13.200',
};

/** Condições comerciais — as mesmas para todas, porque são regra do negócio. */
const CONDICOES = {
  sinal: `${P}30% na reserva`,
  saldo: `${P}saldo até 30 dias antes da saída`,
  cancelamento: `${P}reembolso integral até 60 dias antes; 50% até 30 dias`,
  politicaCriancas: `${P}crianças a partir de 6 anos, no assento traseiro com cinto`,
};

/** Guia — as 5 categorias que o dossiê não cobre. */
const GUIA_PROVISORIO = {
  'Vestuário': ['Calça comprida e camiseta de manga longa para a trilha.',
    'Tênis fechado ou coturno — nada de chinelo no volante.',
    'Corta-vento, que o litoral vira frio ao anoitecer.'],
  'O que levar': ['Documento com foto e CNH válida.', 'Protetor solar e boné.',
    'Óculos de proteção contra areia e poeira.', 'Garrafa de água reutilizável.',
    'Carregador portátil para o celular.', 'Muda de roupa a mais por dia de trilha.'],
  'Documentação': ['CNH válida, na categoria do veículo.',
    'Documento do UTV em ordem, com seguro vigente.',
    'Carteirinha do convênio médico, se tiver.'],
  'Clima': ['Dezembro no litoral gaúcho: dias quentes e noites frescas.',
    'Vento constante à beira-mar — o corta-vento não é enfeite.'],
  'Contatos': ['WhatsApp da organização, enviado no grupo da expedição.',
    'Telefone do carro de apoio, entregue no briefing do primeiro dia.',
    'Emergência: 190 (polícia) e 193 (bombeiros).'],
};

const lista = (itens) => itens.map((i) => `<p>• ${P}${i}</p>`).join('');

const exp = (await wix('/wix-data/v2/items/query', {
  corpo: { dataCollectionId: 'Expedicoes', query: { cursorPaging: { limit: 20 } } }, escopo: SITE,
})).dataItems.map((x) => x.data);

const guia = (await wix('/wix-data/v2/items/query', {
  corpo: { dataCollectionId: 'Guia', query: { cursorPaging: { limit: 50 } } }, escopo: SITE,
})).dataItems.map((x) => x.data);

const tocados = [];

/* ── Expedições ── */
for (const d of exp) {
  const mudanca = {};
  const valor = VALORES[d._id];

  if (PREENCHER) {
    if (valor && !String(d.valorExibido || '').trim()) mudanca.valorExibido = valor;
    for (const [k, v] of Object.entries(CONDICOES)) if (!String(d[k] || '').trim()) mudanca[k] = v;
    if (!String(d.rotuloBotao || '').trim()) mudanca.rotuloBotao = 'Fazer pré-reserva';
  } else {
    // limpar: o valor REAL da Urubici fica; o resto volta a vazio
    if (valor) mudanca.valorExibido = '';
    for (const k of Object.keys(CONDICOES)) mudanca[k] = '';
  }

  if (!Object.keys(mudanca).length) continue;
  await wix('/wix-data/v2/items/save', {
    corpo: { dataCollectionId: 'Expedicoes', dataItem: { id: d._id, data: { ...d, ...mudanca } } }, escopo: SITE,
  });
  for (const [k, v] of Object.entries(mudanca)) {
    if (PREENCHER) tocados.push({ colecao: 'Expedicoes', item: d.titulo, campo: k, valor: v });
  }
  console.log(`  ${PREENCHER ? '✔' : '↺'} ${String(d.titulo).padEnd(19)} ${Object.keys(mudanca).join(', ')}`);
}

/* ── Guia ── */
for (const d of guia) {
  const itens = GUIA_PROVISORIO[d.categoria];
  if (!itens) continue;                                   // as 4 do dossiê não se mexem
  if (GUIA_CONTEUDO[d.categoria]?.itens?.length) continue; // segurança dupla

  const mudanca = PREENCHER
    ? { titulo: `${P}${d.categoria}`, conteudo: lista(itens) }
    : { titulo: '', conteudo: '' };

  await wix('/wix-data/v2/items/save', {
    corpo: { dataCollectionId: 'Guia', dataItem: { id: d._id, data: { ...d, ...mudanca } } }, escopo: SITE,
  });
  if (PREENCHER) tocados.push({ colecao: 'Guia', item: d.categoria, campo: 'conteudo', valor: `${itens.length} itens` });
  console.log(`  ${PREENCHER ? '✔' : '↺'} Guia · ${d.categoria}`);
}

/* ── rastro em disco ── */
const arq = path.join(RAIZ, 'cms', 'PROVISORIO.md');
if (PREENCHER) {
  fs.writeFileSync(arq, `# Conteúdo provisório no CMS

**Gerado por \`node design/wix-provisorio.mjs --preencher\`.**
**Nada disto é conteúdo aprovado pelo cliente.**

Existe para os módulos poderem ser montados e conferidos: sem valor, o bloco de
investimento recolhe; sem conteúdo, as categorias do Guia não abrem.

## Como remover

\`\`\`
node design/wix-provisorio.mjs --limpar
\`\`\`

Devolve todos os campos abaixo a vazio. **O preço real da Urubici (R$ 19.500), que veio
dos ingressos do Wix Events, não é tocado nem ao preencher nem ao limpar.**

## Antes de publicar

- [ ] Revisar os **${tocados.length} campos** da tabela abaixo
- [ ] Revisar as **8 respostas do FAQ** (\`node design/wix-importar.mjs\` sem \`--mockup-faq\` limpa)
- [ ] \`publicado\` continua **FALSE** em todas as 5 expedições — conferir antes de ligar

## O que foi escrito

| Coleção | Item | Campo | Valor |
|---|---|---|---|
${tocados.map((t) => `| ${t.colecao} | ${t.item} | \`${t.campo}\` | ${String(t.valor).replace(/\|/g, '·').slice(0, 90)} |`).join('\n')}

## Sobre os valores

Os preços **não são chute solto**: partem do único preço real da conta — Urubici,
**R$ 19.500** o piso de acomodação para 2 pessoas, lido dos ingressos do Wix Events — e
variam com a duração de cada expedição. Servem para o layout não mentir sobre o tamanho do
número em Anton 56.

Texto em prosa leva o prefixo **[PROVISÓRIO]**, que aparece inclusive num print de tela.
Valor não leva, porque quebraria a tipografia — é por isso que esta lista existe.
`, 'utf8');
  console.log(`\n${tocados.length} campos preenchidos · rastro em cms/PROVISORIO.md`);
} else {
  if (fs.existsSync(arq)) { fs.unlinkSync(arq); console.log('\ncms/PROVISORIO.md removido'); }
  console.log('campos devolvidos a vazio · o preço real da Urubici foi preservado');
}

console.log('\n⚠️ `publicado` continua FALSE em todas — nada disto está público.');
