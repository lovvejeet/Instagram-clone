import { Avatar, Box, Button, Flex, VStack } from "@chakra-ui/react";
import useFollowUser from "../../hooks/useFollowUser";
import useAuthStore from "../../store/authStore";

const SuggestedUser = ({ user, setUser }) => {
  const { isFollowing, isUpdating, handleFollowUser } = useFollowUser(
    user?.uid
  );
  const authUser = useAuthStore((state) => state.user);

  const onFollowUser = async () => {
    if (isUpdating) return; // Prevent multiple clicks while updating
    await handleFollowUser();
    setUser({
      ...user,
      followers: isFollowing
        ? user.followers.filter((follower) => follower.uid !== authUser.uid)
        : [...user.followers, authUser],
    });
  };

  if (!user) return null; // Return null if user is not defined

  return (
    <Flex justifyContent="space-between" alignItems="center" w="full" p={2}>
      <Flex alignItems="center" gap={2}>
        <Avatar src={user.profilePicURL} />
        <VStack spacing={1} alignItems="flex-start">
          <Box fontSize="14px" fontWeight="bold">
            {user.fullname}
          </Box>
          <Box fontSize="12px" color="gray.500">
            {user.followers.length} followers
          </Box>
        </VStack>
      </Flex>

      {authUser.uid !== user.uid && (
        <Button
          fontSize="13px"
          bg="transparent"
          p={2}
          h="auto"
          fontWeight="medium"
          color="blue.400"
          cursor="pointer"
          _hover={{
            color: "white",
            bg: "blue.400",
          }}
          onClick={onFollowUser}
          isLoading={isUpdating}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      )}
    </Flex>
  );
};

export default SuggestedUser;
