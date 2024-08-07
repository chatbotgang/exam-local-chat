import LogInForm from "./components/LogInForm";
import Chatroom from "./components/Chatroom";
import { useUserSession } from "./hooks/useUserSession";

function App() {
  const { handleSetUsername, handleSetUserAvatar, user, isUserLogin } =
    useUserSession();

  return (
    <div className="w-screen h-screen">
      {!isUserLogin ? (
        <LogInForm
          onSetUsername={handleSetUsername}
          onSetUserAvatar={handleSetUserAvatar}
          userAvatar={user.userAvatar}
        />
      ) : (
        <Chatroom user={user} />
      )}
    </div>
  );
}

export default App;
