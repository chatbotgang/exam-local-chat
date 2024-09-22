import type { ChatMessage } from "../types/message";

const LOCAL_USERNAME_KEY = "local-username";
const CHAT_MESSAGES_KEY = "chat-messages";

export const storeLocalUsername = (name: string) => {
  sessionStorage.setItem(LOCAL_USERNAME_KEY, name);
};

export const getStoredLocalUsername = () => {
  const localUsername = sessionStorage.getItem(LOCAL_USERNAME_KEY);
  return localUsername || "";
};

export const storeChatMessages = (chatMessages: ChatMessage[]) => {
  localStorage.setItem(CHAT_MESSAGES_KEY, JSON.stringify(chatMessages));
};

export const getStoredChatMessages = () => {
  const chatMessages = JSON.parse(
    localStorage.getItem(CHAT_MESSAGES_KEY) || "[]",
  );
  return chatMessages as ChatMessage[];
};
