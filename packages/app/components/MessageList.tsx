import { FC } from "react";

import { Message, MessageDetail } from "../models/message";

type MessageListProps = {
  messages: Message[];
  onSetReply: (replyDetail: MessageDetail) => void;
};

const MessageList: FC<MessageListProps> = ({ messages }) => {
  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>{message.main.content}</div>
      ))}
    </div>
  );
};

export default MessageList;
