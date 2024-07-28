import { useParams } from "react-router-dom";

export default function useUserName(): string {
  const { userName } = useParams();

  if (!userName) {
    throw new Error("userName is required");
  }

  return userName;
}
