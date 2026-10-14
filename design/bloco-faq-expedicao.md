---

### 4.4c · 🔨 Montar o FAQ da página da expedição — passo a passo

Mesmo funcionamento do Grupo Avulso, mas **por expedição**. São **duas listas**, e a razão é
técnica: um dataset de página dinâmica **não filtra "referência = esta OU referência vazia"**
numa tacada. As gerais têm `expedicao` vazio de propósito, para valerem em toda expedição.

**O CMS já está pronto** — `node design/faq-por-expedicao.mjs --preencher`, rodado em 12/08:

| Expedição | próprias | gerais | total na página |
|---|---|---|---|
| Costa Doce · Urubici · Canastra · Visconde · Macaé | **3** | 6 | **9** |

As três próprias são as que **realmente mudam de destino para destino**: nível de
dificuldade, combustível e melhor época. As de regra do negócio — cancelamento, criança,
acompanhante — ficam em `geral`, escritas uma vez.

> ⚠️ As respostas próprias das 4 expedições além da Costa Doce estão marcadas
> **[PROVISÓRIO]**. `node design/faq-por-expedicao.mjs --limpar` remove todas.

---

#### Passo 1 · os dois datasets

`+ Adicionar → CMS → Conjunto de dados`, duas vezes:

| | 1º — *Sobre esta expedição* | 2º — *Dúvidas gerais* |
|---|---|---|
| ID | **`datasetFaqExp`** | **`datasetFaqGeral`** |
| Coleção | `FAQ` | `FAQ` |
| Modo | Somente leitura | Somente leitura |
| Filtro | `ativo` é `sim` · `escopo` é `expedicao` · **`expedicao` é o item atual da página dinâmica** | `ativo` é `sim` · `escopo` é `geral` |
| Ordenar | `ordem` **crescente** | `ordem` **crescente** |
| Itens a exibir | 20 | 20 |

> **`expedicao` · "item atual da página dinâmica"** é a opção que só existe em página
> dinâmica — é ela que amarra a lista ao destino que o visitante está vendo.

> **Ordenação:** crescente, à mão. O dataset da Wix devolve o mais recente primeiro, e isso
> já morde duas vezes neste projeto. Ver C3.

---

#### Passo 2 · o cabeçalho do bloco

Caixa de largura **780**, espaço **14**:

| Texto | Fonte | Tam. | Cor |
|---|---|---|---|
| `DÚVIDAS` | Archivo 600, espaçamento 3px, MAIÚSCULAS | 11 | `#717171` |
| `PERGUNTAS FREQUENTES` | **Anton** | 48 | `#111111` |

---

#### Passo 3 · a primeira lista

**Rótulo** — texto `Sobre esta expedição`, Archivo **11** peso 600, espaçamento 3px,
MAIÚSCULAS, cor `#717171`. **ID `textRotuloFaqExp`.**

Abaixo dele, **fio forte** de 2px `#111111`, e o repetidor.

**Repetidor de uma coluna**, ligado ao `datasetFaqExp`.

> **Ligue o repetidor ANTES dos elementos de dentro.** Elemento dentro de repetidor herda o
> dataset do repetidor — sem isso o painel só oferece os campos de `Expedicoes`. Foi o erro
> nº 1 no roteiro; está detalhado na 4.3.

**Dentro do item**, 4 elementos:

| # | Elemento | Fonte | Tam. | Cor | Conectar a |
|---|---|---|---|---|---|
| 1 | a caixa da linha | — | — | recuo 22 | — |
| 2 | a pergunta | Archivo **700** | 17 | `#111111` | **`pergunta`** |
| 3 | a resposta | Archivo 400 | 16 | `#717171` | **`resposta`** |
| 4 | o sinal `+` | Anton | 24 | `#717171` | *nada* — o código escreve |

Fio leve de 1px `#D9D9D9` embaixo da caixa. Fio forte de 2px fecha a lista, **fora** do
repetidor.

> **Não precisa nomear ID nenhum.** O `tudo.js` acha os elementos por **tipo** e pelos
> **dados**: o texto que só tem `+` é o sinal, e o texto cujo conteúdo bate com o campo
> `resposta` é a resposta. Só monte e conecte os dois campos da tabela.

> 🛑 **A resposta tem que estar DENTRO da caixa da linha**, não irmã dela. Se ficar irmã, o
> `collapse()` deixa um buraco branco no lugar. É o único erro de montagem que o código não
> contorna.

> **O sinal é TEXTO, não ícone.** O código troca o caractere entre `+` e `−`. Use o sinal de
> menos de verdade (`−`), não hífen — em Anton o hífen fica curto e desalinha.

---

#### Passo 4 · a segunda lista

**Idêntica**, com o rótulo `Dúvidas gerais` e ligada ao `datasetFaqGeral`.

Atalho: monte a primeira, **salve o item na biblioteca** e reaproveite. Como não há IDs para
acertar, é copiar e trocar o dataset — mais nada.

A ordem na tela é: **primeiro o que é daquele destino, depois o que vale para todas.** Não é
capricho — quem abre a página de um destino quer o específico primeiro.

---

#### Passo 5 · o código

É o **`tudo.js`**, logo abaixo — o mesmo arquivo que resolve os cartões da agenda. O
tutorial de como aplicar vem depois dele.

**A primeira pergunta de cada lista abre sozinha**, e as duas listas são independentes:
abrir numa não fecha a outra.

---

#### Passo 6 · conferir

- [ ] **Costa Doce**: 3 perguntas em *Sobre esta expedição* + 6 em *Dúvidas gerais* = 9
- [ ] A primeira das próprias vem **aberta** com `−`; todas as outras fechadas com `+`
- [ ] Clicar numa fecha a que estava aberta — **uma por vez**, em cada lista
- [ ] As duas listas são **independentes**: abrir nas gerais não fecha nas próprias
- [ ] Trocar para o **Urubici**: as 3 próprias mudam (serra, São Joaquim, geada), as 6 gerais
      ficam iguais
- [ ] Nenhum **buraco branco** onde uma resposta fechou
- [ ] No console, se alguma lista vier vazia:
      `FAQ: sem perguntas próprias nesta expedição → rótulo e lista recolhidos`
