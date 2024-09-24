import { useState } from "react";

interface MessageInputProps {
  onSendMessage: (content: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleKeyDown: React.ComponentProps<"textarea">["onKeyDown"] = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      //   e.preventDefault();
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
      <textarea
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        // rows={3}
      />
    </div>
  );
};
export default MessageInput;
