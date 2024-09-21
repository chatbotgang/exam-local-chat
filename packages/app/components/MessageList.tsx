import { useEffect, useRef } from "react";
import MessageItem from "../components/MessageItem";
import SystemMessage from "../components/SystemMessage";
import type { Message, SystemText } from "../types";

interface MessageListProps {
  currentUser: string;
  messages: Message[];
}

const MessageList = ({ currentUser, messages }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  return (
    <div
      style={{
        height: "calc(100vh - 40px)",
        overflowY: "auto",
      }}
    >
      {messages.map((message: Message | SystemText) =>
        message.type === "message" ? (
          <MessageItem
            key={message.id}
            message={message}
            isCurrentUser={currentUser === message.userName}
          />
        ) : (
          <SystemMessage key={message.id} message={message} />
        ),
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
