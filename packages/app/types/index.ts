export enum StorageType {
  Local = "local",
  Session = "session",
}

export enum StorageKey {
  Username = "name",
  Messages = "messages",
}

export interface Message {
  type: "message";
  id: string;
  userName: string;
  content: string;
  timestamp: number;
}

export interface SystemText {
  type: "system";
  id: string;
  content: string;
}

export interface getMessageProps {
  type: "NEW_MESSAGE" | "USER_JOINED" | "USER_LEFT";
  content?: string;
}
