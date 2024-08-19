import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { useChatMessages, useScrollToBottom } from "../../hooks";

type ChatroomProps = {
  username: string;
};

const Chatroom: FC<ChatroomProps> = ({ username }) => {
  const [inputValue, setInputValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const { messages, addMessage } = useChatMessages();
  const { bottomRef, scrollToBottom, isStickToBottom } = useScrollToBottom();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter" || e.shiftKey || isComposing) return;

    e.preventDefault();
    sendMessage();
    setTimeout(() => scrollToBottom());
  };

  const sendMessage = () => {
    if (inputValue.trim().length === 0) return;

    inputValue.split("\n").map((splitedMessage, index) => {
      if (splitedMessage.length) {
        addMessage({
          user: username,
          text: splitedMessage,
          timestamp: Date.now().toString(),
          key: Date.now().toString() + index,
        });
      }
    });
    setInputValue("");
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(Number(timestamp));

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return `${month.toString().padStart(2, "0")}/${day.toString().padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    textAreaRef.current?.focus();
  }, []);

  useEffect(() => {
    if (isStickToBottom) scrollToBottom();
  }, [messages, isStickToBottom]);

  return (
    <div
      ref={bottomRef}
      style={{ backgroundColor: "black", paddingBottom: "180px" }}
    >
      {messages.map((m) => {
        if (m.user === "SYSTEM") {
          return (
            <div
              key={m.key}
              style={{
                color: "#999",
                padding: "4px",
                marginTop: "10px",
                backgroundColor: "#222",
              }}
            >
              {m.text}
              <span style={{ float: "right" }}>
                {formatTimestamp(m.timestamp)}
              </span>
            </div>
          );
        }

        return (
          <div
            key={m.key}
            style={{ color: "white", padding: "4px", marginTop: "10px" }}
          >
            <span style={{ color: "#ff6" }}>→ {m.user}</span>
            <span style={{ color: "#999900" }}>: {m.text}</span>
            <span style={{ color: "#bbb", float: "right" }}>
              {formatTimestamp(m.timestamp)}
            </span>
          </div>
        );
      })}
      <div
        style={{
          position: "fixed",
          bottom: "0",
          paddingBottom: "20px",
          backgroundColor: "black",
        }}
      >
        <textarea
          ref={textAreaRef}
          rows={3}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() =>
            setTimeout(() => {
              setIsComposing(false);
            })
          }
          placeholder="說點什麼吧"
          style={{
            width: "100vw",
            resize: "none",
            fontSize: "24px",
            padding: "4px",
            backgroundColor: "gray",
            color: "silver",
          }}
        />
      </div>
    </div>
  );
};

export default Chatroom;
