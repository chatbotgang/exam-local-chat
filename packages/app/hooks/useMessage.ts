import { useState, useEffect, useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";

import { Message } from "../models/message";

const BROADCAST_CHANNEL_NAME = "broadcast_channel_name";

export const useMessage = () => {
  const [messagesRecords, setMessagesRecords] = useLocalStorage<Message[]>(
    "messages",
    [],
  );

  const [channel, setChannel] = useState<BroadcastChannel | null>(null);
  const [messages, setMessages] = useState<Message[]>(messagesRecords);

  useEffect(() => {
    const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
    channel.onmessage = (event) => {
      setMessages((prevState) => [...prevState, event.data]);
    };
    setChannel(channel);

    return () => {
      channel.close();
    };
  }, []);

  const handleSendMessage = useCallback(
    (message: Message) => {
      if (!channel) return;
      channel.postMessage(message);
      setMessagesRecords((prevState) => [...prevState, message]);
      setMessages((prevState) => [...prevState, message]);
    },
    [channel, setMessagesRecords],
  );

  return {
    handleSendMessage,
    messages,
  };
};
