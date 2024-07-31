import { MessageType } from "../constants/messageType";

import Message from "./Message";
import ChatInput from "./ChatInput";

const ChatRoom = () => {
  const handleSendMessage = (message: string) => {
    console.log(message);
  };

  return (
    <div className="bg-white dark:bg-black w-screen flex flex-1 flex-col justify-between overflow-hidden">
      <div className="flex-initial overflow-y-auto p-4">
        <Message username="test1" messageType={MessageType.Joined} />
        <Message username="test2" messageType={MessageType.Left} />
        <Message
          username="test3"
          messageType={MessageType.Text}
          timestamp={Date.now()}
          text="Hello"
        />
      </div>
      <ChatInput sendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatRoom;
