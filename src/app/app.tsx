import { RouterProvider } from "react-router-dom";
import "../App.css";
import { router } from "./router";
import { AppProviders } from "./provider";

function App() {
  return (
    <>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </>
  );
}

export default App;
