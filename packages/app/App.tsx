import type { FC } from "react";
import ChatRoom from "./components/ChatRoom";
import Entrance from "./components/Entrance";
import useLocalUserStore from "./stores/useLocalUserStore";

const App: FC = () => {
  const localUsername = useLocalUserStore((state) => state.localUsername);
  const isJoined = Boolean(localUsername);

  if (!isJoined) {
    return <Entrance />;
  }
  return <ChatRoom />;
};

export default App;
