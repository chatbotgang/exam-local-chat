import { useState } from "react";

function LoginBox({
  setUsername,
}: {
  setUsername: (username: string) => void;
}) {
  const [inputUsername, setInputUsername] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputUsername) {
      setUsername(inputUsername);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          placeholder="輸入顯示名稱"
          className="rounded border p-2"
        />
        <button
          type="submit"
          className="ml-2 rounded bg-blue-500 p-2 text-white"
        >
          登入
        </button>
      </form>
    </div>
  );
}

export default LoginBox;
