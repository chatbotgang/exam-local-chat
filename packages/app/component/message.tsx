import { Textarea, Typography } from "@exam/component";
import dayjs from "dayjs";
import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useMessage, useScroll } from "../hooks";
import { IMessage, ISocketResponse, MessageType } from "../interfaces";
import { SocketCtx } from "../providers";

const MessageContainerStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MessageListStyled = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: auto;
  background: black;
  flex-direction: column;
  padding: 24px;
  gap: 8px;
`;

const MessageWrapperStyled = styled.div`
  display: flex;
  border-radius: 4px;
  width: fit-content;
  background: black;
  flex-direction: column;
  color: white;
  gap: 8px;
`;

export const UserMessageTitleStyled = styled.div`
  display: inline-flex;
  gap: 24px;
  font-weight: bold;
`;

export const UserMessageContentStyled = styled(MessageWrapperStyled)`
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 12px;
  line-height: 28px;
  font-size: 24px;
`;

const MessageInputWrapperStyled = styled.div`
  width: 100vw;
  flex: 1,
  position: absolute;
  bottom: 0;
`;

export interface IMessageProps {
  name: string;
}

export const Message: React.FC<IMessageProps> = ({ name }) => {
  const { addSocketEventListener, removeSocketEventListener } =
    useContext(SocketCtx);
  const [inputValue, setInputValue] = useState<string>("");
  const { messages, sendMessage, refresh } = useMessage();
  const { ref, scrollToBottom } = useScroll();
  const [isPressShift, setIsPressShift] = useState<boolean>(false);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      switch (e.key) {
        case "Enter": {
          if (isPressShift) {
            break;
          } else {
            if (inputValue.trim()) {
              sendMessage(inputValue, name);
              setInputValue("");
              e.preventDefault();
            }
          }
          break;
        }
        case "Shift": {
          setIsPressShift(true);
          break;
        }
      }
    },
    [inputValue, isPressShift, name, sendMessage],
  );

  const handleKeyUp = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Shift") {
      setIsPressShift(false);
    }
  }, []);

  useEffect(() => {
    // scroll to bottom when receive message
    const callback = (data: ISocketResponse<IMessage[]>) => {
      if (data.code === 20000) {
        scrollToBottom();
      }
    };
    addSocketEventListener("message", callback);
    return () => {
      removeSocketEventListener("message", callback);
    };
  }, [addSocketEventListener, removeSocketEventListener, scrollToBottom]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <MessageContainerStyled>
      <MessageListStyled ref={ref}>
        {messages.map(({ name, type, message, timestamp }, index) => {
          if (type === MessageType.SYSTEM) {
            return (
              <MessageWrapperStyled key={index}>
                <i>{message}</i>
              </MessageWrapperStyled>
            );
          } else
            return (
              <MessageWrapperStyled key={index}>
                <UserMessageTitleStyled>
                  <Typography>{name}</Typography>
                  <Typography>{dayjs(timestamp).format("HH:mm")}</Typography>
                </UserMessageTitleStyled>
                <UserMessageContentStyled>
                  <Typography>{message}</Typography>
                </UserMessageContentStyled>
              </MessageWrapperStyled>
            );
        })}
      </MessageListStyled>
      <MessageInputWrapperStyled>
        <Textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
      </MessageInputWrapperStyled>
    </MessageContainerStyled>
  );
};
