import type { ChatMessage } from "../types/message";

const CHAT_MESSAGES_KEY = "chat-messages";

export const storeChatMessages = (chatMessages: ChatMessage[]) => {
  localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(chatMessages));
};

export const getStoredChatMessages = () => {
  const chatMessages = JSON.parse(
    localStorage.getItem(CHAT_MESSAGES_KEY) || "[]",
  );
  return chatMessages as ChatMessage[];
};
