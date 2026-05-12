import { NetworkException } from "../../../../../core/exceptions/exception";

export async function normalizeHttpError(response: Response): Promise<void> {
  if (response.ok) {
    return;
  }

  let metadata: Record<string, unknown> | undefined;

  try {
    metadata = await response.json();
  } catch {
    metadata = undefined;
  }

  throw new NetworkException(`HTTP request failed with status ${response.status}`, undefined, {
    status: response.status,
    ...metadata,
  });
}
