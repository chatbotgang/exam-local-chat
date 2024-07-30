import { IconButton, SxProps, Theme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../context/colorModeContext";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface Props {
  sx?: SxProps<Theme>;
}

export default function ThemeToggle({ sx }: Props) {
  const [mode, setMode] = useContext(ColorModeContext);

  return (
    <IconButton
      sx={sx}
      onClick={() =>
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
      }
      color="inherit"
    >
      {mode === "dark" ? <Brightness4Icon /> : <Brightness7Icon />}
    </IconButton>
  );
}
