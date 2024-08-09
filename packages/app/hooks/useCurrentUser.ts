import { uesrsAtom, usernameAtom } from "@/atoms/user";
import { useAtom } from "jotai";

export default function useCurrentUser() {
  const [curUserName, setCurUserName] = useAtom(usernameAtom);
  const [users, setUsers] = useAtom(uesrsAtom);

  const quitChat = () => {
    const index = users.findIndex((user) => user === curUserName);
    if (index !== -1) {
      setUsers((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
    }
  };

  const joinChat = (user: string) => {
    setUsers((prevUsers) => {
      return [...prevUsers, user];
    });
  };

  return {
    curUserName,
    setCurUserName,
    participants: users,
    joinChat,
    quitChat,
  };
}
