// @ts-check
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { KeyboardEventKey } from "../constants/keyboard";

type UserFromProps = {
  onUsernameSubmit: (username: string) => void;
};

const UserForm = ({ onUsernameSubmit }: UserFromProps) => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");

  const handleUsernameChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const newValue = e.currentTarget.value;
      setUsername(newValue);
    },
    [],
  );

  const handleUsernameKeydown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === KeyboardEventKey.Enter) {
        e.preventDefault();
        onUsernameSubmit(username);
      }
    },
    [username, onUsernameSubmit],
  );

  return (
    <div className="bg-white dark:bg-black flex justify-center items-center flex-1">
      <div className="w-fit border border-gray-200 dark:border-gray-700 rounded-lg flex flex-col p-4 h-fit">
        <label
          htmlFor="input-username"
          className="text-gray-800 mb-2 dark:text-gray-100"
        >
          {t("UserFormUsername")}
        </label>
        <input
          id="input-username"
          type="text"
          className="w-80 border border-[#4586f0] bg-transparent rounded-lg p-2 text-gray-100"
          value={username}
          onChange={handleUsernameChange}
          onKeyDown={handleUsernameKeydown}
          placeholder={t("UserFormUsernamePlaceholder")}
          autoFocus
        />
      </div>
    </div>
  );
};

export default UserForm;
