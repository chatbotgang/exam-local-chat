import { FC } from "react";
import styled from "styled-components";

interface ITextareaProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const TextareaContainerStyled = styled.div`
  padding: 24px;
  border: grey 1px solid;
  border-radius: 4px;

  Textarea {
    width: 100%;
    border: none;
    outline: none;
  }
`;

export const Textarea: FC<ITextareaProps> = ({
  value,
  onChange,
  onKeyDown,
  onKeyUp,
}) => {
  return (
    <TextareaContainerStyled>
      <textarea
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        value={value}
        onChange={onChange}
      />
    </TextareaContainerStyled>
  );
};
