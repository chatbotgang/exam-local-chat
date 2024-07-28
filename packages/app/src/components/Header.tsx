import useUserName from "../hooks/useUserName";
import { AppBar, Toolbar } from "@mui/material";

export default function Header() {
  const user = useUserName();

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>Hi {user}</Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}
