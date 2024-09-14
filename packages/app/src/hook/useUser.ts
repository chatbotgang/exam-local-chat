import { useEffect, useState } from "react";

const USER_KEY = "exam-local-chat-user";

export function useUser() {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem(USER_KEY);
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const setUserName = (name: string) => {
    sessionStorage.setItem(USER_KEY, name);
    setUser(name);
  };

  const clearUser = () => {
    sessionStorage.removeItem(USER_KEY);
    setUser(null);
  };

  return { user, setUserName, clearUser };
}
