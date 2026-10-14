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
