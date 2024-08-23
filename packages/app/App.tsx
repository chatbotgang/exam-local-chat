import { useEffect, useState } from "react";

import Chatroom from "./components/Chatroom";
import InputBox from "./components/InputBox";
import LoginBox from "./components/LoginBox";

function App() {
  const [username, setUsername] = useState(sessionStorage.getItem("username"));

  useEffect(() => {
    if (username) {
      sessionStorage.setItem("username", username);
    }
  }, [username]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
      <div className="container mx-auto flex h-screen max-w-2xl flex-col bg-white/50 shadow-lg">
        {username ? (
          <>
            <Chatroom username={username} />
            <InputBox username={username} setUsername={setUsername} />
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <LoginBox setUsername={setUsername} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
