import { uesrsAtom } from "@/atoms/user";
import { useAtom } from "jotai";
import useChatHistory from "./useChatHistory";
import useCurrentUser from "./useCurrentUser";
import usePersistentCallback from "./usePersistentCallback";

export default function useParticipants() {
  const { curUserName } = useCurrentUser();
  const { addChatMessage } = useChatHistory();
  const [users, setUsers] = useAtom(uesrsAtom);

  const quitChat = usePersistentCallback(() => {
    const index = users.findIndex((user) => user === curUserName);
    if (index !== -1) {
      setUsers((prevUsers) => {
        const updatedUsers = [
          ...prevUsers.slice(0, index),
          ...prevUsers.slice(index + 1),
        ];
        if (!updatedUsers.includes(curUserName)) {
          addChatMessage(`${curUserName} Left`, "system");
        }
        return updatedUsers;
      });
    }
  });

  const joinChat = () => {
    setUsers((prevUsers) => {
      if (!prevUsers.includes(curUserName)) {
        addChatMessage(`${curUserName} Joined`, "system");
      }
      const updatedUsers = [...prevUsers, curUserName];
      return updatedUsers;
    });
  };

  return {
    participants: users,
    joinChat,
    quitChat,
  };
}
