import { nanoid } from "nanoid";
import { create } from "zustand";
import type {
  ChatMessage,
  ChatMessageWithoutIdAndTimestamp,
} from "../types/message";
import { broadCastChatMessage } from "../utils/broadcastChannel";
import { getStoredChatMessages, storeChatMessages } from "../utils/window";

interface ChatMessagesState {
  chatMessages: ChatMessage[];
  sendChatMessage: (params: ChatMessageWithoutIdAndTimestamp) => void;
  receiveChatMessage: (message: ChatMessage) => void;
}

export const useChatMessagesStore = create<ChatMessagesState>((set) => ({
  chatMessages: getStoredChatMessages(),
  sendChatMessage: ({ type, username, message = "" }) => {
    const newMessage: ChatMessage = {
      id: nanoid(),
      timestamp: Date.now(),
      type,
      username,
      message,
    };
    set((state) => ({ chatMessages: [...state.chatMessages, newMessage] }));
    broadCastChatMessage(newMessage);
  },
  receiveChatMessage: (message: ChatMessage) => {
    set((state) => {
      const updatedMessages = [...state.chatMessages, message];
      storeChatMessages(updatedMessages);
      return { chatMessages: updatedMessages };
    });
  },
}));

export default useChatMessagesStore;
