// Gera o TUTORIAL DO CLIENTE: como preencher o CMS do site.
//
// Público: a equipe do Desbravando, não o Pedro. Então nada de Velo, API, dataset,
// repetidor ou nome de campo em inglês — só o rótulo que aparece na tela e o que a pessoa
// vê no site depois de salvar.
//
// A ESTRUTURA é lida do CMS na hora de gerar (rótulos, tipos, o que já está preenchido) e
// o SIGNIFICADO está escrito aqui. Assim o guia não passa a mentir quando um campo mudar
// de nome: ele acusa em vez de imprimir errado.
//
// Rodar:  node design/guia-cliente.mjs
//         → guia-do-cms.md  +  guia-do-cms.html
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { wix, SITE, colecoes } from './wix.mjs';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

/* ───────────────────── o significado, escrito à mão ───────────────────── */

const LISTAS = {
  Expedicoes: {
    titulo: 'Expedições',
    oQueE: 'O coração de tudo. Uma linha por expedição.',
    porque: 'Cadastrar uma linha aqui **cria a página daquela expedição sozinha**. Você nunca ' +
      'monta página nova — preenche a linha e a página aparece pronta, no mesmo desenho.',
    ordem: 1,
  },
  Roteiro: {
    titulo: 'Roteiro',
    oQueE: 'O dia a dia de cada expedição. Uma linha por dia.',
    porque: 'É o que vira a lista "DIA A DIA DA EXPEDIÇÃO" na página.',
    ordem: 2,
  },
  Hospedagens: {
    titulo: 'Hospedagens',
    oQueE: 'Os hotéis e pousadas de cada expedição. Uma linha por hospedagem.',
    porque: 'Vira o bloco "ONDE O GRUPO FICA", cada hospedagem com suas fotos.',
    ordem: 3,
  },
  Itens: {
    titulo: 'Itens do pacote',
    oQueE: 'O que está e o que não está incluso. Uma linha por item.',
    porque: 'Alimenta os dois blocos da página: "O QUE ESTÁ INCLUSO" e "O QUE NÃO ESTÁ ' +
      'INCLUSO". O campo **Escopo** decide em qual dos dois o item aparece.',
    ordem: 4,
  },
  Guia: {
    titulo: 'Guia da Expedição',
    oQueE: 'As orientações práticas, por assunto. Uma linha por assunto.',
    porque: 'Vira a sanfona do "GUIA DA EXPEDIÇÃO", onde a pessoa clica no assunto e o ' +
      'conteúdo abre. Assunto sem conteúdo aparece como linha simples e não abre — de ' +
      'propósito, para não prometer o que não tem.',
    ordem: 5,
  },
  FAQ: {
    titulo: 'Perguntas Frequentes',
    oQueE: 'As dúvidas e respostas. Uma linha por pergunta.',
    porque: 'Aparece em dois lugares: na página "Próximas Expedições" e dentro de cada ' +
      'expedição. O campo **Escopo** decide onde.',
    ordem: 6,
  },
  Destaques: {
    titulo: 'Destaques da Home',
    oQueE: 'Os avisos que passam no carrossel da página inicial.',
    porque: 'É o espaço para anunciar o que for do momento — vaga aberta, novidade, ' +
      'chamada de campanha.',
    ordem: 7,
  },
};

/**
 * Por campo: o que é, onde aparece no site, um exemplo e o que acontece se ficar vazio.
 * A chave é `Colecao.campo`.
 */
const CAMPOS = {
  /* ── Expedições ── */
  'Expedicoes.titulo': ['O nome do destino, curto.', 'No título grande da página, na agenda e no endereço do site.', 'Costa Doce', 'obrigatório — sem ele a página não existe'],
  'Expedicoes.subtitulo': ['A segunda linha do título grande.', 'Logo abaixo do nome, no mesmo tamanho.', 'Litoral do Rio Grande do Sul', 'o título fica com uma linha só'],
  'Expedicoes.uf': ['A sigla do estado.', 'Ao lado do nome, no caminho no topo da página.', 'RS', 'não aparece nada no lugar'],
  'Expedicoes.nomeEdicao': ['O nome completo da edição.', 'Na linha fina acima do título.', 'Expedição Costa Doce', 'a linha fina fica sem o nome'],
  'Expedicoes.chamada': ['Uma frase que resume a expedição.', 'Abaixo do título, e também no cartão da agenda.', 'Cinco dias cruzando o trecho mais bruto do litoral gaúcho.', 'o cartão da agenda fica só com o nome'],
  'Expedicoes.situacao': ['Em que ponto está a venda.', 'Na etiqueta ao lado do título e no cartão da agenda.', 'Pré-reserva aberta · Últimas vagas · Lista de espera', 'a etiqueta desaparece'],
  'Expedicoes.dataInicio': ['O primeiro dia.', 'Na linha fina do topo e na faixa de dados.', '02/12/2026', 'a data não aparece'],
  'Expedicoes.dataFim': ['O último dia.', 'Junto com a data de início.', '06/12/2026', 'idem'],
  'Expedicoes.duracao': ['Quantos dias, e quantos deles de trilha.', 'Na faixa de dados e no cartão da agenda.', '5 dias · 3 de trilha', 'a célula fica vazia'],
  'Expedicoes.percurso': ['Quantos quilômetros, em quantos dias.', 'Na faixa de dados e no bloco "sobre o destino".', '~540 km em 3 dias de trilha', 'a célula fica vazia'],
  'Expedicoes.formato': ['Para quem é a expedição.', 'Na faixa de dados e no cartão da agenda.', 'Casais e Família · Só Homens · Família', 'a célula fica vazia'],
  'Expedicoes.localizacao': ['Onde fica, em traço largo.', 'A primeira célula da faixa de dados.', 'Litoral do RS · Brasil', 'a célula fica vazia'],
  'Expedicoes.regiao': ['As cidades e pontos do percurso.', 'A última célula da faixa de dados.', 'Mostardas · Lagoa do Peixe · Tramandaí', 'a célula fica vazia'],
  'Expedicoes.base': ['Onde o grupo se hospeda e sai todo dia.', 'Na faixa de dados e no bloco "sobre o destino".', 'Mostardas & Tramandaí', 'a célula fica vazia'],
  'Expedicoes.veiculos': ['Que carro a pessoa leva, e como ele chega.', 'Na faixa de dados e no bloco "sobre o destino".', 'O seu UTV · transporte incluso', 'a célula fica vazia'],
  'Expedicoes.destaques': ['Os três atrativos que resumem o destino.', 'Na faixa de dados e ao lado do título da galeria.', 'Dunas · lagoas · faróis', 'a célula fica vazia'],
  'Expedicoes.aeroporto': ['Qual aeroporto usar, e se tem transfer.', 'Na faixa de dados.', 'Porto Alegre · transfer incluso', 'a célula fica vazia'],
  'Expedicoes.pontoEncontro': ['Onde e quando o grupo se encontra.', 'Na faixa de dados.', 'Mostardas, 02/12 a partir das 15:00', 'a célula fica vazia'],
  'Expedicoes.fotoCapa': ['UMA foto, a que representa a expedição.', 'No cartão da agenda e no topo da página.', 'uma foto na horizontal, larga', '⚠️ o cartão da agenda fica sem foto'],
  'Expedicoes.galeria': ['VÁRIAS fotos, para o carrossel.', 'No bloco "A EXPEDIÇÃO POR DENTRO".', '4 a 8 fotos boas', 'o bloco da galeria desaparece da página'],
  'Expedicoes.videoAbertura': ['Um vídeo curto, para o topo da página.', 'A faixa do topo, no lugar da foto.', '15 a 30 segundos, sem som necessário', 'aparece a foto de capa no lugar — não fica em branco'],
  'Expedicoes.sobreDestino': ['O texto que conta o destino. Dois ou três parágrafos.', 'No bloco "sobre o destino".', 'Cinco dias cruzando dunas que não acabam, lagoas escondidas na areia…', 'o bloco inteiro desaparece da página'],
  'Expedicoes.tituloSobre': ['A manchete desse bloco. Escrita para aquele destino.', 'Acima do texto do destino.', 'O TRECHO MAIS BRUTO DO LITORAL GAÚCHO.', 'o bloco fica sem manchete'],
  'Expedicoes.hospedagemNota': ['Uma frase sobre o padrão da hospedagem.', 'Abaixo do título "ONDE O GRUPO FICA".', 'Hospedagem escolhida a dedo entre as opções da região.', 'só a frase desaparece; os hotéis continuam'],
  'Expedicoes.incluso': ['A lista do que está incluso, se preferir escrever tudo num campo só.', 'No bloco "O QUE ESTÁ INCLUSO".', 'uma linha por item', 'ver a nota sobre os dois caminhos, no fim'],
  'Expedicoes.naoIncluso': ['Idem, para o que não está incluso.', 'No bloco "O QUE NÃO ESTÁ INCLUSO".', 'uma linha por item', 'ver a nota sobre os dois caminhos, no fim'],
  'Expedicoes.valorExibido': ['O valor como ele aparece na página. Texto livre, já com o "R$".', 'O número grande da faixa preta da Reserva.', 'A partir de R$ 19.500', '⚠️ a faixa preta da Reserva **desaparece inteira**'],
  'Expedicoes.valorPorPessoa': ['Não usado na página. A venda é por acomodação, não por pessoa.', 'Em nenhum lugar.', '', 'nada muda'],
  'Expedicoes.valorPorCasal': ['Cópia de segurança do valor. Preencha o *Valor exibido* em vez deste.', 'Só se o Valor exibido estiver vazio.', '', 'nada muda'],
  'Expedicoes.formasPagamento': ['Como se pode pagar.', 'Uma linha na faixa preta da Reserva.', 'PIX · Cartão em até 10× · Boleto', 'a linha não aparece'],
  'Expedicoes.sinal': ['Quanto se paga na reserva.', 'Uma linha na faixa preta da Reserva.', '30% na reserva', 'a linha não aparece — e se as 4 condições estiverem vazias, a caixa toda sai'],
  'Expedicoes.saldo': ['Quando se paga o resto.', 'Uma linha na faixa preta da Reserva.', 'até 30 dias antes da saída', 'a linha não aparece'],
  'Expedicoes.politicaCriancas': ['A regra para crianças.', 'Idem — e vale repetir como pergunta no FAQ.', '', 'nada muda na página'],
  'Expedicoes.cancelamento': ['A regra de cancelamento.', 'Uma linha na faixa preta da Reserva.', '', 'a linha não aparece'],
  'Expedicoes.rotuloBotao': ['O que o botão principal diz.', 'No botão grande, ao lado do título.', 'Fazer pré-reserva · Reservar vaga · Entrar na lista de espera', 'o botão fica sem texto'],
  'Expedicoes.linkCheckout': ['Para onde o botão leva.', 'É o clique do botão principal.', 'o endereço da página de pagamento', 'o botão não leva a lugar nenhum'],
  'Expedicoes.publicado': ['A chave que libera a expedição para o público.', 'Controla se a expedição pode ir ao ar.', 'Ligue só quando o valor e as respostas estiverem prontos', '🔒 fica invisível para quem visita — é o estado seguro'],

  /* ── Roteiro ── */
  'Roteiro.expedicao': ['A qual expedição este dia pertence.', 'Amarra o dia à página certa.', 'escolha na lista', '⚠️ o dia não aparece em nenhuma página'],
  'Roteiro.dia': ['O número do dia: 1, 2, 3…', 'O número grande à esquerda, e define a ordem.', '1', 'o dia sai fora de ordem'],
  'Roteiro.data': ['A data curta.', 'Na linha fina ao lado do dia.', '02 dez', 'a linha fica sem data'],
  'Roteiro.local': ['Onde o dia acontece.', 'Na linha fina, ao lado da data.', 'Mostardas · RS', 'a linha fica sem local'],
  'Roteiro.titulo': ['O nome do dia, curto.', 'O título da linha do roteiro.', 'Chegada', 'a linha fica sem título'],
  'Roteiro.texto': ['O que acontece nesse dia.', 'O parágrafo da linha.', 'Recepção do grupo, conferência dos carros e jantar de boas-vindas.', 'a linha fica só com o título'],
  'Roteiro.km': ['Quantos quilômetros nesse dia.', 'À direita da linha.', '180 km', 'fica vazio — é o certo nos dias sem trilha'],

  /* ── Hospedagens ── */
  'Hospedagens.expedicao': ['A qual expedição esta hospedagem pertence.', 'Amarra à página certa.', 'escolha na lista', '⚠️ não aparece em nenhuma página'],
  'Hospedagens.ordem': ['A posição na lista: 1, 2, 3…', 'Define qual hotel vem primeiro.', '1', 'a ordem fica imprevisível'],
  'Hospedagens.nome': ['O nome do hotel ou pousada.', 'O título do bloco.', 'Schenkel Hotel', 'o bloco fica sem nome'],
  'Hospedagens.papel': ['O que essa hospedagem é na viagem.', 'Na linha fina acima do nome.', 'Base da expedição', 'a linha fina desaparece'],
  'Hospedagens.onde': ['Em que cidade fica.', 'Abaixo do nome.', 'Mostardas · RS', 'fica vazio'],
  'Hospedagens.noites': ['Quantas noites ali.', 'Ao lado da cidade.', '3 noites', 'fica vazio'],
  'Hospedagens.texto': ['Uma descrição curta.', 'O parágrafo do bloco.', 'Hotel simples e bem cuidado, a dez minutos do início da trilha.', 'o bloco fica só com o nome'],
  'Hospedagens.fotos': ['As fotos daquela hospedagem.', 'A tirinha de fotos ao lado.', '2 a 4 fotos', 'a tirinha de fotos desaparece'],

  /* ── Itens ── */
  'Itens.expedicao': ['A qual expedição este item pertence.', 'Amarra à página certa.', 'escolha na lista', '⚠️ não aparece em nenhuma página'],
  'Itens.escopo': ['Em qual dos dois blocos o item entra.', 'Decide entre "está incluso" e "não está incluso".', 'incluso  ou  nao-incluso', '⚠️ o item não aparece em bloco nenhum'],
  'Itens.ordem': ['A posição na lista: 1, 2, 3…', 'Define a ordem dos itens.', '1', 'a ordem fica imprevisível'],
  'Itens.numero': ['O número que aparece antes do texto.', 'À esquerda do item, no bloco "está incluso".', '01', 'o item aparece sem número'],
  'Itens.texto': ['O item em si.', 'O texto do item.', '3 dias de trilha guiada por equipe experiente', 'a linha fica em branco'],

  /* ── Guia ── */
  'Guia.expedicao': ['A qual expedição este assunto pertence.', 'Amarra à página certa.', 'escolha na lista', '⚠️ não aparece em nenhuma página'],
  'Guia.ordem': ['A posição na lista: 1, 2, 3…', 'Define a ordem dos assuntos.', '1', 'a ordem fica imprevisível'],
  'Guia.categoria': ['O nome do assunto.', 'A linha em que a pessoa clica.', 'Logística · Clima · O que levar', 'a linha fica sem nome'],
  'Guia.titulo': ['Um subtítulo do assunto.', 'Dentro do assunto, quando abre.', 'Bases, encontro e ritmo', 'o assunto abre sem subtítulo'],
  'Guia.conteudo': ['As orientações daquele assunto.', 'O que abre ao clicar.', 'uma linha por orientação', '⚠️ a linha aparece mas **não abre** — é o certo enquanto não houver conteúdo'],

  /* ── FAQ ── */
  'FAQ.ativo': ['Se a pergunta deve aparecer.', 'Desligue para esconder sem apagar.', 'ligado', 'a pergunta não aparece'],
  'FAQ.ordem': ['A posição na lista: 1, 2, 3…', 'Define a ordem das perguntas.', '1', 'a ordem fica imprevisível'],
  'FAQ.escopo': ['Se a pergunta é geral ou daquele destino.', 'Decide onde ela aparece — ver a nota.', 'geral  ou  expedicao', '⚠️ a pergunta não aparece em lugar nenhum'],
  'FAQ.expedicao': ['A qual expedição a pergunta se refere.', 'Só preencha se o Escopo for `expedicao`.', 'escolha na lista, ou deixe vazio', 'nas gerais, vazio é o certo'],
  'FAQ.pergunta': ['A pergunta, como o cliente faria.', 'A linha em que a pessoa clica.', 'Preciso ter UTV próprio para participar?', 'a linha fica em branco'],
  'FAQ.resposta': ['A resposta.', 'O que abre ao clicar na pergunta.', 'Não necessariamente. Trabalhamos com parceiros de locação na região…', '⚠️ a pergunta aparece mas **não abre**'],

  /* ── Destaques ── */
  'Destaques.ativo': ['Se o destaque deve aparecer.', 'Desligue para esconder sem apagar.', 'ligado', 'não aparece'],
  'Destaques.ordem': ['A posição no carrossel.', 'Define a ordem.', '1', 'a ordem fica imprevisível'],
  'Destaques.etiqueta': ['A palavra pequena acima do título.', 'No topo do cartão.', 'Novidade · Vagas abertas', 'o cartão fica sem etiqueta'],
  'Destaques.titulo': ['O título do destaque.', 'O texto grande do cartão.', '', 'o cartão fica sem título'],
  'Destaques.texto': ['Uma ou duas linhas de apoio.', 'Abaixo do título.', '', 'o cartão fica só com o título'],
  'Destaques.rotuloBotao': ['O que o botão diz.', 'No botão do cartão.', 'Saber mais', 'o botão fica sem texto'],
  'Destaques.link': ['Para onde o botão leva.', 'É o clique do botão.', '', 'o botão não leva a lugar nenhum'],
  'Destaques.fotoDesktop': ['A imagem do destaque, no computador.', 'O fundo do cartão.', 'imagem larga', 'o cartão fica sem imagem'],
  'Destaques.fotoMobile': ['A mesma imagem, recortada em pé para o celular.', 'O fundo do cartão no celular.', 'imagem em pé', 'usa a de computador, que pode cortar torto'],
};

/* ───────────────────────── leitura do CMS ───────────────────────── */

const defs = await colecoes();
const vazio = (v) => v == null || v === '' || (Array.isArray(v) && !v.length) ||
  (typeof v === 'string' && !v.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim());

const estado = {};
for (const id of Object.keys(LISTAS)) {
  const r = await wix('/wix-data/v2/items/query', {
    corpo: { dataCollectionId: id, query: { cursorPaging: { limit: 100 } } }, escopo: SITE,
  });
  const itens = r.dataItems.map((x) => x.data);
  estado[id] = { total: itens.length, por: {} };
  const def = defs.find((c) => c.id === id);
  for (const f of def?.fields || []) estado[id].por[f.key] = itens.filter((i) => !vazio(i[f.key])).length;
}

let avisos = 0;
const TIPO = {
  TEXT: 'texto', NUMBER: 'número', BOOLEAN: 'sim/não', DATE: 'data',
  RICH_TEXT: 'texto com formatação', URL: 'endereço', IMAGE: 'uma imagem',
  MEDIA_GALLERY: 'várias imagens', VIDEO: 'vídeo', REFERENCE: 'escolha na lista',
};

function tabela(id) {
  const def = defs.find((c) => c.id === id);
  const campos = (def?.fields || []).filter((f) => !/^_/.test(f.key) && f.type !== 'PAGE_LINK');
  const linhas = ['| Campo | Tipo | O que é | Onde aparece no site | Se ficar vazio |', '|---|---|---|---|---|'];
  for (const f of campos) {
    const info = CAMPOS[`${id}.${f.key}`];
    if (!info) {
      console.log(`  ! sem explicação: ${id}.${f.key} ("${f.displayName}")`);
      avisos++;
      linhas.push(`| **${f.displayName}** | ${TIPO[f.type] || f.type} | *(a descrever)* | | |`);
      continue;
    }
    const [oQueE, onde, exemplo, seVazio] = info;
    const ex = exemplo ? `<br><span class="ex">ex.: ${exemplo}</span>` : '';
    linhas.push(`| **${f.displayName}** | ${TIPO[f.type] || f.type} | ${oQueE}${ex} | ${onde} | ${seVazio} |`);
  }
  return linhas.join('\n');
}

/* ───────────────────────── o documento ───────────────────────── */

const listasOrdenadas = Object.entries(LISTAS).sort((a, b) => a[1].ordem - b[1].ordem);

const preenchimento = listasOrdenadas.map(([id, l]) =>
  `| ${l.ordem} | **${l.titulo}** | ${l.oQueE} | ${estado[id].total} ${estado[id].total === 1 ? 'linha' : 'linhas'} |`).join('\n');

const guiaVazias = (await wix('/wix-data/v2/items/query', {
  corpo: { dataCollectionId: 'Guia', query: { cursorPaging: { limit: 50 } } }, escopo: SITE,
})).dataItems.map((x) => x.data).filter((d) => vazio(d.conteudo)).map((d) => d.categoria);

const md = `# Guia do CMS — como manter o site

**Desbravando UTV** · ${new Date(2026, 7, 12).toLocaleDateString('pt-BR')}

---

## Para que serve isto

O site tem duas partes: o **desenho**, que é fixo, e o **conteúdo**, que é seu.

O conteúdo mora no CMS. Isso significa uma coisa concreta: **quando vocês cadastram uma
expedição nova, a página dela nasce sozinha** — com o mesmo desenho, a mesma tipografia, o
mesmo cuidado da Costa Doce. Vocês não montam página, não mexem em layout, não pedem ajuda
para publicar um destino novo.

O preço disso é preencher com atenção. Este guia é sobre isso.

---

## Como entrar

1. Entre em **wix.com** com a conta do site e abra o painel do **Desbravando UTV**
2. No menu da esquerda, clique em **CMS** (em algumas contas aparece como *Conteúdo*)
3. Aparecem as listas abaixo. Clique numa para ver e editar as linhas
4. Para criar, o botão **+ Adicionar item**. Para editar, clique na célula e digite
5. **Salvar** fica no alto à direita. Sem salvar, nada vai para o site

> No celular dá para consultar, mas não recomendo preencher — as tabelas são largas.

---

## As ${listasOrdenadas.length} listas, e a ordem que importa

| Ordem | Lista | O que é | Hoje tem |
|---|---|---|---|
${preenchimento}

### 🔴 Sempre comece por Expedições

As outras seis listas têm um campo que **aponta para uma expedição**. Se a expedição não
existir ainda, não há para onde apontar — e a linha que vocês criarem não vai aparecer em
lugar nenhum, sem dar erro nenhum.

Cadastre a expedição primeiro. Depois o resto.

---

## Cadastrar uma expedição nova, do começo ao fim

A receita completa. Levem no primeiro destino; do segundo em diante já sai de cabeça.

**1 · Crie a linha em Expedições**
Preencha ao menos: **Título**, **UF**, **Chamada**, **Situação**, **Formato**, **Duração** e
**Foto de capa**. Só com isso o destino já aparece bonito na agenda.

**2 · Deixe *Publicado* DESLIGADO**
Enquanto estiver desligado, vocês podem preencher com calma sem ninguém ver pela metade.

**3 · Complete a página**
Os demais campos de Expedições: datas, base, percurso, região, veículos, destaques,
aeroporto, ponto de encontro, o texto do destino e a galeria de fotos.

**4 · Roteiro** — uma linha por dia. Aponte cada dia para a expedição e numere o **Dia**.

**5 · Hospedagens** — uma linha por hotel, com **Ordem** e as fotos.

**6 · Itens do pacote** — uma linha por item. **Escopo** \`incluso\` para o que acompanha,
\`nao-incluso\` para o que não acompanha.

**7 · Guia da Expedição** — uma linha por assunto, com a **Ordem** que faz sentido ler.

**8 · Perguntas específicas daquele destino** — em Perguntas Frequentes, com **Escopo**
\`expedicao\` e a expedição escolhida. As perguntas gerais já valem para todos os destinos,
não precisam ser reescritas.

**9 · Confira na prévia** e só então **ligue *Publicado***.

---

## Cinco regras que evitam quase todo problema

### 1 · *Publicado* é a chave de segurança
Enquanto está desligada, a expedição não aparece para o público. Ligue **por último**,
quando o valor estiver definido e as respostas escritas.

### 2 · *Escopo* é minúsculo e sem acento
Só dois valores existem, e é preciso digitar exatamente:

| Lista | Valores aceitos |
|---|---|
| Perguntas Frequentes | \`geral\` · \`expedicao\` |
| Itens do pacote | \`incluso\` · \`nao-incluso\` |

**\`expedicao\` sem cedilha e \`nao-incluso\` sem til, com o hífen.** Escrito de outro jeito,
a linha simplesmente não aparece — e não dá erro, que é o pior dos casos.

### 3 · *Foto de capa* e *Galeria* não são a mesma coisa

| Campo | Quantas | Para que |
|---|---|---|
| **Foto de capa** | uma | o cartão da agenda e o topo da página |
| **Galeria** | várias | o carrossel "A EXPEDIÇÃO POR DENTRO" |

Uma foto sozinha na Galeria não aparece no cartão da agenda. São dois lugares diferentes.

### 4 · Sempre aponte para a expedição
Em Roteiro, Hospedagens, Itens e Guia existe o campo **Expedição**. Sem ele preenchido, a
linha existe no banco e **não aparece no site**. É o esquecimento mais comum.

### 5 · *Ordem* é você quem decide
Sem número na Ordem, a lista sai na sequência em que foi cadastrada — que quase nunca é a
sequência em que se quer ler. Numere 1, 2, 3.

---

## Campo por campo

${listasOrdenadas.map(([id, l]) => `### ${l.titulo}

${l.porque}

${tabela(id)}
`).join('\n---\n\n')}

---

## Duas coisas que precisam da sua atenção agora

### As respostas do FAQ são provisórias

As 8 respostas que estão hoje no CMS **foram escritas para testar o funcionamento da
sanfona**, não para publicar. Quatro saíram do dossiê da Costa Doce e batem com a
realidade; **quatro são suposição** — idade mínima para crianças, política de
cancelamento, acompanhante que não dirige, e o prazo de entrega das fotos.

**Leiam as 8 e reescrevam o que não estiver certo antes de ligar *Publicado*.** Ninguém
melhor que vocês para responder essas.

### O Guia tem ${guiaVazias.length} assuntos esperando conteúdo

${guiaVazias.map((c) => `- **${c}**`).join('\n')}

Deixamos em branco de propósito. São orientações que alguém vai seguir dirigindo mais de
500 km de trilha — o tipo de informação que não se preenche por suposição. Enquanto
estiverem vazios, aparecem como linha simples que não abre, o que é honesto.

Os quatro que já estão prontos — Logística, Hospedagem, Gastronomia e Transporte — servem
de modelo de tom e tamanho.

---

## O valor e os ingressos: dois lugares, e é de propósito

| | Onde vive | O que é |
|---|---|---|
| **o número que a página mostra** | CMS → **Expedições** → *Valor exibido na página* | uma frase curta, ex. \`A partir de R$ 19.500\` |
| **os ingressos e as vendas** | **Eventos** → o evento → aba *Ingressos* | cada acomodação, com preço, limite e pedidos |

A página **não** lê os ingressos: ela lê o campo do CMS. Então quando mudar o preço de um
ingresso, **atualize também o campo** — ou peça para rodarem o comando de sincronismo.

### Preencher o valor da página

**CMS → Expedições →** a linha da expedição **→ Valor exibido na página**. Texto livre,
escreva com o \`R$\`:

\`\`\`
A partir de R$ 19.500
\`\`\`

- Começando com **"A partir de"**, a página põe essa parte no rótulo pequeno e deixa só o
  número em letra grande
- **Vazio**, a faixa preta inteira **desaparece** — é assim que uma expedição sem preço
  definido não anuncia "a confirmar"

Na mesma linha: **Rótulo do botão** (\`Reservar vaga\` · \`Entrar na lista de espera\`) e
**Link do checkout** (vazio = botão desabilitado, de propósito).

### Acompanhar as vendas

**Eventos →** clique no evento **→ Ingressos**. Cada **tipo de ingresso é uma acomodação**.
Na mesma tela ficam pedidos, participantes e faturamento — a página do site não sabe nada
disso, e não precisa.

> **A Costa Doce ainda não tem evento.** Existe no CMS com a página completa, mas sem
> ingresso — por isso o botão dela nasce desabilitado. Para abrir a venda: **Eventos →
> + Adicionar evento**, uma acomodação por tipo de quarto, e depois preencher o
> *Link do checkout* no CMS.

---

## Sobre os dois caminhos do "o que está incluso"

Existem duas formas de preencher esse bloco, e o site usa **uma** delas:

- **Itens do pacote** (a lista) — uma linha por item, com número e ordem
- **O que está incluso** (o campo de texto em Expedições) — tudo num campo só

Confirme com quem montou qual está em uso na página e mantenha só essa. Preencher as duas
não duplica na tela, mas gera divergência: um dia alguém corrige numa e esquece a outra.

---

## Se algo não aparecer no site

Antes de pedir ajuda, três conferências resolvem a maioria:

1. **Salvou?** O botão fica no alto à direita
2. **O campo *Expedição* está preenchido?** É a causa nº 1
3. **O *Escopo* está exatamente \`geral\`, \`expedicao\`, \`incluso\` ou \`nao-incluso\`?**
   Minúsculo, sem acento

Se passou pelas três e continua sem aparecer, aí sim vale chamar.
`;

fs.writeFileSync(path.join(RAIZ, 'guia-do-cms.md'), md, 'utf8');

/* ───────────────────────── HTML para enviar ───────────────────────── */

const inline = (s) => s
  .replace(/&(?![a-z]+;|#)/g, '&amp;')
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  .replace(/(?<![*\w])\*([^*]+)\*(?!\*)/g, '<em>$1</em>');

function paraHtml(texto) {
  const out = [];
  const linhas = texto.split('\n');
  for (let i = 0; i < linhas.length; i++) {
    const l = linhas[i];
    if (/^\|/.test(l) && /^\|[\s:|-]+\|$/.test(linhas[i + 1] || '')) {
      const cabeca = l.split('|').slice(1, -1).map((c) => c.trim());
      i++;
      const corpo = [];
      while (/^\|/.test(linhas[i + 1] || '')) corpo.push(linhas[++i].split('|').slice(1, -1).map((c) => c.trim()));
      // a tabela de campos tem 5 colunas com pesos muito diferentes; sem marcá-la, "Tipo"
      // fica largo com uma palavra e "O que é" quebra em quatro linhas
      const ehCampos = cabeca[0] === 'Campo' && cabeca.length === 5;
      out.push(`<div class="rolar"><table${ehCampos ? ' class="campos"' : ''}><thead><tr>` + cabeca.map((c) => `<th>${inline(c)}</th>`).join('') +
        '</tr></thead><tbody>' + corpo.map((r) => '<tr>' + r.map((c) => `<td>${inline(c)}</td>`).join('') + '</tr>').join('') +
        '</tbody></table></div>');
      continue;
    }
    const t = l.match(/^(#{1,3})\s+(.*)$/);
    if (t) { const n = t[1].length; out.push(`<h${n}>${inline(t[2])}</h${n}>`); continue; }
    if (l.trim() === '---') {
      // o `---` antes de um `##` é redundante: o próprio h2 já desenha o fio da seção, e os
      // dois juntos saem como fio fino, vão, fio grosso
      const proxima = linhas.slice(i + 1).find((x) => x.trim());
      if (!/^##\s/.test(proxima || '')) out.push('<hr>');
      continue;
    }
    if (/^>\s?/.test(l)) {
      const bloco = [];
      while (i < linhas.length && /^>\s?/.test(linhas[i])) bloco.push(linhas[i++].replace(/^>\s?/, ''));
      i--;
      out.push(`<blockquote>${paraHtml(bloco.join('\n'))}</blockquote>`);
      continue;
    }
    if (/^[-*]\s/.test(l)) {
      const itens = [];
      while (i < linhas.length && /^[-*]\s/.test(linhas[i])) itens.push(linhas[i++].replace(/^[-*]\s/, ''));
      i--;
      out.push('<ul>' + itens.map((x) => `<li>${inline(x)}</li>`).join('') + '</ul>');
      continue;
    }
    // lista numerada — sem isto, "1. …  2. …" desaba num parágrafo só, e um passo a passo
    // que perde a numeração deixa de ser passo a passo
    if (/^\d+\.\s/.test(l)) {
      const itens = [];
      while (i < linhas.length && /^\d+\.\s/.test(linhas[i])) itens.push(linhas[i++].replace(/^\d+\.\s/, ''));
      i--;
      out.push('<ol>' + itens.map((x) => `<li>${inline(x)}</li>`).join('') + '</ol>');
      continue;
    }
    if (!l.trim()) continue;
    const p = [l];
    while (i + 1 < linhas.length && linhas[i + 1].trim() && !/^(#{1,3}\s|[-*]\s|>|\||---)/.test(linhas[i + 1])) p.push(linhas[++i]);
    out.push(`<p>${inline(p.join(' '))}</p>`);
  }
  return out.join('\n');
}

const html = `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Guia do CMS · Desbravando UTV</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;600;700&display=swap" rel="stylesheet">
<style>
:root{--papel:#F2F2F2;--branco:#fff;--tinta:#111;--cinza:#717171;--fraco:#9A9A9A;--linha:#D9D9D9}
*{box-sizing:border-box}
body{margin:0;background:var(--papel);color:var(--tinta);
  font:400 16px/1.6 Archivo,system-ui,sans-serif;-webkit-font-smoothing:antialiased}
.folha{max-width:1020px;margin:0 auto;padding:56px 28px 120px}
h1{font:400 46px/1.04 Anton,sans-serif;letter-spacing:-.4px;text-transform:uppercase;margin:0 0 6px}
h2{font:400 30px/1.1 Anton,sans-serif;letter-spacing:-.3px;text-transform:uppercase;
  margin:64px 0 14px;padding-top:22px;border-top:2px solid var(--tinta)}
h3{font:700 17px/1.3 Archivo,sans-serif;margin:34px 0 10px}
p{margin:0 0 14px;color:#2b2b2b}
a{color:var(--tinta)}
code{font:400 .88em/1.4 ui-monospace,"JetBrains Mono",monospace;background:#e6e6e6;
  padding:2px 6px;border-radius:3px;white-space:nowrap}
strong{font-weight:700}
hr{border:0;border-top:1px solid var(--linha);margin:40px 0}
ul,ol{margin:0 0 16px;padding-left:24px}li{margin:0 0 8px}
ol{counter-reset:n;list-style:none;padding-left:0}
ol>li{counter-increment:n;position:relative;padding-left:38px}
ol>li::before{content:counter(n,decimal-leading-zero);position:absolute;left:0;top:1px;
  font:400 12px/1.4 ui-monospace,"JetBrains Mono",monospace;color:var(--fraco)}
/* a capa já tem fio embaixo; sem isto o primeiro h2 traz o dele e sai fio duplo */
.capa+h2{border-top:0;padding-top:0;margin-top:38px}
blockquote{margin:20px 0;padding:16px 20px;background:var(--branco);
  border-left:3px solid var(--tinta)}
blockquote p:last-child{margin:0}
.rolar{overflow-x:auto;margin:0 0 22px;background:var(--branco)}
table{border-collapse:collapse;width:100%;font-size:14px}
th{font:600 11px/1.3 Archivo,sans-serif;text-transform:uppercase;letter-spacing:.07em;
  color:var(--cinza);text-align:left;padding:12px 14px;border-bottom:2px solid var(--tinta);
  white-space:nowrap}
td{padding:12px 14px;border-bottom:1px solid var(--linha);vertical-align:top}
tr:last-child td{border-bottom:0}
td:first-child{white-space:nowrap}
.ex{color:var(--fraco);font-size:12.5px}
.campos{table-layout:fixed}
.campos th:nth-child(1),.campos td:nth-child(1){width:19%}
.campos th:nth-child(2),.campos td:nth-child(2){width:10%;color:var(--fraco);font-size:12.5px}
.campos th:nth-child(3),.campos td:nth-child(3){width:32%}
.campos th:nth-child(4),.campos td:nth-child(4){width:23%}
.campos th:nth-child(5),.campos td:nth-child(5){width:16%}
.campos td:first-child{white-space:normal}
@media(max-width:900px){.campos{table-layout:auto}.campos td,.campos th{width:auto!important}}
.capa{border-bottom:2px solid var(--tinta);padding-bottom:26px;margin-bottom:8px}
.capa p{color:var(--cinza);margin:0}
@media print{body{background:#fff}.folha{padding:0}h2{page-break-after:avoid}
  .rolar,blockquote{page-break-inside:avoid}}
@media(max-width:640px){.folha{padding:32px 16px 80px}h1{font-size:34px}h2{font-size:24px}
  td:first-child{white-space:normal}}
</style></head><body><main class="folha">
${paraHtml(md).replace('<h1>Guia do CMS — como manter o site</h1>', '<div class="capa"><h1>Guia do CMS — como manter o site</h1>').replace('<hr>', '</div>')}
</main></body></html>`;

fs.writeFileSync(path.join(RAIZ, 'guia-do-cms.html'), html, 'utf8');

const nCampos = Object.keys(CAMPOS).length;
console.log(`\n${listasOrdenadas.length} listas · ${nCampos} campos explicados` +
  (avisos ? ` · ⚠️ ${avisos} sem explicação` : ' · nenhum campo sem explicação'));
console.log(`→ guia-do-cms.md  (${md.split('\n').length} linhas)`);
console.log(`→ guia-do-cms.html (${(html.length / 1024) | 0} KB)`);
