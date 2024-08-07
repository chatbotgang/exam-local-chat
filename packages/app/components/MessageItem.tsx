import { FC } from "react";
import { Message } from "../models/message";

type MessageItemProps = {
  message: Message;
  username: string;
};

const MessageItem: FC<MessageItemProps> = ({ message, username }) => {
  return (
    <div
      className={`flex ${username === message.main.username ? "justify-end" : "justify-start"}`}
    >
      <div className="bg-slate-100 w-fit p-4 rounded-md max-w-60 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 overflow-hidden rounded-full flex-shrink-0">
            {message.main.userAvatar ? (
              <img
                src={message.main.userAvatar}
                alt="User Avatar"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="bg-slate-400 w-full h-full  m-auto flex justify-center items-center"></div>
            )}
          </div>
          <p className="font-semibold text-slate-800 truncate">
            {message.main.username}
          </p>
        </div>
        <div className="text-md break-words whitespace-pre-wrap text-slate-800 mb-2">
          {message.main.content}
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
