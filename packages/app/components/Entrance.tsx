import { Box, Button, TextField } from "@mui/material";
import type { FC } from "react";
import { useState } from "react";
import useChatMessagesStore from "../stores/useChatMessagesStore";
import useLocalUserStore from "../stores/useLocalUserStore";
import { ChatMessageType } from "../types/message";
import Layout from "./Layout";

const Entrance: FC = () => {
  const [username, setUsername] = useState("");
  const setLocalUsername = useLocalUserStore((state) => state.setLocalUsername);
  const sendChatMessage = useChatMessagesStore(
    (state) => state.sendChatMessage,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setLocalUsername(username);

      sendChatMessage({ type: ChatMessageType.Joined, username });
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
