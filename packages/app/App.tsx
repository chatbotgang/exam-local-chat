import { Box, Switch } from "@mui/material";
import { useState } from "react";
import ChatRoom from "./components/ChatRoom";
import UsernameBox from "./components/UsernameBox";
import type { MessageType } from "./types";

function App() {
  const localMessages = JSON.parse(localStorage.getItem('messages') || '[]') as MessageType[];
  const [messages, setMessages] = useState<MessageType[]>(localMessages);
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('username'));
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  return (
    <Box width={1} height='100vh'>
      <Box width={1} height='48px' bgcolor='#191919'
        display='flex' justifyContent='right' alignItems='center'>
        <Switch />
      </Box>
      {isLogin
        ? <ChatRoom
          messages={messages}
          setMessages={message => setMessages(prev => [...prev, message])} />
        : <UsernameBox
          username={username}
          setUsername={username => setUsername(username)}
          setIsLogin={isLogin => setIsLogin(isLogin)} />}
    </Box>
  );
}

export default App;
