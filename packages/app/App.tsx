import { useUser } from "./src/hook";
import ChatRoom from "./src/pages/ChatRoom";
import Login from "./src/pages/Login";

function App() {
  const { user, setUserName } = useUser();
  const isLoggedIn = user !== null;

  if (!isLoggedIn) {
    return <Login onLogin={(username) => setUserName(username)} />;
  }

  return (
    <div className="h-screen">
      <ChatRoom userName={user} />
    </div>
  );
}

export default App;
