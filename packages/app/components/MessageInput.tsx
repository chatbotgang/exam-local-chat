import { FC, useState, ChangeEvent, KeyboardEvent } from "react";

import { Message, MessageDetail } from "../models/message";
import { MessageType } from "../enums/message";
import { generateId } from "../lib/id";
import { useUserSession } from "../hooks/useUserSession";

type MessageInputProps = {
  reply: MessageDetail | null;
  onSetReply: (replyDetail: MessageDetail | null) => void;
  onSendMessage: (message: Message) => void;
};

const MessageInput: FC<MessageInputProps> = ({
  onSendMessage,
  onSetReply,
  reply,
}) => {
  const { user } = useUserSession();

  const [messageContent, setMessageContent] = useState("");
  const [isInputtingMandarin, setIsInputtingMandarin] = useState(false);

  const handleMessageContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textContent = e.target.value;
    setMessageContent(textContent);
  };

  const handleSendMessage = (messageContent: string) => {
    const messageText = messageContent.trim();
    if (messageText.length === 0) {
      setMessageContent("");
      onSetReply(null);
      return;
    }

    const message = {
      id: generateId(),
      type: MessageType.TEXT,
      main: {
        ...user,
        content: messageContent,
      },
      reply,
      createdAt: Date.now(),
    };

    onSendMessage(message);
    setMessageContent("");
    onSetReply(null);
  };

  const handleMessageContentKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter" && !e.shiftKey && !isInputtingMandarin) {
      e.preventDefault();
      handleSendMessage(messageContent);
    }
  };

  return (
    <div className="p-2">
      <textarea
        value={messageContent}
        onChange={handleMessageContentChange}
        onCompositionStart={() => setIsInputtingMandarin(true)}
        onCompositionEnd={() => setIsInputtingMandarin(false)}
        onKeyDown={handleMessageContentKeyDown}
        rows={1}
        maxLength={500}
        className="h-auto w-full py-2 px-4 focus:outline-slate-400 resize-none rounded-md"
        placeholder="Type a message..."
        autoFocus
      />
    </div>
  );
};

export default MessageInput;
