import { z } from "zod";

export const MessageSchema = z.object({
  user: z.string(),
  time: z.number(),
  text: z.string(),
});

export type Message = z.infer<typeof MessageSchema>;

export function createSystemMessage(text: string): Message {
  return createUserMessage("system", text);
}

export function createUserMessage(user: string, text: string): Message {
  return MessageSchema.parse({
    user,
    text,
    time: Date.now(),
  });
}

// manage the lifecycle of the broadcast channel
export class BroadcastMessage {
  private channel: BroadcastChannel;
  private currentListener: ((event: MessageEvent) => void) | null = null;

  constructor(channelName: string) {
    this.channel = new BroadcastChannel(channelName);
  }

  sendMessage(message: Message) {
    this.channel.postMessage(JSON.stringify(message));
  }

  receiveMessage(callback: (message: Message) => void) {
    // Remove the previous listener if it exists
    this.removeListener();

    // Create a new listener
    this.currentListener = (event: MessageEvent) => {
      try {
        const parsedData = JSON.parse(event.data);
        const validatedMessage = MessageSchema.parse(parsedData);
        callback(validatedMessage);
      } catch (error) {
        console.error("Invalid message received:", error);
      }
    };

    // Add the new listener
    this.channel.addEventListener("message", this.currentListener);
  }

  removeListener() {
    if (this.currentListener) {
      this.channel.removeEventListener("message", this.currentListener);
      this.currentListener = null;
    }
  }

  close() {
    this.removeListener();
    this.channel.close();
  }
}
