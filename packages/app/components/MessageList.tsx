import { Fragment, forwardRef } from "react";

import { Message, MessageDetail } from "../models/message";
import MessageItem from "./MessageItem";

type MessageListProps = {
  messages: Message[];
  username: string;
  onSetReply: (replyDetail: MessageDetail | null) => void;
};

const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  ({ messages, username, onSetReply }, ref) => {
    return (
      <>
        <div className="overflow-y-scroll flex-grow p-4 pb-0 space-y-4">
          {messages.map((message) => (
            <Fragment key={message.id}>
              <MessageItem
                message={message}
                username={username}
                onSetReply={onSetReply}
              />
            </Fragment>
          ))}
          <div className="h-0" ref={ref}></div>
        </div>
      </>
    );
  },
);

export default MessageList;
