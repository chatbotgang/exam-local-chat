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

export enum EventMessage {
  InitReady = "initReady",
  NewMessage = "newMessage",
}

export const useMessageEvent = (
  eventType: EventMessage,
  callback: (detail: Message[]) => void,
) => {
  useEffect(() => {
    const handleEvent = (event: CustomEvent) => {
      callback(event.detail);
    };
    window.addEventListener(eventType, handleEvent as EventListener);
    return () => {
      window.removeEventListener(eventType, handleEvent as EventListener);
    };
  }, [eventType, callback]);
};

interface MessageInterface {
  messageEvents: {
    [EventMessage.InitReady]: (messages: Message[]) => void;
    [EventMessage.NewMessage]: (messages: Message[]) => void;
  };
}

export function useMessage(messageInterface: MessageInterface) {
  const [messages, setMessages] = useState<Message[]>([]);
  const broadcastChannelRef = useRef<BroadcastMessage | null>(null);
  const lastMessagesCountRef = useRef(0);

  useMessageEvent(
    EventMessage.InitReady,
    messageInterface.messageEvents[EventMessage.InitReady],
  );
  useMessageEvent(
    EventMessage.NewMessage,
    messageInterface.messageEvents[EventMessage.NewMessage],
  );

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

  // dispatch message events
  useEffect(() => {
    if (lastMessagesCountRef.current === messages.length) {
      return;
    }
    if (messages.length > 0 && lastMessagesCountRef.current === 0) {
      // Dispatch InitReady event when initial messages are loaded
      const event = new CustomEvent(EventMessage.InitReady, {
        detail: messages,
      });
      window.dispatchEvent(event);
    } else {
      // Dispatch NewMessage event when new messages are added
      const event = new CustomEvent(EventMessage.NewMessage, {
        detail: messages,
      });
      window.dispatchEvent(event);
    }
    lastMessagesCountRef.current = messages.length;
  }, [messages]);

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
