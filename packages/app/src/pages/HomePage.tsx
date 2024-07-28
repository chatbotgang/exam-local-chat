import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import requiredWithTrimmed from "../utils/form/validate/requiredWithTrimmed";
import useUpdateUserName from "../hooks/updateUserName";

interface UserForm {
  userName: string;
}

const HomePageWrapper = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 0.5rem;
`;

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
    <HomePageWrapper onSubmit={onSubmit}>
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
    </HomePageWrapper>
  );
}
