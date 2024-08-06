import useStorage from "@/hooks/useStorage";
import TextField from "@mui/material/TextField";
import { type KeyboardEventHandler, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [sessionData, setSessionData] = useStorage("username", "", "session");
  const navigate = useNavigate();
  const ref = useRef(null);

  if (sessionData) {
    navigate("/chat");
  }

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      setSessionData(e.currentTarget.value);
      navigate("/chat");
    }
  };

  return <TextField ref={ref} onKeyDown={handleKeyDown} />;
}
