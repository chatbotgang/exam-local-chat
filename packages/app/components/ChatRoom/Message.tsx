import { Box, Typography } from "@mui/material";
import type { FC } from "react";
import { type ChatMessage, ChatMessageType } from "../../types/message";
import { convertTimestampToLocalTime } from "../../utils/time";

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
        margin: "12px 0",
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
          margin: "4px 0",
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
      <Typography variant="caption" sx={{ margin: "0 2px" }}>
        {convertTimestampToLocalTime(chatMessage.timestamp)}
      </Typography>
    </Box>
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "4px 0",
        fontStyle: "italic",
      }}
    >
      <Typography variant="body1">
        {`${chatMessage.username} ${chatMessage.type}`}
      </Typography>
      <Typography variant="caption" sx={{ margin: "0 8px" }}>
        {convertTimestampToLocalTime(chatMessage.timestamp)}
      </Typography>
    </Box>
  );
};

export default Message;
