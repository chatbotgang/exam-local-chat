import { useState } from "react";

const Login = ({ onLogin }: { onLogin: (username: string) => void }) => {
  const [username, setUsername] = useState("");

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
