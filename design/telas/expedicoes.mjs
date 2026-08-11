// 02 · GRUPO AVULSO — v2, conforme "Vaga avulsa.pdf".
// É a ponte entre a Home e a Página da Expedição: apresenta os destinos e manda o
// visitante para a página completa, onde acontece toda a parte comercial.
// Mudanças do documento: foto de cada destino maior, valor FORA daqui, FAQ subiu para
// logo abaixo da agenda, chamada final nova, e menos elemento visual com mais respiro.
//
// O antigo "Expedições (hub)" saiu da v2: os dois cards da Home passaram a apontar
// direto para as páginas de modelo (Grupo Avulso e Grupo Fechado).
import { col, row, texto, frame, vao, mola } from '../lib/pen.mjs';
import { COR, T, LARGURA, MARGEM } from '../lib/tokens.mjs';
import {
  nav, botao, abertura, cabecalho, secao, overline, fio, fioForte, tituloLista,
  recuoH, linhaIndice, chamadaInteresse, faq, rodape, imagem, contorno,
} from '../lib/componentes.mjs';
import { EXPEDICOES, PERGUNTAS, fotoExpedicao } from '../lib/dados.mjs';

export function grupoAvulso(x, y) {
  return col({ name: '02 · Grupo Avulso', x, y, width: LARGURA.desktop, fill: COR.papel, clip: true }, [
    nav({ ativo: 'Expedições' }),

    /* hero — layout aprovado, sem filtros (ele apagou os três) */
    secao({ nome: 'abertura', padY: 84, gap: 26 }, [
      row({ gap: 10, alignItems: 'center' }, [
        texto('Expedições', { ...T.corpoP, fill: COR.cinza }),
        texto('/', { ...T.corpoP, fill: COR.cinzaFraco }),
        texto('Grupo Avulso', { ...T.corpoP, fill: COR.tinta }),
      ]),
      abertura({
        over: 'Grupo Avulso',
        titulo: 'PRÓXIMAS EXPEDIÇÕES',
        texto:
          'Escolha seu próximo destino, conheça todos os detalhes da expedição e reserve sua vaga em um grupo já formado.',
      }),
    ]),

    /* transição — ele reclamou que a primeira foto da agenda parecia fazer parte do
       hero. Uma faixa preta fina, com o rótulo da agenda e a contagem, encerra a
       apresentação e abre a lista. É o mesmo preto de pontuação do resto do site. */
    recuoH(MARGEM.desktop, { name: 'transição · começa a agenda', height: 68, fill: COR.preto, gap: 16 }, [
      overline('Agenda 2026', T, COR.s82),
      mola(),
      texto(`${EXPEDICOES.length} expedições`, { ...T.mono, fill: COR.s55 }),
    ]),

    /* agenda — foto grande e nenhum valor: quem decide preço é a página da expedição */
    col({ name: 'agenda', width: 'fill_container', fill: COR.papel, alignItems: 'center' }, [
      vao(64),
      row({ width: 'fill_container' }, [
        frame({ width: MARGEM.desktop, height: 1 }),
        col({ width: 'fill_container', gap: 0 }, [
          fioForte(),
          // o nível da expedição (leve/média/difícil) SAIU: no lugar entrou o FORMATO,
          // que é o que decide se a pessoa clica — "reduzindo acessos desnecessários".
          ...EXPEDICOES.map((e, i) =>
            linhaIndice({
              n: i + 1,
              titulo: e.destino,
              colunas: [[e.uf, e.formato], [e.datasCurtas, e.status.rotulo]],
              foto: fotoExpedicao(e.fotoIdx, 500),
              fotoW: 208,
              fotoH: 138,
            }),
          ),
        ]),
        frame({ width: MARGEM.desktop, height: 1 }),
      ]),
      vao(96),
    ]),

    /* faq — subiu para logo abaixo da agenda */
    secao({ fundo: COR.branco, nome: 'faq', padY: 84, gap: 26 }, [
      cabecalho('Dúvidas', 'PERGUNTAS FREQUENTES'),
      col({ width: 'fill_container', gap: 0 }, [
        fioForte(),
        faq(PERGUNTAS[0][0], true, PERGUNTAS[0][1]),
        ...PERGUNTAS.slice(1, 6).map(([p]) => faq(p)),
      ]),
    ]),

    /* chamada final — mesmo conteúdo aprovado, composição nova (era faixa preta) */
    chamadaInteresse({
      over: 'Novas expedições',
      titulo: 'AINDA NÃO ENCONTROU\nSUA PRÓXIMA EXPERIÊNCIA?',
      texto:
        'Nossa agenda é atualizada constantemente. Cadastre seu interesse e seja avisado quando uma nova expedição estiver disponível para o seu perfil.',
      placeholder: 'seu e-mail',
      acao: 'Avise-me',
    }),

    rodape(),
  ]);
}
