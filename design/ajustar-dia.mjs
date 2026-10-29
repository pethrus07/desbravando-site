// Troca o texto (e, se vier, o título) de UM dia do roteiro no CMS.
//
//   node design/ajustar-dia.mjs lencois-maranhenses 3 --texto arquivo.txt
//   node design/ajustar-dia.mjs lencois-maranhenses 3 --texto arquivo.txt --titulo "Dia 03 - ..."
//   ... --seco     mostra o antes e o depois e não grava
//
// POR QUE EXISTE
// O cliente manda o texto de um dia reescrito por mensagem, e isso acontece toda semana. Até
// 29/10/2026 o caminho era abrir o Editor da Wix e colar à mão, o que tem dois problemas: a
// página do site e o PDF do dossiê saem de lugares diferentes se alguém esquecer de rodar o
// gerador, e colar à mão num campo rico leva junto a formatação do WhatsApp.
//
// O texto entra por ARQUIVO, nunca por argumento de linha de comando: texto de cliente tem
// acento, aspas e quebra de parágrafo, e o shell come os três de maneiras diferentes no
// Windows. Arquivo em UTF-8 é o único jeito que não adultera o que a pessoa escreveu.
//
// Parágrafo: cada linha em branco do arquivo vira um <p>, porque o campo é rico e um texto de
// dois parágrafos colado como um só vira um bloco cego na página.
import fs from 'node:fs';
import { wix, SITE } from './wix.mjs';

const [, , expedicao, diaBruto] = process.argv;
const arg = (nome) => {
  const i = process.argv.indexOf('--' + nome);
  return i === -1 ? null : process.argv[i + 1];
};
const SECO = process.argv.includes('--seco');
const dia = Number(diaBruto);
const arquivo = arg('texto');
const tituloNovo = arg('titulo');

if (!expedicao || !Number.isInteger(dia) || !arquivo) {
  console.error('uso: node design/ajustar-dia.mjs <expedicao> <dia> --texto <arquivo.txt> [--titulo "..."] [--seco]');
  process.exit(1);
}
if (!fs.existsSync(arquivo)) {
  console.error(`não achei o arquivo "${arquivo}"`);
  process.exit(1);
}

/** Texto cru em parágrafos de campo rico. */
const rico = (t) =>
  String(t)
    .replace(/\r\n/g, '\n')
    .split(/\n\s*\n/)
    .map((p) => p.trim().replace(/\n/g, ' '))
    .filter(Boolean)
    .map((p) => `<p>${p}</p>`)
    .join('');

const cru = (html) =>
  String(html || '').replace(/<\/p>\s*<p>/gi, '\n\n').replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').trim();

const texto = fs.readFileSync(arquivo, 'utf8').trim();
if (!texto) { console.error('o arquivo está vazio'); process.exit(1); }

const idDia = `${expedicao}-dia-${dia}`;
const { dataItems } = await wix('/wix-data/v2/items/query', {
  corpo: { dataCollectionId: 'Roteiro', query: { paging: { limit: 200 } } }, escopo: SITE,
});
const antigo = dataItems.map((i) => i.data).find((x) => x._id === idDia);
if (!antigo) {
  console.error(`não achei o dia ${dia} da expedição "${expedicao}" (procurei o id ${idDia})`);
  console.error('dias que existem: ' + dataItems.map((i) => i.data._id).filter((x) => x.startsWith(expedicao)).join(', '));
  process.exit(1);
}

console.log(`${idDia}  ${antigo.data || ''}  ${antigo.local || ''}`);
console.log('\nTÍTULO');
console.log('  antes: ' + (antigo.titulo || '(vazio)'));
console.log('  agora: ' + (tituloNovo || antigo.titulo || '(vazio)') + (tituloNovo ? '' : '  (inalterado)'));
console.log('\nTEXTO');
console.log('  antes: ' + cru(antigo.texto).replace(/\n/g, '\n         '));
console.log('  agora: ' + texto.replace(/\n\s*\n/g, '\n\n').replace(/\n/g, '\n         '));

if (SECO) { console.log('\nSECO: nada foi gravado.'); process.exit(0); }

/* MESCLA. O save da Wix substitui o item inteiro: mandar só os campos que mudaram apaga
   data, local e km. E o _id vai DUAS vezes, em dataItem.id e dentro de data, senão a API
   responde WDE0080 sem dizer qual campo faltou. */
const final = { ...antigo, texto: rico(texto), _id: idDia };
if (tituloNovo) final.titulo = tituloNovo;

await wix('/wix-data/v2/items/save', {
  corpo: { dataCollectionId: 'Roteiro', dataItem: { id: idDia, data: final } },
  escopo: SITE,
});
console.log('\ngravado no CMS. Agora rode o gerador do dossiê para o PDF não divergir do site:');
console.log(`  node design/dossie-dados.mjs ${expedicao}`);
