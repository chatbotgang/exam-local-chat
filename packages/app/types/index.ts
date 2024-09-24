export interface MessageType {
  user?: string;
  timestamp: number;
  message: string;
  system?: boolean;
}