import { Box } from "@mui/material";
import type { Dispatch, FC, SetStateAction } from "react";
import { useEffect } from "react";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import useChatMessagesStore from "../../stores/useChatMessagesStore";
import useLocalUserStore from "../../stores/useLocalUserStore";
import Message from "./Message";

interface MessagesProps {
  shouldAutoScrollToBottom: boolean;
  setShouldAutoScrollToBottom: Dispatch<SetStateAction<boolean>>;
}

const Messages: FC<MessagesProps> = ({
  shouldAutoScrollToBottom,
  setShouldAutoScrollToBottom,
}) => {
  const localUsername = useLocalUserStore((state) => state.localUsername);
  const chatMessages = useChatMessagesStore((state) => state.chatMessages);

  const { rootRef: chatBoxRef, targetRef: messagesEndRef } =
    useIntersectionObserver<HTMLDivElement>({
      onIntersect: (isIntersecting) =>
        setShouldAutoScrollToBottom(isIntersecting),
    });

  useEffect(() => {
    if (shouldAutoScrollToBottom && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, shouldAutoScrollToBottom, messagesEndRef]);

  return (
    <Box
      ref={chatBoxRef}
      sx={{
        width: "100%",
        flex: 1,
        overflowY: "auto",
        padding: "8px",
        border: "1px solid",
        borderColor: "primary.contrastText",
        borderRadius: 2,
        whiteSpace: "pre",
      }}
    >
      {chatMessages.map((chatMessage) => (
        <Message
          key={chatMessage.id}
          localUsername={localUsername}
          chatMessage={chatMessage}
        />
      ))}
      <div ref={messagesEndRef} style={{ height: "1px" }} />
    </Box>
  );
};

export default Messages;
