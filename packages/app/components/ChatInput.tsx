import { useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";

import { KeyboardEventKey } from "../constants/keyboard";

type ChatInputProps = {
  sendMessage: (message: string) => void;
};

const KeyPressedMap: { [key: string]: boolean } = {};
// Three lines
const TEXTAREA_HEIGHT_LIMIT = 88;

const ChatInput = ({ sendMessage }: ChatInputProps) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    if (textareaRef?.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(TEXTAREA_HEIGHT_LIMIT, textareaRef.current.scrollHeight)}px`;
    }
    const newValue = e.currentTarget.value;
    setMessage(newValue);
  };

  const handleKeydown = useCallback(
    (e: React.KeyboardEvent) => {
      KeyPressedMap[e.key] = true;

      if (e.key === KeyboardEventKey.Enter && !KeyPressedMap["Shift"]) {
        e.preventDefault();
        // not allow to send empty message
        const trimmedMessage = message.trim();
        if (!trimmedMessage.length) {
          return;
        }

        sendMessage(message);
        setMessage("");

        if (textareaRef?.current) {
          textareaRef.current.style.height = "auto";
        }
      }
    },
    [sendMessage, message],
  );

  const handleKeyUp = useCallback((e: React.KeyboardEvent) => {
    KeyPressedMap[e.key] = false;
  }, []);

  return (
    <div className="w-screen p-2 bottom-0 bg-white dark:bg-black">
      <textarea
        ref={textareaRef}
        rows={1}
        className="h-auto w-full border border-[#4586f0] bg-transparent rounded-lg p-2 text-gray-800 dark:text-gray-100 resize-none"
        value={message}
        onChange={handleChange}
        onKeyDown={handleKeydown}
        onKeyUp={handleKeyUp}
        placeholder={t("ChatInputMessageInputPlaceholder")}
        autoFocus
      />
    </div>
  );
};

export default ChatInput;
