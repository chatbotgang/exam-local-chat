import { useCallback, useEffect, useRef, useState } from "react";
import { z } from "zod";
import type { Message } from "../utils/BroadcastMessage";
import {
  BroadcastMessage,
  MessageSchema,
  createUserMessage,
} from "../utils/BroadcastMessage";

const MESSAGE_KEY = "messages";
const BROADCAST_KEY = "app-channel";
const StoredMessagesSchema = z.array(MessageSchema);

export function useMessage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const broadcastChannelRef = useRef<BroadcastMessage | null>(null);

  useEffect(() => {
    broadcastChannelRef.current = new BroadcastMessage(BROADCAST_KEY);
    broadcastChannelRef.current.receiveMessage((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Read initial messages from localStorage
    const storedMessages = localStorage.getItem(MESSAGE_KEY);
    if (storedMessages) {
      try {
        const parsedMessages = StoredMessagesSchema.parse(
          JSON.parse(storedMessages),
        );
        setMessages(parsedMessages);
      } catch (error) {
        console.error("Error parsing stored messages:", error);
      }
    }

    return () => {
      broadcastChannelRef.current?.close();
    };
  }, []);

  const sendMessage = useCallback(
    (user: string, text: string) => {
      const message = createUserMessage(user, text);
      const newMessages = StoredMessagesSchema.parse([...messages, message]);
      // Update localStorage when messages change
      localStorage.setItem(MESSAGE_KEY, JSON.stringify(newMessages));
      setMessages(newMessages);
      broadcastChannelRef.current?.sendMessage(user, text);
    },
    [messages],
  );

  return { messages, sendMessage };
}
