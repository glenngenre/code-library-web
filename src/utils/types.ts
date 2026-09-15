export type Snippet = {
  snippet_id: string;
  title: string;
  description?: string;
  category?: string;
  code: string;
  language: string;
  filename: string;
  views: number;
};

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
  meta?: null;
};

export type CursorMeta = {
  page_size: number;
  next_cursor: string | null;
  prev_cursor: string | null;
  has_more: boolean;
};

export type CursorResponse<T> = {
  success: boolean;
  data: T;
  meta: CursorMeta;
};

export type SnippetPayload = {
  title: string;
  code: string;
  language: string;
  filename: string;
  description?: string;
  category?: string;
  is_public?: boolean;
};

export class RateLimitError extends Error {
  retryAfter: number | null;
  constructor(retryAfter: number | null) {
    super("Rate limit exceeded");
    this.name = "RateLimitError";
    this.retryAfter = retryAfter;
  }
}

export type GlobalViewsData = { total_views: number };
export type GlobalSnippetsData = { total_snippets: number };
export type GlobalLanguagesData = { unique_languages: string[]; total_languages: number };
