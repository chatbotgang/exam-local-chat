import { nanoid } from "nanoid";
import type { FC, KeyboardEvent } from "react";
import { useEffect, useState } from "react";
import { type ChatMessage, ChatMessageType } from "../../types/message";
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
      const newMessage: ChatMessage = {
        id: nanoid(),
        timestamp: Date.now(),
        type: ChatMessageType.Text,
        username: localUsername,
        message: inputMessage,
      };
      setChatMessages((prev) => [...prev, newMessage]);
      setInputMessage("");
    }
  };

  // To make sure will store latest messages and handle side effect(localStorage) so using useEffect
  // will be improve it's performance in following commits
  useEffect(() => {
    storeChatMessages(chatMessages);
  }, [chatMessages]);

  return (
    <div>
      <h2>聊天室</h2>
      <div style={{ whiteSpace: "pre" }}>
        {chatMessages.map((chatMessage) => (
          <Message key={chatMessage.id} chatMessage={chatMessage} />
        ))}
      </div>
      <textarea
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyDown={handleSendMessage}
        placeholder="輸入訊息，按 Enter 發送"
      />
    </div>
  );
};

export default ChatRoom;
