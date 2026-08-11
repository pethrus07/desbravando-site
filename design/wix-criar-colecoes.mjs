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
  for (const f of faltam) {
    if (SECO) { console.log(`    → acrescentaria ${f.key}`); campos++; continue; }
    try {
      await wix(`/wix-data/v2/collections/${def.id}/fields`, { corpo: { field: f }, escopo: SITE });
      console.log(`    ✔ ${f.key}`);
      campos++;
    } catch (e) {
      console.log(`    ✘ ${f.key}: ${String(e.message).replace(/\s+/g, ' ').slice(0, 120)}`);
    }
  }
}

console.log(`\n${SECO ? '[SECO] ' : ''}${criadas} criadas · ${puladas} já existiam · ${campos} campos acrescentados`);
if (!SECO) {
  const depois = await colecoes();
  const nossas = depois.filter((c) => c.collectionType !== 'WIX_APP');
  console.log(`\nagora o site tem ${nossas.length} coleções próprias:`);
  for (const c of nossas) console.log(`   ${c.id.padEnd(12)} ${(c.fields || []).length} campos`);
}
