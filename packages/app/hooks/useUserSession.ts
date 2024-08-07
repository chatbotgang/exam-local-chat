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

  const handleSetUser = useCallback((user: User) => setUser(user), [setUser]);

  const handleUserLogin = useCallback(
    (username: string) => {
      const member = room[username];
      if (member) {
        handleSetUser(member);
      } else {
        const newUser = { ...user, username };
        setUser((user) => ({ ...user, username }));
        handleJoinRoom(newUser);
      }
    },
    [handleJoinRoom, handleSetUser, room, setUser, user],
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