import { useEffect, useRef } from "react";
import type { Message } from "../types";
import MessageItem from "./MessageItem";

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
      {messages.map((message: Message) => (
        <MessageItem
          key={message.id}
          message={message}
          isCurrentUser={currentUser === message.userName}
        />
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
