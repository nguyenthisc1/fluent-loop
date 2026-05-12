import { ExceptionBase } from "./exception.base";
import type { ExceptionCode } from "./exception.code";

export class AppException extends ExceptionBase {
  constructor(code: ExceptionCode, message: string, cause?: unknown) {
    super(code, message, cause);
    this.name = "AppException";
  }
}
