export enum StorageType {
  Local = "local",
  Session = "session",
}

export enum StorageKey {
  Username = "name",
  Messages = "messages",
}

export interface Message {
  id: string;
  userName: string;
  content: string;
  timestamp: number;
}
