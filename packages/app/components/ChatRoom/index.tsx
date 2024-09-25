import { Stack } from "@mui/material";
import type { MessageType } from "../../types";
import Messages from "./Messages";
import TextArea from "./TextArea";

const ChatRoom = ({ messages, setMessages, onExit }: {
  messages: MessageType[];
  setMessages: (value: MessageType) => void;
  onExit: () => void;
}) => {
  return (
    <Stack width={1} height='calc(100% - 48px)' padding={2} direction='column' spacing={2}>
      <Messages messages={messages} />
      <TextArea setMessage={value => {
        setMessages(value);
      }}
        onExit={onExit} />
    </Stack>
  );
}

export default ChatRoom;