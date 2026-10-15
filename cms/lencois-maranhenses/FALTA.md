# Lençóis Maranhenses — o que falta antes de publicar

Gerado de `briefing.json` (fechado, 14 de 18 campos) em 2026-10-15.
Importe `1-Expedicoes.csv` primeiro; as outras coleções referenciam a expedição.

**`publicado` está FALSE.** Vire para TRUE só quando as linhas abaixo estiverem resolvidas.

## Derivado do texto do briefing, não afirmado por ninguém

Saiu de palavra que a pessoa escreveu, mas não é resposta dela. Confira:

- regiao = "Barreirinhas · Tutóia · Parnaíba · Camocim · Preá" (a ordem das cidades do próprio roteiro)
- pontoEncontro = "Barreirinhas, 24/05" (Dia 01; falta a HORA)

## Em branco de propósito

- roteiro.km — o briefing não pergunta quilometragem de trecho
- hospedagens — 5 nomes; falta cidade, noites e papel de cada uma
- guia_logistico.o_que_levar — obrigatório, mas veio ".."
- chamada — frase de chamada é escrita de marca, não sai do briefing
- subtitulo — idem
- formato — Família / Só Homens / Casais / Corporativa — o briefing não pergunta
- percurso — quilometragem total não existe no briefing
- destaques — não perguntado
- aeroporto — não perguntado
- sobreDestino — texto sobre o destino é redação, não briefing
- incluso — não perguntado
- naoIncluso — não perguntado
- valorPorPessoa — preço nunca é inventado — ver cms/LEIA-ME.md
- valorPorCasal — idem
- formasPagamento — idem
- sinal — idem
- saldo — idem
- politicaCriancas — idem
- cancelamento — idem
- linkCheckout — sai do evento no Wix Events, criado depois

## Dois campos que a página NÃO desenha hoje

Medido em 15/10/2026 comparando o valor no CMS com o HTML da página, na Costa Doce
(a mais preenchida) e aqui. Todo o resto aparece.

- `pontoEncontro` não está ligado a nenhum elemento
- `naoIncluso` idem (o "não está incluso" da página vem do repetidor da coleção `Itens`)

Preencher esses dois no CMS não muda nada na tela até alguém ligar o elemento no Editor.

## Quem preenche o quê, daqui para a frente

O briefing manda nos campos que ele conhece: datas, duração, roteiro, hospedagens, veículos.
Reenviar o zip ATUALIZA esses e **não toca em mais nada** — foto, textos de venda e o que
inclui, escritos no CMS, ficam onde estão. Valor vazio nunca sobrescreve conteúdo.

⚠️ Mudar o `titulo` muda o ENDEREÇO da página, porque a URL dinâmica sai dele.
Depois de divulgar o link, título não se mexe.

## Palavras que eu corrigi no texto do cliente

Vai para página pública, então erro de digitação não sobe. Mas é texto dele:

- `á → à`
- `Trevho → Trecho`
- `Camocin → Camocim`
- `percursso → percurso`
- `Lençõis → Lençóis`

## O que o briefing trouxe pronto

- 7 dias de roteiro, com a data de cada um calculada a partir de 2027-05-24
- 5 hospedagens (só o nome)
- 11 UTVs
