import { Box, Button, Flex, Link, Tooltip } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { InstagramLogo, InstagramMobileLogo } from "../../assets/constants";
import { BiLogOut } from "react-icons/bi";
import useLogout from "../../hooks/useLogout"; // Make sure the file name is correct
import SidebarItems from "./SidebarItems";

const SideBar = () => {
  const { handleLogout, isLoggingOut } = useLogout();
  // const sidebarItems = [
  //   {
  //     icon: <AiFillHome size={25} />,
  //     text: "Home",
  //     link: "/",
  //   },
  //   {
  //     icon: <SearchLogo />,
  //     text: "Search",
  //   },
  //   {
  //     icon: <NotificationsLogo />,
  //     text: "Notifications",
  //   },
  //   {
  //     icon: <CreatePostLogo />,
  //     text: "Create",
  //   },
  //   {
  //     icon: <Avatar size={"sm"} name="Burak" src="/profilepic.png" />,
  //     text: "Profile",
  //     link: "/asaprogrammer",
  //   },
  // ];

  return (
    <Box
      h={"100vh"}
      borderRight={"1px solid"}
      borderColor={"whiteAlpha.300"}
      py={8}
      position={"sticky"}
      top={0}
      left={0}
      px={{ base: 2, md: 4 }}
    >
      <Flex direction={"column"} gap={10} w={"full"} h={"full"}>
        <Link
          to={"/"}
          as={RouterLink}
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor={"pointer"}
        >
          <InstagramLogo />
        </Link>
        <Link
          to={"/"}
          as={RouterLink}
          p={2}
          display={{ base: "block", md: "none" }}
          cursor={"pointer"}
          borderRadius={6}
          _hover={{
            bg: "whiteAlpha.500",
          }}
          w={10}
        >
          <InstagramMobileLogo />
        </Link>
        <Flex direction={"column"} gap={5} cursor={"pointer"}>
          <SidebarItems />
        </Flex>
        <Tooltip
          hasArrow
          label={"Logout"}
          placement="right"
          ml={1}
          openDelay={500}
          display={{ base: "block", md: "none" }}
        >
          <Flex
            onClick={handleLogout}
            alignItems={"center"}
            gap={4}
            _hover={{
              bg: "whiteAlpha.400",
            }}
            mt={"auto"}
            borderRadius={6}
            p={2}
            w={{ base: 10, md: "full" }}
            justifyContent={{ base: "center", md: "flex-start" }}
          >
            <BiLogOut />
            <Button
              display={{ base: "none", md: "block" }}
              variant={"ghost"}
              _hover={{ bg: "transparent" }}
              isLoading={isLoggingOut}
            >
              Logout
            </Button>
          </Flex>
        </Tooltip>
      </Flex>
    </Box>
  );
};

export default SideBar;
