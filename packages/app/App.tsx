import { useState } from "react";
import { useMessage } from "./src/hook/useMessage";

function App() {
  const [inputText, setInputText] = useState("");
  const { messages, sendMessage } = useMessage();

  const handleSendMessage = () => {
    if (inputText.trim()) {
      sendMessage("User", inputText);
      setInputText("");
    }
  };

  return (
    <div>
      <h1>Broadcast Messages</h1>
      <div>
        {messages.map((msg, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={index}>
            <strong>{msg.user}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type a message"
      />
      <button type="button" onClick={handleSendMessage}>
        Send Message
      </button>
    </div>
  );
}

export default App;
