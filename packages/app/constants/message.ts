export enum MessageType {
  Text = "text",
  Joined = "joined",
  Left = "left",
}

export interface IMessage {
  username: string;
  messageType: string;
  timestamp: number | undefined;
  text: string | undefined;
}
