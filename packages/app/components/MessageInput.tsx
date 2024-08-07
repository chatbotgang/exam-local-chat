import { FC, useState, ChangeEvent, KeyboardEvent } from "react";

type MessageInputProps = {
  //
};

const MessageInput: FC<MessageInputProps> = () => {
  const [messageContent, setMessageContent] = useState("");
  const [isInputtingMandarin, setIsInputtingMandarin] = useState(false);

  const handleMessageContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const textContent = e.target.value;
    setMessageContent(textContent);
  };

  const handleMessageContentKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter" && !e.shiftKey && !isInputtingMandarin) {
      e.preventDefault();
      console.log(messageContent);
      //   handleSendText();
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-2">
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
