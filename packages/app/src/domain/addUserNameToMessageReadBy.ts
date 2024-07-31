import { Message } from "../types/message";

export default function addUserNameToMessageReadBy(
  messages: Message[],
  userName: string,
  uuids: string[],
) {
  return messages.map((message) => {
    if (uuids.includes(message.uuid)) {
      return { ...message, readBy: [...message.readBy, userName] };
    }
    return message;
  });
}
