# Guia do CMS — como manter o site

**Desbravando UTV** · 12/08/2026

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

## As 7 listas, e a ordem que importa

| Ordem | Lista | O que é | Hoje tem |
|---|---|---|---|
| 1 | **Expedições** | O coração de tudo. Uma linha por expedição. | 5 linhas |
| 2 | **Roteiro** | O dia a dia de cada expedição. Uma linha por dia. | 5 linhas |
| 3 | **Hospedagens** | Os hotéis e pousadas de cada expedição. Uma linha por hospedagem. | 2 linhas |
| 4 | **Itens do pacote** | O que está e o que não está incluso. Uma linha por item. | 15 linhas |
| 5 | **Guia da Expedição** | As orientações práticas, por assunto. Uma linha por assunto. | 9 linhas |
| 6 | **Perguntas Frequentes** | As dúvidas e respostas. Uma linha por pergunta. | 8 linhas |
| 7 | **Destaques da Home** | Os avisos que passam no carrossel da página inicial. | 3 linhas |

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

**6 · Itens do pacote** — uma linha por item. **Escopo** `incluso` para o que acompanha,
`nao-incluso` para o que não acompanha.

**7 · Guia da Expedição** — uma linha por assunto, com a **Ordem** que faz sentido ler.

**8 · Perguntas específicas daquele destino** — em Perguntas Frequentes, com **Escopo**
`expedicao` e a expedição escolhida. As perguntas gerais já valem para todos os destinos,
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
| Perguntas Frequentes | `geral` · `expedicao` |
| Itens do pacote | `incluso` · `nao-incluso` |

**`expedicao` sem cedilha e `nao-incluso` sem til, com o hífen.** Escrito de outro jeito,
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

### Expedições

Cadastrar uma linha aqui **cria a página daquela expedição sozinha**. Você nunca monta página nova — preenche a linha e a página aparece pronta, no mesmo desenho.

| Campo | Tipo | O que é | Onde aparece no site | Se ficar vazio |
|---|---|---|---|---|
| **Título** | texto | O nome do destino, curto.<br><span class="ex">ex.: Costa Doce</span> | No título grande da página, na agenda e no endereço do site. | obrigatório — sem ele a página não existe |
| **Subtítulo** | texto | A segunda linha do título grande.<br><span class="ex">ex.: Litoral do Rio Grande do Sul</span> | Logo abaixo do nome, no mesmo tamanho. | o título fica com uma linha só |
| **UF** | texto | A sigla do estado.<br><span class="ex">ex.: RS</span> | Ao lado do nome, no caminho no topo da página. | não aparece nada no lugar |
| **Nome da edição** | texto | O nome completo da edição.<br><span class="ex">ex.: Expedição Costa Doce</span> | Na linha fina acima do título. | a linha fina fica sem o nome |
| **Chamada** | texto | Uma frase que resume a expedição.<br><span class="ex">ex.: Cinco dias cruzando o trecho mais bruto do litoral gaúcho.</span> | Abaixo do título, e também no cartão da agenda. | o cartão da agenda fica só com o nome |
| **Vídeo de abertura** | vídeo | Um vídeo curto, para o topo da página.<br><span class="ex">ex.: 15 a 30 segundos, sem som necessário</span> | A faixa do topo, no lugar da foto. | aparece a foto de capa no lugar — não fica em branco |
| **Situação** | texto | Em que ponto está a venda.<br><span class="ex">ex.: Pré-reserva aberta · Últimas vagas · Lista de espera</span> | Na etiqueta ao lado do título e no cartão da agenda. | a etiqueta desaparece |
| **Data de início** | data | O primeiro dia.<br><span class="ex">ex.: 02/12/2026</span> | Na linha fina do topo e na faixa de dados. | a data não aparece |
| **Data de fim** | data | O último dia.<br><span class="ex">ex.: 06/12/2026</span> | Junto com a data de início. | idem |
| **Duração** | texto | Quantos dias, e quantos deles de trilha.<br><span class="ex">ex.: 5 dias · 3 de trilha</span> | Na faixa de dados e no cartão da agenda. | a célula fica vazia |
| **Percurso** | texto | Quantos quilômetros, em quantos dias.<br><span class="ex">ex.: ~540 km em 3 dias de trilha</span> | Na faixa de dados e no bloco "sobre o destino". | a célula fica vazia |
| **Formato** | texto | Para quem é a expedição.<br><span class="ex">ex.: Casais e Família · Só Homens · Família</span> | Na faixa de dados e no cartão da agenda. | a célula fica vazia |
| **Região** | texto | As cidades e pontos do percurso.<br><span class="ex">ex.: Mostardas · Lagoa do Peixe · Tramandaí</span> | A última célula da faixa de dados. | a célula fica vazia |
| **Base** | texto | Onde o grupo se hospeda e sai todo dia.<br><span class="ex">ex.: Mostardas & Tramandaí</span> | Na faixa de dados e no bloco "sobre o destino". | a célula fica vazia |
| **Veículos** | texto | Que carro a pessoa leva, e como ele chega.<br><span class="ex">ex.: O seu UTV · transporte incluso</span> | Na faixa de dados e no bloco "sobre o destino". | a célula fica vazia |
| **Destaques** | texto | Os três atrativos que resumem o destino.<br><span class="ex">ex.: Dunas · lagoas · faróis</span> | Na faixa de dados e ao lado do título da galeria. | a célula fica vazia |
| **Aeroporto** | texto | Qual aeroporto usar, e se tem transfer.<br><span class="ex">ex.: Porto Alegre · transfer incluso</span> | Na faixa de dados. | a célula fica vazia |
| **Ponto de encontro** | texto | Onde e quando o grupo se encontra.<br><span class="ex">ex.: Mostardas, 02/12 a partir das 15:00</span> | Na faixa de dados. | a célula fica vazia |
| **Galeria** | várias imagens | VÁRIAS fotos, para o carrossel.<br><span class="ex">ex.: 4 a 8 fotos boas</span> | No bloco "A EXPEDIÇÃO POR DENTRO". | o bloco da galeria desaparece da página |
| **Sobre o destino** | texto com formatação | O texto que conta o destino. Dois ou três parágrafos.<br><span class="ex">ex.: Cinco dias cruzando dunas que não acabam, lagoas escondidas na areia…</span> | No bloco "sobre o destino". | o bloco inteiro desaparece da página |
| **Nota da hospedagem** | texto | Uma frase sobre o padrão da hospedagem.<br><span class="ex">ex.: Hospedagem escolhida a dedo entre as opções da região.</span> | Abaixo do título "ONDE O GRUPO FICA". | só a frase desaparece; os hotéis continuam |
| **O que está incluso** | texto com formatação | A lista do que está incluso, se preferir escrever tudo num campo só.<br><span class="ex">ex.: uma linha por item</span> | No bloco "O QUE ESTÁ INCLUSO". | ver a nota sobre os dois caminhos, no fim |
| **O que não está incluso** | texto com formatação | Idem, para o que não está incluso.<br><span class="ex">ex.: uma linha por item</span> | No bloco "O QUE NÃO ESTÁ INCLUSO". | ver a nota sobre os dois caminhos, no fim |
| **Valor por pessoa** | texto | Não usado na página. A venda é por acomodação, não por pessoa. | Em nenhum lugar. | nada muda |
| **Valor por casal** | texto | Cópia de segurança do valor. Preencha o *Valor exibido* em vez deste. | Só se o Valor exibido estiver vazio. | nada muda |
| **Formas de pagamento** | texto | Como se pode pagar.<br><span class="ex">ex.: PIX · Cartão em até 10× · Boleto</span> | Uma linha na faixa preta da Reserva. | a linha não aparece |
| **Sinal** | texto | Quanto se paga na reserva.<br><span class="ex">ex.: 30% na reserva</span> | Uma linha na faixa preta da Reserva. | a linha não aparece — e se as 4 condições estiverem vazias, a caixa toda sai |
| **Saldo** | texto | Quando se paga o resto.<br><span class="ex">ex.: até 30 dias antes da saída</span> | Uma linha na faixa preta da Reserva. | a linha não aparece |
| **Política para crianças** | texto | A regra para crianças. | Idem — e vale repetir como pergunta no FAQ. | nada muda na página |
| **Cancelamento** | texto | A regra de cancelamento. | Uma linha na faixa preta da Reserva. | a linha não aparece |
| **Rótulo do botão** | texto | O que o botão principal diz.<br><span class="ex">ex.: Fazer pré-reserva · Reservar vaga · Entrar na lista de espera</span> | No botão grande, ao lado do título. | o botão fica sem texto |
| **Link do checkout** | endereço | Para onde o botão leva.<br><span class="ex">ex.: o endereço da página de pagamento</span> | É o clique do botão principal. | o botão não leva a lugar nenhum |
| **Publicado** | sim/não | A chave que libera a expedição para o público.<br><span class="ex">ex.: Ligue só quando o valor e as respostas estiverem prontos</span> | Controla se a expedição pode ir ao ar. | 🔒 fica invisível para quem visita — é o estado seguro |
| **Foto de capa (agenda e listagens)** | uma imagem | UMA foto, a que representa a expedição.<br><span class="ex">ex.: uma foto na horizontal, larga</span> | No cartão da agenda e no topo da página. | ⚠️ o cartão da agenda fica sem foto |
| **Localização** | texto | Onde fica, em traço largo.<br><span class="ex">ex.: Litoral do RS · Brasil</span> | A primeira célula da faixa de dados. | a célula fica vazia |
| **Título da seção Sobre o destino** | texto | A manchete desse bloco. Escrita para aquele destino.<br><span class="ex">ex.: O TRECHO MAIS BRUTO DO LITORAL GAÚCHO.</span> | Acima do texto do destino. | o bloco fica sem manchete |
| **Valor exibido na página** | texto | O valor como ele aparece na página. Texto livre, já com o "R$".<br><span class="ex">ex.: A partir de R$ 19.500</span> | O número grande da faixa preta da Reserva. | ⚠️ a faixa preta da Reserva **desaparece inteira** |

---

### Roteiro

É o que vira a lista "DIA A DIA DA EXPEDIÇÃO" na página.

| Campo | Tipo | O que é | Onde aparece no site | Se ficar vazio |
|---|---|---|---|---|
| **Expedição** | escolha na lista | A qual expedição este dia pertence.<br><span class="ex">ex.: escolha na lista</span> | Amarra o dia à página certa. | ⚠️ o dia não aparece em nenhuma página |
| **Dia** | número | O número do dia: 1, 2, 3…<br><span class="ex">ex.: 1</span> | O número grande à esquerda, e define a ordem. | o dia sai fora de ordem |
| **Data** | texto | A data curta.<br><span class="ex">ex.: 02 dez</span> | Na linha fina ao lado do dia. | a linha fica sem data |
| **Local** | texto | Onde o dia acontece.<br><span class="ex">ex.: Mostardas · RS</span> | Na linha fina, ao lado da data. | a linha fica sem local |
| **Título** | texto | O nome do dia, curto.<br><span class="ex">ex.: Chegada</span> | O título da linha do roteiro. | a linha fica sem título |
| **Texto** | texto com formatação | O que acontece nesse dia.<br><span class="ex">ex.: Recepção do grupo, conferência dos carros e jantar de boas-vindas.</span> | O parágrafo da linha. | a linha fica só com o título |
| **Quilometragem** | texto | Quantos quilômetros nesse dia.<br><span class="ex">ex.: 180 km</span> | À direita da linha. | fica vazio — é o certo nos dias sem trilha |

---

### Hospedagens

Vira o bloco "ONDE O GRUPO FICA", cada hospedagem com suas fotos.

| Campo | Tipo | O que é | Onde aparece no site | Se ficar vazio |
|---|---|---|---|---|
| **Expedição** | escolha na lista | A qual expedição esta hospedagem pertence.<br><span class="ex">ex.: escolha na lista</span> | Amarra à página certa. | ⚠️ não aparece em nenhuma página |
| **Ordem** | número | A posição na lista: 1, 2, 3…<br><span class="ex">ex.: 1</span> | Define qual hotel vem primeiro. | a ordem fica imprevisível |
| **Nome** | texto | O nome do hotel ou pousada.<br><span class="ex">ex.: Schenkel Hotel</span> | O título do bloco. | o bloco fica sem nome |
| **Papel** | texto | O que essa hospedagem é na viagem.<br><span class="ex">ex.: Base da expedição</span> | Na linha fina acima do nome. | a linha fina desaparece |
| **Onde** | texto | Em que cidade fica.<br><span class="ex">ex.: Mostardas · RS</span> | Abaixo do nome. | fica vazio |
| **Noites** | texto | Quantas noites ali.<br><span class="ex">ex.: 3 noites</span> | Ao lado da cidade. | fica vazio |
| **Texto** | texto com formatação | Uma descrição curta.<br><span class="ex">ex.: Hotel simples e bem cuidado, a dez minutos do início da trilha.</span> | O parágrafo do bloco. | o bloco fica só com o nome |
| **Fotos** | várias imagens | As fotos daquela hospedagem.<br><span class="ex">ex.: 2 a 4 fotos</span> | A tirinha de fotos ao lado. | a tirinha de fotos desaparece |

---

### Itens do pacote

Alimenta os dois blocos da página: "O QUE ESTÁ INCLUSO" e "O QUE NÃO ESTÁ INCLUSO". O campo **Escopo** decide em qual dos dois o item aparece.

| Campo | Tipo | O que é | Onde aparece no site | Se ficar vazio |
|---|---|---|---|---|
| **Expedição** | escolha na lista | A qual expedição este item pertence.<br><span class="ex">ex.: escolha na lista</span> | Amarra à página certa. | ⚠️ não aparece em nenhuma página |
| **Escopo (incluso | nao-incluso)** | texto | Em qual dos dois blocos o item entra.<br><span class="ex">ex.: incluso  ou  nao-incluso</span> | Decide entre "está incluso" e "não está incluso". | ⚠️ o item não aparece em bloco nenhum |
| **Ordem** | número | A posição na lista: 1, 2, 3…<br><span class="ex">ex.: 1</span> | Define a ordem dos itens. | a ordem fica imprevisível |
| **Número (01, 02…)** | texto | O número que aparece antes do texto.<br><span class="ex">ex.: 01</span> | À esquerda do item, no bloco "está incluso". | o item aparece sem número |
| **Texto do item** | texto | O item em si.<br><span class="ex">ex.: 3 dias de trilha guiada por equipe experiente</span> | O texto do item. | a linha fica em branco |

---

### Guia da Expedição

Vira a sanfona do "GUIA DA EXPEDIÇÃO", onde a pessoa clica no assunto e o conteúdo abre. Assunto sem conteúdo aparece como linha simples e não abre — de propósito, para não prometer o que não tem.

| Campo | Tipo | O que é | Onde aparece no site | Se ficar vazio |
|---|---|---|---|---|
| **Expedição** | escolha na lista | A qual expedição este assunto pertence.<br><span class="ex">ex.: escolha na lista</span> | Amarra à página certa. | ⚠️ não aparece em nenhuma página |
| **Categoria** | texto | O nome do assunto.<br><span class="ex">ex.: Logística · Clima · O que levar</span> | A linha em que a pessoa clica. | a linha fica sem nome |
| **Título** | texto | Um subtítulo do assunto.<br><span class="ex">ex.: Bases, encontro e ritmo</span> | Dentro do assunto, quando abre. | o assunto abre sem subtítulo |
| **Conteúdo** | texto com formatação | As orientações daquele assunto.<br><span class="ex">ex.: uma linha por orientação</span> | O que abre ao clicar. | ⚠️ a linha aparece mas **não abre** — é o certo enquanto não houver conteúdo |
| **Ordem** | número | A posição na lista: 1, 2, 3…<br><span class="ex">ex.: 1</span> | Define a ordem dos assuntos. | a ordem fica imprevisível |

---

### Perguntas Frequentes

Aparece em dois lugares: na página "Próximas Expedições" e dentro de cada expedição. O campo **Escopo** decide onde.

| Campo | Tipo | O que é | Onde aparece no site | Se ficar vazio |
|---|---|---|---|---|
| **Ativo** | sim/não | Se a pergunta deve aparecer.<br><span class="ex">ex.: ligado</span> | Desligue para esconder sem apagar. | a pergunta não aparece |
| **Ordem** | número | A posição na lista: 1, 2, 3…<br><span class="ex">ex.: 1</span> | Define a ordem das perguntas. | a ordem fica imprevisível |
| **Escopo** | texto | Se a pergunta é geral ou daquele destino.<br><span class="ex">ex.: geral  ou  expedicao</span> | Decide onde ela aparece — ver a nota. | ⚠️ a pergunta não aparece em lugar nenhum |
| **Expedição (só se for específica)** | escolha na lista | A qual expedição a pergunta se refere.<br><span class="ex">ex.: escolha na lista, ou deixe vazio</span> | Só preencha se o Escopo for `expedicao`. | nas gerais, vazio é o certo |
| **Pergunta** | texto | A pergunta, como o cliente faria.<br><span class="ex">ex.: Preciso ter UTV próprio para participar?</span> | A linha em que a pessoa clica. | a linha fica em branco |
| **Resposta** | texto com formatação | A resposta.<br><span class="ex">ex.: Não necessariamente. Trabalhamos com parceiros de locação na região…</span> | O que abre ao clicar na pergunta. | ⚠️ a pergunta aparece mas **não abre** |

---

### Destaques da Home

É o espaço para anunciar o que for do momento — vaga aberta, novidade, chamada de campanha.

| Campo | Tipo | O que é | Onde aparece no site | Se ficar vazio |
|---|---|---|---|---|
| **Ativo** | sim/não | Se o destaque deve aparecer.<br><span class="ex">ex.: ligado</span> | Desligue para esconder sem apagar. | não aparece |
| **Ordem** | número | A posição no carrossel.<br><span class="ex">ex.: 1</span> | Define a ordem. | a ordem fica imprevisível |
| **Etiqueta** | texto | A palavra pequena acima do título.<br><span class="ex">ex.: Novidade · Vagas abertas</span> | No topo do cartão. | o cartão fica sem etiqueta |
| **Título** | texto | O título do destaque. | O texto grande do cartão. | o cartão fica sem título |
| **Texto** | texto | Uma ou duas linhas de apoio. | Abaixo do título. | o cartão fica só com o título |
| **Rótulo do botão** | texto | O que o botão diz.<br><span class="ex">ex.: Saber mais</span> | No botão do cartão. | o botão fica sem texto |
| **Link** | endereço | Para onde o botão leva. | É o clique do botão. | o botão não leva a lugar nenhum |
| **Foto desktop** | uma imagem | A imagem do destaque, no computador.<br><span class="ex">ex.: imagem larga</span> | O fundo do cartão. | o cartão fica sem imagem |
| **Foto mobile** | uma imagem | A mesma imagem, recortada em pé para o celular.<br><span class="ex">ex.: imagem em pé</span> | O fundo do cartão no celular. | usa a de computador, que pode cortar torto |


---

## Duas coisas que precisam da sua atenção agora

### As respostas do FAQ são provisórias

As 8 respostas que estão hoje no CMS **foram escritas para testar o funcionamento da
sanfona**, não para publicar. Quatro saíram do dossiê da Costa Doce e batem com a
realidade; **quatro são suposição** — idade mínima para crianças, política de
cancelamento, acompanhante que não dirige, e o prazo de entrega das fotos.

**Leiam as 8 e reescrevam o que não estiver certo antes de ligar *Publicado*.** Ninguém
melhor que vocês para responder essas.

### O Guia tem 0 assuntos esperando conteúdo



Deixamos em branco de propósito. São orientações que alguém vai seguir dirigindo mais de
500 km de trilha — o tipo de informação que não se preenche por suposição. Enquanto
estiverem vazios, aparecem como linha simples que não abre, o que é honesto.

Os quatro que já estão prontos — Logística, Hospedagem, Gastronomia e Transporte — servem
de modelo de tom e tamanho.

---

## O valor e os ingressos: dois lugares, e é de propósito

| | Onde vive | O que é |
|---|---|---|
| **o número que a página mostra** | CMS → **Expedições** → *Valor exibido na página* | uma frase curta, ex. `A partir de R$ 19.500` |
| **os ingressos e as vendas** | **Eventos** → o evento → aba *Ingressos* | cada acomodação, com preço, limite e pedidos |

A página **não** lê os ingressos: ela lê o campo do CMS. Então quando mudar o preço de um
ingresso, **atualize também o campo** — ou peça para rodarem o comando de sincronismo.

### Preencher o valor da página

**CMS → Expedições →** a linha da expedição **→ Valor exibido na página**. Texto livre,
escreva com o `R$`:

```
A partir de R$ 19.500
```

- Começando com **"A partir de"**, a página põe essa parte no rótulo pequeno e deixa só o
  número em letra grande
- **Vazio**, a faixa preta inteira **desaparece** — é assim que uma expedição sem preço
  definido não anuncia "a confirmar"

Na mesma linha: **Rótulo do botão** (`Reservar vaga` · `Entrar na lista de espera`) e
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
3. **O *Escopo* está exatamente `geral`, `expedicao`, `incluso` ou `nao-incluso`?**
   Minúsculo, sem acento

Se passou pelas três e continua sem aparecer, aí sim vale chamar.
