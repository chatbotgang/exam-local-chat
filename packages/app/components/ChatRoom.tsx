import Message from "./Message";
import ChatInput from "./ChatInput";

import useMessageAction from "../hooks/useMessages";
import { IMessage } from "../constants/message";

type ChatRoomProps = {
  currentUser: string;
};

const ChatRoom = ({ currentUser }: ChatRoomProps) => {
  const { sendTextMessage, messages } = useMessageAction({
    currentUser,
  });

  const handleTextMessage = (message: string) => {
    sendTextMessage(message);
    // TODO: scroll to bottom
  };

  return (
    <div className="bg-white dark:bg-black w-screen flex flex-1 flex-col justify-between overflow-hidden">
      <div className="flex-initial overflow-y-auto p-4">
        {messages.map((message: IMessage) => (
          <Message
            key={message.timestamp}
            username={message.username}
            messageType={message.messageType}
            timestamp={message.timestamp}
            text={message.text}
          />
        ))}
      </div>
      <ChatInput sendMessage={handleTextMessage} />
    </div>
  );
};

export default ChatRoom;
