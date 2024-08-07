import { useMemo, useCallback } from "react";
import { useSessionStorage } from "usehooks-ts";

import { User } from "../models/user";
import { useRoom } from "./useRoom";

export const useUserSession = () => {
  const { handleJoinRoom, room } = useRoom();
  const [user, setUser] = useSessionStorage<User>("user", {
    username: "",
    userAvatar: "",
  });

  const handleUserLogin = useCallback(
    (username: string) => {
      const member = room[username];
      if (member) {
        setUser(member);
      } else {
        const newUser = { ...user, username };
        setUser((user) => ({ ...user, username }));
        handleJoinRoom(newUser);
      }
    },
    [handleJoinRoom, room, setUser, user],
  );

  const handleSetUserAvatar = useCallback(
    (dataUri: string) => setUser((user) => ({ ...user, userAvatar: dataUri })),
    [setUser],
  );

  const isUserLogin = useMemo(() => !!user.username, [user.username]);

  return {
    handleUserLogin,
    handleSetUserAvatar,
    isUserLogin,
    user,
  };
};
