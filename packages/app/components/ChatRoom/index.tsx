import { Box, Container, TextField, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import type { FC, KeyboardEvent } from "react";
import { useEffect, useState } from "react";
import { type ChatMessage, ChatMessageType } from "../../types/message";
import channel, { broadCastChatMessage } from "../../utils/broadcastChannel";
import { getStoredChatMessages, storeChatMessages } from "../../utils/window";
import Message from "./Message";

interface ChatRoomProps {
  localUsername: string;
}

const ChatRoom: FC<ChatRoomProps> = ({ localUsername }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() =>
    getStoredChatMessages(),
  );

  const handleSendMessage = (e: KeyboardEvent) => {
    if (e.key === "Enter" && inputMessage.trim() && !e.shiftKey) {
      e.preventDefault();
      const newMessage: ChatMessage = {
        id: nanoid(),
        timestamp: Date.now(),
        type: ChatMessageType.Text,
        username: localUsername,
        message: inputMessage,
      };
      setChatMessages((prev) => [...prev, newMessage]);
      setInputMessage("");
      broadCastChatMessage(newMessage);
    }
  };

  // To make sure will store latest messages and handle side effect(localStorage) so using useEffect
  // will be improve it's performance in following commits
  useEffect(() => {
    storeChatMessages(chatMessages);
  }, [chatMessages]);

  useEffect(() => {
    channel.onmessage = (event) =>
      setChatMessages((prev) => [...prev, event.data]);
  }, []);

  useEffect(() => {
    const handleLeave = () => {
      broadCastChatMessage({
        id: nanoid(),
        type: ChatMessageType.Left,
        timestamp: Date.now(),
        username: localUsername,
      });
    };

    window.addEventListener("beforeunload", handleLeave);
    return () => {
      window.removeEventListener("beforeunload", handleLeave);
    };
  }, [localUsername]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        gap: 2,
      }}
    >
      <Typography variant="h4" align="center">
        輸入訊息，隨性交流
      </Typography>
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: "8px",
          border: "1px solid",
          borderColor: "primary.contrastText",
          borderRadius: 2,
          whiteSpace: "pre",
        }}
      >
        {chatMessages.map((chatMessage) => (
          <Message
            key={chatMessage.id}
            localUsername={localUsername}
            chatMessage={chatMessage}
          />
        ))}
      </Box>
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          multiline
          placeholder="輸入訊息，按 Enter 發送"
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleSendMessage}
          fullWidth
        />
      </Box>
    </Container>
  );
};

export default ChatRoom;
