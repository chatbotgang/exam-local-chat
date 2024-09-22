import type { Dispatch, FC, SetStateAction } from "react";
import { useState } from "react";
import { storeLocalUsername } from "../utils/window";

interface EntranceProps {
  setLocalUsername: Dispatch<SetStateAction<string>>;
}

const Entrance: FC<EntranceProps> = ({ setLocalUsername }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      storeLocalUsername(username);
      setLocalUsername(username);
    }
  };

  return (
    <div>
      <h2>輸入你的名稱，加入聊天室，一起交流！</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="輸入你的使用者名稱"
        />
        <button type="submit">進入聊天室</button>
      </form>
    </div>
  );
};

export default Entrance;
