import { Box, Center } from "@chakra-ui/react";
import type { SystemText } from "../types";

interface SystemMessageProps {
  message: SystemText;
}

const SystemMessage = ({ message }: SystemMessageProps) => {
  return (
    <Center m={4} color="grey.500">
      <Box border="1px" borderRadius="md" px={2} py={1}>
        {message.content}
      </Box>
    </Center>
  );
};

export default SystemMessage;
