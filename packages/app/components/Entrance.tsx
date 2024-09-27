import { Box, Button, TextField } from "@mui/material";
import type { ChangeEvent, FC } from "react";
import { useCallback, useRef } from "react";
import useLocalUserStore from "../stores/useLocalUserStore";
import Layout from "./Layout";

const Entrance: FC = () => {
  const usernameInputRef = useRef<HTMLInputElement>(null);
  const setLocalUsername = useLocalUserStore((state) => state.setLocalUsername);

  const handleUsernameInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (usernameInputRef.current) {
        usernameInputRef.current.value = e.target.value;
      }
    },
    [],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInputRef.current && usernameInputRef.current.value.trim()) {
      setLocalUsername(usernameInputRef.current.value);
      usernameInputRef.current.value = "";
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
          inputRef={usernameInputRef}
          type="text"
          placeholder="輸入你的使用者名稱"
          onChange={handleUsernameInputChange}
        />
        <Button type="submit" variant="contained">
          進入聊天室
        </Button>
      </Box>
    </Layout>
  );
};

export default Entrance;
