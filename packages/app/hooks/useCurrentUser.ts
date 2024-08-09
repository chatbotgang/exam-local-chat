import { usernameAtom } from "@/atoms/user";
import { useAtom } from "jotai";

export default function useCurrentUser() {
  const [curUserName, setCurUserName] = useAtom(usernameAtom);
  return {
    curUserName,
    setCurUserName,
  };
}
