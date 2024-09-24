import { Box, ChakraProvider } from "@chakra-ui/react";
import useStorage from "./hooks/useStorage";
import ChatRoom from "./pages/ChatRoom";
import Login from "./pages/Login";
import theme from "./theme";
import { StorageKey, StorageType } from "./types";

function App() {
  const [storedName, setStoredName] = useStorage(
    StorageKey.Username,
    "",
    StorageType.Session,
  );

  return (
    <ChakraProvider theme={theme}>
      <Box bg="grey.700">
        {storedName ? (
          <ChatRoom storedName={storedName} />
        ) : (
          <Login setStoredName={setStoredName} />
        )}
      </Box>
    </ChakraProvider>
  );
}

export default App;
