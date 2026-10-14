// Traz o comercial REAL do Wix Events para o CMS: preço, datas e link do checkout.
//
// Por que existe: os valores estavam como "a confirmar" no dossiê, mas já existiam na
// plataforma — cadastrados como INGRESSOS de um evento. Nada aqui é digitado à mão; tudo
// é lido de `/events/v3` e só reformatado.
//
// ⚠️ NÃO cobre a Costa Doce: não existe evento nem produto dela em lugar nenhum da conta.
//    Enquanto não houver, os campos dela seguem vazios — de propósito.
//
// Rodar:  node design/wix-precos.mjs --seco   (mostra o que faria)
//         node design/wix-precos.mjs          (grava)
import { wix, SITE } from './wix.mjs';

const SECO = process.argv.includes('--seco');

/** De qual expedição do CMS é cada evento. Casado à mão, porque os títulos divergem. */
const DE_QUAL_EXPEDICAO = [
  [/urubici/i, 'urubici'],
  [/canastra/i, 'serra-da-canastra'],
  [/visconde|mau[áa]/i, 'visconde-de-maua'],
  [/maca[ée]/i, 'macae'],
];

const brl = (v) => 'R$ ' + Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
const soData = (iso) => new Date(iso).toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' }); // AAAA-MM-DD

const ev = await wix('/events/v3/events/query', {
  corpo: { query: { paging: { limit: 100 } }, fieldsets: ['DETAILS', 'REGISTRATION', 'URLS'] }, escopo: SITE,
});

let gravados = 0;
const semEvento = [];

for (const e of ev.events || []) {
  const par = DE_QUAL_EXPEDICAO.find(([re]) => re.test(e.title));
  if (!par) { console.log(`? evento sem expedição correspondente: ${e.title}`); continue; }
  const idExp = par[1];

  const url = e.eventPageUrl ? `${e.eventPageUrl.base}${e.eventPageUrl.path}` : '';
  const vendendo = e.registration?.type === 'TICKETING';

  /* preços — só existem quando o evento vende ingresso */
  let valores = [];
  if (vendendo) {
    const t = await wix('/events/v3/ticket-definitions/query', {
      corpo: { query: { filter: { eventId: e.id }, paging: { limit: 50 } } }, escopo: SITE,
    });
    for (const d of t.ticketDefinitions || []) {
      const fx = d.pricingMethod?.fixedPrice;
      if (fx) { valores.push({ nome: d.name.trim(), preco: Number(fx.value) }); continue; }
      for (const o of d.pricingMethod?.pricingOptions?.optionDetails || []) {
        valores.push({ nome: `${d.name.trim()} · ${o.name}`, preco: Number(o.price?.value || 0) });
      }
    }
  }

  const item = { _id: idExp };

  if (e.dateAndTimeSettings?.startDate) {
    item.dataInicio = soData(e.dateAndTimeSettings.startDate);
    if (e.dateAndTimeSettings.endDate) item.dataFim = soData(e.dateAndTimeSettings.endDate);
  }
  if (url) item.linkCheckout = url;

  if (valores.length) {
    // A venda é por ACOMODAÇÃO (2, 3 ou 4 pessoas), não por pessoa. Então "por casal" com
    // um número só mentiria sobre as acomodações mais caras: uso o piso, marcado como piso.
    // `valorPorPessoa` fica VAZIO porque esse preço não existe neste produto — dividir por
    // 2 seria inventar um valor que ninguém cobra.
    const paraDois = valores.filter((v) => /2\s*pessoas?/i.test(v.nome));
    const piso = Math.min(...(paraDois.length ? paraDois : valores).map((v) => v.preco));
    // `valorExibido` é o que a PÁGINA mostra: uma string só, já formatada. O desenho tem
    // um valor, não dois, porque a venda é por acomodação — e o nome do campo tem que
    // dizer isso, senão quem preenche o CMS procura "por casal" e se perde.
    item.valorExibido = `A partir de ${brl(piso)}`;
    item.valorPorCasal = `A partir de ${brl(piso)}`; // reserva, para quem já ligou nele
    item.rotuloBotao = 'Reservar vaga';
    item.situacao = 'Vagas abertas';
  } else {
    item.rotuloBotao = 'Entrar na lista de espera';
    // `situacao` já está "Lista de espera" no CMS — não sobrescrevo
  }

  console.log(`\n■ ${idExp}  ←  ${e.title.slice(0, 46)}`);
  for (const [k, v] of Object.entries(item)) if (k !== '_id') console.log(`    ${k.padEnd(15)} ${v}`);
  if (valores.length) {
    console.log(`    ${'(ingressos)'.padEnd(15)} ${valores.length} acomodações, ${brl(Math.min(...valores.map((v) => v.preco)))} a ${brl(Math.max(...valores.map((v) => v.preco)))}`);
  }

  if (!SECO) {
    // `save` substitui o item inteiro, então leio o atual e mesclo — senão apago o resto
    const atual = (await wix('/wix-data/v2/items/query', {
      corpo: { dataCollectionId: 'Expedicoes', query: { filter: { _id: idExp } } }, escopo: SITE,
    })).dataItems[0]?.data;
    if (!atual) { console.log('    ✘ expedição não existe no CMS'); continue; }
    const novo = { ...atual, ...item };
    await wix('/wix-data/v2/items/save', {
      corpo: { dataCollectionId: 'Expedicoes', dataItem: { id: idExp, data: novo } }, escopo: SITE,
    });
    gravados++;
  }
}

/* quem ficou sem nada */
const todas = (await wix('/wix-data/v2/items/query', {
  corpo: { dataCollectionId: 'Expedicoes', query: { cursorPaging: { limit: 20 } } }, escopo: SITE,
})).dataItems.map((x) => x.data);
for (const d of todas) {
  const temEvento = (ev.events || []).some((e) => DE_QUAL_EXPEDICAO.find(([re, id]) => id === d._id && re.test(e.title)));
  if (!temEvento) semEvento.push(d.titulo);
}

console.log(`\n${SECO ? '[SECO] ' : ''}${gravados} expedições atualizadas`);
if (semEvento.length) {
  console.log(`\n⛔ sem evento nem preço na conta Wix: ${semEvento.join(', ')}`);
  console.log('   Os campos comerciais dessas seguem vazios. Não inventar.');
}
