import { useEffect, useState } from "react";
import useStorage from "../hooks/useStorage";
import type { Message, SystemText } from "../types";
import { StorageKey } from "../types";

const CHANNEL_NAME = "message";

export default function useMessage() {
  const [storedMessages, setStoredMessages] = useStorage(
    StorageKey.Messages,
    [],
  );

  const [channel, setChannel] = useState<BroadcastChannel | null>(null);

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = (e) => {
      setStoredMessages((prevState: Message[]) => [...prevState, e.data]);
    };
    setChannel(channel);

    return () => {
      channel.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = (message: Message | SystemText) => {
    if (!channel) return;
    channel.postMessage(message);
    setStoredMessages((prevState: Message[]) => [...prevState, message]);
  };

  return {
    sendMessage,
    storedMessages,
    canPostMessage: Boolean(channel !== null),
  };
}
