---

## Onde se preenche o valor, e onde se acompanha os ingressos

São **dois lugares diferentes**, e é de propósito. Vale entender a divisão antes de mexer.

| | Onde vive | Quem mexe | O que é |
|---|---|---|---|
| **o número que a página mostra** | CMS → `Expedições` → **Valor exibido na página** | quem cuida do site | uma frase curta, ex. `A partir de R$ 19.500` |
| **os ingressos e o dinheiro** | Wix Events → o evento → **Ingressos** | quem cuida da venda | cada acomodação, com preço, limite e vendas |

A página **não** lê os ingressos. Ela lê o campo do CMS. Os dois se encontram por um
comando que sincroniza — está no fim desta seção.

---

### 1 · Preencher o valor que aparece na página

**Caminho:** painel do site → **CMS** → **Expedições** → a linha da expedição → coluna
**Valor exibido na página**.

Atalho: `manage.wix.com/dashboard/`**`<id-do-site>`**`/database/data/Expedicoes`

É texto livre. Escreva como quer que apareça, **com o `R$`**:

```
A partir de R$ 19.500
```

Duas coisas que o código faz com o que você escrever:

- se começar com **"A partir de"**, ele move essa parte para o rótulo pequeno e deixa só o
  número no Anton 56 — a tela lê `A PARTIR DE · POR ACOMODAÇÃO` sobre `R$ 19.500`
- se **estiver vazio**, a faixa preta inteira **desaparece** da página. É assim que uma
  expedição sem preço definido não anuncia "a confirmar"

Na mesma linha, mais dois campos que alimentam o botão:

| Campo | O que faz |
|---|---|
| **Rótulo do botão** | o texto do botão: `Reservar vaga` · `Entrar na lista de espera` · `Fazer pré-reserva` |
| **Link do checkout** | para onde o botão leva. Vazio = **botão desabilitado**, de propósito |

---

### 2 · Acompanhar os ingressos e as vendas

**Caminho:** painel do site → **Eventos** → clique no evento → aba **Ingressos**.

Atalho: `manage.wix.com/dashboard/`**`<id-do-site>`**`/events`

Ali é onde de fato se vende. Cada **tipo de ingresso é uma acomodação** — foi a decisão de
modelagem que já está em uso na Urubici:

| Acomodação | Valor | Limite |
|---|---|---|
| Eco Suíte Térrea · 2 pessoas | R$ 19.500 | 4 |
| Eco Suíte Superior · 2 pessoas | R$ 19.500 | 4 |
| Chalé Luxo · 2 pessoas | R$ 20.300 | — |
| Chalé Super Luxo · 2 pessoas | R$ 20.300 | 3 |
| Chalé Super Luxo Vista Lago | R$ 20.300 | 1 |
| Apartamento Vista Lago · 2 adultos e 1 criança | R$ 24.375 | 6 |
| Apartamento Vista Lago · 3 adultos | R$ 29.250 | 6 |
| Chalé Família · casal + 1 adulto + 1 criança | R$ 34.125 | 3 |
| Chalé Família · casal + 2 crianças | R$ 39.000 | 3 |
| Chalé Família · 2 casais | R$ 39.000 | 3 |

Na mesma tela do evento você acompanha **pedidos, participantes e faturamento**. É o
relatório de vendas — a página do site não sabe nada disso, e não precisa.

> **Por que a página não lê os ingressos direto.** Chegamos a escrever essa versão e ela
> foi descartada: exigia código de servidor, permissão elevada e uma consulta de rede a
> cada visita, para resolver um número que muda uma vez por expedição. O campo do CMS
> resolve com três cliques e nenhuma dependência.

---

### 3 · Quando mudar preço no Wix Events

Mudou o preço de um ingresso? O campo do CMS não muda sozinho. Um comando resolve:

```
node design/wix-precos.mjs
```

Ele lê os eventos, pega o **piso das acomodações de 2 pessoas**, e regrava nas 5
expedições: `Valor exibido na página`, `Rótulo do botão`, `Link do checkout` e as datas.
Nada é digitado à mão.

Rode `node design/wix-precos.mjs --seco` primeiro se quiser ver o que ele faria sem gravar.

> **Se quem cuida do site não roda comandos:** editar o campo **Valor exibido na página**
> no CMS resolve igual. O comando é conveniência, não obrigação — a única regra é que o
> número na página tem que bater com o ingresso mais barato.

---

### 4 · A expedição que ainda não tem evento

**A Costa Doce não tem evento no Wix Events.** Existe no CMS, com página completa, mas sem
ingresso — então o **Link do checkout** está vazio e o botão nasce desabilitado.

Para abrir a venda dela: criar o evento em **Eventos → + Adicionar evento**, cadastrar uma
acomodação por tipo de quarto, e depois rodar o comando do item 3 — ele preenche valor,
link e datas sozinho.
