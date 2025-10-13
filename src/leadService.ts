import { getAppScriptUrl } from './config';

export async function enviarLead(payload: {
  nomeCompleto: string;
  email: string;
  whatsapp: string;
  interessePrincipal: string;
  cidadeUF: string;
}) {
  const url = await getAppScriptUrl();

  if (!url) {
    throw new Error(
      'Nenhuma URL do Google Apps Script configurada. Define VITE_APP_SCRIPT_URL no .env ou app-config.json.'
    );
  }

  const requestBody = JSON.stringify(payload);

  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: requestBody,
    });

    const text = await response.text();
    let data: any = null;

    try {
      data = text ? JSON.parse(text) : null;
    } catch (error) {
      console.warn('Resposta não JSON ao enviar lead', error);
    }

    if (!response.ok) {
      throw new Error(data?.message || 'Falha ao enviar lead');
    }

    if (data && (data.ok === false || data.success === false)) {
      throw new Error(data?.message || 'O serviço de leads retornou erro');
    }


    return true;
  } catch (error) {
    if (error instanceof TypeError) {
      console.warn(
        'Falha ao enviar lead via requisição CORS. Tentando fallback no-cors, que exige o Apps Script publicado para "Qualquer pessoa".',
        error
      );

      const fallbackResponse = await fetch(url, {
        method: 'POST',
        mode: 'no-cors',
        body: requestBody,
      });

      if (fallbackResponse.type === 'opaque') {
        return true;
      }

      throw new Error(
        'Não foi possível enviar os teus dados agora. Confere se o Apps Script está publicado para "Qualquer pessoa" e tenta novamente.'
      );
    }

    throw error instanceof Error ? error : new Error('Não foi possível enviar os teus dados agora. Tenta novamente em instantes.');
  }
}
