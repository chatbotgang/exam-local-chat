import { useEffect, useRef, useState } from "react";

import { message } from "../../types";
import { generateRandomColor } from "../../utils";

function Chatroom({ username }: { username: string | null }) {
  const [messages, setMessages] = useState<message[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(true);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  const handleMessagesUpdate = (updatedMessages: message[]) => {
    setMessages(updatedMessages);

    if (isScrolledToBottom) {
      scrollToBottom();
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1] as message;
      const lastMessageIsCurrentUser = lastMessage.username === username;

      if (lastMessageIsCurrentUser || isScrolledToBottom) {
        scrollToBottom();
      }
    }
  }, [messages, username, isScrolledToBottom]);

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

      setIsScrolledToBottom(isAtBottom);
    }
  };

  useEffect(() => {
    const storedMessages = JSON.parse(
      localStorage.getItem("messages") || "[]",
    ) as message[];

    handleMessagesUpdate(storedMessages);

    const handleStorageChange = () => {
      const updatedMessages = JSON.parse(
        localStorage.getItem("messages") || "[]",
      ) as message[];

      handleMessagesUpdate(updatedMessages);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div
      ref={chatContainerRef}
      onScroll={handleScroll}
      className="grow overflow-y-auto"
    >
      <div className="flex flex-col space-y-4 p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex flex-col ${
              message.username === username ? "items-end" : "items-start"
            }`}
          >
            <span className="mb-1 text-xs text-gray-500">
              {message.username}
            </span>
            <div
              className={`max-w-xs rounded-lg p-3`}
              style={{ backgroundColor: generateRandomColor(message.username) }}
            >
              <p className="whitespace-pre-wrap break-words">{message.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Chatroom;
