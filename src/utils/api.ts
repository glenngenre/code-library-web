import {
  RateLimitError,
  type ApiResponse,
  type CursorResponse,
  type GlobalLanguagesData,
  type GlobalSnippetsData,
  type GlobalViewsData,
  type Snippet,
  type SnippetPayload,
} from "./types";

async function fetchJSON(path: string, options?: RequestInit): Promise<unknown> {
  const response = await fetch(path, options);
  if (response.status === 429) {
    const retryAfter = response.headers.get("Retry-After");
    throw new RateLimitError(retryAfter ? parseInt(retryAfter) : null);
  }
  return response.json();
}

async function request<T = unknown>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  return fetchJSON(path, options) as Promise<ApiResponse<T>>;
}

async function cursorRequest<T = unknown>(
  path: string,
  options?: RequestInit,
): Promise<CursorResponse<T>> {
  return fetchJSON(path, options) as Promise<CursorResponse<T>>;
}

export type GetSnippetsParams = {
  search?: string;
  language?: string;
  cursor?: string;
  direction?: "next" | "prev";
  page_size?: number;
};
export const snippetAPI = {
  getAll(params?: GetSnippetsParams): Promise<CursorResponse<Snippet[]>> {
    const query = new URLSearchParams();
    if (params?.search) query.set("search", params.search);
    if (params?.language) query.set("language", params.language);
    if (params?.cursor) query.set("cursor", params.cursor);
    if (params?.direction) query.set("direction", params.direction);
    if (params?.page_size) query.set("page_size", String(params.page_size));
    const qs = query.toString();
    return cursorRequest(`/api/snippets${qs ? `?${qs}` : ""}`);
  },
  getById(snippetId: string): Promise<ApiResponse<Snippet>> {
    return request(`/api/snippet/${snippetId}`);
  },

  create(snippet: SnippetPayload) {
    return request("/api/snippet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(snippet),
    });
  },

  update(snippetId: string, snippet: Partial<SnippetPayload>) {
    return request(`/api/snippet/${snippetId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(snippet),
    });
  },

  delete(snippetId: string) {
    return request(`/api/snippet/${snippetId}`, { method: "DELETE" });
  },

  incrementViews(snippetId: string) {
    return request(`/api/snippet/${snippetId}/view`, { method: "POST" });
  },
};

export const statsAPI = {
  getTotalViews(): Promise<ApiResponse<GlobalViewsData>> {
    return request("/api/stats/views");
  },

  getTotalSnippets(): Promise<ApiResponse<GlobalSnippetsData>> {
    return request("/api/stats/snippets");
  },

  getTotalLanguages(): Promise<ApiResponse<GlobalLanguagesData>> {
    return request("/api/stats/languages");
  },
};
