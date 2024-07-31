import { Message } from "../types/message";

export default function addReaderToMyMessageReadBy(
  messages: Message[],
  userName: string,
  uuids: string[],
  reader: string,
) {
  return messages.map((message) => {
    if (
      message.userName === userName &&
      uuids.includes(message.uuid) &&
      !message.readBy.includes(reader)
    ) {
      return { ...message, readBy: [...message.readBy, reader] };
    }
    return message;
  });
}
