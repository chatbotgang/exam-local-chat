import { useContext, useState } from "react";
import { CurrentUserContext } from "../Contexts";

export default function UsernameInput() {
  const currentUserContext = useContext(CurrentUserContext);
  const [username, setUsername] = useState<string>("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value.trim());
  }
  function handleKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      if (username.length > 0) {
        currentUserContext?.login(username);
      }
    }
  }

  return (
    <div className="mt-6 w-64">
      <div>
        <label
          htmlFor="username-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Username
        </label>
        <input
          type="text"
          id="username-input"
          value={username}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onKeyUp={handleKeyUp}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
