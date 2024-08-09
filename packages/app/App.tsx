import LogInForm from "./components/LogInForm";
import Chatroom from "./components/Chatroom";
import { useUserSession } from "./hooks/useUserSession";

function App() {
  const { isUserLogin } = useUserSession();

  return (
    <div className="w-screen h-screen">
      {!isUserLogin ? <LogInForm /> : <Chatroom />}
    </div>
  );
}

export default App;
