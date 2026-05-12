import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { AuthStatus } from "../../domain/entities/user.types";

type GuestRouteProps = {
  status: AuthStatus;
  children: ReactNode;
};

export function GuestRoute({ status, children }: GuestRouteProps) {
  if (status === "idle" || status === "loading") {
    return null;
  }

  if (status === "needs_onboarding") {
    return <Navigate to="/onboarding" replace />;
  }

  if (status === "authenticated") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
