# Peças sociais geradas por código

Arte de rede social/WhatsApp renderizada a partir da identidade em código — mesma
ideia do `design/` do site, mas para peça única em vez de tela de site.

```
node design/social/render.mjs                  # toda edição × registro
node design/social/render.mjs setembro         # uma edição, nos dois registros
node design/social/render.mjs setembro nucleo  # uma peça só
```

Saída em `design/social/saida/` (PNG 1080×1350 + o HTML de cada peça, para conferência),
nomeada `cegonha-urubici-<edição>-<registro>.png`.

**Remarcar a expedição não mexe em layout:** as datas moram em `EDICOES`, no topo de
`pecas/cegonha.mjs`. Basta acrescentar uma edição — as duas janelas de entrega
(sexta/sábado) e o transporte, que é sempre o domingo seguinte.

- `lib/identidade.mjs` — os dois registros como tokens + a máscara que pinta o logo branco
- `lib/fontes.mjs` — Anton + Archivo reais, embutidas em base64 (usa o cache do `exportar.mjs`)
- `pecas/cegonha.mjs` — a peça "Carregamento da Cegonha" (Expedição Urubici)
- `render.mjs` — renderiza e **confere** antes de dizer que está pronto

O `render.mjs` não só gera: ele falha alto se a fonte da marca não carregou (fallback
silencioso arruína a fidelidade), se algum elemento vaza da arte, se algum texto fica
abaixo do contraste WCAG AA, ou se o PNG não sai na dimensão exata.

## Divergência de identidade encontrada (precisa de decisão)

A **imagem base** usada como referência (tabela de preços) é **azul-marinho + verde-limão**.
Essa paleta **não existe** no guia (`marca/IDENTIDADE_VISUAL.md`) nem em nenhum lugar do
código — procurei em `desbravando-site`, `estudio-briefing-desbravando-utv`,
`minidrive-desbravando-utv` e `eventos-desbravando-utv`. O guia registra só:

| Registro | Paleta | Uso |
|---|---|---|
| Núcleo | P&B estrito | deck, proposta, guia, documento, site |
| Acento da marca (raro) | azul `#2F80ED` + verde `#1FA35A` | marca saindo do P&B |
| Evento | a cor **do evento** | ex.: Copa usou verde/amarelo do Brasil |

Marinho + limão não é nenhum dos três. Duas leituras possíveis, e **a escolha é do Pedro**:

1. **O guia está desatualizado** — marinho+limão é a cara real da marca em social, e o guia
   (que foi extraído do `SPEC_MD` do Estúdio) nunca registrou isso. Nesse caso é preciso
   promover a paleta a token oficial, com hex vindos do arquivo-fonte.
2. **A imagem base está fora do padrão** — foi peça de fornecedor/terceiro que não seguiu o
   guia. Nesse caso a peça correta é a do núcleo.

Por isso a arte foi gerada **nos dois registros**, do mesmo template: `NUCLEO` é o padrão
do Estúdio; `EVENTO` reproduz a imagem base. Trocar é mudar de tema, não redesenhar.

Dois detalhes que reforçam a dúvida:

- **O logo do repo tem 100% dos pixels opacos em `#FFFFFF`.** Na imagem base ele aparece em
  verde-limão — ou seja, circula uma versão colorida do logo que **não está no repositório**.
  Aqui ele é pintado por máscara CSS a partir do arquivo branco, então sai em qualquer cor
  sem precisar de um segundo arquivo.
- **Os hex `#151E5F` / `#A2D62E` foram estimados a olho** da imagem colada no chat — o PNG
  não está no disco, então não deu para amostrar pixel. Se o arquivo for salvo em
  `marca/`, dá para acertar os valores exatos.

## Decisões de conteúdo sobre o briefing

- **Os emojis (📅 🕗 🚛) não entraram na arte.** O guia pede "evitar excesso de elementos
  gráficos" e a marca tem marcador próprio (quadrado no social, ↗ no núcleo).
- **Sem endereço da sede** — o briefing não informou, e não se inventa dado de cliente.
- **"o Desbravando"** no masculino, como manda o naming.
- **Datas conferidas:** em 2026, 21/08 é sexta, 22/08 é sábado e 23/08 é domingo — o
  briefing está consistente.
- O "ou" entre as duas janelas virou elemento de layout, para não se ler como se fossem
  duas entregas obrigatórias.
- Fecho com a voz de expedição ("Você só vive a experiência. Do resto, a gente cuida."),
  que é literalmente o assunto: o participante entrega o UTV e não precisa ficar.
