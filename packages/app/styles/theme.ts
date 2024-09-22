import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#2b90e9",
      main: "#2782db",
      dark: "#1d60b6",
      contrastText: "#dddddd",
    },
  },
});
