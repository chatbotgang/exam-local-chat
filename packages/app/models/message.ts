import { MessageType } from "../enums/message";

export type MessageDetail = {
  userAvatar: string;
  username: string;
  content: string;
};

export interface Message {
  id: string;
  type: MessageType;
  main: MessageDetail;
  reply: MessageDetail | null;
  createdAt: number;
}
