import { Avatar, Box } from "@mui/material";
import useUserName from "../../hooks/useUserName";
import { Message } from "../../types/message";
import dayjs from "dayjs";
import Markdown from "markdown-to-jsx";
import condSwitch from "condition-switch";

interface MessageBoxProps {
  message: Message;
}

export default function MessageBox({ message }: MessageBoxProps) {
  const userName = useUserName();

  const { text, userName: userNameOfMessage, createdAt, readBy } = message;

  const isMyMessage = userName === userNameOfMessage;
  const readTimes = readBy.filter(
    (readByUserName) => readByUserName !== userName,
  ).length;

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
      <Box
        component="div"
        sx={{
          borderRadius: "0.5rem",
          border: "1px solid",
          borderColor: "divider",
          paddingX: "1rem",
          backgroundColor: isMyMessage ? "primary.main" : "background.paper",
          color: isMyMessage ? "primary.contrastText" : "text.primary",
          whiteSpace: "pre-wrap",
        }}
      >
        <Markdown options={{ forceBlock: true }}>{text}</Markdown>
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
