import {
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface LoginProps {
  setStoredName: React.Dispatch<any>;
}

const Login = ({ setStoredName }: LoginProps) => {
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown: React.ComponentProps<"input">["onKeyDown"] = (e) => {
    if (e.key !== "Enter") return;
    if (!/\w/.test(name)) return;
    e.preventDefault();
    setStoredName(name);
  };

  const handleChange: React.ComponentProps<"input">["onChange"] = (e) => {
    setName(e.target.value);
  };

  return (
    <Center minHeight="100vh" color="white">
      <FormControl isRequired color="white" width={300}>
        <FormLabel>Enter your name</FormLabel>
        <Input
          ref={inputRef}
          type="text"
          value={name}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Enter your name"
          required
          maxLength={30}
        />
        <FormHelperText>
          After entering you can join the chatroom.
        </FormHelperText>
      </FormControl>
    </Center>
  );
};

export default Login;
