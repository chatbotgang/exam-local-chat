import { FC, useCallback, useEffect, useRef, useState } from "react";
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
    padding-top: 6px;
    border-radius: 4px;
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
  const [isComposing, setIsComposing] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleCompositionStart = useCallback(() => {
    setIsComposing(true);
  }, []);
  const handleCompositionEnd = useCallback(() => {
    setIsComposing(false);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // prevent the KeyDown event being triggered when entering text with Chinese input method
      if (!isComposing && onKeyDown) {
        onKeyDown(e);
      }
    },
    [isComposing, onKeyDown],
  );

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
        onKeyDown={handleKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        value={value}
        onChange={onChange}
      />
    </TextareaContainerStyled>
  );
};
