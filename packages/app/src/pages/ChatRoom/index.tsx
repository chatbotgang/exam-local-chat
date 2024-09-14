import { useMessage } from "@exam/app/src/hook/useMessage";
import React, { useState } from "react";

function ChatRoom() {
  const [inputText, setInputText] = useState("");
  const { messages, sendMessage } = useMessage();

  const handleSendMessage = () => {
    if (inputText.trim()) {
      sendMessage("User", inputText);
      setInputText("");
    }
  };

  return (
    <div>
      <h1>Broadcast Messages</h1>
      <div>
        {messages.map((msg, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={index}>
            <strong>{msg.user}:</strong>{" "}
            {msg.text.split("\n").map((line, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <React.Fragment key={i}>
                {line}
                {i < msg.text.split("\n").length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        ))}
      </div>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type a message"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
          }
        }}
      />
      <button type="button" onClick={handleSendMessage}>
        Send Message
      </button>
    </div>
  );
}

export default ChatRoom;
