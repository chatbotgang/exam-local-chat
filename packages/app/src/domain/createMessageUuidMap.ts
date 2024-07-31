import { Message } from "../types/message";

export default function createMessageUuidMap(messages: Message[]) {
  return messages.reduce<Record<string, Message>>((acc, message) => {
    acc[message.uuid] = message;
    return acc;
  }, {});
}
