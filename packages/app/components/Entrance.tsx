import { Box, Button, TextField } from "@mui/material";
import { nanoid } from "nanoid";
import type { Dispatch, FC, SetStateAction } from "react";
import { useState } from "react";
import { ChatMessageType } from "../types/message";
import { broadCastChatMessage } from "../utils/broadcastChannel";
import { storeLocalUsername } from "../utils/window";
import Layout from "./Layout";

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
      broadCastChatMessage({
        id: nanoid(),
        timestamp: Date.now(),
        type: ChatMessageType.Joined,
        username,
      });
    }
  };

  return (
    <Layout title="歡迎加入聊天室，一起交流！">
      <Box
        component="form"
        autoComplete="off"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          gap: 2,
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          required
          type="text"
          placeholder="輸入你的使用者名稱"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button type="submit" variant="contained">
          進入聊天室
        </Button>
      </Box>
    </Layout>
  );
};

export default Entrance;
