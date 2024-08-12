import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { CurrentUserContext } from "../Contexts";
import { useBroadcastChannel } from "../hooks/useBroadcastChannel";
import { MESSAGES } from "../constants/localStorage";
import { useLocalStorage } from "usehooks-ts";

const CHANNEL_NAME = "exam-local-chat-channel";

type MessageData = {
  user: string;
  message: string;
  timestamp: number;
  status: "Joined" | "Left" | undefined;
};
export default function ChatRoom() {
  const currentUserContext = useContext(CurrentUserContext);
  const currentUser = currentUserContext?.currentUser ?? "";

  const [messagesValue, setMessagesValue] = useLocalStorage<MessageData[]>(
    MESSAGES,
    [],
  );
  const { data, post } = useBroadcastChannel<MessageData, MessageData>({
    name: CHANNEL_NAME,
  });

  const [message, setMessage] = useState<string>("");
  const [localTimestamp, setLocalTimestamp] = useState<number>(0);
  const [messageDataList, setMessageDataList] = useState<MessageData[]>([]);
  const messagesWrapperRef = useRef<HTMLDivElement | null>(null);
  const contenteditableRef = useRef<HTMLDivElement | null>(null);

  function handleInput(event: React.FormEvent<HTMLDivElement>) {
    setMessage(event.currentTarget.innerText);
  }
  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
    }
  }
  function handleKeyUp(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      if (contenteditableRef.current === null) return;

      const isOnlySpacesOrLineBreaks =
        message.replace(/[\s\r\n]+/g, "").length === 0;

      if (!isOnlySpacesOrLineBreaks) {
        handlePostMessageData({
          message: contenteditableRef.current.innerHTML,
          status: undefined,
        });
        setMessage("");
        contenteditableRef.current.innerHTML = "";
      }
    }
  }

  const handlePostMessageData = useCallback(
    (messageData: Omit<MessageData, "user" | "timestamp">) => {
      const timestamp = Date.now();
      const data: MessageData = {
        user: currentUser,
        message: messageData.message,
        timestamp,
        status: messageData.status,
      };
      post(data);
      setMessageDataList((prevDataList) => {
        setMessagesValue([...prevDataList, data]);
        return [...prevDataList, data];
      });
      setLocalTimestamp(timestamp);
    },
    [currentUser, setMessagesValue, post],
  );

  useEffect(() => {
    // Initialize message data list
    if (messagesValue !== undefined) {
      setMessageDataList(messagesValue);
    }
  }, [messagesValue]);

  useEffect(() => {
    // Get data from the channel and add to message data list
    if (data !== undefined) {
      setMessageDataList((prevDataList) => [...prevDataList, data]);
    }
  }, [data]);

  useEffect(() => {
    // Handle user joined
    handlePostMessageData({
      message: "",
      status: "Joined",
    });
  }, [handlePostMessageData]);

  useEffect(() => {
    function handleUserLeft() {
      handlePostMessageData({
        message: "",
        status: "Left",
      });
    }

    window.addEventListener("beforeunload", handleUserLeft);

    return () => {
      window.removeEventListener("beforeunload", handleUserLeft);
    };
  }, [handlePostMessageData]);

  // When a message is sent by me (current tab's user), the scrollbar automatically scrolls to the bottom
  useEffect(() => {
    if (messagesWrapperRef.current !== null) {
      messagesWrapperRef.current.scrollTop =
        messagesWrapperRef.current.scrollHeight;
    }
  }, [localTimestamp]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full flex flex-col">
        <div
          ref={messagesWrapperRef}
          className="h-64 my-6 overflow-x-hidden overflow-y-auto"
        >
          <div className="flex flex-col">
            {messageDataList.map((item, index) => (
              <div key={index}>
                <div>
                  <span className="text-green-500 text-lg">{item.user}</span>
                  <span className="ml-1 text-gray-500 text-sm">
                    {item.status}
                  </span>
                  <span className="ml-1 text-gray-500 text-xs">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div
                  className="dark:text-white"
                  dangerouslySetInnerHTML={{ __html: item.message }}
                />
              </div>
            ))}
          </div>
        </div>
        <div
          ref={contenteditableRef}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 empty:before:content-[attr(aria-placeholder)] empty:before:text-gray-500"
          contentEditable
          suppressContentEditableWarning
          aria-placeholder="Type your message"
          onInput={handleInput}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
}
