import { Avatar, Flex, Text } from "@chakra-ui/react";

export const UserProfile = ({username, onClick}) => {
  return (
    <Flex
      onClick={onClick}
      p={4}
      align="center"
      w="full"
      _hover={{ bg: "blue.100", cursor: "pointer" }}
    >
      <Avatar src="" marginEnd={3} />
      <Text>{username}</Text>
    </Flex>
  );
};
