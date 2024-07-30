import Header from "../components/Header/Header";
import { useCallback, useEffect, useRef, useState } from "react";
import { Message } from "../types/message";
import { useForm } from "react-hook-form";
import { Box, Button, Divider, TextField } from "@mui/material";
import requiredWithTrimmed from "../utils/form/validate/requiredWithTrimmed";
import useUserName from "../hooks/useUserName";
import MessageBox from "../components/MessageBox/MessageBox";
import useExecuteAfterRender from "../hooks/useExecuteAfterRender";
import isElementScrolledToBottom from "../utils/dom/isElementScrolledToBottom";
import { useBeforeUnload } from "react-router-dom";

interface MessageForm {
  message: string;
}

interface ReaderData {
  uuids: string[];
  reader: string;
}

export default function ChatPage() {
  const userName = useUserName();

  const messageChannel = useRef(new BroadcastChannel("message"));
  const readChannel = useRef(new BroadcastChannel("read"));

  const [messages, setMessages] = useState<Message[]>([]);

  useBeforeUnload(
    useCallback(() => {
      messageChannel.current.close();
      readChannel.current.close();
    }, []),
  );

  const readUnreadMessages = useCallback(() => {
    const uuids = messages
      .filter(
        (message) =>
          message.userName !== userName && !message.readBy.includes(userName),
      )
      .map((message) => message.uuid);

    if (uuids.length) {
      const data: ReaderData = { uuids, reader: userName };
      readChannel.current.postMessage(data);
      setMessages((previous) =>
        previous.map((message) => {
          if (uuids.includes(message.uuid)) {
            return { ...message, readBy: [...message.readBy, userName] };
          }
          return message;
        }),
      );
    }
  }, [messages, userName]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollToBottomCallback = useCallback(() => {
    bottomRef.current?.scrollIntoView();
  }, []);
  const scrollToBottom = useExecuteAfterRender(scrollToBottomCallback);

  useEffect(() => {
    messageChannel.current.onmessage = (event) => {
      const message = event.data as Message;
      setMessages((prev) => [...prev, message]);

      const messageAreaElement = bottomRef.current?.parentNode;

      if (
        messageAreaElement instanceof HTMLElement &&
        isElementScrolledToBottom(messageAreaElement)
      ) {
        scrollToBottom();
      }
    };
  }, [readUnreadMessages, scrollToBottom]);

  useEffect(() => {
    readChannel.current.onmessage = (event) => {
      const { uuids, reader } = event.data as ReaderData;

      setMessages((previous) =>
        previous.map((message) => {
          if (
            message.userName === userName &&
            uuids.includes(message.uuid) &&
            !message.readBy.includes(reader)
          ) {
            return { ...message, readBy: [...message.readBy, reader] };
          }
          return message;
        }),
      );
    };
  }, [userName]);

  useEffect(() => {
    if (document.hasFocus()) {
      readUnreadMessages();
    }
  }, [readUnreadMessages]);

  useEffect(() => {
    window.addEventListener("focus", readUnreadMessages);
    return () => {
      window.removeEventListener("focus", readUnreadMessages);
    };
  }, [readUnreadMessages, userName]);

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
      uuid: crypto.randomUUID(),
      readBy: [userName],
    };

    messageChannel.current.postMessage(message);

    setMessages((prev) => [...prev, message]);

    reset();

    scrollToBottom();
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
        <div ref={bottomRef} />
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
