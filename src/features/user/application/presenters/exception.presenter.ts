import { ExceptionBase } from "@/core/exceptions/exception.base";

export type UserErrorViewModel = {
  title: string;
  message: string;
  code?: string;
};

export class UserExceptionPresenter {
  present(error: unknown): UserErrorViewModel {
    if (error instanceof ExceptionBase) {
      switch (error.code) {
        case "AUTH.INVALID_CREDENTIALS":
          return {
            title: "Unable to sign in",
            message: "The email or password is incorrect.",
            code: error.code,
          };

        case "AUTH.USER_NOT_FOUND":
          return {
            title: "Account not found",
            message: "We could not find your account. Please sign in again.",
            code: error.code,
          };

        case "AUTH.SESSION_NOT_FOUND":
          return {
            title: "Session expired",
            message: "Please sign in again to continue.",
            code: error.code,
          };

        case "AUTH.ONBOARDING_REQUIRED":
          return {
            title: "Profile setup required",
            message: "Please complete your learning profile before continuing.",
            code: error.code,
          };

        case "GENERIC.NETWORK_ERROR":
          return {
            title: "Connection problem",
            message: "Please check your internet connection and try again.",
            code: error.code,
          };

        default:
          return {
            title: "Something went wrong",
            message: "Please try again in a moment.",
            code: error.code,
          };
      }
    }

    return {
      title: "Something went wrong",
      message: "Please try again in a moment.",
    };
  }
}
