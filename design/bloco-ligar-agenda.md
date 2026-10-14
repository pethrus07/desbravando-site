---

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
