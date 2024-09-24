import { Box, Flex, Text } from "@chakra-ui/react";
import type { Message } from "../types";
import { formatDate } from "../utils/formatDate";

interface MessageItemProps {
  message: Message;
  key: string;
  isCurrentUser: boolean;
}
const MessageItem = ({ message, isCurrentUser }: MessageItemProps) => {
  return (
    <Flex alignItems={isCurrentUser ? "end" : "start"} m={4} direction="column">
      <Text fontSize="sm" color="grey.500">
        {message.userName}:
      </Text>
      <Flex justify="space-between" color="grey.500" alignItems="end" gap={2}>
        <Box
          bg={isCurrentUser ? "green.500" : "grey.500"}
          boxShadow="md"
          borderRadius="md"
          p={2}
        >
          <Text
            fontSize="lg"
            maxW="sm"
            color="white"
            style={{ whiteSpace: "pre-wrap" }}
          >
            {message.content}
          </Text>
        </Box>
        <Text fontSize="sm" {...(isCurrentUser && { order: -1 })}>
          {formatDate(message.timestamp)}
        </Text>
      </Flex>
    </Flex>
  );
};

export default MessageItem;
