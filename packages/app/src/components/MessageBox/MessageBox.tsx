import { Avatar, Box, Button, Divider, Popover } from "@mui/material";
import useUserName from "../../hooks/useUserName";
import { Message } from "../../types/message";
import dayjs from "dayjs";
import Markdown from "markdown-to-jsx";
import condSwitch from "condition-switch";
import { useState } from "react";

function scrollToId(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView();
  }
}

interface MessageBoxProps {
  message: Message;
  replyToMessage: Message | null;
  setReplyTo: (arg0: string) => void;
}

export default function MessageBox({
  message,
  setReplyTo,
  replyToMessage,
}: MessageBoxProps) {
  const userName = useUserName();

  const {
    text,
    userName: userNameOfMessage,
    createdAt,
    readBy,
    uuid,
  } = message;

  const isMyMessage = userName === userNameOfMessage;
  const readTimes = readBy.filter(
    (readByUserName) => readByUserName !== userName,
  ).length;

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: isMyMessage ? "row-reverse" : "row",
        gap: "0.5rem",
        padding: "1rem",
      }}
    >
      <Avatar>{userNameOfMessage[0]}</Avatar>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {!isMyMessage && (
          <Box
            sx={{
              color: "text.secondary",
              fontSize: "0.75rem",
            }}
          >
            {userNameOfMessage}
          </Box>
        )}
        <Box
          id={uuid}
          component="button"
          sx={{
            borderRadius: "0.5rem",
            border: "1px solid",
            borderColor: "divider",
            backgroundColor: isMyMessage ? "primary.main" : "background.paper",
            color: isMyMessage ? "primary.contrastText" : "text.primary",
            whiteSpace: "pre-wrap",
            maxWidth: "70vw",
            wordBreak: "break-all",
            textAlign: "left",
          }}
        >
          {replyToMessage && (
            <>
              <Box
                sx={{ paddingX: "1rem", cursor: "pointer" }}
                onClick={() => scrollToId(replyToMessage.uuid)}
              >
                <Markdown options={{ forceBlock: true }}>
                  {replyToMessage.text}
                </Markdown>
              </Box>
              <Divider />
            </>
          )}
          <Box
            sx={{ paddingX: "1rem", cursor: "pointer" }}
            onClick={handleClick}
          >
            <Markdown options={{ forceBlock: true }}>{text}</Markdown>
          </Box>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Button
              onClick={() => {
                setReplyTo(uuid);
                handleClose();
              }}
            >
              Reply
            </Button>
          </Popover>
        </Box>
      </Box>
      <Box
        component="div"
        sx={{
          alignSelf: "flex-end",
          color: "text.secondary",
          fontSize: "0.75rem",
          textAlign: isMyMessage ? "right" : "left",
        }}
      >
        {condSwitch(
          [
            [!isMyMessage, ""],
            [readTimes === 0, ""],
            [readTimes === 1, "Read"],
            [readTimes > 1, `Read ${readTimes}`],
          ],
          "",
        )}
        <br />
        {dayjs(createdAt).format("YYYY/MM/DD HH:mm:ss")}
      </Box>
    </Box>
  );
}
