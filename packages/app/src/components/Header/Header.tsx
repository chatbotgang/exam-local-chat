import useUserName from "../../hooks/useUserName";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useContext } from "react";
import { ColorModeContext } from "../../context/colorModeContext";

export default function Header() {
  const user = useUserName();
  const [mode, setMode] = useContext(ColorModeContext);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          Hi {user}
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={() =>
              setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
            }
            color="inherit"
          >
            {mode === "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
