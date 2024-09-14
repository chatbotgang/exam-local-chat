import { useMessage } from "@exam/app/src/hook/useMessage";
import React, { useCallback, useEffect, useState } from "react";

function ChatRoom({ userName }: { userName: string }) {
  const [inputText, setInputText] = useState("");
  const { messages, sendUserMessage, sendJoinMessage, sendLeaveMessage } =
    useMessage();
  const firstMountRef = React.useRef(true);

  useEffect(() => {
    if (firstMountRef.current) {
      firstMountRef.current = false;
      sendJoinMessage(userName);
    }

    const handleLeave = () => {
      sendLeaveMessage(userName);
    };

    window.addEventListener("beforeunload", handleLeave);

    return () => {
      window.removeEventListener("beforeunload", handleLeave);
    };
  }, [sendJoinMessage, sendLeaveMessage, userName]); // Empty dependency array ensures this effect runs only once on mount and cleanup

  const handleSendMessage = useCallback(() => {
    // Messages containing only spaces or line breaks are not allowed to be sent.
    if (inputText.trim()) {
      sendUserMessage(userName, inputText);
      setInputText("");
    }
  }, [inputText, sendUserMessage, setInputText, userName]);

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
          // Pressing Enter sends the message, and Shift + Enter sends line breaks.
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
