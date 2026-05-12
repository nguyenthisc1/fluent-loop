import { ExceptionBase } from "./exception.base";
import { ARGUMENT_INVALID, ARGUMENT_NOT_PROVIDED, ARGUMENT_OUT_OF_RANGE, CONFLICT, FORBIDDEN, INTERNAL_SERVER_ERROR, NETWORK_ERROR, NOT_FOUND, UNAUTHORIZED } from "./exception.code";

export class ArgumentNotProvidedException extends ExceptionBase {
  readonly code = ARGUMENT_NOT_PROVIDED;
}

export class ArgumentInvalidException extends ExceptionBase {
  readonly code = ARGUMENT_INVALID;
}

export class ArgumentOutOfRangeException extends ExceptionBase {
  readonly code = ARGUMENT_OUT_OF_RANGE;
}

export class ConflictException extends ExceptionBase {
  readonly code = CONFLICT;
}

export class NotFoundException extends ExceptionBase {
  readonly code = NOT_FOUND;

  constructor(message = "Not found", cause?: Error, metadata?: Record<string, unknown>) {
    super(message, cause, metadata);
  }
}

export class NetworkException extends ExceptionBase {
  readonly code = NETWORK_ERROR;
}

export class UnauthorizedException extends ExceptionBase {
  readonly code = UNAUTHORIZED;
}

export class ForbiddenException extends ExceptionBase {
  readonly code = FORBIDDEN;
}

export class InternalServerErrorException extends ExceptionBase {
  readonly code = INTERNAL_SERVER_ERROR;

  constructor(cause?: Error, metadata?: Record<string, unknown>) {
    super("Internal server error", cause, metadata);
  }
}
