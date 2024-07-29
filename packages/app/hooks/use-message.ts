import {
  CallbackType,
  EventType,
  IMessage,
  ISocketResponse,
  MessageType,
} from "@exam/app/interfaces";
import { SocketCtx } from "@exam/app/providers";
import { useCallback, useContext, useEffect, useState } from "react";

export const useMessage = () => {
  const { socket, addSocketEventListener, removeSocketEventListener } =
    useContext(SocketCtx);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const sendMessage = useCallback(
    (msg: string, name: string) => {
      setMessages((messages) => [
        ...messages,
        {
          id: messages.length.toString(),
          name,
          message: msg,
          type: MessageType.MESSAGE,
          timestamp: Date.now(),
        },
      ]);
      socket?.emit(EventType.MESSAGE, {
        name,
        message: msg,
        type: MessageType.MESSAGE,
      });
    },
    [socket],
  );

  const refresh = useCallback(() => {
    socket?.emit(EventType.REFRESH);
  }, [socket]);

  useEffect(() => {
    const getMessageDataCallback = (data: ISocketResponse<IMessage[]>) => {
      if (data.code === 20000) {
        setMessages(data.data || []);
      }
    };

    addSocketEventListener(
      EventType.MESSAGE,
      CallbackType.GET_MESSAGE,
      getMessageDataCallback,
    );

    return () => {
      removeSocketEventListener("message", CallbackType.GET_MESSAGE);
    };
  }, [addSocketEventListener, removeSocketEventListener, socket]);

  return {
    messages,
    refresh,
    sendMessage,
  };
};
