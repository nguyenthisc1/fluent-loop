import type { ExceptionCode } from "./exception.code";

export abstract class ExceptionBase extends Error {
  public readonly code: ExceptionCode;
  public readonly cause?: unknown;

  protected constructor(code: ExceptionCode, message: string, cause?: unknown) {
    super(message);
    this.code = code;
    this.cause = cause;
  }
}
