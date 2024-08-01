import { useRef, useState, useEffect } from "react";
import { MessageType, IMessage } from "../constants/message";

const getTimeFormatFromTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);

  return date.toTimeString().slice(0, 8);
};

type MessageProps = IMessage & {
  historyRef: React.RefObject<HTMLDivElement>;
};

const Message = ({
  historyRef,
  username,
  messageType,
  timestamp,
  text,
}: MessageProps) => {
  const messageRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isInViewPort, setIsInViewPort] = useState(true);

  const renderMessageByType = () => {
    if (!isInViewPort) {
      return null;
    }

    if (messageType === MessageType.Left) {
      return (
        <div className="text-gray-400 italic">
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
        <div className="text-gray-400 italic">
          {" "}
          <span className="text-gray-500 dark:text-gray-200">
            {username}
          </span>{" "}
          joined{" "}
        </div>
      );
    }

    if (messageType === MessageType.Text) {
      return (
        <>
          <div className="text-gray-500 dark:text-gray-200 mb-1">
            {username}
          </div>
          {timestamp && (
            <div className="text-gray-500 text-xs mb-1">
              {getTimeFormatFromTimestamp(timestamp)}
            </div>
          )}
          <div className="bg-gray-300 dark:bg-gray-500 p-2 rounded-lg w-fit text-gray-800 dark:text-white whitespace-pre-wrap">
            {text}
          </div>
        </>
      );
    }

    return null;
  };

  useEffect(() => {
    if (historyRef.current && messageRef.current && !observerRef.current) {
      // create observer
      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry: IntersectionObserverEntry | undefined = entries[0];
          if (!entry) return;
          if (entry.isIntersecting) {
            setIsInViewPort(true);
          } else {
            setIsInViewPort(false);
          }
        },
        {
          root: historyRef.current,
          // message will visible / hidden with 20px top / bottom out of history container
          rootMargin: "20px 0px 20px 0px",
        },
      );
      // start observing
      observerRef.current.observe(messageRef.current as HTMLDivElement);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.unobserve(messageRef.current as HTMLDivElement);
        observerRef.current = null;
      }
    };
  }, [historyRef]);

  return (
    <div
      ref={messageRef}
      className="mt-2"
      style={{
        // dynamic setting height to keep the history scroll height
        height: isInViewPort ? "auto" : messageRef.current?.clientHeight,
      }}
    >
      {renderMessageByType()}
    </div>
  );
};

export default Message;
