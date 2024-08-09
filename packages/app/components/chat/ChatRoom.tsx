import ChatHistory from "@/components/chat/ChatHistory";
import useChatHistory from "@/hooks/useChatHistory";
import useCurrentUser from "@/hooks/useCurrentUser";
import usePersistentCallback from "@/hooks/usePersistentCallback";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChatRoom() {
  const { curUserName, joinChat, participants, quitChat } = useCurrentUser();
  const { addChatMessage } = useChatHistory();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const hasJoinedRef = useRef(false);

  useEffect(() => {
    if (!curUserName) {
      navigate("/");
    }
  }, [curUserName, navigate]);

  useEffect(() => {
    const handleJoinRoom = () => {
      if (!hasJoinedRef.current && curUserName) {
        joinChat(curUserName);
        hasJoinedRef.current = true;
        if (!participants.includes(curUserName)) {
          addChatMessage(`${curUserName} Joined`, "system");
        }
      }
    };
    const handleLeftRoom = () => {
      quitChat();
      if (participants.filter((x) => x === curUserName).length === 1) {
        addChatMessage(`${curUserName} Left`, "system");
      }
    };
    handleJoinRoom();
    window.addEventListener("beforeunload", handleLeftRoom);
    return () => {
      window.removeEventListener("beforeunload", handleLeftRoom);
    };
  }, [curUserName, participants]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (inputRef.current) {
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = usePersistentCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey && inputRef.current) {
        e.preventDefault();
        const message = inputRef.current.value.trim();
        if (!message) {
          return;
        }
        addChatMessage(inputRef.current.value);
        setInputValue("");
        inputRef.current.style.height = "auto";
      }
    },
  );

  return (
    <>
      <ChatHistory className="flex-1" />
      <textarea
        ref={inputRef}
        rows={1}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="p-2 border border-gray-300 rounded resize-none overflow-hidden"
        placeholder="Type a message..."
        style={{ minHeight: "40px", maxHeight: "200px" }}
      />
    </>
  );
}
