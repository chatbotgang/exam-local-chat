import { MessageType } from "../constants/messageType";

type MessageProps = {
  username: string;
  messageType: string;
  timestamp?: number;
  text?: string;
};

const getTimeFormatFromTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);

  return date.toTimeString().slice(0, 8);
};

const Message = ({ username, messageType, timestamp, text }: MessageProps) => {
  if (messageType === MessageType.Left) {
    return (
      <div className="text-gray-400 mt-2 italic">
        {" "}
        <span className="text-gray-500 dark:text-gray-200">
          {username}
        </span>{" "}
        left{" "}
      </div>
    );
  }

  if (messageType === MessageType.Joined) {
    return (
      <div className="text-gray-400 mt-2 italic">
        {" "}
        <span className="text-gray-500 dark:text-gray-200">
          {username}
        </span>{" "}
        joined{" "}
      </div>
    );
  }

  return (
    <div className="mt-2">
      <div className="text-gray-500 dark:text-gray-200 mb-1">{username}</div>
      {timestamp && (
        <div className="text-gray-500 text-xs mb-1">
          {getTimeFormatFromTimestamp(timestamp)}
        </div>
      )}
      <div className="bg-gray-300 dark:bg-gray-500 p-2 rounded-lg w-fit text-gray-800 dark:text-white">
        {text}
      </div>
    </div>
  );
};

export default Message;
