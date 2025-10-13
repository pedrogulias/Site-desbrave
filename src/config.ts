export type AppConfig = {
  appScriptUrl?: string;
};

let cachedConfig: AppConfig | null = null;
let configPromise: Promise<AppConfig> | null = null;

async function loadConfig(): Promise<AppConfig> {
  if (cachedConfig) {
    return cachedConfig;
  }

  if (!configPromise) {
    configPromise = fetch('/app-config.json')
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
