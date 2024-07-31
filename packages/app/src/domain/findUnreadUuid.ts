import { Message } from "../types/message";

export default function findUnreadUuid(messages: Message[], userName: string) {
  return messages
    .filter(
      (message) =>
        message.userName !== userName && !message.readBy.includes(userName),
    )
    .map((message) => message.uuid);
}
