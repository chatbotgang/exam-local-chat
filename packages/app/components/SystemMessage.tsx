import { FC } from "react";

import { Message } from "../models/message";

type SystemMessageProps = {
  message: Message;
};

const SystemMessage: FC<SystemMessageProps> = ({ message }) => {
  return (
    <div className="bg-slate-50 bg-opacity-10 w-full text-center rounded-lg p-2">
      <p className="text-md break-words whitespace-pre-wrap text-white">
        {message.main.content}
      </p>
    </div>
  );
};

export default SystemMessage;
