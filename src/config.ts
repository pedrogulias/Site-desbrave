export type AppConfig = {
  appScriptUrl?: string;
};

let cachedConfig: AppConfig | null = null;
let configPromise: Promise<AppConfig> | null = null;

function ensureTrailingSlash(path: string) {
  return path.endsWith('/') ? path : `${path}/`;
}

function resolveConfigUrlCandidates() {
  const candidates = new Set<string>();
  const base = (import.meta.env.BASE_URL ?? '/').trim();

  const normalizedBase = base === '' ? '/' : base;

  if (typeof window !== 'undefined' && window.location) {
    const { origin, href } = window.location;

    try {
      const baseUrl = new URL(normalizedBase, origin);
      candidates.add(new URL('app-config.json', baseUrl).toString());
    } catch (error) {
      console.warn('Não foi possível construir URL absoluta para app-config.json a partir do BASE_URL', error);
    }

    try {
      candidates.add(new URL('app-config.json', href).toString());
    } catch (error) {
      console.warn('Não foi possível construir URL relativa para app-config.json a partir da página atual', error);
    }
  }

  if (normalizedBase.startsWith('http://') || normalizedBase.startsWith('https://')) {
    candidates.add(`${ensureTrailingSlash(normalizedBase)}app-config.json`);
  } else {
    const basePath = ensureTrailingSlash(normalizedBase);
    if (typeof window !== 'undefined' && window.location) {
      candidates.add(`${window.location.origin}${basePath}app-config.json`);
    }
    candidates.add(`${basePath}app-config.json`);
  }

  candidates.add('app-config.json');

  return Array.from(candidates);
}


async function loadConfig(): Promise<AppConfig> {
  if (cachedConfig) {
    return cachedConfig;
  }

  if (!configPromise) {
    const urlCandidates = resolveConfigUrlCandidates();

    configPromise = (async () => {
      for (const candidate of urlCandidates) {
        try {
          const response = await fetch(candidate, { cache: 'no-store' });

          if (!response.ok) {
            if (response.status === 404) {
              continue;
            }

            throw new Error(`Falha ao carregar app-config.json (${response.status}) de ${candidate}`);
          }

          try {
            const data = (await response.json()) as AppConfig;
            return data ?? {};
          } catch (error) {
            console.error('Não foi possível interpretar app-config.json', error);
            return {} as AppConfig;
          }
        } catch (error) {
          console.warn(`Erro ao buscar app-config.json em ${candidate}`, error);
        }
      }

      return {} as AppConfig;
    })()
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
