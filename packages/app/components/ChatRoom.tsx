import { useCallback, useEffect, useRef } from "react";

import Message from "./Message";
import ChatInput from "./ChatInput";

import useMessages from "../hooks/useMessages";
import useParticipants from "../hooks/useParticipants";
import { IMessage } from "../constants/message";

type ChatRoomProps = {
  currentUser: string;
};

const ChatRoom = ({ currentUser }: ChatRoomProps) => {
  const historyRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrolled = useRef<boolean>(true);
  const { sendTextMessage, sendJoinedMessage, sendLeftMessage, messages } =
    useMessages({
      currentUser,
    });
  const { joinRoom, leaveRoom, getParticipants } = useParticipants();

  const handleTextMessage = (text: string) => {
    sendTextMessage(text);
    shouldAutoScrolled.current = true;
  };

  const handleLeftRoom = useCallback(() => {
    sendLeftMessage();
    leaveRoom(currentUser);
  }, [sendLeftMessage, leaveRoom, currentUser]);

  useEffect(() => {
    if (historyRef?.current) {
      const scrollHeight: number = historyRef.current.scrollHeight;

      if (shouldAutoScrolled.current) {
        historyRef.current.scrollTop = scrollHeight;
      }
    }
  }, [messages]);

  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.onscroll = (e: Event) => {
        const scrollEl = e.currentTarget as HTMLDivElement;
        shouldAutoScrolled.current =
          scrollEl.scrollTop + scrollEl.clientHeight >= scrollEl.scrollHeight;
      };
    }
  }, []);

  useEffect(() => {
    const participants: string[] = getParticipants();

    if (participants.find((participant) => participant === currentUser)) {
      return;
    }

    sendJoinedMessage();
    joinRoom(currentUser);
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handleLeftRoom);
    return () => {
      window.removeEventListener("beforeunload", handleLeftRoom);
    };
  }, [messages]);

  return (
    <div className="bg-white dark:bg-black w-screen flex flex-1 flex-col justify-between overflow-hidden">
      <div ref={historyRef} className="flex-initial overflow-y-auto p-4">
        {messages.map((message: IMessage) => (
          <Message
            key={message.timestamp}
            username={message.username}
            messageType={message.messageType}
            timestamp={message.timestamp}
            text={message.text}
          />
        ))}
      </div>
      <ChatInput sendMessage={handleTextMessage} />
    </div>
  );
};

export default ChatRoom;
