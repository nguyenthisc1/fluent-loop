import type { HttpClient, HttpRequestConfig } from "../../../../../core/infrastructure/http/http-client";
import type { HttpMiddleware, HttpRequestContext } from "../../../../../core/infrastructure/http/http-middleware";
import { normalizeHttpError } from "../middleware/error-normalizer.middleware";

export class FetchHttpClient implements HttpClient {
  constructor(baseUrl: string, middlewares: HttpMiddleware[] = []) {
    this.baseUrl = baseUrl;
    this.middlewares = middlewares;
  }

  private readonly baseUrl: string;
  private readonly middlewares: HttpMiddleware[] = [];

  get<TResponse>(url: string, config?: HttpRequestConfig): Promise<TResponse> {
    return this.request<TResponse>(url, {
      method: "GET",
      ...config,
    });
  }

  post<TResponse, TBody = unknown>(url: string, body?: TBody, config?: HttpRequestConfig): Promise<TResponse> {
    return this.request<TResponse>(url, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      ...config,
    });
  }

  patch<TResponse, TBody = unknown>(url: string, body?: TBody, config?: HttpRequestConfig): Promise<TResponse> {
    return this.request<TResponse>(url, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
      ...config,
    });
  }

  delete<TResponse>(url: string, config?: HttpRequestConfig): Promise<TResponse> {
    return this.request<TResponse>(url, {
      method: "DELETE",
      ...config,
    });
  }

  private async request<TResponse>(url: string, init: RequestInit): Promise<TResponse> {
    let context: HttpRequestContext = {
      url: `${this.baseUrl}${url}`,
      init: {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...(init.headers as Record<string, string> | undefined),
        },
      },
    };

    for (const middleware of this.middlewares) {
      context = await middleware(context);
    }

    const response = await fetch(context.url, context.init);

    await normalizeHttpError(response);

    return response.json() as Promise<TResponse>;
  }
}
