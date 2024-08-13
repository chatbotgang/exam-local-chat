import { useState, useEffect, useCallback, useMemo } from "react";
import { CurrentUserContext } from "./Contexts";
import Header from "./components/Header";
import UsernameInput from "./components/UsernameInput";
import { USERNAME } from "./constants/sessionStorage";
import { useSessionStorage } from "usehooks-ts";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [userNameValue, setUserNameValue] = useSessionStorage(USERNAME, "");
  const [currentUser, setCurrentUser] = useState<string>("");

  const login = useCallback(
    (username: string) => {
      setCurrentUser(() => {
        setUserNameValue(username);
        return username;
      });
    },
    [setUserNameValue],
  );

  const currentUserContextValue = useMemo(
    () => ({
      currentUser,
      login,
    }),
    [currentUser, login],
  );

  useEffect(() => {
    setCurrentUser(userNameValue);
  }, [userNameValue]);

  return (
    <>
      <Header />
      <main className="container mx-auto px-2 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <CurrentUserContext.Provider value={currentUserContextValue}>
          {currentUser === "" ? <UsernameInput /> : <ChatRoom />}
        </CurrentUserContext.Provider>
      </main>
    </>
  );
}

export default App;
