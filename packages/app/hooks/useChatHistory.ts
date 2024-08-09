import { chatHistoryAtom } from "@/atoms/chat";
import { errorAtom } from "@/atoms/common";
import { useAtom, useSetAtom } from "jotai";
import { useMemo, useState } from "react";
import { z } from "zod";
import useCurrentUser from "./useCurrentUser";
import usePersistentCallback from "./usePersistentCallback";

const chatMessageSchema = z.object({
  id: z.string(),
  message: z.string(),
  timestamp: z.number(),
  username: z.string(),
  type: z.union([z.literal("system"), z.literal("user")]),
  systemMessage: z.string().optional(),
});

export type ChatMessage = z.infer<typeof chatMessageSchema>;

const LOAD_MORE_COUNT = 20;

const useChatHistory = () => {
  const { curUserName } = useCurrentUser();
  const [storedChatHistory, setStoredChatHistory] = useAtom(chatHistoryAtom);
  const setError = useSetAtom(errorAtom);
  const [loading, setLoading] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);

  const hasMore = storedChatHistory.length > (index + 1) * LOAD_MORE_COUNT;

  const sanitizedChatHistory = useMemo(() => {
    return storedChatHistory.map((chat) => {
      let sysMsg: string | undefined;
      try {
        chatMessageSchema.parse(chat);
      } catch (error) {
        setError(error instanceof Error ? error : new Error(error as string));
        sysMsg = "Message to be verfied";
      }
      return {
        ...chat,
        ...(sysMsg ? { systemMessage: sysMsg } : {}),
      };
    });
  }, [storedChatHistory]);

  const addChatMessage = usePersistentCallback(
    (message: string, type: "system" | "user" = "user") => {
      const newMessage = {
        id: Date.now().toString(),
        message,
        timestamp: Date.now(),
        username: curUserName,
        type,
      } as ChatMessage;
      setStoredChatHistory((prevChatHistory) => {
        return [...prevChatHistory, newMessage];
      });
    },
  );

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
    chatHistory: useMemo(
      () => sanitizedChatHistory.slice(-LOAD_MORE_COUNT * (index + 1)),
      [sanitizedChatHistory],
    ),
    addChatMessage,
    removeChatMessage,
    loadMoreMessages,
    hasMore,
    loading,
  };
};

export default useChatHistory;
