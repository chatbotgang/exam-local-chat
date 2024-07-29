import { FC, useEffect, useRef } from "react";
import styled from "styled-components";

interface ITextareaProps {
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const TextareaContainerStyled = styled.div`
  padding: 12px;
  border: grey 1px solid;
  border-radius: 4px;

  textarea {
    width: 100%;
    height: 12px;
    border: none;
    outline: none;
    overflow: hidden;
    resize: none;
  }
`;

export const Textarea: FC<ITextareaProps> = ({
  value,
  onChange,
  onKeyDown,
  onKeyUp,
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // resize height after typing Enter
    const textArea = ref.current;
    if (textArea) {
      textArea.style.height = "auto";
      textArea.style.height = `${textArea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <TextareaContainerStyled>
      <textarea
        ref={ref}
        rows={1}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        value={value}
        onChange={onChange}
      />
    </TextareaContainerStyled>
  );
};
