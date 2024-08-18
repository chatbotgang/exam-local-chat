import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import useChatMessages from "./useChatMessages";

type ChatroomProps = {
  username: string;
};

const Chatroom: FC<ChatroomProps> = ({ username }) => {
  const [inputValue, setInputValue] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const { messages, addMessage } = useChatMessages();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter" || e.shiftKey || isComposing) return;

    e.preventDefault();
    sendMessage();
    scrollToBottom();
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

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
    setIsAtBottom(true);
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
    if (isAtBottom) scrollToBottom();
  }, [messages, isAtBottom]);

  useEffect(() => {
    const isScrollingUp = () => {
      const { scrollTop } = document.documentElement;

      if (scrollTop === lastScrollTop) return false;

      const status = scrollTop < lastScrollTop;
      setLastScrollTop(scrollTop);
      return status;
    };

    const handleScroll = () => {
      if (!isAtBottom) {
        const { scrollTop, scrollHeight, clientHeight } =
          document.documentElement;

        setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 1);
        return;
      }

      if (isScrollingUp()) {
        setIsAtBottom(false);
      }
    };

    textAreaRef.current?.focus();
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isAtBottom, lastScrollTop]);

  return (
    <div style={{ backgroundColor: "black" }}>
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
      <div ref={endOfMessagesRef} style={{ height: "120px" }}></div>
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
