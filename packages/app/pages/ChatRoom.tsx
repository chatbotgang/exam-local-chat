import { memo, useEffect } from "react";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";
import useMessage from "../hooks/useMessage";
import type { Message, SystemText, getMessageProps } from "../types";

const ChatRoom = ({ storedName }: { storedName: string }) => {
  const { sendMessage, storedMessages, canPostMessage } = useMessage();

  const getMessage = ({
    type,
    content = "",
  }: getMessageProps): Message | SystemText => {
    switch (type) {
      case "NEW_MESSAGE":
        return {
          type: "message",
          id: Date.now().toString(),
          userName: storedName,
          content,
          timestamp: Date.now(),
        };
      case "USER_JOINED":
        return {
          type: "system",
          id: `joined${Date.now().toString()}`,
          content: `${storedName} joined`,
        };
      case "USER_LEFT":
        return {
          type: "system",
          id: `left${Date.now().toString()}`,
          content: `${storedName} left`,
        };
    }
  };

  const handleSendMessage = (content: string) => {
    sendMessage(getMessage({ type: "NEW_MESSAGE", content }));
  };
  const handleRoomLeft = () => {
    sendMessage(getMessage({ type: "USER_LEFT" }));
  };

  useEffect(() => {
    if (canPostMessage) {
      sendMessage(getMessage({ type: "USER_JOINED" }));
    }

    window.addEventListener("beforeunload", handleRoomLeft);
    return () => {
      window.removeEventListener("beforeunload", handleRoomLeft);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canPostMessage]);

  return (
    <>
      <MessageList currentUser={storedName} messages={storedMessages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </>
  );
};

export default memo(ChatRoom);
