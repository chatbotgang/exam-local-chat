import { useState } from "react";

import { message } from "../../types";

function InputBox({
  username,
  setUsername,
}: {
  username: string;
  setUsername: (username: string) => void;
}) {
  const [inputText, setInputText] = useState("");

  const isInputValid = () => inputText.trim().length > 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isInputValid()) {
      const messages = JSON.parse(
        localStorage.getItem("messages") || "[]",
      ) as message[];

      localStorage.setItem(
        "messages",
        JSON.stringify([...messages, { username, text: inputText }]),
      );

      // manually dispatch storage event for updating current tab
      window.dispatchEvent(new Event("storage"));

      setInputText("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-2 text-sm text-gray-600">使用者: {username}</div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="輸入訊息，按 Enter 發送，按 Shift+Enter 換行"
          className="h-24 w-full resize-y rounded border p-2"
        />
        <div className="mt-2">
          <button
            type="submit"
            className="rounded bg-blue-500 p-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!isInputValid()}
          >
            發送
          </button>
          <button
            type="button"
            onClick={() => setUsername("")}
            className="ml-2 rounded bg-red-500 p-2 text-white"
          >
            登出
          </button>
        </div>
      </form>
    </div>
  );
}

export default InputBox;
