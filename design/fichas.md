# Fichas técnicas dos módulos

Gerado de `design/desbravando-repaginacao.pen` por `design/ficha.mjs`. **Não editar na mão** —
se algo aqui estiver errado, o errado é o design; corrige lá e roda de novo.

Como ler:

| Símbolo | O que é |
|---|---|
| `▸` | um container (linha ou coluna com auto-layout) |
| `T` | um texto — a segunda linha traz fonte, tamanho, peso, espaçamento e cor |
| `▣` | uma foto |
| `─` | um fio (retângulo de 1 ou 2px na largura toda) |
| `▪` | um retângulo com medida |
| `◆` | um ícone |
| `⇕` | respiro vertical — na Wix vira margem/padding |
| `↔` | mola (empurra o resto para a ponta) ou recuo lateral |

**"estica"** = ocupar o espaço que sobra (na Wix: largura 100% / *stretch*).
**"recuo"** = padding igual nos quatro lados.


---

## 01 · Home

Largura da tela: **1440px** · fundo **#F2F2F2 papel** · 11 módulos

### nav

```
▸  linha, largura estica, altura 78, alinha ao centro, fundo #000000 preto  «nav»
  ↔  recuo lateral 120px
  ▸  linha, largura estica, espaço 40, alinha ao centro
    ▣  FOTO 69×26
    ▸  linha, espaço 30, alinha ao centro
      T  «Expedições»
         Archivo 15 · entrelinha 1.6 · #FFFFFFD1 branco 82%
      T  «Estoque Off-Road»
         Archivo 15 · entrelinha 1.6 · #FFFFFFD1 branco 82%
      T  «Produtos»
         Archivo 15 · entrelinha 1.6 · #FFFFFFD1 branco 82%
      T  «O Desbravando»
         Archivo 15 · entrelinha 1.6 · #FFFFFFD1 branco 82%
    ↔  mola (empurra o resto)
    ▸  linha, espaço 7, alinha ao centro
      ▸  caixa, largura 13, altura 13, contorno   «ícone/globe»
      T  «Ready to welcome riders from around the world.»
         Archivo 12 · entrelinha 1.5 · #FFFFFF8C branco 55%
  ↔  recuo lateral 120px
```

### vídeo/vídeo de abertura

```
▸  coluna, largura estica, altura 560, fundo FOTO  «vídeo/vídeo de abertura»
  ▸  coluna, largura estica, altura estica, espaço 14, alinha ao centro, distribui ao centro, fundo degradê 180° (#00000047 → #0000007A)
    ▸  linha, largura 62, altura 62, alinha ao centro, distribui ao centro, contorno 1.5px #FFFFFFB3, canto 999
      ▸  caixa, largura 20, altura 20, contorno   «ícone/play»
    T  «VÍDEO DE ABERTURA»
       Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #FFFFFFA6 branco 65%
```

### posicionamento

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «posicionamento»
  ⇕  respiro 84px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica, espaço 24
      T  «O DESBRAVANDO»
         Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
      T  «MAIS QUE UMA MARCA. ⏎ UM ESTILO DE VIDA.»
         Anton 72 · entrelinha 1 · espaçamento -0.5 · #111111 tinta · largura estica
      T  «O Desbravando reúne pessoas que compartilham a mesma paixão pelo universo off-road. Da compra e venda de UTVs às expedições pelo Brasil, passando por produtos desenvolvidos para quem vive esse estilo de vida, cada detalhe é pensado para proporcionar experiências que vão muito além da trilha.»
         Archivo 18 · entrelinha 1.6 · #717171 cinza · largura 900
    ↔  recuo lateral 120px
  ⇕  respiro 84px
```

### destaques (carrossel automático)

```
▸  coluna, largura estica, altura 440, fundo FOTO  «destaques (carrossel automático)»
  ▸  coluna, largura estica, altura estica, fundo degradê 100° (#000000D9 → #00000026)
    ▸  linha, largura estica, altura estica, alinha ao centro
      ↔  recuo lateral 120px
      ▸  coluna, largura 620, espaço 18
        T  «PRÉ-RESERVA ABERTA»
           Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #FFFFFFA6 branco 65%
        T  «URUBICI · SANTA CATARINA»
           Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #FFFFFF branco · largura estica
        T  «3ª Expedição Família. 26 a 30 de agosto de 2026, na melhor janela do ano na serra catarinense.»
           Archivo 16 · entrelinha 1.6 · #FFFFFFD1 branco 82% · largura estica
        ⇕  respiro 4px
        ▸  linha, altura 48, recuo 22, espaço 9, alinha ao centro, distribui ao centro, fundo #FFFFFF branco  «botão/claro»
          T  «FAÇA SUA PRÉ-RESERVA»
             Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.4 · #000000 preto
          ▸  caixa, largura 13, altura 13, contorno   «ícone/arrow-right»
      ↔  mola (empurra o resto)
      ↔  recuo lateral 120px
    ▸  linha, largura estica, altura 38, espaço 8, alinha ao centro, distribui ao centro
      ▪  retângulo 26×3 · #FFFFFF branco
      ▪  retângulo 8×3 · #FFFFFF59 branco 35%
      ▪  retângulo 8×3 · #FFFFFF59 branco 35%
    ⇕  respiro 16px
```

### expedições

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «expedições»
  ⇕  respiro 96px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica
      ▸  coluna, largura estica, espaço 20  «etapa 1 · apresentação»
        T  «EXPEDIÇÕES»
           Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
        T  «ESCOLHA A EXPERIÊNCIA ⏎ QUE COMBINA COM VOCÊ.»
           Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
        T  «Dois formatos de expedições desenvolvidos para diferentes perfis, com o mesmo padrão de organização, segurança e experiência Desbravando.»
           Archivo 18 · entrelinha 1.6 · #717171 cinza · largura 720
      ⇕  respiro 56px
      ▸  coluna, largura estica, fundo #FFFFFF branco  «etapa 2 · opções»
        ▸  linha, largura estica
          ▸  coluna, largura estica, recuo 48  «formato/GRUPO AVULSO»
            T  «01»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +2 · #9A9A9A cinza fraco
            ⇕  respiro 34px
            T  «GRUPO AVULSO»
               Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
            ⇕  respiro 16px
            T  «Ideal para quem procura uma experiência organizada pelo Desbravando, com destino, data e grupo já formado.»
               Archivo 16 · entrelinha 1.6 · #717171 cinza · largura estica
            ⇕  respiro 36px
            ▸  coluna, largura estica
              ─  fio 1px #D9D9D9 linha (largura toda)
              ▸  linha, largura estica, recuo 13, espaço 20
                T  «QUEM VAI»
                   Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +3 · #9A9A9A cinza fraco · largura 128
                T  «Você, sua família ou seus amigos, ao lado de outros desbravadores»
                   Archivo 13.5 · entrelinha 1.5 · #111111 tinta · largura estica
              ▸  linha, largura estica, recuo 13, espaço 20
                T  «DATAS»
                   Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +3 · #9A9A9A cinza fraco · largura 128
                T  «Definidas no calendário do Desbravando»
                   Archivo 13.5 · entrelinha 1.5 · #111111 tinta · largura estica
              ▸  linha, largura estica, recuo 13, espaço 20
                T  «VAGA»
                   Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +3 · #9A9A9A cinza fraco · largura 128
                T  «Individual ou por carro»
                   Archivo 13.5 · entrelinha 1.5 · #111111 tinta · largura estica
              ▸  linha, largura estica, recuo 13, espaço 20
                T  «ROTEIRO»
                   Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +3 · #9A9A9A cinza fraco · largura 128
                T  «Pronto e reconhecido antes por quem vai guiar»
                   Archivo 13.5 · entrelinha 1.5 · #111111 tinta · largura estica
              ─  fio 1px #D9D9D9 linha (largura toda)
            ⇕  respiro 32px
            ▸  linha, altura 48, espaço 9, alinha ao centro, distribui ao centro  «botão/texto»
              T  «VER PRÓXIMAS EXPEDIÇÕES»
                 Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.4 · #111111 tinta
              ▸  caixa, largura 13, altura 13, contorno   «ícone/arrow-right»
          ▸  coluna, largura estica, recuo 48, fio esquerda 1px #D9D9D9 linha  «formato/GRUPO FECHADO»
            T  «02»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +2 · #9A9A9A cinza fraco
            ⇕  respiro 34px
            T  «GRUPO FECHADO»
               Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
            ⇕  respiro 16px
            T  «Ideal para quem deseja criar uma expedição exclusiva, personalizada em cada detalhe para o seu grupo.»
               Archivo 16 · entrelinha 1.6 · #717171 cinza · largura estica
            ⇕  respiro 36px
            ▸  coluna, largura estica
              ─  fio 1px #D9D9D9 linha (largura toda)
              ▸  linha, largura estica, recuo 13, espaço 20
                T  «QUEM VAI»
                   Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +3 · #9A9A9A cinza fraco · largura 128
                T  «Só quem você convidar — família, amigos ou a sua empresa»
                   Archivo 13.5 · entrelinha 1.5 · #111111 tinta · largura estica
              ▸  linha, largura estica, recuo 13, espaço 20
                T  «DATAS»
                   Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +3 · #9A9A9A cinza fraco · largura 128
                T  «Escolhidas pelo seu grupo»
                   Archivo 13.5 · entrelinha 1.5 · #111111 tinta · largura estica
              ▸  linha, largura estica, recuo 13, espaço 20
                T  «VAGA»
                   Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +3 · #9A9A9A cinza fraco · largura 128
                T  «O grupo inteiro, em exclusividade»
                   Archivo 13.5 · entrelinha 1.5 · #111111 tinta · largura estica
              ▸  linha, largura estica, recuo 13, espaço 20
                T  «ROTEIRO»
                   Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +3 · #9A9A9A cinza fraco · largura 128
                T  «Montado sob medida, do destino à alimentação»
                   Archivo 13.5 · entrelinha 1.5 · #111111 tinta · largura estica
              ─  fio 1px #D9D9D9 linha (largura toda)
            ⇕  respiro 32px
            ▸  linha, altura 48, espaço 9, alinha ao centro, distribui ao centro  «botão/texto»
              T  «SOLICITAR ORÇAMENTO»
                 Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.4 · #111111 tinta
              ▸  caixa, largura 13, altura 13, contorno   «ícone/arrow-right»
    ↔  recuo lateral 120px
  ⇕  respiro 96px
```

### galeria

```
▸  coluna, largura estica, alinha ao centro, fundo #FFFFFF branco  «galeria»
  ⇕  respiro 76px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica, espaço 26
      ▸  linha, largura estica, espaço 40, alinha ao fim
        ▸  coluna, espaço 12
          T  «GALERIA»
             Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
          T  «O QUE ACONTECE ⏎ QUANDO A ESTRADA ACABA.»
             Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta
        ↔  mola (empurra o resto)
        T  «Fotos das últimas expedições.»
           Archivo 13.5 · entrelinha 1.5 · #9A9A9A cinza fraco
      ▸  coluna, largura estica, espaço 14  «galeria (carrossel · 1 foto por vez)»
        ▸  coluna, largura estica, altura 480, fundo FOTO
          ▸  linha, largura estica, altura estica, recuo 22, alinha ao centro
            ▸  linha, largura 44, altura 44, alinha ao centro, distribui ao centro, fundo #FFFFFFE6 branco 90%, canto 999
              ▸  caixa, largura 19, altura 19, contorno   «ícone/chevron-left»
            ↔  mola (empurra o resto)
            ▸  linha, largura 44, altura 44, alinha ao centro, distribui ao centro, fundo #FFFFFFE6 branco 90%, canto 999
              ▸  caixa, largura 19, altura 19, contorno   «ícone/chevron-right»
        ▸  linha, largura estica, espaço 14, alinha ao centro
          T  «Urubici · Santa Catarina»
             Archivo 13.5 · entrelinha 1.5 · #717171 cinza
          ↔  mola (empurra o resto)
          T  «1 / 5»
             JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #717171 cinza
          ▸  linha, espaço 6, alinha ao centro
            ▪  retângulo 22×3 · #111111 tinta
            ▪  retângulo 8×3 · #D9D9D9 linha
            ▪  retângulo 8×3 · #D9D9D9 linha
            ▪  retângulo 8×3 · #D9D9D9 linha
            ▪  retângulo 8×3 · #D9D9D9 linha
    ↔  recuo lateral 120px
  ⇕  respiro 76px
```

### parceiros oficiais

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «parceiros oficiais»
  ⇕  respiro 88px
  ▸  linha, espaço 34, alinha ao centro, distribui ao centro
    ▸  linha, largura 180, altura 54, alinha ao centro, distribui ao centro  «logo/Can-Am»
      T  «Can-Am»
         Anton 34 · entrelinha 1.08 · espaçamento -0.4 · #9A9A9A cinza fraco
  ⇕  respiro 24px
  T  «PARCEIRA OFICIAL DAS EXPEDIÇÕES»
     Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
  ⇕  respiro 12px
  T  «Ao lado de quem compartilha a mesma paixão.»
     Anton 34 · entrelinha 1.08 · espaçamento -0.4 · alinhado à centro · #111111 tinta · largura 820
  ⇕  respiro 88px
```

### quem já foi

```
▸  coluna, largura estica, alinha ao centro, fundo #FFFFFF branco  «quem já foi»
  ⇕  respiro 76px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica, espaço 24
      ▸  coluna, largura 780, espaço 14
        T  «QUEM JÁ FOI»
           Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
        T  «A EXPEDIÇÃO ACABA. ⏎ O GRUPO CONTINUA.»
           Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
      ▸  coluna, largura estica
        ─  fio 2px #111111 tinta (largura toda)
        ▸  linha, largura estica, recuo 26, espaço 40, fio base 1px #D9D9D9 linha
          T  «↗»
             Anton 24 · entrelinha 1.12 · espaçamento -0.3 · #111111 tinta · largura 34
          T  «“Foi a primeira vez que levei minha mulher e meus dois filhos numa expedição. Não faltou nada — e é isso que faz a diferença.”»
             Archivo 18 · entrelinha 1.6 · #111111 tinta · largura estica
          T  «Participante da 2ª Expedição Família»
             Archivo 13.5 · entrelinha 1.5 · alinhado à direita · #717171 cinza · largura 240
        ▸  linha, largura estica, recuo 26, espaço 40
          T  «↗»
             Anton 24 · entrelinha 1.12 · espaçamento -0.3 · #111111 tinta · largura 34
          T  «“Já rodei com outros grupos. A diferença do Desbravando é a estrutura: apoio, resgate, e alguém pensando em tudo antes de você precisar.”»
             Archivo 18 · entrelinha 1.6 · #111111 tinta · largura estica
          T  «Participante · Serra da Canastra»
             Archivo 13.5 · entrelinha 1.5 · alinhado à direita · #717171 cinza · largura 240
        ─  fio 2px #111111 tinta (largura toda)
    ↔  recuo lateral 120px
  ⇕  respiro 76px
```

### comunidade

```
▸  coluna, largura estica, alinha ao centro, fundo #000000 preto  «comunidade»
  ⇕  respiro 104px
  ▣  FOTO 90×34
  ⇕  respiro 26px
  T  «COMUNIDADE DESBRAVANDO»
     Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #FFFFFF8C branco 55%
  ⇕  respiro 20px
  T  «Faça parte da ⏎ Comunidade Desbravando»
     Anton 62 · entrelinha 1 · espaçamento -0.5 · alinhado à centro · #FFFFFF branco · largura 900
  ⇕  respiro 20px
  T  «Cada nova experiência e cada nova conquista fortalecem sua trajetória e desbloqueiam benefícios exclusivos.»
     Archivo 18 · entrelinha 1.6 · alinhado à centro · #FFFFFFD1 branco 82% · largura 640
  ⇕  respiro 32px
  ▸  linha, altura 48, recuo 22, espaço 9, alinha ao centro, distribui ao centro, fundo #FFFFFF branco  «botão/claro»
    T  «CONHEÇA SUA JORNADA»
       Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.4 · #000000 preto
    ▸  caixa, largura 13, altura 13, contorno   «ícone/arrow-right»
  ⇕  respiro 104px
```

### três pilares

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «três pilares»
  ⇕  respiro 92px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica
      ▸  coluna, largura 780, espaço 14
        T  «AS TRÊS FRENTES»
           Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
        T  «TRÊS PILARES. ⏎ UMA ÚNICA PAIXÃO.»
           Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
        T  «Conheça as três frentes que dão vida ao universo Desbravando.»
           Archivo 18 · entrelinha 1.6 · #717171 cinza · largura estica
      ⇕  respiro 48px
      ▸  coluna, largura estica
        ─  fio 2px #111111 tinta (largura toda)
        ▸  linha, largura estica
          ▸  coluna, largura estica, recuo 32, espaço 18  «pilar/Expedições»
            T  «01»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +2 · #9A9A9A cinza fraco
            ⇕  respiro 14px
            ▸  coluna, largura estica, espaço 12
              T  «Expedições»
                 Anton 34 · entrelinha 1.08 · espaçamento -0.4 · #111111 tinta
              T  «Desbravar lugares. Conectar pessoas. Criar histórias.»
                 Archivo 18 · entrelinha 1.6 · #717171 cinza · largura estica
            ⇕  respiro 2px
            ▸  linha, altura 48, espaço 9, alinha ao centro, distribui ao centro  «botão/texto»
              T  «VER EXPEDIÇÕES»
                 Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.4 · #111111 tinta
              ▸  caixa, largura 13, altura 13, contorno   «ícone/arrow-right»
          ▸  coluna, largura estica, recuo 32, espaço 18, fio esquerda 1px #D9D9D9 linha  «pilar/Estoque Off-Road»
            T  «02»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +2 · #9A9A9A cinza fraco
            ⇕  respiro 14px
            ▸  coluna, largura estica, espaço 12
              T  «Estoque Off-Road»
                 Anton 34 · entrelinha 1.08 · espaçamento -0.4 · #111111 tinta
              T  «Construir confiança. Entregar transparência. Realizar sonhos.»
                 Archivo 18 · entrelinha 1.6 · #717171 cinza · largura estica
            ⇕  respiro 2px
            ▸  linha, altura 48, espaço 9, alinha ao centro, distribui ao centro  «botão/texto»
              T  «VER ESTOQUE»
                 Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.4 · #111111 tinta
              ▸  caixa, largura 13, altura 13, contorno   «ícone/arrow-right»
          ▸  coluna, largura estica, recuo 32, espaço 18, fio esquerda 1px #D9D9D9 linha  «pilar/Produtos»
            T  «03»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +2 · #9A9A9A cinza fraco
            ⇕  respiro 14px
            ▸  coluna, largura estica, espaço 12
              T  «Produtos»
                 Anton 34 · entrelinha 1.08 · espaçamento -0.4 · #111111 tinta
              T  «Autenticidade nos detalhes. Identidade em cada escolha.»
                 Archivo 18 · entrelinha 1.6 · #717171 cinza · largura estica
            ⇕  respiro 2px
            ▸  linha, altura 48, espaço 9, alinha ao centro, distribui ao centro  «botão/texto»
              T  «VER COLEÇÃO»
                 Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.4 · #111111 tinta
              ▸  caixa, largura 13, altura 13, contorno   «ícone/arrow-right»
        ─  fio 2px #111111 tinta (largura toda)
    ↔  recuo lateral 120px
  ⇕  respiro 92px
```

### rodapé

```
▸  coluna, largura estica, alinha ao centro, fundo #000000 preto  «rodapé»
  ⇕  respiro 58px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica, espaço 26
      ▸  linha, largura estica, espaço 44, alinha ao centro
        ▣  FOTO 74×28
        ↔  mola (empurra o resto)
        ▸  linha, espaço 28, alinha ao centro
          T  «Expedições»
             Archivo 13.5 · entrelinha 1.5 · #FFFFFFD1 branco 82%
          T  «Estoque Off-Road»
             Archivo 13.5 · entrelinha 1.5 · #FFFFFFD1 branco 82%
          T  «Produtos»
             Archivo 13.5 · entrelinha 1.5 · #FFFFFFD1 branco 82%
          T  «O Desbravando»
             Archivo 13.5 · entrelinha 1.5 · #FFFFFFD1 branco 82%
        ▪  retângulo 1×16 · #FFFFFF29 branco 16%
        ▸  linha, espaço 16, alinha ao centro
          ▸  caixa, largura 18, altura 18, contorno   «ícone/message-circle»
          ▸  caixa, largura 18, altura 18, contorno   «ícone/instagram»
          ▸  caixa, largura 18, altura 18, contorno   «ícone/youtube»
      ─  fio 1px #FFFFFF29 branco 16% (largura toda)
      ▸  linha, largura estica, espaço 26, alinha ao centro
        T  «© 2026 Desbravando UTV»
           Archivo 13 · entrelinha 1.5 · #FFFFFF8C branco 55%
        ↔  mola (empurra o resto)
        T  «Privacidade»
           Archivo 13 · entrelinha 1.5 · #FFFFFF8C branco 55%
        T  «Termos»
           Archivo 13 · entrelinha 1.5 · #FFFFFF8C branco 55%
    ↔  recuo lateral 120px
  ⇕  respiro 44px
```

---

## 02 · Grupo Avulso

Largura da tela: **1440px** · fundo **#F2F2F2 papel** · 7 módulos

### nav

```
▸  linha, largura estica, altura 78, alinha ao centro, fundo #000000 preto  «nav»
  ↔  recuo lateral 120px
  ▸  linha, largura estica, espaço 40, alinha ao centro
    ▣  FOTO 69×26
    ▸  linha, espaço 30, alinha ao centro
      T  «Expedições»
         Archivo 15 · peso 700 · entrelinha 1.6 · #FFFFFF branco
      T  «Estoque Off-Road»
         Archivo 15 · entrelinha 1.6 · #FFFFFFD1 branco 82%
      T  «Produtos»
         Archivo 15 · entrelinha 1.6 · #FFFFFFD1 branco 82%
      T  «O Desbravando»
         Archivo 15 · entrelinha 1.6 · #FFFFFFD1 branco 82%
    ↔  mola (empurra o resto)
    ▸  linha, espaço 7, alinha ao centro
      ▸  caixa, largura 13, altura 13, contorno   «ícone/globe»
      T  «Ready to welcome riders from around the world.»
         Archivo 12 · entrelinha 1.5 · #FFFFFF8C branco 55%
  ↔  recuo lateral 120px
```

### abertura

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «abertura»
  ⇕  respiro 84px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica, espaço 26
      ▸  linha, espaço 10, alinha ao centro
        T  «Expedições»
           Archivo 13.5 · entrelinha 1.5 · #717171 cinza
        T  «/»
           Archivo 13.5 · entrelinha 1.5 · #9A9A9A cinza fraco
        T  «Grupo Avulso»
           Archivo 13.5 · entrelinha 1.5 · #111111 tinta
      ▸  coluna, largura estica, espaço 26  «abertura»
        T  «GRUPO AVULSO»
           Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
        T  «PRÓXIMAS EXPEDIÇÕES»
           Anton 72 · entrelinha 1 · espaçamento -0.5 · #111111 tinta · largura estica
        ▸  linha, largura estica, espaço 60
          T  «Escolha seu próximo destino, conheça todos os detalhes da expedição e reserve sua vaga em um grupo já formado.»
             Archivo 18 · entrelinha 1.6 · #717171 cinza · largura 620
          ↔  mola (empurra o resto)
    ↔  recuo lateral 120px
  ⇕  respiro 84px
```

### transição · começa a agenda

```
▸  linha, largura estica, altura 68, alinha ao centro, fundo #000000 preto  «transição · começa a agenda»
  ↔  recuo lateral 120px
  ▸  linha, largura estica, espaço 16, alinha ao centro
    T  «AGENDA 2026»
       Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #FFFFFFD1 branco 82%
    ↔  mola (empurra o resto)
    T  «5 expedições»
       JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #FFFFFF8C branco 55%
  ↔  recuo lateral 120px
```

### agenda

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «agenda»
  ⇕  respiro 64px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica
      ─  fio 2px #111111 tinta (largura toda)
      ▸  linha, largura estica, recuo 26, espaço 24, alinha ao centro, fio base 1px #D9D9D9 linha  «índice/Costa Doce»
        T  «01»
           JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 40
        ▣  FOTO 208×138
        T  «COSTA DOCE»
           Anton 44 · entrelinha 1 · espaçamento -0.4 · #111111 tinta · largura 430
        ▸  coluna, largura 130, espaço 3
          T  «RS»
             Archivo 15 · entrelinha 1.6 · #111111 tinta
          T  «Casais e Família»
             Archivo 13.5 · entrelinha 1.5 · #717171 cinza
        ▸  coluna, largura 190, espaço 3
          T  «02–06 dez 2026»
             Archivo 15 · entrelinha 1.6 · #111111 tinta
          T  «Pré-reserva aberta»
             Archivo 13.5 · entrelinha 1.5 · #717171 cinza
        ↔  mola (empurra o resto)
        ▸  caixa, largura 20, altura 20, contorno   «ícone/arrow-right»
      ▸  linha, largura estica, recuo 26, espaço 24, alinha ao centro, fio base 1px #D9D9D9 linha  «índice/Urubici»
        T  «02»
           JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 40
        ▣  FOTO 208×138
        T  «URUBICI»
           Anton 44 · entrelinha 1 · espaçamento -0.4 · #111111 tinta · largura 430
        ▸  coluna, largura 130, espaço 3
          T  «SC»
             Archivo 15 · entrelinha 1.6 · #111111 tinta
          T  «Família»
             Archivo 13.5 · entrelinha 1.5 · #717171 cinza
        ▸  coluna, largura 190, espaço 3
          T  «26–30 ago 2026»
             Archivo 15 · entrelinha 1.6 · #111111 tinta
          T  «Últimas vagas»
             Archivo 13.5 · entrelinha 1.5 · #717171 cinza
        ↔  mola (empurra o resto)
        ▸  caixa, largura 20, altura 20, contorno   «ícone/arrow-right»
      ▸  linha, largura estica, recuo 26, espaço 24, alinha ao centro, fio base 1px #D9D9D9 linha  «índice/Serra da Canastra»
        T  «03»
           JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 40
        ▣  FOTO 208×138
        T  «SERRA DA CANASTRA»
           Anton 44 · entrelinha 1 · espaçamento -0.4 · #111111 tinta · largura 430
        ▸  coluna, largura 130, espaço 3
          T  «MG»
             Archivo 15 · entrelinha 1.6 · #111111 tinta
          T  «Só Homens»
             Archivo 13.5 · entrelinha 1.5 · #717171 cinza
        ▸  coluna, largura 190, espaço 3
          T  «Datas em definição»
             Archivo 15 · entrelinha 1.6 · #111111 tinta
          T  «Lista de espera»
             Archivo 13.5 · entrelinha 1.5 · #717171 cinza
        ↔  mola (empurra o resto)
        ▸  caixa, largura 20, altura 20, contorno   «ícone/arrow-right»
      ▸  linha, largura estica, recuo 26, espaço 24, alinha ao centro, fio base 1px #D9D9D9 linha  «índice/Visconde de Mauá»
        T  «04»
           JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 40
        ▣  FOTO 208×138
        T  «VISCONDE DE MAUÁ»
           Anton 44 · entrelinha 1 · espaçamento -0.4 · #111111 tinta · largura 430
        ▸  coluna, largura 130, espaço 3
          T  «RJ»
             Archivo 15 · entrelinha 1.6 · #111111 tinta
          T  «Só Homens»
             Archivo 13.5 · entrelinha 1.5 · #717171 cinza
        ▸  coluna, largura 190, espaço 3
          T  «Datas em definição»
             Archivo 15 · entrelinha 1.6 · #111111 tinta
          T  «Lista de espera»
             Archivo 13.5 · entrelinha 1.5 · #717171 cinza
        ↔  mola (empurra o resto)
        ▸  caixa, largura 20, altura 20, contorno   «ícone/arrow-right»
      ▸  linha, largura estica, recuo 26, espaço 24, alinha ao centro, fio base 1px #D9D9D9 linha  «índice/Macaé»
        T  «05»
           JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 40
        ▣  FOTO 208×138
        T  «MACAÉ»
           Anton 44 · entrelinha 1 · espaçamento -0.4 · #111111 tinta · largura 430
        ▸  coluna, largura 130, espaço 3
          T  «RJ»
             Archivo 15 · entrelinha 1.6 · #111111 tinta
          T  «Casais e Família»
             Archivo 13.5 · entrelinha 1.5 · #717171 cinza
        ▸  coluna, largura 190, espaço 3
          T  «Datas em definição»
             Archivo 15 · entrelinha 1.6 · #111111 tinta
          T  «Lista de espera»
             Archivo 13.5 · entrelinha 1.5 · #717171 cinza
        ↔  mola (empurra o resto)
        ▸  caixa, largura 20, altura 20, contorno   «ícone/arrow-right»
    ↔  recuo lateral 120px
  ⇕  respiro 96px
```

### faq

```
▸  coluna, largura estica, alinha ao centro, fundo #FFFFFF branco  «faq»
  ⇕  respiro 84px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica, espaço 26
      ▸  coluna, largura 780, espaço 14  «cabeçalho»
        T  «DÚVIDAS»
           Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
        T  «PERGUNTAS FREQUENTES»
           Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
      ▸  coluna, largura estica
        ─  fio 2px #111111 tinta (largura toda)
        ▸  coluna, largura estica, recuo 22, espaço 14, fio base 1px #D9D9D9 linha
          ▸  linha, largura estica, espaço 20, alinha ao centro
            T  «Preciso ter UTV próprio para participar?»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura estica
            ▸  caixa, largura 18, altura 18, contorno   «ícone/minus»
          T  «Não necessariamente. A maior parte do grupo vai com o próprio carro, mas trabalhamos com parceiros de locação na região e conseguimos indicar um veículo do porte certo para o roteiro. Fale com a gente no WhatsApp antes de fechar a vaga.»
             Archivo 16 · entrelinha 1.6 · #717171 cinza · largura 860
        ▸  coluna, largura estica, recuo 22, espaço 14, fio base 1px #D9D9D9 linha
          ▸  linha, largura estica, espaço 20, alinha ao centro
            T  «Qual o nível de dificuldade dessa expedição?»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura estica
            ▸  caixa, largura 18, altura 18, contorno   «ícone/plus»
        ▸  coluna, largura estica, recuo 22, espaço 14, fio base 1px #D9D9D9 linha
          ▸  linha, largura estica, espaço 20, alinha ao centro
            T  «Criança pode ir? A partir de que idade?»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura estica
            ▸  caixa, largura 18, altura 18, contorno   «ícone/plus»
        ▸  coluna, largura estica, recuo 22, espaço 14, fio base 1px #D9D9D9 linha
          ▸  linha, largura estica, espaço 20, alinha ao centro
            T  «Como funciona o apoio mecânico e o resgate?»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura estica
            ▸  caixa, largura 18, altura 18, contorno   «ícone/plus»
        ▸  coluna, largura estica, recuo 22, espaço 14, fio base 1px #D9D9D9 linha
          ▸  linha, largura estica, espaço 20, alinha ao centro
            T  «O que acontece se eu precisar cancelar?»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura estica
            ▸  caixa, largura 18, altura 18, contorno   «ícone/plus»
        ▸  coluna, largura estica, recuo 22, espaço 14, fio base 1px #D9D9D9 linha
          ▸  linha, largura estica, espaço 20, alinha ao centro
            T  «Preciso levar combustível? Tem posto no roteiro?»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura estica
            ▸  caixa, largura 18, altura 18, contorno   «ícone/plus»
    ↔  recuo lateral 120px
  ⇕  respiro 84px
```

### chamada final · cadastro de interesse

```
▸  coluna, largura estica, alinha ao centro, fundo #FFFFFF branco  «chamada final · cadastro de interesse»
  ⇕  respiro 100px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica
      ─  fio 2px #111111 tinta (largura toda)
      ⇕  respiro 40px
      ▸  linha, largura estica, espaço 80
        ▸  coluna, largura 560, espaço 16
          T  «NOVAS EXPEDIÇÕES»
             Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
          T  «AINDA NÃO ENCONTROU ⏎ SUA PRÓXIMA EXPERIÊNCIA?»
             Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
        ▸  coluna, largura estica, espaço 34
          T  «Nossa agenda é atualizada constantemente. Cadastre seu interesse e seja avisado quando uma nova expedição estiver disponível para o seu perfil.»
             Archivo 18 · entrelinha 1.6 · #717171 cinza · largura estica
          ▸  linha, largura estica, altura 58, espaço 20, alinha ao centro, fio base 1.5px #111111 tinta
            T  «seu e-mail»
               Archivo 18 · entrelinha 1.6 · #9A9A9A cinza fraco · largura estica
            ▸  linha, espaço 9, alinha ao centro
              T  «AVISE-ME»
                 Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.4 · #111111 tinta
              ▸  caixa, largura 14, altura 14, contorno   «ícone/arrow-right»
    ↔  recuo lateral 120px
  ⇕  respiro 100px
```

### rodapé

```
▸  coluna, largura estica, alinha ao centro, fundo #000000 preto  «rodapé»
  ⇕  respiro 58px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica, espaço 26
      ▸  linha, largura estica, espaço 44, alinha ao centro
        ▣  FOTO 74×28
        ↔  mola (empurra o resto)
        ▸  linha, espaço 28, alinha ao centro
          T  «Expedições»
             Archivo 13.5 · entrelinha 1.5 · #FFFFFFD1 branco 82%
          T  «Estoque Off-Road»
             Archivo 13.5 · entrelinha 1.5 · #FFFFFFD1 branco 82%
          T  «Produtos»
             Archivo 13.5 · entrelinha 1.5 · #FFFFFFD1 branco 82%
          T  «O Desbravando»
             Archivo 13.5 · entrelinha 1.5 · #FFFFFFD1 branco 82%
        ▪  retângulo 1×16 · #FFFFFF29 branco 16%
        ▸  linha, espaço 16, alinha ao centro
          ▸  caixa, largura 18, altura 18, contorno   «ícone/message-circle»
          ▸  caixa, largura 18, altura 18, contorno   «ícone/instagram»
          ▸  caixa, largura 18, altura 18, contorno   «ícone/youtube»
      ─  fio 1px #FFFFFF29 branco 16% (largura toda)
      ▸  linha, largura estica, espaço 26, alinha ao centro
        T  «© 2026 Desbravando UTV»
           Archivo 13 · entrelinha 1.5 · #FFFFFF8C branco 55%
        ↔  mola (empurra o resto)
        T  «Privacidade»
           Archivo 13 · entrelinha 1.5 · #FFFFFF8C branco 55%
        T  «Termos»
           Archivo 13 · entrelinha 1.5 · #FFFFFF8C branco 55%
    ↔  recuo lateral 120px
  ⇕  respiro 44px
```

---

## 03 · Página da Expedição — Costa Doce

Largura da tela: **1440px** · fundo **#F2F2F2 papel** · 14 módulos

### nav

```
▸  linha, largura estica, altura 78, alinha ao centro, fundo #000000 preto  «nav»
  ↔  recuo lateral 120px
  ▸  linha, largura estica, espaço 40, alinha ao centro
    ▣  FOTO 69×26
    ▸  linha, espaço 30, alinha ao centro
      T  «Expedições»
         Archivo 15 · peso 700 · entrelinha 1.6 · #FFFFFF branco
      T  «Estoque Off-Road»
         Archivo 15 · entrelinha 1.6 · #FFFFFFD1 branco 82%
      T  «Produtos»
         Archivo 15 · entrelinha 1.6 · #FFFFFFD1 branco 82%
      T  «O Desbravando»
         Archivo 15 · entrelinha 1.6 · #FFFFFFD1 branco 82%
    ↔  mola (empurra o resto)
    ▸  linha, espaço 7, alinha ao centro
      ▸  caixa, largura 13, altura 13, contorno   «ícone/globe»
      T  «Ready to welcome riders from around the world.»
         Archivo 12 · entrelinha 1.5 · #FFFFFF8C branco 55%
  ↔  recuo lateral 120px
```

### vídeo/vídeo da expedição

```
▸  coluna, largura estica, altura 520, fundo FOTO  «vídeo/vídeo da expedição»
  ▸  coluna, largura estica, altura estica, espaço 14, alinha ao centro, distribui ao centro, fundo degradê 180° (#00000047 → #0000007A)
    ▸  linha, largura 62, altura 62, alinha ao centro, distribui ao centro, contorno 1.5px #FFFFFFB3, canto 999
      ▸  caixa, largura 20, altura 20, contorno   «ícone/play»
    T  «VÍDEO DA EXPEDIÇÃO»
       Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #FFFFFFA6 branco 65%
```

### apresentação

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «apresentação»
  ⇕  respiro 64px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica, espaço 24
      ▸  linha, espaço 10, alinha ao centro
        T  «Expedições»
           Archivo 13.5 · entrelinha 1.5 · #717171 cinza
        T  «/»
           Archivo 13.5 · entrelinha 1.5 · #9A9A9A cinza fraco
        T  «Grupo Avulso»
           Archivo 13.5 · entrelinha 1.5 · #717171 cinza
        T  «/»
           Archivo 13.5 · entrelinha 1.5 · #9A9A9A cinza fraco
        T  «Costa Doce · RS»
           Archivo 13.5 · entrelinha 1.5 · #111111 tinta
      ▸  linha, largura estica, espaço 60
        ▸  coluna, largura estica, espaço 20
          T  «EXPEDIÇÃO COSTA DOCE · 02 A 06 DE DEZEMBRO DE 2026»
             Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
          T  «COSTA DOCE ⏎ RIO GRANDE DO SUL»
             Anton 72 · entrelinha 1 · espaçamento -0.5 · #111111 tinta · largura estica
          T  «Isso não é trilha, é expedição padrão Desbravando.»
             Archivo 18 · entrelinha 1.6 · #717171 cinza · largura 620
          ▸  linha, espaço 7, alinha ao centro  «status/pre-reserva»
            ▪  retângulo 5×5 · #9A9A9A cinza fraco
            T  «Pré-reserva aberta»
               Archivo 13.5 · entrelinha 1.5 · #717171 cinza
        ▸  coluna, espaço 12, alinha ao fim
          ▸  linha, altura 54, recuo 24, espaço 9, alinha ao centro, distribui ao centro, fundo #000000 preto  «botão/solido»
            T  «FAZER PRÉ-RESERVA»
               Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.4 · #FFFFFF branco
            ▸  caixa, largura 13, altura 13, contorno   «ícone/arrow-right»
          T  «sem precisar rolar a página inteira»
             Archivo 13.5 · entrelinha 1.5 · #9A9A9A cinza fraco
    ↔  recuo lateral 120px
  ⇕  respiro 64px
```

### resumo da expedição

```
▸  coluna, largura estica, alinha ao centro, fundo #FFFFFF branco  «resumo da expedição»
  ⇕  respiro 52px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica
      ▸  coluna, largura estica
        ─  fio 2px #111111 tinta (largura toda)
        ▸  linha, largura estica, recuo 22
          ▸  coluna, largura estica, espaço 6
            T  «LOCALIZAÇÃO»
               JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.4 · #717171 cinza
            T  «Litoral do RS · Brasil»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
          ▸  coluna, largura estica, espaço 6
            T  «BASE»
               JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.4 · #717171 cinza
            T  «Mostardas & Tramandaí»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
          ▸  coluna, largura estica, espaço 6
            T  «DURAÇÃO»
               JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.4 · #717171 cinza
            T  «5 dias · 3 de trilha»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
        ─  fio 1px #D9D9D9 linha (largura toda)
        ▸  linha, largura estica, recuo 22
          ▸  coluna, largura estica, espaço 6
            T  «VEÍCULOS»
               JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.4 · #717171 cinza
            T  «O seu UTV · transporte incluso»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
          ▸  coluna, largura estica, espaço 6
            T  «DESTAQUES»
               JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.4 · #717171 cinza
            T  «Dunas · lagoas · faróis»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
          ▸  coluna, largura estica, espaço 6
            T  «PERCURSO»
               JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.4 · #717171 cinza
            T  «~540 km em 3 dias de trilha»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
        ─  fio 1px #D9D9D9 linha (largura toda)
        ▸  linha, largura estica, recuo 22
          ▸  coluna, largura estica, espaço 6
            T  «DATAS»
               JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.4 · #717171 cinza
            T  «02 a 06 de dezembro de 2026»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
          ▸  coluna, largura estica, espaço 6
            T  «FORMATO»
               JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.4 · #717171 cinza
            T  «Casais e Família»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
          ▸  coluna, largura estica, espaço 6
            T  «REGIÃO»
               JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.4 · #717171 cinza
            T  «Mostardas · Lagoa do Peixe · Tramandaí»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
        ─  fio 2px #111111 tinta (largura toda)
    ↔  recuo lateral 120px
  ⇕  respiro 52px
```

### galeria

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «galeria»
  ⇕  respiro 72px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica, espaço 24
      ▸  linha, largura estica, espaço 40, alinha ao fim
        ▸  coluna, espaço 12
          T  «REGISTRO»
             Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
          T  «A EXPEDIÇÃO POR DENTRO»
             Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta
        ↔  mola (empurra o resto)
        T  «Dunas, lagoas e beira-oceano.»
           Archivo 13.5 · entrelinha 1.5 · #9A9A9A cinza fraco
      ▸  coluna, largura estica, espaço 14  «galeria (carrossel · 1 foto por vez)»
        ▸  coluna, largura estica, altura 520, fundo FOTO
          ▸  linha, largura estica, altura estica, recuo 22, alinha ao centro
            ▸  linha, largura 44, altura 44, alinha ao centro, distribui ao centro, fundo #FFFFFFE6 branco 90%, canto 999
              ▸  caixa, largura 19, altura 19, contorno   «ícone/chevron-left»
            ↔  mola (empurra o resto)
            ▸  linha, largura 44, altura 44, alinha ao centro, distribui ao centro, fundo #FFFFFFE6 branco 90%, canto 999
              ▸  caixa, largura 19, altura 19, contorno   «ícone/chevron-right»
        ▸  linha, largura estica, espaço 14, alinha ao centro
          T  «Parque Nacional da Lagoa do Peixe»
             Archivo 13.5 · entrelinha 1.5 · #717171 cinza
          ↔  mola (empurra o resto)
          T  «1 / 4»
             JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #717171 cinza
          ▸  linha, espaço 6, alinha ao centro
            ▪  retângulo 22×3 · #111111 tinta
            ▪  retângulo 8×3 · #D9D9D9 linha
            ▪  retângulo 8×3 · #D9D9D9 linha
            ▪  retângulo 8×3 · #D9D9D9 linha
    ↔  recuo lateral 120px
  ⇕  respiro 72px
```

### sobre o destino

```
▸  coluna, largura estica, alinha ao centro, fundo #FFFFFF branco  «sobre o destino»
  ⇕  respiro 76px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica, espaço 24
      ▸  coluna, largura 780, espaço 14
        T  «O DESTINO»
           Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
        T  «O TRECHO MAIS BRUTO ⏎ DO LITORAL GAÚCHO.»
           Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
      ▸  linha, largura estica, espaço 56
        T  «Cinco dias cruzando o trecho mais bruto do litoral gaúcho — dunas que não acabam, lagoas de água doce escondidas na areia, beira-oceano por quilômetros, matas de pinus, vilas de pescadores e faróis. Tudo com hospedagem escolhida a dedo entre o padrão e as opções da região e estrutura completa de apoio.»
           Archivo 16 · entrelinha 1.6 · #717171 cinza · largura estica
        ▸  coluna, largura estica
          ─  fio 1px #D9D9D9 linha (largura toda)
          ▸  linha, largura estica, recuo 14, espaço 20, fio base 1px #D9D9D9 linha
            T  «BASE»
               Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +3 · #9A9A9A cinza fraco · largura 110
            T  «Mostardas & Tramandaí»
               Archivo 13.5 · entrelinha 1.5 · #111111 tinta · largura estica
          ▸  linha, largura estica, recuo 14, espaço 20, fio base 1px #D9D9D9 linha
            T  «TRILHA»
               Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +3 · #9A9A9A cinza fraco · largura 110
            T  «3 dias · ~540 km»
               Archivo 13.5 · entrelinha 1.5 · #111111 tinta · largura estica
          ▸  linha, largura estica, recuo 14, espaço 20, fio base 1px #D9D9D9 linha
            T  «SEU CARRO»
               Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +3 · #9A9A9A cinza fraco · largura 110
            T  «Vai de cegonha, com seguro contra roubo»
               Archivo 13.5 · entrelinha 1.5 · #111111 tinta · largura estica
    ↔  recuo lateral 120px
  ⇕  respiro 76px
```

### roteiro

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «roteiro»
  ⇕  respiro 84px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica
      ▸  coluna, largura 820, espaço 14
        T  «ROTEIRO»
           Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
        T  «DIA A DIA DA EXPEDIÇÃO»
           Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta
        T  «O roteiro pode mudar por causa do tempo ou das condições da trilha — a equipe decide em campo, sempre pela segurança do grupo.»
           Archivo 16 · entrelinha 1.6 · #717171 cinza · largura estica
      ⇕  respiro 46px
      ▸  coluna, largura estica
        ─  fio 2px #111111 tinta (largura toda)
        ▸  linha, largura estica, recuo 30, espaço 40  «roteiro/dia 01»
          ▸  coluna, largura 108, espaço 6
            T  «DIA»
               Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +3 · #9A9A9A cinza fraco
            T  «01»
               Anton 44 · entrelinha 1 · espaçamento -0.4 · #111111 tinta
          ▸  coluna, largura estica, espaço 10, fio esquerda 1px #D9D9D9 linha
            ▸  linha, largura estica
              ↔  recuo lateral 32px
              ▸  coluna, largura estica, espaço 10
                ▸  linha, largura estica, espaço 12, alinha ao centro
                  T  «02 dez · Mostardas · RS»
                     JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco
                  ↔  mola (empurra o resto)
                T  «CHEGADA»
                   Anton 24 · entrelinha 1.12 · espaçamento -0.3 · #111111 tinta · largura estica
                T  «Check-in a partir das 15:00 em Mostardas. O evento de boas-vindas inicia às 19:00 com jantar completo, chopp, drinks e música ao vivo.»
                   Archivo 16 · entrelinha 1.6 · #717171 cinza · largura estica
        ▸  linha, largura estica, recuo 30, espaço 40, fio topo 1px #D9D9D9 linha  «roteiro/dia 02»
          ▸  coluna, largura 108, espaço 6
            T  «DIA»
               Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +3 · #9A9A9A cinza fraco
            T  «02»
               Anton 44 · entrelinha 1 · espaçamento -0.4 · #111111 tinta
          ▸  coluna, largura estica, espaço 10, fio esquerda 1px #D9D9D9 linha
            ▸  linha, largura estica
              ↔  recuo lateral 32px
              ▸  coluna, largura estica, espaço 10
                ▸  linha, largura estica, espaço 12, alinha ao centro
                  T  «03 dez · Lagoa do Peixe»
                     JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco
                  ↔  mola (empurra o resto)
                  T  «~170 km»
                     JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #111111 tinta
                T  «PONTAL DO BUJURU»
                   Anton 24 · entrelinha 1.12 · espaçamento -0.3 · #111111 tinta · largura estica
                T  «Beira-mar até Bujuru pelo Parque Nacional da Lagoa do Peixe, margens da Lagoa dos Patos e o Pontal do Bujuru.»
                   Archivo 16 · entrelinha 1.6 · #717171 cinza · largura estica
        ▸  linha, largura estica, recuo 30, espaço 40, fio topo 1px #D9D9D9 linha  «roteiro/dia 03»
          ▸  coluna, largura 108, espaço 6
            T  «DIA»
               Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +3 · #9A9A9A cinza fraco
            T  «03»
               Anton 44 · entrelinha 1 · espaçamento -0.4 · #111111 tinta
          ▸  coluna, largura estica, espaço 10, fio esquerda 1px #D9D9D9 linha
            ▸  linha, largura estica
              ↔  recuo lateral 32px
              ▸  coluna, largura estica, espaço 10
                ▸  linha, largura estica, espaço 12, alinha ao centro
                  T  «04 dez · Mostardas · RS»
                     JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco
                  ↔  mola (empurra o resto)
                  T  «~140 km»
                     JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #111111 tinta
                T  «FAROL CRISTÓVÃO PEREIRA»
                   Anton 24 · entrelinha 1.12 · espaçamento -0.3 · #111111 tinta · largura estica
                T  «Estradas vicinais, floresta de pinus e dunas até o Farol Cristóvão Pereira, com almoço na trilha e volta pela margem da Lagoa dos Patos.»
                   Archivo 16 · entrelinha 1.6 · #717171 cinza · largura estica
        ▸  linha, largura estica, recuo 30, espaço 40, fio topo 1px #D9D9D9 linha  «roteiro/dia 04»
          ▸  coluna, largura 108, espaço 6
            T  «DIA»
               Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +3 · #9A9A9A cinza fraco
            T  «04»
               Anton 44 · entrelinha 1 · espaçamento -0.4 · #111111 tinta
          ▸  coluna, largura estica, espaço 10, fio esquerda 1px #D9D9D9 linha
            ▸  linha, largura estica
              ↔  recuo lateral 32px
              ▸  coluna, largura estica, espaço 10
                ▸  linha, largura estica, espaço 12, alinha ao centro
                  T  «05 dez · Tramandaí · RS»
                     JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco
                  ↔  mola (empurra o resto)
                  T  «~230 km»
                     JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #111111 tinta
                T  «MOSTARDAS → TRAMANDAÍ»
                   Anton 24 · entrelinha 1.12 · espaçamento -0.3 · #111111 tinta · largura estica
                T  «Dunas e reflorestamento, almoço na Lagoa do Bacupari, praia de São Simão e beira-oceano até Tramandaí. À noite, fora do volante, nosso tradicional evento de encerramento.»
                   Archivo 16 · entrelinha 1.6 · #717171 cinza · largura estica
        ▸  linha, largura estica, recuo 30, espaço 40, fio topo 1px #D9D9D9 linha  «roteiro/dia 05»
          ▸  coluna, largura 108, espaço 6
            T  «DIA»
               Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +3 · #9A9A9A cinza fraco
            T  «05»
               Anton 44 · entrelinha 1 · espaçamento -0.4 · #111111 tinta
          ▸  coluna, largura estica, espaço 10, fio esquerda 1px #D9D9D9 linha
            ▸  linha, largura estica
              ↔  recuo lateral 32px
              ▸  coluna, largura estica, espaço 10
                ▸  linha, largura estica, espaço 12, alinha ao centro
                  T  «06 dez · Tramandaí · RS»
                     JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco
                  ↔  mola (empurra o resto)
                T  «DESPEDIDA»
                   Anton 24 · entrelinha 1.12 · espaçamento -0.3 · #111111 tinta · largura estica
                T  «Café da manhã e check-out, sem pressa. Você volta para casa com memórias que duram para sempre.»
                   Archivo 16 · entrelinha 1.6 · #717171 cinza · largura estica
        ─  fio 2px #111111 tinta (largura toda)
    ↔  recuo lateral 120px
  ⇕  respiro 84px
```

### hospedagem

```
▸  coluna, largura estica, alinha ao centro, fundo #FFFFFF branco  «hospedagem»
  ⇕  respiro 80px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica
      ▸  linha, largura estica, espaço 40, alinha ao fim
        ▸  coluna, largura 640, espaço 14
          T  «HOSPEDAGEM»
             Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
          T  «ONDE O GRUPO FICA»
             Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta
        ↔  mola (empurra o resto)
        T  «2 hospedagens · 4 pernoites»
           JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #111111 tinta
      ⇕  respiro 18px
      T  «Hospedagem escolhida a dedo entre as opções e padrões da região · 4 pernoites com café da manhã · jantas inclusas (3 em Mostardas · 1 em Tramandaí).»
         Archivo 16 · entrelinha 1.6 · #717171 cinza · largura 780
      ⇕  respiro 40px
      ▸  coluna, largura estica
        ─  fio 2px #111111 tinta (largura toda)
        ▸  coluna, largura estica, recuo 30, espaço 20  «hospedagem/Pousada Pouso Alegre»
          ▸  linha, largura estica, espaço 40
            ▸  coluna, largura 360, espaço 8
              T  «CHEGADA & CORAÇÃO DA EXPEDIÇÃO»
                 Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
              T  «Pousada Pouso Alegre»
                 Anton 24 · entrelinha 1.12 · espaçamento -0.3 · #111111 tinta · largura estica
              ▸  linha, espaço 10, alinha ao centro
                T  «Mostardas · RS»
                   JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco
                ▪  retângulo 3×3 · #9A9A9A cinza fraco
                T  «3 noites»
                   JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #111111 tinta
            T  «No centro do roteiro, com café da manhã. Sua base nas noites 1, 2 e 3.»
               Archivo 18 · entrelinha 1.6 · #717171 cinza · largura estica
          ▸  linha, largura estica, espaço 6
            ▣  FOTO estica×176
            ▣  FOTO estica×176
            ▣  FOTO estica×176
            ▣  FOTO 70×176
        ▸  coluna, largura estica, recuo 30, espaço 20, fio topo 1px #D9D9D9 linha  «hospedagem/Schenkel Hotel»
          ▸  linha, largura estica, espaço 40
            ▸  coluna, largura 360, espaço 8
              T  «BASE DA DESPEDIDA»
                 Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
              T  «Schenkel Hotel»
                 Anton 24 · entrelinha 1.12 · espaçamento -0.3 · #111111 tinta · largura estica
              ▸  linha, espaço 10, alinha ao centro
                T  «Tramandaí · RS»
                   JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco
                ▪  retângulo 3×3 · #9A9A9A cinza fraco
                T  «1 noite»
                   JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #111111 tinta
            T  «Apart-hotel com café da manhã. Sua base na última noite — noite 4.»
               Archivo 18 · entrelinha 1.6 · #717171 cinza · largura estica
          ▸  linha, largura estica, espaço 6
            ▣  FOTO estica×176
            ▣  FOTO estica×176
            ▣  FOTO estica×176
            ▣  FOTO 70×176
        ─  fio 2px #111111 tinta (largura toda)
    ↔  recuo lateral 120px
  ⇕  respiro 80px
```

### está incluso

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «está incluso»
  ⇕  respiro 84px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica
      ▸  coluna, largura 780, espaço 14
        T  «O PACOTE»
           Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
        T  «O QUE ESTÁ INCLUSO»
           Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta
      ⇕  respiro 36px
      ▸  coluna, largura estica, recuo 40, fundo #FFFFFF branco  «o que está incluso»
        ▸  linha, largura estica, espaço 20, alinha ao fim
          T  «TUDO ISTO ACOMPANHA A EXPEDIÇÃO»
             Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
          ↔  mola (empurra o resto)
          T  «11 itens»
             JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #111111 tinta
        ⇕  respiro 22px
        ─  fio 2px #111111 tinta (largura toda)
        ▸  linha, largura estica, espaço 48
          ▸  coluna, largura estica
            ▸  linha, largura estica, recuo 14, espaço 16, fio base 1px #D9D9D9 linha
              T  «01»
                 JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 32
              T  «3 dias de trilha guiada por equipe experiente»
                 Archivo 16 · entrelinha 1.6 · #111111 tinta · largura estica
            ▸  linha, largura estica, recuo 14, espaço 16, fio base 1px #D9D9D9 linha
              T  «02»
                 JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 32
              T  «Cegonha (transporte do UTV) ida e volta, com seguro contra roubo»
                 Archivo 16 · entrelinha 1.6 · #111111 tinta · largura estica
            ▸  linha, largura estica, recuo 14, espaço 16, fio base 1px #D9D9D9 linha
              T  «03»
                 JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 32
              T  «Transfer terrestre ida e volta — Limeira ↔ aeroporto e Porto Alegre ↔ Mostardas/Tramandaí»
                 Archivo 16 · entrelinha 1.6 · #111111 tinta · largura estica
            ▸  linha, largura estica, recuo 14, espaço 16, fio base 1px #D9D9D9 linha
              T  «04»
                 JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 32
              T  «4 pernoites com café da manhã (3 Mostardas · 1 Tramandaí)»
                 Archivo 16 · entrelinha 1.6 · #111111 tinta · largura estica
            ▸  linha, largura estica, recuo 14, espaço 16, fio base 1px #D9D9D9 linha
              T  «05»
                 JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 32
              T  «4 jantas (3 Mostardas · 1 Tramandaí)»
                 Archivo 16 · entrelinha 1.6 · #111111 tinta · largura estica
            ▸  linha, largura estica, recuo 14, espaço 16
              T  «06»
                 JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 32
              T  «3 almoços (2 Mostardas · 1 Tramandaí)»
                 Archivo 16 · entrelinha 1.6 · #111111 tinta · largura estica
          ▸  coluna, largura estica
            ▸  linha, largura estica, recuo 14, espaço 16, fio base 1px #D9D9D9 linha
              T  «07»
                 JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 32
              T  «Eventos fora do volante — boas-vindas e encerramento, com coquetel, chopp, drinks e música ao vivo»
                 Archivo 16 · entrelinha 1.6 · #111111 tinta · largura estica
            ▸  linha, largura estica, recuo 14, espaço 16, fio base 1px #D9D9D9 linha
              T  «08»
                 JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 32
              T  «Carro de apoio 4×4 + reboque»
                 Archivo 16 · entrelinha 1.6 · #111111 tinta · largura estica
            ▸  linha, largura estica, recuo 14, espaço 16, fio base 1px #D9D9D9 linha
              T  «09»
                 JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 32
              T  «4 quadriciclos + mecânicos no comboio»
                 Archivo 16 · entrelinha 1.6 · #111111 tinta · largura estica
            ▸  linha, largura estica, recuo 14, espaço 16, fio base 1px #D9D9D9 linha
              T  «10»
                 JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 32
              T  «Equipe de 7 pessoas — guias, apoio e mecânica»
                 Archivo 16 · entrelinha 1.6 · #111111 tinta · largura estica
            ▸  linha, largura estica, recuo 14, espaço 16
              T  «11»
                 JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 32
              T  «Equipe de fotos e vídeos profissionais»
                 Archivo 16 · entrelinha 1.6 · #111111 tinta · largura estica
        ─  fio 2px #111111 tinta (largura toda)
    ↔  recuo lateral 120px
  ⇕  respiro 84px
```

### reserva

```
▸  coluna, largura estica, alinha ao centro, fundo #000000 preto  «reserva»
  ⇕  respiro 84px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica
      ▸  coluna, largura 820, espaço 14
        T  «RESERVA»
           Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #FFFFFF8C branco 55%
        T  «O INVESTIMENTO DA EXPEDIÇÃO»
           Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #FFFFFF branco
      ⇕  respiro 44px
      ▸  coluna, largura estica
        ─  fio 2px #FFFFFF29 branco 16% (largura toda)
        ▸  linha, largura estica, recuo 40, espaço 40, alinha ao centro
          ▸  coluna, largura estica, espaço 8
            T  «POR PESSOA»
               JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.4 · #FFFFFF8C branco 55%
            T  «a confirmar»
               Anton 56 · entrelinha 1 · espaçamento -0.5 · #FFFFFF branco
          ▸  coluna, largura estica, espaço 8, fio esquerda 1px #FFFFFF29 branco 16%
            ▸  linha, largura estica
              ↔  recuo lateral 34px
              ▸  coluna, espaço 8
                T  «POR CASAL»
                   JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.4 · #FFFFFF8C branco 55%
                T  «a confirmar»
                   Anton 56 · entrelinha 1 · espaçamento -0.5 · #FFFFFF branco
          ▸  linha, altura 60, recuo 24, espaço 9, alinha ao centro, distribui ao centro, fundo #FFFFFF branco  «botão/claro»
            T  «FAZER PRÉ-RESERVA»
               Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.4 · #000000 preto
            ▸  caixa, largura 13, altura 13, contorno   «ícone/arrow-right»
        ─  fio 2px #FFFFFF29 branco 16% (largura toda)
        ⇕  respiro 16px
        T  «A escolha da acomodação acontece na próxima etapa, depois de iniciar a reserva.»
           Archivo 12 · entrelinha 1.5 · #FFFFFF8C branco 55% · largura estica
    ↔  recuo lateral 120px
  ⇕  respiro 84px
```

### não está incluso

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «não está incluso»
  ⇕  respiro 64px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica, espaço 22
      ▸  linha, largura estica, espaço 30, alinha ao fim
        ▸  coluna, espaço 10
          T  «COMPLEMENTO»
             Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
          T  «O QUE NÃO ESTÁ INCLUSO»
             Anton 34 · entrelinha 1.08 · espaçamento -0.4 · #111111 tinta
        ↔  mola (empurra o resto)
        T  «por conta do participante»
           Archivo 13.5 · entrelinha 1.5 · #9A9A9A cinza fraco
      ▸  coluna, largura estica
        ─  fio 1px #D9D9D9 linha (largura toda)
        ▸  linha, largura estica  «o que não está incluso»
          ▸  coluna, largura estica, recuo 24, espaço 10
            T  «01»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco
            T  «Combustível dos trajetos»
               Archivo 13.5 · entrelinha 1.5 · #717171 cinza · largura estica
          ▸  coluna, largura estica, recuo 24, espaço 10, fio esquerda 1px #D9D9D9 linha
            T  «02»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco
            T  «Peças efetivamente utilizadas e mão de obra»
               Archivo 13.5 · entrelinha 1.5 · #717171 cinza · largura estica
          ▸  coluna, largura estica, recuo 24, espaço 10, fio esquerda 1px #D9D9D9 linha
            T  «03»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco
            T  «Passagem aérea»
               Archivo 13.5 · entrelinha 1.5 · #717171 cinza · largura estica
          ▸  coluna, largura estica, recuo 24, espaço 10, fio esquerda 1px #D9D9D9 linha
            T  «04»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco
            T  «O que não foi mencionado anteriormente»
               Archivo 13.5 · entrelinha 1.5 · #717171 cinza · largura estica
        ─  fio 1px #D9D9D9 linha (largura toda)
    ↔  recuo lateral 120px
  ⇕  respiro 64px
```

### guia da expedição

```
▸  coluna, largura estica, alinha ao centro, fundo #FFFFFF branco  «guia da expedição»
  ⇕  respiro 84px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica, espaço 26
      ▸  coluna, largura estica, espaço 28
        ▸  coluna, largura estica, espaço 12
          T  «GUIA DA EXPEDIÇÃO»
             Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
          T  «ENCONTRE QUALQUER INFORMAÇÃO ⏎ DA SUA EXPEDIÇÃO»
             Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
          T  «Pesquise um termo ou navegue pelos tópicos. É a mesma base que o atendimento e o agente no WhatsApp consultam.»
             Archivo 16 · entrelinha 1.6 · #717171 cinza · largura 720
        ▸  linha, largura estica, altura 56, espaço 14, alinha ao centro, fio base 1.5px #111111 tinta
          ▸  caixa, largura 18, altura 18, contorno   «ícone/search»
          T  «hotel · transfer · check-in · cardápio · clima · combustível · aeroporto»
             Archivo 16 · entrelinha 1.6 · #9A9A9A cinza fraco · largura estica
        ▸  coluna, largura estica
          ▸  linha, largura estica, recuo 16, espaço 14, alinha ao centro, fio base 1px #D9D9D9 linha
            T  «01»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 34
            T  «Logística»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura 300
            T  «6 itens»
               Archivo 13.5 · entrelinha 1.5 · #9A9A9A cinza fraco · largura estica
            ▸  caixa, largura 16, altura 16, contorno   «ícone/arrow-right»
          ▸  linha, largura estica, recuo 16, espaço 14, alinha ao centro, fio base 1px #D9D9D9 linha
            T  «02»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 34
            T  «Hospedagem»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura 300
            T  «5 itens»
               Archivo 13.5 · entrelinha 1.5 · #9A9A9A cinza fraco · largura estica
            ▸  caixa, largura 16, altura 16, contorno   «ícone/arrow-right»
          ▸  linha, largura estica, recuo 16, espaço 14, alinha ao centro, fio base 1px #D9D9D9 linha
            T  «03»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 34
            T  «Gastronomia»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura 300
            T  «4 itens»
               Archivo 13.5 · entrelinha 1.5 · #9A9A9A cinza fraco · largura estica
            ▸  caixa, largura 16, altura 16, contorno   «ícone/arrow-right»
          ▸  linha, largura estica, recuo 16, espaço 14, alinha ao centro, fio base 1px #D9D9D9 linha
            T  «04»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 34
            T  «Transporte»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura 300
            T  «4 itens»
               Archivo 13.5 · entrelinha 1.5 · #9A9A9A cinza fraco · largura estica
            ▸  caixa, largura 16, altura 16, contorno   «ícone/arrow-right»
          ▸  linha, largura estica, recuo 16, espaço 14, alinha ao centro, fio base 1px #D9D9D9 linha
            T  «05»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 34
            T  «Vestuário»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura 300
            T  «3 itens»
               Archivo 13.5 · entrelinha 1.5 · #9A9A9A cinza fraco · largura estica
            ▸  caixa, largura 16, altura 16, contorno   «ícone/arrow-right»
          ▸  linha, largura estica, recuo 16, espaço 14, alinha ao centro, fio base 1px #D9D9D9 linha
            T  «06»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 34
            T  «O que levar»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura 300
            T  «6 itens»
               Archivo 13.5 · entrelinha 1.5 · #9A9A9A cinza fraco · largura estica
            ▸  caixa, largura 16, altura 16, contorno   «ícone/arrow-right»
          ▸  linha, largura estica, recuo 16, espaço 14, alinha ao centro, fio base 1px #D9D9D9 linha
            T  «07»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 34
            T  «Documentação»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura 300
            T  «3 itens»
               Archivo 13.5 · entrelinha 1.5 · #9A9A9A cinza fraco · largura estica
            ▸  caixa, largura 16, altura 16, contorno   «ícone/arrow-right»
          ▸  linha, largura estica, recuo 16, espaço 14, alinha ao centro, fio base 1px #D9D9D9 linha
            T  «08»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 34
            T  «Clima»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura 300
            T  «2 itens»
               Archivo 13.5 · entrelinha 1.5 · #9A9A9A cinza fraco · largura estica
            ▸  caixa, largura 16, altura 16, contorno   «ícone/arrow-right»
          ▸  linha, largura estica, recuo 16, espaço 14, alinha ao centro, fio base 1px #D9D9D9 linha
            T  «09»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 34
            T  «Perguntas frequentes»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura 300
            T  «8 itens»
               Archivo 13.5 · entrelinha 1.5 · #9A9A9A cinza fraco · largura estica
            ▸  caixa, largura 16, altura 16, contorno   «ícone/arrow-right»
          ▸  linha, largura estica, recuo 16, espaço 14, alinha ao centro
            T  «10»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 34
            T  «Contatos»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura 300
            T  «3 itens»
               Archivo 13.5 · entrelinha 1.5 · #9A9A9A cinza fraco · largura estica
            ▸  caixa, largura 16, altura 16, contorno   «ícone/arrow-right»
    ↔  recuo lateral 120px
  ⇕  respiro 84px
```

### faq

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «faq»
  ⇕  respiro 76px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica, espaço 24
      ▸  coluna, largura 780, espaço 14
        T  «DÚVIDAS»
           Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
        T  «PERGUNTAS FREQUENTES»
           Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta
      ▸  coluna, largura estica
        ─  fio 2px #111111 tinta (largura toda)
        ▸  coluna, largura estica, recuo 22, espaço 14, fio base 1px #D9D9D9 linha
          ▸  linha, largura estica, espaço 20, alinha ao centro
            T  «Preciso ter UTV próprio para participar?»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura estica
            ▸  caixa, largura 18, altura 18, contorno   «ícone/minus»
          T  «Não necessariamente. A maior parte do grupo vai com o próprio carro, mas trabalhamos com parceiros de locação na região e conseguimos indicar um veículo do porte certo para o roteiro. Fale com a gente no WhatsApp antes de fechar a vaga.»
             Archivo 16 · entrelinha 1.6 · #717171 cinza · largura 860
        ▸  coluna, largura estica, recuo 22, espaço 14, fio base 1px #D9D9D9 linha
          ▸  linha, largura estica, espaço 20, alinha ao centro
            T  «Qual o nível de dificuldade dessa expedição?»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura estica
            ▸  caixa, largura 18, altura 18, contorno   «ícone/plus»
        ▸  coluna, largura estica, recuo 22, espaço 14, fio base 1px #D9D9D9 linha
          ▸  linha, largura estica, espaço 20, alinha ao centro
            T  «Criança pode ir? A partir de que idade?»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura estica
            ▸  caixa, largura 18, altura 18, contorno   «ícone/plus»
        ▸  coluna, largura estica, recuo 22, espaço 14, fio base 1px #D9D9D9 linha
          ▸  linha, largura estica, espaço 20, alinha ao centro
            T  «Como funciona o apoio mecânico e o resgate?»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura estica
            ▸  caixa, largura 18, altura 18, contorno   «ícone/plus»
        ▸  coluna, largura estica, recuo 22, espaço 14, fio base 1px #D9D9D9 linha
          ▸  linha, largura estica, espaço 20, alinha ao centro
            T  «O que acontece se eu precisar cancelar?»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura estica
            ▸  caixa, largura 18, altura 18, contorno   «ícone/plus»
        ▸  coluna, largura estica, recuo 22, espaço 14, fio base 1px #D9D9D9 linha
          ▸  linha, largura estica, espaço 20, alinha ao centro
            T  «Preciso levar combustível? Tem posto no roteiro?»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura estica
            ▸  caixa, largura 18, altura 18, contorno   «ícone/plus»
        ▸  coluna, largura estica, recuo 22, espaço 14, fio base 1px #D9D9D9 linha
          ▸  linha, largura estica, espaço 20, alinha ao centro
            T  «Dá para levar acompanhante que não dirige?»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura estica
            ▸  caixa, largura 18, altura 18, contorno   «ícone/plus»
        ▸  coluna, largura estica, recuo 22, espaço 14, fio base 1px #D9D9D9 linha
          ▸  linha, largura estica, espaço 20, alinha ao centro
            T  «Quando recebo as fotos e os vídeos?»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta · largura estica
            ▸  caixa, largura 18, altura 18, contorno   «ícone/plus»
    ↔  recuo lateral 120px
  ⇕  respiro 76px
```

### rodapé

```
▸  coluna, largura estica, alinha ao centro, fundo #000000 preto  «rodapé»
  ⇕  respiro 58px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica, espaço 26
      ▸  linha, largura estica, espaço 44, alinha ao centro
        ▣  FOTO 74×28
        ↔  mola (empurra o resto)
        ▸  linha, espaço 28, alinha ao centro
          T  «Expedições»
             Archivo 13.5 · entrelinha 1.5 · #FFFFFFD1 branco 82%
          T  «Estoque Off-Road»
             Archivo 13.5 · entrelinha 1.5 · #FFFFFFD1 branco 82%
          T  «Produtos»
             Archivo 13.5 · entrelinha 1.5 · #FFFFFFD1 branco 82%
          T  «O Desbravando»
             Archivo 13.5 · entrelinha 1.5 · #FFFFFFD1 branco 82%
        ▪  retângulo 1×16 · #FFFFFF29 branco 16%
        ▸  linha, espaço 16, alinha ao centro
          ▸  caixa, largura 18, altura 18, contorno   «ícone/message-circle»
          ▸  caixa, largura 18, altura 18, contorno   «ícone/instagram»
          ▸  caixa, largura 18, altura 18, contorno   «ícone/youtube»
      ─  fio 1px #FFFFFF29 branco 16% (largura toda)
      ▸  linha, largura estica, espaço 26, alinha ao centro
        T  «© 2026 Desbravando UTV»
           Archivo 13 · entrelinha 1.5 · #FFFFFF8C branco 55%
        ↔  mola (empurra o resto)
        T  «Privacidade»
           Archivo 13 · entrelinha 1.5 · #FFFFFF8C branco 55%
        T  «Termos»
           Archivo 13 · entrelinha 1.5 · #FFFFFF8C branco 55%
    ↔  recuo lateral 120px
  ⇕  respiro 44px
```

---

## 04 · Grupo Fechado (aguardando documento)

Largura da tela: **1440px** · fundo **#F2F2F2 papel** · 7 módulos

### nav

```
▸  linha, largura estica, altura 78, alinha ao centro, fundo #000000 preto  «nav»
  ↔  recuo lateral 120px
  ▸  linha, largura estica, espaço 40, alinha ao centro
    ▣  FOTO 69×26
    ▸  linha, espaço 30, alinha ao centro
      T  «Expedições»
         Archivo 15 · peso 700 · entrelinha 1.6 · #FFFFFF branco
      T  «Estoque Off-Road»
         Archivo 15 · entrelinha 1.6 · #FFFFFFD1 branco 82%
      T  «Produtos»
         Archivo 15 · entrelinha 1.6 · #FFFFFFD1 branco 82%
      T  «O Desbravando»
         Archivo 15 · entrelinha 1.6 · #FFFFFFD1 branco 82%
    ↔  mola (empurra o resto)
    ▸  linha, espaço 7, alinha ao centro
      ▸  caixa, largura 13, altura 13, contorno   «ícone/globe»
      T  «Ready to welcome riders from around the world.»
         Archivo 12 · entrelinha 1.5 · #FFFFFF8C branco 55%
  ↔  recuo lateral 120px
```

### abertura

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «abertura»
  ⇕  respiro 88px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica, espaço 30
      ▸  coluna, largura estica, espaço 26  «abertura»
        T  «EXPEDIÇÕES · GRUPO FECHADO»
           Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
        T  «SUA EXPEDIÇÃO, ⏎ DO SEU JEITO.»
           Anton 72 · entrelinha 1 · espaçamento -0.5 · #111111 tinta · largura estica
        ▸  linha, largura estica, espaço 60
          T  «Empresas, concessionárias e turmas de amigos. Você escolhe o destino, a data e o padrão — a gente monta a operação inteira e devolve o orçamento em até 48 horas.»
             Archivo 18 · entrelinha 1.6 · #717171 cinza · largura 620
          ↔  mola (empurra o resto)
          ▸  coluna, espaço 12, alinha ao fim
            ▸  linha, altura 48, recuo 22, espaço 9, alinha ao centro, distribui ao centro, fundo #000000 preto  «botão/solido»
              T  «SOLICITAR ORÇAMENTO»
                 Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.4 · #FFFFFF branco
              ▸  caixa, largura 13, altura 13, contorno   «ícone/arrow-right»
            ▸  linha, altura 48, recuo 22, espaço 9, alinha ao centro, distribui ao centro, contorno 1px #111111 tinta  «botão/contorno»
              T  «VER DESTINOS POSSÍVEIS»
                 Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.4 · #111111 tinta
      ▸  coluna, largura estica
        ─  fio 2px #111111 tinta (largura toda)
        ▸  linha, largura estica, recuo 20
          ▸  coluna, largura estica, espaço 6
            T  «PRAZO DA PROPOSTA»
               JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.4 · #717171 cinza
            T  «até 48h»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
          ▸  coluna, largura estica, espaço 6
            T  «GRUPO MÍNIMO»
               JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.4 · #717171 cinza
            T  «6 carros»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
          ▸  coluna, largura estica, espaço 6
            T  «DESTINOS NO MAPA»
               JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.4 · #717171 cinza
            T  «4 + sob medida»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
          ▸  coluna, largura estica, espaço 6
            T  «DURAÇÃO»
               JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.4 · #717171 cinza
            T  «de 2 a 7 dias»
               Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
        ─  fio 2px #111111 tinta (largura toda)
    ↔  recuo lateral 120px
  ⇕  respiro 88px
```

### como funciona

```
▸  coluna, largura estica, alinha ao centro, fundo #FFFFFF branco  «como funciona»
  ⇕  respiro 76px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica, espaço 26
      ▸  coluna, largura 780, espaço 14  «cabeçalho»
        T  «COMO FUNCIONA»
           Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
        T  «DO PEDIDO À ESTRADA EM TRÊS ETAPAS»
           Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
      ▸  coluna, largura estica
        ─  fio 2px #111111 tinta (largura toda)
        ▸  linha, largura estica, recuo 24, espaço 28, fio base 1px #D9D9D9 linha
          T  «01»
             JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 46
          T  «Você preenche o pedido»
             Anton 24 · entrelinha 1.12 · espaçamento -0.3 · #111111 tinta · largura 300
          T  «Destino, quantidade de carros, datas possíveis e o padrão que vocês querem. Leva uns três minutos.»
             Archivo 16 · entrelinha 1.6 · #717171 cinza · largura estica
        ▸  linha, largura estica, recuo 24, espaço 28, fio base 1px #D9D9D9 linha
          T  «02»
             JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 46
          T  «A gente monta a proposta»
             Anton 24 · entrelinha 1.12 · espaçamento -0.3 · #111111 tinta · largura 300
          T  «Roteiro, hospedagem, apoio e valores num documento com fotos do destino. Em até 48h no seu e-mail.»
             Archivo 16 · entrelinha 1.6 · #717171 cinza · largura estica
        ▸  linha, largura estica, recuo 24, espaço 28
          T  «03»
             JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco · largura 46
          T  «Ajusta e fecha»
             Anton 24 · entrelinha 1.12 · espaçamento -0.3 · #111111 tinta · largura 300
          T  «Mexeu no que quiser, assinou o contrato e a gente entra em modo operação.»
             Archivo 16 · entrelinha 1.6 · #717171 cinza · largura estica
        ─  fio 2px #111111 tinta (largura toda)
    ↔  recuo lateral 120px
  ⇕  respiro 76px
```

### para quem é

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «para quem é»
  ⇕  respiro 76px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica, espaço 26
      ▸  coluna, largura 780, espaço 14  «cabeçalho»
        T  «PARA QUEM É»
           Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
        T  «TRÊS TIPOS DE GRUPO QUE RODAM COM A GENTE»
           Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
      ▸  linha, largura estica, espaço 24
        ▸  coluna, largura estica, fundo #FFFFFF branco
          ▣  FOTO estica×190
          ▸  coluna, largura estica, recuo 26, espaço 12
            T  «Empresas»
               Anton 24 · entrelinha 1.12 · espaçamento -0.3 · #111111 tinta
            T  «Incentivo de vendas, convenção ou confraternização. Kit personalizado com a marca da empresa e material de mídia para vocês usarem depois.»
               Archivo 13.5 · entrelinha 1.5 · #717171 cinza · largura estica
        ▸  coluna, largura estica, fundo #FFFFFF branco
          ▣  FOTO estica×190
          ▸  coluna, largura estica, recuo 26, espaço 12
            T  «Concessionárias»
               Anton 24 · entrelinha 1.12 · espaçamento -0.3 · #111111 tinta
            T  «Test-drive de verdade com os seus clientes, no terreno em que o carro foi feito para rodar. A gente cuida da operação, vocês cuidam da relação.»
               Archivo 13.5 · entrelinha 1.5 · #717171 cinza · largura estica
        ▸  coluna, largura estica, fundo #FFFFFF branco
          ▣  FOTO estica×190
          ▸  coluna, largura estica, recuo 26, espaço 12
            T  «Grupos de amigos»
               Anton 24 · entrelinha 1.12 · espaçamento -0.3 · #111111 tinta
            T  «Vocês já rodam juntos e querem fazer uma viagem grande sem ninguém precisar organizar. A gente organiza.»
               Archivo 13.5 · entrelinha 1.5 · #717171 cinza · largura estica
    ↔  recuo lateral 120px
  ⇕  respiro 76px
```

### personalizável

```
▸  coluna, largura estica, alinha ao centro, fundo #FFFFFF branco  «personalizável»
  ⇕  respiro 76px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica, espaço 26
      ▸  coluna, largura 780, espaço 14  «cabeçalho»
        T  «SOB MEDIDA»
           Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
        T  «O QUE DÁ PARA PERSONALIZAR»
           Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
        T  «Praticamente tudo. A régua de segurança e apoio é a única coisa que não muda.»
           Archivo 16 · entrelinha 1.6 · #717171 cinza · largura estica
      ▸  linha, largura estica, espaço 56
        ▸  coluna, largura estica
          ─  fio 2px #111111 tinta (largura toda)
          ▸  linha, largura estica, recuo 20, espaço 20, fio base 1px #D9D9D9 linha
            T  «↗»
               Archivo 16 · peso 700 · entrelinha 1.6 · #111111 tinta · largura 20
            ▸  coluna, largura estica, espaço 4
              T  «Destino»
                 Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
              T  «Escolha entre os destinos do nosso mapa ou proponha um novo»
                 Archivo 13.5 · entrelinha 1.5 · #717171 cinza · largura estica
          ▸  linha, largura estica, recuo 20, espaço 20, fio base 1px #D9D9D9 linha
            T  «↗»
               Archivo 16 · peso 700 · entrelinha 1.6 · #111111 tinta · largura 20
            ▸  coluna, largura estica, espaço 4
              T  «Data e duração»
                 Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
              T  «De um fim de semana a uma semana inteira»
                 Archivo 13.5 · entrelinha 1.5 · #717171 cinza · largura estica
          ▸  linha, largura estica, recuo 20, espaço 20, fio base 1px #D9D9D9 linha
            T  «↗»
               Archivo 16 · peso 700 · entrelinha 1.6 · #111111 tinta · largura 20
            ▸  coluna, largura estica, espaço 4
              T  «Hospedagem»
                 Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
              T  «Do pousada-pé-na-estrada ao resort»
                 Archivo 13.5 · entrelinha 1.5 · #717171 cinza · largura estica
          ▸  linha, largura estica, recuo 20, espaço 20
            T  «↗»
               Archivo 16 · peso 700 · entrelinha 1.6 · #111111 tinta · largura 20
            ▸  coluna, largura estica, espaço 4
              T  «Carros»
                 Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
              T  «Frota própria, locação ou os carros do seu grupo»
                 Archivo 13.5 · entrelinha 1.5 · #717171 cinza · largura estica
          ─  fio 2px #111111 tinta (largura toda)
        ▸  coluna, largura estica
          ─  fio 2px #111111 tinta (largura toda)
          ▸  linha, largura estica, recuo 20, espaço 20, fio base 1px #D9D9D9 linha
            T  «↗»
               Archivo 16 · peso 700 · entrelinha 1.6 · #111111 tinta · largura 20
            ▸  coluna, largura estica, espaço 4
              T  «Alimentação»
                 Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
              T  «Almoço de campo, restaurantes locais ou chef exclusivo»
                 Archivo 13.5 · entrelinha 1.5 · #717171 cinza · largura estica
          ▸  linha, largura estica, recuo 20, espaço 20, fio base 1px #D9D9D9 linha
            T  «↗»
               Archivo 16 · peso 700 · entrelinha 1.6 · #111111 tinta · largura 20
            ▸  coluna, largura estica, espaço 4
              T  «Mídia»
                 Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
              T  «Fotógrafo, cinegrafista e drone acompanhando o grupo»
                 Archivo 13.5 · entrelinha 1.5 · #717171 cinza · largura estica
          ▸  linha, largura estica, recuo 20, espaço 20, fio base 1px #D9D9D9 linha
            T  «↗»
               Archivo 16 · peso 700 · entrelinha 1.6 · #111111 tinta · largura 20
            ▸  coluna, largura estica, espaço 4
              T  «Brindes»
                 Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
              T  «Kit personalizado com a marca da sua empresa»
                 Archivo 13.5 · entrelinha 1.5 · #717171 cinza · largura estica
          ▸  linha, largura estica, recuo 20, espaço 20
            T  «↗»
               Archivo 16 · peso 700 · entrelinha 1.6 · #111111 tinta · largura 20
            ▸  coluna, largura estica, espaço 4
              T  «Segurança»
                 Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
              T  «Resgate, apoio mecânico e ambulância sob demanda»
                 Archivo 13.5 · entrelinha 1.5 · #717171 cinza · largura estica
          ─  fio 2px #111111 tinta (largura toda)
    ↔  recuo lateral 120px
  ⇕  respiro 76px
```

### formulário de orçamento

```
▸  coluna, largura estica, alinha ao centro, fundo #FFFFFF branco  «formulário de orçamento»
  ⇕  respiro 84px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica, espaço 30
      ▸  coluna, largura 780, espaço 14  «cabeçalho»
        T  «ORÇAMENTO»
           Archivo 11 · peso 600 · entrelinha 1.2 · espaçamento +3 · #717171 cinza
        T  «MONTE O PEDIDO DO SEU GRUPO»
           Anton 48 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
        T  «Quatro etapas. No fim, a proposta chega no seu e-mail com fotos e valores.»
           Archivo 16 · entrelinha 1.6 · #717171 cinza · largura estica
      ▸  coluna, largura estica
        ─  fio 2px #111111 tinta (largura toda)
        ▸  linha, largura estica, recuo 18
          ▸  linha, largura estica, espaço 12, alinha ao centro
            T  «01»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #111111 tinta
            T  «Destino»
               Archivo 15 · peso 700 · entrelinha 1.6 · #111111 tinta
          ▸  linha, largura estica, espaço 12, alinha ao centro
            T  «02»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco
            T  «Grupo»
               Archivo 15 · entrelinha 1.6 · #717171 cinza
          ▸  linha, largura estica, espaço 12, alinha ao centro
            T  «03»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco
            T  «Datas»
               Archivo 15 · entrelinha 1.6 · #717171 cinza
          ▸  linha, largura estica, espaço 12, alinha ao centro
            T  «04»
               JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #9A9A9A cinza fraco
            T  «Contato»
               Archivo 15 · entrelinha 1.6 · #717171 cinza
        ─  fio 2px #111111 tinta (largura toda)
      ▸  coluna, largura estica, recuo 40, espaço 28, fundo #F2F2F2 papel
        ▸  coluna, espaço 10
          T  «ETAPA 01 DE 04»
             JetBrains Mono 12 · entrelinha 1.4 · espaçamento +0.4 · #717171 cinza
          T  «Para onde vocês querem ir?»
             Anton 34 · entrelinha 1.08 · espaçamento -0.4 · #111111 tinta
          T  «Escolha um destino do nosso mapa ou diga qual região você tem em mente. Dá para abrir a página do destino sem perder o que já preencheu.»
             Archivo 16 · entrelinha 1.6 · #717171 cinza · largura 720
        ▸  coluna, largura estica
          ─  fio 1px #D9D9D9 linha (largura toda)
          ▸  linha, largura estica, recuo 18, espaço 18, alinha ao centro, fundo #FFFFFF branco, fio base 1px #D9D9D9 linha
            ▸  caixa, largura 18, altura 18, fundo #111111 tinta, contorno 2px #111111 tinta, canto 999
            ▣  FOTO 70×48
            ▸  coluna, largura estica, espaço 3
              T  «Costa Doce · RS»
                 Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
              T  «5 dias · Média»
                 Archivo 13.5 · entrelinha 1.5 · #717171 cinza
          ▸  linha, largura estica, recuo 18, espaço 18, alinha ao centro, fio base 1px #D9D9D9 linha
            ▸  caixa, largura 18, altura 18, contorno 2px #D9D9D9 linha, canto 999
            ▣  FOTO 70×48
            ▸  coluna, largura estica, espaço 3
              T  «Urubici · SC»
                 Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
              T  «5 dias · Média»
                 Archivo 13.5 · entrelinha 1.5 · #717171 cinza
          ▸  linha, largura estica, recuo 18, espaço 18, alinha ao centro, fio base 1px #D9D9D9 linha
            ▸  caixa, largura 18, altura 18, contorno 2px #D9D9D9 linha, canto 999
            ▣  FOTO 70×48
            ▸  coluna, largura estica, espaço 3
              T  «Serra da Canastra · MG»
                 Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
              T  «4 dias · Média/Alta»
                 Archivo 13.5 · entrelinha 1.5 · #717171 cinza
          ▸  linha, largura estica, recuo 18, espaço 18, alinha ao centro, fio base 1px #D9D9D9 linha
            ▸  caixa, largura 18, altura 18, contorno 2px #D9D9D9 linha, canto 999
            ▣  FOTO 70×48
            ▸  coluna, largura estica, espaço 3
              T  «Visconde de Mauá · RJ»
                 Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
              T  «3 dias · Alta»
                 Archivo 13.5 · entrelinha 1.5 · #717171 cinza
          ▸  linha, largura estica, recuo 18, espaço 18, alinha ao centro, fio base 1px #D9D9D9 linha
            ▸  caixa, largura 18, altura 18, contorno 2px #D9D9D9 linha, canto 999
            ▣  FOTO 70×48
            ▸  coluna, largura estica, espaço 3
              T  «Macaé · RJ»
                 Archivo 17 · peso 700 · entrelinha 1.3 · #111111 tinta
              T  «3 dias · Leve»
                 Archivo 13.5 · entrelinha 1.5 · #717171 cinza
        ▸  coluna, largura estica, espaço 8
          T  «Ou proponha uma região»
             Archivo 13.5 · peso 700 · entrelinha 1.5 · #111111 tinta
          ▸  linha, largura estica, altura 52, recuo 18, alinha ao centro, fundo #FFFFFF branco, contorno 1px #D9D9D9 linha
            T  «Ex.: Chapada dos Veadeiros, Jalapão, Serra Gaúcha…»
               Archivo 16 · entrelinha 1.6 · #9A9A9A cinza fraco
        ─  fio 1px #D9D9D9 linha (largura toda)
        ▸  linha, largura estica, alinha ao centro
          T  «Leva cerca de 3 minutos.»
             Archivo 13.5 · entrelinha 1.5 · #717171 cinza
          ↔  mola (empurra o resto)
          ▸  linha, espaço 12
            ▸  linha, altura 48, recuo 22, espaço 9, alinha ao centro, distribui ao centro, contorno 1px #111111 tinta  «botão/contorno»
              T  «VOLTAR»
                 Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.4 · #111111 tinta
            ▸  linha, altura 48, recuo 22, espaço 9, alinha ao centro, distribui ao centro, fundo #000000 preto  «botão/solido»
              T  «CONTINUAR»
                 Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.4 · #FFFFFF branco
              ▸  caixa, largura 13, altura 13, contorno   «ícone/arrow-right»
      ▸  linha, espaço 12, alinha ao centro
        T  «↗»
           Archivo 16 · peso 700 · entrelinha 1.6 · #111111 tinta
        T  «Prefere conversar? Chame no WhatsApp (19) 99711-1188 — o mesmo pedido pode ser feito por lá.»
           Archivo 13.5 · entrelinha 1.5 · #717171 cinza
    ↔  recuo lateral 120px
  ⇕  respiro 84px
```

### rodapé

```
▸  coluna, largura estica, alinha ao centro, fundo #000000 preto  «rodapé»
  ⇕  respiro 58px
  ▸  linha, largura estica
    ↔  recuo lateral 120px
    ▸  coluna, largura estica, espaço 26
      ▸  linha, largura estica, espaço 44, alinha ao centro
        ▣  FOTO 74×28
        ↔  mola (empurra o resto)
        ▸  linha, espaço 28, alinha ao centro
          T  «Expedições»
             Archivo 13.5 · entrelinha 1.5 · #FFFFFFD1 branco 82%
          T  «Estoque Off-Road»
             Archivo 13.5 · entrelinha 1.5 · #FFFFFFD1 branco 82%
          T  «Produtos»
             Archivo 13.5 · entrelinha 1.5 · #FFFFFFD1 branco 82%
          T  «O Desbravando»
             Archivo 13.5 · entrelinha 1.5 · #FFFFFFD1 branco 82%
        ▪  retângulo 1×16 · #FFFFFF29 branco 16%
        ▸  linha, espaço 16, alinha ao centro
          ▸  caixa, largura 18, altura 18, contorno   «ícone/message-circle»
          ▸  caixa, largura 18, altura 18, contorno   «ícone/instagram»
          ▸  caixa, largura 18, altura 18, contorno   «ícone/youtube»
      ─  fio 1px #FFFFFF29 branco 16% (largura toda)
      ▸  linha, largura estica, espaço 26, alinha ao centro
        T  «© 2026 Desbravando UTV»
           Archivo 13 · entrelinha 1.5 · #FFFFFF8C branco 55%
        ↔  mola (empurra o resto)
        T  «Privacidade»
           Archivo 13 · entrelinha 1.5 · #FFFFFF8C branco 55%
        T  «Termos»
           Archivo 13 · entrelinha 1.5 · #FFFFFF8C branco 55%
    ↔  recuo lateral 120px
  ⇕  respiro 44px
```

---

## 00 · Sistema de design

Largura da tela: **1440px** · fundo **#F2F2F2 papel** · 1 módulos

### logo Desbravando

```
▣  FOTO 136×48
```

---

## M1 · Home (mobile)

Largura da tela: **390px** · fundo **#F2F2F2 papel** · 12 módulos

### nav/mobile

```
▸  linha, largura estica, altura 58, alinha ao centro, fundo #000000 preto  «nav/mobile»
  ↔  recuo lateral 20px
  ▸  linha, largura estica, alinha ao centro
    ▸  caixa, largura 22, altura 22, contorno   «ícone/menu»
    ↔  mola (empurra o resto)
    ▣  FOTO 58×22
    ↔  mola (empurra o resto)
    ↔  recuo lateral 22px
  ↔  recuo lateral 20px
```

### vídeo/vídeo de abertura

```
▸  coluna, largura estica, altura 380, fundo FOTO  «vídeo/vídeo de abertura»
  ▸  coluna, largura estica, altura estica, espaço 14, alinha ao centro, distribui ao centro, fundo degradê 180° (#00000047 → #0000007A)
    ▸  linha, largura 62, altura 62, alinha ao centro, distribui ao centro, contorno 1.5px #FFFFFFB3, canto 999
      ▸  caixa, largura 20, altura 20, contorno   «ícone/play»
    T  «VÍDEO DE ABERTURA»
       Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #FFFFFFA6 branco 65%
```

### posicionamento

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «posicionamento»
  ⇕  respiro 40px
  ▸  linha, largura estica
    ↔  recuo lateral 20px
    ▸  coluna, largura estica, espaço 16
      T  «O DESBRAVANDO»
         Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #717171 cinza
      T  «MAIS QUE UMA MARCA. ⏎ UM ESTILO DE VIDA.»
         Anton 38 · entrelinha 1.02 · espaçamento -0.4 · #111111 tinta · largura estica
      T  «O Desbravando reúne pessoas que compartilham a mesma paixão pelo universo off-road. Da compra e venda de UTVs às expedições pelo Brasil, passando por produtos desenvolvidos para quem vive esse estilo de vida, cada detalhe é pensado para proporcionar experiências que vão muito além da trilha.»
         Archivo 15 · entrelinha 1.55 · #717171 cinza · largura estica
    ↔  recuo lateral 20px
  ⇕  respiro 40px
```

### destaques

```
▸  coluna, largura estica, altura 420, fundo FOTO  «destaques»
  ▸  coluna, largura estica, altura estica, distribui ao fim, fundo #00000099 preto 60%
    ▸  coluna, largura estica, espaço 12, alinha ao centro
      ▸  linha, largura estica
        ↔  recuo lateral 20px
        ▸  coluna, largura estica, espaço 12
          T  «PRÉ-RESERVA ABERTA»
             Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #FFFFFFA6 branco 65%
          T  «URUBICI · SANTA CATARINA»
             Anton 30 · entrelinha 1.04 · espaçamento -0.4 · #FFFFFF branco · largura estica
          T  «3ª Expedição Família. 26 a 30 de agosto de 2026, na melhor janela do ano na serra catarinense.»
             Archivo 12.5 · entrelinha 1.45 · #FFFFFFD1 branco 82% · largura estica
          ▸  linha, largura estica, altura 48, recuo 22, espaço 9, alinha ao centro, distribui ao centro, fundo #FFFFFF branco  «botão/claro»
            T  «FAÇA SUA PRÉ-RESERVA»
               Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.2 · #000000 preto
            ▸  caixa, largura 13, altura 13, contorno   «ícone/arrow-right»
        ↔  recuo lateral 20px
    ⇕  respiro 16px
    ▸  linha, largura estica, espaço 6, distribui ao centro
      ▪  retângulo 20×3 · #FFFFFF branco
      ▪  retângulo 6×3 · #FFFFFF59 branco 35%
      ▪  retângulo 6×3 · #FFFFFF59 branco 35%
    ⇕  respiro 16px
```

### expedições · etapa 1

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «expedições · etapa 1»
  ⇕  respiro 40px
  ▸  linha, largura estica
    ↔  recuo lateral 20px
    ▸  coluna, largura estica, espaço 14
      T  «EXPEDIÇÕES»
         Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #717171 cinza
      T  «ESCOLHA A EXPERIÊNCIA QUE COMBINA COM VOCÊ.»
         Anton 30 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
      T  «Dois formatos de expedições desenvolvidos para diferentes perfis, com o mesmo padrão de organização, segurança e experiência Desbravando.»
         Archivo 15 · entrelinha 1.55 · #717171 cinza · largura estica
    ↔  recuo lateral 20px
  ⇕  respiro 40px
```

### expedições · etapa 2

```
▸  coluna, largura estica, fundo #FFFFFF branco  «expedições · etapa 2»
  ▸  coluna, largura estica
    ▸  coluna, largura estica, recuo 22  «formato/GRUPO AVULSO»
      T  «01»
         JetBrains Mono 11 · entrelinha 1.4 · espaçamento +2 · #9A9A9A cinza fraco
      ⇕  respiro 22px
      T  «GRUPO AVULSO»
         Anton 30 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
      ⇕  respiro 16px
      T  «Ideal para quem procura uma experiência organizada pelo Desbravando, com destino, data e grupo já formado.»
         Archivo 15 · entrelinha 1.55 · #717171 cinza · largura estica
      ⇕  respiro 24px
      ▸  coluna, largura estica
        ─  fio 1px #D9D9D9 linha (largura toda)
        ▸  linha, largura estica, recuo 13, espaço 20
          T  «QUEM VAI»
             Archivo 9 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #9A9A9A cinza fraco · largura 92
          T  «Você, sua família ou seus amigos, ao lado de outros desbravadores»
             Archivo 12.5 · entrelinha 1.45 · #111111 tinta · largura estica
        ▸  linha, largura estica, recuo 13, espaço 20
          T  «DATAS»
             Archivo 9 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #9A9A9A cinza fraco · largura 92
          T  «Definidas no calendário do Desbravando»
             Archivo 12.5 · entrelinha 1.45 · #111111 tinta · largura estica
        ▸  linha, largura estica, recuo 13, espaço 20
          T  «VAGA»
             Archivo 9 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #9A9A9A cinza fraco · largura 92
          T  «Individual ou por carro»
             Archivo 12.5 · entrelinha 1.45 · #111111 tinta · largura estica
        ▸  linha, largura estica, recuo 13, espaço 20
          T  «ROTEIRO»
             Archivo 9 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #9A9A9A cinza fraco · largura 92
          T  «Pronto e reconhecido antes por quem vai guiar»
             Archivo 12.5 · entrelinha 1.45 · #111111 tinta · largura estica
        ─  fio 1px #D9D9D9 linha (largura toda)
      ⇕  respiro 22px
      ▸  linha, altura 48, espaço 9, alinha ao centro, distribui ao centro  «botão/texto»
        T  «VER PRÓXIMAS EXPEDIÇÕES»
           Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.2 · #111111 tinta
        ▸  caixa, largura 13, altura 13, contorno   «ícone/arrow-right»
  ▸  coluna, largura estica, fio topo 1px #D9D9D9 linha
    ▸  coluna, largura estica, recuo 22  «formato/GRUPO FECHADO»
      T  «02»
         JetBrains Mono 11 · entrelinha 1.4 · espaçamento +2 · #9A9A9A cinza fraco
      ⇕  respiro 22px
      T  «GRUPO FECHADO»
         Anton 30 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
      ⇕  respiro 16px
      T  «Ideal para quem deseja criar uma expedição exclusiva, personalizada em cada detalhe para o seu grupo.»
         Archivo 15 · entrelinha 1.55 · #717171 cinza · largura estica
      ⇕  respiro 24px
      ▸  coluna, largura estica
        ─  fio 1px #D9D9D9 linha (largura toda)
        ▸  linha, largura estica, recuo 13, espaço 20
          T  «QUEM VAI»
             Archivo 9 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #9A9A9A cinza fraco · largura 92
          T  «Só quem você convidar — família, amigos ou a sua empresa»
             Archivo 12.5 · entrelinha 1.45 · #111111 tinta · largura estica
        ▸  linha, largura estica, recuo 13, espaço 20
          T  «DATAS»
             Archivo 9 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #9A9A9A cinza fraco · largura 92
          T  «Escolhidas pelo seu grupo»
             Archivo 12.5 · entrelinha 1.45 · #111111 tinta · largura estica
        ▸  linha, largura estica, recuo 13, espaço 20
          T  «VAGA»
             Archivo 9 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #9A9A9A cinza fraco · largura 92
          T  «O grupo inteiro, em exclusividade»
             Archivo 12.5 · entrelinha 1.45 · #111111 tinta · largura estica
        ▸  linha, largura estica, recuo 13, espaço 20
          T  «ROTEIRO»
             Archivo 9 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #9A9A9A cinza fraco · largura 92
          T  «Montado sob medida, do destino à alimentação»
             Archivo 12.5 · entrelinha 1.45 · #111111 tinta · largura estica
        ─  fio 1px #D9D9D9 linha (largura toda)
      ⇕  respiro 22px
      ▸  linha, altura 48, espaço 9, alinha ao centro, distribui ao centro  «botão/texto»
        T  «SOLICITAR ORÇAMENTO»
           Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.2 · #111111 tinta
        ▸  caixa, largura 13, altura 13, contorno   «ícone/arrow-right»
```

### galeria (carrossel · espia a próxima)

```
▸  coluna, largura estica, espaço 10  «galeria (carrossel · espia a próxima)»
  ▸  linha, largura estica, espaço 8
    ↔  recuo lateral 20px
    ▣  FOTO 300×230
    ▣  FOTO estica×230
  ▸  linha, largura estica, recuo 20, espaço 8, alinha ao centro
    T  «1 / 5»
       JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #717171 cinza
    ↔  mola (empurra o resto)
    ▸  linha, espaço 5
      ▪  retângulo 18×3 · #111111 tinta
      ▪  retângulo 6×3 · #D9D9D9 linha
      ▪  retângulo 6×3 · #D9D9D9 linha
      ▪  retângulo 6×3 · #D9D9D9 linha
      ▪  retângulo 6×3 · #D9D9D9 linha
```

### parceiros oficiais

```
▸  coluna, largura estica, alinha ao centro, fundo #FFFFFF branco  «parceiros oficiais»
  ⇕  respiro 44px
  ▸  linha, largura 150, altura 46, alinha ao centro, distribui ao centro  «logo/Can-Am»
    T  «Can-Am»
       Anton 24 · entrelinha 1.08 · espaçamento -0.3 · #9A9A9A cinza fraco
  ⇕  respiro 18px
  T  «PARCEIRA OFICIAL DAS EXPEDIÇÕES»
     Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #717171 cinza
  ⇕  respiro 10px
  ▸  coluna, largura estica, alinha ao centro
    ▸  linha, largura estica
      ↔  recuo lateral 20px
      ▸  coluna, largura estica
        T  «Ao lado de quem compartilha a mesma paixão.»
           Anton 24 · entrelinha 1.08 · espaçamento -0.3 · alinhado à centro · #111111 tinta · largura estica
      ↔  recuo lateral 20px
  ⇕  respiro 44px
```

### quem já foi

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «quem já foi»
  ⇕  respiro 40px
  ▸  linha, largura estica
    ↔  recuo lateral 20px
    ▸  coluna, largura estica, espaço 16
      T  «QUEM JÁ FOI»
         Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #717171 cinza
      T  «A EXPEDIÇÃO ACABA. ⏎ O GRUPO CONTINUA.»
         Anton 30 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
      ▸  coluna, largura estica
        ─  fio 2px #111111 tinta (largura toda)
        ▸  coluna, largura estica, recuo 18, espaço 10
          T  «↗»
             Anton 19 · entrelinha 1.12 · espaçamento -0.2 · #111111 tinta
          T  «“Foi a primeira vez que levei minha mulher e meus dois filhos numa expedição. Não faltou nada — e é isso que faz a diferença.”»
             Archivo 15 · entrelinha 1.55 · #111111 tinta · largura estica
          T  «Participante da 2ª Expedição Família»
             Archivo 12.5 · entrelinha 1.45 · #717171 cinza
        ─  fio 2px #111111 tinta (largura toda)
    ↔  recuo lateral 20px
  ⇕  respiro 40px
```

### comunidade

```
▸  coluna, largura estica, alinha ao centro, fundo #000000 preto  «comunidade»
  ⇕  respiro 48px
  ▣  FOTO 74×28
  ⇕  respiro 18px
  ▸  coluna, largura estica, espaço 14, alinha ao centro
    ▸  linha, largura estica
      ↔  recuo lateral 20px
      ▸  coluna, largura estica, espaço 14
        T  «Faça parte da ⏎ Comunidade Desbravando»
           Anton 30 · entrelinha 1.04 · espaçamento -0.4 · alinhado à centro · #FFFFFF branco · largura estica
        T  «Cada nova experiência e cada nova conquista fortalecem sua trajetória e desbloqueiam benefícios exclusivos.»
           Archivo 15 · entrelinha 1.55 · alinhado à centro · #FFFFFFD1 branco 82% · largura estica
      ↔  recuo lateral 20px
  ⇕  respiro 22px
  ▸  linha, altura 48, recuo 22, espaço 9, alinha ao centro, distribui ao centro, fundo #FFFFFF branco  «botão/claro»
    T  «CONHEÇA SUA JORNADA»
       Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.2 · #000000 preto
    ▸  caixa, largura 13, altura 13, contorno   «ícone/arrow-right»
  ⇕  respiro 48px
```

### três pilares

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «três pilares»
  ⇕  respiro 40px
  ▸  linha, largura estica
    ↔  recuo lateral 20px
    ▸  coluna, largura estica, espaço 16
      T  «AS TRÊS FRENTES»
         Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #717171 cinza
      T  «TRÊS PILARES. ⏎ UMA ÚNICA PAIXÃO.»
         Anton 30 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
      T  «Conheça as três frentes que dão vida ao universo Desbravando.»
         Archivo 15 · entrelinha 1.55 · #717171 cinza · largura estica
      ▸  coluna, largura estica
        ─  fio 2px #111111 tinta (largura toda)
        ▸  coluna, largura estica, recuo 18, espaço 6, fio base 1px #D9D9D9 linha
          T  «01»
             JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco
          T  «Expedições»
             Anton 24 · entrelinha 1.08 · espaçamento -0.3 · #111111 tinta
          T  «Desbravar lugares. Conectar pessoas. Criar histórias.»
             Archivo 12.5 · entrelinha 1.45 · #717171 cinza · largura estica
        ▸  coluna, largura estica, recuo 18, espaço 6, fio base 1px #D9D9D9 linha
          T  «02»
             JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco
          T  «Estoque Off-Road»
             Anton 24 · entrelinha 1.08 · espaçamento -0.3 · #111111 tinta
          T  «Construir confiança. Entregar transparência. Realizar sonhos.»
             Archivo 12.5 · entrelinha 1.45 · #717171 cinza · largura estica
        ▸  coluna, largura estica, recuo 18, espaço 6
          T  «03»
             JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco
          T  «Produtos»
             Anton 24 · entrelinha 1.08 · espaçamento -0.3 · #111111 tinta
          T  «Autenticidade nos detalhes. Identidade em cada escolha.»
             Archivo 12.5 · entrelinha 1.45 · #717171 cinza · largura estica
        ─  fio 2px #111111 tinta (largura toda)
    ↔  recuo lateral 20px
  ⇕  respiro 40px
```

### rodapé/mobile

```
▸  coluna, largura estica, alinha ao centro, fundo #000000 preto  «rodapé/mobile»
  ⇕  respiro 34px
  ▸  linha, largura estica
    ↔  recuo lateral 20px
    ▸  coluna, largura estica, espaço 20, alinha ao centro
      ▣  FOTO 64×24
      ▸  linha, largura estica, espaço 14, alinha ao centro, distribui ao centro
        T  «Expedições»
           Archivo 12.5 · entrelinha 1.45 · #FFFFFFD1 branco 82%
        T  «Estoque Off-Road»
           Archivo 12.5 · entrelinha 1.45 · #FFFFFFD1 branco 82%
        T  «Produtos»
           Archivo 12.5 · entrelinha 1.45 · #FFFFFFD1 branco 82%
        T  «O Desbravando»
           Archivo 12.5 · entrelinha 1.45 · #FFFFFFD1 branco 82%
      ─  fio 1px #FFFFFF29 branco 16% (largura toda)
      ▸  linha, espaço 20
        ▸  caixa, largura 19, altura 19, contorno   «ícone/message-circle»
        ▸  caixa, largura 19, altura 19, contorno   «ícone/instagram»
        ▸  caixa, largura 19, altura 19, contorno   «ícone/youtube»
      T  «© 2026 Desbravando UTV»
         Archivo 11 · entrelinha 1.45 · #FFFFFF8C branco 55%
    ↔  recuo lateral 20px
  ⇕  respiro 30px
```

---

## M2 · Página da Expedição (mobile)

Largura da tela: **390px** · fundo **#F2F2F2 papel** · 14 módulos

### nav/mobile

```
▸  linha, largura estica, altura 58, alinha ao centro, fundo #000000 preto  «nav/mobile»
  ↔  recuo lateral 20px
  ▸  linha, largura estica, alinha ao centro
    ▸  caixa, largura 22, altura 22, contorno   «ícone/menu»
    ↔  mola (empurra o resto)
    ▣  FOTO 58×22
    ↔  mola (empurra o resto)
    ↔  recuo lateral 22px
  ↔  recuo lateral 20px
```

### vídeo/vídeo da expedição

```
▸  coluna, largura estica, altura 320, fundo FOTO  «vídeo/vídeo da expedição»
  ▸  coluna, largura estica, altura estica, espaço 14, alinha ao centro, distribui ao centro, fundo degradê 180° (#00000047 → #0000007A)
    ▸  linha, largura 62, altura 62, alinha ao centro, distribui ao centro, contorno 1.5px #FFFFFFB3, canto 999
      ▸  caixa, largura 20, altura 20, contorno   «ícone/play»
    T  «VÍDEO DA EXPEDIÇÃO»
       Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #FFFFFFA6 branco 65%
```

### apresentação

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «apresentação»
  ⇕  respiro 32px
  ▸  linha, largura estica
    ↔  recuo lateral 20px
    ▸  coluna, largura estica, espaço 14
      T  «EXPEDIÇÃO COSTA DOCE · GRUPO AVULSO»
         Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #717171 cinza
      T  «COSTA DOCE ⏎ RIO GRANDE DO SUL»
         Anton 38 · entrelinha 1.02 · espaçamento -0.4 · #111111 tinta · largura estica
      T  «02 a 06 de dezembro de 2026»
         Archivo 15 · entrelinha 1.55 · #717171 cinza · largura estica
      ▸  linha, espaço 7, alinha ao centro  «status/pre-reserva»
        ▪  retângulo 5×5 · #9A9A9A cinza fraco
        T  «Pré-reserva aberta»
           Archivo 12.5 · entrelinha 1.45 · #717171 cinza
      ▸  linha, largura estica, altura 50, recuo 23, espaço 9, alinha ao centro, distribui ao centro, fundo #000000 preto  «botão/solido»
        T  «FAZER PRÉ-RESERVA»
           Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.2 · #FFFFFF branco
        ▸  caixa, largura 13, altura 13, contorno   «ícone/arrow-right»
    ↔  recuo lateral 20px
  ⇕  respiro 32px
```

### galeria (carrossel · espia a próxima)

```
▸  coluna, largura estica, espaço 10  «galeria (carrossel · espia a próxima)»
  ▸  linha, largura estica, espaço 8
    ↔  recuo lateral 20px
    ▣  FOTO 300×250
    ▣  FOTO estica×250
  ▸  linha, largura estica, recuo 20, espaço 8, alinha ao centro
    T  «1 / 4»
       JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #717171 cinza
    ↔  mola (empurra o resto)
    ▸  linha, espaço 5
      ▪  retângulo 18×3 · #111111 tinta
      ▪  retângulo 6×3 · #D9D9D9 linha
      ▪  retângulo 6×3 · #D9D9D9 linha
      ▪  retângulo 6×3 · #D9D9D9 linha
```

### sobre

```
▸  coluna, largura estica, alinha ao centro, fundo #FFFFFF branco  «sobre»
  ⇕  respiro 36px
  ▸  linha, largura estica
    ↔  recuo lateral 20px
    ▸  coluna, largura estica, espaço 14
      T  «O DESTINO»
         Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #717171 cinza
      T  «O TRECHO MAIS BRUTO DO LITORAL GAÚCHO.»
         Anton 30 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
      T  «Cinco dias cruzando o trecho mais bruto do litoral gaúcho — dunas que não acabam, lagoas de água doce escondidas na areia, beira-oceano por quilômetros, matas de pinus, vilas de pescadores e faróis. Tudo com hospedagem escolhida a dedo entre o padrão e as opções da região e estrutura completa de apoio.»
         Archivo 15 · entrelinha 1.55 · #717171 cinza · largura estica
    ↔  recuo lateral 20px
  ⇕  respiro 36px
```

### roteiro

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «roteiro»
  ⇕  respiro 36px
  ▸  linha, largura estica
    ↔  recuo lateral 20px
    ▸  coluna, largura estica, espaço 14
      T  «ROTEIRO»
         Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #717171 cinza
      T  «DIA A DIA»
         Anton 30 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta
      ▸  coluna, largura estica
        ─  fio 2px #111111 tinta (largura toda)
        ▸  linha, largura estica, recuo 20, espaço 18  «roteiro/dia 01»
          ▸  coluna, largura 52, espaço 6
            T  «DIA»
               Archivo 9 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #9A9A9A cinza fraco
            T  «01»
               Anton 27 · entrelinha 1 · espaçamento -0.3 · #111111 tinta
          ▸  coluna, largura estica, espaço 10, fio esquerda 1px #D9D9D9 linha
            ▸  linha, largura estica
              ↔  recuo lateral 16px
              ▸  coluna, largura estica, espaço 10
                T  «02 dez · Mostardas · RS»
                   JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura estica
                T  «CHEGADA»
                   Anton 19 · entrelinha 1.12 · espaçamento -0.2 · #111111 tinta · largura estica
                T  «Check-in a partir das 15:00 em Mostardas. O evento de boas-vindas inicia às 19:00 com jantar completo, chopp, drinks e música ao vivo.»
                   Archivo 15 · entrelinha 1.55 · #717171 cinza · largura estica
        ▸  linha, largura estica, recuo 20, espaço 18, fio topo 1px #D9D9D9 linha  «roteiro/dia 02»
          ▸  coluna, largura 52, espaço 6
            T  «DIA»
               Archivo 9 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #9A9A9A cinza fraco
            T  «02»
               Anton 27 · entrelinha 1 · espaçamento -0.3 · #111111 tinta
          ▸  coluna, largura estica, espaço 10, fio esquerda 1px #D9D9D9 linha
            ▸  linha, largura estica
              ↔  recuo lateral 16px
              ▸  coluna, largura estica, espaço 10
                T  «03 dez · Lagoa do Peixe · ~170 km»
                   JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura estica
                T  «PONTAL DO BUJURU»
                   Anton 19 · entrelinha 1.12 · espaçamento -0.2 · #111111 tinta · largura estica
                T  «Beira-mar até Bujuru pelo Parque Nacional da Lagoa do Peixe, margens da Lagoa dos Patos e o Pontal do Bujuru.»
                   Archivo 15 · entrelinha 1.55 · #717171 cinza · largura estica
        ▸  linha, largura estica, recuo 20, espaço 18, fio topo 1px #D9D9D9 linha  «roteiro/dia 03»
          ▸  coluna, largura 52, espaço 6
            T  «DIA»
               Archivo 9 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #9A9A9A cinza fraco
            T  «03»
               Anton 27 · entrelinha 1 · espaçamento -0.3 · #111111 tinta
          ▸  coluna, largura estica, espaço 10, fio esquerda 1px #D9D9D9 linha
            ▸  linha, largura estica
              ↔  recuo lateral 16px
              ▸  coluna, largura estica, espaço 10
                T  «04 dez · Mostardas · RS · ~140 km»
                   JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura estica
                T  «FAROL CRISTÓVÃO PEREIRA»
                   Anton 19 · entrelinha 1.12 · espaçamento -0.2 · #111111 tinta · largura estica
                T  «Estradas vicinais, floresta de pinus e dunas até o Farol Cristóvão Pereira, com almoço na trilha e volta pela margem da Lagoa dos Patos.»
                   Archivo 15 · entrelinha 1.55 · #717171 cinza · largura estica
        ▸  linha, largura estica, recuo 20, espaço 18, fio topo 1px #D9D9D9 linha  «roteiro/dia 04»
          ▸  coluna, largura 52, espaço 6
            T  «DIA»
               Archivo 9 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #9A9A9A cinza fraco
            T  «04»
               Anton 27 · entrelinha 1 · espaçamento -0.3 · #111111 tinta
          ▸  coluna, largura estica, espaço 10, fio esquerda 1px #D9D9D9 linha
            ▸  linha, largura estica
              ↔  recuo lateral 16px
              ▸  coluna, largura estica, espaço 10
                T  «05 dez · Tramandaí · RS · ~230 km»
                   JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura estica
                T  «MOSTARDAS → TRAMANDAÍ»
                   Anton 19 · entrelinha 1.12 · espaçamento -0.2 · #111111 tinta · largura estica
                T  «Dunas e reflorestamento, almoço na Lagoa do Bacupari, praia de São Simão e beira-oceano até Tramandaí. À noite, fora do volante, nosso tradicional evento de encerramento.»
                   Archivo 15 · entrelinha 1.55 · #717171 cinza · largura estica
        ▸  linha, largura estica, recuo 20, espaço 18, fio topo 1px #D9D9D9 linha  «roteiro/dia 05»
          ▸  coluna, largura 52, espaço 6
            T  «DIA»
               Archivo 9 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #9A9A9A cinza fraco
            T  «05»
               Anton 27 · entrelinha 1 · espaçamento -0.3 · #111111 tinta
          ▸  coluna, largura estica, espaço 10, fio esquerda 1px #D9D9D9 linha
            ▸  linha, largura estica
              ↔  recuo lateral 16px
              ▸  coluna, largura estica, espaço 10
                T  «06 dez · Tramandaí · RS»
                   JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura estica
                T  «DESPEDIDA»
                   Anton 19 · entrelinha 1.12 · espaçamento -0.2 · #111111 tinta · largura estica
                T  «Café da manhã e check-out, sem pressa. Você volta para casa com memórias que duram para sempre.»
                   Archivo 15 · entrelinha 1.55 · #717171 cinza · largura estica
        ─  fio 2px #111111 tinta (largura toda)
    ↔  recuo lateral 20px
  ⇕  respiro 36px
```

### hospedagem

```
▸  coluna, largura estica, alinha ao centro, fundo #FFFFFF branco  «hospedagem»
  ⇕  respiro 36px
  ▸  linha, largura estica
    ↔  recuo lateral 20px
    ▸  coluna, largura estica, espaço 14
      T  «HOSPEDAGEM»
         Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #717171 cinza
      T  «ONDE O GRUPO FICA»
         Anton 30 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta
      T  «Hospedagem escolhida a dedo entre as opções e padrões da região · 4 pernoites com café da manhã · jantas inclusas (3 em Mostardas · 1 em Tramandaí).»
         Archivo 12.5 · entrelinha 1.45 · #717171 cinza · largura estica
      ▸  coluna, largura estica
        ─  fio 2px #111111 tinta (largura toda)
        ▸  coluna, largura estica, recuo 20, espaço 20  «hospedagem/Pousada Pouso Alegre»
          ▸  linha, largura estica, espaço 16
            ▸  coluna, largura estica, espaço 8
              T  «CHEGADA & CORAÇÃO DA EXPEDIÇÃO»
                 Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #717171 cinza
              T  «Pousada Pouso Alegre»
                 Anton 19 · entrelinha 1.12 · espaçamento -0.2 · #111111 tinta · largura estica
              ▸  linha, espaço 10, alinha ao centro
                T  «Mostardas · RS»
                   JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco
                ▪  retângulo 3×3 · #9A9A9A cinza fraco
                T  «3 noites»
                   JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #111111 tinta
          T  «No centro do roteiro, com café da manhã. Sua base nas noites 1, 2 e 3.»
             Archivo 15 · entrelinha 1.55 · #717171 cinza · largura estica
          ▸  linha, largura estica, espaço 6
            ▣  FOTO estica×116
            ▣  FOTO estica×116
            ▣  FOTO 34×116
        ▸  coluna, largura estica, recuo 20, espaço 20, fio topo 1px #D9D9D9 linha  «hospedagem/Schenkel Hotel»
          ▸  linha, largura estica, espaço 16
            ▸  coluna, largura estica, espaço 8
              T  «BASE DA DESPEDIDA»
                 Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #717171 cinza
              T  «Schenkel Hotel»
                 Anton 19 · entrelinha 1.12 · espaçamento -0.2 · #111111 tinta · largura estica
              ▸  linha, espaço 10, alinha ao centro
                T  «Tramandaí · RS»
                   JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco
                ▪  retângulo 3×3 · #9A9A9A cinza fraco
                T  «1 noite»
                   JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #111111 tinta
          T  «Apart-hotel com café da manhã. Sua base na última noite — noite 4.»
             Archivo 15 · entrelinha 1.55 · #717171 cinza · largura estica
          ▸  linha, largura estica, espaço 6
            ▣  FOTO estica×116
            ▣  FOTO estica×116
            ▣  FOTO 34×116
        ─  fio 2px #111111 tinta (largura toda)
    ↔  recuo lateral 20px
  ⇕  respiro 36px
```

### incluso

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «incluso»
  ⇕  respiro 36px
  ▸  linha, largura estica
    ↔  recuo lateral 20px
    ▸  coluna, largura estica, espaço 14
      T  «O PACOTE»
         Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #717171 cinza
      T  «O QUE ESTÁ INCLUSO»
         Anton 30 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta
      ▸  coluna, largura estica, recuo 20, fundo #FFFFFF branco  «o que está incluso»
        ▸  coluna, largura estica, espaço 6
          T  «11 itens»
             JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #111111 tinta
          T  «TUDO ISTO ACOMPANHA A EXPEDIÇÃO»
             Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #717171 cinza
        ⇕  respiro 16px
        ─  fio 2px #111111 tinta (largura toda)
        ▸  linha, largura estica
          ▸  coluna, largura estica
            ▸  linha, largura estica, recuo 14, espaço 16, fio base 1px #D9D9D9 linha
              T  «01»
                 JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 26
              T  «3 dias de trilha guiada por equipe experiente»
                 Archivo 15 · entrelinha 1.55 · #111111 tinta · largura estica
            ▸  linha, largura estica, recuo 14, espaço 16, fio base 1px #D9D9D9 linha
              T  «02»
                 JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 26
              T  «Cegonha (transporte do UTV) ida e volta, com seguro contra roubo»
                 Archivo 15 · entrelinha 1.55 · #111111 tinta · largura estica
            ▸  linha, largura estica, recuo 14, espaço 16, fio base 1px #D9D9D9 linha
              T  «03»
                 JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 26
              T  «Transfer terrestre ida e volta — Limeira ↔ aeroporto e Porto Alegre ↔ Mostardas/Tramandaí»
                 Archivo 15 · entrelinha 1.55 · #111111 tinta · largura estica
            ▸  linha, largura estica, recuo 14, espaço 16, fio base 1px #D9D9D9 linha
              T  «04»
                 JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 26
              T  «4 pernoites com café da manhã (3 Mostardas · 1 Tramandaí)»
                 Archivo 15 · entrelinha 1.55 · #111111 tinta · largura estica
            ▸  linha, largura estica, recuo 14, espaço 16, fio base 1px #D9D9D9 linha
              T  «05»
                 JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 26
              T  «4 jantas (3 Mostardas · 1 Tramandaí)»
                 Archivo 15 · entrelinha 1.55 · #111111 tinta · largura estica
            ▸  linha, largura estica, recuo 14, espaço 16, fio base 1px #D9D9D9 linha
              T  «06»
                 JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 26
              T  «3 almoços (2 Mostardas · 1 Tramandaí)»
                 Archivo 15 · entrelinha 1.55 · #111111 tinta · largura estica
            ▸  linha, largura estica, recuo 14, espaço 16, fio base 1px #D9D9D9 linha
              T  «07»
                 JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 26
              T  «Eventos fora do volante — boas-vindas e encerramento, com coquetel, chopp, drinks e música ao vivo»
                 Archivo 15 · entrelinha 1.55 · #111111 tinta · largura estica
            ▸  linha, largura estica, recuo 14, espaço 16, fio base 1px #D9D9D9 linha
              T  «08»
                 JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 26
              T  «Carro de apoio 4×4 + reboque»
                 Archivo 15 · entrelinha 1.55 · #111111 tinta · largura estica
            ▸  linha, largura estica, recuo 14, espaço 16, fio base 1px #D9D9D9 linha
              T  «09»
                 JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 26
              T  «4 quadriciclos + mecânicos no comboio»
                 Archivo 15 · entrelinha 1.55 · #111111 tinta · largura estica
            ▸  linha, largura estica, recuo 14, espaço 16, fio base 1px #D9D9D9 linha
              T  «10»
                 JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 26
              T  «Equipe de 7 pessoas — guias, apoio e mecânica»
                 Archivo 15 · entrelinha 1.55 · #111111 tinta · largura estica
            ▸  linha, largura estica, recuo 14, espaço 16
              T  «11»
                 JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 26
              T  «Equipe de fotos e vídeos profissionais»
                 Archivo 15 · entrelinha 1.55 · #111111 tinta · largura estica
        ─  fio 2px #111111 tinta (largura toda)
    ↔  recuo lateral 20px
  ⇕  respiro 36px
```

### reserva

```
▸  coluna, largura estica, alinha ao centro, fundo #000000 preto  «reserva»
  ⇕  respiro 40px
  ▸  coluna, largura estica, espaço 16, alinha ao centro
    ▸  linha, largura estica
      ↔  recuo lateral 20px
      ▸  coluna, largura estica, espaço 16
        T  «RESERVA»
           Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #FFFFFF8C branco 55%
        T  «O INVESTIMENTO DA EXPEDIÇÃO»
           Anton 30 · entrelinha 1.04 · espaçamento -0.4 · #FFFFFF branco · largura estica
        ▸  coluna, largura estica  «reserva/mobile»
          ─  fio 2px #FFFFFF29 branco 16% (largura toda)
          ▸  linha, largura estica
            ▸  coluna, largura estica, recuo 18, espaço 5
              T  «POR PESSOA»
                 JetBrains Mono 9 · entrelinha 1.4 · espaçamento +0.3 · #FFFFFF8C branco 55%
              T  «a confirmar»
                 Anton 30 · entrelinha 1.04 · espaçamento -0.4 · #FFFFFF branco
            ▸  coluna, largura estica, recuo 18, espaço 5, fio esquerda 1px #FFFFFF29 branco 16%
              T  «POR CASAL»
                 JetBrains Mono 9 · entrelinha 1.4 · espaçamento +0.3 · #FFFFFF8C branco 55%
              T  «a confirmar»
                 Anton 30 · entrelinha 1.04 · espaçamento -0.4 · #FFFFFF branco
          ─  fio 2px #FFFFFF29 branco 16% (largura toda)
          ⇕  respiro 18px
          ▸  linha, largura estica, altura 52, recuo 24, espaço 9, alinha ao centro, distribui ao centro, fundo #FFFFFF branco  «botão/claro»
            T  «FAZER PRÉ-RESERVA»
               Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.2 · #000000 preto
            ▸  caixa, largura 13, altura 13, contorno   «ícone/arrow-right»
          ⇕  respiro 10px
          T  «A escolha da acomodação acontece na próxima etapa, depois de iniciar a reserva.»
             Archivo 11 · entrelinha 1.45 · #FFFFFF8C branco 55% · largura estica
      ↔  recuo lateral 20px
  ⇕  respiro 40px
```

### não incluso

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «não incluso»
  ⇕  respiro 32px
  ▸  linha, largura estica
    ↔  recuo lateral 20px
    ▸  coluna, largura estica, espaço 12
      T  «COMPLEMENTO»
         Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #717171 cinza
      T  «O QUE NÃO ESTÁ INCLUSO»
         Anton 24 · entrelinha 1.08 · espaçamento -0.3 · #111111 tinta · largura estica
      ▸  coluna, largura estica
        ─  fio 1px #D9D9D9 linha (largura toda)
        ▸  linha, largura estica, recuo 13, espaço 14, fio base 1px #D9D9D9 linha
          T  «01»
             JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 24
          T  «Combustível dos trajetos»
             Archivo 12.5 · entrelinha 1.45 · #717171 cinza · largura estica
        ▸  linha, largura estica, recuo 13, espaço 14, fio base 1px #D9D9D9 linha
          T  «02»
             JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 24
          T  «Peças efetivamente utilizadas e mão de obra»
             Archivo 12.5 · entrelinha 1.45 · #717171 cinza · largura estica
        ▸  linha, largura estica, recuo 13, espaço 14, fio base 1px #D9D9D9 linha
          T  «03»
             JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 24
          T  «Passagem aérea»
             Archivo 12.5 · entrelinha 1.45 · #717171 cinza · largura estica
        ▸  linha, largura estica, recuo 13, espaço 14, fio base 1px #D9D9D9 linha
          T  «04»
             JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 24
          T  «O que não foi mencionado anteriormente»
             Archivo 12.5 · entrelinha 1.45 · #717171 cinza · largura estica
    ↔  recuo lateral 20px
  ⇕  respiro 32px
```

### guia

```
▸  coluna, largura estica, alinha ao centro, fundo #FFFFFF branco  «guia»
  ⇕  respiro 36px
  ▸  linha, largura estica
    ↔  recuo lateral 20px
    ▸  coluna, largura estica, espaço 14
      T  «GUIA DA EXPEDIÇÃO»
         Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #717171 cinza
      T  «ENCONTRE QUALQUER INFORMAÇÃO»
         Anton 30 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
      T  «Pesquise um termo ou navegue pelos tópicos. É a mesma base que o atendimento consulta.»
         Archivo 15 · entrelinha 1.55 · #717171 cinza · largura estica
      ▸  linha, largura estica, altura 50, recuo 16, espaço 12, alinha ao centro, fio base 1.5px #111111 tinta
        ▸  caixa, largura 17, altura 17, contorno   «ícone/search»
        T  «hotel, transfer, check-in, clima…»
           Archivo 15 · entrelinha 1.55 · #9A9A9A cinza fraco · largura estica
      ▸  coluna, largura estica
        ─  fio 2px #111111 tinta (largura toda)
        ▸  linha, largura estica, recuo 15, espaço 12, alinha ao centro, fio base 1px #D9D9D9 linha
          T  «01»
             JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 24
          T  «Logística»
             Archivo 15 · peso 700 · entrelinha 1.3 · #111111 tinta · largura estica
          T  «6 itens»
             JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco
          ▸  caixa, largura 15, altura 15, contorno   «ícone/arrow-right»
        ▸  linha, largura estica, recuo 15, espaço 12, alinha ao centro, fio base 1px #D9D9D9 linha
          T  «02»
             JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 24
          T  «Hospedagem»
             Archivo 15 · peso 700 · entrelinha 1.3 · #111111 tinta · largura estica
          T  «5 itens»
             JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco
          ▸  caixa, largura 15, altura 15, contorno   «ícone/arrow-right»
        ▸  linha, largura estica, recuo 15, espaço 12, alinha ao centro, fio base 1px #D9D9D9 linha
          T  «03»
             JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 24
          T  «Gastronomia»
             Archivo 15 · peso 700 · entrelinha 1.3 · #111111 tinta · largura estica
          T  «4 itens»
             JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco
          ▸  caixa, largura 15, altura 15, contorno   «ícone/arrow-right»
        ▸  linha, largura estica, recuo 15, espaço 12, alinha ao centro, fio base 1px #D9D9D9 linha
          T  «04»
             JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 24
          T  «Transporte»
             Archivo 15 · peso 700 · entrelinha 1.3 · #111111 tinta · largura estica
          T  «4 itens»
             JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco
          ▸  caixa, largura 15, altura 15, contorno   «ícone/arrow-right»
        ▸  linha, largura estica, recuo 15, espaço 12, alinha ao centro, fio base 1px #D9D9D9 linha
          T  «05»
             JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 24
          T  «Vestuário»
             Archivo 15 · peso 700 · entrelinha 1.3 · #111111 tinta · largura estica
          T  «3 itens»
             JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco
          ▸  caixa, largura 15, altura 15, contorno   «ícone/arrow-right»
        ▸  linha, largura estica, recuo 15, espaço 12, alinha ao centro
          T  «06»
             JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco · largura 24
          T  «O que levar»
             Archivo 15 · peso 700 · entrelinha 1.3 · #111111 tinta · largura estica
          T  «6 itens»
             JetBrains Mono 10 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco
          ▸  caixa, largura 15, altura 15, contorno   «ícone/arrow-right»
        ─  fio 2px #111111 tinta (largura toda)
    ↔  recuo lateral 20px
  ⇕  respiro 36px
```

### faq

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «faq»
  ⇕  respiro 36px
  ▸  linha, largura estica
    ↔  recuo lateral 20px
    ▸  coluna, largura estica, espaço 14
      T  «DÚVIDAS»
         Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #717171 cinza
      T  «PERGUNTAS FREQUENTES»
         Anton 30 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
      ▸  coluna, largura estica
        ─  fio 2px #111111 tinta (largura toda)
        ▸  linha, largura estica, recuo 16, espaço 12, alinha ao centro, fio base 1px #D9D9D9 linha
          T  «Preciso ter UTV próprio para participar?»
             Archivo 15 · peso 600 · entrelinha 1.55 · #111111 tinta · largura estica
          T  «+»
             Anton 19 · entrelinha 1.12 · espaçamento -0.2 · #717171 cinza
        ▸  linha, largura estica, recuo 16, espaço 12, alinha ao centro, fio base 1px #D9D9D9 linha
          T  «Qual o nível de dificuldade dessa expedição?»
             Archivo 15 · peso 600 · entrelinha 1.55 · #111111 tinta · largura estica
          T  «+»
             Anton 19 · entrelinha 1.12 · espaçamento -0.2 · #717171 cinza
        ▸  linha, largura estica, recuo 16, espaço 12, alinha ao centro, fio base 1px #D9D9D9 linha
          T  «Criança pode ir? A partir de que idade?»
             Archivo 15 · peso 600 · entrelinha 1.55 · #111111 tinta · largura estica
          T  «+»
             Anton 19 · entrelinha 1.12 · espaçamento -0.2 · #717171 cinza
        ▸  linha, largura estica, recuo 16, espaço 12, alinha ao centro, fio base 1px #D9D9D9 linha
          T  «Como funciona o apoio mecânico e o resgate?»
             Archivo 15 · peso 600 · entrelinha 1.55 · #111111 tinta · largura estica
          T  «+»
             Anton 19 · entrelinha 1.12 · espaçamento -0.2 · #717171 cinza
        ▸  linha, largura estica, recuo 16, espaço 12, alinha ao centro
          T  «O que acontece se eu precisar cancelar?»
             Archivo 15 · peso 600 · entrelinha 1.55 · #111111 tinta · largura estica
          T  «+»
             Anton 19 · entrelinha 1.12 · espaçamento -0.2 · #717171 cinza
        ─  fio 2px #111111 tinta (largura toda)
    ↔  recuo lateral 20px
  ⇕  respiro 36px
```

### barra-fixa/reserva

```
▸  linha, largura estica, altura 82, alinha ao centro, fundo #000000 preto, fio topo 1px #FFFFFF29 branco 16%  «barra-fixa/reserva»
  ↔  recuo lateral 20px
  ▸  linha, largura estica, espaço 14, alinha ao centro
    ▸  coluna, espaço 3
      T  «A PARTIR DE»
         Archivo 9 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #FFFFFF8C branco 55%
      T  «Pré-reserva aberta»
         Anton 19 · entrelinha 1.12 · espaçamento -0.2 · #FFFFFF branco
    ↔  mola (empurra o resto)
    ▸  linha, largura 176, altura 48, recuo 22, espaço 9, alinha ao centro, distribui ao centro, fundo #FFFFFF branco  «botão/claro»
      T  «FAZER PRÉ-RESERVA»
         Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.2 · #000000 preto
      ▸  caixa, largura 13, altura 13, contorno   «ícone/arrow-right»
  ↔  recuo lateral 20px
```

### rodapé/mobile

```
▸  coluna, largura estica, alinha ao centro, fundo #000000 preto  «rodapé/mobile»
  ⇕  respiro 34px
  ▸  linha, largura estica
    ↔  recuo lateral 20px
    ▸  coluna, largura estica, espaço 20, alinha ao centro
      ▣  FOTO 64×24
      ▸  linha, largura estica, espaço 14, alinha ao centro, distribui ao centro
        T  «Expedições»
           Archivo 12.5 · entrelinha 1.45 · #FFFFFFD1 branco 82%
        T  «Estoque Off-Road»
           Archivo 12.5 · entrelinha 1.45 · #FFFFFFD1 branco 82%
        T  «Produtos»
           Archivo 12.5 · entrelinha 1.45 · #FFFFFFD1 branco 82%
        T  «O Desbravando»
           Archivo 12.5 · entrelinha 1.45 · #FFFFFFD1 branco 82%
      ─  fio 1px #FFFFFF29 branco 16% (largura toda)
      ▸  linha, espaço 20
        ▸  caixa, largura 19, altura 19, contorno   «ícone/message-circle»
        ▸  caixa, largura 19, altura 19, contorno   «ícone/instagram»
        ▸  caixa, largura 19, altura 19, contorno   «ícone/youtube»
      T  «© 2026 Desbravando UTV»
         Archivo 11 · entrelinha 1.45 · #FFFFFF8C branco 55%
    ↔  recuo lateral 20px
  ⇕  respiro 30px
```

---

## M3 · Grupo Avulso (mobile)

Largura da tela: **390px** · fundo **#F2F2F2 papel** · 7 módulos

### nav/mobile

```
▸  linha, largura estica, altura 58, alinha ao centro, fundo #000000 preto  «nav/mobile»
  ↔  recuo lateral 20px
  ▸  linha, largura estica, alinha ao centro
    ▸  caixa, largura 22, altura 22, contorno   «ícone/menu»
    ↔  mola (empurra o resto)
    ▣  FOTO 58×22
    ↔  mola (empurra o resto)
    ↔  recuo lateral 22px
  ↔  recuo lateral 20px
```

### abertura

```
▸  coluna, largura estica, alinha ao centro, fundo #F2F2F2 papel  «abertura»
  ⇕  respiro 36px
  ▸  linha, largura estica
    ↔  recuo lateral 20px
    ▸  coluna, largura estica, espaço 14
      T  «GRUPO AVULSO»
         Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #717171 cinza
      T  «PRÓXIMAS EXPEDIÇÕES»
         Anton 38 · entrelinha 1.02 · espaçamento -0.4 · #111111 tinta · largura estica
      T  «Escolha seu próximo destino, conheça todos os detalhes da expedição e reserve sua vaga em um grupo já formado.»
         Archivo 15 · entrelinha 1.55 · #717171 cinza · largura estica
    ↔  recuo lateral 20px
  ⇕  respiro 36px
```

### transição · começa a agenda

```
▸  linha, largura estica, altura 54, alinha ao centro, fundo #000000 preto  «transição · começa a agenda»
  ↔  recuo lateral 20px
  T  «AGENDA 2026»
     Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #FFFFFFD1 branco 82%
  ↔  mola (empurra o resto)
  T  «5 expedições»
     JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #FFFFFF8C branco 55%
  ↔  recuo lateral 20px
```

### agenda

```
▸  coluna, largura estica  «agenda»
  ─  fio 2px #111111 tinta (largura toda)
  ▸  coluna, largura estica, fio base 1px #D9D9D9 linha
    ▣  FOTO estica×210
    ▸  coluna, largura estica, recuo 18, espaço 10
      ▸  linha, espaço 10, alinha ao centro
        T  «01»
           JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco
        T  «RS · 5 dias · Casais e Família»
           Archivo 12.5 · entrelinha 1.45 · #717171 cinza
      T  «COSTA DOCE»
         Anton 27 · entrelinha 1 · espaçamento -0.3 · #111111 tinta · largura estica
      T  «02–06 dez 2026»
         Archivo 15 · entrelinha 1.55 · #717171 cinza
      ▸  linha, espaço 7, alinha ao centro  «status/pre-reserva»
        ▪  retângulo 5×5 · #9A9A9A cinza fraco
        T  «Pré-reserva aberta»
           Archivo 12.5 · entrelinha 1.45 · #717171 cinza
      ▸  linha, largura estica, alinha ao centro
        ↔  mola (empurra o resto)
        T  «VER EXPEDIÇÃO →»
           Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.2 · #111111 tinta
  ▸  coluna, largura estica, fio base 1px #D9D9D9 linha
    ▣  FOTO estica×210
    ▸  coluna, largura estica, recuo 18, espaço 10
      ▸  linha, espaço 10, alinha ao centro
        T  «02»
           JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco
        T  «SC · 5 dias · Família»
           Archivo 12.5 · entrelinha 1.45 · #717171 cinza
      T  «URUBICI»
         Anton 27 · entrelinha 1 · espaçamento -0.3 · #111111 tinta · largura estica
      T  «26–30 ago 2026»
         Archivo 15 · entrelinha 1.55 · #717171 cinza
      ▸  linha, espaço 7, alinha ao centro  «status/ultimas»
        ▪  retângulo 5×5 · #111111 tinta
        T  «Últimas vagas»
           Archivo 12.5 · peso 700 · entrelinha 1.45 · #111111 tinta
      ▸  linha, largura estica, alinha ao centro
        ↔  mola (empurra o resto)
        T  «VER EXPEDIÇÃO →»
           Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.2 · #111111 tinta
  ▸  coluna, largura estica, fio base 1px #D9D9D9 linha
    ▣  FOTO estica×210
    ▸  coluna, largura estica, recuo 18, espaço 10
      ▸  linha, espaço 10, alinha ao centro
        T  «03»
           JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco
        T  «MG · 4 dias · Só Homens»
           Archivo 12.5 · entrelinha 1.45 · #717171 cinza
      T  «SERRA DA CANASTRA»
         Anton 27 · entrelinha 1 · espaçamento -0.3 · #111111 tinta · largura estica
      T  «Datas em definição»
         Archivo 15 · entrelinha 1.55 · #717171 cinza
      ▸  linha, espaço 7, alinha ao centro  «status/espera»
        ▪  retângulo 5×5 · #9A9A9A cinza fraco
        T  «Lista de espera»
           Archivo 12.5 · entrelinha 1.45 · #717171 cinza
      ▸  linha, largura estica, alinha ao centro
        ↔  mola (empurra o resto)
        T  «VER EXPEDIÇÃO →»
           Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.2 · #111111 tinta
  ▸  coluna, largura estica, fio base 1px #D9D9D9 linha
    ▣  FOTO estica×210
    ▸  coluna, largura estica, recuo 18, espaço 10
      ▸  linha, espaço 10, alinha ao centro
        T  «04»
           JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco
        T  «RJ · 3 dias · Só Homens»
           Archivo 12.5 · entrelinha 1.45 · #717171 cinza
      T  «VISCONDE DE MAUÁ»
         Anton 27 · entrelinha 1 · espaçamento -0.3 · #111111 tinta · largura estica
      T  «Datas em definição»
         Archivo 15 · entrelinha 1.55 · #717171 cinza
      ▸  linha, espaço 7, alinha ao centro  «status/espera»
        ▪  retângulo 5×5 · #9A9A9A cinza fraco
        T  «Lista de espera»
           Archivo 12.5 · entrelinha 1.45 · #717171 cinza
      ▸  linha, largura estica, alinha ao centro
        ↔  mola (empurra o resto)
        T  «VER EXPEDIÇÃO →»
           Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.2 · #111111 tinta
  ▸  coluna, largura estica, fio base 1px #D9D9D9 linha
    ▣  FOTO estica×210
    ▸  coluna, largura estica, recuo 18, espaço 10
      ▸  linha, espaço 10, alinha ao centro
        T  «05»
           JetBrains Mono 11 · entrelinha 1.4 · espaçamento +0.3 · #9A9A9A cinza fraco
        T  «RJ · 3 dias · Casais e Família»
           Archivo 12.5 · entrelinha 1.45 · #717171 cinza
      T  «MACAÉ»
         Anton 27 · entrelinha 1 · espaçamento -0.3 · #111111 tinta · largura estica
      T  «Datas em definição»
         Archivo 15 · entrelinha 1.55 · #717171 cinza
      ▸  linha, espaço 7, alinha ao centro  «status/espera»
        ▪  retângulo 5×5 · #9A9A9A cinza fraco
        T  «Lista de espera»
           Archivo 12.5 · entrelinha 1.45 · #717171 cinza
      ▸  linha, largura estica, alinha ao centro
        ↔  mola (empurra o resto)
        T  «VER EXPEDIÇÃO →»
           Archivo 12 · peso 600 · entrelinha 1 · espaçamento +1.2 · #111111 tinta
```

### faq

```
▸  coluna, largura estica, alinha ao centro, fundo #FFFFFF branco  «faq»
  ⇕  respiro 40px
  ▸  linha, largura estica
    ↔  recuo lateral 20px
    ▸  coluna, largura estica, espaço 14
      T  «DÚVIDAS»
         Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #717171 cinza
      T  «PERGUNTAS FREQUENTES»
         Anton 30 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
      ▸  coluna, largura estica
        ─  fio 2px #111111 tinta (largura toda)
        ▸  linha, largura estica, recuo 16, espaço 12, alinha ao centro, fio base 1px #D9D9D9 linha
          T  «Preciso ter UTV próprio para participar?»
             Archivo 15 · peso 600 · entrelinha 1.55 · #111111 tinta · largura estica
          T  «+»
             Anton 19 · entrelinha 1.12 · espaçamento -0.2 · #717171 cinza
        ▸  linha, largura estica, recuo 16, espaço 12, alinha ao centro, fio base 1px #D9D9D9 linha
          T  «Qual o nível de dificuldade dessa expedição?»
             Archivo 15 · peso 600 · entrelinha 1.55 · #111111 tinta · largura estica
          T  «+»
             Anton 19 · entrelinha 1.12 · espaçamento -0.2 · #717171 cinza
        ▸  linha, largura estica, recuo 16, espaço 12, alinha ao centro, fio base 1px #D9D9D9 linha
          T  «Criança pode ir? A partir de que idade?»
             Archivo 15 · peso 600 · entrelinha 1.55 · #111111 tinta · largura estica
          T  «+»
             Anton 19 · entrelinha 1.12 · espaçamento -0.2 · #717171 cinza
        ▸  linha, largura estica, recuo 16, espaço 12, alinha ao centro, fio base 1px #D9D9D9 linha
          T  «Como funciona o apoio mecânico e o resgate?»
             Archivo 15 · peso 600 · entrelinha 1.55 · #111111 tinta · largura estica
          T  «+»
             Anton 19 · entrelinha 1.12 · espaçamento -0.2 · #717171 cinza
        ▸  linha, largura estica, recuo 16, espaço 12, alinha ao centro
          T  «O que acontece se eu precisar cancelar?»
             Archivo 15 · peso 600 · entrelinha 1.55 · #111111 tinta · largura estica
          T  «+»
             Anton 19 · entrelinha 1.12 · espaçamento -0.2 · #717171 cinza
        ─  fio 2px #111111 tinta (largura toda)
    ↔  recuo lateral 20px
  ⇕  respiro 40px
```

### chamada final/mobile

```
▸  coluna, largura estica, alinha ao centro, fundo #FFFFFF branco  «chamada final/mobile»
  ⇕  respiro 48px
  ▸  linha, largura estica
    ↔  recuo lateral 20px
    ▸  coluna, largura estica
      ─  fio 2px #111111 tinta (largura toda)
      ⇕  respiro 24px
      T  «NOVAS EXPEDIÇÕES»
         Archivo 10 · peso 600 · entrelinha 1.2 · espaçamento +2.4 · #717171 cinza
      ⇕  respiro 12px
      T  «AINDA NÃO ENCONTROU SUA PRÓXIMA EXPERIÊNCIA?»
         Anton 30 · entrelinha 1.04 · espaçamento -0.4 · #111111 tinta · largura estica
      ⇕  respiro 14px
      T  «Nossa agenda é atualizada constantemente. Cadastre seu interesse e seja avisado quando uma nova expedição estiver disponível para o seu perfil.»
         Archivo 15 · entrelinha 1.55 · #717171 cinza · largura estica
      ⇕  respiro 26px
      ▸  linha, largura estica, altura 48, espaço 12, alinha ao centro, fio base 1.5px #111111 tinta
        T  «seu e-mail»
           Archivo 15 · entrelinha 1.55 · #9A9A9A cinza fraco · largura estica
        ▸  caixa, largura 15, altura 15, contorno   «ícone/arrow-right»
      ⇕  respiro 14px
      T  «Avise-me sobre novas expedições»
         Archivo 12.5 · entrelinha 1.45 · #717171 cinza
    ↔  recuo lateral 20px
  ⇕  respiro 48px
```

### rodapé/mobile

```
▸  coluna, largura estica, alinha ao centro, fundo #000000 preto  «rodapé/mobile»
  ⇕  respiro 34px
  ▸  linha, largura estica
    ↔  recuo lateral 20px
    ▸  coluna, largura estica, espaço 20, alinha ao centro
      ▣  FOTO 64×24
      ▸  linha, largura estica, espaço 14, alinha ao centro, distribui ao centro
        T  «Expedições»
           Archivo 12.5 · entrelinha 1.45 · #FFFFFFD1 branco 82%
        T  «Estoque Off-Road»
           Archivo 12.5 · entrelinha 1.45 · #FFFFFFD1 branco 82%
        T  «Produtos»
           Archivo 12.5 · entrelinha 1.45 · #FFFFFFD1 branco 82%
        T  «O Desbravando»
           Archivo 12.5 · entrelinha 1.45 · #FFFFFFD1 branco 82%
      ─  fio 1px #FFFFFF29 branco 16% (largura toda)
      ▸  linha, espaço 20
        ▸  caixa, largura 19, altura 19, contorno   «ícone/message-circle»
        ▸  caixa, largura 19, altura 19, contorno   «ícone/instagram»
        ▸  caixa, largura 19, altura 19, contorno   «ícone/youtube»
      T  «© 2026 Desbravando UTV»
         Archivo 11 · entrelinha 1.45 · #FFFFFF8C branco 55%
    ↔  recuo lateral 20px
  ⇕  respiro 30px
```
