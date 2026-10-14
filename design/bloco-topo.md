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
