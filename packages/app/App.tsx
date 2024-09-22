import type { FC } from "react";
import { useState } from "react";
import ChatRoom from "./components/ChatRoom";
import Entrance from "./components/Entrance";
import { getStoredLocalUsername } from "./utils/window";

const App: FC = () => {
  const [localUsername, setLocalUsername] = useState(() =>
    getStoredLocalUsername(),
  );

  const isJoined = Boolean(localUsername);

  if (!isJoined) {
    return <Entrance setLocalUsername={setLocalUsername} />;
  }
  return <ChatRoom />;
};

export default App;
