const DEFAULT_API_BASE_URL = "http://localhost:3001";

type QueryValue = boolean | number | string | null | undefined;
type QueryParams = Record<string, QueryValue>;

type ApiRequestOptions = {
  body?: unknown;
  method?: "DELETE" | "GET" | "PATCH" | "POST" | "PUT";
  query?: QueryParams;
};

export type ApiListResult<T> = {
  data: T[];
  total: number;
};

export async function apiRequest<T>(
  path: string,
  { body, method = "GET", query }: ApiRequestOptions = {},
): Promise<T> {
  const response = await fetch(buildApiUrl(path, query), {
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: "no-store",
    headers:
      body === undefined ? undefined : { "Content-Type": "application/json" },
    method,
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();

  if (!text) {
    return undefined as T;
  }

  return JSON.parse(text) as T;
}

export function normalizeApiList<T>(response: unknown): ApiListResult<T> {
  if (Array.isArray(response)) {
    return {
      data: response as T[],
      total: response.length,
    };
  }

  if (isRecord(response)) {
    const data = response.data ?? response.items ?? response.rows ?? [];
    const total = response.total ?? response.count;

    if (Array.isArray(data)) {
      return {
        data: data as T[],
        total: typeof total === "number" ? total : data.length,
      };
    }
  }

  return {
    data: [],
    total: 0,
  };
}

export function normalizeApiItem<T>(response: unknown): T {
  if (isRecord(response) && isRecord(response.data)) {
    return response.data as T;
  }

  return response as T;
}

function buildApiUrl(path: string, query?: QueryParams) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? DEFAULT_API_BASE_URL;
  const url = new URL(path, baseUrl);

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
