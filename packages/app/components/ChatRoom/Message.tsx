import { Box, Typography } from "@mui/material";
import type { FC } from "react";
import { type ChatMessage, ChatMessageType } from "../../types/message";

interface MessageProps {
  localUsername: string;
  chatMessage: ChatMessage;
}

const Message: FC<MessageProps> = ({ localUsername, chatMessage }) => {
  const { type, username } = chatMessage;
  const isTextTypeMessage = type === ChatMessageType.Text;
  const isLocalUserMessage = localUsername === username;

  return isTextTypeMessage ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: isLocalUserMessage ? "flex-end" : "flex-start",
      }}
    >
      {!isLocalUserMessage && (
        <Typography variant="body2" sx={{ margin: "0 2px" }}>
          {username}
        </Typography>
      )}
      <Box
        sx={{
          backgroundColor: isLocalUserMessage ? "primary.dark" : "grey.600",
          color: "white",
          padding: "8px 12px",
          borderRadius: "8px",
          margin: "8px 0",
          maxWidth: "85%",
        }}
      >
        <Typography
          variant="body1"
          sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {chatMessage.message}
        </Typography>
      </Box>
    </Box>
  ) : (
    <Box sx={{ margin: "4px 0" }}>
      <Typography variant="body1" align="center" sx={{ fontStyle: "italic" }}>
        {`${chatMessage.username} ${chatMessage.type}`}
      </Typography>
    </Box>
  );
};

export default Message;
