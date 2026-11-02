# O que falta — 7 itens

Documento de trabalho, reduzido em **12/08/2026** para **só o que ainda não foi feito**.

O manual completo está em `5-manual-COMPLETO.md.bak`: vocabulário, Home, Grupo Avulso, os
**9 módulos já montados** e os consertos já fechados. As caixas que você marcou continuam
marcadas — a chave de cada módulo não mudou.

## A lista

| # | O quê | Onde |
|---|---|---|
| 1 | **Bloco de perguntas frequentes** na página da expedição | F1 · F2 |
| 2 | Módulo **"o que não está incluso"** | F1 |
| 3 | **Consertar o topo** — está mostrando Nova York | F3 |
| 4 | **Trocar o campo de endereço** para `slug` — mata 2 × 404 | F4 |
| 5 | **Linkar os cartões** da agenda às páginas | F5 |
| 6 | Passada de **celular** | F6 |
| 7 | Tirar a página crua `/expedicoes` do menu e dos buscadores | F4 |

**O mais barato:** o **F4** — quatro cliques e dois 404 somem.
**O que mais aparece:** o **F3** — é a primeira coisa que se vê em toda página de expedição.

### Já fechado, não precisa olhar

✅ 9 dos 11 módulos · ✅ as 7 coleções do CMS com conteúdo · ✅ C1 fotos distintas na agenda ·
✅ C2 filtro do FAQ · ✅ C3 ordenação · ✅ C5 os botões (o contador `1/3` da galeria ficou de
fora **por decisão** — é Arial, mas não carrega informação que ninguém precise) ·
✅ C6 acento · ✅ C4 avaliado e **dispensado** (você e o
cliente leem o hero sem dificuldade) · ✅ módulo do investimento montado e funcionando

---

### F1 · Os dois módulos que faltam

## 3.3 · Página da Expedição — os módulos restantes

### 10. `não está incluso` — 1440 × 327

**Conectar ao CMS** — O módulo mais leve da página, de propósito. Mesma escolha do módulo 8.

| Elemento | Campo do CMS | Estado | Observação |
|---|---|---|---|
| sobrelinha "COMPLEMENTO" | — | fixo | texto fixo, igual em toda expedição |
| título "O QUE NÃO ESTÁ INCLUSO" | — | fixo | texto fixo, igual em toda expedição |
| "por conta do participante" | — | fixo | texto fixo, igual em toda expedição |
| o texto do item | `texto` · Itens | ✓ 33/33 | sem número aqui — este bloco não é numerado |
| a ordem | `ordem` · Itens | ✓ 33/33 | só no **ordenar** do dataset |
| caminho alternativo · a lista inteira | `naoIncluso` | ◐ 2/5 | texto rico, 4 itens |

> Se for de repetidor, é a **mesma coleção `Itens`** do módulo 8 — só troca o filtro para `escopo` **é** `nao-incluso`. Dataset separado, com ID próprio (`datasetNaoIncluso`), porque um dataset guarda um filtro só. Este bloco não tem número no desenho: ligue apenas `texto`.
Seção **papel**, respiro 64. É de propósito o módulo mais leve da página.

Linha alinhada pela base: sobrelinha + `h2` + mola + `por conta do participante` em
`corpo pequeno` cinza fraco.
Depois: **V1 fio leve** → quatro colunas que esticam, separadas por **fio vertical de
1px na esquerda** (menos a primeira), recuo 24: número em `mono` cinza fraco + texto em
`corpo pequeno` cinza → **V1 fio leve**.

Sem marcador, sem caixa, sem fio forte. É o contraste com o módulo de cima.

### 11. `faq` — 1440 × 883

**Conectar ao CMS** — Sanfona. **DOIS repetidores** — ver 4.4.

| Elemento | Campo do CMS | Estado | Observação |
|---|---|---|---|
| sobrelinha "DÚVIDAS" | — | fixo | texto fixo, igual em toda expedição |
| título "PERGUNTAS FREQUENTES" | — | fixo | texto fixo, igual em toda expedição |
| rótulo "Sobre esta expedição" | — | fixo | dê o ID `textRotuloFaqExp` — o Velo recolhe junto |
| rótulo "Dúvidas gerais" | — | fixo | texto fixo, igual em toda expedição |
| a pergunta | `pergunta` · FAQ | ✓ 21/21 |  |
| a resposta | `resposta` · FAQ | ✓ 21/21 | texto rico; recolhida por padrão |
| a ordem | `ordem` · FAQ | ✓ 21/21 | só no **ordenar** do dataset |
| o sinal + / − | — | fixo | texto, não ícone — o Velo troca o caractere |
Seção **papel**, respiro 76. Cabeçalho → **V2 fio forte** → **V10 sanfonas** → fio forte.
A primeira já vem aberta, com a resposta em `corpo` cinza.

---

> ### ⛔ Módulo removido do escopo — 12/08
>
> O **guia da expedição** saiu da página. Decisão do Pedro: **o FAQ cobre o mesmo papel**,
> e um bloco de sanfona resolve o que dois blocos de sanfona faziam.
>
> A coleção `Guia` **continua no CMS, com o conteúdo intacto** — 4 categorias vindas do
> dossiê (Logística, Hospedagem, Gastronomia, Transporte) e 5 provisórias. Nada foi
> apagado; só não é exibido.
>
> ⚠️ **Consequência a decidir:** aquelas 4 categorias são informação real do dossiê que hoje
> não aparece em lugar nenhum do site — bases e ritmo, padrão da hospedagem, o que está à
> mesa, e como o carro chega. Se fizer sentido, elas viram **perguntas do FAQ** em vez de se
> perderem. É conversão de conteúdo, não de estrutura.

---

### F2 · Montar o FAQ da expedição

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

### O código — um arquivo só, para o FAQ **e** para os cartões

Arquivo: `velo/tudo.js`

```js
// ─────────────────────────────────────────────────────────────────────────────
// DESBRAVANDO UTV — cole e pronto. Não precisa de ID nenhum.
//
// Funciona em QUALQUER página do site: Grupo Avulso, página da expedição, o que for.
// Cole no código DA PÁGINA e não mexa em mais nada.
//
// O que ele faz sozinho:
//
//   1. CARTÃO DA AGENDA → clica em qualquer lugar do cartão e abre a página daquela
//      expedição. Um link por item, correto — que é justamente o que a conexão do painel
//      NÃO faz: lá o link sai igual para os cinco.
//
//   2. SANFONA DO FAQ → uma resposta aberta por vez, sinal + / −, e pergunta sem resposta
//      não vira sanfona.
//
// Como ele acha as coisas sem ID: percorre os repetidores da página e olha os DADOS de
// cada item. Item com `titulo` e `uf` é expedição → vira cartão clicável. Item com
// `pergunta` é FAQ → vira sanfona. Os elementos de dentro são encontrados por TIPO
// (`$item('Text')`), não por nome.
//
// Se algo não funcionar, ele NÃO morre calado: abra a prévia e leia o console.
// ─────────────────────────────────────────────────────────────────────────────

import wixLocation from 'wix-location';

// prefixo da página dinâmica. Se você trocar o endereço dela no Editor, troque aqui.
const PREFIXO = '/expedicoes';

// ⚠️ Hoje o endereço da página dinâmica é montado a partir do campo `Título`, e a Wix
// MANTÉM O ACENTO: "Macaé" vira /expedicoes/macaé. Se um dia você trocar o campo de
// endereço para `Endereço da página (sem acento)`, mude aqui para 'slug'.
const CAMPO_DO_ENDERECO = 'titulo';

$w.onReady(function () {
  let repetidores = [];
  try { repetidores = $w('Repeater'); } catch (e) { /* página sem repetidor */ }

  if (!repetidores.length) {
    console.log('Desbravando: nenhum repetidor nesta página.');
    return;
  }

  console.log('Desbravando: ' + repetidores.length + ' repetidor(es) nesta página.');
  repetidores.forEach(function (rep) { ligar(rep); });
});

/** Olha o primeiro item e decide o que aquele repetidor é. */
function ligar(rep) {
  let jaDecidiu = false;

  rep.onItemReady(function ($item, dados, indice) {
    if (!jaDecidiu) {
      jaDecidiu = true;
      const tipo = dados.pergunta ? 'FAQ' : (dados.titulo && dados.uf) ? 'agenda' : 'não reconhecido';
      console.log('  · ' + rep.id + ' → ' + tipo +
        (tipo === 'não reconhecido' ? '  (campos: ' + Object.keys(dados).filter(function (k) { return k[0] !== '_'; }).join(', ') + ')' : ''));
    }

    if (dados.pergunta) sanfona(rep, $item, dados);
    else if (dados.titulo && dados.uf) cartao($item, dados);
  });
}

/* ── 1 · CARTÃO DA AGENDA ────────────────────────────────────────────────── */

function cartao($item, dados) {
  const chave = dados[CAMPO_DO_ENDERECO] || dados.titulo || '';
  if (!chave) return;

  // a Wix monta o endereço em minúscula, com hífen no lugar do espaço, e MANTÉM o acento
  const destino = PREFIXO + '/' + String(chave).toLowerCase().trim().replace(/\s+/g, '-');

  // o cartão inteiro clicável: caixas, textos e fotos. No celular isso é o que importa —
  // ninguém acerta só a palavra do título
  cadaElemento($item, ['Container', 'Box', 'Text', 'Image'], function (el) {
    if (typeof el.onClick !== 'function') return;
    el.onClick(function () { wixLocation.to(destino); });
    // deixa claro que é clicável
    try { el.style.cursor = 'pointer'; } catch (e) { /* nem todo elemento aceita */ }
  });
}

/* ── 2 · SANFONA DO FAQ ──────────────────────────────────────────────────── */

// guarda, por repetidor, quem já abriu — para abrir só a PRIMEIRA com resposta
const jaAbriu = {};

function sanfona(rep, $item, dados) {
  // texto rico vazio vem como "<p></p>" ou "&nbsp;", nunca como ""
  const resposta = limpo(dados.resposta);

  const textos = cadaElemento($item, ['Text'], null);

  // o SINAL é o texto que só tem + ou −
  const sinal = textos.find(function (t) {
    const v = String(t.text || '').trim();
    return v === '+' || v === '−' || v === '-';
  });

  // a RESPOSTA é o texto cujo conteúdo bate com o campo `resposta` do item
  const elResposta = resposta
    ? textos.find(function (t) { return limpo(t.text).slice(0, 30) === resposta.slice(0, 30); })
    : null;

  if (!elResposta) {
    // pergunta sem resposta não vira sanfona: sem sinal, sem clique
    if (sinal) sinal.text = '';
    return;
  }

  if (!jaAbriu[rep.id]) {
    jaAbriu[rep.id] = true;
    elResposta.expand();
    if (sinal) sinal.text = '−';
  } else {
    elResposta.collapse();
    if (sinal) sinal.text = '+';
  }

  cadaElemento($item, ['Container', 'Box', 'Text'], function (el) {
    if (el === elResposta || typeof el.onClick !== 'function') return;
    el.onClick(function () {
      // ⚠️ ler ANTES de fechar as outras: o laço abaixo fecha esta também, e aí
      // `collapsed` deixa de dizer o que o usuário queria. Ler depois faz o clique
      // nunca abrir — é o bug clássico deste padrão.
      const vaiAbrir = elResposta.collapsed;

      rep.forEachItem(function ($outro) {
        cadaElemento($outro, ['Text'], function (t) {
          const v = String(t.text || '').trim();
          if (v === '−') t.text = '+';
          else if (limpo(t.text).length > 30) t.collapse();
        });
      });

      if (vaiAbrir) {
        elResposta.expand();
        if (sinal) sinal.text = '−';
      }
    });
    try { el.style.cursor = 'pointer'; } catch (e) { /* ok */ }
  });
}

/* ── ferramentas ─────────────────────────────────────────────────────────── */

/** Junta os elementos do item por TIPO. Se `fn` vier, aplica; sempre devolve a lista. */
function cadaElemento($item, tipos, fn) {
  const todos = [];
  tipos.forEach(function (tipo) {
    let achados = [];
    try { achados = $item(tipo); } catch (e) { /* tipo não existe nesta página */ }
    (achados || []).forEach(function (el) { todos.push(el); });
  });
  if (fn) todos.forEach(fn);
  return todos;
}

/** Tira tags e espaço de texto rico. */
function limpo(v) {
  return String(v == null ? '' : v)
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim();
}
```

## Como aplicar o `tudo.js`

Um arquivo só, colado em duas páginas. Não precisa de ID nenhum.

### Passo 1 · ligar o Modo de Desenvolvedor

Se já estiver ligado (você colou o código da Reserva), pule.

No topo do Editor: **Modo Dev** / *Velo by Wix* → **Ativar**. Aparece um painel de código no
rodapé e uma barra de arquivos à esquerda.

### Passo 2 · abrir o código DA PÁGINA

Na barra de arquivos, em **Código de página**, clique na página que você quer. O painel do
rodapé mostra o código daquela página.

> 🛑 **Não é o `masterPage.js`.** Aquele vale para o site inteiro e faria o código rodar em
> páginas que não têm repetidor — inofensivo, mas suja o console de toda página.

### Passo 3 · colar

**No Grupo Avulso** — o código está vazio ou quase. Cole o arquivo inteiro.

**Na página da expedição** — você já tem o `montarReserva()` lá. **Não cole o arquivo
inteiro**, senão ficam dois `$w.onReady` na mesma página e um atropela o outro.

Faça assim: cole **tudo menos o `$w.onReady`** do arquivo novo, e junte as duas chamadas num
`onReady` só:

```js
$w.onReady(function () {
  montarReserva();          // o que já estava

  // o que entra agora
  let repetidores = [];
  try { repetidores = $w('Repeater'); } catch (e) { /* sem repetidor */ }
  console.log('Desbravando: ' + repetidores.length + ' repetidor(es) nesta página.');
  repetidores.forEach(function (rep) { ligar(rep); });
});
```

O resto das funções — `ligar`, `cartao`, `sanfona`, `cadaElemento`, `limpo` — cola embaixo,
sem mexer.

### Passo 4 · publicar ou pré-visualizar

Velo **não roda no canvas do Editor**. Você só vê funcionando em **Pré-visualizar** ou no
site publicado.

### Passo 5 · ler o console

`F12` → aba **Console**. Ele diz o que reconheceu:

```
Desbravando: 2 repetidor(es) nesta página.
  · repeater1 → agenda
  · repeater2 → FAQ
```

**Se aparecer `não reconhecido`**, ele lista os campos que viu naquele item — me manda essa
linha que eu ajusto em uma linha de código.

---

### Conferir

**No Grupo Avulso:**

- [ ] o cursor vira **mãozinha** sobre o cartão inteiro — foto, nome e as colunas de dados
- [ ] clicar na **Costa Doce** abre `/expedicoes/costa-doce`
- [ ] clicar no **Macaé** abre a dele, e **não** a mesma da Costa Doce
      *(link igual para todos era exatamente o defeito da conexão de painel)*
- [ ] o FAQ com 6 perguntas, uma aberta por vez

**Na página da expedição:**

- [ ] as duas listas do FAQ funcionando, **independentes** — abrir numa não fecha a outra
- [ ] o bloco de investimento continua igual (o `montarReserva()` não foi afetado)

**No celular:** tocar em qualquer parte do cartão navega. É o ganho principal de fazer o
cartão inteiro clicável em vez de só o título.

---

### Se der errado

| Sintoma | Causa |
|---|---|
| console limpo, nada acontece | colou no `masterPage.js` em vez do código da página |
| nada acontece e não há log | está olhando o **canvas**; Velo só roda em Pré-visualizar |
| cartão abre a página errada | você trocou o campo de endereço no Editor → mude `CAMPO_DO_ENDERECO` para `'slug'` |
| `não reconhecido` no console | me manda a lista de campos que ele imprimiu |
| a sanfona abre duas de uma vez | tem dois `$w.onReady` na página — junte num só, passo 3 |

---

## Duas armadilhas de repetidor — valem aqui de novo

O FAQ tem **dois** repetidores e **dois** datasets, então as duas voltam a morder.

> ### 🛑 "Nenhum campo de `dia`, `data`, `local`, `titulo` aparece"
>
> É o erro nº 1 aqui, e não é você: **os elementos dentro de um repetidor herdam o dataset
> do repetidor.** Enquanto o repetidor não estiver ligado ao dataset do Roteiro, o painel
> só oferece os campos de **`Expedicoes`** — porque o dataset em foco é o `dynamicDataset`
> da página. Os campos do Roteiro não somem: eles nunca foram oferecidos.
>
> **Conserto, nessa ordem:**
>
> 1. **Existe o dataset?** Barra lateral → o ícone do CMS. Tem que haver um dataset com
>    **Coleção = `Roteiro`**. Se não tiver: `+ Adicionar → CMS → Conjunto de dados`,
>    coleção `Roteiro`, modo **Somente leitura**, ID `datasetRoteiro`.
> 2. **Clique no REPETIDOR**, não num texto de dentro. No painel de camadas ele aparece
>    como *Repetidor* / *Repeater*, envolvendo tudo. Ícone de conectar → **Conectar o
>    repetidor a** → `datasetRoteiro`.
> 3. **Só agora** clique no texto de dentro. O painel passa a listar
>    Dia · Data · Local · Título · Texto · Quilometragem.
>
> Se ainda não listar, confira no alto do painel de conexão **qual dataset está
> selecionado** — há um seletor ali, e ele às vezes fica no `dynamicDataset`. Troque para
> `datasetRoteiro`.
>
> **Dois casos particulares:**
>
> - **`texto` é RICH_TEXT.** Um elemento de Texto comum pode não oferecer campo de texto
>   rico. Use **Texto avançado / Rich Text** no parágrafo do dia.
> - **`dia` é NUMBER** e aparece normalmente num elemento de Texto — se ele não estiver na
>   lista, é sinal de que o problema é o dataset, não o tipo.
>
> Confirmei que a coleção está sã: `Roteiro` é NATIVE, leitura **ANYONE**, e os 7 campos
> existem com os nomes Dia · Data · Local · Título · Texto · Quilometragem. O que falta é a
> ligação do repetidor.

> ### 🛑 "O repetidor ficou com um item só" · "o dia virou 5 no item 1"
>
> Dois sintomas, **uma causa**: o repetidor não está ligado ao dataset, e os textos de
> dentro estão.
>
> - **Um item só** → o repetidor não itera; ficou com o único item que você desenhou.
> - **`dia` = 5 no primeiro** → o texto está lendo o **item atual do dataset**, não o item
>   do repetidor. E sem ordenação a coleção devolve o **dia 5 primeiro**: a ordem crua é
>   `5 · 4 · 3 · 2 · 1`.
>
> Esse `5` é diagnóstico, não coincidência: prova que o texto está preso ao dataset **e**
> que a ordenação não foi definida.
>
> **Conserto:**
>
> 1. **Ligue o REPETIDOR** — no painel de camadas, o container que envolve tudo, não o
>    texto. Conectar → `datasetRoteiro`. Os outros 4 blocos aparecem na hora.
> 2. **Classificar → `dia` → Crescente.** Sem isso a lista sai 5→1 — o mesmo defeito do
>    FAQ em **C3**.
> 3. **"Itens a exibir"** no dataset: ≥ 5.
> 4. Se algum texto **repetir o mesmo valor nos 5 blocos**, aquele elemento continua preso
>    ao dataset: desconecte e reconecte **depois** que o repetidor já estiver ligado.
>
> **A lição que vale para os outros repetidores:** o dataset da Wix não vem ordenado do
> jeito que você espera — tende a devolver o mais recente primeiro. **Sempre defina a
> ordenação à mão.** Já mordeu no FAQ (C3) e aqui. Nos próximos: `Hospedagens`, `Guia` e
> `Itens`, todos por `ordem` crescente.

---

### F3 · Consertar o topo — está mostrando Nova York

## O topo da página está mostrando Nova York

Achado no QA de 12/08. As 5 páginas abrem com uma **foto de horizonte de Nova York** na faixa
do topo, e o console acusa:

```
Wix code SDK error: The "src" property cannot be set to "".
It must be a valid URL starting with "http://", "https://", or a valid video URL
starting with "wix:"
```

**Não é conteúdo faltando — é ligação.** O elemento de **Vídeo** está conectado ao campo
`Vídeo de abertura`, que está vazio nas 5 expedições. Recebendo string vazia, ele falha e cai
na imagem que estava nele em tempo de desenho — a foto de exemplo da Wix.

O detalhe que importa: **isso volta a acontecer sempre.** Mesmo depois de o cliente subir o
vídeo da Costa Doce, qualquer expedição nova sem vídeo mostra Nova York de novo.

### O conserto — dois elementos empilhados

Na seção do topo, **um em cima do outro**:

| Camada | Elemento | Conectar a | Estado hoje |
|---|---|---|---|
| embaixo | **Imagem** | `Foto de capa (agenda e listagens)` | ✓ preenchida nas 5 |
| em cima | **Vídeo** | `Vídeo de abertura` | ⛔ vazio nas 5 |

Assim: hoje aparece a **foto de capa** em todas; quando o vídeo entrar, ele cobre a foto
naquela expedição. Nenhuma delas fica em branco, e nenhuma mostra Nova York.

O `velo/expedicao.js` só recolhe essa seção se os **dois** estiverem vazios — o que não
acontece, porque a foto de capa está sempre lá.

> **Se o erro do console incomodar antes disso:** desconecte o elemento de Vídeo e deixe só
> a Imagem. O erro para na hora. Reconecte quando houver vídeo para mostrar.

### Conferir

- [ ] Nas 5 expedições, o topo mostra a foto **daquele destino** — não Nova York, e não a
      mesma foto nas cinco
- [ ] Console limpo, sem `The "src" property cannot be set to ""`

---

### F4 · O endereço da página, e a `/expedicoes` crua

### 4.1b · 🛑 O endereço da página dinâmica está com acento — e duas expedições dão 404

Achado no QA de 12/08, rodando as 5 páginas no ar.

| Endereço | Resultado |
|---|---|
| `/expedicoes/costa-doce` | ✅ abre |
| `/expedicoes/urubici` | ✅ abre |
| `/expedicoes/serra-da-canastra` | ✅ abre |
| `/expedicoes/visconde-de-maua` | ❌ **404** |
| `/expedicoes/macae` | ❌ **404** |
| `/expedicoes/visconde-de-mauá` | ✅ abre |
| `/expedicoes/macaé` | ✅ abre |

**A Wix mantém o acento no endereço.** A página dinâmica foi criada usando o campo `titulo`,
então "Macaé" virou `/expedicoes/macaé` e "Visconde de Mauá" virou `/expedicoes/visconde-de-mauá`.
As três primeiras funcionam sem acento só porque os nomes delas não têm acento.

**Por que isso é problema, e não detalhe:**

- endereço com acento **quebra ao ser colado** em WhatsApp, e-mail e alguns clientes
- fica inconsistente: três limpos, dois acentuados
- e o pior: **o endereço depende do nome**. No dia em que alguém corrigir "Macaé" no CMS, o
  endereço muda e **todo link compartilhado morre em silêncio**

#### O conserto

Criei o campo **`Endereço da página (sem acento)`** (`slug`) e preenchi nas 5:

| Expedição | slug |
|---|---|
| Costa Doce | `costa-doce` |
| Urubici | `urubici` |
| Serra da Canastra | `serra-da-canastra` |
| Visconde de Mauá | `visconde-de-maua` |
| Macaé | `macae` |

**Falta você trocar o campo do endereço na página dinâmica:**

1. No Editor, painel de **Páginas** → a página dinâmica de Expedições
2. **Configurações** (a engrenagem) → **Endereço da página** / *Page Address*
3. Troque de **`Título`** para **`Endereço da página (sem acento)`**
4. Publique

Depois disso os cinco endereços ficam limpos e **param de depender do nome**: editar o
título não mexe mais no link.

> ⚠️ **Redirecione os antigos.** Se algum endereço já foi compartilhado, crie o
> redirecionamento em **Painel → SEO → Redirecionamentos de URL**. Os candidatos são
> `/expedicoes/macaé` e `/expedicoes/visconde-de-mauá`.

#### Dar o endereço `/expedicoes` à página certa

Hoje **duas páginas fazem o mesmo trabalho**, e a errada ficou com o endereço bom:

| Endereço | Página | Estado |
|---|---|---|
| `/expedicoes` | **"Expedições (List)"** | criada **sozinha pela Wix**, sem o desenho da v3 — as 5 expedições no layout cru, 1.987 px. **Está pública.** |
| `/blank-2` | **Grupo Avulso** | a agenda desenhada, a que você montou |

De onde saiu a página crua: ao criar a página dinâmica, a Wix oferece criar **também** uma
página de lista. A 4.1 pede para recusar — ela foi criada junto de todo jeito.

O problema concreto: **quem digitar `/expedicoes` cai na feia**, e a sua está num endereço
provisório de Editor (`blank-2`), que não é endereço de site.

#### O conserto escolhido — o preguiçoso, em 2 toggles

Decisão de 12/08: **não apagar nada, não mexer em endereço.** Só tirar a página crua do
caminho de quem navega.

**Páginas** → **"Expedições (List)"** → menu de três pontos:

1. **Remover do menu** — desmarque *Mostrar no menu* / *Show in menu*
2. **Esconder dos buscadores** — em **SEO** da página, desligue
   *Permitir que os buscadores encontrem esta página*

Depois, **Publicar**.

Os dois juntos levam 30 segundos e resolvem o que importa: ninguém navegando cai nela, e o
Google para de indexá-la.

> **O segundo toggle não é enfeite.** Só tirar do menu deixa a página **pública e
> indexável** — o Google acha, e você fica com duas páginas mostrando a mesma agenda. A crua
> pode aparecer na busca em vez da sua. É o mesmo esforço de clique, então vale fazer os dois.

#### O que este caminho deixa por resolver

Fica registrado, sem urgência:

- **`/expedicoes` continua respondendo** para quem digitar o endereço na mão. Mostra a lista
  crua. Não some, só fica difícil de achar
- **a agenda desenhada continua em `/blank-2`** — endereço provisório de Editor. Se for
  divulgar o link da agenda em algum lugar, é esse que vai no material, e ele é feio

Se um dia quiser fechar de vez: apagar a página de lista e passar o endereço `expedicoes`
para o Grupo Avulso. **Nessa ordem** — a Wix recusa endereço duplicado, ou renomeia sozinha
para `expedicoes-1`.

---

### F5 · Linkar os cartões da agenda

**Resolvido pelo mesmo `tudo.js` do F2** — cole no código da página do Grupo Avulso e os
cartões passam a abrir a página de cada expedição. Não precisa de ID, nem do plugue.

> **Por que o plugue não servia:** conexão de painel dá **um link estático, igual para os
> cinco**. Foi o que apareceu ao pôr na imagem — o link replicou no repetidor inteiro. Um
> link por item só existe dentro do `onItemReady`, que é código.

O caminho de conexão nativa fica registrado abaixo, caso um dia o campo `Expedições (Item)`
volte e você prefira sem código.

### 4.6b · Ligar os cartões da agenda às páginas das expedições

Uma ligação, e as 5 passam a abrir a página certa. É o passo que transforma a agenda em
índice de verdade.

#### O gesto

1. Vá para a página **Grupo Avulso**
2. No painel de camadas, clique na **caixa da linha** do item do repetidor — a que envolve
   foto, título e as colunas de dados. **Não** no título, **não** no repetidor
3. Ícone de **conectar** (o plugue)
4. Em **Link conecta a**, escolha **`Expedições (Item)`**

Pronto. O Wix monta o endereço de cada cartão sozinho: `/expedicoes/costa-doce`,
`/expedicoes/urubici`, e assim por diante.

> **Por que na caixa e não no título.** Ligando a caixa, o cartão inteiro é clicável — a
> foto, o nome, os dados. Ligando só o título, o visitante tem que acertar a palavra. No
> celular a diferença é grande.

#### Se `Expedições (Item)` não aparecer na lista

Esse campo não é digitado por ninguém: **a Wix cria sozinha** na coleção `Expedicoes` quando
existe uma página dinâmica ligada a ela. Ele aparece no CMS como um campo de tipo *link de
página*, chamado `Expedições (Item)`.

Duas causas para ele faltar:

**1 · A página dinâmica ainda não existe.** Volte para 4.1 e crie primeiro. O campo nasce
junto com a página.

**2 · O campo foi removido da coleção.** Foi o que aconteceu aqui em 12/08 — **eu apaguei
sem querer**: num comando que acrescentava outro campo, filtrei os campos por tipo e o
`PAGE_LINK` ficou de fora. Como esse endpoint substitui a lista inteira de campos, o que não
foi enviado morreu.

**Conserto:** abra o Editor e a página dinâmica. A Wix reconstrói o campo sozinha ao carregar
o site, porque ele é derivado da página, não guardado à mão. Se não voltar, abra as
configurações da página dinâmica e salve de novo — isso força a reconstrução.

Confira no CMS: **Expedições** deve ter uma coluna `Expedições (Item)`.

> Já blindei o script (`design/wix-criar-colecoes.mjs`) com um aviso no ponto exato, para não
> repetir.

#### Alternativa, se preferir não depender desse campo

No lugar de conectar o link, dá para usar Velo no clique da caixa:

```js
import wixLocation from 'wix-location';

$w('#repeaterAgenda').onItemReady(($item, dados) => {
  $item('#containerLinha').onClick(() => {
    wixLocation.to('/expedicoes/' + dados.titulo
      .normalize('NFD').replace(/[̀-ͯ]/g, '')   // tira acento
      .replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase());
  });
});
```

**Não recomendo.** O endereço passa a ser montado por você, e no dia em que alguém mudar o
campo do endereço da página dinâmica, o link quebra em silêncio. A conexão nativa acompanha.

#### Conferir

- [ ] Clicar no cartão da **Costa Doce** abre `/expedicoes/costa-doce` com a página cheia
- [ ] Clicar no **Urubici** abre a dele — hero, dados, FAQ e a faixa de investimento
- [ ] O cursor vira **mãozinha** sobre o cartão inteiro, não só sobre o texto
- [ ] No celular, tocar em qualquer parte do cartão navega

---

### F6 · Celular

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

---

## Travado no cliente — não é sua fila

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
