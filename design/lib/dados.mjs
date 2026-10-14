// Conteúdo do design.
// REAIS (extraídos do desbravandoutv.com em 01/08/2026): destinos, cidades, datas,
// nomes e preços das acomodações, estoque de UTVs, contatos.
// EXEMPLO (o Desbravando preenche): roteiro dia a dia, km, dificuldade, textos de
// destino, incluso/não incluso, FAQ, depoimentos, números de prova social.
import fs from 'node:fs';

const CAMINHO_IMGS = new URL('../../auditoria-visual/imagens.json', import.meta.url);

let banco = { plano: [] };
try {
  banco = JSON.parse(fs.readFileSync(CAMINHO_IMGS, 'utf8'));
} catch {
  console.warn('! imagens.json ausente — o design vai usar blocos de cor no lugar das fotos.');
}

/** Procura uma imagem do site por página e/ou trecho do alt. */
export function foto({ pagina, contem, indice = 0, largura = 1400 }) {
  const cands = banco.plano.filter((p) => {
    if (pagina && !p.pagina.includes(pagina)) return false;
    if (contem && !(p.alt || '').toLowerCase().includes(contem.toLowerCase())) return false;
    return p.original && p.original.includes('static.wixstatic.com');
  });
  const escolhida = cands[indice] || cands[0];
  if (!escolhida) return null;
  const m = escolhida.original.match(/^(https:\/\/static\.wixstatic\.com\/media\/[^/]+)/);
  return m ? `${m[1]}/v1/fill/w_${largura},h_${Math.round(largura * 0.7)},al_c,q_85/img.jpg` : escolhida.original;
}

/** Fotos das expedições, na ordem em que aparecem no event-list. */
export const fotoExpedicao = (i, largura = 1200) => foto({ pagina: 'expedicoes', indice: i, largura });
export const fotoHome = (i, largura = 1800) => foto({ pagina: 'home', indice: i, largura });
export const fotoUTV = (i, largura = 900) => foto({ pagina: 'offroad', indice: i, largura });
export const fotoVestuario = (i, largura = 800) => foto({ pagina: 'vestuario', indice: i, largura });

/* ─────────────────── expedições (REAL) ─────────────────── */

export const EXPEDICOES = [
  {
    destino: 'Costa Doce',
    uf: 'RS',
    titulo: 'Expedição Costa Doce',
    datas: '02 a 06 de dezembro de 2026',
    datasCurtas: '02–06 dez 2026',
    duracao: '5 dias',
    dificuldade: 'Média',
    vagas: 'Pré-reserva aberta',
    perfil: 'Casais e Família',
    formato: 'Casais e Família',
    preco: 'a confirmar',
    precoNota: '',
    status: { rotulo: 'Pré-reserva aberta', tipo: 'pre-reserva' },
    resumo: 'Dunas que não acabam, lagoas escondidas na areia e beira-oceano por quilômetros no litoral gaúcho.',
    fotoIdx: 3,
  },
  {
    destino: 'Urubici',
    uf: 'SC',
    titulo: '3ª Expedição Família',
    datas: '26 a 30 de agosto de 2026',
    datasCurtas: '26–30 ago 2026',
    duracao: '5 dias',
    dificuldade: 'Média',
    vagas: 'Últimas vagas',
    perfil: 'Família', formato: 'Família',
    preco: 'R$ 19.500',
    precoNota: 'por acomodação, casal · 5 dias',
    status: { rotulo: 'Últimas vagas', tipo: 'ultimas' },
    resumo: 'Cânions, cachoeiras e a serra catarinense na melhor época do ano. Roteiro pensado para rodar com a família junto.',
    fotoIdx: 0,
  },
  {
    destino: 'Serra da Canastra',
    uf: 'MG',
    titulo: 'Expedição Canastra',
    datas: 'Datas em definição',
    datasCurtas: 'Datas em definição',
    duracao: '4 dias',
    dificuldade: 'Média/Alta',
    vagas: 'Lista de espera',
    perfil: 'Aventura', formato: 'Só Homens',
    preco: 'Sob consulta',
    precoNota: 'divulgado na abertura das vagas',
    status: { rotulo: 'Lista de espera', tipo: 'espera' },
    resumo: 'A nascente do São Francisco, o Casca d’Anta e as estradas de terra mais bonitas de Minas.',
    fotoIdx: 1,
  },
  {
    destino: 'Visconde de Mauá',
    uf: 'RJ',
    titulo: 'Expedição Pedra Selada',
    datas: 'Datas em definição',
    datasCurtas: 'Datas em definição',
    duracao: '3 dias',
    dificuldade: 'Alta',
    vagas: 'Lista de espera',
    perfil: 'Trilha pesada', formato: 'Só Homens',
    preco: 'Sob consulta',
    precoNota: 'divulgado na abertura das vagas',
    status: { rotulo: 'Lista de espera', tipo: 'espera' },
    resumo: 'Serra da Mantiqueira, Pedra Selada e o frio da região mais tradicional do off-road carioca.',
    fotoIdx: 2,
  },
  {
    destino: 'Macaé',
    uf: 'RJ',
    titulo: 'Expedição Litoral',
    datas: 'Datas em definição',
    datasCurtas: 'Datas em definição',
    duracao: '3 dias',
    dificuldade: 'Leve',
    vagas: 'Lista de espera',
    perfil: 'Praia', formato: 'Casais e Família',
    preco: 'Sob consulta',
    precoNota: 'divulgado na abertura das vagas',
    status: { rotulo: 'Lista de espera', tipo: 'espera' },
    resumo: 'Restinga, areia e mar. A expedição mais tranquila do calendário — boa para quem está começando.',
    fotoIdx: 3,
  },
];

/* ───────── acomodações de Urubici (REAL — hoje é a tabela "Tipo de ingresso") ───────── */

export const ACOMODACOES = [
  { nome: 'Eco Suíte Superior', pessoas: '2 pessoas', preco: 'R$ 19.500', status: null },
  { nome: 'Eco Suíte Térrea', pessoas: '2 pessoas', preco: 'R$ 19.500', status: null },
  { nome: 'Chalé Luxo', pessoas: '2 pessoas', preco: 'R$ 20.300', status: 'esgotado' },
  { nome: 'Chalé Super Luxo', pessoas: '2 pessoas', preco: 'R$ 20.300', status: null },
  { nome: 'Chalé Super Luxo Vista Lago', pessoas: '2 pessoas', preco: 'R$ 20.300', status: null },
  { nome: 'Apartamento Vista Lago', pessoas: '2 adultos + 1 criança  ·  3 adultos', preco: 'R$ 24.375 – 29.250', status: null },
  { nome: 'Chalé Família', pessoas: 'casal + 2 crianças  ·  2 casais', preco: 'R$ 34.125 – 39.000', status: null },
];

/* ─────────────────── estoque off road (REAL) ─────────────────── */

export const UTVS = [
  { nome: 'Can Am Maverick X3 X-RC', ano: '2023', motor: 'Turbo 200 CV', preco: 'R$ 174.900' },
  { nome: 'Maverick X3 X-RS', ano: '2022', motor: 'Turbo 200 CV', preco: 'R$ 164.900' },
  { nome: 'Can Am X-RS Smartshox', ano: '2021', motor: 'Turbo 195 CV', preco: 'R$ 155.900' },
  { nome: 'ZFORCE Z10', ano: '2025', motor: 'Turbo 143 CV', preco: 'R$ 147.900' },
  { nome: 'Polaris Pro XP Ultimate', ano: '2021', motor: 'Turbo 184 CV', preco: 'R$ 119.900' },
];

/* ─────────────────── conteúdo de EXEMPLO ─────────────────── */

export const ROTEIRO = [
  ['Dia 01', 'Chegada e briefing', 'Recepção no hotel, entrega do kit da expedição, vistoria dos carros e briefing de segurança. Jantar de abertura com o grupo.'],
  ['Dia 02', 'Serra do Rio do Rastro', 'Saída cedo para a descida da serra, parada nos mirantes e almoço na estrada. Retorno pelo alto da serra no fim da tarde.'],
  ['Dia 03', 'Cânions e cachoeiras', 'Roteiro pelas cachoeiras da região com apoio de resgate em campo. Almoço de campo montado pela equipe.'],
  ['Dia 04', 'Trilha livre + dia de família', 'Manhã de trilha para quem quiser e programação alternativa para acompanhantes. Tarde livre no hotel.'],
  ['Dia 05', 'Encerramento', 'Café da manhã, sessão de fotos do grupo e desmobilização. Entrega do acervo de fotos e vídeos em até 15 dias.'],
];

export const INCLUSO = [
  'Hospedagem nas datas da expedição',
  'Café da manhã, almoços de roteiro e jantar de abertura',
  'Guias Desbravando em todos os dias de trilha',
  'Carro de apoio e apoio mecânico em campo',
  'Resgate e reboque dentro do roteiro',
  'Rádio comunicador por carro',
  'Fotógrafo e cinegrafista em campo',
  'Acervo digital de fotos e vídeos da expedição',
  'Kit da expedição (adesivos, bandeira e brindes)',
];

export const NAO_INCLUSO = [
  'Deslocamento até a cidade-base',
  'Transporte do UTV até o ponto de partida',
  'Combustível',
  'Bebidas e refeições fora do roteiro',
  'Seguro do veículo e seguro-viagem',
  'Peças e manutenção do seu UTV',
];

/**
 * Perguntas frequentes: [pergunta, resposta, escopo].
 *
 * O `escopo` existe porque o FAQ ganhou COLEÇÃO PRÓPRIA no CMS (08/08) em vez de ser
 * uma categoria dentro do `Guia`. O motivo: o `Guia` é sempre por expedição, mas a
 * maior parte das dúvidas é GERAL — e amarrada a uma expedição, ele teria que redigitar
 * as mesmas 8 perguntas em cada expedição nova. Com escopo, a resposta geral é escrita
 * uma vez e vale para todas; só o que muda de fato por destino é sobrescrito.
 *
 *   'geral'     → aparece no Grupo Avulso e em toda página de expedição
 *   'expedicao'  → só na página da expedição, e a resposta muda por destino
 *
 * Sem acento de propósito: é chave interna, digitada no filtro do dataset da Wix.
 *
 * Respostas em branco = ainda não vieram do cliente. Não inventar.
 */
export const PERGUNTAS = [
  ['Preciso ter UTV próprio para participar?',
   'Não necessariamente. A maior parte do grupo vai com o próprio carro, mas trabalhamos com parceiros de locação na região e conseguimos indicar um veículo do porte certo para o roteiro. Fale com a gente no WhatsApp antes de fechar a vaga.',
   'geral'],
  ['Qual o nível de dificuldade dessa expedição?', '', 'expedicao'],
  ['Criança pode ir? A partir de que idade?', '', 'geral'],
  ['Como funciona o apoio mecânico e o resgate?', '', 'geral'],
  ['O que acontece se eu precisar cancelar?', '', 'geral'],
  ['Preciso levar combustível? Tem posto no roteiro?', '', 'expedicao'],
  ['Dá para levar acompanhante que não dirige?', '', 'geral'],
  ['Quando recebo as fotos e os vídeos?', '', 'geral'],
];

export const O_QUE_LEVAR = [
  ['shirt', 'Roupa', 'Camadas para frio, capa de chuva e uma muda seca por dia'],
  ['footprints', 'Calçado', 'Bota fechada para trilha e um tênis para o hotel'],
  ['glasses', 'Proteção', 'Óculos, protetor solar, balaclava e luva'],
  ['wrench', 'Carro', 'Kit de reparo de pneu, corda de reboque e fluidos de reposição'],
  ['battery-charging', 'Energia', 'Carregador veicular e power bank'],
  ['pill', 'Saúde', 'Medicação de uso contínuo e documento com tipo sanguíneo'],
];

export const DEPOIMENTOS = [
  ['“Foi a primeira vez que levei minha mulher e meus dois filhos numa expedição. Não faltou nada — e é isso que faz a diferença.”', 'Participante da 2ª Expedição Família'],
  ['“Já rodei com outros grupos. A diferença do Desbravando é a estrutura: apoio, resgate, e alguém pensando em tudo antes de você precisar.”', 'Participante · Serra da Canastra'],
];

export const PROVA = [
  ['12', 'expedições realizadas'],
  ['340+', 'pilotos e famílias'],
  ['9', 'estados rodados'],
  ['15 mil', 'fotos entregues'],
];

export const PERSONALIZAVEL = [
  ['map', 'Destino', 'Escolha entre os destinos do nosso mapa ou proponha um novo'],
  ['calendar', 'Data e duração', 'De um fim de semana a uma semana inteira'],
  ['bed-double', 'Hospedagem', 'Do pousada-pé-na-estrada ao resort'],
  ['car-front', 'Carros', 'Frota própria, locação ou os carros do seu grupo'],
  ['utensils', 'Alimentação', 'Almoço de campo, restaurantes locais ou chef exclusivo'],
  ['camera', 'Mídia', 'Fotógrafo, cinegrafista e drone acompanhando o grupo'],
  ['gift', 'Brindes', 'Kit personalizado com a marca da sua empresa'],
  ['shield-check', 'Segurança', 'Resgate, apoio mecânico e ambulância sob demanda'],
];

export const SEMPRE_INCLUSO = [
  ['route', 'Roteiro montado', 'Trilhas reconhecidas antes por quem vai guiar'],
  ['users', 'Guias próprios', 'Equipe Desbravando na frente e no fim do comboio'],
  ['wrench', 'Apoio mecânico', 'Carro de apoio com peças e ferramenta'],
  ['life-buoy', 'Resgate', 'Reboque e resgate dentro do roteiro'],
  ['bed-double', 'Hospedagem', 'Escolhida e testada pela equipe'],
  ['radio', 'Comunicação', 'Rádio em todos os carros'],
  ['camera', 'Registro', 'Fotógrafo e cinegrafista em campo'],
  ['images', 'Acervo', 'Suas fotos numa galeria privada depois'],
];

export const CONTATO = {
  whatsapp: '(19) 99711-1188',
  whatsappLink: 'wa.me/5519997111188',
  instagram: '@desbravando_utv',
  youtube: '@desbravandoutv',
};

/* ═══════════════════════════════════════════════════════════════════
   v2 — conteúdo vindo dos documentos do cliente (05/08/2026):
   "Home (2).pdf", "Vaga avulsa.pdf", "Pagina do destino completo.pdf"
   e o desbravando-alteracoes.txt exportado do HTML editável.
   Textos aqui são os DELE, palavra por palavra, salvo onde marcado.
   ═══════════════════════════════════════════════════════════════════ */

export const MARCA = {
  titulo: 'MAIS QUE UMA MARCA.\nUM ESTILO DE VIDA.',
  posicionamento:
    'O Desbravando reúne pessoas que compartilham a mesma paixão pelo universo off-road. Da compra e venda de UTVs às expedições pelo Brasil, passando por produtos desenvolvidos para quem vive esse estilo de vida, cada detalhe é pensado para proporcionar experiências que vão muito além da trilha.',
  // fica SEMPRE em inglês, mesmo com o site em português — assinatura institucional
  assinaturaEN: 'Ready to welcome riders from around the world.',
};

/** Área de Destaques — campanha por campanha. Na Wix, uma linha de coleção cada. */
export const DESTAQUES = [
  { etiqueta: 'Pré-reserva aberta', titulo: 'URUBICI · SANTA CATARINA', texto: '3ª Expedição Família. 26 a 30 de agosto de 2026, na melhor janela do ano na serra catarinense.', cta: 'Faça sua pré-reserva', fotoIdx: 0 },
  { etiqueta: 'Inscrições abertas', titulo: 'SERRA DA CANASTRA', texto: 'A nascente do São Francisco e as estradas de terra mais bonitas de Minas.', cta: 'Reserve sua vaga', fotoIdx: 1 },
  { etiqueta: 'Coleção DSVV', titulo: 'A NOVA LINHA CHEGOU', texto: 'Peças em série curta, feitas para aguentar estrada.', cta: 'Conheça a coleção', fotoIdx: 3 },
];

/**
 * Os dois modelos de expedição — cada card leva à sua página de modelo.
 * Os cards perderam a foto na v3 (pedido literal). O que entrou no lugar foram as
 * `linhas` tabuladas: é delas que passa a vir a percepção de qualidade.
 */
export const FORMATOS = [
  {
    n: '01',
    titulo: 'GRUPO AVULSO',
    texto: 'Ideal para quem procura uma experiência organizada pelo Desbravando, com destino, data e grupo já formado.',
    linhas: [
      ['Quem vai', 'Você, sua família ou seus amigos, ao lado de outros desbravadores'],
      ['Datas', 'Definidas no calendário do Desbravando'],
      ['Vaga', 'Individual ou por carro'],
      ['Roteiro', 'Pronto e reconhecido antes por quem vai guiar'],
    ],
    cta: 'Ver próximas expedições',
  },
  {
    n: '02',
    titulo: 'GRUPO FECHADO',
    texto: 'Ideal para quem deseja criar uma expedição exclusiva, personalizada em cada detalhe para o seu grupo.',
    linhas: [
      ['Quem vai', 'Só quem você convidar — família, amigos ou a sua empresa'],
      ['Datas', 'Escolhidas pelo seu grupo'],
      ['Vaga', 'O grupo inteiro, em exclusividade'],
      ['Roteiro', 'Montado sob medida, do destino à alimentação'],
    ],
    cta: 'Solicitar orçamento',
  },
];

/** Os três pilares — o texto é um mantra de três partes, não uma descrição. */
export const PILARES = [
  { n: '01', titulo: 'Expedições', mantra: 'Desbravar lugares. Conectar pessoas. Criar histórias.', cta: 'Ver expedições', fotoIdx: 1 },
  { n: '02', titulo: 'Estoque Off-Road', mantra: 'Construir confiança. Entregar transparência. Realizar sonhos.', cta: 'Ver estoque', fotoIdx: 2 },
  { n: '03', titulo: 'Produtos', mantra: 'Autenticidade nos detalhes. Identidade em cada escolha.', cta: 'Ver coleção', fotoIdx: 3 },
];

/** Categorias do Guia da Expedição. O número é quantos itens a categoria concentra. */
export const GUIA = [
  ['Logística', '6 itens'], ['Hospedagem', '5 itens'],
  ['Gastronomia', '4 itens'], ['Transporte', '4 itens'],
  ['Vestuário', '3 itens'], ['O que levar', '6 itens'],
  ['Documentação', '3 itens'], ['Clima', '2 itens'],
  ['Perguntas frequentes', '8 itens'], ['Contatos', '3 itens'],
];

/** Módulo de hospedagem da página da expedição (EXEMPLO — o cliente preenche). */
export const HOSPEDAGEM = {
  nome: 'Pousada Serra do Corvo Branco',
  resumo:
    'Estrutura completa a 12 km do centro de Urubici, com restaurante próprio, lareira, estacionamento coberto para os carros e área de lavagem. Toda a expedição fica no mesmo lugar — ninguém se divide entre hotéis.',
  destaques: ['Café da manhã incluso', 'Estacionamento coberto', 'Área de lavagem para os UTVs', 'Restaurante no local'],
};

/** Situação da expedição → rótulo do botão principal. Muda com a fase comercial. */
export const BOTAO_POR_SITUACAO = {
  'pre-reserva': 'Fazer pré-reserva',
  aberta: 'Reservar vaga',
  ultimas: 'Reservar agora',
  espera: 'Entrar na lista de espera',
};

/* ═══════════════════════════════════════════════════════════════════
   v3 — 06/08/2026. O cliente mandou o dossiê REAL da Costa Doce, então
   a expedição-modelo passa a ser ela: roteiro com quilometragem, DUAS
   hospedagens, incluso/não incluso e estrutura, tudo palavra por palavra
   do documento dele. Some quase todo o conteúdo inventado.
   ⚠️ O dossiê NÃO traz valores — o módulo de reserva mostra a estrutura
   com "a confirmar" em vez de número chutado.
   ═══════════════════════════════════════════════════════════════════ */

export const COSTA_DOCE = {
  nome: 'Costa Doce',
  subtitulo: 'Litoral do Rio Grande do Sul',
  regiao: 'Mostardas · Lagoa do Peixe · Tramandaí',
  datas: '02 a 06 de dezembro de 2026',
  datasCurtas: '02–06 dez 2026',
  chamada: 'Isso não é trilha, é expedição padrão Desbravando.',
  sobre:
    'Cinco dias cruzando o trecho mais bruto do litoral gaúcho — dunas que não acabam, lagoas de água doce escondidas na areia, beira-oceano por quilômetros, matas de pinus, vilas de pescadores e faróis. Tudo com hospedagem escolhida a dedo entre o padrão e as opções da região e estrutura completa de apoio.',
  dados: [
    ['localização', 'Litoral do RS · Brasil'],
    ['base', 'Mostardas & Tramandaí'],
    ['duração', '5 dias · 3 de trilha'],
    ['veículos', 'O seu UTV · transporte incluso'],
    ['destaques', 'Dunas · lagoas · faróis'],
    ['percurso', '~540 km em 3 dias de trilha'],
  ],
  formato: 'Casais e Família',
  status: { rotulo: 'Pré-reserva aberta', tipo: 'pre-reserva' },
};

/** Roteiro real — dia, data, local, título, texto, quilometragem. */
export const ROTEIRO_COSTA = [
  ['01', '02 dez', 'Mostardas · RS', 'Chegada', 'Check-in a partir das 15:00 em Mostardas. O evento de boas-vindas inicia às 19:00 com jantar completo, chopp, drinks e música ao vivo.', ''],
  ['02', '03 dez', 'Lagoa do Peixe', 'Pontal do Bujuru', 'Beira-mar até Bujuru pelo Parque Nacional da Lagoa do Peixe, margens da Lagoa dos Patos e o Pontal do Bujuru.', '~170 km'],
  ['03', '04 dez', 'Mostardas · RS', 'Farol Cristóvão Pereira', 'Estradas vicinais, floresta de pinus e dunas até o Farol Cristóvão Pereira, com almoço na trilha e volta pela margem da Lagoa dos Patos.', '~140 km'],
  ['04', '05 dez', 'Tramandaí · RS', 'Mostardas → Tramandaí', 'Dunas e reflorestamento, almoço na Lagoa do Bacupari, praia de São Simão e beira-oceano até Tramandaí. À noite, fora do volante, nosso tradicional evento de encerramento.', '~230 km'],
  ['05', '06 dez', 'Tramandaí · RS', 'Despedida', 'Café da manhã e check-out, sem pressa. Você volta para casa com memórias que duram para sempre.', ''],
];

/** DUAS hospedagens — o caso que o cliente pediu para caber num módulo só. */
export const HOSPEDAGENS = [
  {
    nome: 'Pousada Pouso Alegre',
    onde: 'Mostardas · RS',
    papel: 'Chegada & coração da expedição',
    texto: 'No centro do roteiro, com café da manhã. Sua base nas noites 1, 2 e 3.',
    noites: '3 noites',
    fotos: [0, 1, 2],
  },
  {
    nome: 'Schenkel Hotel',
    onde: 'Tramandaí · RS',
    papel: 'Base da despedida',
    texto: 'Apart-hotel com café da manhã. Sua base na última noite — noite 4.',
    noites: '1 noite',
    fotos: [3, 0, 1],
  },
];
export const HOSPEDAGEM_NOTA =
  'Hospedagem escolhida a dedo entre as opções e padrões da região · 4 pernoites com café da manhã · jantas inclusas (3 em Mostardas · 1 em Tramandaí).';

export const INCLUSO_COSTA = [
  '3 dias de trilha guiada por equipe experiente',
  'Cegonha (transporte do UTV) ida e volta, com seguro contra roubo',
  'Transfer terrestre ida e volta — Limeira ↔ aeroporto e Porto Alegre ↔ Mostardas/Tramandaí',
  '4 pernoites com café da manhã (3 Mostardas · 1 Tramandaí)',
  '4 jantas (3 Mostardas · 1 Tramandaí)',
  '3 almoços (2 Mostardas · 1 Tramandaí)',
  'Eventos fora do volante — boas-vindas e encerramento, com coquetel, chopp, drinks e música ao vivo',
  'Carro de apoio 4×4 + reboque',
  '4 quadriciclos + mecânicos no comboio',
  'Equipe de 7 pessoas — guias, apoio e mecânica',
  'Equipe de fotos e vídeos profissionais',
];

export const NAO_INCLUSO_COSTA = [
  'Combustível dos trajetos',
  'Peças efetivamente utilizadas e mão de obra',
  'Passagem aérea',
  'O que não foi mencionado anteriormente',
];

/** Estrutura de apoio — vira parte do Guia. */
export const ESTRUTURA_COSTA = [
  'Planejamento e reconhecimento de rota',
  'Transporte do seu UTV (cegonha) com seguro contra roubo',
  'Hospedagem escolhida a dedo entre as opções e padrões da região',
  'Equipe completa com você o tempo todo',
  'Carro de apoio e mecânicos',
  'Eventos fora do volante (boas-vindas e encerramento)',
  'Fotos e vídeos profissionais',
];

/** Transfer terrestre, incluso nos dois trechos. */
export const TRANSFER = { origem: 'Limeira · SP', embarque: 'Aeroporto', chegada: 'Porto Alegre · RS', base: 'Mostardas', volta: 'Embarque a partir de Tramandaí' };

/**
 * Reserva no formato novo: por pessoa / por casal, e a escolha do quarto
 * saiu da página (acontece depois do clique, no fluxo de compra).
 * ⚠️ VALORES NÃO VIERAM no dossiê — não inventar.
 *
 * `formasPagamento` e `condicoes` NÃO aparecem mais na página: no ajuste final ele
 * mandou tirar tudo isso do módulo e apresentar durante o fluxo da reserva. Ficam aqui
 * (e no CMS) porque o checkout precisa deles — só não são renderizados.
 */
export const RESERVA = {
  porPessoa: 'a confirmar',
  porCasal: 'a confirmar',
  formasPagamento: ['PIX', 'Cartão em até 10×', 'Boleto'],
  condicoes: [
    ['Sinal na reserva', 'a confirmar'],
    ['Saldo', 'a confirmar'],
    ['Política para crianças', 'a confirmar'],
    ['Cancelamento', 'a confirmar'],
  ],
  nota: 'A escolha da acomodação acontece na próxima etapa, depois de iniciar a reserva.',
};

/**
 * ⚠️ RESPOSTAS DE TESTE — NÃO SÃO CONTEÚDO APROVADO.
 *
 * Existem só para conferir a sanfona do FAQ funcionando com todas as linhas abrindo.
 * Entram no CMS apenas com `node design/wix-importar.mjs --mockup-faq`; rodar o import
 * sem o sinalizador devolve tudo a vazio, que é o estado honesto.
 *
 * Marcação de origem, porque isso importa quando o cliente for revisar:
 *   [DOSSIÊ]    escrito a partir do dossiê real da Costa Doce
 *   [INVENTADO] chute plausível — tem que ser substituído antes de publicar
 */
export const RESPOSTAS_TESTE = {
  'Qual o nível de dificuldade dessa expedição?':
    // [DOSSIÊ] 3 dias de trilha, ~540 km, dunas e beira-oceano
    'Média. São 3 dias de trilha somando cerca de 540 km, entre dunas, estradas vicinais, floresta de pinus e beira-oceano. Não exige experiência em trilha pesada, mas exige carro em ordem e disposição para dias longos ao volante.',
  'Criança pode ir? A partir de que idade?':
    // [INVENTADO] o formato é "Casais e Família", mas a idade mínima não veio no dossiê
    'Sim. Esta é uma expedição de formato Casais e Família, e crianças são bem-vindas nos dois eventos fora do volante e na hospedagem. A idade mínima para andar na trilha depende do veículo e do assento — fale com a gente antes de fechar a vaga.',
  'Como funciona o apoio mecânico e o resgate?':
    // [DOSSIÊ] carro de apoio 4×4 + reboque, 4 quadriciclos + mecânicos, equipe de 7
    'A expedição roda com carro de apoio 4×4 e reboque, mais 4 quadriciclos com mecânicos dentro do comboio. A equipe tem 7 pessoas entre guias, apoio e mecânica. Peças efetivamente usadas e mão de obra são cobradas à parte.',
  'O que acontece se eu precisar cancelar?':
    // [INVENTADO] a política de cancelamento não veio no dossiê
    'A política de cancelamento é informada no contrato, na reserva. Em linhas gerais, quanto mais cedo o aviso, maior o valor reembolsado — e parte do sinal cobre custos já comprometidos com hospedagem e cegonha.',
  'Preciso levar combustível? Tem posto no roteiro?':
    // [DOSSIÊ] combustível está no "não incluso"; as bases são Mostardas e Tramandaí
    'O combustível é por sua conta e não está incluso. Há posto nas duas bases da expedição, Mostardas e Tramandaí, e a equipe orienta onde abastecer antes de cada dia de trilha.',
  'Dá para levar acompanhante que não dirige?':
    // [INVENTADO] plausível pelo formato, mas não confirmado
    'Sim. Há acompanhantes em todas as expedições. A pessoa participa da hospedagem, das refeições e dos eventos de boas-vindas e encerramento, e escolhe se acompanha a trilha no carro ou fica na base.',
  'Quando recebo as fotos e os vídeos?':
    // [INVENTADO] a equipe de fotos e vídeos está no dossiê; o PRAZO não
    'A expedição tem equipe de fotos e vídeos profissionais em campo. O acervo é entregue depois da edição, em link para download — o prazo é confirmado no fechamento da vaga.',
};

/**
 * GUIA DA EXPEDIÇÃO — conteúdo por categoria.
 *
 * Só entra aqui o que o dossiê da Costa Doce sustenta. As categorias que o dossiê não
 * cobre ficam com `''` de propósito: são orientação OPERACIONAL (que documento levar,
 * que roupa, contato de emergência) onde inventar não é enfeite errado, é informação que
 * alguém vai seguir dirigindo 540 km de duna. Ficam vazias até o cliente responder.
 *
 * A página trata vazio: a linha recolhe e não vira sanfona — o mesmo padrão do FAQ.
 */
export const GUIA_CONTEUDO = {
  'Logística': {
    titulo: 'Bases, encontro e ritmo',
    itens: [
      'Duas bases: Mostardas (3 noites) e Tramandaí (1 noite).',
      'Ponto de encontro em Mostardas, 02/12, a partir das 15:00.',
      '5 dias no total, 3 deles de trilha, somando ~540 km.',
      'Boas-vindas no primeiro dia e encerramento no último, os dois fora do volante.',
      'Comboio com carro de apoio 4×4 e reboque, 4 quadriciclos com mecânicos, e equipe de 7 entre guias, apoio e mecânica.',
    ],
  },
  'Hospedagem': {
    titulo: 'Onde o grupo fica',
    itens: [
      'Schenkel Hotel, em Mostardas — 3 pernoites.',
      'Pousada Pouso Alegre, em Tramandaí — 1 pernoite.',
      'Hospedagem escolhida a dedo entre as opções e padrões da região.',
      '4 pernoites com café da manhã inclusos.',
    ],
  },
  'Gastronomia': {
    titulo: 'O que está à mesa',
    itens: [
      '4 cafés da manhã, junto com os pernoites.',
      '4 jantas — 3 em Mostardas, 1 em Tramandaí.',
      '3 almoços — 2 em Mostardas, 1 em Tramandaí.',
      'Nos eventos de boas-vindas e encerramento: coquetel, chopp, drinks e música ao vivo.',
    ],
  },
  'Transporte': {
    titulo: 'Como o carro e você chegam',
    itens: [
      'Cegonha para o UTV, ida e volta, com seguro contra roubo — incluso.',
      'Transfer terrestre ida e volta: Limeira ↔ aeroporto e Porto Alegre ↔ Mostardas/Tramandaí.',
      'Aeroporto de referência: Porto Alegre, com transfer incluso.',
      'O UTV é o seu; o transporte dele até a base está incluso.',
      'Combustível dos trajetos fica por sua conta.',
    ],
  },

  // ⛔ Abaixo: o dossiê NÃO cobre. Não preencher sem resposta do cliente.
  'Vestuário': { titulo: '', itens: [] },
  'O que levar': { titulo: '', itens: [] },
  'Documentação': { titulo: '', itens: [] },
  'Clima': { titulo: '', itens: [] },
  'Contatos': { titulo: '', itens: [] },
};

/** As categorias do Guia que seguem esperando o cliente. */
export const GUIA_PENDENTE = Object.entries(GUIA_CONTEUDO)
  .filter(([, v]) => !v.itens.length).map(([k]) => k);
