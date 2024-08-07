import { FC, useState, useEffect, useCallback, useRef } from "react";

import { useMessage } from "../hooks/useMessage";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { User } from "../models/user";
import { MessageDetail } from "../models/message";

type ChatroomProps = {
  user: User;
};

const Chatroom: FC<ChatroomProps> = ({ user }) => {
  const { handleSendMessage, messages } = useMessage();

  const [reply, setReply] = useState<MessageDetail | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  const handleSetReply = useCallback(
    (replyDetail: MessageDetail | null) => setReply(replyDetail),
    [],
  );

  return (
    <div className="w-full h-full bg-slate-800 flex flex-col">
      <MessageList
        messages={messages}
        onSetReply={handleSetReply}
        username={user.username}
        ref={scrollRef}
      />
      <MessageInput
        onSendMessage={handleSendMessage}
        onSetReply={handleSetReply}
        user={user}
        reply={reply}
      />
    </div>
  );
};

export default Chatroom;
