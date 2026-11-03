# Desbravando UTV · site

[English](README.md) · Português

Repaginação do site da Desbravando UTV dentro da Wix. O cliente decidiu ficar na Wix, então
este repositório não guarda o site. Guarda o que produz e alimenta o site: o design gerado por
código, o conteúdo que vai para o CMS da Wix pela API, os trechos de Velo, os manuais de
montagem passo a passo e os scripts de QA do site no ar.

## Status

Ativo. Home no ar na Wix desde 08/08/2026; páginas de expedição em acabamento.

## O problema

Cada expedição precisava de muitas artes separadas para dar todas as informações, e a página
do evento tinha grandes áreas vazias no celular. A repaginação põe cada destino numa página só,
alimentada por coleções do CMS, e deixa o Wix Events só como checkout.

## Stack

- Scripts Node.js (ES modules), sem framework
- Arquivos `.pen` do pen.dev para o design, gerados pelo `design/gerar.mjs`
- API REST da Wix para o CMS (`design/wix*.mjs`), Velo para o código das páginas (`velo/`)
- Playwright para prévias e QA, carregado do checkout do `qa-parresia` nesta máquina

## Rodar localmente

Precisa de Node 20 ou mais novo.

```bash
npm run icones            # baixa os SVGs dos ícones para design/.cache-icones
npm run design:gerar      # regera o .pen (tem trava, ver design/README.md)
npm test                  # valida o .pen contra o vocabulário do formato
npm run manual:servir     # serve os manuais de montagem em http://localhost:8787
```

Os scripts que falam com a Wix precisam do `.env.local` (copie o `.env.example`). Os `wix:*`
**escrevem no site no ar**: rode `npm run wix:testar` antes.

## Testes

```bash
npm test
```

Confere o arquivo de design gerado contra o vocabulário real do `.pen`. Os scripts `qa:*`
conferem o site no ar, no navegador de computador e de celular.

## Pastas

| Caminho | O que é |
|---|---|
| `design/` | Fonte do design, geradores, scripts da Wix e de QA (ver `design/README.md`) |
| `dados/` | Texto de cada módulo, por página, usado nos manuais |
| `cms/` | CSV e JSON que entram nas coleções do CMS da Wix |
| `velo/` | Código das páginas, colado no editor da Wix |
| `marca/` | Guia da marca (texto) e os scripts que vetorizam o logo e geram o favicon |
| `entrega/` | Notas sobre o que foi entregue (os arquivos renderizados ficam fora do git) |
| `docs/` | Planos, arquitetura, notas de implementação, diagramas |
| `saida/` | Manuais gerados (fora do git) |

## Arquitetura

Diagramas em [docs/arquitetura/](docs/arquitetura/). O plano da repaginação está em
[docs/3-repaginacao.md](docs/3-repaginacao.md) e a implementação na Wix em
[docs/4-implementacao-wix.md](docs/4-implementacao-wix.md).

## Decisões e limites conhecidos

- O site fica na Wix por decisão do cliente. Pagamento e Wix Events não são mexidos.
- O `.pen` nasceu do código. Depois que alguém edita no canvas, o canvas vira a fonte da
  verdade e o `gerar.mjs` se recusa a sobrescrever.
- O Playwright é importado de um caminho absoluto da máquina do autor.
- Os arquivos do cliente (logo, fotos, documentos recebidos, peças prontas) não estão no git. Os
  scripts que precisam deles leem da pasta na variável de ambiente `DESBRAVANDO_ARTES`, com
  `marca/` e `recebidos/` dentro (ver `design/lib/artes.mjs`). O `npm test` não precisa dela.

### Limpeza do histórico (2026-11)

O histórico foi reescrito em 01/11/2026, antes de o repositório ser aberto. O arquivo local com
a chave da Wix, o extrato do cliente, a proposta comercial, o fechamento, o plano de custos, o
documento de escopo, os caches de captura e os manuais gerados saíram de todos os commits. Em 02/11/2026 uma
segunda passada tirou os documentos e as artes do cliente (`recebidos/`, os arquivos de logo e
favicon em `marca/` e os PDF e HTML renderizados em `entrega/`). Esse
material fica guardado fora do repositório.

## Licença

Todos os direitos reservados. Publicado como portfólio; não licenciado para reuso. Veja o arquivo [LICENSE](LICENSE).
