import {
  BroadcastMessage,
  MessageSchema,
  createSystemMessage,
  createUserMessage,
} from "@exam/app/src//utils/BroadcastMessage";
import type { Message } from "@exam/app/src/utils/BroadcastMessage";
import { useCallback, useEffect, useRef, useState } from "react";
import { z } from "zod";

const MESSAGE_KEY = "messages";
const BROADCAST_KEY = "app-channel";
const StoredMessagesSchema = z.array(MessageSchema);

const getMessagesFromLocalStorage = (): Message[] => {
  const storedMessages = localStorage.getItem(MESSAGE_KEY);
  if (storedMessages) {
    try {
      const parsedMessages = StoredMessagesSchema.parse(
        JSON.parse(storedMessages),
      );
      return parsedMessages;
    } catch (error) {
      console.error("Error parsing stored messages:", error);
    }
  }
  return [];
};

export function useMessage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const broadcastChannelRef = useRef<BroadcastMessage | null>(null);

  useEffect(() => {
    broadcastChannelRef.current = new BroadcastMessage(BROADCAST_KEY);
    broadcastChannelRef.current.receiveMessage((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Read initial messages from localStorage
    const storedMessages = getMessagesFromLocalStorage();
    setMessages(storedMessages);

    return () => {
      broadcastChannelRef.current?.close();
    };
  }, []);

  // single source of the messages update
  const sendMessage = useCallback((message: Message) => {
    const oldMessages = getMessagesFromLocalStorage();
    const newMessages = StoredMessagesSchema.parse([...oldMessages, message]);
    // Update localStorage when messages change
    localStorage.setItem(MESSAGE_KEY, JSON.stringify(newMessages));
    setMessages(newMessages);
    broadcastChannelRef.current?.sendMessage(message);
  }, []);

  const sendUserMessage = useCallback(
    (user: string, text: string) => {
      const message = createUserMessage(user, text);
      sendMessage(message);
    },
    [sendMessage],
  );

  const sendJoinMessage = useCallback(
    (user: string) => {
      const message = createSystemMessage(`${user} has joined the chat`);
      sendMessage(message);
    },
    [sendMessage],
  );

  const sendLeaveMessage = useCallback(
    (user: string) => {
      const message = createSystemMessage(`${user} has left the chat`);
      sendMessage(message);
    },
    [sendMessage],
  );

  return { messages, sendUserMessage, sendJoinMessage, sendLeaveMessage };
}
