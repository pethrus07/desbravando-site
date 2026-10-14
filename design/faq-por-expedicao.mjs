// FAQ POR EXPEDIÇÃO — as perguntas que mudam de destino para destino.
//
// A coleção FAQ já tem o mecanismo: `escopo` separa `geral` (vale para todas) de
// `expedicao` (só naquela). O que faltava era CONTEÚDO: só a Costa Doce tinha as duas
// perguntas próprias, então nas outras 4 o primeiro repetidor abria vazio e não havia como
// conferir a montagem.
//
// As três perguntas escolhidas são as que REALMENTE mudam por destino — dificuldade,
// combustível e melhor época. As de regra do negócio (cancelamento, criança, acompanhante)
// continuam em `geral`, escritas uma vez.
//
// ⚠️ As respostas das 4 expedições novas são PROVISÓRIAS, marcadas com [PROVISÓRIO].
//    Autorizado pelo Pedro em 12/08, cliente ciente. `--limpar` remove.
//
// Rodar:  node design/faq-por-expedicao.mjs --preencher
//         node design/faq-por-expedicao.mjs --limpar
import { wix, SITE } from './wix.mjs';

const PREENCHER = process.argv.includes('--preencher');
const LIMPAR = process.argv.includes('--limpar');
if (!PREENCHER && !LIMPAR) { console.log('Use --preencher ou --limpar'); process.exit(1); }

const P = '[PROVISÓRIO] ';

/**
 * Por expedição, as perguntas próprias. A Costa Doce NÃO entra aqui — as duas dela vêm do
 * dossiê real e ficam sob controle de `lib/dados.mjs`, não deste script.
 */
const POR_EXPEDICAO = {
  urubici: [
    ['Qual o nível de dificuldade dessa expedição?',
     'Média. Serra catarinense, com trechos de subida em pedra solta e travessias de rio rasas. Exige carro em ordem e atenção, não exige experiência em trilha pesada.'],
    ['Preciso levar combustível? Tem posto no roteiro?',
     'O combustível é por sua conta. Há posto em Urubici e em São Joaquim; a equipe orienta onde abastecer antes de cada dia de trilha.'],
    ['Qual a melhor época para essa expedição?',
     'A janela de agosto é a escolhida justamente pela serra: dias secos e frios, com chance de geada no amanhecer. É o cenário que rende as melhores fotos do ano.'],
  ],
  'serra-da-canastra': [
    ['Qual o nível de dificuldade dessa expedição?',
     'Moderada a alta. Chapada com trechos técnicos de pedra e cascalho, e travessias de córrego. Recomendada para quem já rodou pelo menos uma expedição antes.'],
    ['Preciso levar combustível? Tem posto no roteiro?',
     'Por sua conta. Há posto em São Roque de Minas e em Vargem Bonita; entre eles o trecho é longo, então abastecer cheio é parte do briefing.'],
    ['Qual a melhor época para essa expedição?',
     'A estação seca. As cachoeiras seguem cheias e as trilhas de cascalho ficam firmes, sem o atoleiro da época de chuva.'],
  ],
  'visconde-de-maua': [
    ['Qual o nível de dificuldade dessa expedição?',
     'Leve a moderada. Serra da Mantiqueira, estradas de terra bem definidas e algumas subidas curtas. É a expedição mais acessível da agenda.'],
    ['Preciso levar combustível? Tem posto no roteiro?',
     'Por sua conta. Há posto em Resende e na entrada de Visconde de Mauá; as distâncias são curtas e não há trecho crítico.'],
    ['Qual a melhor época para essa expedição?',
     'Serra fria o ano todo, e é isso que se busca ali. Fora do período de chuva as estradas de terra ficam melhores.'],
  ],
  macae: [
    ['Qual o nível de dificuldade dessa expedição?',
     'Leve. Trechos de areia e estrada de terra na região serrana de Macaé, sem obstáculo técnico. Boa para primeira expedição e para família.'],
    ['Preciso levar combustível? Tem posto no roteiro?',
     'Por sua conta. Há posto em Macaé e em Casimiro de Abreu, os dois no caminho.'],
    ['Qual a melhor época para essa expedição?',
     'Fora do verão mais úmido. Litoral norte fluminense, calor firme e chuva de fim de tarde na alta temporada.'],
  ],
};

/** A Costa Doce também ganha a terceira pergunta, para as 5 ficarem simétricas. */
const TERCEIRA_COSTA = ['Qual a melhor época para essa expedição?',
  'Dezembro é a janela escolhida: o litoral gaúcho firme, dias longos e as lagoas em nível bom para as travessias.'];

const idDe = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase().slice(0, 60);

const faq = (await wix('/wix-data/v2/items/query', {
  corpo: { dataCollectionId: 'FAQ', query: { cursorPaging: { limit: 100 } } }, escopo: SITE,
})).dataItems.map((x) => x.data);

// a ordem das próprias começa em 101, para nunca colidir com a numeração das gerais
let ordem = 100;
let gravados = 0, removidos = 0;

const alvos = [];
for (const [exp, perguntas] of Object.entries(POR_EXPEDICAO)) {
  for (const [pergunta, resposta] of perguntas) alvos.push({ exp, pergunta, resposta, provisorio: true });
}
alvos.push({ exp: 'costa-doce', pergunta: TERCEIRA_COSTA[0], resposta: TERCEIRA_COSTA[1], provisorio: true });

for (const a of alvos) {
  // id inclui a expedição: a mesma pergunta existe em 5 destinos, com respostas diferentes
  const id = `${a.exp}-${idDe(a.pergunta)}`.slice(0, 60);
  const jaExiste = faq.find((f) => f._id === id);

  if (LIMPAR) {
    if (!jaExiste) continue;
    await wix(`/wix-data/v2/items/${id}?dataCollectionId=FAQ`, { metodo: 'DELETE', escopo: SITE });
    console.log(`  ↺ removida  ${a.exp.padEnd(18)} ${a.pergunta.slice(0, 44)}`);
    removidos++;
    continue;
  }

  ordem++;
  await wix('/wix-data/v2/items/save', {
    corpo: { dataCollectionId: 'FAQ', dataItem: { id, data: {
      _id: id, ativo: true, ordem, escopo: 'expedicao', expedicao: a.exp,
      pergunta: a.pergunta,
      resposta: `<p>${a.provisorio ? P : ''}${a.resposta}</p>`,
    } } }, escopo: SITE,
  });
  console.log(`  ✔ ${String(ordem)}  ${a.exp.padEnd(18)} ${a.pergunta.slice(0, 44)}`);
  gravados++;
}

/* conferência */
const depois = (await wix('/wix-data/v2/items/query', {
  corpo: { dataCollectionId: 'FAQ', query: { cursorPaging: { limit: 100 } } }, escopo: SITE,
})).dataItems.map((x) => x.data);
const ref = (v) => (typeof v === 'object' && v ? v._id : v);

console.log(`\n${PREENCHER ? gravados + ' gravadas' : removidos + ' removidas'} · FAQ com ${depois.length} perguntas`);
console.log('\n── quantas cada página da expedição vai mostrar ──');
const gerais = depois.filter((d) => d.escopo === 'geral' && d.ativo).length;
for (const id of ['costa-doce', 'urubici', 'serra-da-canastra', 'visconde-de-maua', 'macae']) {
  const proprias = depois.filter((d) => d.escopo === 'expedicao' && d.ativo && ref(d.expedicao) === id).length;
  console.log(`  ${id.padEnd(19)} ${proprias} próprias + ${gerais} gerais = ${proprias + gerais}`);
}
console.log(`\nGrupo Avulso mostra só as gerais: ${gerais}`);
