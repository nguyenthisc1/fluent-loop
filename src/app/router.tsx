import { createBrowserRouter, Navigate } from "react-router-dom";
import { GuestRoute } from "../features/user/presentation/components/guest-route";
import { OnboardingRoute } from "../features/user/presentation/components/onboarding-route";
import { ProtectedRoute } from "../features/user/presentation/components/protected-route";
import { useUser } from "../features/user/presentation/hooks/use-user";
import SignInPage from "../features/user/presentation/pages/sign-in.page";

function AuthGate({ type, children }: { type: "guest" | "onboarding" | "protected"; children: React.ReactNode }) {
  const { status } = useUser();

  if (type === "guest") {
    return <GuestRoute status={status}>{children}</GuestRoute>;
  }

  if (type === "onboarding") {
    return <OnboardingRoute status={status}>{children}</OnboardingRoute>;
  }

  return <ProtectedRoute status={status}>{children}</ProtectedRoute>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/sign-in",
    element: (
      <AuthGate type="guest">
        <SignInPage />
      </AuthGate>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <AuthGate type="guest">
        <SignInPage />
      </AuthGate>
    ),
  },
  {
    path: "/onboarding",
    element: (
      <AuthGate type="onboarding">
        <SignInPage />
      </AuthGate>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <AuthGate type="protected">
        <SignInPage />
      </AuthGate>
    ),
  },
]);
