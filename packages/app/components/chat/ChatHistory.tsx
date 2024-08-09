import useChatHistory from "@/hooks/useChatHistory";
import useCurrentUser from "@/hooks/useCurrentUser";
import CircularProgress from "@mui/material/CircularProgress";
import { debounce } from "lodash";
import { useCallback, useEffect, useRef } from "react";
import Message from "./Message";

interface ChatHistoryProps {
  className?: string;
}

export default function ChatHistory({ className }: ChatHistoryProps) {
  const { curUserName } = useCurrentUser();
  const { loading, hasMore, chatHistory, loadMoreMessages } = useChatHistory();
  const chatContainerRef = useRef<HTMLUListElement>(null);
  const lastMessageRef = useRef<HTMLLIElement>(null);

  const handleScroll = useCallback(
    debounce(() => {
      if (chatContainerRef.current) {
        if (chatContainerRef.current.scrollTop === 0 && hasMore && !loading) {
          loadMoreMessages();
        }
      }
    }, 300),
    [hasMore, loading, loadMoreMessages],
  );

  useEffect(() => {
    const container = lastMessageRef.current;
    container?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const container = lastMessageRef.current;
    const latestMessage = chatHistory.at(-1);
    if (container && latestMessage?.username === curUserName) {
      container?.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div
      onScroll={handleScroll}
      className={`h-full overflow-auto bg-black bg-opacity-90 ${className}`}
    >
      {loading && (
        <div className="py-5 text-center">
          <CircularProgress />
        </div>
      )}
      <ul ref={chatContainerRef}>
        {chatHistory.map((msg, index) => {
          if (index === chatHistory.length - 1) {
            return (
              <li ref={lastMessageRef} key={msg.id} className="w-fit">
                <Message messageInfo={msg} />
              </li>
            );
          }
          return (
            <li key={msg.id} className="w-fit">
              <Message messageInfo={msg} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
