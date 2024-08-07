import { FC } from "react";
import moment from "moment";

import { Message, MessageDetail } from "../models/message";
import { MessageType } from "../enums/message";

type MessageItemProps = {
  message: Message;
  username: string;
  onSetReply: (replyDetail: MessageDetail | null) => void;
};

const MessageItem: FC<MessageItemProps> = ({
  message,
  username,
  onSetReply,
}) => {
  const isMyMessage = username === message.main.username;

  return (
    <>
      {message.type === MessageType.SYSTEM && (
        <>
          <div className="bg-slate-50 bg-opacity-10 w-full text-center rounded-lg p-2">
            <p className="text-md break-words whitespace-pre-wrap text-white">
              {message.main.content}
            </p>
          </div>
        </>
      )}
      {message.type === MessageType.TEXT && (
        <div
          className={`flex gap-2 ${isMyMessage ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`w-8 h-8 overflow-hidden rounded-full flex-shrink-0 ${isMyMessage ? "order-2" : "order-1"}`}
          >
            {message.main.userAvatar ? (
              <img
                src={message.main.userAvatar}
                alt="User Avatar"
                className="object-cover w-full h-full"
              />
            ) : (
              <img
                src="/avatar.svg"
                alt="User Avatar"
                className="bg-slate-400 w-full h-full  m-auto flex justify-center items-center"
              />
            )}
          </div>
          <div className={`${isMyMessage ? "order-1" : "order-2"}`}>
            {message.reply && (
              <div className="flex items-center gap-2 min-w-32 max-w-60 border-slate-400 border-solid border-b bg-slate-100 rounded-t-xl p-2">
                <div
                  className={`w-4 h-4 overflow-hidden rounded-full flex-shrink-0`}
                >
                  {message.reply.userAvatar ? (
                    <img
                      src={message.reply.userAvatar}
                      alt="User Avatar"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <img
                      src="/avatar.svg"
                      alt="User Avatar"
                      className="bg-slate-400 w-full h-full m-auto flex justify-center items-center"
                    />
                  )}
                </div>
                <div className="w-10/12">
                  <p className="text-slate-800 text-xs truncate">
                    {message.reply.username}
                  </p>
                  <p className="text-slate-400 text-xs truncate">
                    {message.reply.content}
                  </p>
                </div>
              </div>
            )}
            <div
              className={`bg-slate-100 min-w-32 max-w-60 p-4 rounded-b-xl ${message.reply ? "rounded-t-none" : "rounded-t-xl"} flex flex-col gap-2`}
            >
              <p className="font-semibold text-slate-800 truncate">
                {message.main.username}
              </p>
              <p className="text-md break-words whitespace-pre-wrap text-slate-800 mb-8">
                {message.main.content}
              </p>
              <span className="text-xs text-slate-400">
                {moment(message.createdAt).format("MM/DD HH:mm:ss")}
              </span>
            </div>
          </div>
          {!isMyMessage && (
            <div
              className="order-3 w-4 h-4 rounded-full bg-slate-400 self-end cursor-pointer"
              onClick={() => onSetReply(message.main)}
            >
              <img src="/arrow.svg" alt="Reply Arrow" />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MessageItem;
