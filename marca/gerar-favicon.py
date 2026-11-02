"""Gera o ícone da aba (favicon) do site a partir da marca da montanha.

    python marca/gerar-favicon.py

POR QUE EXISTE, com data: em 16/10/2026 o ícone no ar ainda era o logo ANTIGO — fundo azul
marinho com "DESBRAVANDO UTV" em verde. Dois problemas de uma vez: está fora da identidade
(que é preto e branco, ver marca/IDENTIDADE_VISUAL.md) e é ilegível, porque palavra de onze
letras em 32 pixels vira borrão. Ícone de aba não é logo reduzido, é só o símbolo.

O que este arquivo faz: recorta a montanha pelo pixel (não pelo tamanho declarado da imagem,
que tem transparência sobrando em volta), centraliza num quadrado preto com respiro, e grava
nos tamanhos que a Wix usa. O respiro importa: encostada na borda, a montanha some dentro do
arredondamento que o navegador aplica no ícone da aba.
"""
import os
import sys
from pathlib import Path

from PIL import Image

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
# O logo é arte do cliente e fica fora do git: lê e grava na pasta de artes
# (variável DESBRAVANDO_ARTES, a mesma de design/lib/artes.mjs).
ARTES = Path(os.environ.get("DESBRAVANDO_ARTES", r"C:\Users\olive\Arquivo-projetos\desbravando-recebidos\do-repo"))
AQUI = ARTES / "marca"
if not (AQUI / "logo-montanha.png").exists():
    sys.exit(f"logo não encontrado em {AQUI}. Aponte DESBRAVANDO_ARTES para a pasta das artes.")

PRETO = (13, 13, 13, 255)   # mesmo #0D0D0D da identidade
RESPIRO = 0.16              # fração do lado que fica de margem em cada ponta

origem = Image.open(AQUI / "logo-montanha.png").convert("RGBA")

# A moldura real do desenho sai do canal alfa. Confiar em im.size traria a transparência
# junto e a montanha nasceria pequena e descentralizada.
caixa = origem.split()[3].getbbox()
marca = origem.crop(caixa)
print(f"montanha recortada: {marca.size} (de {origem.size})")

# A montanha é larga e baixa; o lado do quadrado vem da maior dimensão, com respiro.
util = 1 - 2 * RESPIRO
for lado in (512, 192, 180, 64, 32):
    alvo = int(lado * util)
    escala = min(alvo / marca.width, alvo / marca.height)
    w, h = max(1, round(marca.width * escala)), max(1, round(marca.height * escala))
    peca = marca.resize((w, h), Image.LANCZOS)
    fundo = Image.new("RGBA", (lado, lado), PRETO)
    fundo.alpha_composite(peca, ((lado - w) // 2, (lado - h) // 2))
    saida = AQUI / f"favicon-{lado}.png"
    fundo.convert("RGB").save(saida, "PNG", optimize=True)
    print(f"  {saida.name:18} {lado}x{lado}  montanha {w}x{h}")

print("\nO que subir na Wix: favicon-512.png (ela gera os outros tamanhos sozinha).")
print("Painel > Configurações > Site > Favicon.")
