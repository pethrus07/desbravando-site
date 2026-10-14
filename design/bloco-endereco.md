---

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
