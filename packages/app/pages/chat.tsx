import { Login, Message } from "@exam/app/components";
import { EventType, MessageType } from "@exam/app/interfaces";
import { SocketCtx } from "@exam/app/providers";
import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: black;
  height: 100vh;
  width: 100vw;
  overflow: auto;
`;

export const Chat: React.FC = () => {
  const { socket } = useContext(SocketCtx);
  const [userName, setUserName] = useState<string>(
    sessionStorage.getItem("name") || "",
  );

  const handleLogin = useCallback((name: string) => {
    sessionStorage.setItem("name", name);
    setUserName(name);
  }, []);

  // user join
  useEffect(() => {
    if (userName) {
      socket?.emit(EventType.MESSAGE, {
        name: userName,
        type: MessageType.SYSTEM,
        message: `joined`,
      });
    }
  }, [userName, socket]);

  // user leave
  useEffect(() => {
    const logout = () => {
      if (userName) {
        socket?.emit(EventType.MESSAGE, {
          name: userName,
          type: MessageType.SYSTEM,
          message: `left`,
        });
      }
    };

    window.addEventListener("beforeunload", logout);

    return () => {
      window.removeEventListener("beforeunload", logout);
    };
  }, [socket, userName]);

  return (
    <PageContainer>
      {!userName && <Login onLogin={handleLogin} />}
      {userName && <Message name={userName} />}
    </PageContainer>
  );
};