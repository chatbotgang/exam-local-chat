import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ErrorBoundary } from "./components/Error/ErrorBoundary";

const root = document.getElementById("root");

if (!root) {
  throw new Error("No root element");
}

createRoot(root).render(
  <StrictMode>
    <ErrorBoundary errorComponent={<>Some error happened</>}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
