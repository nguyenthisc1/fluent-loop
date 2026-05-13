import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { AuthStatus } from "../../domain/entities/user.types";

type OnboardingRouteProps = {
  status: AuthStatus;
  children: ReactNode;
};

export function OnboardingRoute({ status, children }: OnboardingRouteProps) {
  if (status === "idle" || status === "loading") return null;
  if (status === "unauthenticated") return <Navigate to="/sign-in" replace />;
  if (status === "authenticated") return <Navigate to="/dashboard" replace />;

  return children;
}
