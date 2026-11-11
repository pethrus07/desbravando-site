# Identidade Visual — Desbravando UTV

> Substitui o \`SPEC_MD\` que hoje viaja embutido no Estúdio de Briefing.
> Diferente do anterior, esta versão é a **fonte da verdade dos templates em código**
> (\`identidade.css\` + \`templates/\`), não só um texto descritivo. A arte é gerada
> renderizando esses templates — HTML/CSS nas dimensões exatas, com as fontes e os
> logos reais — para PNG/PDF. Fidelidade de designer, de forma reproduzível.

## Princípio

A marca tem **dois registros**. O \`SPEC_MD\` antigo documentava só o primeiro e tratava
"nenhuma cor" como regra absoluta — as artes reais mostram que não é.

- **Núcleo (P&B estrito).** Decks de expedição, proposta de patrocínio, guia, documentos.
  Preto e branco, sem nenhuma cor de destaque. A única cor, quando há, vem da fotografia.
- **Peças com cor (raro).** Redes sociais e eventos. **Mesmos ossos** (Anton, Archivo, pílulas,
  hierarquia), mas o P&B abre pra cor em duas situações — nunca por decoração:
  - **Acento da marca (raro):** quando a marca sai do P&B por conta própria, é **azul + verde** da casa.
  - **Evento:** a peça segue a **cor do evento** (a ação da Copa usou verde/amarelo do Brasil por ser o *evento* — não é a cor da marca).

Regra prática: na dúvida, é núcleo (P&B). Azul+verde só em peça de marca que precisa de cor, e raramente. Em evento, manda a cor do evento.

## Cores

**Núcleo**
- Fundo: preto sólido \`#000000\`. Foto de fundo recebe overlay escuro (gradiente) para legibilidade.
- Texto principal: \`#FFFFFF\`
- Texto secundário: \`rgba(255,255,255,.82)\`
- Sobrelinhas / labels: \`rgba(255,255,255,.55)\`
- Divisores: \`rgba(255,255,255,.13)\`
- Borda de pílula: \`rgba(255,255,255,.38)\`

**Acento da marca — raro** (marca saindo do P&B, sem ser evento)
- Azul \`#2F80ED\` · Verde \`#1FA35A\` — **valores iniciais; confirmar o hex exato no arquivo-fonte do logo.**
- Sem faixa/ornamento de evento. Aplica-se pela classe \`.tema-marca\`.

**Evento** (a cor é do evento, não da marca)
- A peça herda a paleta do evento da vez. Exemplo — ação Copa/Brasil: Verde \`#12A150\` · Amarelo \`#FFD200\` · Marcador \`#B6E400\`, mais a faixa diagonal do tema.
- Trocar os tokens \`--camp-*\` pela cor do evento.

**Onde a cor entra (nos dois casos):** uma ou duas palavras do título, sobrelinha, números das pílulas, marcadores quadrados de lista, barra/segmentos. O resto continua P&B.

## Tipografia

- **Títulos — Anton.** Caixa alta, \`line-height ~0.85\`, \`letter-spacing -0.5px\`.
  Hero (capa/encerramento) ~150px em 1920px; título de seção ~92px. Escala proporcional nos demais formatos.
- **Corpo, sobrelinhas, pílulas — Archivo.**
  - Corpo: peso 400, ~27px em 1920px, \`line-height 1.5\`, cor \`.82\`. Trechos de ênfase em **peso 700 branco**.
  - Sobrelinha / label: peso 600, ~20px, \`letter-spacing 6px\`, CAIXA ALTA, cor \`.55\`.
  - Subtítulo: peso 700 branco, ~34px.

## Logos

- **Desbravando** (branco com transparência): topo, à esquerda. ~60px de altura em 1080p; proporcional nos demais.
- **Can-Am** (patrocínio): capa e encerramento, canto inferior direito, **sempre** com a label
  \`PATROCÍNIO OFICIAL\` acima (Archivo 600, ~15px, \`letter-spacing 4px\`, caixa alta, cor \`.55\`).
  Não aparece na proposta de patrocínio (essa peça fala *com* marcas, não exibe patrocinador).

## Elementos

- **Pílulas.** Borda \`1.5px rgba(255,255,255,.38)\`, cantos \`999px\`, padding ~\`13×26px\`, Archivo 600.
  **Correção ao spec antigo:** o texto vai **como foi escrito** (ex.: "Urubici · SC",
  "Expedições guiadas") — *não* forçar caixa alta. No registro social, números vão na cor da campanha.
- **Listas.**
  - Núcleo: marcador **↗** branco à esquerda; rótulo forte (700 branco) + descrição \`.82\`.
  - Social: marcador **quadrado** na cor da campanha; rótulo em caixa alta.
- **Divisores:** linha \`1.5px\` em \`.13\`.
- **Barra / faixa de campanha (social):** segmentos verde/amarelo sob o título; faixa diagonal do tema no canto (desenhada em SVG).

## Fotos

- **Cor por preset (regra nova, tirada das artes):**
  - Expedição (interna/externa) → **foto colorida**.
  - Proposta de patrocínio / marca → **foto em P&B (dessaturada)** — a peça inteira fica monocromática.
- **Capa (full-bleed):** foto cobre tudo + overlay escuro (mais denso do lado do texto, à esquerda; base levemente escurecida) para legibilidade.
- **Lado a lado (texto_foto):** metade preta com o texto, foto na outra metade. A borda da foto voltada ao
  texto é **esfumaçada** (máscara em gradiente) fundindo no preto.
- **Foto contida:** cantos arredondados \`14px\`.
- **\`imagens_posicao\`:** respeitar a posição pedida por foto; sem indicação, usar o layout padrão do bloco.
- **\`sem_foto\`:** diagramar só com tipografia e elementos P&B (ver o slide de roteiro).

## Formatos

| Formato | Tamanho | Entrega | Observação |
|---|---|---|---|
| Apresentação | 1920×1080 (16:9) | PDF | uma seção por slide |
| Documento | A4 210×297mm | PDF | guia/institucional |
| Flyer / feed | 1080×1350 (4:5) | PNG | arte única |
| Card | 1080×1080 (1:1) | PNG | **derivado** do feed condensado |
| Stories | 1080×1920 (9:16) | PNG | uma tela por seção |

## Tom de voz

Curto, afirmativo, sem enrolação. Frases que contrastam e reposicionam ("Isso não é trilha.
É expedição."). Vocabulário de padrão, tribo e cuidado. Três vozes conforme a peça:

- **Expedição** (para o cliente final): experiência, família, "do check-in ao encerramento",
  "Você só vive a experiência. Do resto, a gente cuida.", "Isso não é passeio. É padrão Desbravando."
- **Patrocínio / marca** (para marcas): comunidade, alcance, ativação, "Sua marca na trilha.",
  "Isso não é trilha. É o padrão Desbravando."
- **Institucional / Can-Am** (didático): explica sem jargão, "o essencial numa olhada".

**Fórmula canônica (usar sempre que couber):** "Isso não é [X]. É o padrão Desbravando." / "É padrão Desbravando." — é assinatura da marca, não frase avulsa.

**Naming:** sempre **"o Desbravando"**, no masculino ("o Desbravando", "o padrão Desbravando", "o Desbravando UTV"). Nunca "a Desbravando".

Evitar: adjetivo vazio, promessa genérica, tom publicitário arrastado. Ser específico > ser esperto.

## Como isto vira arte

A identidade **é** o código. O fluxo fecha assim:

\`\`\`
reunião → briefing.json → mapeia o conteúdo no template do formato/preset → renderiza → PNG/PDF fiel
\`\`\`

- \`identidade.css\` — tokens e componentes dos dois registros.
- \`templates/\` — um arquivo por formato/registro (deck, patrocínio, social feed, social stories…).
- \`render.py\` — WeasyPrint (HTML/CSS → PDF) + PyMuPDF (→ PNG nas dimensões exatas).

## Notas de implementação

- **Fontes:** Anton e Archivo (Google Fonts). Os pesos estáticos do Archivo (400/600/700) foram
  gerados da fonte variável. Para embutir no app, os assets entram em base64 como o Estúdio já faz.
- **\`transform\` CSS não é suportado pelo renderizador** — centralizações e a faixa diagonal usam
  posição explícita / SVG. Manter esse padrão ao criar novos templates.
- **Pontos \`TODO(identidade)\` do modo reunião** (branch \`feat/modo-reuniao\`): o placeholder da caixa
  de briefs e o texto do banner devem adotar a voz acima (registro de expedição).


---

## Logo oficial 2026 (11/11/2026)

**Logo oficial 2026 = montanha · filete · #DESBRAVANDOUTV**, do arquivo que o Pedro mandou em 11/11/2026 (`estudio-briefing-desbravando-utv/artes/marca/logo-oficial-2026.png`, branca com transparência; original em `logo-oficial-2026-original.png`; só o símbolo em `logo-oficial-2026-montanha.png`). A montanha desse arquivo é um desenho NOVO, mais achatado (largura 3,98× a altura) que o vetor antigo (`logo-montanha*.svg` e `logo-lateral.svg`, 2,64×), e a fonte do #DESBRAVANDOUTV também mudou. O lockup com DESBRAVANDO UTV embaixo está aposentado. Pendente: vetorizar a montanha nova; até lá os templates de impressão seguem no vetor antigo.

A tabela abaixo é do vetor ANTIGO da montanha.

## A montanha em SVG (07/08/2026)

**Não existia SVG da marca.** O que o cliente tem é o PNG de 2300×813 que está no ar na
Wix — montanha em cima, letreiro embaixo, separados por uma faixa transparente.

`marca/vetorizar.mjs` gera o vetor a partir dele:

| Arquivo | Preenchimento | Quando usar |
|---|---|---|
| `logo-montanha.svg` | `currentColor` | **o padrão** — herda a cor do texto do container |
| `logo-montanha-preto.svg` | `#111111` | quando não dá para herdar cor |
| `logo-montanha-branco.svg` | `#FFFFFF` | sobre fundo escuro, quando não dá para herdar |

`viewBox="0 0 1000 379.21"` · **proporção 2,637 : 1** · 75 curvas de Bézier · 3,2 KB.

Para dimensionar, defina só a altura e deixe a largura automática:
`<svg style="height:26px;width:auto">`. Em 26px de altura a largura sai 68,6px.

**Como foi feito, se precisar refazer:** Chromium desenha o PNG num canvas e devolve o
canal alfa; marching squares **com interpolação** acha o contorno em precisão de
subpixel (usando o antisserrilhado da borda — traçar pixel a pixel daria escada);
Douglas-Peucker limpa; o algoritmo de Schneider ajusta as cúbicas.

⚠️ **A trava que não pode sair:** no ajuste de Bézier, quando o sistema de mínimos
quadrados fica mal condicionado ele devolve amplitudes enormes e o ponto de controle
dispara para fora do desenho. Sem o teto de 1,5× a corda, o traçado ganhava duas agulhas
saindo do pico e a caixa da marca inflava 6×. Está comentado em `vetorizar.mjs`.

O desenho foi conferido sobreposto ao PNG (`marca/_ver-svg.png`): coincide dentro de
1–2px numa largura de 900px, o que é subpixel nos tamanhos de uso (26 a 34px).
