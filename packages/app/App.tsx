import Header from "./components/Header";
import UserForm from "./components/UserForm";
import ChatRoom from "./components/ChatRoom";

import useUserLogin from "./hooks/useUserLogin";

const App = () => {
  const { isLoggedIn, handleUserLogIn } = useUserLogin();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {isLoggedIn ? (
        <ChatRoom />
      ) : (
        <UserForm onUsernameSubmit={handleUserLogIn} />
      )}
    </div>
  );
};

export default App;
