import type { ChatMessage } from "../types/message";

const channel = new BroadcastChannel("local-chatroom");

export const broadCastChatMessage = (chatMessage: ChatMessage) => {
  channel.postMessage(chatMessage);
};

export default channel;
