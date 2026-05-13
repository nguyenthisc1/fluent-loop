import type { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import RouteLoading from "./route-loading";
import { useAuth } from "./use-auth";

type AuthGateAccess = "guest" | "onboarding" | "protected";

type AuthGateProps = {
  access: AuthGateAccess;
  children?: ReactNode;
};

export default function AuthGate({ access, children }: AuthGateProps) {
  const location = useLocation();
  const auth = useAuth();

  if (auth.isChecking) {
    return <RouteLoading />;
  }

  if (access === "guest") {
    if (auth.needsOnboarding) {
      return <Navigate to="/onboarding" replace />;
    }

    if (auth.isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }

    return children ? <>{children}</> : <Outlet />;
  }

  if (access === "onboarding") {
    if (auth.isUnauthenticated) {
      return <Navigate to="/sign-in" replace state={{ from: location }} />;
    }

    if (auth.isAuthenticated) {
      return <Navigate to="/dashboard" replace />;
    }

    return children ? <>{children}</> : <Outlet />;
  }

  if (auth.isUnauthenticated) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  if (auth.needsOnboarding) {
    return <Navigate to="/onboarding" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
}
