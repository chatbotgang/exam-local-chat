import { FC } from "react";

import MessageInput from "./MessageInput";

type ChatroomProps = {
  //
};

const Chatroom: FC<ChatroomProps> = () => {
  return (
    <div className="w-full h-full bg-slate-800">
      <MessageInput />
    </div>
  );
};

export default Chatroom;
