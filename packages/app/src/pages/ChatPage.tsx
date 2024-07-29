import Header from "../components/Header/Header";
import { useEffect, useRef, useState } from "react";
import { Message } from "../types/message";
import { useForm } from "react-hook-form";
import { Box, Button, Divider, TextField } from "@mui/material";
import requiredWithTrimmed from "../utils/form/validate/requiredWithTrimmed";
import useUserName from "../hooks/useUserName";
import MessageBox from "../components/MessageBox/MessageBox";

interface MessageForm {
  message: string;
}

export default function ChatPage() {
  const channel = useRef(new BroadcastChannel("chat"));

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    channel.current.onmessage = (event) => {
      const message = event.data as Message;
      setMessages((prev) => [...prev, message]);
    };
  }, []);

  const userName = useUserName();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MessageForm>();

  const onSubmit = handleSubmit((messageForm) => {
    const message: Message = {
      text: messageForm.message,
      userName,
      createdAt: new Date(),
    };

    channel.current.postMessage(message);

    setMessages((prev) => [...prev, message]);

    reset();
  });

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <Box
        sx={{
          flexGrow: 1,
          flexShrink: 1,
          height: 0,
          overflowY: "auto",
          p: "1rem",
        }}
      >
        {messages.map((message) => (
          <MessageBox message={message} key={message.createdAt.getTime()} />
        ))}
      </Box>
      <Divider component="div" role="presentation" />
      <Box
        component="form"
        sx={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "start",
          p: "1rem",
          backgroundColor: "light",
        }}
        onSubmit={onSubmit}
      >
        <TextField
          multiline
          fullWidth
          rows={5}
          error={!!errors.message}
          placeholder="Please input your message."
          {...register("message", {
            validate: requiredWithTrimmed,
          })}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              onSubmit();
            }
          }}
        />
        <Button variant="contained" type="submit">
          Send
        </Button>
      </Box>
    </Box>
  );
}
