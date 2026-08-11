// Peça: "Carregamento da Cegonha" — Expedição Urubici.
// Formato feed 4:5 (1080×1350), o "arte única" da tabela de formatos do guia.
//
// Decisões de conteúdo tomadas em cima do briefing, e por quê:
//  · Os emojis do briefing (📅 🕗 🚛) NÃO entram na arte. O guia pede "evitar
//    excesso de elementos gráficos" e a marca já tem marcador próprio (quadrado
//    no registro social, ↗ no núcleo). Emoji quebraria a tipografia.
//  · "o Desbravando" no masculino, como manda o naming.
//  · Fecho com a voz de expedição ("Você só vive a experiência. Do resto, a gente
//    cuida."), que é literalmente o assunto: o participante entrega e vai embora.
//  · Sem endereço da sede — o briefing não deu, e eu não invento dado de cliente.
//  · Nada de `transform` no CSS: o guia registra que o renderizador da identidade
//    (WeasyPrint) não suporta, então centralizo por posição explícita para o
//    template continuar válido nos dois renderizadores.
import { FEED, MONTANHA, mascara } from '../lib/identidade.mjs';

export const meta = {
  nome: 'cegonha-urubici',
  titulo: 'Carregamento da Cegonha — Expedição Urubici',
};

/**
 * As datas são o único conteúdo que muda entre edições — ficam aqui fora do
 * template, para remarcar a expedição sem tocar em layout.
 *
 * O transporte é SEMPRE o domingo seguinte às duas janelas de entrega: o
 * briefing original dá sexta/sábado para entregar e domingo para carregar.
 */
export const EDICOES = {
  agosto: {
    entregas: [
      { dia: 'Sexta-feira', data: '21 ago', hora: '08h00 às 17h00' },
      { dia: 'Sábado', data: '22 ago', hora: '08h00 às 11h00' },
    ],
    transporte: 'Domingo · 23 ago',
  },
  setembro: {
    entregas: [
      { dia: 'Sexta-feira', data: '11 set', hora: '08h00 às 17h00' },
      { dia: 'Sábado', data: '12 set', hora: '08h00 às 11h00' },
    ],
    transporte: 'Domingo · 13 set',
  },
};

export function cegonha({ tema: c, fontes, logoUri, edicao }) {
  const [a, b] = edicao.entregas;
  const P = 76; // margem lateral

  // textura pontilhada de fundo: existe na imagem base, mas entra quase invisível
  const textura = c.acentoEhCor
    ? `background-image:radial-gradient(${c.texto}0F 1px, transparent 1.2px);background-size:14px 14px;`
    : '';

  return `<!-- ${meta.titulo} · registro: ${c.rotulo} -->
<style>
${fontes}
*{margin:0;padding:0;box-sizing:border-box}
.peca{
  position:relative;overflow:hidden;
  width:${FEED.largura}px;height:${FEED.altura}px;
  background:${c.fundo};${textura}
  font-family:'Archivo';color:${c.texto};
  -webkit-font-smoothing:antialiased;
}
/* Montanha do logo, recortada por máscara, fechando a peça embaixo — é a
   composição da própria imagem base: muito ar no meio e a montanha grande na base.
   Sangra pela DIREITA e pela base de propósito: o corte reto morre na borda em vez
   de virar um traço solto no meio da arte. Fica só na metade direita, deixando a
   esquerda livre para a assinatura. */
.montanha{position:absolute;right:-120px;bottom:-60px}

.conteudo{position:relative;display:flex;flex-direction:column;
  width:100%;height:100%;padding:72px ${P}px 96px}

.logo{margin-bottom:58px}

.sobre{font-weight:600;font-size:17px;letter-spacing:6px;
  text-transform:uppercase;color:${c.t55};margin-bottom:20px}

h1{font-family:'Anton';font-weight:400;font-size:94px;line-height:.86;
  letter-spacing:-.5px;text-transform:uppercase}
h1 .ac{color:${c.acento}}

.hr{height:1.5px;background:${c.divisor};margin:54px 0 44px}

/* rótulo de bloco: marcador quadrado na cor da campanha + caixa alta (registro social) */
.rot{display:flex;align-items:center;font-weight:600;font-size:19px;
  letter-spacing:3.4px;text-transform:uppercase}
.mk{width:11px;height:11px;background:${c.acento};margin-right:15px;flex:0 0 11px}
.sub{font-size:19px;line-height:1.5;color:${c.t82};margin-top:13px}

.opcoes{display:flex;align-items:stretch;margin-top:34px}
.op{flex:1 1 0}
.dia{font-weight:600;font-size:15px;letter-spacing:3.4px;
  text-transform:uppercase;color:${c.t55}}
/* Anton é fonte de titulação em caixa alta: em caixa baixa ("21 ago") ela briga
   com o título. Tudo que é Anton nesta peça vai em caixa alta. */
.data{font-family:'Anton';font-weight:400;font-size:62px;line-height:1.06;
  letter-spacing:-.5px;text-transform:uppercase;color:${c.acento};margin-top:8px}
.hora{font-weight:700;font-size:24px;margin-top:6px}

/* o "ou" do briefing: as duas janelas são alternativas, não as duas */
.ou{position:relative;flex:0 0 88px}
.ou .linha{position:absolute;left:50%;margin-left:-.75px;top:2px;bottom:2px;
  width:1.5px;background:${c.divisor}}
.ou span{position:absolute;left:0;right:0;top:50%;margin:-16px auto 0;
  width:58px;height:32px;line-height:29px;text-align:center;
  border:1.5px solid ${c.borda};border-radius:999px;background:${c.fundo};
  font-weight:600;font-size:12px;letter-spacing:2.5px;color:${c.t55}}

.transp{margin-top:30px}
.transp .data{font-size:54px}
.txt{font-size:22px;line-height:1.5;color:${c.t82};margin-top:16px;max-width:660px}
.txt b{font-weight:700;color:${c.texto}}

.nota{margin-top:32px;padding-left:19px;border-left:1.5px solid ${c.borda};
  font-size:17px;line-height:1.45;color:${c.t55};max-width:600px}

.espaco{flex:1 1 auto;min-height:24px}
/* largura curta de propósito: a assinatura não pode invadir a montanha */
.rodape{font-weight:700;font-size:23px;line-height:1.45;color:${c.t82};max-width:430px}
</style>

<div class="peca">
  <div class="montanha" style="${mascara({ uri: logoUri, cor: c.montanha, larguraAlvo: 640, recorte: MONTANHA })}"></div>

  <div class="conteudo">
    <div class="logo" style="${mascara({ uri: logoUri, cor: c.logo, larguraAlvo: 153 })}"></div>

    <div class="sobre">Expedição Urubici · SC</div>
    <h1>Carregamento<br>da <span class="ac">cegonha</span></h1>

    <div class="hr"></div>

    <div>
      <div class="rot"><i class="mk"></i>Entrega dos UTVs</div>
      <div class="sub">Na sede do Desbravando, em uma das duas janelas.</div>
      <div class="opcoes">
        <div class="op">
          <div class="dia">${a.dia}</div>
          <div class="data">${a.data}</div>
          <div class="hora">${a.hora}</div>
        </div>
        <div class="ou"><div class="linha"></div><span>ou</span></div>
        <div class="op">
          <div class="dia">${b.dia}</div>
          <div class="data">${b.data}</div>
          <div class="hora">${b.hora}</div>
        </div>
      </div>
    </div>

    <div class="hr"></div>

    <div>
      <div class="rot"><i class="mk"></i>Transporte</div>
      <div class="transp">
        <div class="data">${edicao.transporte}</div>
        <div class="txt">Pela manhã acontece o carregamento da cegonha e a saída
          dos UTVs com destino a <b>Urubici / SC</b>.</div>
      </div>
      <div class="nota">A presença dos participantes não é necessária durante o carregamento.</div>
    </div>

    <div class="espaco"></div>
    <div class="rodape">Você só vive a experiência.<br>Do resto, a gente cuida.</div>
  </div>
</div>`;
}
