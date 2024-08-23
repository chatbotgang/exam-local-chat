import { useEffect, useState } from "react";
import Chatroom from "./components/Chatroom";
import LoginBox from "./components/LoginBox";
import InputBox from "./components/InputBox";

function App() {
  const [username, setUsername] = useState(sessionStorage.getItem("username"));

  useEffect(() => {
    if (username) {
      sessionStorage.setItem("username", username);
    }
  }, [username]);

  return (
    <div className="container mx-auto flex h-screen max-w-2xl flex-col">
      <Chatroom username={username}></Chatroom>

      {username ? (
        <InputBox username={username} setUsername={setUsername}></InputBox>
      ) : (
        <LoginBox setUsername={setUsername}></LoginBox>
      )}
    </div>
  );
}

export default App;
