export type MessageDetail = {
  id: string;
  avatar: string;
  name: string;
  content: string;
};

export interface Message {
  id: string;
  type: string;
  main: MessageDetail;
  reply: MessageDetail | null;
  createdAt: number;
}
