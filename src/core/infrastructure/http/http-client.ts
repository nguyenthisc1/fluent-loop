export type HttpRequestConfig = {
  headers?: Record<string, string>;
  signal?: AbortSignal;
};

export interface HttpClient {
  get<TResponse>(url: string, config?: HttpRequestConfig): Promise<TResponse>;

  post<TResponse, TBody = unknown>(url: string, body?: TBody, config?: HttpRequestConfig): Promise<TResponse>;

  patch<TResponse, TBody = unknown>(url: string, body?: TBody, config?: HttpRequestConfig): Promise<TResponse>;

  delete<TResponse>(url: string, config?: HttpRequestConfig): Promise<TResponse>;
}
