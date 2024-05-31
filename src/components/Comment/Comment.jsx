import { Avatar, Flex, Text } from "@chakra-ui/react";

const Comment = ({ createdAt, username, profilePic, text }) => {
  return (
    <Flex gap={4}>
      {/* <Link to={`/${userProfile.username}`}> */}
      <Avatar src={profilePic} size={"sm"} />
      {/* </Link> */}
      <Flex direction={"column"}>
        <Flex gap={2} alignItems={"center"}>
          {/* <Link to={`/${userProfile.username}`}> */}
          <Text fontWeight={"bold"} fontSize={12}>
            {username}
          </Text>
          {/* </Link> */}
          <Text fontSize={14}>{text}</Text>
        </Flex>
        <Text fontSize={12} color={"gray"}>
          {createdAt}
        </Text>
      </Flex>
    </Flex>
  );
};
export default Comment;
