import { useCallback, useState } from "react";

import { IMessage, MessageType } from "../constants/message";

type useMessagesProps = {
  currentUser: string;
};

type useMessagesReturn = {
  sendTextMessage: (message: string) => void;
  sendJoinedMessage: () => void;
  sendLeftMessage: () => void;
  messages: IMessage[];
};

const DEMO_CHANNEL_NAME = "DEMO_CHANNEL_NAME";
const bc: BroadcastChannel = new BroadcastChannel(DEMO_CHANNEL_NAME);

const getMessagesFromLocalStorage = (): IMessage[] => {
  const messages = localStorage.getItem(DEMO_CHANNEL_NAME);
  return messages ? (JSON.parse(messages) as IMessage[]) : [];
};

const useMessages = ({ currentUser }: useMessagesProps): useMessagesReturn => {
  const [messages, setMessages] = useState<IMessage[]>(() =>
    getMessagesFromLocalStorage(),
  );

  const sendMessage = useCallback(
    (message: IMessage): void => {
      const newMessages = [...messages, message];
      bc.postMessage(message);
      setMessages(newMessages);
      // save to local storage
      localStorage.setItem(DEMO_CHANNEL_NAME, JSON.stringify(newMessages));
    },
    [messages, setMessages],
  );

  const sendTextMessage = useCallback(
    (text: string): void => {
      const textMessage: IMessage = {
        username: currentUser,
        messageType: MessageType.Text,
        timestamp: Date.now(),
        text,
      };
      sendMessage(textMessage);
    },
    [currentUser, sendMessage],
  );

  const sendJoinedMessage = useCallback((): void => {
    const joinedMessage: IMessage = {
      username: currentUser,
      timestamp: Date.now(),
      messageType: MessageType.Joined,
      text: "",
    };
    sendMessage(joinedMessage);
  }, [currentUser, sendMessage]);

  const sendLeftMessage = useCallback((): void => {
    const leftMessage: IMessage = {
      username: currentUser,
      timestamp: Date.now(),
      messageType: MessageType.Left,
      text: "",
    };
    sendMessage(leftMessage);
  }, [currentUser, sendMessage]);

  bc.onmessage = (event) => {
    if (event.data) {
      setMessages((prev) => [...prev, event.data]);
    }
  };

  return {
    sendTextMessage,
    sendJoinedMessage,
    sendLeftMessage,
    messages,
  };
};

export default useMessages;
