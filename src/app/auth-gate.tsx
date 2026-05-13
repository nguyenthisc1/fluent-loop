import { GuestRoute } from "@/features/user/presentation/components/guest-route";
import { OnboardingRoute } from "@/features/user/presentation/components/onboarding-route";
import { ProtectedRoute } from "@/features/user/presentation/components/protected-route";
import { useUser } from "@/features/user/presentation/hooks/use-user";
import type { ReactNode } from "react";

type AuthGateType = "guest" | "onboarding" | "protected";

type AuthGateProps = {
  type: AuthGateType;
  children: ReactNode;
};

export function AuthGate({ type, children }: AuthGateProps) {
  const { status } = useUser();

  if (type === "guest") {
    return <GuestRoute status={status}>{children}</GuestRoute>;
  }

  if (type === "onboarding") {
    return <OnboardingRoute status={status}>{children}</OnboardingRoute>;
  }

  return <ProtectedRoute status={status}>{children}</ProtectedRoute>;
}
