import useChatHistory from "@/hooks/useChatHistory";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useCallback, useEffect, useRef } from "react";
import Message from "./Message";

interface ChatHistoryProps {
  className?: string;
}

export default function ChatHistory({ className }: ChatHistoryProps) {
  const { curUserName } = useCurrentUser();
  const { loading, hasMore, chatHistory, loadMoreMessages } = useChatHistory();
  const chatContainerRef = useRef<HTMLUListElement>(null);

  const handleScroll = useCallback(() => {
    if (chatContainerRef.current) {
      if (chatContainerRef.current.scrollTop === 0 && hasMore && !loading) {
        loadMoreMessages();
      }
    }
  }, [hasMore, loading, loadMoreMessages]);

  useEffect(() => {
    const container = chatContainerRef.current;
    container?.scrollTo({
      top:
        container.getBoundingClientRect().height +
        container.getBoundingClientRect().y,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const container = chatContainerRef.current;
    const latestMessage = chatHistory.at(-1);
    if (container && latestMessage?.username === curUserName) {
      container?.scrollTo({
        top:
          container.getBoundingClientRect().height +
          container.getBoundingClientRect().y,
        behavior: "smooth",
      });
    }
  }, [chatHistory]);

  return (
    <div className={`h-full overflow-auto bg-black bg-opacity-90 ${className}`}>
      {loading && <p className="p-2 text-center">Loading more messages...</p>}
      <ul ref={chatContainerRef} onScroll={handleScroll}>
        {chatHistory.map((msg) => (
          <li key={msg.id} className="w-fit">
            <Message messageInfo={msg} />
          </li>
        ))}
      </ul>
    </div>
  );
}
