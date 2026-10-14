// Cria as 6 coleções do CMS no site do Desbravando, via API.
//
// Idempotente: coleção que já existe é PULADA, não sobrescrita. Pode rodar de novo sem
// medo. Com `--forcar-campos`, acrescenta em coleção existente os campos que faltarem
// (nunca remove nem altera campo existente).
//
// A ordem importa: `Expedicoes` primeiro, porque as outras têm campo de referência
// apontando para ela — referência para coleção inexistente não amarra.
//
// Rodar:  node design/wix-criar-colecoes.mjs            (cria o que falta)
//         node design/wix-criar-colecoes.mjs --seco     (só mostra o que faria)
import { wix, colecoes, SITE } from './wix.mjs';

const SECO = process.argv.includes('--seco');
const FORCAR = process.argv.includes('--forcar-campos');

const T = (key, displayName) => ({ key, displayName, type: 'TEXT' });
const N = (key, displayName) => ({ key, displayName, type: 'NUMBER' });
const B = (key, displayName) => ({ key, displayName, type: 'BOOLEAN' });
const D = (key, displayName) => ({ key, displayName, type: 'DATE' });
const R = (key, displayName) => ({ key, displayName, type: 'RICH_TEXT' });
const U = (key, displayName) => ({ key, displayName, type: 'URL' });
const G = (key, displayName) => ({ key, displayName, type: 'MEDIA_GALLERY' });
const V = (key, displayName) => ({ key, displayName, type: 'VIDEO' });
const I = (key, displayName) => ({ key, displayName, type: 'IMAGE' });
/** Referência simples para outra coleção. */
const REF = (key, displayName, alvo) => ({
  key, displayName, type: 'REFERENCE',
  typeMetadata: { reference: { referencedCollectionId: alvo } },
});

// leitura pública, escrita só admin — o cliente nunca abre o CMS
const PERM = { insert: 'ADMIN', update: 'ADMIN', remove: 'ADMIN', read: 'ANYONE' };

const COLECOES = [
  {
    id: 'Expedicoes', displayName: 'Expedições',
    fields: [
      T('titulo', 'Título'), T('subtitulo', 'Subtítulo'), T('uf', 'UF'),
      T('nomeEdicao', 'Nome da edição'), T('chamada', 'Chamada'),
      V('videoAbertura', 'Vídeo de abertura'),
      T('situacao', 'Situação'),
      D('dataInicio', 'Data de início'), D('dataFim', 'Data de fim'),
      T('duracao', 'Duração'), T('percurso', 'Percurso'), T('formato', 'Formato'),
      T('regiao', 'Região'), T('base', 'Base'), T('veiculos', 'Veículos'),
      T('destaques', 'Destaques'), T('aeroporto', 'Aeroporto'),
      T('pontoEncontro', 'Ponto de encontro'),
      // Os dois abaixo nasceram do mapa de ligação da página dinâmica: o desenho mostrava
      // esses textos e não havia campo para eles, o que obrigaria a digitar direto no
      // Editor — e aí a página deixa de servir a próxima expedição.
      //   localizacao  → a 1ª célula do resumo ("Litoral do RS · Brasil"). NÃO é `regiao`,
      //                  que é outra coisa ("Mostardas · Lagoa do Peixe · Tramandaí").
      //   tituloSobre  → a manchete da seção "sobre o destino", que é copy por destino.
      T('localizacao', 'Localização'),
      T('tituloSobre', 'Título da seção Sobre o destino'),
      // ⚠️ DOIS campos de imagem, e são coisas diferentes:
      //   fotoCapa  → IMAGE. É o que um elemento de Imagem consegue conectar. Serve a
      //               linha da agenda e qualquer listagem. Elemento de Imagem NÃO
      //               conecta em MEDIA_GALLERY — foi o que faltou na primeira versão.
      //   galeria   → MEDIA_GALLERY. Alimenta o carrossel da página da expedição.
      I('fotoCapa', 'Foto de capa (agenda e listagens)'),
      G('galeria', 'Galeria'),
      R('sobreDestino', 'Sobre o destino'), T('hospedagemNota', 'Nota da hospedagem'),
      R('incluso', 'O que está incluso'), R('naoIncluso', 'O que não está incluso'),
      T('valorPorPessoa', 'Valor por pessoa'), T('valorPorCasal', 'Valor por casal'),
      T('formasPagamento', 'Formas de pagamento'),
      T('sinal', 'Sinal'), T('saldo', 'Saldo'),
      T('politicaCriancas', 'Política para crianças'), T('cancelamento', 'Cancelamento'),
      T('rotuloBotao', 'Rótulo do botão'), U('linkCheckout', 'Link do checkout'),
      B('publicado', 'Publicado'),
    ],
  },
  {
    id: 'Roteiro', displayName: 'Roteiro',
    fields: [
      REF('expedicao', 'Expedição', 'Expedicoes'),
      N('dia', 'Dia'), T('data', 'Data'), T('local', 'Local'),
      T('titulo', 'Título'), R('texto', 'Texto'), T('km', 'Quilometragem'),
    ],
  },
  {
    id: 'Hospedagens', displayName: 'Hospedagens',
    fields: [
      REF('expedicao', 'Expedição', 'Expedicoes'),
      N('ordem', 'Ordem'), T('nome', 'Nome'), T('papel', 'Papel'),
      T('onde', 'Onde'), T('noites', 'Noites'), R('texto', 'Texto'),
      G('fotos', 'Fotos'),
    ],
  },
  {
    id: 'Guia', displayName: 'Guia da Expedição',
    fields: [
      REF('expedicao', 'Expedição', 'Expedicoes'),
      // `ordem` não é enfeite: sem ela o repetidor só pode ordenar por `categoria`, o que
      // sai em ordem alfabética (Clima, Contatos, Documentação…) e espalha as categorias
      // ainda vazias no meio das preenchidas. A ordem do desenho é outra.
      N('ordem', 'Ordem'),
      T('categoria', 'Categoria'), T('titulo', 'Título'), R('conteudo', 'Conteúdo'),
    ],
  },
  {
    id: 'Destaques', displayName: 'Destaques da Home',
    fields: [
      B('ativo', 'Ativo'), N('ordem', 'Ordem'), T('etiqueta', 'Etiqueta'),
      T('titulo', 'Título'), T('texto', 'Texto'), T('rotuloBotao', 'Rótulo do botão'),
      U('link', 'Link'), I('fotoDesktop', 'Foto desktop'), I('fotoMobile', 'Foto mobile'),
    ],
  },
  {
    // UMA coleção serve os DOIS módulos — "o que está incluso" (11 itens) e "o que não
    // está incluso" (4). O campo `escopo` separa. Motivo de não fazer duas: são a mesma
    // forma de dado, e o item interno do repetidor é o mesmo desenho.
    //
    // Os campos `incluso`/`naoIncluso` de `Expedicoes` continuam existindo e preenchidos.
    // Servem de caminho simples (um Texto avançado só) e de fonte para o agente do
    // WhatsApp. Escolha um dos dois na montagem — não ligue os dois na mesma página.
    id: 'Itens', displayName: 'Itens do pacote',
    fields: [
      REF('expedicao', 'Expedição', 'Expedicoes'),
      T('escopo', 'Escopo (incluso | nao-incluso)'),
      N('ordem', 'Ordem'),
      // `numero` é TEXT, não NUMBER, porque o desenho mostra "01" e não "1" — campo
      // numérico perde o zero à esquerda e não há como formatar isso no painel.
      T('numero', 'Número (01, 02…)'),
      T('texto', 'Texto do item'),
    ],
  },
  {
    // FAQ é coleção própria, e não categoria do Guia: a maior parte das dúvidas é geral
    // e a resposta vale para toda expedição. `expedicao` fica VAZIO nas gerais.
    id: 'FAQ', displayName: 'Perguntas Frequentes',
    fields: [
      B('ativo', 'Ativo'), N('ordem', 'Ordem'), T('escopo', 'Escopo'),
      REF('expedicao', 'Expedição (só se for específica)', 'Expedicoes'),
      T('pergunta', 'Pergunta'), R('resposta', 'Resposta'),
    ],
  },
];

/* ── o que já existe no site ── */
const existentes = await colecoes();
const porId = new Map(existentes.map((c) => [c.id, c]));
console.log(`site ${SITE}`);
console.log(`${existentes.length} coleções hoje (${existentes.filter((c) => c.collectionType === 'WIX_APP').length} de apps da Wix)\n`);

let criadas = 0, puladas = 0, campos = 0;

for (const def of COLECOES) {
  const ja = porId.get(def.id);

  if (!ja) {
    if (SECO) { console.log(`→ criaria  ${def.id.padEnd(12)} ${def.fields.length} campos`); criadas++; continue; }
    try {
      await wix('/wix-data/v2/collections', {
        corpo: { collection: { id: def.id, displayName: def.displayName, fields: def.fields, permissions: PERM } },
        escopo: SITE,
      });
      console.log(`✔ criada   ${def.id.padEnd(12)} ${def.fields.length} campos`);
      criadas++;
    } catch (e) {
      console.log(`✘ falhou   ${def.id.padEnd(12)} ${String(e.message).replace(/\s+/g, ' ').slice(0, 160)}`);
    }
    continue;
  }

  // já existe — confere se falta campo
  const tem = new Set((ja.fields || []).map((f) => f.key));
  const faltam = def.fields.filter((f) => !tem.has(f.key));
  if (!faltam.length) { console.log(`· existe   ${def.id.padEnd(12)} completa`); puladas++; continue; }

  console.log(`! existe   ${def.id.padEnd(12)} faltam ${faltam.length}: ${faltam.map((f) => f.key).join(', ')}`);
  if (!FORCAR) { puladas++; continue; }
  if (SECO) { faltam.forEach((f) => console.log(`    → acrescentaria ${f.key}`)); campos += faltam.length; continue; }

  // Acrescentar campo tem exatamente um caminho que funciona, e três que enganam:
  //   POST /collections/{id}/fields   → 404, o endpoint não existe
  //   PUT  /collections/{id}          → 404
  //   PATCH /collections/{id}         → WDE0075, quer um diff que a doc não descreve
  //   PUT  /collections  ✔            → com `revision` e a lista COMPLETA de campos
  // Sem o `revision` da coleção: 400 "revision must not be empty".
  // Mandando só os campos novos: apaga os antigos. Por isso vai `[...já, ...novos]`.
  //
  // 🛑 NÃO filtre por `type` aqui. Filtrar `f.type !== 'PAGE_LINK'` apagou o campo
  // `link-expedicoes-titulo` de `Expedicoes` — o campo que a Wix cria sozinha quando existe
  // página dinâmica, e que é justamente o que se conecta no link do cartão da agenda.
  // O PUT substitui a lista inteira: o que não vai, morre. Só `_id`/`_createdDate` e afins
  // é que devem sair, porque a API os rejeita de volta.
  try {
    await wix('/wix-data/v2/collections', {
      metodo: 'PUT',
      corpo: {
        collection: {
          id: ja.id, displayName: ja.displayName, revision: ja.revision,
          fields: [...(ja.fields || []).filter((f) => !/^_/.test(f.key)), ...faltam],
          permissions: ja.permissions || PERM,
        },
      },
      escopo: SITE,
    });
    console.log(`    ✔ ${faltam.map((f) => f.key).join(', ')} (via PUT da coleção)`);
    campos += faltam.length;
  } catch (e) {
    const viol = e.dados?.details?.validationError?.fieldViolations?.map((v) => `${v.field}: ${v.description}`).join(' | ');
    console.log(`    ✘ ${viol || String(e.message).replace(/\s+/g, ' ').slice(0, 160)}`);
  }
}

console.log(`\n${SECO ? '[SECO] ' : ''}${criadas} criadas · ${puladas} já existiam · ${campos} campos acrescentados`);
if (!SECO) {
  const depois = await colecoes();
  const nossas = depois.filter((c) => c.collectionType !== 'WIX_APP');
  console.log(`\nagora o site tem ${nossas.length} coleções próprias:`);
  for (const c of nossas) console.log(`   ${c.id.padEnd(12)} ${(c.fields || []).length} campos`);
}
