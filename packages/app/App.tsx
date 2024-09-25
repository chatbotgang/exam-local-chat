import { Box, ThemeProvider } from "@mui/material";
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from "react";
import io from 'socket.io-client';
import ChatRoom from "./components/ChatRoom";
import DarkModeSwitch from "./components/DarkModeSwitch";
import UsernameBox from "./components/UsernameBox";
import { theme } from "./styles/theme";
import type { MessageType } from "./types";

const socket = io('http://localhost:5174');

function App() {
  const localMessages = JSON.parse(localStorage.getItem('messages') || '[]') as MessageType[];
  const [messages, setMessages] = useState<MessageType[]>(localMessages);
  const [isLogin, setIsLogin] = useState(!!sessionStorage.getItem('username'));
  const [username, setUsername] = useState(sessionStorage.getItem('username') || '');
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem('isDarkMode') === 'true');

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
    <ThemeProvider theme={theme(isDarkMode ? 'dark' : 'light')}>
      <CssBaseline />
      <Box width={1} height='100vh' bgcolor='primary.main'>
        <DarkModeSwitch isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        {isLogin
          ? <ChatRoom
            messages={messages}
            setMessages={message => {
              socket.emit('sendMessage', message);
            }}
            onExit={() => {
              setIsLogin(false);
              sessionStorage.removeItem('username');
              setUsername('');
              socket.emit('disconnection');
            }} />
          : <UsernameBox
            username={username}
            setUsername={username => setUsername(username)}
            setIsLogin={isLogin => setIsLogin(isLogin)} />}
      </Box>
    </ThemeProvider>
  );
}

export default App;
