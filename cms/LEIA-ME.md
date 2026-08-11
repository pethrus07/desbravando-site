# CSVs para importar no CMS da Wix

Gerados por `node design/csv.mjs` a partir de `design/lib/dados.mjs` — a mesma fonte
que alimenta o layout. Não editar na mão: corrige nos dados e roda de novo.

## Ordem de importação

Importe **1-Expedicoes primeiro**. As outras têm um campo `expedicao` que é
**referência** para ela — se a expedição não existir ainda, a referência não amarra.

1. `1-Expedicoes.csv`
2. `2-Roteiro.csv`
3. `3-Hospedagens.csv`
4. `4-Guia.csv`
5. `5-Destaques.csv`
6. `6-FAQ.csv`

## O FAQ tem coleção própria — e por quê

Ele **não** é uma categoria do `Guia`. O `Guia` é sempre por expedição; o FAQ não.
A maior parte das dúvidas é **geral** ("preciso ter UTV próprio?", "como funciona o
resgate?") e a resposta é a mesma em toda expedição. Se morasse no `Guia`, seriam as
mesmas 8 perguntas redigitadas em cada expedição nova — o tipo de trabalho repetido que
faz o conteúdo envelhecer.

O campo `escopo` resolve:

| escopo | `expedicao` | Onde aparece |
|---|---|---|
| `geral` | **vazio** | Grupo Avulso **e** toda página de expedição |
| `expedição` | preenchido | só na página daquela expedição |

Hoje são **6 gerais e 2 por expedição** (nível de dificuldade e combustível, que mudam
de destino para destino).

⚠️ **Na montagem:** um dataset de página dinâmica não filtra "referência = esta OU
referência vazia" numa tacada. O jeito nativo é **dois repetidores** na mesma seção —
primeiro "sobre esta expedição", depois "dúvidas gerais". Sem código, e a leitura até
fica melhor. A alternativa com um repetidor só exigiria Velo.

Efeito colateral bom: uma tabela limpa de pergunta/resposta é muito melhor para o
**agente do WhatsApp** consultar do que pergunta enterrada numa categoria do Guia.

## O que os CSVs NÃO trazem

**Imagens.** Nenhum importador de CSV carrega arquivo. Depois de importar, suba as fotos
e ligue nos campos de galeria: `galeria` em Expedicoes e `fotos` em Hospedagens.

**Vídeo.** Mesma coisa — `videoAbertura` fica vazio.

## O que está propositalmente em branco

| Campo | Por quê |
|---|---|
| `valorPorPessoa`, `valorPorCasal` | o dossiê da Costa Doce não traz preço — **não inventar** |
| `sinal`, `saldo`, `politicaCriancas`, `cancelamento` | idem |
| `linkCheckout` | sai do evento no Wix Events, criado depois |
| `publicado` | vem **FALSE** em tudo. Só vira TRUE quando os valores chegarem |
| As 4 expedições além da Costa Doce | são rascunho: só existe o cabeçalho da agenda hoje |

## Sobre `formasPagamento` e as condições

Continuam no banco porque o fluxo de reserva precisa deles — mas **não aparecem mais na
página**. Foi o ajuste final: as informações comerciais saem do módulo de Reserva e
entram durante o fluxo.
