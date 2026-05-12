import type { HttpClient } from "../../../../../../core/infrastructure/http/http-client";
import type { CompleteOnboardingRequest, SignInRequest, SignUpRequest, UpdateUserRequest } from "./auth.api.types";
import type { AuthSessionModel, AuthUserModel } from "./auth.models";

export class AuthApi {
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  private readonly httpClient: HttpClient;

  signIn(input: SignInRequest): Promise<AuthSessionModel> {
    return this.httpClient.post<AuthSessionModel, SignInRequest>("/v1/auth/sign-in", input);
  }

  signUp(input: SignUpRequest): Promise<AuthSessionModel> {
    return this.httpClient.post<AuthSessionModel, SignUpRequest>("/v1/auth/sign-up", input);
  }

  signOut(): Promise<void> {
    return this.httpClient.post<void>("/v1/auth/sign-out");
  }

  me(): Promise<AuthUserModel | null> {
    return this.httpClient.get<AuthUserModel | null>("/v1/auth/me");
  }

  getCurrentSession(): Promise<AuthSessionModel | null> {
    return this.httpClient.get<AuthSessionModel | null>("/v1/auth/session");
  }

  completeOnboarding(input: CompleteOnboardingRequest): Promise<AuthUserModel> {
    return this.httpClient.post<AuthUserModel, CompleteOnboardingRequest>("/v1/auth/onboarding", input);
  }

  updateUser(input: UpdateUserRequest): Promise<AuthUserModel> {
    return this.httpClient.patch<AuthUserModel, UpdateUserRequest>("/v1/auth/me", input);
  }
}
