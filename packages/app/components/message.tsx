import { useMessage, useScroll } from "@exam/app/hooks";
import { CallbackType, EventType, MessageType } from "@exam/app/interfaces";
import { SocketCtx } from "@exam/app/providers";
import { fromNow } from "@exam/app/utils";
import { Textarea, Typography } from "@exam/component";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

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

const MessageWrapperStyled = styled.div<{ $alignEnd?: boolean }>`
  display: flex;
  border-radius: 4px;
  background: black;
  word-break: break-all;
  flex-direction: column;
  color: white;
  gap: 8px;

  ${(props) => props.$alignEnd && "align-items: flex-end;"}
`;

const UserMessageTitleStyled = styled.div`
  display: inline-flex;
  gap: 24px;
  align-items: end;

  div {
    display: flex;
    font-weight: bold;
    font-size: 24px;
  }
`;

const UserMessageContentStyled = styled(MessageWrapperStyled)`
  background: rgba(255, 255, 255, 0.2);
  padding: 8px 12px;
  line-height: 28px;
  font-size: 18px;
  width: fit-content;
`;

const MessageInputWrapperStyled = styled.div`
  width: 100vw;
  flex: 1,
  position: absolute;
  bottom: 0;
`;

const PreviewMessageWrapperStyled = styled.div<{ $bottom: number }>`
  position: fixed;
  width: 100vw;
  padding: 12px;
  bottom: ${(props) => props.$bottom}px;
  display: inline-flex;
  background: black;
  opacity: 0.8;
  color: white;

  div {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export interface IMessageProps {
  name: string;
}

export const Message: React.FC<IMessageProps> = ({ name }) => {
  const { addSocketEventListener, removeSocketEventListener } =
    useContext(SocketCtx);
  const [inputValue, setInputValue] = useState<string>("");
  const { messages, sendMessage, refresh } = useMessage();
  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const { ref, isScrolling, scrollToBottom } = useScroll();
  const [isPressShift, setIsPressShift] = useState<boolean>(false);
  // receive new message but not at the bottom
  const [haveNewMessage, setHaveNewMessage] = useState(false);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      switch (e.key) {
        case "Enter": {
          if (isPressShift) {
            break;
          } else {
            if (inputValue.trim()) {
              scrollToBottom();
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
    [inputValue, isPressShift, name, scrollToBottom, sendMessage],
  );

  const handleKeyUp = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Shift") {
      setIsPressShift(false);
    }
  }, []);

  useEffect(() => {
    // if not at the bottom and receive new message will scroll to bottom
    if (!isScrolling && haveNewMessage) {
      scrollToBottom();
      setHaveNewMessage(false);
    }
  }, [scrollToBottom, isScrolling, haveNewMessage]);

  const handleReceiveMessage = useCallback(() => {
    setHaveNewMessage(true);
  }, []);

  useEffect(() => {
    addSocketEventListener(
      EventType.MESSAGE,
      CallbackType.RECEIVE_NEW_MESSAGE,
      handleReceiveMessage,
    );

    return () => {
      removeSocketEventListener(
        EventType.MESSAGE,
        CallbackType.RECEIVE_NEW_MESSAGE,
      );
    };
  }, [addSocketEventListener, removeSocketEventListener, handleReceiveMessage]);

  useEffect(() => {
    // refresh every minute
    const interval = setInterval(refresh, 60000);

    return () => {
      clearInterval(interval);
    };
  }, [refresh]);

  const previewMessage = useMemo(() => {
    const lastMessage = messages?.[messages.length - 1];
    if (lastMessage) {
      return {
        name: lastMessage?.name,
        type: lastMessage?.type,
        message: lastMessage?.message.replace(/\n/g, "\t"),
        timestamp: lastMessage?.timestamp,
      };
    }
    return null;
  }, [messages]);

  const showPreviewMessage = isScrolling && haveNewMessage;

  return (
    <MessageContainerStyled>
      <MessageListStyled ref={ref}>
        {messages.map(({ id, name: _name, type, message, timestamp }) => {
          const isSelfMessage = _name === name;
          if (type === MessageType.SYSTEM) {
            return (
              <MessageWrapperStyled key={id}>
                <i>{`--- ${_name} ${message} ${fromNow(timestamp)}---`}</i>
              </MessageWrapperStyled>
            );
          } else
            return (
              <MessageWrapperStyled key={id} $alignEnd={isSelfMessage}>
                <UserMessageTitleStyled>
                  <Typography>{_name}</Typography>
                  <i>{fromNow(timestamp)}</i>
                </UserMessageTitleStyled>
                <UserMessageContentStyled>
                  <Typography>{message}</Typography>
                </UserMessageContentStyled>
              </MessageWrapperStyled>
            );
        })}
      </MessageListStyled>
      <MessageInputWrapperStyled ref={inputWrapperRef}>
        {showPreviewMessage && previewMessage && (
          <PreviewMessageWrapperStyled
            $bottom={inputWrapperRef.current?.scrollHeight || 0}
            onClick={scrollToBottom}
          >
            <Typography>
              {`${previewMessage.name}  ${previewMessage.message.trim().replace("\t", "")}`}
            </Typography>
          </PreviewMessageWrapperStyled>
        )}
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
