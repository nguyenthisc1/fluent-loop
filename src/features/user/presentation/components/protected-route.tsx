import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { AuthStatus } from "../../domain/entities/user.types";

type ProtectedRouteProps = {
  status: AuthStatus;
  children: ReactNode;
};

export function ProtectedRoute({ status, children }: ProtectedRouteProps) {
  if (status === "idle" || status === "loading") {
    return null;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/sign-in" replace={true} />;
  }

  if (status === "needs_onboarding") {
    return <Navigate to="/onboarding" replace={true} />;
  }

  return <>{children}</>;
}
