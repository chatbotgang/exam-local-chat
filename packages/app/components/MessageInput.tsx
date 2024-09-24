import { Textarea } from "@chakra-ui/react";
import { memo, useState } from "react";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleKeyDown: React.ComponentProps<"textarea">["onKeyDown"] = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onSendMessage(message);
        setMessage("");
      }
    }
  };

  const handleChange: React.ComponentProps<"textarea">["onChange"] = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div style={{ position: "fixed", bottom: 0 }}>
      <Textarea
        width="100vw"
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        resize="none"
        placeholder="Type a message..."
        rows={1}
        maxLength={500}
        autoFocus
      />
    </div>
  );
};
export default memo(MessageInput);
