import { FC, Fragment, useEffect, useRef } from "react";

import { MessageDetail } from "../models/message";
import MessageItem from "./MessageItem";
import { useUserSession } from "../hooks/useUserSession";
import { useMessage } from "../hooks/useMessage";

type MessageListProps = {
  onSetReply: (replyDetail: MessageDetail | null) => void;
};

const MessageList: FC<MessageListProps> = ({ onSetReply }) => {
  const { messages } = useMessage();
  const { user } = useUserSession();
  const { username } = user;

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  return (
    <>
      <div
        className="overflow-y-scroll flex-grow p-4 pb-0 space-y-4"
        data-testid="message-list"
      >
        {messages.map((message) => (
          <Fragment key={message.id}>
            <MessageItem
              message={message}
              username={username}
              onSetReply={onSetReply}
            />
          </Fragment>
        ))}
        <div className="h-0" ref={scrollRef}></div>
      </div>
    </>
  );
};

export default MessageList;
