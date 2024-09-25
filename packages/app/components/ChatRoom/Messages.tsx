import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { Button, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import type { MessageType } from "../../types";

const Messages = ({ messages }: { messages: MessageType[] }) => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    if (messages[messages.length - 1]?.user === sessionStorage.getItem('username')
      || isAtBottom)
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAtBottom]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'auto' });

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry)
        setIsAtBottom(entry?.isIntersecting);
    });
  }, []);

  useEffect(() => {
    if (messageEndRef.current)
      observerRef.current?.observe(messageEndRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [messageEndRef]);

  return (
    <Stack width={1} height={1} spacing={3} overflow='auto' padding={2}>
      {messages.map(({ user, timestamp, message, system }) => (
        <Stack key={timestamp} spacing={1}>
          {!system
            ? <Stack width={1} alignItems={user === sessionStorage.getItem('username') ? 'end' : 'start'}>
              <Stack bgcolor='primary.light' borderRadius={1} p={1} width='fit-content'>
                <Typography color="text.secondary" whiteSpace='pre'>
                  {message}
                </Typography>
              </Stack>
              <Typography color="text.primary" fontSize={14}>
                {user === sessionStorage.getItem('username') ? 'You' : user} {Intl.DateTimeFormat('default', { timeStyle: 'medium', hourCycle: 'h24' }).format(timestamp)}
              </Typography>
            </Stack>
            : <Stack width={1} alignItems='center'>
              <Stack border='0.5px solid #888888' borderRadius={1} p={1} width='fit-content'
                textAlign='center'>
                <Typography color="text.primary" fontSize={14}>
                  {Intl.DateTimeFormat('default', { timeStyle: 'medium', hourCycle: 'h24' }).format(timestamp)}
                </Typography>
                <Typography color="text.primary" fontSize={14}>{message}</Typography>
              </Stack>
            </Stack>}
        </Stack>
      ))}

      <Stack style={{ marginTop: 0 }} ref={messageEndRef} />

      {!isAtBottom &&
        <Button sx={{
          position: 'fixed', bottom: 80, left: 20,
          bgcolor: '#888888', borderRadius: 1, color: '#FFFFFF',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
          onClick={() => messageEndRef.current?.scrollIntoView({ behavior: 'instant' })}>
          <Typography color="#FFFFFF" fontSize={12}>Go to bottom</Typography>
          <KeyboardDoubleArrowDownIcon fontSize='small' />
        </Button>}
    </Stack>
  );
}

export default Messages;