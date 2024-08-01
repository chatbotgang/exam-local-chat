import { useState } from "react";

import { IMessage, MessageType } from "../constants/message";

type useMessageActionProps = {
  currentUser: string;
};

type useMessageActionReturn = {
  sendTextMessage: (message: string) => void;
  sendJoinedMessage: () => void;
  sendLeftMessage: () => void;
  messages: IMessage[];
};

const DEMO_CHANNEL_NAME = "DEMO";
const bc: BroadcastChannel = new BroadcastChannel(DEMO_CHANNEL_NAME);

const useMessages = ({
  currentUser,
}: useMessageActionProps): useMessageActionReturn => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const sendTextMessage = (message: string) => {
    const textMessage: IMessage = {
      username: currentUser,
      messageType: MessageType.Text,
      timestamp: Date.now(),
      text: message,
    };
    bc.postMessage(textMessage);
    setMessages((prev) => [...prev, textMessage]);
  };

  const sendJoinedMessage = () => {
    const joinedMessage: IMessage = {
      username: currentUser,
      timestamp: Date.now(),
      messageType: MessageType.Joined,
      text: "",
    };
    bc.postMessage(joinedMessage);
    setMessages((prev) => [...prev, joinedMessage]);
  };

  const sendLeftMessage = () => {
    const leftMessage: IMessage = {
      username: currentUser,
      timestamp: Date.now(),
      messageType: MessageType.Left,
      text: "",
    };
    bc.postMessage(leftMessage);
    setMessages((prev) => [...prev, leftMessage]);
  };

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
