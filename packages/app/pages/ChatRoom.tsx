import { memo, useEffect } from "react";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";
import useStorage from "../hooks/useStorage";
import type { Message } from "../types";
import { StorageKey } from "../types";

const CHANNEL_NAME = "broadcast-messages";

const ChatRoom = ({ storedName }: { storedName: string }) => {
  const [storedMessages, setStoredMessages] = useStorage(
    StorageKey.Messages,
    [],
  );

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      userName: storedName,
      content,
      timestamp: Date.now(),
    };
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.postMessage(newMessage);
  };

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = (e) => {
      setStoredMessages((prevState: Message[]) => [...prevState, e.data]);
    };
    return () => {
      channel.close();
    };
  });

  return (
    <>
      <MessageList currentUser={storedName} messages={storedMessages} />
      <MessageInput onSendMessage={handleSendMessage} />
    </>
  );
};

export default memo(ChatRoom);
