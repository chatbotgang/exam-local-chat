import LogInForm from "./components/LogInForm";
import Chatroom from "./components/Chatroom";
import { useUserSession } from "./hooks/useUserSession";

function App() {
  const { handleUserLogin, handleSetUserAvatar, user, isUserLogin } =
    useUserSession();

  return (
    <div className="w-screen h-screen">
      {!isUserLogin ? (
        <LogInForm
          onUserLogin={handleUserLogin}
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
