// Onde ficam as artes e os arquivos do cliente (logo, fotos, PDFs recebidos).
//
// Eles NÃO ficam no git: são material do cliente. Ficam numa pasta de fora do repo,
// apontada pela variável de ambiente DESBRAVANDO_ARTES. Sem a variável, vale a pasta
// de arquivo da máquina do Pedro.
//
// Estrutura esperada dentro dela (a mesma que existia no repo):
//   marca/logo-montanha.b64            logo da montanha em base64 (usado nas telas)
//   marca/logo-montanha.png            origem do favicon (marca/gerar-favicon.py)
//   marca/logo-desbravando-original.png  logo completo (vetorização e peças sociais)
//   recebidos/                         documentos e artes recebidos do cliente
import fs from 'node:fs';
import path from 'node:path';

export const ARTES = process.env.DESBRAVANDO_ARTES
  || 'C:/Users/olive/Arquivo-projetos/desbravando-recebidos/do-repo';

/** Caminho de um arquivo dentro da pasta de artes. Falha com mensagem clara se não existir. */
export function arte(...partes) {
  const caminho = path.join(ARTES, ...partes);
  if (!fs.existsSync(caminho)) {
    throw new Error(`arte do cliente não encontrada: ${caminho}\n`
      + 'As artes ficam fora do git. Aponte DESBRAVANDO_ARTES para a pasta que tem marca/ e recebidos/.');
  }
  return caminho;
}
