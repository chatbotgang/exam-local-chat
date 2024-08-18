import { useState, useEffect } from "react";

type Message = {
  user: string;
  text: string;
  timestamp: string;
  key: string;
};

const useChatMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const channel = new BroadcastChannel("chat_channel");

  const getMessage = () => {
    const storedMessages = localStorage.getItem("chatMessages");

    if (!storedMessages) return;
    setMessages(JSON.parse(storedMessages) as Message[]);
  };

  const addMessage = (newMessage: Message) => {
    const storedMessages = localStorage.getItem("chatMessages") ?? "[]";
    const currentMessages = JSON.parse(storedMessages) as Message[];
    const updatedMessages = [...currentMessages, newMessage];

    setMessages(updatedMessages);
    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));
    channel.postMessage(newMessage);
  };

  useEffect(() => {
    getMessage();
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      const newMessage = event.data as Message;
      setMessages((messages) => [...messages, newMessage]);
    };

    channel.addEventListener("message", handleMessage);

    return () => {
      channel.removeEventListener("message", handleMessage);
      channel.close();
    };
  }, [channel, messages]);

  return { messages, addMessage };
};

export default useChatMessages;
