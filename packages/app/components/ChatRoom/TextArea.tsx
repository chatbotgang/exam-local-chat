import { TextareaAutosize, styled } from "@mui/material";
import { useState } from "react";
import type { MessageType } from "../../types";

const StyledTextArea = styled(TextareaAutosize)`
  border-radius: 8px;
  padding: 16px;
  resize: none;
  background: #000000;
  color: #ffffff;
  font-family: Arial, sans-serif;
  font-size: 16px;
  ::placeholder {
      color: #888888;
    };
  :focus, :hover {
  background: #000000;
  }
`;

const TextArea = ({ setMessage }: {
  setMessage: (value: MessageType) => void
}) => {
  const [text, setText] = useState('');

  return (
    <StyledTextArea
      minRows={1}
      placeholder="Type a message..."
      value={text}
      onChange={({ target: { value } }) => setText(value)}
      onKeyDown={e => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          if (text.trim() === '') return;
          setMessage({ user: localStorage.getItem('username') || '', timestamp: Date.now(), message: text });
          setText('');
        }
      }}
    />
  );
}

export default TextArea;