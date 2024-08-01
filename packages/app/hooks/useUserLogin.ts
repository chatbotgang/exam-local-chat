import { useState, useMemo } from "react";

type useUserLoginReturn = {
  currentUser: string;
  handleUserLogIn: (username: string) => void;
  isLoggedIn: boolean;
};

const useUserLogin = (): useUserLoginReturn => {
  const [currentUser, setCurrentUser] = useState(
    window.sessionStorage.getItem("username") || "",
  );

  const isLoggedIn: boolean = useMemo(() => !!currentUser, [currentUser]);

  const handleUserLogIn = (username: string): void => {
    setCurrentUser("user");

    window.sessionStorage.setItem("username", username);
  };

  return {
    currentUser,
    handleUserLogIn,
    isLoggedIn,
  };
};

export default useUserLogin;
