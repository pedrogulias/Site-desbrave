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

  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await resp.json();
  return data?.ok === true;
}
