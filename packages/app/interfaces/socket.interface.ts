import { Socket } from "socket.io-client";

export enum EventType {
  MESSAGE = "message",
  REFRESH = "refresh",
}

export enum CallbackType {
  GET_MESSAGE = "GET_MESSAGE",
  RECEIVE_NEW_MESSAGE = "RECEIVE_NEW_MESSAGE",
}

export type ISocketAddEventListenerCallback = <T = undefined>(
  message: string,
  callbackName: CallbackType,
  callback: (data: ISocketResponse<T>) => void,
) => (data: ISocketResponse<T>) => void;

export type ISocketRemoveEventListenerCallback = (
  message: string,
  callbackName: CallbackType,
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
