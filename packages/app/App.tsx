import { useEffect, useState } from "react";
import Login from "./pages/login/login";
import Chatroom from "./pages/chatroom/chatroom";
import { useChatMessages } from "./hooks";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const { messages, addMessage } = useChatMessages();

  const handleOnLogin = (username: string) => {
    if (username.trim() === "") return;
    sessionStorage.setItem("username", username);
    setIsLoggedIn(true);
    setUsername(username);
  };

  useEffect(() => {
    document.body.style.backgroundColor = "black";
    document.body.style.fontSize = "24px";

    const loginStatus = sessionStorage.getItem("username");
    if (!loginStatus) return;

    setIsLoggedIn(true);
    setUsername(loginStatus);
  }, []);

  useEffect(() => {
    if (isLoggedIn && username) {
      addMessage({
        user: "SYSTEM",
        text: `${username} JOIN`,
        timestamp: Date.now().toString(),
        key: Date.now().toString() + 0,
      });
    }
  }, [isLoggedIn, username]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      addMessage({
        user: "SYSTEM",
        text: `${username} LEFT`,
        timestamp: Date.now().toString(),
        key: Date.now().toString() + 0,
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [username, messages]);

  return (
    <>
      {isLoggedIn ? (
        <Chatroom username={username} />
      ) : (
        <Login onLogin={handleOnLogin} />
      )}
    </>
  );
}

export default App;
