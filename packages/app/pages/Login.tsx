import {
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

interface LoginProps {
  setStoredName: React.Dispatch<any>;
}

const Login = ({ setStoredName }: LoginProps) => {
  const [name, setName] = useState("");

  const handleKeyDown: React.ComponentProps<"input">["onKeyDown"] = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setStoredName(name);
    }
  };

  const handleChange: React.ComponentProps<"input">["onChange"] = (e) => {
    setName(e.target.value);
  };

  return (
    // <Flex align="center" justify="center" minHeight="100vh">
    <Center minHeight="100vh" color="white">
      <FormControl isRequired color="white" width={300}>
        <FormLabel>Enter your name</FormLabel>
        <Input
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
