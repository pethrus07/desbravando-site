# Repaginação do desbravandoutv.com

**Escopo:** melhorar layout e apresentação **dentro da Wix**. Não mexe em pagamento,
estrutura ou ferramenta — como ficou decidido na reunião de 28/07.

> "A gente não vai fazer nessa complexidade. Todos os pagamentos, tudo do jeito que
> tá lá, a gente só vai mexer em layout. (…) Modernizar esse layout, modernizar essa
> apresentação." — reunião de 28/07, 17h58

Entregável: `design/desbravando-repaginacao.pen` (abre no VS Code com a extensão pen.dev)
e as prévias em PNG na pasta `previa/`.

---

## 1. O que o site é hoje

Auditado em 01/08/2026, desktop e mobile, página por página (`auditoria-visual/`).

**Home.** Vídeo de capa, a frase "Mais do que uma marca, um estilo de vida" e três
caixas pretas com ícone de linha: Estoque, Expedições, Vestuário. Em nenhum momento
a página diz o que o Desbravando faz. Não tem quem somos, não tem expedição em
destaque, não tem prova. No celular, as três caixas pretas ocupam uma tela cada.

**Lista de expedições.** É a lista crua do Wix Events, com o título "Eventos futuros".
Quatro cards; **três deles dizem "Consulte nos para saber datas disponíveis"**. Não
tem preço, duração, dificuldade nem vagas. Não existe nenhuma explicação dos dois
formatos — grupo fechado e vaga avulsa.

**Página da expedição — o problema mais grave.** A página da 3ª Expedição Família
(Urubici) tem **12.105 px de altura no desktop e 15.003 px no celular**, e cerca de
**9.000 px são cinza vazio**: o campo "Sobre o evento" está em branco e empurra a
página inteira. Depois desse vazio o visitante cai direto numa tabela
"Tipo de ingresso / Preço / Quantidade" com valores de **R$ 19.500 a R$ 39.000** —
sem roteiro, sem mapa, sem o que está incluso, sem foto do destino, sem FAQ. É um
ticket de show vendendo uma viagem de trinta e nove mil reais.

**Grupo fechado.** Não existe. O pilar que o Desbravando mais quer vender não tem
uma linha no site.

**Off Road e Vestuário.** São lojas Wix padrão. Funcionam — 6 UTVs anunciados, de
R$ 119.900 a R$ 174.900 — mas não têm cara de item de desejo.

**Tipografia.** Tudo em Lato Light — inclusive os títulos grandes sobre foto, onde ele
simplesmente some. É a causa direta do maior problema de legibilidade do site. E não é
a fonte da marca: o guia manda **Anton** nos títulos, que é o peso que o logo já tem.

---

## 2. A dor, na fala do cliente

> "Eu preciso fazer um milhão de arte pra dar um milhão de informação que eu preciso
> da expedição. E isso não fecha a conta. (…) Costa Doce precisa estar em uma página.
> Todas as informações de Costa Doce precisam estar ali."

> "99% vai abrir pelo celular. A navegação pelo celular precisa ser foda. Não pode
> parecer que tá adaptado."

> "O agente não pode em nenhum momento perguntar isso. Todas as informações têm que
> estar dentro dessa página relacionada a Urubici."

Traduzindo: **a página do destino é a peça central.** Ela substitui as artes, alimenta
o atendimento e serve de fonte para o agente de WhatsApp.

---

## 3. Arquitetura proposta

Segue o desenho que você mandou no documento de arquitetura do site,
com a bifurcação grupo aberto / grupo fechado como espinha dorsal.

```
HOME
├── O que é o Desbravando
├── Próximas expedições (3 cards com data, vagas e "a partir de")
├── Os dois formatos
├── Off Road · Vestuário
└── Prova (depoimentos + fotos)

EXPEDIÇÕES (hub)
├── O que é uma expedição Desbravando
├── Como funciona (4 passos)
├── ► VAGA AVULSA          ► GRUPO FECHADO
├── O que está sempre incluso
└── FAQ

VAGA AVULSA → AGENDA 2026
└── PÁGINA DO DESTINO  ← a peça central
    hero · barra fixa de reserva · resumo em 6 tiles · sobre o destino ·
    roteiro dia a dia · hospedagem · incluso/não incluso · galeria ·
    como chegar · o que levar · FAQ · valores e reserva · depoimentos

GRUPO FECHADO
└── como funciona · para quem é · o que dá pra personalizar ·
    destinos · formulário de orçamento em 4 etapas
```

### A decisão que destrava tudo

**A página do destino é uma página normal da Wix — não a página do Wix Events.**

O Wix Events fica só como caixa registradora: o botão "Garantir vaga" leva ao evento
já existente, com o checkout que já está configurado e testado. É a única forma de ter
a página completa e bonita sem encostar em pagamento.

Efeito colateral bom: some o vazio de 9.000 px, porque a página deixa de depender do
campo "Sobre o evento" do app de eventos.

*A conferir:* o rodapé do painel de reserva no design diz "Pagamento processado pelo
Mercado Pago". Confirme com o cliente qual gateway está ligado na conta antes de
publicar essa linha.

---

## 4. O que muda no visual

Nada aqui é invenção. A base é o guia **"Identidade Visual — Desbravando UTV"** que já
existe embutido no Estúdio de Briefing (`SPEC_MD`). Cópia salva em
`marca/IDENTIDADE_VISUAL.md`, junto com o arquivo do logo.

O guia define **dois registros**: núcleo em P&B estrito (deck, proposta, guia,
documento) e peças com cor só em rede social e evento — onde a cor é *do evento*, não da
marca. A regra prática é do próprio guia: **na dúvida, é núcleo**. O site é núcleo.

> "Preto e branco, sem nenhuma cor de destaque. A única cor, quando há, vem da fotografia."

Conferido no arquivo do logo (2300×813 px): **100% dos pixels opacos são `#FFFFFF`.**
A marca não tem cor.

### A direção: V3 · Índice tipográfico

A primeira versão desta proposta virou o site inteiro preto, com título condensado
gigante sobre foto sangrando. **Foi descartada.** Ficou destoante do que o site é hoje —
parecia site novo, não repaginação — e é a fórmula mais batida que existe.

A direção escolhida é outra: **a página abre como um sumário, não como uma vitrine.**
Tipo grande, fio fino, dado tabulado, foto pequena e contida. **O fundo continua claro
(`#F2F2F2`, o mesmo de hoje)** e o preto vira **pontuação** — a nav, uma faixa de pausa
por página, o botão.

| | Hoje | Proposta |
|---|---|---|
| Fundo | cinza frio `#F2F2F2` | **o mesmo `#F2F2F2`**, com `#FFFFFF` nas faixas de leitura longa |
| Preto | três caixas soltas na home | **pontuação**: nav, uma faixa de pausa por página, botão sólido |
| Título | Lato Light | **Anton**, caixa alta, entrelinha 1,0, letter-spacing −0,5 |
| Texto | Lato Light | **Archivo** 400/600/700, entrelinha 1,55 |
| Número e rótulo de dado | — | **JetBrains Mono** — é o que dá cara de documento em vez de landing page |
| Cor de ação | não existe | **continua não existindo** — hierarquia por peso: botão preto sólido × contorno |
| Status de vaga | não existe | **etiqueta de texto com marcador**, não pílula colorida — o guia não permite cor de destaque |
| Foto | miniatura em card | **nunca sangra** — sempre contida e catalogada |
| Marcador de lista | — | **↗** (item de fora fica apagado, não vermelho) |
| Canto | arredondado | **reto** em quase tudo; só a pílula de filtro é redonda |

Escala de tipo: display 72 · índice 44 · H1 48 · H2 34 · corpo 16 · mono 12 ·
sobrelinha 11. No celular, display 38 e índice 27.

### O componente central: a linha do índice

É o que amarra o site inteiro — aparece na home, na agenda, no hub de expedições e nos
destinos do grupo fechado:

```
01 │ SERRA DA CANASTRA │ MG · 5 dias │ 26–30 AGO 2026 · Últimas vagas │ ▣ │ →
 nº      nome grande       colunas de dado tabulado          miniatura  seta
```

*Restrição registrada no arquivo:* as colunas de largura fixa precisam somar menos que
**1.148 px** (1.200 de conteúdo − padding). Nenhuma delas encolhe, então o excedente vaza
para fora da linha. O `previa.mjs` acusa esse estouro ao regerar os PNGs.

**O acento azul `#2F80ED` + verde `#1FA35A` existe no guia, mas é raro e não entra no
site.** Fica declarado como variável, desligado. Cor de evento (a ação da Copa usou
verde/amarelo do Brasil) é da campanha, não da marca.

**Voz.** O guia é explícito em dois pontos que o site precisa respeitar:
- **"o Desbravando"**, no masculino. Nunca "a Desbravando".
- A fórmula canônica **"Isso não é [X]. É o padrão Desbravando."** é assinatura da
  marca, não frase avulsa. Ela abre a home.

---

## 5. O que a Wix aguenta (e o que não)

**Aguenta, sem plugin:**
tipografia customizada — **Anton, Archivo e JetBrains Mono precisam ser enviadas como
fonte própria no editor** · faixas de largura total com foto contida · listas com fio e
hover · acordeão de FAQ · barra fixa (elemento fixado no scroll) · âncoras internas ·
formulário de múltiplas etapas (Wix Forms) · variantes de layout separadas para celular
no editor.

**Não aguenta bem — e por isso ficou de fora:**
filtro dinâmico da agenda (na proposta os filtros são visuais; com 4 expedições não
faz falta) · cálculo de vagas em tempo real · a página do Wix Events em si, que continua
rígida — por isso ela vira só checkout.

**Trabalho manual que continua existindo:** cada expedição nova é uma página nova.
Dá para clonar a de Urubici e trocar o conteúdo — mas alguém tem que trocar.
Isso não some com a repaginação; some só com o replatform, que ficou de fora.

---

## 6. O que precisa chegar pronto

O layout está de pé. O que falta é conteúdo, e isso ninguém faz no lugar de vocês.
A lista está também dentro do arquivo, na tela "00 · Sistema de design".

**Por expedição:** texto do destino (2 parágrafos) · roteiro dia a dia · km e
dificuldade · incluso / não incluso · aeroporto, distâncias e ponto de encontro ·
8 a 12 fotos boas · um vídeo · respostas do FAQ · foto de cada tipo de acomodação.

**Uma vez só:** texto de "o Desbravando" · números de prova (hoje estão de exemplo:
12 expedições, 340+ pilotos, 9 estados) · 4 a 6 depoimentos com nome · **logo em SVG**
(hoje só temos o PNG que está no ar) · **arte do Can-Am** para o selo de patrocínio ·
**confirmar o gateway ligado na conta Wix** · política de cancelamento · regras do
programa de membros.

---

## 7. O que é real e o que é exemplo no design

**Real, puxado do site no dia 01/08:** os 4 destinos e suas cidades · a data de Urubici ·
os 7 tipos de acomodação com os preços exatos (incluindo o Chalé Luxo esgotado) ·
os 6 UTVs do estoque com preço · o telefone e as redes · as fotos (as URLs apontam
para as imagens que já estão na conta Wix de vocês).

**Exemplo, a substituir:** roteiro dia a dia · km e dificuldade · textos de destino ·
listas de incluso · respostas do FAQ · depoimentos · números de prova.

---

## 8. Onde está a identidade

O guia de marca **não estava num manual solto** — ele vive embutido no Estúdio de
Briefing (`estudio-briefing-desbravando-utv/index.html`, constante `SPEC_MD`), porque
aquele projeto gera arte e precisa da identidade em código. Extraí e salvei em:

- `marca/IDENTIDADE_VISUAL.md` — o guia inteiro
- `marca/logo-desbravando-original.png` — 2300×813, branco com transparência

Não foi preciso ir ao Mini Drive. Fica o registro de que o `/list` de lá exige chave,
e que o guia diz que o hex exato do azul/verde deve ser confirmado no arquivo-fonte do
logo — o PNG que está no ar é só branco, então essa confirmação segue em aberto (e não
bloqueia nada, já que o site é P&B).

## 9. Como abrir

```
code C:\Users\olive\Projetos\desbravando-site\design\desbravando-repaginacao.pen
```

Precisa da extensão **pen.dev** (`highagency.pencildev`), já instalada.
As prévias em PNG estão em `previa/` — essas dá para mandar direto no WhatsApp.

Para mexer no design: os arquivos-fonte estão em `design/telas/` e `design/lib/`.
`node design/gerar.mjs` refaz o `.pen`, `node design/validar.mjs` confere o formato e
`node design/previa.mjs` regera os PNGs e aponta estouro de layout.
