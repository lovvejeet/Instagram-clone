import { Button, useColorMode } from "@chakra-ui/react";
import CreatePost from "./CreatePosts";
import Home from "./Home";
// import Notifications from "./Notifications";
import ProfileLink from "./ProfileLink";
import Search from "./Search";

const SidebarItems = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Home />
      <Search />
      {/* <Notifications /> */}
      <CreatePost />
      <ProfileLink />
      <Button onClick={toggleColorMode}>
      {colorMode === "light" ? "Dark" : "Light"}
      </Button>
    </>
  );
};

export default SidebarItems;
