import Header from "./components/Header";
import UserForm from "./components/UserForm";
import ChatRoom from "./components/ChatRoom";

import useUserLogin from "./hooks/useUserLogin";

import "./i18n";

const App = () => {
  const { isLoggedIn, handleUserLogIn, currentUser } = useUserLogin();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      {isLoggedIn ? (
        <ChatRoom currentUser={currentUser} />
      ) : (
        <UserForm onUsernameSubmit={handleUserLogIn} />
      )}
    </div>
  );
};

export default App;
