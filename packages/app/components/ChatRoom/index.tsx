import { Box, TextField } from "@mui/material";
import { nanoid } from "nanoid";
import type { FC, KeyboardEvent } from "react";
import { useEffect, useState } from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { type ChatMessage, ChatMessageType } from "../../types/message";
import channel, { broadCastChatMessage } from "../../utils/broadcastChannel";
import { getStoredChatMessages, storeChatMessages } from "../../utils/window";
import Layout from "../Layout";
import Message from "./Message";

interface ChatRoomProps {
  localUsername: string;
}

const ChatRoom: FC<ChatRoomProps> = ({ localUsername }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() =>
    getStoredChatMessages(),
  );

  const [shouldAutoScrollToBottom, setShouldAutoScrollToBottom] =
    useState(true);
  const { rootRef: chatBoxRef, targetRef: messagesEndRef } =
    useIntersectionObserver<HTMLDivElement>({
      onIntersect: (isIntersecting) =>
        setShouldAutoScrollToBottom(isIntersecting),
    });

  useEffect(() => {
    if (shouldAutoScrollToBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, shouldAutoScrollToBottom, messagesEndRef]);

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
      setShouldAutoScrollToBottom(true);
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
    <Layout title="輸入訊息，隨性交流">
      <Box
        ref={chatBoxRef}
        sx={{
          width: "100%",
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
        <div ref={messagesEndRef} />
      </Box>
      <Box
        component="form"
        sx={{
          width: "100%",
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
    </Layout>
  );
};

export default ChatRoom;
