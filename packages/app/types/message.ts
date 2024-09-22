export enum ChatMessageType {
  Joined = "joined",
  Text = "text",
}

export interface ChatMessage {
  id: string;
  timestamp: number;
  type: ChatMessageType;
  username: string;
  message?: string;
}
