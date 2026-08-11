# O que mandar pro cliente — **v2**

Dois arquivos com sufixo `-v2`. **Mande o HTML**; o PDF é a versão "para olhar".
A v1 está guardada em `v1/` caso ele queira comparar.

## O que a v2 incorporou

Todos os quatro documentos dele de 05/08: o `.txt` exportado do HTML editável e os PDFs
de Home, Grupo Avulso e Página da Expedição. Resumo em `../4-implementacao-wix.md`.

## O que ainda falta dele

- **Tela do Grupo Fechado** — o único documento que não chegou. A tela está no arquivo
  na versão antiga, marcada como `aguardando documento`.
- **Arte do logotipo da Can-Am** para o bloco de Parceiros Oficiais.
- Confirmar se o plano da Wix libera o CMS e se o Multilingual está incluso.

---

## `desbravando-repaginacao-v2.html` · 3,9 MB — o principal

Abre com duplo clique em qualquer navegador. **Funciona offline**: as 35 fotos e as 5
fontes estão embutidas no arquivo, não busca nada da internet (testado com a rede
bloqueada).

**O cliente pode escrever direto nas telas.** Todo texto é editável — 825 campos.
O que ele mudar fica marcado em laranja e o contador no topo mostra quantas alterações
existem. No fim, o botão **"Baixar minhas alterações"** gera um `.txt` assim:

```
=== 04 · Destino — Urubici (peça central) ===

1. seção: roteiro
   ANTES: Saída cedo para a descida da serra, parada nos mirantes…
   AGORA: Saída 7h, descida da Serra do Rio do Rastro, almoço em São Joaquim
```

Ele manda esse `.txt` de volta e eu aplico no design. Nada do que ele fizer altera o
arquivo original nem o site no ar.

**O que ele NÃO consegue fazer:** mover blocos, trocar foto, mudar cor ou tamanho. Isso é
de propósito — o que precisa dele é **conteúdo**, e é justamente o que está como exemplo
(roteiro dia a dia, km, dificuldade, FAQ, depoimentos, números de prova).

Ordem das telas: as quatro de computador, as três de celular, e o "Sistema de design"
no fim, marcado como anexo técnico que ele não precisa revisar.

## `desbravando-repaginacao-v2.pdf` · 6,0 MB — para repassar

42 páginas, uma tela por bloco (as altas fatiadas em páginas para não esmagar nada).
Passa do limite de 16 MB do WhatsApp? Não — cabe. Serve para quem só quer bater o olho ou imprimir — **não é editável**.

## Como regerar

```bash
node design/gerar.mjs      # o .pen a partir do código
node design/previa.mjs     # os PNGs (o PDF depende deles)
node design/exportar.mjs   # o HTML editável
node design/pdf.mjs        # o PDF
```

Se você mexer no design pelo canvas do pen.dev, **não rode `gerar.mjs`** (ele trava e
avisa, mas melhor não tentar): rode direto `previa.mjs` → `exportar.mjs` → `pdf.mjs`,
que leem o `.pen` como ele está.
