export type HttpRequestContext = {
  url: string;
  init: RequestInit;
};

export type HttpMiddleware = (context: HttpRequestContext) => Promise<HttpRequestContext>;
