export interface NormalizedException {
  message: string;
  code: string;
  correlationId: string;
  stack?: string;
  cause?: string;
  metadata?: Record<string, unknown>;
}

export abstract class ExceptionBase extends Error {
  abstract readonly code: string;

  readonly correlationId: string;
  readonly metadata?: Record<string, unknown>;

  constructor(message: string, cause?: Error, metadata?: Record<string, unknown>) {
    super(message, { cause });

    this.name = this.constructor.name;
    this.metadata = metadata;
    this.correlationId = "1";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (Error as any).captureStackTrace?.(this, this.constructor);
  }

  toJSON(): NormalizedException {
    return {
      message: this.message,
      code: this.code,
      stack: this.stack,
      correlationId: this.correlationId,
      cause: this.cause instanceof Error ? this.cause.message : undefined,
      metadata: this.metadata,
    };
  }
}
