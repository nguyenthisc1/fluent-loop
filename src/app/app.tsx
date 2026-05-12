import { UserDependenciesProvider } from "@/features/user/presentation/providers/user-dependencies-provider";
import { UserProvider } from "@/features/user/presentation/providers/user-providers";
import { createUserDependencies } from "@/features/user/user.container";
import { RouterProvider } from "react-router-dom";
import "../App.css";
import { router } from "./router";

function App() {
  const userDependencies = createUserDependencies();
  return (
    <>
      <UserDependenciesProvider dependencies={userDependencies}>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </UserDependenciesProvider>
    </>
  );
}

export default App;
