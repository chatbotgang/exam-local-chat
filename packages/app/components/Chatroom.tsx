import { FC, useState, useEffect, useCallback, useRef } from "react";

import { useMessage } from "../hooks/useMessage";
import { useRoom } from "../hooks/useRoom";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { User } from "../models/user";
import { MessageDetail } from "../models/message";
import { generateId } from "../lib/id";
import { MessageType } from "../enums/message";

type ChatroomProps = {
  user: User;
};

const Chatroom: FC<ChatroomProps> = ({ user }) => {
  const { handleLeaveRoom } = useRoom();
  const { handleSendMessage, messages } = useMessage();

  const [reply, setReply] = useState<MessageDetail | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleSendSystemMessage = useCallback(
    (systemMessage: string) => {
      const message = {
        id: generateId(),
        type: MessageType.SYSTEM,
        main: { ...user, content: systemMessage },
        reply: null,
        createdAt: Date.now(),
      };
      handleSendMessage(message);
    },
    [handleSendMessage, user],
  );

  const handleRoomJoined = useCallback(() => {
    handleSendSystemMessage(`${user.username} Joined`);
  }, [handleSendSystemMessage, user]);

  const handleRoomLeft = useCallback(() => {
    handleSendSystemMessage(`${user.username} Left`);
    handleLeaveRoom(user);
  }, [handleLeaveRoom, handleSendSystemMessage, user]);

  const handleSetReply = useCallback(
    (replyDetail: MessageDetail | null) => setReply(replyDetail),
    [],
  );

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ block: "end" });
  }, [messages.length]);

  useEffect(() => {
    handleRoomJoined();
  }, [handleRoomJoined]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleRoomLeft);
    return () => window.removeEventListener("beforeunload", handleRoomLeft);
  }, [handleRoomLeft]);

  return (
    <div className="w-full h-full bg-slate-800 flex flex-col">
      <MessageList
        messages={messages}
        onSetReply={handleSetReply}
        username={user.username}
        ref={scrollRef}
      />
      {reply && (
        <div className="bg-white bg-opacity-80 py-1 px-2 text-slate-800 flex items-center">
          <p className="flex-grow truncate">{reply.content}</p>
          <div
            className="bg-slate-400 w-5 h-5 rounded-full flex justify-center items-center cursor-pointer flex-shrink-0"
            onClick={() => handleSetReply(null)}
          >
            X
          </div>
        </div>
      )}
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
