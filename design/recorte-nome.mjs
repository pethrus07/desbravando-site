/**
 * Nome de arquivo dos recortes, em ASCII puro.
 *
 * Mora sozinho aqui porque duas coisas precisam dele e uma não pode importar a outra:
 * `recorte.mjs` roda o Playwright já na carga do módulo, então `manual.mjs` não pode
 * importá-lo só para pegar a regra de nome.
 *
 * ASCII e nada além: com acento no nome, o navegador não acha o PNG por `file://` —
 * a codificação do caminho não bate com a do sistema de arquivos, e o manual em HTML
 * abre justamente por file://.
 */
export const nomeArquivo = (prefixo, modulo) =>
  `${prefixo}-${modulo}`
    .normalize('NFD').replace(/[̀-ͯ]/g, '') // tira acento
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
