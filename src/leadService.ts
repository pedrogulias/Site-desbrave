export async function enviarLead(payload: {
  nomeCompleto: string;
  email: string;
  whatsapp: string;
  interessePrincipal: string;
  cidadeUF: string;
}) {
  const url = import.meta.env.VITE_APP_SCRIPT_URL;

  if (!url) {
    throw new Error('VITE_APP_SCRIPT_URL não configurada');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
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
}
