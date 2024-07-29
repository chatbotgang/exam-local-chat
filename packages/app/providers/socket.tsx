import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import {
  CallbackNameType,
  ISocketContext,
  ISocketResponse,
} from "../interfaces";

const socketUrl = import.meta.env["VITE_SERVER_URL"];

export const SocketCtx = createContext<ISocketContext>({} as ISocketContext);

export const SocketProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [socket, setSocket] = useState<Socket>();
  const { current: callbackMap } = useRef(new Map());

  const addSocketEventListener = useCallback(
    function <T>(
      eventName: string,
      callbackName: CallbackNameType,
      callback: (data: ISocketResponse<T>) => void,
    ): (data: ISocketResponse<T>) => void {
      const eventCallback: (data: ISocketResponse<T>) => void = (
        jsonData: ISocketResponse<T>,
      ) => {
        try {
          if (jsonData) {
            if (jsonData.code === 20000) {
              callback(jsonData);
            }
          }
        } catch (error) {
          console.error(error);
          callback({
            code: 40000,
            message: "unknown error",
          });
        }
      };
      // record callback function for cleanup
      callbackMap.set(callbackName, eventCallback);
      socket?.on(eventName, eventCallback);
      return eventCallback;
    },
    [callbackMap, socket],
  );

  const removeSocketEventListener = useCallback(
    function (eventName: string, callbackName: CallbackNameType) {
      // remove callback
      socket?.removeListener(eventName, callbackMap.get(callbackName));
    },
    [callbackMap, socket],
  );

  // create connection
  useEffect(() => {
    const socket = io(socketUrl);
    setSocket(socket);

    socket?.on("connect", () => {
      console.log("socket connected");
    });
    socket?.on("disconnect", () => {
      console.log("socket disconnected");
    });
    return () => {
      socket?.close();
    };
  }, []);

  return (
    <SocketCtx.Provider
      value={{
        socket,
        addSocketEventListener,
        removeSocketEventListener,
      }}
    >
      {children}
    </SocketCtx.Provider>
  );
};
