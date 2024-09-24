import { useState } from "react";

interface LoginProps {
  setStoredName: React.Dispatch<any>;
}

const Login = ({ setStoredName }: LoginProps) => {
  const [name, setName] = useState("");

  const handleNameKeyDown: React.ComponentProps<"input">["onKeyDown"] = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setStoredName(name);
    }
  };

  const handleNameChange: React.ComponentProps<"input">["onChange"] = (e) => {
    setName(e.target.value);
  };

  return (
    <input
      type="text"
      value={name}
      onChange={handleNameChange}
      onKeyDown={handleNameKeyDown}
      placeholder="Enter your name"
      required
    />
  );
};

export default Login;
