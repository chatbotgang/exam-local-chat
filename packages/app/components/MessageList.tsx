import { FC, Fragment } from "react";

import { Message, MessageDetail } from "../models/message";
import MessageItem from "./MessageItem";

type MessageListProps = {
  messages: Message[];
  username: string;
  onSetReply: (replyDetail: MessageDetail) => void;
};

const MessageList: FC<MessageListProps> = ({ messages, username }) => {
  return (
    <div className="overflow-y-scroll flex-grow p-4">
      {messages.map((message) => (
        <Fragment>
          <MessageItem message={message} username={username} />
        </Fragment>
      ))}
    </div>
  );
};

export default MessageList;
