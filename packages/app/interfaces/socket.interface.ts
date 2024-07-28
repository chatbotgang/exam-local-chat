import { Socket } from "socket.io-client";

export type ISocketAddEventListenerCallback = <T = undefined>(
  message: string,
  callback: (data: ISocketResponse<T>) => void,
) => (data: ISocketResponse<T>) => void;

export type ISocketRemoveEventListenerCallback = <T = undefined>(
  message: string,
  callback: (data: ISocketResponse<T>) => void,
) => void;

export interface ISocketResponse<T = undefined> {
  code: number;
  message: string;
  data?: T;
}

export interface ISocketContext {
  socket?: Socket | undefined;
  addSocketEventListener: ISocketAddEventListenerCallback;
  removeSocketEventListener: ISocketRemoveEventListenerCallback;
}
