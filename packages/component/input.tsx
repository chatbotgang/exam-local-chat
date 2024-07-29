import { FC } from "react";
import styled from "styled-components";

interface IInputProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

const InputContainerStyled = styled.div`
  padding: 12px;
  border: white 1px solid;
  border-radius: 4px;

  input {
    width: 100%;
    border: none;
    outline: none;
    background: none;
    color: white;
  }
`;

export const Input: FC<IInputProps> = ({
  value,
  onChange,
  onKeyDown,
  onKeyUp,
}) => {
  return (
    <InputContainerStyled>
      <input
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        value={value}
        onChange={onChange}
      />
    </InputContainerStyled>
  );
};
