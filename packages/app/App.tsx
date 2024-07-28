import "normalize.css";
import { Chat } from "./pages";
import { SocketProvider } from "./providers";

function App() {
  return (
    <SocketProvider>
      <Chat />
    </SocketProvider>
  );
}

export default App;
