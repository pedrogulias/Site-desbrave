export type AppConfig = {
  appScriptUrl?: string;
};

let cachedConfig: AppConfig | null = null;
let configPromise: Promise<AppConfig> | null = null;

function resolveConfigUrl() {
  const base = import.meta.env.BASE_URL ?? '/';

  if (typeof window !== 'undefined' && window.location) {
    try {
      const baseUrl = new URL(base, window.location.origin);
      return new URL('app-config.json', baseUrl).toString();
    } catch (error) {
      console.warn('Não foi possível construir URL absoluta para app-config.json', error);
    }
  }

  const normalizedBase = base && base !== '' ? base : '/';
  if (normalizedBase.endsWith('/')) {
    return `${normalizedBase}app-config.json`;
  }

  return `${normalizedBase}/app-config.json`;
}


async function loadConfig(): Promise<AppConfig> {
  if (cachedConfig) {
    return cachedConfig;
  }

  if (!configPromise) {
   const configUrl = resolveConfigUrl();

    configPromise = fetch(configUrl)
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 404) {
            return {} as AppConfig;
          }

          throw new Error(`Falha ao carregar app-config.json (${response.status})`);
        }

        try {
          const data = (await response.json()) as AppConfig;
          return data ?? {};
        } catch (error) {
          console.error('Não foi possível interpretar app-config.json', error);
          return {} as AppConfig;
        }
      })
      .catch((error) => {
        console.warn('Erro ao buscar app-config.json', error);
        return {} as AppConfig;
      })
      .finally(() => {
        configPromise = null;
      });
  }

  const config = await configPromise;
  cachedConfig = config;
  return config;
}

export async function getAppScriptUrl(): Promise<string | undefined> {
  const envUrl = import.meta.env.VITE_APP_SCRIPT_URL?.trim();

  if (envUrl) {
    return envUrl;
  }

  const config = await loadConfig();
  return config.appScriptUrl?.trim();
}
