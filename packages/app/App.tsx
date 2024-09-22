import type { FC } from "react";
import ChatRoom from "./components/ChatRoom";
import Entrance from "./components/Entrance";

const App: FC = () => {
  // TODO: implement logic for handling local user joining and additional features.
  const isJoined = true;

  if (!isJoined) {
    return <Entrance />;
  }
  return <ChatRoom />;
};

export default App;
