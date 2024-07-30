import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import ChatPage from "./src/pages/ChatPage";
import HomePage from "./src/pages/HomePage";
import { ColorModeContext } from "./src/context/colorModeContext";
import { useMemo, useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:userName",
    element: <ChatPage />,
  },
]);

function App() {
  const modeState = useState<"light" | "dark">("light");
  const [mode] = modeState;

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={modeState}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
