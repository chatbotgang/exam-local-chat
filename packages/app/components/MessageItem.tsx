import { FC } from "react";

import { Message, MessageDetail } from "../models/message";
import { MessageType } from "../enums/message";
import TextMessage from "./TextMessage";
import SystemMessage from "./SystemMessage";

type MessageItemProps = {
  message: Message;
  username: string;
  onSetReply: (replyDetail: MessageDetail | null) => void;
};

const MessageItem: FC<MessageItemProps> = ({
  message,
  username,
  onSetReply,
}) => {
  return (
    <>
      {message.type === MessageType.SYSTEM && (
        <SystemMessage message={message} />
      )}
      {message.type === MessageType.TEXT && (
        <TextMessage
          message={message}
          onSetReply={onSetReply}
          username={username}
        />
      )}
    </>
  );
};

export default MessageItem;
