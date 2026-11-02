// Monta o documento de trabalho com SÓ O QUE FALTA, a partir do manual completo.
//
// O completo fica em `5-manual-COMPLETO.md.bak` — vocabulário, Home, Grupo Avulso, os 9
// módulos já montados, os consertos já feitos e o CMS continuam lá. Saíram do documento de
// trabalho porque **estão prontos**, não porque deixaram de valer.
//
// ⚠️ O gerador (`design/manual.mjs`) descobre em que tela está pelo cabeçalho `## 3.N ·` e
// monta a chave de cada módulo como `03|nome`. Essa chave guarda o progresso no navegador e
// o nome do PNG do recorte. Por isso o cabeçalho `## 3.3 ·` PRECISA continuar aqui —
// renomear quebra as fichas e zera as caixas que ele já marcou.
//
// ⚠️ ORDEM: este script reescreve o manual A PARTIR DO .bak, então apaga os mapas de
// ligação injetados. Rodando este, rode os outros dois em seguida:
//
//   node design/enxugar-manual.mjs
//   node design/mapa-ligacao.mjs --gravar
//   node design/manual.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const COMPLETO = path.join(RAIZ, 'docs', '5-manual-COMPLETO.md.bak');
const SAIDA = path.join(RAIZ, 'docs', '5-manual-de-montagem.md');

const L = fs.readFileSync(COMPLETO, 'utf8').split('\n');

/** Fatia do primeiro cabeçalho que casar `de` até o primeiro `ate` depois dele. */
function entre(de, ate) {
  const i = L.findIndex((l) => l.startsWith(de));
  if (i < 0) throw new Error('não achei o começo: ' + de);
  const j = L.findIndex((l, k) => k > i && l.startsWith(ate));
  if (j < 0) throw new Error('não achei o fim: ' + ate);
  return L.slice(i, j).join('\n').replace(/\n{3,}/g, '\n\n').trimEnd();
}

/** Lê um bloco de `design/bloco-*.md`. */
function bloco(nome) {
  const caminho = path.join(RAIZ, 'design', `bloco-${nome}.md`);
  if (!fs.existsSync(caminho)) { console.log(`  ! não achei bloco-${nome}.md`); return ''; }
  const t = fs.readFileSync(caminho, 'utf8').trimEnd().replace(/^---\s*\n/, '');
  console.log(`  ↳ bloco-${nome}.md: ${t.split('\n').length} linhas`);
  return t;
}

/** Lê um arquivo Velo e devolve já em bloco de código. */
function velo(arq) {
  const caminho = path.join(RAIZ, 'velo', arq);
  if (!fs.existsSync(caminho)) { console.log(`  ! não achei velo/${arq}`); return ''; }
  const codigo = fs.readFileSync(caminho, 'utf8').trimEnd();
  console.log(`  ↳ velo/${arq}: ${codigo.split('\n').length} linhas`);
  return `Arquivo: \`velo/${arq}\`\n\n\`\`\`js\n${codigo}\n\`\`\``;
}

const p = {
  // os dois módulos que sobraram para montar
  naoIncluso: entre('### 10. `não está incluso`', '> ### ⛔ Módulo removido'),
  guiaRemovido: entre('> ### ⛔ Módulo removido', '### 11. `faq`'),
  faqModulo: entre('### 11. `faq`', '## 3.4 ·'),
  // as duas armadilhas de repetidor — valem de novo, porque o FAQ tem dois repetidores
  trapDataset: entre('> ### 🛑 "Nenhum campo de', '> ### 🛑 "O repetidor ficou'),
  trapUmItem: entre('> ### 🛑 "O repetidor ficou', '| Módulo | Coleção |'),
  mobile: entre('# Parte 5 ·', '# Parte 6 ·'),
  clientePendente: entre('# Parte 6 ·', '# Parte 7 ·'),
  conferencia: L.slice(L.findIndex((l) => l.startsWith('# Parte 8 ·'))).join('\n').trimEnd(),
};

const doc = `# O que falta — 7 itens

Documento de trabalho, reduzido em **12/08/2026** para **só o que ainda não foi feito**.

O manual completo está em \`5-manual-COMPLETO.md.bak\`: vocabulário, Home, Grupo Avulso, os
**9 módulos já montados** e os consertos já fechados. As caixas que você marcou continuam
marcadas — a chave de cada módulo não mudou.

## A lista

| # | O quê | Onde |
|---|---|---|
| 1 | **Bloco de perguntas frequentes** na página da expedição | F1 · F2 |
| 2 | Módulo **"o que não está incluso"** | F1 |
| 3 | **Consertar o topo** — está mostrando Nova York | F3 |
| 4 | **Trocar o campo de endereço** para \`slug\` — mata 2 × 404 | F4 |
| 5 | **Linkar os cartões** da agenda às páginas | F5 |
| 6 | Passada de **celular** | F6 |
| 7 | Tirar a página crua \`/expedicoes\` do menu e dos buscadores | F4 |

**O mais barato:** o **F4** — quatro cliques e dois 404 somem.
**O que mais aparece:** o **F3** — é a primeira coisa que se vê em toda página de expedição.

### Já fechado, não precisa olhar

✅ 9 dos 11 módulos · ✅ as 7 coleções do CMS com conteúdo · ✅ C1 fotos distintas na agenda ·
✅ C2 filtro do FAQ · ✅ C3 ordenação · ✅ C5 os botões (o contador \`1/3\` da galeria ficou de
fora **por decisão** — é Arial, mas não carrega informação que ninguém precise) ·
✅ C6 acento · ✅ C4 avaliado e **dispensado** (você e o
cliente leem o hero sem dificuldade) · ✅ módulo do investimento montado e funcionando

---

### F1 · Os dois módulos que faltam

## 3.3 · Página da Expedição — os módulos restantes

${p.naoIncluso}

${p.faqModulo}

${p.guiaRemovido}

---

### F2 · Montar o FAQ da expedição

${bloco('faq-expedicao')}

### O código — um arquivo só, para o FAQ **e** para os cartões

${velo('tudo.js')}

${bloco('aplicar-velo')}

---

## Duas armadilhas de repetidor — valem aqui de novo

O FAQ tem **dois** repetidores e **dois** datasets, então as duas voltam a morder.

${p.trapDataset}

${p.trapUmItem}

---

### F3 · Consertar o topo — está mostrando Nova York

${bloco('topo')}

---

### F4 · O endereço da página, e a \`/expedicoes\` crua

${bloco('endereco')}

---

### F5 · Linkar os cartões da agenda

**Resolvido pelo mesmo \`tudo.js\` do F2** — cole no código da página do Grupo Avulso e os
cartões passam a abrir a página de cada expedição. Não precisa de ID, nem do plugue.

> **Por que o plugue não servia:** conexão de painel dá **um link estático, igual para os
> cinco**. Foi o que apareceu ao pôr na imagem — o link replicou no repetidor inteiro. Um
> link por item só existe dentro do \`onItemReady\`, que é código.

O caminho de conexão nativa fica registrado abaixo, caso um dia o campo \`Expedições (Item)\`
volte e você prefira sem código.

${bloco('ligar-agenda')}

---

### F6 · Celular

${p.mobile}

---

## Travado no cliente — não é sua fila

${p.clientePendente}

---

${p.conferencia}
`;

fs.writeFileSync(SAIDA, doc, 'utf8');

const depois = doc.split('\n').length;
console.log(`\n${L.length} → ${depois} linhas (${Math.round((1 - depois / L.length) * 100)}% menor)`);
console.log('módulos com ficha no documento: ' + (doc.match(/^### \d+\.\s+`/gm) || []).length);
console.log('cabeçalho 3.3 preservado: ' + (/^## 3\.3 ·/m.test(doc) ? 'sim ✓ (chaves e recortes intactos)' : 'NÃO ✘'));
