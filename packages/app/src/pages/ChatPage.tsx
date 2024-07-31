import Header from "../components/Header/Header";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Message } from "../types/message";
import { useForm } from "react-hook-form";
import { Box, Button, Divider, IconButton, TextField } from "@mui/material";
import requiredWithTrimmed from "../utils/form/validate/requiredWithTrimmed";
import useUserName from "../hooks/useUserName";
import MessageBox from "../components/MessageBox/MessageBox";
import useExecuteAfterRender from "../hooks/useExecuteAfterRender";
import isElementScrolledToBottom from "../utils/dom/isElementScrolledToBottom";
import Markdown from "markdown-to-jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import useBroadcastChannel from "../hooks/useBroadcastChannel";

interface MessageForm {
  message: string;
}

interface ReaderData {
  uuids: string[];
  reader: string;
}

export default function ChatPage() {
  const userName = useUserName();

  const messageChannel = useBroadcastChannel<Message>("message");
  const readChannel = useBroadcastChannel<ReaderData>("read");

  const [messages, setMessages] = useState<Message[]>([]);

  const readUnreadMessages = useCallback(() => {
    const uuids = messages
      .filter(
        (message) =>
          message.userName !== userName && !message.readBy.includes(userName),
      )
      .map((message) => message.uuid);

    if (uuids.length) {
      const data: ReaderData = { uuids, reader: userName };
      readChannel.postMessage(data);
      setMessages((previous) =>
        previous.map((message) => {
          if (uuids.includes(message.uuid)) {
            return { ...message, readBy: [...message.readBy, userName] };
          }
          return message;
        }),
      );
    }
  }, [messages, readChannel, userName]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollToBottomCallback = useCallback(() => {
    bottomRef.current?.scrollIntoView();
  }, []);
  const scrollToBottom = useExecuteAfterRender(scrollToBottomCallback);

  useEffect(() => {
    messageChannel.onmessage((message) => {
      setMessages((prev) => [...prev, message]);

      const messageAreaElement = bottomRef.current?.parentNode;

      if (
        messageAreaElement instanceof HTMLElement &&
        isElementScrolledToBottom(messageAreaElement)
      ) {
        scrollToBottom();
      }
    });
  }, [messageChannel, readUnreadMessages, scrollToBottom]);

  useEffect(() => {
    readChannel.onmessage(({ uuids, reader }) => {
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
    });
  }, [readChannel, userName]);

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

  const messageUuidMap = useMemo(
    () =>
      messages.reduce<Record<string, Message>>((acc, message) => {
        acc[message.uuid] = message;
        return acc;
      }, {}),
    [messages],
  );

  const [replyToMessageUuid, setReplyToMessageUuid] = useState<string | null>(
    null,
  );

  const replyToMessage = replyToMessageUuid
    ? messageUuidMap[replyToMessageUuid]
    : null;

  const onSubmit = handleSubmit((messageForm) => {
    const message: Message = {
      text: messageForm.message,
      userName,
      createdAt: new Date(),
      uuid: crypto.randomUUID(),
      readBy: [userName],
    };

    if (replyToMessageUuid) {
      message["replyTo"] = replyToMessageUuid;
      setReplyToMessageUuid(null);
    }

    messageChannel.postMessage(message);

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
          <MessageBox
            message={message}
            key={message.createdAt.getTime()}
            setReplyTo={setReplyToMessageUuid}
            replyToMessage={
              (message.replyTo && messageUuidMap[message.replyTo]) || null
            }
          />
        ))}
        <div ref={bottomRef} />
      </Box>
      <Divider component="div" role="presentation" />
      <Box
        sx={{
          display: "flex",
          p: "1rem",
          maxWidth: "100vw",
          alignItems: "center",
          gap: "0.5rem",
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
        }}
      >
        {replyToMessage && (
          <>
            reply to:
            <Markdown options={{ forceBlock: true }}>
              {replyToMessage.text}
            </Markdown>
            <IconButton
              aria-label="delete"
              size="large"
              onClick={() => setReplyToMessageUuid(null)}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Box>
      <Box
        component="form"
        sx={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "start",
          p: "1rem",
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
