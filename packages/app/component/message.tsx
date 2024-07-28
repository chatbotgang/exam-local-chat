import { Textarea, Typography } from "@exam/component";
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
  height: calc(100vh - 140px);
  overflow: auto;
  background: black;
  flex-direction: column;
  padding: 24px;
`;

const MessageWrapperStyled = styled.div`
  background: black;
  flex-direction: column;
  color: white;
`;

const MessageInputWrapperStyled = styled.div`
  width: 100vw;
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
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "Enter": {
          if (isPressShift) {
            setInputValue(inputValue + "\n");
          } else {
            if (inputValue.trim()) {
              sendMessage(inputValue, name);
              setInputValue("");
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
        {messages.map(({ name, type, message, timestamp }, index) => (
          <MessageWrapperStyled key={index}>
            {type === MessageType.SYSTEM && <i>{message}</i>}
            {type === MessageType.MESSAGE && (
              <>
                <Typography>{name}</Typography>
                <Typography>{message}</Typography>
                <Typography>{timestamp}</Typography>
              </>
            )}
          </MessageWrapperStyled>
        ))}
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
