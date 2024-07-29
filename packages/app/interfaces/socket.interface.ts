import { Socket } from "socket.io-client";

export enum CallbackNameType {
  GET_MESSAGE = "GET_MESSAGE",
  SCROLL_TO_BOTTOM = "SCROLL_TO_BOTTOM",
}

export type ISocketAddEventListenerCallback = <T = undefined>(
  message: string,
  callbackName: CallbackNameType,
  callback: (data: ISocketResponse<T>) => void,
) => (data: ISocketResponse<T>) => void;

export type ISocketRemoveEventListenerCallback = (
  message: string,
  callbackName: CallbackNameType,
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
