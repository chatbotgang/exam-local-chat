import { Box, Switch } from "@mui/material";
import { useEffect, useState } from "react";
import io from 'socket.io-client';
import ChatRoom from "./components/ChatRoom";
import UsernameBox from "./components/UsernameBox";
import type { MessageType } from "./types";

const socket = io('http://localhost:5174');

function App() {
  const localMessages = JSON.parse(localStorage.getItem('messages') || '[]') as MessageType[];
  const [messages, setMessages] = useState<MessageType[]>(localMessages);
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem('username'));
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  useEffect(() => {
    socket.on('userJoined', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on('userLeft', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on('receiveMessage', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socket.on('syncMessages', (messages) => {
      setMessages(messages);
    });

    return () => {
      socket.off('userJoined');
      socket.off('userLeft');
      socket.off('receiveMessage');
    };
  }, []);

  useEffect(() => {
    if (isLogin) {
      socket.emit('join', username);

      addEventListener('beforeunload', () => {
        socket.emit('disconnection');
      });
    }

    return () => {
      removeEventListener('beforeunload', () => { });
    }
  }, [isLogin]);

  useEffect(() => {
    if (messages.length) {
      localStorage.setItem('messages', JSON.stringify(messages));
    }
  }, [messages]);

  return (
    <Box width={1} height='100vh'>
      <Box width={1} height='48px' bgcolor='#191919'
        display='flex' justifyContent='right' alignItems='center'>
        <Switch />
      </Box>
      {isLogin
        ? <ChatRoom
          messages={messages}
          setMessages={message => {
            socket.emit('sendMessage', message);
          }} />
        : <UsernameBox
          username={username}
          setUsername={username => setUsername(username)}
          setIsLogin={isLogin => setIsLogin(isLogin)} />}
    </Box>
  );
}

export default App;
