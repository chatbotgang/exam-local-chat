import { useParams } from "react-router-dom";

export default function useUserName() {
  const { userName } = useParams();

  return userName;
}
