import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { queryClient } from "../shared/lib/query-client";
import type { ReactNode } from "react";

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
