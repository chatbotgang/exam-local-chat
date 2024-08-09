import { useState, useEffect, useCallback, useMemo } from "react";
import { CurrentUserContext } from "./Contexts";
import Header from "./components/Header";
import UsernameInput from "./components/UsernameInput";
import { USERNAME } from "./constants/sessionStorage";

function App() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  useEffect(() => {
    const username = sessionStorage.getItem(USERNAME);
    if (username !== null) {
      setCurrentUser(username);
    }
  }, []);
  const login = useCallback((username: string) => {
    sessionStorage.setItem(USERNAME, username);
    setCurrentUser(username);
  }, []);
  const currentUserContextValue = useMemo(
    () => ({
      currentUser,
      login,
    }),
    [currentUser, login],
  );

  return (
    <>
      <Header />
      <main className="container mx-auto px-2 sm:px-6 lg:px-8">
        <CurrentUserContext.Provider value={currentUserContextValue}>
          {currentUser === null ? (
            <UsernameInput />
          ) : (
            <div className="text-gray-900 dark:text-white">ChatRoom</div>
          )}
        </CurrentUserContext.Provider>
      </main>
    </>
  );
}

export default App;
