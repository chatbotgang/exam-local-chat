import { Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import type { MessageType } from "../../types";

const Messages = ({ messages }: { messages: MessageType[] }) => {
  const messageEndRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    if (messages[messages.length - 1]?.user === localStorage.getItem('username')
      || isBottom)
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBottom]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView();

    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry)
        setIsBottom(entry?.isIntersecting);
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
            ? <>
              <Typography color="#FFFFFF">
                {user} {Intl.DateTimeFormat('default', { timeStyle: 'medium', hourCycle: 'h24' }).format(timestamp)}
              </Typography>
              <Stack bgcolor='#888888' borderRadius={1} p={1} width='fit-content'>
                <Typography color="#FFFFFF" whiteSpace='pre'>
                  {message}
                </Typography>
              </Stack>
            </>
            : <Typography color="#FFFFFF">{message}</Typography>}
        </Stack>
      ))}
      <Stack style={{ marginTop: 0 }} ref={messageEndRef} />
    </Stack>
  );
}

export default Messages;