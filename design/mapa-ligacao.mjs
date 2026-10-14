// MAPA DE LIGAÇÃO da página da Expedição: cada texto do desenho → campo do CMS.
//
// Escrito na mão porque é uma DECISÃO (qual texto é conteúdo e qual é rótulo fixo), não
// algo derivável do .pen — a ficha guarda tipografia, não o conteúdo.
//
// A coluna "estado" NÃO é escrita aqui: sai do CMS na hora de gerar, então o documento
// nunca mente sobre o que está preenchido. Se um campo do mapa não existir na coleção, o
// gerador reclama em vez de imprimir um campo inventado.
//
// Rodar:  node design/mapa-ligacao.mjs          → imprime as tabelas
//         node design/mapa-ligacao.mjs --gravar → injeta no manual
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { wix, SITE, colecoes } from './wix.mjs';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const GRAVAR = process.argv.includes('--gravar');

/**
 * Um item = uma linha da tabela.
 *   onde  · o elemento, como ele aparece no recorte
 *   campo · a chave no CMS, ou null quando é texto fixo
 *   nota  · o que a pessoa precisa saber para não errar
 *   col   · a coleção, quando não é `Expedicoes` (repetidor)
 */
const F = (onde, campo, nota = '', col = 'Expedicoes') => ({ onde, campo, nota, col });
const FIXO = (onde, nota = 'texto fixo, igual em toda expedição') => ({ onde, campo: null, nota });

export const MAPA = {
  'vídeo/vídeo da expedição': {
    resumo: 'A faixa do topo, 1440 × 520.',
    itens: [
      F('o vídeo de fundo', 'videoAbertura', 'elemento de **Vídeo**'),
      F('a foto, enquanto não houver vídeo', 'fotoCapa', 'elemento de **Imagem** — é o que segura o topo hoje'),
      FIXO('o rótulo "vídeo da expedição"', 'texto fixo — ou tire, era marcação do desenho'),
    ],
    nota: 'Empilhe os dois: Imagem embaixo, Vídeo em cima. O Velo da 4.8 só recolhe esta ' +
      'seção se os **dois** estiverem vazios — e `fotoCapa` está preenchida nas 5, então o ' +
      'topo nunca fica em branco.',
  },

  'apresentação': {
    resumo: 'O módulo aprovado, é a referência de linguagem da página inteira.',
    itens: [
      FIXO('migalha · "Expedições"', 'link fixo para `/`'),
      FIXO('migalha · "Grupo Avulso"', 'link fixo para `/expedicoes`'),
      F('migalha · última', 'titulo', 'e ao lado, um segundo texto com `uf`'),
      F('migalha · UF', 'uf', 'a Wix não junta dois campos num texto — são dois elementos'),
      F('sobrelinha', 'nomeEdicao', 'já vem como "Expedição Costa Doce"'),
      F('sobrelinha · datas', 'dataInicio', 'formate a data no painel de conexão; `dataFim` num segundo texto'),
      F('título, 1ª linha', 'titulo', ''),
      F('título, 2ª linha', 'subtitulo', ''),
      F('chamada', 'chamada', ''),
      F('etiqueta de status', 'situacao', 'já traz o rótulo pronto — "Pré-reserva aberta"'),
      F('botão · texto', 'rotuloBotao', ''),
      F('botão · link', 'linkCheckout', 'vazio até o checkout existir — ver Parte 6'),
      FIXO('"sem precisar rolar a página inteira"'),
    ],
  },

  'resumo da expedição': {
    resumo: 'Três linhas de três células. Cada célula = um rótulo fixo + um valor do CMS.',
    itens: [
      FIXO('os 9 rótulos (LOCALIZAÇÃO, BASE, …)', 'texto fixo, em maiúsculas'),
      F('linha 1 · valor 1', 'localizacao', '⚠️ **não** é `regiao` — ver nota abaixo'),
      F('linha 1 · valor 2', 'base', ''),
      F('linha 1 · valor 3', 'duracao', ''),
      F('linha 2 · valor 1', 'veiculos', ''),
      F('linha 2 · valor 2', 'destaques', ''),
      F('linha 2 · valor 3', 'percurso', ''),
      F('linha 3 · valor 1', 'dataInicio', '`dataFim` ao lado, ou um texto só com as duas datas'),
      F('linha 3 · valor 2', 'formato', ''),
      F('linha 3 · valor 3', 'regiao', ''),
    ],
    nota: '`localizacao` e `regiao` **são campos diferentes** e é fácil trocar: ' +
      '`localizacao` = "Litoral do RS · Brasil" (linha 1) · `regiao` = ' +
      '"Mostardas · Lagoa do Peixe · Tramandaí" (linha 3). Criei `localizacao` hoje, ' +
      'justamente porque esse texto não tinha campo e ia acabar digitado no Editor.',
  },

  'galeria': {
    resumo: 'Uma foto por vez, com seta e legenda.',
    itens: [
      FIXO('sobrelinha "REGISTRO"'),
      FIXO('título "A EXPEDIÇÃO POR DENTRO"'),
      F('linha à direita', 'destaques', 'o mesmo campo do resumo — "Dunas · lagoas · faróis"'),
      F('as fotos', 'galeria', '**Pro Gallery**, nunca elemento de Imagem'),
      F('a legenda da foto', null, 'vem do **título de cada item** da galeria, não de um campo à parte'),
      FIXO('as setas ‹ ›', 'da própria Pro Gallery'),
    ],
  },

  'sobre o destino': {
    resumo: 'Texto corrido à esquerda, três dados à direita.',
    itens: [
      FIXO('sobrelinha "O DESTINO"'),
      F('a manchete', 'tituloSobre', 'criei hoje: é copy por destino, não pode ser fixa'),
      F('o texto corrido', 'sobreDestino', 'texto rico'),
      FIXO('rótulos BASE · TRILHA · SEU CARRO'),
      F('valor · Base', 'base', ''),
      F('valor · Trilha', 'percurso', ''),
      F('valor · Seu carro', 'veiculos', ''),
    ],
  },

  'roteiro': {
    resumo: 'Régua tipográfica, um item por dia. **Repetidor** — monte UM dia.',
    colecao: 'Roteiro',
    itens: [
      FIXO('sobrelinha "ROTEIRO"'),
      FIXO('título "DIA A DIA DA EXPEDIÇÃO"'),
      FIXO('a nota sobre o roteiro poder mudar'),
      F('o número grande do dia', 'dia', '', 'Roteiro'),
      F('a data', 'data', '', 'Roteiro'),
      F('o local', 'local', '', 'Roteiro'),
      F('o título do dia', 'titulo', '', 'Roteiro'),
      F('o parágrafo', 'texto', 'texto rico', 'Roteiro'),
      F('o km, à direita', 'km', 'vazio nos dias 1 e 5, que não têm trilha — deixe vazio', 'Roteiro'),
    ],
  },

  'hospedagem': {
    resumo: 'Dois hotéis, cada um com sua galeria. **Repetidor** — monte UM hotel.',
    colecao: 'Hospedagens',
    itens: [
      FIXO('sobrelinha "HOSPEDAGEM"'),
      FIXO('título "ONDE O GRUPO FICA"'),
      FIXO('"2 hospedagens · 4 pernoites"', 'hoje é fixo; vira contagem só com Velo'),
      F('a nota abaixo do título', 'hospedagemNota', 'este é de `Expedicoes`, fora do repetidor'),
      F('sobrelinha do item', 'papel', '', 'Hospedagens'),
      F('nome do hotel', 'nome', '', 'Hospedagens'),
      F('onde fica', 'onde', '', 'Hospedagens'),
      F('noites', 'noites', '', 'Hospedagens'),
      F('o parágrafo', 'texto', 'texto rico', 'Hospedagens'),
      F('a galeria do hotel', 'fotos', '**Galeria**, não Imagem — é MEDIA_GALLERY', 'Hospedagens'),
    ],
  },

  'está incluso': {
    resumo: 'Inventário numerado em duas colunas. **Repetidor** — monte UMA linha.',
    colecao: 'Itens',
    itens: [
      FIXO('sobrelinha "TUDO ISTO ACOMPANHA A EXPEDIÇÃO"'),
      FIXO('título "O QUE ESTÁ INCLUSO"'),
      FIXO('"11 itens", à direita', 'hoje fixo; vira contagem só com Velo'),
      F('o número, na calha de 32px', 'numero', 'TEXT, para o "01" não perder o zero', 'Itens'),
      F('o texto do item', 'texto', '', 'Itens'),
      F('a ordem', 'ordem', 'só no **ordenar** do dataset, não é elemento', 'Itens'),
      F('caminho alternativo · a lista inteira', 'incluso', 'texto rico — ver as duas opções abaixo'),
    ],
    nota: '**Duas opções, escolha uma — não ligue as duas na mesma página.** ' +
      '**(A) Repetidor** na coleção `Itens`, dataset filtrado por `expedicao` = item atual ' +
      '**e** `escopo` **é** `incluso`, ordenado por `ordem` crescente. Dá o desenho inteiro: ' +
      'número em mono, fio por linha, duas colunas. Já populei os 11 itens. ' +
      '**(B) Um Texto avançado** ligado a `incluso`: 1 elemento em vez de 22, mas vira lista ' +
      'com marcador — sem número, sem fio, sem colunas. ' +
      '⚠️ **Se usar 2 colunas no repetidor**, a Wix preenche em linha (01 02 / 03 04), e o ' +
      'desenho preenche em coluna (01–06 na esquerda, 07–11 na direita). Ler numerado de ' +
      'par em par funciona bem — só saiba que difere do recorte.',
  },

  'reserva': {
    resumo: 'Faixa preta. Enxuta no ajuste final: investimento e botão, e mais nada.',
    itens: [
      FIXO('sobrelinha "RESERVA"'),
      FIXO('título "O INVESTIMENTO DA EXPEDIÇÃO"'),
      FIXO('rótulo "POR ACOMODAÇÃO"', 'texto fixo — o desenho tinha dois valores, virou um'),
      F('o valor', 'valorExibido', 'string já formatada, ex. "A partir de R$ 19.500"'),
      F('botão · rótulo', 'rotuloBotao', ''),
      F('botão · link', 'linkCheckout', 'aponta para o evento no Wix Events'),
      F('condição · sinal', 'sinal', 'o Velo escreve e recolhe se vazio'),
      F('condição · saldo', 'saldo', 'idem'),
      F('condição · cancelamento', 'cancelamento', 'idem'),
      F('condição · pagamento', 'formasPagamento', 'idem'),
    ],
    nota: 'Ligue tudo mesmo assim. Enquanto os dois valores estiverem vazios, o Velo da ' +
      '4.8 **recolhe a seção inteira** — melhor do que faixa preta com "a confirmar".',
  },

  'não está incluso': {
    resumo: 'O módulo mais leve da página, de propósito. Mesma escolha do módulo 8.',
    colecao: 'Itens',
    itens: [
      FIXO('sobrelinha "COMPLEMENTO"'),
      FIXO('título "O QUE NÃO ESTÁ INCLUSO"'),
      FIXO('"por conta do participante"'),
      F('o texto do item', 'texto', 'sem número aqui — este bloco não é numerado', 'Itens'),
      F('a ordem', 'ordem', 'só no **ordenar** do dataset', 'Itens'),
      F('caminho alternativo · a lista inteira', 'naoIncluso', 'texto rico, 4 itens'),
    ],
    nota: 'Se for de repetidor, é a **mesma coleção `Itens`** do módulo 8 — só troca o ' +
      'filtro para `escopo` **é** `nao-incluso`. Dataset separado, com ID próprio ' +
      '(`datasetNaoIncluso`), porque um dataset guarda um filtro só. Este bloco não tem ' +
      'número no desenho: ligue apenas `texto`.',
  },

  'faq': {
    resumo: 'Sanfona. **DOIS repetidores** — ver 4.4.',
    colecao: 'FAQ',
    itens: [
      FIXO('sobrelinha "DÚVIDAS"'),
      FIXO('título "PERGUNTAS FREQUENTES"'),
      FIXO('rótulo "Sobre esta expedição"', 'dê o ID `textRotuloFaqExp` — o Velo recolhe junto'),
      FIXO('rótulo "Dúvidas gerais"'),
      F('a pergunta', 'pergunta', '', 'FAQ'),
      F('a resposta', 'resposta', 'texto rico; recolhida por padrão', 'FAQ'),
      F('a ordem', 'ordem', 'só no **ordenar** do dataset', 'FAQ'),
      FIXO('o sinal + / −', 'texto, não ícone — o Velo troca o caractere'),
    ],
  },
};

/* ─────────────────────────── geração ─────────────────────────── */

const defs = await colecoes();
const campos = {};
for (const c of defs) campos[c.id] = new Set((c.fields || []).map((f) => f.key));

/** quantos itens de cada coleção têm o campo preenchido */
const preenchido = {};
for (const col of ['Expedicoes', 'Roteiro', 'Hospedagens', 'Guia', 'Itens', 'FAQ']) {
  const r = await wix('/wix-data/v2/items/query', {
    corpo: { dataCollectionId: col, query: { cursorPaging: { limit: 100 } } }, escopo: SITE,
  });
  const itens = r.dataItems.map((x) => x.data);
  const vazio = (v) => v == null || v === '' || (Array.isArray(v) && !v.length) ||
    (typeof v === 'string' && !v.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim());
  preenchido[col] = { total: itens.length, por: {} };
  for (const k of campos[col] || []) preenchido[col].por[k] = itens.filter((i) => !vazio(i[k])).length;
}

let erros = 0;
const linhasTabela = (modulo, def) => {
  const out = ['| Elemento | Campo do CMS | Estado | Observação |', '|---|---|---|---|'];
  for (const it of def.itens) {
    if (!it.campo) {
      out.push(`| ${it.onde} | — | fixo | ${it.nota} |`);
      continue;
    }
    // cada item diz a sua coleção; o padrão é `Expedicoes`, e os campos de repetidor
    // recebem a coleção-filha explicitamente no MAPA. Sem adivinhação.
    const colecao = it.col || 'Expedicoes';
    if (!campos[colecao]?.has(it.campo)) {
      console.log(`  ✘ ${modulo}: campo \`${it.campo}\` não existe em ${colecao}`);
      erros++;
      out.push(`| ${it.onde} | \`${it.campo}\` | **✘ NÃO EXISTE** | ${it.nota} |`);
      continue;
    }
    const p = preenchido[colecao];
    if (!p) {
      // coleção citada no MAPA que não entrou no laço de contagem lá em cima
      console.log(`  ✘ ${modulo}: não contei a coleção "${colecao}" — acrescente ao laço de \`preenchido\``);
      erros++;
      continue;
    }
    const n = p.por[it.campo] ?? 0;
    const estado = n === 0 ? '⛔ vazio' : n === p.total ? `✓ ${n}/${p.total}` : `◐ ${n}/${p.total}`;
    out.push(`| ${it.onde} | \`${it.campo}\`${colecao !== 'Expedicoes' ? ` · ${colecao}` : ''} | ${estado} | ${it.nota} |`);
  }
  return out.join('\n');
};

const blocos = {};
for (const [modulo, def] of Object.entries(MAPA)) {
  const partes = [`**Conectar ao CMS** — ${def.resumo}`, '', linhasTabela(modulo, def)];
  if (def.nota) partes.push('', `> ${def.nota}`);
  blocos[modulo] = partes.join('\n');
}

if (erros) { console.log(`\n✘ ${erros} campos do mapa não existem no CMS — corrija antes de gravar`); process.exit(1); }
console.log(`✓ ${Object.keys(MAPA).length} módulos mapeados, todos os campos existem no CMS`);

if (!GRAVAR) {
  for (const [m, b] of Object.entries(blocos)) console.log(`\n\n══════ ${m}\n${b}`);
} else {
  const arq = path.join(RAIZ, '5-manual-de-montagem.md');
  let md = fs.readFileSync(arq, 'utf8');
  let postos = 0;
  for (const [modulo, bloco] of Object.entries(blocos)) {
    // insere logo depois do cabeçalho do módulo: "### N. `nome` — …"
    const re = new RegExp(`(^### \\d+\\. \`${modulo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\`[^\\n]*\\n)`, 'm');
    if (!re.test(md)) { console.log(`  ! não achei o cabeçalho de "${modulo}"`); continue; }
    if (md.includes(`**Conectar ao CMS** — ${MAPA[modulo].resumo}`)) { continue; } // já está lá
    md = md.replace(re, `$1\n${bloco}\n`);
    postos++;
  }
  fs.writeFileSync(arq, md, 'utf8');
  console.log(`${postos} mapas injetados no manual`);
}
