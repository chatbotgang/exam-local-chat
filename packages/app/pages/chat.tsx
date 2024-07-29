import React, { useCallback, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { Login, Message } from "../component";
import { MessageType } from "../interfaces";
import { SocketCtx } from "../providers";

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

  useEffect(() => {
    if (userName) {
      socket?.emit("message", {
        name: userName,
        type: MessageType.SYSTEM,
        message: `--- ${userName} joined ---`,
      });
    }
  }, [userName, socket]);

  useEffect(() => {
    const logout = () => {
      if (userName) {
        socket?.emit("message", {
          name: userName,
          type: MessageType.SYSTEM,
          message: `--- ${userName} left ---`,
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
