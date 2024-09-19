import useStorage from "./hooks/useStorage";
import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/Login";
import { StorageKey, StorageType } from "./types";

function App() {
  const [storedValue, setStoredName] = useStorage(
    StorageKey.Username,
    StorageType.Session,
  );

  return (
    <>
      <h1>Local Chat App</h1>
      {storedValue ? <ChatRoom /> : <Login setStoredName={setStoredName} />}
    </>
  );
}

export default App;
