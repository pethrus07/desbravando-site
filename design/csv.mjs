// Gera os CSVs das coleções do CMS a partir do MESMO conteúdo que alimenta o design.
// Assim a página e o banco nunca divergem — e cadastrar a Costa Doce vira importação
// de arquivo, não duas horas de digitação.
//
// Rodar:  node design/csv.mjs   → escreve em cms/
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  COSTA_DOCE, ROTEIRO_COSTA, HOSPEDAGENS, HOSPEDAGEM_NOTA, INCLUSO_COSTA,
  NAO_INCLUSO_COSTA, RESERVA, EXPEDICOES, GUIA, PERGUNTAS, DESTAQUES,
} from './lib/dados.mjs';

const DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'cms');
fs.mkdirSync(DIR, { recursive: true });

/** CSV com aspas duplas escapadas, do jeito que o importador da Wix espera. */
function csv(colunas, linhas) {
  const cel = (v) => {
    const s = v == null ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [colunas.join(','), ...linhas.map((l) => colunas.map((c) => cel(l[c])).join(','))].join('\n');
}

const escrever = (nome, colunas, linhas) => {
  const arq = path.join(DIR, `${nome}.csv`);
  fs.writeFileSync(arq, '﻿' + csv(colunas, linhas), 'utf8'); // BOM: acento no Excel
  console.log(`${String(linhas.length).padStart(3)} linhas  ${nome}.csv`);
};

const dado = (chave) => COSTA_DOCE.dados.find(([r]) => r === chave)?.[1] || '';
const lista = (itens) => itens.map((i) => `• ${i}`).join('\n');

/* ── 1 · Expedicoes ────────────────────────────────────────────────── */
// A Costa Doce vai completa (é o piloto, e é a única com conteúdo real).
// As outras entram como rascunho: o que existe hoje é só o cabeçalho da agenda.
const expedicoes = [
  {
    titulo: COSTA_DOCE.nome,
    subtitulo: COSTA_DOCE.subtitulo,
    uf: 'RS',
    nomeEdicao: `Expedição ${COSTA_DOCE.nome}`,
    chamada: COSTA_DOCE.chamada,
    situacao: 'pré-reserva',
    dataInicio: '2026-12-02',
    dataFim: '2026-12-06',
    duracao: dado('duração'),
    percurso: dado('percurso'),
    formato: COSTA_DOCE.formato,
    regiao: COSTA_DOCE.regiao,
    base: dado('base'),
    veiculos: dado('veículos'),
    destaques: dado('destaques'),
    aeroporto: 'Porto Alegre · transfer incluso',
    pontoEncontro: 'Mostardas, 02/12 a partir das 15:00',
    sobreDestino: COSTA_DOCE.sobre,
    hospedagemNota: HOSPEDAGEM_NOTA,
    incluso: lista(INCLUSO_COSTA),
    naoIncluso: lista(NAO_INCLUSO_COSTA),
    valorPorPessoa: '',      // ⚠️ o dossiê não traz — preencher antes de publicar
    valorPorCasal: '',       // ⚠️ idem
    formasPagamento: RESERVA.formasPagamento.join(' · '),
    sinal: '', saldo: '', politicaCriancas: '', cancelamento: '',
    rotuloBotao: 'Fazer pré-reserva',
    linkCheckout: '',
    publicado: 'FALSE',      // só liga quando os valores chegarem
  },
  ...EXPEDICOES.slice(1).map((e) => ({
    titulo: e.destino, subtitulo: '', uf: e.uf, nomeEdicao: e.titulo || '',
    chamada: e.resumo, situacao: e.status.tipo, dataInicio: '', dataFim: '',
    duracao: e.duracao, percurso: '', formato: e.formato, regiao: '', base: '',
    veiculos: '', destaques: '', aeroporto: '', pontoEncontro: '', sobreDestino: '',
    hospedagemNota: '', incluso: '', naoIncluso: '', valorPorPessoa: '',
    valorPorCasal: '', formasPagamento: '', sinal: '', saldo: '', politicaCriancas: '',
    cancelamento: '', rotuloBotao: '', linkCheckout: '', publicado: 'FALSE',
  })),
];
escrever('1-Expedicoes', Object.keys(expedicoes[0]), expedicoes);

/* ── 2 · Roteiro ───────────────────────────────────────────────────── */
escrever('2-Roteiro', ['expedicao', 'dia', 'data', 'local', 'titulo', 'texto', 'km'],
  ROTEIRO_COSTA.map(([dia, data, local, titulo, texto, km]) => ({
    expedicao: COSTA_DOCE.nome, dia: Number(dia), data, local, titulo, texto, km,
  })));

/* ── 3 · Hospedagens ───────────────────────────────────────────────── */
escrever('3-Hospedagens', ['expedicao', 'ordem', 'nome', 'papel', 'onde', 'noites', 'texto'],
  HOSPEDAGENS.map((h, i) => ({
    expedicao: COSTA_DOCE.nome, ordem: i + 1, nome: h.nome, papel: h.papel,
    onde: h.onde, noites: h.noites, texto: h.texto,
  })));

/* ── 4 · Guia ──────────────────────────────────────────────────────── */
// Só as categorias operacionais, vazias, prontas para receber o conteúdo.
// As perguntas frequentes SAÍRAM daqui — ganharam coleção própria (ver 6-FAQ).
escrever('4-Guia', ['expedicao', 'categoria', 'titulo', 'conteudo'],
  GUIA.filter(([c]) => c !== 'Perguntas frequentes').map(([categoria]) => ({
    expedicao: COSTA_DOCE.nome, categoria, titulo: '', conteudo: '',
  })));

/* ── 5 · Destaques ─────────────────────────────────────────────────── */
escrever('5-Destaques', ['ativo', 'ordem', 'etiqueta', 'titulo', 'texto', 'rotuloBotao', 'link'],
  DESTAQUES.map((d, i) => ({
    ativo: 'TRUE', ordem: i + 1, etiqueta: d.etiqueta, titulo: d.titulo,
    texto: d.texto, rotuloBotao: d.cta, link: '',
  })));

/* ── 6 · FAQ ───────────────────────────────────────────────────────── */
// Coleção própria, e não uma categoria do Guia. O que muda de verdade: a pergunta geral
// é escrita UMA VEZ e vale para todas as expedições. O campo `expedicao` fica vazio nas
// gerais — só as de escopo "expedição" apontam para um destino.
escrever('6-FAQ', ['ativo', 'ordem', 'escopo', 'expedicao', 'pergunta', 'resposta'],
  PERGUNTAS.map(([pergunta, resposta, escopo], i) => ({
    ativo: 'TRUE',
    ordem: i + 1,
    escopo,
    expedicao: escopo === 'expedicao' ? COSTA_DOCE.nome : '',
    pergunta,
    resposta: resposta || '',
  })));

fs.writeFileSync(path.join(DIR, 'LEIA-ME.md'), `# CSVs para importar no CMS da Wix

Gerados por \`node design/csv.mjs\` a partir de \`design/lib/dados.mjs\` — a mesma fonte
que alimenta o layout. Não editar na mão: corrige nos dados e roda de novo.

## Ordem de importação

Importe **1-Expedicoes primeiro**. As outras têm um campo \`expedicao\` que é
**referência** para ela — se a expedição não existir ainda, a referência não amarra.

1. \`1-Expedicoes.csv\`
2. \`2-Roteiro.csv\`
3. \`3-Hospedagens.csv\`
4. \`4-Guia.csv\`
5. \`5-Destaques.csv\`
6. \`6-FAQ.csv\`

## O FAQ tem coleção própria — e por quê

Ele **não** é uma categoria do \`Guia\`. O \`Guia\` é sempre por expedição; o FAQ não.
A maior parte das dúvidas é **geral** ("preciso ter UTV próprio?", "como funciona o
resgate?") e a resposta é a mesma em toda expedição. Se morasse no \`Guia\`, seriam as
mesmas 8 perguntas redigitadas em cada expedição nova — o tipo de trabalho repetido que
faz o conteúdo envelhecer.

O campo \`escopo\` resolve:

| escopo | \`expedicao\` | Onde aparece |
|---|---|---|
| \`geral\` | **vazio** | Grupo Avulso **e** toda página de expedição |
| \`expedição\` | preenchido | só na página daquela expedição |

Hoje são **6 gerais e 2 por expedição** (nível de dificuldade e combustível, que mudam
de destino para destino).

⚠️ **Na montagem:** um dataset de página dinâmica não filtra "referência = esta OU
referência vazia" numa tacada. O jeito nativo é **dois repetidores** na mesma seção —
primeiro "sobre esta expedição", depois "dúvidas gerais". Sem código, e a leitura até
fica melhor. A alternativa com um repetidor só exigiria Velo.

Efeito colateral bom: uma tabela limpa de pergunta/resposta é muito melhor para o
**agente do WhatsApp** consultar do que pergunta enterrada numa categoria do Guia.

## O que os CSVs NÃO trazem

**Imagens.** Nenhum importador de CSV carrega arquivo. Depois de importar, suba as fotos
e ligue nos campos de galeria: \`galeria\` em Expedicoes e \`fotos\` em Hospedagens.

**Vídeo.** Mesma coisa — \`videoAbertura\` fica vazio.

## O que está propositalmente em branco

| Campo | Por quê |
|---|---|
| \`valorPorPessoa\`, \`valorPorCasal\` | o dossiê da Costa Doce não traz preço — **não inventar** |
| \`sinal\`, \`saldo\`, \`politicaCriancas\`, \`cancelamento\` | idem |
| \`linkCheckout\` | sai do evento no Wix Events, criado depois |
| \`publicado\` | vem **FALSE** em tudo. Só vira TRUE quando os valores chegarem |
| As 4 expedições além da Costa Doce | são rascunho: só existe o cabeçalho da agenda hoje |

## Sobre \`formasPagamento\` e as condições

Continuam no banco porque o fluxo de reserva precisa deles — mas **não aparecem mais na
página**. Foi o ajuste final: as informações comerciais saem do módulo de Reserva e
entram durante o fluxo.
`, 'utf8');

console.log('\n→ cms/');
