# design/ — fonte da repaginação

O `.pen` é gerado por código, não editado à mão. São 2.600 nós; manter isso em JSON
cru seria insustentável e impossível de revisar.

```
lib/pen.mjs          helpers do formato .pen (frame, texto, ícone, fill, stroke…)
lib/tokens.mjs       cores, tipografia, grade, raios
lib/componentes.mjs  nav, botão, chip, cards, seção, rodapé, versões mobile
lib/dados.mjs        conteúdo — marca o que é real e o que é exemplo
telas/*.mjs          uma tela por arquivo
gerar.mjs            monta desbravando-repaginacao.pen
validar.mjs          confere contra o vocabulário real do formato
previa.mjs           renderiza PNG em ../previa e acusa estouro de layout
```

## Fluxo

```bash
node design/gerar.mjs      # regera o .pen  (trava se o canvas foi editado — ver abaixo)
node design/validar.mjs    # tem que dizer "nenhum erro"
node design/previa.mjs     # PNGs + aviso de layout e contraste (precisa do PLAYWRIGHT_BROWSERS_PATH)
```

## ⚠️ Quem é a fonte da verdade

O gerador serviu para **nascer** o arquivo: 2.607 nós que ninguém posicionaria na mão.
A partir do momento em que alguém abre o `.pen` no canvas do pen.dev e arrasta a
primeira coisa, **o canvas passa a ser a fonte da verdade** — o código aqui fica para
trás e regenerar apagaria o trabalho.

Por isso o `gerar.mjs` tem trava: se o `.pen` for mais novo que os fontes, ele **não
escreve**, faz uma cópia `.backup.pen` e explica. Para jogar o canvas fora de propósito:
`node design/gerar.mjs --forcar`.

**Mudança em massa depois que o canvas virou a verdade** (trocar a fonte, mexer no
respiro de todas as seções, renomear um token) **não se faz regenerando** — se faz com
uma *transformação*: um script que lê o `.pen` existente, altera só o que foi pedido e
grava de volta, preservando tudo o que foi ajustado à mão.

## ⛔ `icon_font` não renderiza — use nó `path`

**A armadilha que custou mais caro.** Um único nó `icon_font` deixa o canvas inteiro em
branco: não é o nó que some, é o documento que não desenha. Sem mensagem de erro.

Causa: a extensão **não traz nenhuma fonte do lucide embutida** (só a `pencil.woff`
dela mesma). O `icon_font` depende de buscar essa fonte, o webview do VS Code bloqueia,
e o render morre junto. Confirmado por bisseção: arquivo só com `icon_font` fica em
branco; o mesmo arquivo com o ícone como `path` desenha. O arquivo de boas-vindas da
própria extensão nunca usa `icon_font` — desenha a seta dele com `path`.

Solução: `lib/icones.mjs`. Ele lê os SVGs do lucide em `.cache-icones/` e devolve um nó
`path` com a geometria embutida — sem fonte, sem rede. A assinatura de `icone()` é a
mesma de antes, então as telas não mudaram.

Dois detalhes que quebram silenciosamente na conversão:
- **Juntar subpaths num `d` só**: um `m` minúsculo (moveto relativo) passa a contar a
  partir do fim do subpath anterior e desloca o desenho.
- **Não adianta trocar `m` por `M`**: os pares de números após um moveto são linetos
  implícitos que herdam o caso do comando — virariam absolutos e deformariam o traço.
  O certo é reancorar com `M0 0` e manter o `m` relativo.

Outras coisas que **funcionam** (testadas): raiz sem `height`, gradiente, `stroke` com
espessura por lado, Anton, `rectangle`, 2.600+ nós. E **foto remota não quebra** o
render — ela só não carrega (o webview bloqueia a URL). Foto em base64 aparece.

## Notas do formato .pen (aprendidas lendo as libs da extensão)

- Auto-layout igual Figma: `layout: "vertical" | "horizontal" | "none"`, `gap`,
  `alignItems`, `justifyContent`. Omitir `width`/`height` = hug contents.
- `justifyContent` usa **underscore**: `space_between`, não `space-between`.
- **`padding` é um número só, igual nos quatro lados.** Numa barra de altura travada
  (`height: 76`), `padding: 120` joga o conteúdo pra fora. Por isso existe o helper
  `recuoH()`, que faz recuo lateral com espaçadores.
- Imagem é um tipo de `fill`: `{ type: "image", url, mode: "fill" }`.
- Ícones são `icon_font` com `iconFontFamily: "lucide"`.

## Sobre o previa.mjs

Não é o renderizador do pen.dev — é uma tradução do modelo para flexbox, que bate
quase 1:1. Serve para conferir o layout e gerar PNG para o cliente. Se algo parecer
estranho no editor e certo no PNG (ou o contrário), o editor é quem manda.

Uma advertência que ele emite é esperada: a faixa de âncoras do mobile passa da
largura da tela de propósito — ela rola na horizontal.
