import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import ChatPage from "./src/pages/ChatPage";
import HomePage from "./src/pages/HomePage";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

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
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
