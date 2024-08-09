import { ChatMessage } from "@/hooks/useChatHistory";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const localStorage = createJSONStorage<ChatMessage[]>(
  () => window.localStorage,
);
export const chatHistoryAtom = atomWithStorage<ChatMessage[]>(
  "chatHistory",
  [],
  localStorage,
);
