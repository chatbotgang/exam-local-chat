import { useMessage, useScroll } from "@exam/app/src/hook";
import React, { useCallback, useEffect, useState } from "react";

function ChatRoom({ userName }: { userName: string }) {
  const [inputText, setInputText] = useState("");
  const chatContainerRef = React.useRef<HTMLDivElement>(null);
  const { scrollToBottom, isScrolledAway } = useScroll(chatContainerRef);
  const { messages, sendUserMessage, sendJoinMessage, sendLeaveMessage } =
    useMessage();
  const firstMountRef = React.useRef(true);
  const hasMessagesReadyRef = React.useRef(false);

  useEffect(() => {
    // in React practice, we should use useRef to manage the first mount state
    if (firstMountRef.current) {
      firstMountRef.current = false;
      sendJoinMessage(userName);
    }

    const handleLeave = () => {
      sendLeaveMessage(userName);
    };

    // in React practice, we should use the beforeunload event to handle the leave event
    window.addEventListener("beforeunload", handleLeave);

    return () => {
      window.removeEventListener("beforeunload", handleLeave);
    };
    // we should not rely on empty dependency to trigger only once, the strict mode will trigger the effect twice
  }, [sendJoinMessage, sendLeaveMessage, userName, scrollToBottom]);

  // scroll to bottom when messages are ready after the first mount
  useEffect(() => {
    if (messages.length > 0 && !hasMessagesReadyRef.current) {
      hasMessagesReadyRef.current = true;
      scrollToBottom();
    }
  }, [messages, scrollToBottom]);

  const handleSendMessage = useCallback(() => {
    // Messages containing only spaces or line breaks are not allowed to be sent.
    if (inputText.trim()) {
      sendUserMessage(userName, inputText);
      setInputText("");
    }
  }, [inputText, sendUserMessage, setInputText, userName]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (!isScrolledAway) {
      scrollToBottom();
    } else if (lastMessage?.user === userName) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom, userName, isScrolledAway]);

  return (
    <div className="flex flex-col gap-4 h-full p-4 ">
      <h1 className="h-12 text-2xl font-bold flex justify-center items-center bg-[#f4f5f7] rounded-2xl border">
        Cat Messages
      </h1>
      <div
        ref={chatContainerRef}
        className="flex-1 flex flex-col gap-4 overflow-y-auto"
      >
        {messages.map((msg, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <p
            key={index}
            className="text-xl py-4 px-4 bg-[#cbc2fa] rounded-2xl inline-block max-w-fit"
          >
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
      <div className="h-36 flex gap-2 p-4 items-center bg-[#f7f5ff] rounded-2xl border">
        <textarea
          className="h-full flex-1 resize-none bg-transparent outline-none "
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
        <button
          className="h-16 p-4 bg-[#110c2b] text-white rounded-md"
          type="button"
          onClick={handleSendMessage}
        >
          {`Enter ₍^⸝⸝> ·̫ <⸝⸝ ^₎`}
        </button>
      </div>
    </div>
  );
}

export default ChatRoom;
