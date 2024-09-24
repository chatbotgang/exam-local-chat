import { useEffect, useRef } from "react";
import type { Message } from "../types";

interface MessageListProps {
  messages: Message[];
}

const MessageList = ({ messages }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  //   const scrollToBottom = () => {
  //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //   };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  return (
    <div
      style={{ height: "400px", overflowY: "auto", backgroundColor: "#ddd" }}
    >
      {messages.map((message) => (
        <div
          key={message.id}
          style={{ marginBottom: "10px", whiteSpace: "pre-wrap" }}
        >
          <strong>{message.userName}: </strong>
          {message.content}
        </div>
      ))}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
