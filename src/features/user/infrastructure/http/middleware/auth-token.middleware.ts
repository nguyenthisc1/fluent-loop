import type { HttpMiddleware } from "../../../../../core/infrastructure/http/http-middleware";

export function createAuthTokenMiddleware(getAccessToken: () => string | null): HttpMiddleware {
  return async (context) => {
    const token = getAccessToken();

    if (!token) {
      return context;
    }

    return {
      ...context,
      init: {
        ...context.init,
        headers: {
          ...(context.init.headers as Record<string, string> | undefined),
          Authorization: `Bearer ${token}`,
        },
      },
    };
  };
}
