import type { FC } from "react";
import { type ChatMessage, ChatMessageType } from "../../types/message";

interface MessageProps {
  chatMessage: ChatMessage;
}

const Message: FC<MessageProps> = ({ chatMessage }) => {
  return chatMessage.type === ChatMessageType.Text ? (
    <div>{`${chatMessage.username}: ${chatMessage.message}`}</div>
  ) : (
    <div>{`${chatMessage.type}: ${chatMessage.username}`}</div>
  );
};

export default Message;
