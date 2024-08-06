import { useMemo, useCallback } from "react";
import { useSessionStorage } from "usehooks-ts";

import { User } from "../models/user";

export const useUserSession = () => {
  const [username, setUsername] = useSessionStorage("username", "");
  const [userAvatar, setUserAvatar] = useSessionStorage("user-avatar", "");

  const handleSetUsername = useCallback(
    (username: string) => setUsername(username),
    [setUsername],
  );

  const handleSetUserAvatar = useCallback(
    (dataUri: string) => setUserAvatar(dataUri),
    [setUserAvatar],
  );

  const isUserLogin = useMemo(() => !!username, [username]);
  const user: User = useMemo(
    () => ({
      username,
      userAvatar,
    }),
    [userAvatar, username],
  );

  return { handleSetUsername, handleSetUserAvatar, isUserLogin, user };
};
