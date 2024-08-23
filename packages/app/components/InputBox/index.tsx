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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputText.trim()) {
      const messages = JSON.parse(
        localStorage.getItem("messages") || "[]",
      ) as message[];

      localStorage.setItem(
        "messages",
        JSON.stringify([...messages, { username, text: inputText }]),
      );
      // manually dispatch storage event to update current tab
      window.dispatchEvent(new Event("storage"));
      setInputText("");
    }
  };

  return (
    <div className="p-4">
      <div className="mb-2 text-sm text-gray-600">使用者: {username}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="輸入訊息"
          className="rounded border p-2"
        />
        <button
          type="submit"
          className="ml-2 rounded bg-blue-500 p-2 text-white"
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
      </form>
    </div>
  );
}

export default InputBox;
