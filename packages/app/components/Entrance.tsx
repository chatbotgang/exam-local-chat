import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { nanoid } from "nanoid";
import type { Dispatch, FC, SetStateAction } from "react";
import { useState } from "react";
import { ChatMessageType } from "../types/message";
import { broadCastChatMessage } from "../utils/broadcastChannel";
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
      broadCastChatMessage({
        id: nanoid(),
        timestamp: Date.now(),
        type: ChatMessageType.Joined,
        username,
      });
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        gap: 2,
      }}
    >
      <Typography variant="h4" align="center">
        歡迎加入聊天室，一起交流！
      </Typography>
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
    </Container>
  );
};

export default Entrance;
