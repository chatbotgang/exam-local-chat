import { FC } from "react";

import { MessageDetail } from "../models/message";

type ReplySectionProps = {
  reply: MessageDetail;
  onSetReply: (replyDetail: MessageDetail | null) => void;
};

const ReplySection: FC<ReplySectionProps> = ({ reply, onSetReply }) => {
  return (
    <div className="bg-white bg-opacity-80 py-1 px-2 text-slate-800 flex items-center">
      <p className="flex-grow truncate">{reply.content}</p>
      <div
        className="bg-slate-200 hover:bg-slate-100 w-5 h-5 rounded-full flex justify-center items-center cursor-pointer flex-shrink-0 duration-500"
        onClick={() => onSetReply(null)}
      >
        <img src="/close.svg" alt="Close" />
      </div>
    </div>
  );
};

export default ReplySection;
