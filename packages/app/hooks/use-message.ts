import { useCallback, useContext, useEffect, useState } from "react";
import { IMessage, ISocketResponse, MessageType } from "../interfaces";
import { SocketCtx } from "../providers";

export const useMessage = () => {
  const { socket, addSocketEventListener, removeSocketEventListener } =
    useContext(SocketCtx);
  const [messages, setMessages] = useState<IMessage[]>([]);

  const sendMessage = useCallback(
    (msg: string, name: string) => {
      socket?.emit("message", {
        name,
        message: msg,
        type: MessageType.MESSAGE,
      });
    },
    [socket],
  );

  const refresh = useCallback(() => {
    socket?.emit("refresh");
  }, [socket]);

  useEffect(() => {
    const getMessageDataCallback = (data: ISocketResponse<IMessage[]>) => {
      if (data.code === 20000) {
        setMessages(data.data || []);
      }
    };

    addSocketEventListener("message", getMessageDataCallback);

    return () => {
      removeSocketEventListener("message", getMessageDataCallback);
    };
  }, [addSocketEventListener, removeSocketEventListener, socket]);

  return {
    messages,
    refresh,
    sendMessage,
  };
};
