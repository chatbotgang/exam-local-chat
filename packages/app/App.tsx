import ErrorBoundary from "@/components/ErrorBoundary";
import { router } from "@/routes";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
