import { Stack, TextField, Typography } from "@mui/material";

const UsernameBox = ({
  username,
  setUsername,
  setIsLogin,
}: {
  username: string;
  setUsername: (username: string) => void;
  setIsLogin: (isLogin: boolean) => void;
}) => {
  return (
    <Stack
      width={1}
      height="calc(100% - 48px)"
      alignItems="center"
      justifyContent="center"
    >
      <Stack
        minWidth={300}
        spacing={1}
        padding={2}
        bgcolor="primary.dark"
        border="0.5px solid #888888"
        borderRadius={2}
      >
        <Typography color="#FFFFFF">Username</Typography>
        <TextField
          size="small"
          value={username}
          sx={{
            border: "0.5px solid #888888",
            borderRadius: 1,
            ".MuiInputBase-input": { color: "#FFFFFF" },
          }}
          onChange={({ target: { value } }) => setUsername(value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) {
              e.preventDefault();
              if (username.trim() === "") return;
              localStorage.setItem("username", username);
              setIsLogin(true);
            }
          }}
        />
      </Stack>
    </Stack>
  );
};

export default UsernameBox;
