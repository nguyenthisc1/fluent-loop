import { UserDependenciesProvider } from "@/features/user/presentation/providers/user-dependencies-provider";
import { UserProvider } from "@/features/user/presentation/providers/user-providers";
import { createUserDependencies } from "@/features/user/user.container";
import { QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { queryClient } from "../shared/lib/query-client";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const userDependencies = createUserDependencies();

  return (
    <QueryClientProvider client={queryClient}>
      <UserDependenciesProvider dependencies={userDependencies}>
        <UserProvider>
          {children}
          <Toaster richColors position="top-right" />
        </UserProvider>
      </UserDependenciesProvider>
    </QueryClientProvider>
  );
}
