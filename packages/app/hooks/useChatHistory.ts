import useStorage from "@/hooks/useStorage";
import { useMemo, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import usePersistentCallback from "./usePersistentCallback";

export interface ChatMessage {
  id: string;
  message: string;
  timestamp: number;
  username: string;
  type: "system" | "user";
}

const LOAD_MORE_COUNT = 20;

const useChatHistory = () => {
  const { curUserName } = useCurrentUser();
  const [storedChatHistory, setStoredChatHistory] = useStorage<ChatMessage[]>(
    "chatHistory",
    [],
    "local",
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const hasMore = useMemo(
    () => storedChatHistory.length > (index + 1) * LOAD_MORE_COUNT,
    [index],
  );

  const addChatMessage = (
    message: string,
    type: "system" | "user" = "user",
  ) => {
    const newMessage = {
      id: Date.now().toString(),
      message,
      timestamp: Date.now(),
      username: curUserName,
      type,
    };
    setStoredChatHistory((prevChatHistory) => {
      return [...prevChatHistory, newMessage];
    });
  };

  const removeChatMessage = usePersistentCallback((id: string) => {
    setStoredChatHistory((prevChatHistory) =>
      prevChatHistory.filter((msg) => msg.id !== id),
    );
  });

  const loadMoreMessages = usePersistentCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);

    setTimeout(() => {
      setIndex((i) => i + 1);
      setLoading(false);
    }, 2000);
  });

  return {
    chatHistory: storedChatHistory.slice(-LOAD_MORE_COUNT * (index + 1)),
    addChatMessage,
    removeChatMessage,
    loadMoreMessages,
    hasMore,
    loading,
  };
};

export default useChatHistory;
