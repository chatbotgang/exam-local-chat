import ErrorBoundary from "@/components/ErrorBoundary";
import { router } from "@/routes";
import { theme } from "@/theme";
import { createTheme, ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider theme={createTheme(theme)}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
