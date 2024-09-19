import useStorage from "./hooks/useStorage";
import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/Login";
import { StorageKey, StorageType } from "./types";

function App() {
  const [storedName, setStoredName] = useStorage(
    StorageKey.Username,
    "",
    StorageType.Session,
  );

  return (
    <>
      <h1>Local Chat App</h1>
      {storedName ? (
        <ChatRoom storedName={storedName} />
      ) : (
        <Login setStoredName={setStoredName} />
      )}
    </>
  );
}

export default App;
