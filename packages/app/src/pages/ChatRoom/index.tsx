import Cat from "@exam/app/src/components/Cat";
import { useMessage, useScroll } from "@exam/app/src/hook";
import React, { useCallback, useEffect, useRef, useState } from "react";

function ChatRoom({ userName }: { userName: string }) {
  const [inputText, setInputText] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { scrollTop, scrollToBottom, isScrolledAway } =
    useScroll(chatContainerRef);
  const { messages, sendUserMessage, sendJoinMessage, sendLeaveMessage } =
    useMessage();
  const firstMountRef = useRef(true);
  const lastMessagesCountRef = useRef(0);

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
  }, [sendJoinMessage, sendLeaveMessage, userName]);

  // scroll to bottom when messages are ready after the first mount
  useEffect(() => {
    if (messages.length > 0 && lastMessagesCountRef.current === 0) {
      lastMessagesCountRef.current = messages.length;
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
    if (lastMessagesCountRef.current === messages.length) {
      return;
    }
    lastMessagesCountRef.current = messages.length;
    // The scrollbar remains at the bottom unless manually scrolled away from the bottom
    if (!isScrolledAway) {
      scrollToBottom();
      // scroll to bottom when the last message is mine
    } else if (lastMessage?.user === userName) {
      scrollToBottom();
    }
  }, [messages, scrollToBottom, userName, isScrolledAway]);

  return (
    <div className="flex flex-col gap-4 h-full p-4">
      <h1 className="h-12 text-2xl font-bold flex justify-center items-center bg-[#f4f5f7] rounded-2xl border">
        Cat Messages
      </h1>
      <Cat progress={scrollTop + 30} className="w-1/2 top-0 left-1/2" />
      <Cat progress={scrollTop * 0.1} className="w-full -top-80 mr-40" />
      <Cat progress={scrollTop * 0.3} className="mt-20 -ml-40" />
      <div
        ref={chatContainerRef}
        className="flex-1 flex flex-col gap-4 overflow-y-auto z-10"
      >
        {messages.map((msg, index) => (
          <p
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={`text-xl py-4 px-4 bg-[#cbc2fa] rounded-2xl inline-block max-w-fit ${msg.user === userName ? "self-end" : ""}`}
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
