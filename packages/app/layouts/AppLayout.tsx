import { errorAtom } from "@/atoms/common";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const error = useAtomValue(errorAtom);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (error?.message) {
      setOpen(true);
    }
  }, [error?.message]);

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => setOpen(false)}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <div className="flex h-screen flex-col max-w-[1200px] mx-auto">
      <main className="flex flex-1 flex-col h-full">
        <Outlet />
      </main>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={`${error?.name} ${error?.message}`}
        action={action}
      />
    </div>
  );
}
