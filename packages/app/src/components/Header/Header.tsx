import useUserName from "../../hooks/useUserName";
import { AppBar, Toolbar } from "@mui/material";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

export default function Header() {
  const user = useUserName();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          Hi {user}
          <ThemeToggle sx={{ marginLeft: "auto" }} />
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
