import { createContext, useContext, type ReactNode } from "react";
import type { UserDependencies } from "../../user.container";

const UserDependenciesContext = createContext<UserDependencies | null>(null);

type UserDependenciesProviderProps = {
  dependencies: UserDependencies;
  children: ReactNode;
};

export function UserDependenciesProvider({ dependencies, children }: UserDependenciesProviderProps) {
  return <UserDependenciesContext.Provider value={dependencies}>{children}</UserDependenciesContext.Provider>;
}

export function useUserDependencies() {
  const dependencies = useContext(UserDependenciesContext);

  if (!dependencies) {
    throw new Error("useUserDependencies must be used within UserDependenciesProvider.");
  }

  return dependencies;
}
