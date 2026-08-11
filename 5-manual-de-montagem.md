# Manual de montagem na Wix — repaginação v3

**Documento interno da RYZE.** É o passo a passo de construção, tela por tela e elemento
por elemento. Não vai para o cliente.

Três arquivos trabalham juntos:

| Arquivo | O que é | Como usar |
|---|---|---|
| **este painel** | a ordem, os passos, a ficha de cada elemento e as armadilhas | ler de cima para baixo |
| `previa/modulos/*.png` | a figura de cada módulo isolado | já embutida aqui — clique para ampliar |
| `design/fichas.md` | a mesma ficha em texto, para o terminal | só se preferir fora do navegador |

`fichas.md` é **gerado** por `node design/ficha.mjs`. Se divergir do que você vê na
prévia, o errado é o design — corrige em `design/` e roda de novo. Nunca edita a ficha
na mão.

---

> **O que este manual NÃO cobre, de propósito:** o **tema** (cores, fontes, estilos de
> texto) já está aplicado no site, e o **cabeçalho** e o **rodapé** já estão em todas as
> páginas. Nada disso aparece aqui. Se precisar dos valores do tema, eles estão em
> `design/lib/tokens.mjs`.

## Regra de ouro

> **Monta o vocabulário antes das páginas.**

O projeto inteiro é feito de doze peças que se repetem. Se você montar página por página,
vai remontar a mesma linha de dado tabulado umas quarenta vezes. Montando o vocabulário
primeiro e salvando cada peça, o resto é duplicar e trocar o texto.

É o que transforma ~70 h em ~35 h. É a única decisão deste manual que muda a ordem de
grandeza do prazo.

---

# Parte 0 · Antes de tocar no Editor

### 0.1 · A decisão que vale 25 horas

**Confirmar se dá para montar no Wix Studio em vez do Editor clássico.**

| | Editor clássico | Wix Studio |
|---|---|---|
| Responsivo | tela mobile **separada**, remontada na mão | breakpoints reais, herda do desktop |
| Reuso | duplicar e reeditar | componentes de verdade |
| Layout | posicionamento absoluto + stacks | grid e flex |
| Custo no projeto | ~70 h | ~45 h |

Não existe conversão automática de um para o outro — seria remontar. Mas **a gente já vai
remontar de qualquer jeito**, então o custo extra é quase zero. O que precisa ser checado
antes: se o Wix Events e o Wix Stores que já estão na conta seguem funcionando no Studio,
e se a transferência mantém domínio e plano.

**Uma hora investigando isso vale mais que um dia montando.** Faça primeiro.

Se a resposta for "não dá", o manual continua valendo — muda só a Parte 4, que vira
retrabalho manual em vez de ajuste de breakpoint.

### 0.2 · O que dá para automatizar, e o que não dá

Levantado na documentação da Wix em 07/08/2026. A linha divisória é nítida:
**dados sim, desenho não.**

| Frente | Dá para fazer por fora? | Como |
|---|---|---|
| Criar as 5 coleções com todos os campos | **Sim** | [Data Collections API](https://dev.wix.com/docs/rest/business-solutions/cms/data-collections/introduction) |
| Popular tudo (a Costa Doce inteira) | **Sim** | [Data Items API](https://dev.wix.com/docs/api-reference/business-solutions/cms/data-items/introduction) |
| Subir as fotos e ligar nas galerias | **Sim** | Media Manager API |
| Criar o evento e os tipos de ingresso | **Sim** | Wix Events / Ticket Definitions API |
| **Tema: cores, fontes, estilos de texto** | **Não** | só pelo Editor — existe [pedido aberto](https://forum.wixstudio.com/t/feature-request-site-theme-api/26437) na comunidade por uma Site Theme API |
| **Montar o layout das páginas** | **Não** | não há endpoint para criar elemento; o `$w` do Velo só controla elemento que **já existe** |

Traduzindo para o relógio: **o CMS inteiro sai de graça** — as ~5 h entre criar coleções,
digitar a Costa Doce, subir fotos e montar o evento viram um script. **O tema e o layout
continuam na mão**, e são ~30 h.

✅ **Já feito.** A chave de API chegou em 08/08, as 6 coleções foram criadas e a Costa
Doce está carregada. As ~5 h de digitação do CMS não existem mais. **O que sobrou é o
layout**, que é o resto deste manual.

### 0.3 · Confirmar no painel

- [ ] O plano libera **CMS / Coleções de conteúdo**
- [x] ~~Fontes~~ — Anton e Archivo já estão carregando no site
- [ ] **Wix Multilingual** está incluso ou é add-on
- [ ] Qual gateway está ligado (o botão de reserva leva para o checkout que já existe)
- [x] ~~Chave de API~~ — resolvida em 08/08

### 0.4 · Grade

- Largura da tela de referência: **1440px**
- Largura do conteúdo: **1200px**
- Recuo lateral: **120px** de cada lado no desktop, **20px** no celular

Na Wix isso é a largura de conteúdo da seção. O padrão dela é 980px — **tem que trocar
para 1200**, senão tudo fica apertado e a proporção do design quebra.

---

# Parte 1 · O vocabulário

Monte estas doze peças **antes de qualquer página**. Cada uma, depois de pronta, vai para
a biblioteca de seções/componentes e nunca mais é montada do zero.

Referência visual: abra `previa/00-·-sistema-de-design.png`.

### V1 · Fio leve
Caixa de **altura 1px**, largura 100%, fundo `#D9D9D9`.
Separa itens dentro de uma lista.

### V2 · Fio forte
Caixa de **altura 2px**, largura 100%, fundo `#111111`.
Abre e fecha toda lista. Se uma lista não tem fio forte em cima e embaixo, está errada.

> Use **caixa com fundo**, não o elemento "Divisor" da Wix. O Divisor tem margens
> próprias que você vai brigar para zerar.

### V3 · Sobrelinha
Texto, estilo `sobrelinha`, cor **cinza** `#717171`, em caixa alta.
Sobre fundo preto, cor branca a 55%.

### V4 · Botão sólido
Caixa fundo **preto**, altura **48px**, recuo **22px**, canto **reto (0)**.
Dentro: texto estilo `botão` em branco + ícone de seta 13×13 branca, espaço 9px entre eles.

Variantes: **contorno** (sem fundo, contorno 1px tinta, texto tinta) · **texto** (sem
fundo nem contorno, altura livre, texto tinta) · **claro** (fundo branco, texto preto —
só sobre fundo preto).

**Canto reto em tudo.** O único arredondamento do projeto é o círculo das setas do
carrossel e das pílulas.

### V5 · Linha de dado tabulado
Linha horizontal, recuo 13–14px, com fio leve embaixo:
- coluna esquerda de largura fixa (**128px** desktop / 92px mobile): rótulo em
  `sobrelinha`, cor cinza fraco
- coluna direita que estica: valor em `corpo pequeno`, cor tinta

É a peça mais reaproveitada do site — aparece nos cards de formato da Home e no
"sobre o destino" da página da expedição.

### V6 · Dado do resumo
Coluna com espaço 3px:
- rótulo em `mono` 10px caixa alta, cor cinza
- valor em `corpo`/`h4`, cor tinta

Três por linha, dentro de uma faixa entre fio forte em cima e embaixo, com fio leve
entre as linhas.

### V7 · Item numerado
Linha com recuo 14px e fio leve embaixo:
- número em `mono`, cor cinza fraco, largura fixa **32px** (26px no mobile), sempre com
  zero à esquerda: `01`, `02`…
- texto em `corpo`, cor tinta, estica

### V8 · Linha do índice (agenda)
Linha com recuo 26px, espaço 24px, fio leve embaixo, alinhada ao centro:

| Ordem | Elemento | Medida |
|---|---|---|
| 1 | número em `mono`, cinza fraco | largura 40 |
| 2 | foto | **208 × 138** |
| 3 | nome do destino em `índice` (Anton 44), caixa alta, tinta | largura ~240–430 |
| 4 | coluna: UF em `corpo` 15 + **formato** em `corpo pequeno` cinza | largura 130 |
| 5 | coluna: datas + status | largura 190 |
| 6 | mola | empurra a seta |
| 7 | ícone de seta 20×20 tinta | — |

### V9 · Status
Linha com espaço 7px: quadradinho **5×5** cinza fraco + texto `corpo pequeno` cinza.
Quando for "últimas vagas", quadradinho e texto viram tinta e o texto ganha peso 700.

### V10 · Sanfona do FAQ
Linha com recuo, fio leve embaixo: pergunta em `corpo` peso 600 tinta + ícone `+`
(vira `−` quando aberta) à direita. A primeira da lista já vem aberta.

### V11 · Cabeçalho de módulo
Coluna largura 780, espaço 14:
sobrelinha → título `h1` → (opcional) texto de apoio em `corpo`/`corpo grande` cinza.

Abre quase todo módulo do site. Quando o módulo tem número ou contagem à direita, o
cabeçalho vira uma linha: cabeçalho + mola + o número em `mono`.

### V12 · Seção
A casca de tudo. Fundo (papel ou branco), respiro **em cima e embaixo** conforme a
ficha (76 a 104px no desktop, 32 a 48 no celular), conteúdo com largura 1200 centralizado.

> Na Wix o respiro vertical vira **padding da seção**; o recuo lateral vira **largura de
> conteúdo 1200**. Não use caixas vazias para espaçar como no arquivo de design — lá elas
> existem porque o formato só aceita padding igual nos quatro lados.

---

# Parte 2 · O CMS — ✅ pronto

**Não há nada a fazer aqui.** As seis coleções foram criadas e carregadas pela API em
08/08, e as referências estão amarradas. Esta parte fica como mapa do que existe.

| Coleção | Itens | O que tem |
|---|---|---|
| `Expedicoes` | 5 | Costa Doce completa + 4 rascunhos |
| `Roteiro` | 5 | os cinco dias, com `dia`, `data`, `local`, `titulo`, `texto`, `km` |
| `Hospedagens` | 2 | Pousada Pouso Alegre e Schenkel Hotel, com `ordem` |
| `Guia` | 9 | categorias vazias, prontas para o conteúdo operacional |
| `Destaques` | 3 | os banners da Home |
| `FAQ` | 8 | 6 gerais (sem expedição) + 2 amarradas à Costa Doce |

Permissões: **leitura pública, escrita só admin**. O cliente nunca abre o CMS.

**`publicado` está FALSE em todas as expedições** — nada aparece no site até você virar
a chave, e isso só depois dos valores chegarem.

> **Para corrigir conteúdo:** edite `design/lib/dados.mjs` e rode
> `node design/wix-importar.mjs`. O import é idempotente — cada item tem `_id` derivado
> do conteúdo, então atualiza em vez de duplicar. É a mesma fonte que gera o layout, por
> isso página e banco não divergem.

**O que ainda não está no CMS:** as fotos (nem CSV nem a API de dados carregam imagem —
eu subo pelo Media Manager quando os arquivos oficiais chegarem) e o `linkCheckout`, que
sai do evento no Wix Events.

---

# Parte 3 · Montagem, tela por tela

> **1. Home → 2. Grupo Avulso → 3. Página da Expedição**

**Por que a Home primeiro:** ela é a única das três que **não depende do CMS**. É tudo
estático — nav, vídeo, textos, cards, carrossel, rodapé. E o CMS ainda está travado
esperando confirmação de plano e acesso de administrador. Montando a Home você entrega
o cabeçalho, o rodapé e metade do vocabulário sem depender de ninguém, e chega no Grupo
Avulso já com as peças prontas.

Ela também é a primeira que o cliente abre para julgar — é o caminho mais curto até ter
algo para mostrar.

O que fica para depois, quando o CMS estiver liberado: o **repetidor da agenda** no
Grupo Avulso e a **página dinâmica** da expedição, que é onde a estrutura de dados
realmente aparece.

**Em cada módulo abaixo você tem:** o recorte da tela, a **tabela de textos** (fonte,
tamanho, peso, entrelinha, espaçamento entre letras, cor, largura e alinhamento de cada
um), a **tabela de caixas** (largura, altura, recuo, espaço, alinhamento, fundo,
contorno e canto) e a estrutura de aninhamento. Os números das tabelas batem entre si.

No painel em HTML, **clicar num hexadecimal ou num texto copia** para a área de
transferência — é para não redigitar cor nem frase.

---

## 3.1 · Home — página estática, `/`

9 módulos (fora nav e rodapé, já no site).

### 1. `posicionamento` — 1440 × 460
Seção **papel**, respiro 84, espaço 24.
Sobrelinha `O DESBRAVANDO` → o título em `display` em duas linhas → o parágrafo em
`corpo grande` cinza, largura **900**.

> É a primeira das quatro referências aprovadas: *"apresentação inicial da Home, logo
> abaixo do vídeo"*. Ela define a linguagem do site inteiro. Monte esta primeiro e use
> como aferição das outras.

### 2. `destaques (carrossel automático)` — 1440 × 440
Foto de fundo + degradê 100° (preto 85% → preto 15%).
Conteúdo alinhado ao centro vertical, recuo lateral 120, coluna largura 620:
etiqueta em `sobrelinha` branco 65% → título `h1` branco → texto `corpo` branco 82% →
respiro 4 → **V4 botão claro**.
Pontinhos centralizados no rodapé da faixa, altura de faixa 38.

Na Wix: **Pro Gallery** em modo slider ligada a `Destaques`, rotação automática. Cada
campanha é uma linha da coleção — trocar campanha não encosta na Home.

### 3. `expedições` — 1440 × 1046 ⚠️ módulo refeito na v3
`previa/modulos/01-expedicoes.png`

**Duas etapas visuais, claramente separadas.** É o pedido central do documento da Home.

Seção **papel**, respiro 96, espaço **0**.

**Etapa 1 — a apresentação.** Coluna que estica, espaço 20:
sobrelinha `EXPEDIÇÕES` → `ESCOLHA A EXPERIÊNCIA / QUE COMBINA COM VOCÊ.` em `h1` →
texto em `corpo grande` cinza, largura **720**.

**Respiro de 56px.** É o que separa as duas etapas.

**Etapa 2 — as opções.** Uma coluna de **fundo branco** que estica, contendo uma linha
com os dois cards, espaço **0**. A troca de fundo (papel → branco) é o que impede a
seção de parecer "um único bloco visual".

Cada card, recuo **48**, espaço 0, com **fio de 1px na esquerda** no segundo:

| Ordem | Elemento |
|---|---|
| 1 | `01` em `mono`, cinza fraco, espaçamento +2 |
| 2 | respiro **34** |
| 3 | `GRUPO AVULSO` em **`h1`** (Anton 48), tinta |
| 4 | respiro 16 |
| 5 | a frase em `corpo` cinza |
| 6 | respiro 36 |
| 7 | **V1 fio leve** → quatro **V5 linhas de dado tabulado** (Quem vai · Datas · Vaga · Roteiro) → **V1 fio leve** |
| 8 | respiro 32 |
| 9 | **V4 botão de texto** com seta |

**Sem nenhuma imagem.** Foi pedido literal: *"remover completamente as imagens dos
cards"*. A percepção de qualidade tem de vir do tipo, do fio e do ar — é para isso que
existem as quatro linhas tabuladas.

### 4. `galeria` — 1440 × 817 ⚠️ mudou na v3
Era faixa com quatro fotos ao mesmo tempo. Virou **carrossel de uma por vez**, igual ao
da página da expedição, altura **480**.
Seção **branco**, respiro 76.

### 5. `parceiros oficiais` — 1440 × 354 ⚠️ **refeito no ajuste final**
`previa/modulos/01-parceiros-oficiais.png`

A v3 tinha virado uma linha só (frase · fio · logo). Ele pediu de volta o arranjo
aprovado antes: **logomarca em cima, frase de apoio embaixo, tudo centralizado.**

Faixa **papel**, respiro 88, **todos os elementos centralizados**:
1. o logo do parceiro, caixa **180 × 54**
2. respiro 24
3. sobrelinha `PARCEIRA OFICIAL DAS EXPEDIÇÕES`, cinza
4. respiro 12
5. `Ao lado de quem compartilha a mesma paixão.` em `h2`, tinta, centralizado,
   **largura 820**

> A largura 820 não é decoração: em 620 a frase quebra e sobra "paixão." sozinho na
> segunda linha. Se você mudar a fonte ou o tamanho, confira a quebra.

Se um dia houver mais de um parceiro, eles entram lado a lado com espaço 34 e a
sobrelinha vira plural — o componente já trata isso.

Hoje está com o nome escrito no lugar do logo. **Falta a arte da Can-Am.**

> Agora há **dois módulos centrados** no site: este e a Comunidade. Não é repetição —
> um é claro, pequeno e quieto; o outro é preto, grande e é a pausa da página. Se os
> dois começarem a parecer iguais, o que muda é este, não a Comunidade.

### 6. `quem já foi` — 1440 × 527
Seção **branco**, respiro 76. Módulo de referência aprovada — não mexer.
Cabeçalho largura 780 → **V2 fio forte** → dois depoimentos → **V2 fio forte**.
Cada um: linha recuo 26, espaço 40 — `↗` em `h3` (largura 34) · a frase em `corpo
grande` tinta que estica · o autor em `corpo pequeno` cinza, largura 240, **alinhado à
direita**.

### 7. `comunidade` — 1440 × 583 ⚠️ módulo refeito na v3
`previa/modulos/01-comunidade.png`

**O único módulo centrado do site, e a única pausa preta da Home.** Era branco e igual
ao vizinho — foi o que ele chamou de repetitivo.

Faixa **preta**, respiro 104, tudo centralizado:
marca (montanha, altura 34) → respiro 26 → sobrelinha branco 55% → respiro 20 → título
em **Anton 62** branco, duas linhas, largura 900 → respiro 20 → texto em `corpo grande`
branco 82%, largura 640 → respiro 32 → **V4 botão claro**.

**Os textos não mudaram** — ele foi explícito: *"não alterar os textos, alterar apenas o
layout"*.

### 8. `três pilares` — 1440 × 710 ⚠️ mudou na v3
Seção **papel**, respiro 92.
Cabeçalho largura 780 → respiro 48 → **V2 fio forte** → três colunas → **V2 fio forte**.

Cada coluna, recuo 32, espaço 20, com fio de 1px na esquerda (menos a primeira):
1. linha espaço 16: número em `mono` cinza fraco + **foto 56 × 56**
2. título em `h3` tinta + o mantra em `corpo grande` cinza
3. **V4 botão de texto** com seta

**A foto virou selo.** Ele reclamou que as imagens competiam com a mensagem: *"elas
deverão funcionar apenas como complemento visual"*. 56 × 56 é o tamanho — não aumente.

Sem indicadores numéricos. Ele cortou na v2: *"a Home não deverá apresentar indicadores
estatísticos"*.

### 9. `estoque e produtos` — 1440 × 581
Seção **branco**, respiro 80. Duas colunas com espaço 56, **lado a lado, nunca
empilhadas** (pedido dele).
- Esquerda: sobrelinha + `h2` + linha com foto **190 × 190** e, ao lado, a tabela de três
  UTVs entre fios fortes + **V4 botão de contorno**
- Direita: sobrelinha + `h2` em duas linhas + `corpo grande` + foto que estica altura 190
  + **V4 botão sólido**

---

## 3.2 · Grupo Avulso — página estática, `/expedicoes`

5 módulos (fora nav e rodapé, já no site).

### 1. `abertura` — 1440 × 409
Seção **papel**, respiro 84.
Migalha → sobrelinha `GRUPO AVULSO` → `PRÓXIMAS EXPEDIÇÕES` em `display` → texto em
`corpo grande` cinza largura 620.

Sem filtros. Ele apagou os três na v2.

### 2. `transição · começa a agenda` — 1440 × 68 ⚠️ **novo no ajuste final**
`previa/modulos/02-transicao-comeca-a-agenda.png`

O problema que ele apontou: *"evitar que a primeira fotografia da agenda pareça fazer
parte do Hero da página."* Sem nada entre os dois, a foto de 208×138 da Costa Doce
encostava no texto de abertura e lia como continuação dele.

Faixa **preta** de altura **68**, recuo lateral 120, alinhada ao centro:
- `AGENDA 2026` em sobrelinha, branco 82%
- mola
- `5 expedições` em `mono`, branco 55%

Depois dela, **respiro de 64px** antes do fio forte que abre a lista.

É o mesmo preto de pontuação que já existe no nav, na Comunidade e na Reserva — não
inventa vocabulário novo, e encerra a apresentação de forma inequívoca. No celular a
mesma faixa aparece com altura 54 e respiro de 28 depois.

### 3. `agenda` — 1440 × 855 ⚠️ mudou na v3
`previa/modulos/02-agenda.png`

**V2 fio forte** → uma **V8 linha do índice** por expedição → respiro 96.

A mudança da v3 está na quarta coluna: onde havia o **nível** (leve / média / difícil)
agora vai o **formato** — Família, Só Homens, Casais e Família, Corporativa. O objetivo
dele: *"identificar o perfil da expedição antes de acessar a página, reduzindo acessos
desnecessários."*

Nenhum valor aparece aqui. Preço é assunto da página da expedição.

No CMS: repetidor ligado a `Expedicoes`, filtrado por `publicado = sim`, ordenado por
`dataInicio`.

### 4. `faq` — 1440 × 766
Igual ao da página da expedição, subiu para logo abaixo da agenda.

### 5. `chamada final · cadastro de interesse` — 1440 × 420 ⚠️ módulo refeito na v3
`previa/modulos/02-chamada-final-cadastro-de-interesse.png`

Era mais uma faixa preta — o mesmo recurso já usado em outras páginas, que é justamente
o que ele mandou evitar. Agora é claro e assimétrico.

Seção **branco**, respiro 100.
**V2 fio forte** → respiro 40 → linha com espaço 80, alinhada ao topo:
- coluna largura **560**: sobrelinha `NOVAS EXPEDIÇÕES` + título `h1` em duas linhas
- coluna que estica, espaço 34: o texto em `corpo grande` cinza, e embaixo a **linha de
  campo**: altura 58, **fio de 1,5px só embaixo** cor tinta, com o texto de exemplo em
  `corpo grande` cinza fraco esticando + `AVISE-ME` em `botão` + seta 14×14

**Nenhum outro módulo do site tem campo de entrada** — é o que garante que esta
composição não se repete em lugar nenhum.

Na Wix: caixa de entrada de e-mail sem borda, só com a linha de baixo, ligada a um
formulário ou à lista de contatos.

---

## 3.3 · Página da Expedição — página **dinâmica** ligada a `Expedicoes`

12 módulos (fora nav e rodapé). Endereço: `/expedicoes/{titulo}`.

### 1. `vídeo/vídeo da expedição` — 1440 × 520
Bloco de vídeo em tela cheia, altura **520**, com véu escuro por cima
(degradê 180°, de preto 28% para preto 48%).
No centro: círculo **62px** de contorno branco 70% com o ícone *play* 20×20 branco, e
abaixo o rótulo em `sobrelinha` branco 65%.

Na Wix: **Video Box** com o vídeo de fundo + imagem de capa. O véu é uma caixa por cima
com o degradê.

### 2. `apresentação` — 1440 × 438
Seção **papel**, respiro 64.

1. migalha de pão: `Expedições / Grupo Avulso / Costa Doce · RS` — `corpo pequeno`,
   os dois primeiros em cinza, o último em tinta
2. linha com espaço 60, alinhada ao topo:
   - coluna que estica: sobrelinha `EXPEDIÇÃO COSTA DOCE · 02 A 06 DE DEZEMBRO DE 2026`
     → título `display` (Anton 72) em duas linhas → chamada em `corpo grande` cinza,
     largura 620 → **V9 status**
   - coluna alinhada à direita: **V4 botão sólido** altura 54 + a nota em `corpo pequeno`
     cinza fraco

> Este módulo é uma das quatro referências que o cliente citou como "o que está certo".
> Não invente nada nele.

### 3. `resumo da expedição` — 1440 × 368
Seção **branco**, respiro 52. Também é módulo de referência aprovada.

Faixa de dados: **V2 fio forte** → linha de três **V6 dados** (recuo 22) → **V1 fio leve**
→ mais três → fio leve → mais três → **V2 fio forte**.

Os nove dados vêm do CMS: localização, base, duração · veículos, destaques, percurso ·
datas, formato, região.

### 4. `galeria` — 1440 × 797
Seção **papel**, respiro 72.

1. linha alinhada pela base: cabeçalho (sobrelinha + `h1`) + mola + nota em `corpo
   pequeno` cinza fraco
2. **carrossel de uma foto por vez**, altura **520**, largura total do conteúdo
3. setas: círculo **44px** branco 90% com ícone 19×19 tinta, uma em cada ponta, recuo 22
4. rodapé do carrossel: legenda em `corpo pequeno` cinza · mola · `1 / 4` em `mono` ·
   pontinhos (ativo 22×3 tinta, inativo 8×3 linha)

Na Wix: **Pro Gallery** em modo *Slider*, um item por vez, setas ligadas.

### 5. `sobre o destino` — 1440 × 452
Seção **branco**, respiro 76.
Cabeçalho largura 780 → linha com espaço 56: texto corrido que estica + coluna de três
**V5 linhas de dado tabulado** (Base · Trilha · Seu carro).

### 6. `roteiro` — 1440 × 1136 ⚠️ módulo refeito na v3
`previa/modulos/03-roteiro.png`

**Sem foto nenhuma.** Foi pedido literal. É uma régua tipográfica.

Seção **papel**, respiro 84. Cabeçalho largura 820 → respiro 46 → a lista:

**V2 fio forte**, depois um bloco por dia, e **V2 fio forte** no fim.

Cada dia é uma **linha** com recuo 30 e espaço 40, com **fio leve no topo** (menos o
primeiro):

| | Elemento | Medida |
|---|---|---|
| coluna esquerda, largura **108**, espaço 6 | `DIA` em sobrelinha 10, cinza fraco | |
| | o número em **Anton 44** (`índice`), tinta | `01`, `02`… |
| coluna direita, estica, **fio de 1px na esquerda** `#D9D9D9` | recuo interno de **32px** antes do conteúdo | |
| | linha: `02 dez · Mostardas · RS` em `mono` cinza fraco + mola + **km** em `mono` tinta | |
| | título em `h3` (Anton 24) CAIXA ALTA, tinta | |
| | texto em `corpo` cinza | |

O fio vertical é o que dá a leitura cronológica. **É ele que substitui a foto** — não
tire.

No CMS: repetidor ligado a `Roteiro`, ordenado por `dia`. O campo `km` pode vir vazio
(dia 1 e dia 5 não têm) — configure para esconder o elemento quando vazio.

### 7. `hospedagem` — 1440 × 1009 ⚠️ módulo refeito na v3
`previa/modulos/03-hospedagem.png`

**Todos os hotéis dentro do mesmo módulo.** Foi pedido literal.

Seção **branco**, respiro 80.
1. linha alinhada pela base: cabeçalho (largura 640) + mola + `2 hospedagens · 4
   pernoites` em `mono` tinta
2. respiro 18 → a nota em `corpo` cinza, largura 780
3. respiro 40 → **V2 fio forte** → uma entrada por hotel → **V2 fio forte**

Cada entrada (fio leve no topo, menos a primeira), recuo 30, espaço 20:
- linha, espaço 40: coluna largura **360** (sobrelinha do papel do hotel → nome em `h3`
  → linha `Mostardas · RS` + pontinho 3×3 + `3 noites` em `mono`) · texto em `corpo
  grande` cinza que estica
- **galeria horizontal**: fotos de altura **176** que esticam, espaço 6, e no fim uma
  faixa de **70px** com a primeira foto a **45% de opacidade** — é a foto "espiando",
  que sinaliza que há mais para arrastar

No CMS: repetidor ligado a `Hospedagens`, ordenado por `ordem`. Dentro de cada item do
repetidor, uma Pro Gallery em modo *Slider* ligada ao campo `fotos` **daquela linha**.

### 8. `está incluso` — 1440 × 782 ⚠️ módulo refeito na v3
`previa/modulos/03-esta-incluso.png`

Era lista de marcadores e ele achou "excessivamente simples". Virou inventário numerado.

Seção **papel**, respiro 84. Cabeçalho → respiro 36 → o plano:

Caixa de fundo **branco** com recuo **40**:
1. linha alinhada pela base: `TUDO ISTO ACOMPANHA A EXPEDIÇÃO` em sobrelinha + mola +
   **`11 itens`** em `mono` tinta
2. respiro 22 → **V2 fio forte**
3. duas colunas com espaço 48, cada uma com **V7 itens numerados** — a numeração é
   **contínua entre as colunas** (esquerda 01–06, direita 07–11)
4. **V2 fio forte**

A contagem no topo é o que faz o valor aparecer antes da leitura. Não corte.

### 9. `reserva` — 1440 × 462 ⚠️ módulo refeito na v3, **enxugado no ajuste final**
`previa/modulos/03-reserva.png`

Seção **preta**, respiro 84. **Três coisas e mais nada: os dois valores e o botão.**

1. coluna largura 820: `RESERVA` em sobrelinha branco 55% → `O INVESTIMENTO DA EXPEDIÇÃO`
   em `h1` branco. **Sem subtítulo** — ele removeu no ajuste final.
2. respiro 44 → o painel:
   - fio de **2px** branco 16%
   - linha com recuo 40 e espaço 40, alinhada ao centro:
     `POR PESSOA` em `mono` 10 branco 55% + valor em **Anton 56** branco ·
     `POR CASAL` idem, separado por **fio vertical de 1px** e recuo interno de 34 ·
     **V4 botão claro** altura **60**
   - fio de 2px branco 16%
   - respiro 16 → a nota em `corpo pequeno` 12 branco 55%

**Saíram da página:** formas de pagamento, condições comerciais, sinal, saldo,
parcelamento e política para crianças. Instrução literal do ajuste final: *"deverão ser
apresentadas durante o fluxo da reserva, não sendo necessário antecipá-las neste momento
da página."* Eles continuam existindo no CMS — só não aparecem aqui.

**A escolha do quarto também não existe nesta página.** Acontece depois do clique, no Wix
Events, onde cada categoria é um tipo de ingresso. Sai nativo.

> Consequência prática para a montagem: este módulo ficou **180px mais baixo** e é agora
> um dos mais rápidos de montar da página. A única coisa que não pode falhar é o
> alinhamento vertical entre os dois valores e o botão.

### 10. `não está incluso` — 1440 × 327
Seção **papel**, respiro 64. É de propósito o módulo mais leve da página.

Linha alinhada pela base: sobrelinha + `h2` + mola + `por conta do participante` em
`corpo pequeno` cinza fraco.
Depois: **V1 fio leve** → quatro colunas que esticam, separadas por **fio vertical de
1px na esquerda** (menos a primeira), recuo 24: número em `mono` cinza fraco + texto em
`corpo pequeno` cinza → **V1 fio leve**.

Sem marcador, sem caixa, sem fio forte. É o contraste com o módulo de cima.

### 11. `guia da expedição` — 1440 × 1018
Seção **branco**, respiro 84.

1. sobrelinha → `h1` em duas linhas → texto de apoio em `corpo` cinza largura 720
2. campo de busca: linha altura **56**, **fio de 1,5px só embaixo** cor tinta, com ícone
   de lupa 18×18 e o texto de exemplo em cinza fraco
3. índice: uma linha por categoria, recuo 16, fio leve entre elas — número em `mono`
   (largura 34) + nome em `h4` (largura 300) + contagem em `corpo pequeno` cinza fraco +
   seta 16×16

**A busca por termo livre precisa de Velo.** Recomendação: subir sem ela, só com o
índice por categoria, que é nativo e resolve 90%. O campo pode ficar montado e desligado.

### 12. `faq` — 1440 × 883
Seção **papel**, respiro 76. Cabeçalho → **V2 fio forte** → **V10 sanfonas** → fio forte.
A primeira já vem aberta, com a resposta em `corpo` cinza.

---

## 3.4 · Grupo Fechado — **aguardando o documento do cliente**

A tela `04` no arquivo de design é a **versão antiga**, mantida só como referência de
estrutura. Não monte antes do documento chegar: o que está lá não passou pela revisão da
v3 e vai mudar.

---

# Parte 4 · A página dinâmica e a ligação entre as páginas

Esta é a parte que faz o site parar de envelhecer. Depois dela, **expedição nova é uma
linha na tabela** — nunca mais se monta esta tela.

As coleções já existem e estão carregadas, então dá para fazer agora.

---

### 4.0 · Repetidor: você monta UM item, não a lista

Leia isto antes de qualquer coisa desta parte — muda o tamanho do trabalho.

**No arquivo de design as listas estão desenhadas inteiras.** A agenda tem as 5
expedições, o roteiro tem os 5 dias, o FAQ tem as 8 perguntas. Foi desenhado assim para
você ver o ritmo e conferir o acabamento.

**Na Wix não é assim.** Você monta **um item** e o repetidor multiplica pelos dados da
coleção. Então o trabalho real é uma fração do que a ficha mostra:

| Módulo | Elementos desenhados | Você monta | O repetidor multiplica |
|---|---|---|---|
| `agenda` (Grupo Avulso) | 59 | **11** | por `Expedicoes` — hoje 5 |
| `roteiro` | 68 | **11** | por `Roteiro` — 5 dias |
| `hospedagem` | 42 | **15** | por `Hospedagens` — 2 hotéis |
| `faq` (expedição) | 41 | **4** | por `FAQ` — 8 perguntas |
| `faq` (Grupo Avulso) | 33 | **5** | por `FAQ` — 6 gerais |

São **243 elementos desenhados que viram 46 montados**. E melhor: quando a sexta
expedição entrar, a agenda cresce sozinha. O item que você monta hoje serve para sempre.

> **Como ler a ficha nesses módulos:** olhe o **primeiro** item da lista e ignore os
> repetidos. No roteiro, monte o "dia 01" e pare — os dias 02 a 05 são o mesmo desenho
> com outro dado. No painel esses módulos estão marcados com **↻**.

**Os três pedaços de um repetidor**, e por que a ordem importa:

1. **O dataset** — o conector invisível. Diz qual coleção, qual filtro, qual ordem.
2. **O repetidor** — o elemento visual. É uma caixa que se repete.
3. **O conteúdo do item** — os textos e fotos dentro da caixa, cada um ligado a um campo.

Sem o dataset, o repetidor não tem o que repetir. Sem o repetidor, o dataset não aparece.

---

### 4.0b · O gesto de conectar — vale para o projeto inteiro

Este movimento se repete em cada texto, foto e botão ligado ao CMS. Aprenda uma vez.

**O ícone.** Selecione o elemento e procure no cantinho dele um ícone de **cilindro de
banco de dados** (às vezes desenhado como um plugue). É o *Conectar ao CMS*. Se o ícone
não aparece, é porque **não existe dataset na página** — crie o dataset primeiro, o ícone
só nasce depois disso.

**A ordem é de fora para dentro, e não é opcional:**

1. **Primeiro o repetidor.** Selecione o repetidor inteiro → conectar → escolha o dataset.
   É isto que faz cada linha virar um registro da coleção.
2. **Depois cada elemento de dentro.** Só depois do passo 1 é que a lista de campos passa
   a oferecer os campos da coleção nos elementos internos. Se você conectar um texto antes
   de conectar o repetidor, ele vai ligar no *item atual do dataset* — e todas as linhas
   mostram o mesmo valor. É o erro mais comum, e ele parece um bug.

**O painel de conexão muda conforme o elemento:**

| Elemento | O que aparece para escolher |
|---|---|
| Texto | *O texto se conecta a* · *O link se conecta a* |
| Imagem | *A origem da imagem se conecta a* · *O texto alternativo* · *O link* |
| Botão | *O rótulo se conecta a* · *O link se conecta a* |
| Galeria | *Os itens se conectam a* (aponte para um campo de galeria de mídia) |
| Repetidor | só o **dataset** |

**⚠️ Imagem não conecta em galeria de mídia.** São dois tipos de campo diferentes, e a
lista de campos do elemento de Imagem simplesmente não mostra os de galeria — parece que
"faltou o campo". Por isso `Expedicoes` tem **dois**:

| Campo | Tipo | Para que serve |
|---|---|---|
| `fotoCapa` | **Imagem** | a miniatura da linha da agenda e qualquer listagem. É esta que um elemento de Imagem conecta |
| `galeria` | **Galeria de mídia** | o carrossel da página da expedição. Conecta numa Pro Gallery, não numa Imagem |

As duas já estão preenchidas nas 5 expedições. Na linha da agenda, conecte a foto em
**`fotoCapa`**.

**Um elemento pode ter DUAS conexões.** O botão principal da expedição é o caso: o
rótulo vem de `rotuloBotao` e o link vem de `linkCheckout`. Na linha da agenda, a mesma
coisa: o texto vem de `titulo` e o link vem da página dinâmica.

**Só conecta ao dado da linha o que estiver DENTRO do item do repetidor.** Se um elemento
ficar por fora — mesmo que visualmente pareça dentro — ele não recebe o dado da linha.
Confira no painel de camadas que ele está aninhado no item.

> **Se o Editor mostrar sempre a mesma linha**, não se assuste: em algumas versões ele
> desenha só o primeiro registro. Abra a **Prévia** para ver o repetidor multiplicado de
> verdade. É lá que se confere.

---

### 4.1 · Criar a página dinâmica

1. No painel, abra **CMS → `Expedicoes`**.
2. No menu de três pontos da coleção, **Adicionar página dinâmica** (ou no Editor:
   **Páginas → + → Página dinâmica**).
3. Quando pedir o campo do endereço, escolha **`titulo`**. O endereço fica
   `/expedicoes/{titulo}` — a Costa Doce vira `/expedicoes/costa-doce`.
4. A Wix oferece criar também uma **página de lista**. **Recuse.** A nossa lista é o
   Grupo Avulso, que já está desenhado.

Pronto: existe uma página, e ela serve as 5 expedições. Abra a prévia e troque o item no
seletor do topo para ver a mesma tela com dados diferentes.

> **O dataset dela já vem filtrado** para o item atual. Você não configura filtro nenhum
> no dataset principal — a Wix faz isso porque é página dinâmica.

---

### 4.2 · Ligar os campos simples

Para cada texto do módulo, clique nele → **Conectar ao CMS** → escolha o dataset da
página → escolha o campo. A tabela abaixo é o mapa completo:

| Onde, no módulo | Campo |
|---|---|
| sobrelinha da apresentação | `nomeEdicao` + `dataInicio`/`dataFim` |
| título grande | `titulo` e `subtitulo` (dois textos, um por linha) |
| chamada | `chamada` |
| status | `situacao` |
| resumo, linha 1 | `regiao` · `base` · `duracao` |
| resumo, linha 2 | `veiculos` · `destaques` · `percurso` |
| resumo, linha 3 | datas · `formato` · `regiao` |
| sobre o destino | `sobreDestino` |
| nota da hospedagem | `hospedagemNota` |
| o que está incluso | `incluso` |
| o que não está incluso | `naoIncluso` |
| valor por pessoa / por casal | `valorPorPessoa` · `valorPorCasal` |
| formas de pagamento | `formasPagamento` |
| galeria (carrossel) | `galeria` — numa **Pro Gallery**, não num elemento de Imagem |
| vídeo do topo | `videoAbertura` |

**O botão principal, que tem duas ligações:**

- o **texto** dele → campo `rotuloBotao` (é o que faz virar "Fazer pré-reserva",
  "Reservar vaga" ou "Lista de espera" sem você abrir o Editor);
- o **link** dele → campo `linkCheckout`.

> Campo vazio aparece em branco, não some. Para a Costa Doce, `valorPorPessoa` e
> `valorPorCasal` estão vazios de propósito — vão aparecer em branco até os valores
> chegarem, e é assim que deve ser. Esconder elemento vazio exigiria Velo.

---

### 4.3 · Os repetidores das tabelas-filhas

Três módulos são listas que vêm de outras coleções. Para cada um, o mesmo movimento:

1. adicione um **dataset novo** na página, apontando para a coleção-filha;
2. no filtro dele, escolha **`expedicao` → é → item atual da página dinâmica**
   (essa opção só existe em página dinâmica — é ela que amarra tudo);
3. conecte o **repetidor** a esse dataset;
4. defina a **ordenação**.

| Módulo | Coleção | Ordenar por | Máximo de itens |
|---|---|---|---|
| roteiro | `Roteiro` | `dia` crescente | 10 |
| hospedagem | `Hospedagens` | `ordem` crescente | 5 |
| guia da expedição | `Guia` | `categoria` | 20 |

**Dentro do item do repetidor**, conecte os campos:

- **roteiro** → `dia` no número grande · `data` e `local` na linha de meta · `titulo` ·
  `texto` · `km` à direita
- **hospedagem** → `papel` na sobrelinha · `nome` · `onde` e `noites` · `texto` ·
  `fotos` na galeria horizontal
- **guia** → `categoria` no nome · `titulo` e `conteudo` no conteúdo da categoria

> **O `km` vem vazio no dia 1 e no dia 5** — porque esses dias não têm trilha. Como ele
> fica alinhado à direita, vazio não deixa buraco. Não tente esconder.

---

### 4.4 · O FAQ — passo a passo

#### Antes: a sanfona não sai de graça

O desenho mostra uma **sanfona** — pergunta com `+`, a primeira aberta. Isso conflita com
repetidor, e vale saber por quê antes de montar:

- o **Acordeão** nativo da Wix **não se conecta a dataset**. Você digita os itens na mão;
- o **repetidor** conecta ao CMS, mas **abrir e fechar linha por linha exige Velo**. Sem
  código, o repetidor mostra tudo aberto ou tudo fechado, nunca um por vez.

Três saídas, e a recomendação:

| Caminho | Custo | O que você perde |
|---|---|---|
| A · repetidor com pergunta e resposta visíveis | zero código | a sanfona. Vira lista separada por fio |
| B · Acordeão nativo, preenchido à mão | zero código | o CMS. Na página da expedição você perde as perguntas por destino, que é o motivo da coleção existir |
| **C · repetidor + Velo** ⭐ **ESCOLHIDO** | ~40 linhas, prontas em `velo/faq-sanfona.js` | nada. Exige ligar o Modo de Desenvolvedor — ver **4.4b** |

**Escolhido o C** (08/08): dá o CMS e a sanfona, e o código já está escrito. O passo a
passo está em **4.4b**, logo abaixo do desta seção.

O B ficaria de fora de qualquer jeito — sem CMS você perde as perguntas por expedição, que
é o motivo da coleção existir.

> **Cuidado que o C traz:** sanfona fechada esconde resposta vazia. O código trata:
> pergunta sem resposta **não** vira sanfona, aparece como linha simples sem sinal e sem
> clique. Assim o buraco continua visível — que é o que faz a resposta ser escrita.

> ⚠️ **As 8 respostas no CMS agora são DE TESTE** (08/08), postas para dar o que clicar
> enquanto se confere a sanfona. **Não são conteúdo aprovado pelo cliente** — 4 saíram do
> dossiê real da Costa Doce, 4 são chute plausível. Estão em `RESPOSTAS_TESTE` em
> `design/lib/dados.mjs`, cada uma marcada `[DOSSIÊ]` ou `[INVENTADO]`.
>
> | | |
> |---|---|
> | repor o teste | `node design/wix-importar.mjs --mockup-faq` |
> | **limpar tudo** | `node design/wix-importar.mjs` |
>
> Nada disso está no ar: `publicado` é FALSE. Mas **tem que sair antes de publicar** —
> o site não pode responder ao cliente dele com texto que eu inventei.

---

#### No Grupo Avulso — um repetidor

**Passo 1 · dataset**

`+ Adicionar → CMS → Conjunto de dados`:

| Campo | Valor |
|---|---|
| Coleção | `FAQ` |
| Modo | Somente leitura |
| Filtro | `ativo` **é** `sim` **e** `escopo` **é** `geral` |
| Ordenar | `ordem` **crescente** |
| Itens a exibir | 20 |

> O valor é **`geral`**, minúsculo e sem acento. Os dois valores possíveis são `geral` e
> `expedicao` — sem cedilha, de propósito, porque é chave que você digita no filtro.

**Passo 2 · repetidor**

Repetidor de uma coluna, conectado ao dataset. **Conecte o repetidor antes dos elementos
de dentro** — ver 4.0b.

**Passo 3 · o item, 5 elementos**

| # | Elemento | Conectar a |
|---|---|---|
| 1 | pergunta — `corpo` peso 600, tinta, estica | `pergunta` |
| 2 | resposta — `corpo`, cinza, estica | `resposta` |
| 3 | `+` à direita — `h3`, cinza | *nada* — ver abaixo |
| 4 | fio leve embaixo, 1px `#D9D9D9` | — |
| 5 | a caixa da linha, recuo 16 | — |

> **O `+`**: com o Velo ele alterna entre `+` e `−`, e desaparece nas perguntas sem
> resposta. Precisa de ID — `faqSinal`. Ver **4.4b**.

Fio forte de 2px abre e fecha a lista, **fora** do repetidor.

---

#### Na página da expedição — DOIS repetidores

Aqui está a restrição que decide o desenho: **um dataset de página dinâmica não filtra
"referência = esta OU referência vazia"** numa tacada. E as perguntas gerais têm
`expedicao` vazio de propósito, para valerem em toda expedição.

Então, dentro da mesma seção, dois repetidores empilhados:

| Ordem | Rótulo acima | Coleção | Filtro |
|---|---|---|---|
| 1º | *Sobre esta expedição* | `FAQ` | `ativo` é `sim` · `escopo` é `expedicao` · `expedicao` **é o item atual da página dinâmica** |
| 2º | *Dúvidas gerais* | `FAQ` | `ativo` é `sim` · `escopo` é `geral` |

Cada um com seu dataset próprio, os dois ordenados por `ordem`. O item interno é
**idêntico** ao do Grupo Avulso — monte lá primeiro, salve na biblioteca e reaproveite.

A leitura fica melhor assim, e não por acaso: primeiro o que é daquele destino, depois o
que vale para todas.

> **A Costa Doce tem 2 perguntas de expedição** — nível de dificuldade e combustível. Nas
> outras quatro expedições esse primeiro repetidor aparece **vazio**, porque ninguém
> escreveu pergunta específica para elas ainda. Vazio ali é correto, não é defeito.

---

#### Conferir

- [ ] Grupo Avulso mostrando **6** perguntas
- [ ] Página da expedição mostrando **2 + 6**
- [ ] Trocar o item na prévia: as 2 específicas mudam, as 6 gerais ficam
- [ ] Ordem obedecendo o campo `ordem`
- [ ] As **8** aparecendo com resposta — hoje todas têm, porque estão com o texto de teste

---

### 4.4b · A sanfona com Velo — o caminho escolhido

Repetidor ligado ao CMS **e** sanfona de verdade. São ~40 linhas.

#### Passo 1 · ligar o Modo de Desenvolvedor

No topo do Editor, **Modo Dev** (ou *Velo by Wix*) → **Ativar**. Aparece um painel de
código no rodapé do Editor e uma barra lateral de arquivos.

Custo real de ligar isso, dito na cara: o site passa a ter uma camada de código, e
publicar passa a envolver o código junto. Não quebra nada do que existe, e dá para
desligar. Mas é uma porta que fica aberta — vale saber que abriu.

#### Passo 2 · dar ID aos três elementos

Com o Modo Dev ligado, cada elemento mostra o ID e dá para editar. Dentro do item do
repetidor, renomeie:

**Não precisa renomear nada.** Os IDs que a Wix gerou no Grupo Avulso já estão no código:

| Elemento | ID no site |
|---|---|
| o **repetidor** | `repeater2` |
| a **caixa da linha** | `container2` |
| a **pergunta** | `text85` |
| a **resposta** | `text86` |
| o **sinal `+`** | `text87` |

> **IDs são únicos por página.** Na página da expedição, com dois repetidores, o segundo
> conjunto sai numerado pela Wix (`text851`, `text861`…). O código recebe os IDs por
> parâmetro justamente por isso — as duas chamadas estão comentadas no fim do arquivo.

**A caixa da linha precisa ser um container de verdade**, com a resposta *dentro* dela.
Se a resposta ficar irmã da caixa em vez de filha, o `collapse()` deixa buraco no lugar.

#### Passo 3 · colar o código

Arquivo pronto: **`velo/faq-sanfona.js`** no projeto, **já com os IDs reais do site**.
Cole no código **da página** — não no `masterPage.js`.

```js
// ─────────────────────────────────────────────────────────────────────────────
// SANFONA DO FAQ  ·  Desbravando UTV  ·  página Grupo Avulso
//
// Cola no código DA PÁGINA. Não no masterPage.js — lá valeria para o site inteiro.
//
// O que resolve: repetidor conecta ao CMS mas não abre e fecha linha por linha; o
// Acordeão nativo abre e fecha mas não conecta ao CMS. Isto dá os dois.
//
// Comportamento:
//   · a primeira pergunta que TEM resposta já vem aberta;
//   · clicar numa linha fecha as outras — sanfona de verdade, uma por vez;
//   · o sinal alterna + / − ;
//   · pergunta SEM resposta não vira sanfona: sem sinal, sem clique. É de propósito —
//     item que não abre nada não deve parecer que abre. Hoje as 8 têm resposta DE TESTE,
//     justamente para dar o que clicar; quando as reais chegarem, nada muda no código.
// ─────────────────────────────────────────────────────────────────────────────

const FAQ_AVULSO = {
  repetidor: '#repeater2',
  linha: '#container2', // a caixa da linha — clique na linha inteira, melhor no celular
  pergunta: '#text85',
  resposta: '#text86',
  sinal: '#text87',
};

$w.onReady(function () {
  sanfona(FAQ_AVULSO);
});

/**
 * Transforma um repetidor ligado à coleção FAQ numa sanfona.
 *
 * @param {{repetidor:string, resposta:string, sinal:string, pergunta:string, linha?:string}} ids
 */
function sanfona(ids) {
  const rep = $w(ids.repetidor);

  if (!rep || typeof rep.onItemReady !== 'function') {
    // acontece se o ID mudou no Editor; imprime os que existem para não caçar
    let lista = [];
    try { lista = $w('Repeater').map((r) => r.id); } catch (e) { /* nenhum */ }
    console.warn('FAQ: não achei ' + ids.repetidor + '. Repetidores nesta página: ' + lista.join(', '));
    return;
  }

  rep.onItemReady(($item, dados, indice) => {
    const resposta = $item(ids.resposta);
    const sinal = $item(ids.sinal);
    const gatilho = ids.linha ? $item(ids.linha) : $item(ids.pergunta);

    // `resposta` é texto rico: vazio costuma vir como "<p></p>" ou "&nbsp;", não como "".
    // Sem tirar as tags antes, toda pergunta pareceria ter resposta.
    const texto = String(dados.resposta || '').replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
    const temResposta = texto.trim().length > 0;

    // sem resposta não há o que abrir: some o sinal e não liga o clique
    if (!temResposta) {
      resposta.collapse();
      sinal.text = '';
      return;
    }

    // a primeira já vem aberta — é o que o desenho mostra
    if (indice === 0) {
      resposta.expand();
      sinal.text = '−';
    } else {
      resposta.collapse();
      sinal.text = '+';
    }

    gatilho.onClick(() => {
      // ⚠️ ler ANTES do forEachItem: o laço abaixo fecha tudo, inclusive esta linha,
      // e aí `collapsed` já não diz mais o que o usuário queria. Ler depois faz o
      // clique não abrir nunca — é o bug clássico deste padrão.
      const vaiAbrir = resposta.collapsed;

      rep.forEachItem(($outro) => {
        $outro(ids.resposta).collapse();
        // não devolve o "+" para quem não tem resposta
        if ($outro(ids.sinal).text !== '') $outro(ids.sinal).text = '+';
      });

      if (vaiAbrir) {
        resposta.expand();
        sinal.text = '−';
      }
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// PÁGINA DA EXPEDIÇÃO — dois repetidores
//
// Lá são duas listas: "sobre esta expedição" e "dúvidas gerais". IDs são únicos por
// página, então o segundo conjunto sai numerado pela Wix. Confira os IDs reais no
// Editor e chame a função duas vezes:
//
// $w.onReady(function () {
//   sanfona({ repetidor:'#repeater1', linha:'#container1', pergunta:'#text85',  resposta:'#text86',  sinal:'#text87'  });
//   sanfona({ repetidor:'#repeater2', linha:'#container2', pergunta:'#text851', resposta:'#text861', sinal:'#text871' });
// });
//
// ─────────────────────────────────────────────────────────────────────────────
// SE A RESPOSTA DEIXAR BURACO BRANCO ao fechar: ela está IRMÃ do container2, não
// DENTRO dele. Arraste para dentro no painel de camadas. É o único erro de montagem
// que este código não contorna.
// ─────────────────────────────────────────────────────────────────────────────
```

#### Por que assim, e não do jeito óbvio

**`collapse()` e não `hide()`.** `hide` deixa o espaço vazio reservado; `collapse` tira do
fluxo e a lista encosta. Em sanfona é sempre `collapse`.

**A leitura de `resposta.collapsed` vem antes do `forEachItem`.** Se ler depois, o próprio
laço já fechou a linha clicada e ela nunca abre — clica e nada acontece. É o bug clássico
deste padrão.

**Pergunta sem resposta não recebe `onClick`.** Sai da função antes. Hoje isso vale para 7
das 8 perguntas: elas aparecem como lista simples, sem sinal e sem clique, até a resposta
chegar. Quando chegar, passa a abrir sozinha — sem tocar no código.

**O sinal usa `−` (menos de verdade), não hífen.** Em Anton o hífen fica curto demais e
desalinha do `+`.

#### Conferir

- [ ] A primeira pergunta abre já aberta, com a resposta visível
- [ ] Clicar em outra fecha a primeira — só uma aberta por vez
- [ ] Clicar na aberta fecha ela, e nenhuma fica aberta
- [ ] Todas as **6** do Grupo Avulso abrem — hoje todas têm resposta, é o teste
- [ ] *(depois de limpar o teste)* as sem resposta não mostram sinal e não clicam
- [ ] Nada de buraco em branco onde a resposta estava — se houver, a resposta não está
      dentro da caixa da linha
- [ ] Na página da expedição, os **dois** repetidores funcionam de forma independente

---

### 4.5 · A agenda do Grupo Avulso — passo a passo

É o repetidor mais importante do projeto: é ele que liga uma página na outra. Faça este
primeiro, porque é o mais simples dos quatro e ensina o movimento.

**Onde ele entra:** dentro da seção `agenda`, entre o fio forte de cima e o de baixo.

#### Passo 1 · o dataset

No Editor, **+ Adicionar → CMS → Conjunto de dados** (*Dataset*). Ele não aparece no site,
só no Editor. Configure:

| Campo | Valor |
|---|---|
| Coleção | `Expedicoes` |
| Modo | Somente leitura |
| Filtro | `publicado` **é** `sim` |
| Ordenar | `dataInicio` **crescente** |
| Itens a exibir | 20 |

> ⚠️ **A agenda vai aparecer VAZIA** — `publicado` está `FALSE` em todas as 5 expedições.
> Isso é o esperado. Para montar, troque o filtro temporariamente: remova o filtro de
> `publicado`, monte com os dados aparecendo, e **devolva o filtro antes de publicar**.
> Anote isso, é o esquecimento mais fácil desta parte.

#### Passo 2 · o repetidor

**+ Adicionar → Listas e grades → Repetidor**. Escolha o layout mais simples (uma coluna,
itens empilhados). Depois:

- **Conecte** o repetidor ao dataset que você criou;
- ajuste para **1 item por linha**, sem espaço entre itens (o fio de cada linha já separa);
- apague os elementos de exemplo que a Wix coloca dentro.

#### Passo 3 · o conteúdo de UM item

Monte a linha do índice **uma vez**, dentro do item do repetidor. São 11 elementos — a
peça **V8** do vocabulário.

> **Se a linha já está montada e falta conectar:** o movimento está em **4.0b · O gesto
> de conectar**. Resumo: conecte o **repetidor ao dataset primeiro**, e só depois cada
> elemento de dentro ao seu campo. Fazendo na ordem inversa, todas as linhas mostram o
> mesmo valor.

Da esquerda para a direita:

| # | Elemento | Conectar ao campo |
|---|---|---|
| 1 | número em `mono`, cinza fraco, largura 40 | *nada* — ver a nota abaixo |
| 2 | foto **208 × 138** | **`fotoCapa`** — não `galeria`; Imagem não conecta em galeria de mídia |
| 3 | nome do destino em `índice` (Anton 44), caixa alta | `titulo` |
| 4 | coluna: UF em `corpo` 15 | `uf` |
| 5 | ↳ e **formato** em `corpo pequeno` cinza | `formato` |
| 6 | coluna: datas | `dataInicio` e `dataFim` |
| 7 | ↳ e status | `situacao` |
| 8 | mola — empurra a seta para a direita | — |
| 9 | ícone de seta 20 × 20 tinta | — |
| 10–11 | o fio leve embaixo e a caixa da linha | — |

> **O número (01, 02, 03…) não vem do CMS.** Não existe campo de posição em `Expedicoes`,
> e não deveria: a ordem muda quando entra expedição nova. Duas saídas: deixe o número
> fora (o desenho aguenta) ou use a numeração automática do repetidor, se a sua versão do
> Editor oferecer. Não crie um campo `ordem` só para isso — vira manutenção manual.

#### Passo 4 · a ligação que faz o site funcionar

Esta é a razão de tudo. Selecione **o item do repetidor** (a caixa inteira, não um texto
dentro) e:

**Conectar ao CMS → Link → escolha o link da página dinâmica de `Expedicoes`.**

Na lista de campos vai aparecer algo como *"Expedições (Título)"* — é o endereço da página
dinâmica, não um campo comum. Selecionando isso, **cada linha passa a abrir a página da
sua própria expedição**. Clicar na Costa Doce vai para `/expedicoes/costa-doce`.

Se preferir, pode ligar só a seta em vez da linha inteira — mas a linha inteira clicável é
melhor no celular.

#### Passo 5 · conferir

- [ ] Aparecem 5 linhas (com o filtro de `publicado` temporariamente fora)
- [ ] Cada nome de destino é o certo, e a foto acompanha
- [ ] A quarta coluna mostra o **formato** — Casais e Família, Família, Só Homens
- [ ] Clicar numa linha abre a página daquela expedição
- [ ] **O filtro `publicado` é `sim` voltou**

---

### 4.6 · O resto das ligações

**Home → Grupo Avulso.** O card `GRUPO AVULSO` (botão "Ver próximas expedições") aponta
para `/expedicoes`. É link fixo, não CMS.

**Home → Grupo Fechado.** O card `GRUPO FECHADO` ("Solicitar orçamento") aponta para a
página do Grupo Fechado — que ainda não existe. Deixe o link vazio e anote.

**Home → carrossel de destaques.** Pro Gallery em modo slider ligada a `Destaques`,
filtrada por `ativo` é `sim`, ordenada por `ordem`. Cada item usa `etiqueta`, `titulo`,
`texto`, `rotuloBotao` e `link`.

**Índice do Guia → seções.** Cada categoria do índice rola até a sua seção: âncora
nativa, sem código.

**Índice do Guia → FAQ.** A entrada "Perguntas frequentes" do índice **não é linha da
tabela `Guia`** — é uma âncora que rola até o módulo de FAQ, logo abaixo.

**Barra fixa de reserva (celular).** Só na página da expedição. "Fixar na tela" no Editor
clássico, posição fixa no Studio. O texto dela vem de `situacao` e o botão repete o
`linkCheckout`.

---

### 4.7 · Antes de dar por pronta

- [ ] Trocar o item no seletor da prévia e conferir **três expedições diferentes** — é o
      teste real da página dinâmica
- [ ] Roteiro em ordem de dia, hospedagens em ordem, guia completo
- [ ] FAQ mostrando as 2 específicas **e** as 6 gerais
- [ ] Botão principal com texto do CMS e link do CMS
- [ ] Agenda do Grupo Avulso abrindo a página certa ao clicar
- [ ] Endereço saindo bonito: `/expedicoes/costa-doce`
- [ ] **Redirecionar** as URLs de expedição que estão no ar hoje para as novas

> O teste que vale mais que todos: peça para alguém da equipe **cadastrar uma expedição
> nova** e ver se a página aparece sozinha. Se aparecer, o site parou de envelhecer. Se
> travar, algum campo ficou confuso e vale ajustar antes de seguir.

---

# Parte 5 · Mobile

Se o projeto estiver no **Studio**, esta parte é ajuste de breakpoint: você reordena e
troca os tamanhos pelo tema mobile da tabela em 0.5. Se estiver no **Editor clássico**, é
remontagem — e é o pedaço mais longo do projeto.

As três telas mobile estão desenhadas em 390px: `M1 · Home`, `M2 · Página da Expedição`,
`M3 · Grupo Avulso`. Recuo lateral **20px** em tudo.

### O que muda de verdade no celular

| Módulo | No celular |
|---|---|
| `nav` | altura **58**, ícone de menu à esquerda, marca ao centro (altura 22), PT\|EN à direita |
| Cards de formato | **um embaixo do outro**, recuo 22, separados por fio leve no topo |
| Galeria | carrossel com a **próxima foto espiando**: primeira com largura 300, a seguinte esticando no que sobra, espaço 8 — foi pedido explícito |
| Roteiro | a linha de meta (`data · local · km`) **vira uma linha só que quebra**, em vez de disputar espaço com a km |
| Incluso | **uma coluna** só, e a contagem sobe para cima da sobrelinha |
| Hospedagem | o texto do hotel desce para baixo do nome; galeria com **duas fotos** + a espiada |
| Reserva | os dois valores lado a lado em cima, condições embaixo, botão na largura toda |
| Agenda | vira card: foto **210** de altura, depois `UF · duração · formato`, nome em `índice` (Anton 27), datas, status e `VER EXPEDIÇÃO →` |
| Comunidade | preta e centrada, igual ao desktop, em escala menor |
| Rodapé | marca ao centro, links numa linha que quebra, ícones ao centro |
| Barra fixa | **só na página da expedição**: altura 82, fundo preto, fase comercial à esquerda e botão de 176px à direita — fixada no rodapé da tela |

> **Sobre a barra fixa no material de aprovação.** No arquivo de design ela aparece
> **antes** do rodapé, com a anotação `▼ BARRA FIXA · ACOMPANHA A ROLAGEM DA PÁGINA`.
> Isso existe só para o PDF: quando ela vinha depois do rodapé, lia como um botão solto
> encerrando a página — e foi assim que o cliente entendeu, pedindo para "remover os
> botões de ação do rodapé". **A anotação não vai para o site.** Na Wix a barra é
> posição fixa e não tem lugar no fluxo da página.

### Ordem de trabalho

Faça o mobile **de uma página por vez, logo depois de terminar o desktop dela**. Não
deixe as três para o fim: você perde o contexto e refaz decisões.

---

# Parte 6 · Duas pendências de fora do Editor

A Parte 4 já cobriu as ligações. Sobraram duas que não são de montagem.

### 6.1 · ⚠️ Não existe nenhum evento no Wix Events

Descoberto ao testar a API em 08/08: a conta tem o Wix Events instalado, mas **zero
eventos cadastrados**.

Isso importa porque o plano assume o Wix Events como caixa registradora: o botão principal
leva para lá, e é lá que a **categoria de quarto vira tipo de ingresso** — que foi como
resolvemos o pedido de tirar a escolha de acomodação da página.

Se a venda hoje acontece por outro caminho, essa peça muda. **Antes de ligar o
`linkCheckout`, confirmar como as vagas são vendidas.**

### 6.2 · PT | EN

App **Wix Multilingual**. Está fora do cabeçalho de propósito — a forma de fazer a
tradução vai mudar, e o controle entra quando isso estiver decidido.

A assinatura `Ready to welcome riders from around the world.` **não se traduz** — fica em
inglês nas duas versões.

---

# Parte 7 · Armadilhas

**A1 · Anton não tem negrito.** Só existe o peso 400. Se a Wix "engordar" o título, é
falso-negrito e fica sujo. Confira que o peso está travado em 400 nos estilos de título.

**A2 · A largura de conteúdo padrão da Wix é 980px.** O projeto é 1200. Troque na
primeira seção que montar, antes de posicionar qualquer coisa.

**A3 · Não use o elemento "Divisor" para os fios.** Ele tem margem própria. Use caixa com
altura 1 ou 2 e fundo.

**A4 · Não embuta o HTML da v3 num elemento de código.** Funciona na tela e quebra tudo o
mais: vira iframe, o cliente não edita, o CMS não alimenta, o Google não lê.

**A5 · Suba as fotos no dobro do tamanho de exibição.** A Wix recomprime. Foto de 208×138
sobe em 416×276.

**A6 · Caixa alta é digitada, não é efeito.** A transformação automática da Wix se
comporta diferente entre desktop e mobile.

**A7 · Repetidor mostra um desenho só.** Campo que pode vir vazio — `km` no roteiro,
segunda hospedagem, `subtitulo` — precisa de regra de esconder-quando-vazio, item a item.

**A8 · No Editor clássico, esconder no celular é por elemento.** Elemento escondido no
mobile continua existindo e pesando no carregamento.

**A9 · Não cole texto do Word.** Entra HTML junto e a tipografia do tema morre. Cole como
texto puro.

**A10 · Publique com `publicado` desligado** até os valores da Costa Doce chegarem. A
página existe, não aparece.

---

# Parte 8 · Conferência antes de publicar

- [ ] Nenhum título com falso-negrito
- [ ] Todo fio forte tem par (abre e fecha a lista)
- [ ] Nenhuma cor fora da paleta — sem azul, sem verde
- [ ] Sobrelinhas em caixa alta com espaçamento +3
- [ ] Cards de formato **sem imagem**
- [ ] Roteiro **sem imagem**
- [ ] As duas hospedagens no mesmo módulo
- [ ] Nenhuma escolha de quarto na página da expedição
- [ ] Rodapé sem telefone
- [ ] Agenda mostrando **formato**, não nível
- [ ] Galeria em carrossel de uma foto, com espiada no celular
- [ ] Barra fixa só na página da expedição, só no celular
- [ ] Teste em aparelho real, não só no simulador do Editor
- [ ] Redirecionamentos das URLs antigas
- [ ] `publicado` na posição certa

---

## O que ainda depende do cliente

| O quê | Trava o quê |
|---|---|
| Valor por pessoa, por casal, sinal, saldo, política para crianças, cancelamento | publicar a Costa Doce |
| Documento do **Grupo Fechado** | a quarta tela |
| Arte do logo **Can-Am** | o bloco de parceiros |
| Confirmação de plano (CMS, fontes, Multilingual) | começar |
| Acesso de administrador | começar |
