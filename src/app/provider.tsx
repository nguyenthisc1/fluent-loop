import { AuthProvider } from "@/features/user/presentation/auth/auth-provider";
import { UserDependenciesProvider } from "@/features/user/presentation/providers/user-dependencies-provider";
import { createUserDependencies } from "@/features/user/user.container";
import { QueryClientProvider } from "@tanstack/react-query";
import { useMemo, type ReactNode } from "react";
import { Toaster } from "sonner";
import { queryClient } from "../shared/lib/query-client";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const userDependencies = useMemo(() => createUserDependencies(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserDependenciesProvider dependencies={userDependencies}>
        <AuthProvider>
          {children}
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </UserDependenciesProvider>
    </QueryClientProvider>
  );
}
