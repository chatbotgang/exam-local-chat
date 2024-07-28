import styled from "@emotion/styled";
import Header from "../components/Header";
import { useEffect, useRef, useState } from "react";
import { Message } from "../types/message";
import { useForm } from "react-hook-form";
import { Button, Divider, TextField } from "@mui/material";
import requiredWithTrimmed from "../utils/form/validate/requiredWithTrimmed";
import useUserName from "../hooks/useUserName";

interface MessageForm {
  message: string;
}

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ChatMessagesWrapper = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  height: 0;
  overflow-y: auto;
  padding: 1rem;
`;

const ChatInputWrapper = styled.form`
  display: flex;
  gap: 0.5rem;
  align-items: start;
  padding: 1rem;
  background-color: light;
`;

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
    <PageLayout>
      <Header />
      <ChatMessagesWrapper>
        {messages.map((message) => (
          <div key={message.createdAt.getTime()}>
            {message.userName}: {message.text}
          </div>
        ))}
      </ChatMessagesWrapper>
      <Divider component="div" role="presentation" />
      <ChatInputWrapper onSubmit={onSubmit}>
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
      </ChatInputWrapper>
    </PageLayout>
  );
}
