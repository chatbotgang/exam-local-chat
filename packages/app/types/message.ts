export enum ChatMessageType {
  Joined = "joined",
  Text = "text",
  Left = "left",
}

export interface ChatMessage {
  id: string;
  timestamp: number;
  type: ChatMessageType;
  username: string;
  message?: string;
}

export type ChatMessageWithoutIdAndTimestamp = Omit<
  ChatMessage,
  "id" | "timestamp"
>;
