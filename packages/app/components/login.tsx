import { Input, Typography } from "@exam/component";
import { FC, useCallback, useState } from "react";
import styled from "styled-components";

interface IProps {
  onLogin: (userName: string) => void;
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: black;
  border: 1px solid white;
  border-radius: 4px;
  overflow: auto;
  height: 100%;
  padding: 24px;
  gap: 8px;
`;

export const Login: FC<IProps> = ({ onLogin }) => {
  const [name, setName] = useState("");
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        onLogin(name);
      }
    },
    [name, onLogin],
  );

  return (
    <LoginContainer>
      <Typography color="white" fontSize="24px">
        username
      </Typography>
      <Input
        onKeyDown={handleKeyDown}
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </LoginContainer>
  );
};
