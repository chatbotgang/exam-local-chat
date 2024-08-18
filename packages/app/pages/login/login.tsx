import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import welcomeImage from "../../public/welcome.png";

type LoginProps = {
  onLogin: (username: string) => void;
};

const Login: FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputUserName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/\W/.test(value)) return;
    setUsername(value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    if (!username.length) return;

    e.preventDefault();
    onLogin(username);
  };

  return (
    <div style={{ color: "white", textAlign: "center" }}>
      <div
        style={{ maxWidth: "100vw", display: "flex", justifyContent: "center" }}
      >
        <img src={welcomeImage} width="1000px" alt="welcome" loading="lazy" />
      </div>
      <div>在 批踢踢實業坊 為台灣隊加油！</div>
      <div>
        <label htmlFor="username">請輸入代號: </label>
        <input
          ref={inputRef}
          type="text"
          name="username"
          id="username"
          autoComplete="off"
          style={{ backgroundColor: "silver", fontSize: "24px", border: "0" }}
          onChange={handleInputUserName}
          onKeyDown={handleInputKeyDown}
          value={username}
          maxLength={20}
        />
        {/* <button onClick={handleLoginEvent}>Login</button> */}
      </div>
    </div>
  );
};

export default Login;
