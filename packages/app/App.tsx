import { useState } from "react";
import ChatRoom from "./src/pages/ChatRoom";
import Login from "./src/pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }
  return (
    <div>
      <ChatRoom />
    </div>
  );
}

export default App;
