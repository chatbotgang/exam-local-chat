import { Stack, Typography } from "@mui/material";
import type { MessageType } from "../../types";

const Messages = ({ messages }: { messages: MessageType[] }) => {

  return (
    <Stack width={1} height={1} spacing={3} overflow='auto' padding={2}>
      {messages.map(({ user, timestamp, message }) => (
        <Stack key={timestamp} spacing={1}>
          <Typography color="#FFFFFF">
            {user} {Intl.DateTimeFormat('default', { timeStyle: 'medium', hourCycle: 'h24' }).format(timestamp)}
          </Typography>
          <Stack bgcolor='#888888' borderRadius={1} p={1} width='fit-content'>
            <Typography color="#FFFFFF" whiteSpace='pre'>
              {message}
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}

export default Messages;