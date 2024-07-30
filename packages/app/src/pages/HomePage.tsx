import { Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import requiredWithTrimmed from "../utils/form/validate/requiredWithTrimmed";
import useUpdateUserName from "../hooks/useUpdateUserName";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";

interface UserForm {
  userName: string;
}

export default function HomePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>();

  const updateUserName = useUpdateUserName();

  const onSubmit = handleSubmit((userForm) =>
    updateUserName(userForm.userName.trim()),
  );

  return (
    <>
      <ThemeToggle sx={{ position: "fixed", top: "1rem", right: "1rem" }} />
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          gap: "0.5rem",
        }}
      >
        <TextField
          error={!!errors.userName}
          label="Name"
          placeholder="Please input your name."
          {...register("userName", {
            validate: requiredWithTrimmed,
          })}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </>
  );
}
