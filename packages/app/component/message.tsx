import { Textarea, Typography } from "@exam/component";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { useMessage } from "../hooks";
import { MessageType } from "../interfaces";

const MessageContainerStyled = styled.div`
  display: flex;
  height: calc(100% - 200px);
  flex-direction: column;
  padding: 24px;
`;

const MessageListStyled = styled.div`
  display: flex;
  background: black;
  flex-direction: column;
`;

const MessageWrapperStyled = styled.div`
  background: black;
  flex-direction: column;
  color: white;
`;

const MessageInputWrapperStyled = styled.div`
  height: 200px;
`;

export interface IMessageProps {
  name: string;
}

export const Message: React.FC<IMessageProps> = ({ name }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const { messages, sendMessage, refresh } = useMessage();
  const [isPressShift, setIsPressShift] = useState<boolean>(false);
  console.log(messages);
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
    refresh();
  }, [refresh]);

  return (
    <MessageContainerStyled>
      <MessageListStyled>
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
