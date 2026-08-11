# Como isso funciona na Wix

O ponto que decide se o site vive ou morre: **criar uma expedição nova não pode ser
"montar uma página"**. Se for, ninguém faz, e em três meses o site está desatualizado —
exatamente o problema de hoje.

A resposta é o **CMS da Wix + página dinâmica**. Explicando sem jargão:

> Preenche-se uma **linha numa tabela**. A Wix cria a página inteira sozinha, com
> layout, fotos e botão no lugar. Ninguém arrasta nada.

Uma expedição nova = **uma linha nova**. O endereço (`/expedicoes/urubici-2026`), o
menu, a listagem no Grupo Avulso e a página completa aparecem automaticamente.

---

## Quem preenche — 🔶 A VALIDAR COM O CLIENTE

> **Nada disto está combinado com ele ainda, e nada foi construído.** É a direção que
> faz mais sentido do nosso lado; entra em vigor só depois da conversa. Até lá, o mapa de
> tabelas e o layout mais abaixo valem para os dois cenários — o CMS é o mesmo, muda só
> quem digita.

A tentação era entregar o CMS na mão deles e chamar isso de autonomia. Duas evidências
dizem que não funcionaria:

1. **A página de evento que está no ar hoje tem o campo "Sobre o evento" VAZIO** — são os
   9.000 px de cinza que quebram a página. Eles já têm onde escrever e não escreveram.
2. **O próprio cliente propôs o fluxo contrário**, na reunião de 28/07:
   *"eu vou te passar mastigado, pô, tá aqui, ó"* e *"eu já sei as informações que eu
   tenho que te passar para você subir"*.

Então o fluxo é: **eles preenchem um briefing, a RYZE publica.** Isso também é o que
sustenta a mensalidade — não é um site que se mantém sozinho, é uma operação com alguém
responsável por ela.

### O CMS continua — e é justamente por isso

Sem o CMS, publicar uma expedição seria montar uma página no editor da Wix: **um dia de
trabalho** por expedição. Com o CMS, é **preencher uma linha: 10 a 15 minutos**. O CMS
não existe para dar autonomia ao cliente; existe para o trabalho recorrente ser rápido e
o padrão não escorrer. O cliente nunca abre o CMS.

Efeito colateral bom: se um dia eles quiserem publicar sozinhos, é uma tarde de
treinamento — não uma reconstrução.

### O risco desse arranjo, dito na cara

Se a RYZE é o único caminho, **a atualidade do site passa a depender da disponibilidade
dela**. A reclamação de hoje é exatamente *"acaba que fica sempre desatualizado"* — trocar
o gargalo deles pelo meu não resolve nada. O que precisa estar combinado:

- **prazo de publicação** que se cumpra de verdade (24 a 48h após o briefing completo);
- **briefing incompleto não entra na fila** — é o que evita o vai-e-volta de "falta a foto
  do dia 3";
- alguém mais treinado no CMS, para o site não parar numa semana ruim.

---

## O briefing — 🔶 IDEIA, NÃO INICIADA

> Levantamento de viabilidade, nada mais. **Não mexer no Estúdio de Briefing** antes de
> a operação estar acertada com o cliente.

Se for por esse caminho, não vale criar um formulário do zero. O **[Estúdio de Briefing](https://github.com/pethrus07/estudio-briefing)**
já está em produção e já faz quase isso: HTML único offline, 14 seções guiadas por
schema, e exporta um `.zip` com `IMAGENS/` + `expedicao.json` + o kit de marca.

**O que ele já coleta e a página aproveita direto:** destino, título e subtítulo, sobre a
região, roteiro por dia, itens inclusos, pares rótulo/valor, fotos, datas e local.

**O que falta acrescentar para fechar a página:** dificuldade · quilometragem · aeroporto e
ponto de encontro · hospedagem (nome, estrutura, fotos, categorias de quarto) · valor "a
partir de" e condições de pagamento · link do evento no Wix Events · e o **Guia da
Expedição** (logística, clima, gastronomia, transporte, documentação, contatos).

**A melhor parte:** esse briefing **já acontece** quando eles fecham uma expedição — é o
material que hoje vira a arte. Não é tarefa nova para eles; é a mesma tarefa passando a
alimentar duas saídas: a arte e a página do site.

---

## Publicar uma expedição — o passo a passo (RYZE)

Tempo real: **10 a 15 minutos**, com o briefing preenchido em mãos.

| # | O que fazer | Onde |
|---|---|---|
| 1 | Receber o `.zip` do briefing preenchido | Estúdio de Briefing |
| 2 | Conferir se está completo — se não, devolve antes de começar | — |
| 3 | Criar o evento com os tipos de ingresso e preços | Wix Events |
| 4 | Abrir a tabela **Expedicoes** e adicionar um item | CMS |
| 5 | Colar os campos do `expedicao.json` e o link do evento em `linkCheckout` | CMS |
| 6 | Subir as fotos de `IMAGENS/` no campo `galeria` | CMS |
| 7 | Uma linha por dia na tabela **Roteiro** | CMS |
| 8 | Uma linha por hotel na tabela **Hospedagens** (com as fotos dele) | CMS |
| 9 | As informações operacionais na tabela **Guia** | CMS |
| 9b | Só as perguntas que mudam neste destino na tabela **FAQ** (as gerais já existem) | CMS |
| 10 | Virar a chave `publicado` para **sim** | CMS |

Pronto. A página existe, aparece na lista do Grupo Avulso, e o botão já leva ao checkout.

**Para tirar do ar:** virar `publicado` para não. Não apaga nada, só some do site.
**Para mudar a fase comercial:** trocar o campo `situacao`. O botão muda de texto sozinho
(pré-reserva → reservar vaga → reservar agora → lista de espera). Esse é o tipo de ajuste
que dá para fazer do celular em dois minutos.

---

## A chave de API — onde pegar

Confirmado na documentação da Wix em 08/08/2026.

**Endereço direto:** `manage.wix.com/account/api-keys` — no painel da conta, não no
painel do site. É o *API Keys Manager*.

**Quem pode criar:** só **dono ou co-dono da conta**. Não existe permissão delegável para
isso. Se a conta for do cliente, ou ele cria, ou ele te promove a co-dono e você cria.

**Ao criar, escolher:**

| Campo | O que colocar |
|---|---|
| Nome | algo reconhecível, ex.: `RYZE · conteúdo do site` |
| Acesso a sites | **apenas o desbravandoutv.com**, não "todos os sites" |
| Permissões | **Wix Data** (coleções e itens) · **Media Manager** (fotos) · **Wix Events** (evento e ingressos) |

**Três coisas precisam voltar, não uma:**

1. a **chave** — copie na hora; se fechar a tela sem copiar, é mais fácil gerar outra;
2. o **Account ID** — aparece na própria tela do API Keys Manager;
3. o **Site ID** — está na URL do painel do site, logo depois de `/dashboard/`.

Chamada de site precisa de chave **e** Site ID no cabeçalho; chamada de conta usa o
Account ID.

**Onde guardar:** no cofre cifrado ([[DU-SOL]]), nunca em arquivo solto do projeto nem
commitado. A própria doc da Wix insiste: só em código de servidor.

**O que a chave destrava, na prática:** criar as 6 coleções com todos os campos, importar
a Costa Doce inteira, subir as fotos e criar o evento com os tipos de ingresso. São as
~5 h que hoje seriam digitação. O que ela **não** destrava: tema e layout — ver §0.2.

---

## As tabelas do CMS

Seis tabelas. Só a primeira é obrigatória para a página existir.

> **Mudou na v3.** Três coisas que ele pediu mexem no banco, não só no visual:
> o **nível** da expedição saiu e virou **formato**; a hospedagem deixou de ser um hotel
> só e virou **tabela-filha**; e a reserva passou a girar em torno de **valor por pessoa
> e por casal**, com a **categoria de quarto saindo da página** (ela agora vive só no
> Wix Events, como tipo de ingresso).

### 1. `Expedicoes` — uma linha por expedição

| Campo | Tipo na Wix | Exemplo | Onde aparece |
|---|---|---|---|
| `titulo` | Texto | Costa Doce | título e endereço da página |
| `subtitulo` | Texto | Litoral do Rio Grande do Sul | segunda linha do título |
| `uf` | Texto | RS | listagem e resumo |
| `nomeEdicao` | Texto | Expedição Costa Doce | sobrelinha da abertura |
| `chamada` | Texto | Isso não é trilha, é expedição… | frase abaixo do título |
| `videoAbertura` | Vídeo | — | bloco de vídeo do topo |
| `situacao` | Lista | pré-reserva / aberta / últimas / espera | rótulo do botão + status |
| `dataInicio` / `dataFim` | Data | 02/12/2026 | data e listagem |
| `duracao` | Texto | 5 dias · 3 de trilha | resumo da expedição |
| `percurso` | Texto | ~540 km em 3 dias de trilha | resumo da expedição |
| `formato` | Lista | Família / Só Homens / Casais e Família / Corporativa | resumo **e listagem do Grupo Avulso** |
| `regiao` | Texto | Mostardas · Lagoa do Peixe · Tramandaí | resumo da expedição |
| `base` | Texto | Mostardas & Tramandaí | resumo da expedição |
| `veiculos` | Texto | O seu UTV · transporte incluso | resumo da expedição |
| `destaques` | Texto | Dunas · lagoas · faróis | resumo da expedição |
| `aeroporto` | Texto | Porto Alegre · transfer incluso | resumo da expedição |
| `pontoEncontro` | Texto | Mostardas, 02/12 a partir das 15h | resumo da expedição |
| `galeria` | Galeria de mídia | 8 a 12 fotos | carrossel da galeria |
| `sobreDestino` | Texto rico | 1 a 2 parágrafos | bloco "Sobre o destino" |
| `hospedagemNota` | Texto | 4 pernoites com café da manhã… | linha acima das hospedagens |
| `incluso` | Texto rico | lista com marcadores | "O que está incluso" |
| `naoIncluso` | Texto rico | lista com marcadores | "O que não está incluso" |
| `valorPorPessoa` | Texto | R$ 00.000 | painel de reserva |
| `valorPorCasal` | Texto | R$ 00.000 | painel de reserva |
| `formasPagamento` | Texto | PIX · Cartão em até 10× · Boleto | painel de reserva |
| `sinal` / `saldo` | Texto | — | condições comerciais |
| `politicaCriancas` | Texto | — | condições comerciais |
| `cancelamento` | Texto | — | condições comerciais |
| `linkCheckout` | URL | link do evento no Wix Events | botão principal |
| `publicado` | Sim/Não | — | liga e desliga a página |

**Saiu da tabela:** `dificuldade` (virou `formato`), `categoriasQuarto` (a escolha do
quarto acontece depois do clique, dentro do Wix Events) e os três campos de hospedagem
soltos — que viraram a tabela abaixo.

### 2. `Roteiro` — uma linha por dia

`expedicao` (referência) · `dia` (número) · `data` (texto: "03 dez") · `local` (texto:
"Lagoa do Peixe") · `titulo` · `texto` · `km` (texto: "~170 km", pode ficar vazio)

**Sem foto.** O campo saiu: o módulo é tipográfico e não usa imagem.

### 3. `Hospedagens` — uma linha por hotel da expedição

`expedicao` (referência) · `ordem` (número) · `nome` · `papel` (texto: "Chegada &
coração da expedição") · `onde` (texto: "Mostardas · RS") · `noites` (texto: "3 noites")
· `texto` · `fotos` (galeria de mídia)

É esta tabela que resolve o pedido de **apresentar todas as hospedagens dentro do mesmo
módulo**: o repetidor lista quantas linhas existirem. Uma hospedagem = uma linha. Duas =
duas linhas, sem tocar no layout.

### 4. `Guia` — uma linha por informação operacional

`expedicao` (referência) · `categoria` (lista: Logística, Hospedagem, Gastronomia,
Transporte, Vestuário, O que levar, Documentação, Clima, Contatos) · `titulo` ·
`conteudo` (texto rico)

Esta é a tabela que alimenta o **Guia da Expedição**. É também a base que o atendimento
e o agente do WhatsApp consultam — encher esta tabela é o que faz o agente parar de
perguntar as coisas para vocês.

> **As Perguntas Frequentes saíram daqui** e ganharam tabela própria (a 6). Antes eram
> uma das categorias desta lista. No índice do Guia a entrada "Perguntas frequentes"
> continua, mas como **âncora** que rola até o módulo de FAQ — não é linha desta tabela.

### 5. `Destaques` — os banners da Home

`ativo` (sim/não) · `ordem` (número) · `etiqueta` · `titulo` · `texto` · `rotuloBotao` ·
`link` · `fotoDesktop` · `fotoMobile`

Trocar campanha na Home = mexer aqui. A estrutura da Home não é tocada, como ele pediu.

### 6. `FAQ` — uma linha por pergunta

`ativo` (sim/não) · `ordem` (número) · `escopo` (lista: geral / expedição) ·
`expedicao` (**referência, opcional**) · `pergunta` · `resposta` (texto rico)

**Por que não é uma categoria do `Guia`.** O `Guia` é sempre por expedição; o FAQ não. A
maior parte das dúvidas é **geral** — "preciso ter UTV próprio?", "como funciona o
resgate?", "quando recebo as fotos?" — e a resposta é a mesma em qualquer destino.
Dentro do `Guia`, seriam as mesmas 8 perguntas redigitadas a cada expedição nova. É o
tipo de trabalho repetido que faz o conteúdo envelhecer, que é exatamente o problema que
esta reestruturação existe para resolver.

| `escopo` | `expedicao` | Onde aparece |
|---|---|---|
| `geral` | **vazio** | Grupo Avulso **e** toda página de expedição |
| `expedição` | preenchido | só na página daquela expedição |

Hoje: **6 gerais e 2 por expedição** (nível de dificuldade e combustível, que mudam de
destino para destino). Corrigir uma resposta geral = uma célula, e corrige em todo lugar.

⚠️ **Uma restrição da Wix que decide a montagem:** um dataset de página dinâmica **não
filtra "referência = esta OU referência vazia"** numa tacada. O jeito nativo são **dois
repetidores** dentro da mesma seção — primeiro *"sobre esta expedição"*, depois *"dúvidas
gerais"*. Sem código, e a leitura fica até melhor. Um repetidor só exigiria Velo.

No Grupo Avulso é mais simples: um repetidor filtrado por `escopo = geral`.

---

## O que é nativo e o que precisa de código

**Nativo, sem programar:**

- CMS com página dinâmica (é o coração de tudo)
- Listagem do Grupo Avulso: repetidor ligado à tabela, filtrado por `publicado`
- Roteiro, **Hospedagens**, categorias do Guia e **FAQ**: repetidores ligados às tabelas-filhas
- FAQ da página da expedição: **dois** repetidores (desta expedição + gerais), porque um
  dataset dinâmico não filtra "referência = esta OU vazia" de uma vez
- **Galeria horizontal por hotel**: uma Pro Gallery em modo slider dentro do repetidor de
  `Hospedagens`, ligada ao campo `fotos` daquela linha
- Carrossel de destaques da Home: **Pro Gallery** em modo slider, ligada a `Destaques`,
  com rotação automática — aceita título, texto e link por item
- Galeria da expedição em carrossel, uma foto por vez
- Vídeo em tela cheia no topo
- Índice do Guia com rolagem até a seção (âncora)
- Barra de reserva fixa no scroll
- PT | EN: app **Wix Multilingual**
- Botão principal com texto variável por `situacao`

**Precisa de código (Velo) — ou fica para depois:**

- **O campo de busca do Guia.** O índice por categoria resolve 90% e é nativo; a busca
  por termo livre precisa de Velo. Minha recomendação: subir sem a busca, com as
  categorias, e avaliar depois se ela faz falta de verdade.
- Contagem de vagas em tempo real (não é nativo e não está no escopo).

**Confirmar antes de começar:**

- O plano atual da Wix libera o CMS. Vocês têm Stores e Events, então é plano Business —
  mas vale confirmar no painel antes de eu montar as tabelas.
- Qual gateway está ligado na conta (o painel de reserva menciona o checkout já existente).
- Se o Wix Multilingual está no plano ou é add-on.

---

## Por que o Wix Events continua no jogo

O checkout dele já funciona, já está testado e já recebe dinheiro. Mexer nisso é risco
sem retorno. Então:

- **Wix Events** = caixa registradora. Tipos de ingresso e preços vivem lá.
- **CMS** = a página. Conteúdo, fotos, roteiro, guia.
- O botão principal da página leva do CMS para o evento.

Efeito colateral bom: **é exatamente onde a escolha do quarto tinha que ir parar.** Ele
pediu que a categoria de acomodação saísse da página e acontecesse depois do clique — e
o Wix Events já faz isso nativamente, cada categoria sendo um tipo de ingresso. A página
mostra o investimento por pessoa e por casal; o preço por acomodação aparece no
checkout, onde ele já está correto. Zero código para isso.

---

## Ordem de montagem sugerida

1. Criar as 6 tabelas do CMS e cadastrar a **Costa Doce** inteira, como piloto — é a
   única com conteúdo real hoje (o dossiê de dezembro/2026), e é a que tem **duas
   hospedagens**, que é o caso difícil. Se ela couber, o resto cabe.
2. Montar a página dinâmica da expedição com os 12 módulos.
3. Montar o Grupo Avulso (listagem) e a Home.
4. Cadastrar as outras expedições — é aqui que se mede se ficou simples mesmo.
5. Grupo Fechado (aguardando o documento) e a página da Comunidade.

O passo 4 é o teste real: se alguém da equipe cadastrar uma expedição sem me chamar,
funcionou. Se travar, é sinal de que algum campo ficou confuso e eu ajusto antes de
seguir.

**Falta do cliente para a Costa Doce ir ao ar:** valor por pessoa, valor por casal,
sinal, saldo, política para crianças e política de cancelamento. O dossiê não traz
nenhum desses — a página está com "a confirmar" no lugar, e nada foi inventado.
