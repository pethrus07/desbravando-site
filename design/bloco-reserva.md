> ### 💰 Este módulo é diferente dos outros — leia antes
>
> **Não conecte nada dele pelo painel do CMS.** Um código só preenche o bloco inteiro:
> valor, botão, link e condições. É um mecanismo, não dois — se metade viesse da conexão e
> metade do código, os dois brigariam pelo mesmo elemento.
>
> Por que assim, em uma linha: a venda é por **acomodação** (2 a 4 pessoas), não por pessoa,
> e três das quatro condições estão vazias hoje. Conexão de painel mostra campo vazio **em
> branco**; o código recolhe. Sem isso o bloco fica com buracos em 4 das 5 expedições.
>
> **O que já está pronto no CMS:**
>
> | Expedição | Valor exibido | Botão | Link |
> |---|---|---|---|
> | **Urubici** | A partir de R$ 19.500 | Reservar vaga | ✓ evento |
> | Macaé · Canastra · Visconde | *(vazio)* | Entrar na lista de espera | ✓ evento |
> | Costa Doce | *(vazio)* | Fazer pré-reserva | — |
>
> Os valores saíram dos **ingressos do Wix Events** — a Urubici tem 10 acomodações, de
> R$ 19.500 a R$ 39.000, e o tipo de ingresso **é** a acomodação. Nada foi digitado à mão.
>
> Quando mudar preço no Wix Events, um comando ressincroniza:
> `node design/wix-precos.mjs`

---

#### 🔨 Montar o bloco — 7 passos

**1 · A seção**

`+ Adicionar → Seção`. No painel dela:

| | |
|---|---|
| Fundo | **`#000000`** — preto puro, não `#111111` |
| Recuo em cima e embaixo | **84** |
| Largura do conteúdo | **1200** |

No painel de camadas, renomeie a seção para **`secaoReserva`**.

**2 · O cabeçalho** — caixa de largura **820**, espaço **14**, à esquerda:

| Texto | Fonte | Tam. | Peso | Cor | Extra |
|---|---|---|---|---|---|
| `RESERVA` | Archivo | 11 | 600 | branco **55%** | espaçamento **3px**, MAIÚSCULAS |
| `O INVESTIMENTO DA EXPEDIÇÃO` | **Anton** | 48 | 400 | branco | espaçamento **-0.4px** |

Texto fixo, os dois. Sem subtítulo.

**3 · Respiro** — caixa vazia, altura **44**. Sem ID.

**4 · O painel** — caixa que estica, espaço **0**. Dentro, nesta ordem:

**4a** · fio: caixa altura **2px**, largura 100%, fundo branco **16%**

**4b** · a linha do valor: caixa horizontal, recuo **40**, espaço **40**, alinhada ao
**centro**:

| Elemento | ID | Fonte | Tam. | Cor |
|---|---|---|---|---|
| rótulo | *(sem ID)* | JetBrains Mono | 10 | branco 55% |
| o valor | **`textValor`** | **Anton** | **56** | branco |
| mola | — | — | — | *(empurra o botão para a direita)* |
| botão | **`botaoReserva`** | Archivo 12 Bold, MAIÚSCULAS | altura **60** | texto preto, fundo branco |

O rótulo e o valor vão empilhados numa caixinha vertical, espaço **6**. O rótulo é **texto
fixo: `POR ACOMODAÇÃO`**.

> ⚠️ **O recorte mostra dois valores; monte um só.** `POR PESSOA` e `POR CASAL` com fio
> vertical entre eles não existe mais — não há preço por pessoa neste produto. **Sem o
> segundo valor, o fio vertical também sai.**

**4c** · a caixa de condições — ID **`boxCondicoes`**. Caixa vertical, recuo **40** nas
laterais, espaço **10**. Quatro textos, todos Archivo **13.5**, branco **82%**:

`textSinal` · `textSaldo` · `textCancelamento` · `textPagamento`

Digite qualquer coisa neles agora (ex.: `Sinal · exemplo`) só para conseguir posicionar —
o código sobrescreve.

**4d** · fio: igual ao 4a — altura **2px**, branco **16%**

**4e** · respiro **16** → a nota, Archivo **12**, branco **55%**, texto fixo:
*"A escolha da acomodação acontece na próxima etapa, depois de iniciar a reserva."*

**5 · Confira os 7 IDs**

Com o Modo Dev ligado, confirme que existem exatamente estes:

```
secaoReserva · textValor · botaoReserva · boxCondicoes
textSinal · textSaldo · textCancelamento · textPagamento
```

Se algum estiver diferente, **o console diz qual** quando você abrir a prévia — ele não
falha calado.

**6 · Cole o código**

O arquivo é `velo/reserva.js`. Cole no código **da página** e acrescente a chamada:

```js
$w.onReady(function () {
  // … as três sanfonas e os recolhimentos do expedicao.js …
  montarReserva();
});
```

**7 · Conferir na prévia**

Troque o item no seletor do topo:

| Expedição | O que tem que acontecer |
|---|---|
| **Urubici** | `A partir de R$ 19.500` · botão **Reservar vaga** abrindo o evento em aba nova · **1** linha de condição (Pagamento) |
| **Costa Doce** | a faixa preta **desaparece inteira** |
| **Macaé** | desaparece também — tem link, mas não tem valor |

No console, na Urubici:

```
Reserva: "Urubici" · A partir de R$ 19.500 · botão "Reservar vaga" · 1 de 4 condições
```

Se aparecer isso, o módulo está pronto para qualquer expedição futura.

> **Só 1 de 4 condições é o correto hoje.** `Sinal`, `Saldo` e `Cancelamento` estão vazios
> no CMS — quando o cliente preencher, aparecem sozinhos, sem voltar ao Editor.
