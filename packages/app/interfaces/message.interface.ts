export interface IMessage {
  name: string;
  type: MessageType;
  message: string;
  timestamp: number;
}

export enum MessageType {
  MESSAGE = "MESSAGE",
  SYSTEM = "SYSTEM",
}
