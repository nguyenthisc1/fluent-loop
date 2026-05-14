import { ExceptionBase } from "@/core/exceptions/exception.base";

export const AUTH_INVALID_CREDENTIALS = "AUTH.INVALID_CREDENTIALS";
export const AUTH_USER_NOT_FOUND = "AUTH.USER_NOT_FOUND";
export const AUTH_SESSION_NOT_FOUND = "AUTH.SESSION_NOT_FOUND";
export const AUTH_ONBOARDING_REQUIRED = "AUTH.ONBOARDING_REQUIRED";

export class AuthInvalidCredentialsException extends ExceptionBase {
  readonly code = AUTH_INVALID_CREDENTIALS;

  constructor(cause?: Error, metadata?: Record<string, unknown>) {
    super("Invalid email or password.", cause, metadata);
  }
}

export class AuthUserNotFoundException extends ExceptionBase {
  readonly code = AUTH_USER_NOT_FOUND;

  constructor(message = "User not found.", cause?: Error, metadata?: Record<string, unknown>) {
    super(message, cause, metadata);
  }
}

export class AuthSessionNotFoundException extends ExceptionBase {
  readonly code = AUTH_SESSION_NOT_FOUND;

  constructor(message = "Session not found.", cause?: Error, metadata?: Record<string, unknown>) {
    super(message, cause, metadata);
  }
}

export class AuthOnboardingRequiredException extends ExceptionBase {
  readonly code = AUTH_ONBOARDING_REQUIRED;

  constructor(message = "Onboarding is required.", cause?: Error, metadata?: Record<string, unknown>) {
    super(message, cause, metadata);
  }
}
