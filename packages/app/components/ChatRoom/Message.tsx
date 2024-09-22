import type { FC } from "react";
import { type ChatMessage, ChatMessageType } from "../../types/message";

interface MessageProps {
  chatMessage: ChatMessage;
}

const Message: FC<MessageProps> = ({ chatMessage }) => {
  return chatMessage.type === ChatMessageType.Joined ? (
    <div>{`joined: ${chatMessage.username}`}</div>
  ) : (
    <div>{`${chatMessage.username}: ${chatMessage.message}`}</div>
  );
};

export default Message;
