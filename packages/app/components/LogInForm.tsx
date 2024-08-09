import { FC, useState, ChangeEvent, KeyboardEvent } from "react";

import { readDataUriFromFile } from "../lib/file";
import { useUserSession } from "../hooks/useUserSession";

const LogInForm: FC = () => {
  const { handleUserLogin, handleSetUserAvatar, user } = useUserSession();
  const { userAvatar } = user;

  const [username, setUsername] = useState("");

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value;
    setUsername(inputVal);
  };

  const handleUsernameKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleUserLogin(username);
      setUsername("");
    }
  };

  const handleUserAvatarChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    const dataUri = await readDataUriFromFile(file);
    handleSetUserAvatar(dataUri);
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-slate-800">
      <div className="flex flex-col gap-4 items-center">
        <div>
          <input
            id="avatar-upload"
            type="file"
            accept="image/png, image/jpe, image/jpeg, image/jpg"
            className="hidden"
            onChange={handleUserAvatarChange}
            data-testid="avatar-upload"
          />
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <div className="border border-solid border-white rounded-full p-1">
              <div className="w-20 h-20 overflow-hidden rounded-full">
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt="User Avatar"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <img
                    src="/avatar.svg"
                    alt="User Avatar"
                    className="bg-slate-100 w-full h-full  m-auto flex justify-center items-center"
                  />
                )}
              </div>
            </div>
          </label>
        </div>
        <div className="p-4 flex border border-solid border-white flex-col gap-4 rounded-md max-w-[320px] w-[320px]">
          <label htmlFor="username" className="text-white">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="py-2 px-4 rounded-md focus:outline-slate-400"
            autoComplete="off"
            placeholder="enter your username"
            value={username}
            onChange={handleUsernameChange}
            maxLength={30}
            onKeyDown={handleUsernameKeyDown}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
