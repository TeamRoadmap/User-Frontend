import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Button,
  Flex,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AiOutlineContainer,
  AiOutlineFund,
  AiOutlineHome,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineFileDone,
} from "react-icons/ai";
import { BsBookmarkCheck } from "react-icons/bs";
import { FiLogOut, FiMoon, FiSun } from "react-icons/fi";
import React from "react";
import NavLink from "../../shared/components/nav-link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../../shared/lib/firebase";

const Sidebar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const sidebar = useDisclosure();
  const color = useColorModeValue("gray.600", "gray.300");
  const dispatch = useDispatch();

  const router = useRouter();

  const onLogOut = (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        console.log("signout successful");
      })
      .catch((error) => {
        console.log(error);
      });
    dispatch({ type: "user/logout" });
    router.push("/login", undefined, { shallow: true });
  };

  const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color="inherit"
        _dark={{ color: "gray.400" }}
        _hover={{
          bg: "gray.100",
          _dark: { bg: "gray.900" },
          color: "gray.900",
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mx="2"
            boxSize="4"
            _groupHover={{
              color: color,
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props) => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="white"
      _dark={{ bg: "gray.900" }}
      border
      borderColor={useColorModeValue("gray.100", "gray.700")}
      color="inherit"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex
        px="4"
        py="5"
        align="center"
        justify="space-between"
        gap="4"
      >
        <Text
          fontSize="xl"
          ml="2"
          color="brand.500"
          _dark={{ color: "white" }}
          fontWeight="bold"
        >
          Dashboard
        </Text>
        <IconButton
          aria-label="Menu"
          display={{ base: "inline-flex", md: "none" }}
          my="4"
          onClick={sidebar.onClose}
          icon={<AiOutlineLeft />}
          size="sm"
        />
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        gap="2"
        aria-label="Main Navigation"
      >
        <NavLink to="/dashboard">
          <NavItem icon={AiOutlineHome}>Home</NavItem>
        </NavLink>
        {/* <NavLink to="/dashboard/leaderboard">
          <NavItem icon={AiOutlineContainer}>Leaderboard</NavItem>
        </NavLink> */}
        <NavLink to="/dashboard/bookmarks">
          <NavItem icon={BsBookmarkCheck}>Bookmarks</NavItem>
        </NavLink>
        <NavLink to="/dashboard/enrolled">
          <NavItem icon={AiOutlineFileDone}>Enrolled</NavItem>
        </NavLink>
        {/* <NavLink to="/dashboard/settings">
          <NavItem icon={AiOutlineSetting}>Settings</NavItem>
        </NavLink> */}

        <Button
          m="6"
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? <FiMoon /> : <FiSun color="#A0AEC0" />}
        </Button>
        <Button
          m="6"
          leftIcon={<FiLogOut />}
          onClick={onLogOut}
          color={color}
        >
          Log Out
        </Button>
      </Flex>
    </Box>
  );
  return (
    <Box
      as="section"
      bg="#F9F9F6"
      _dark={{ bg: "gray.800" }}
    >
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent
            w="full"
            borderRight="none"
          />
        </DrawerContent>
      </Drawer>
      <IconButton
        aria-label="Menu"
        display={{
          base: "inline-flex",
          md: "none",
        }}
        mx="10"
        mt="4"
        onClick={sidebar.onOpen}
        icon={<AiOutlineRight />}
        size="md"
      />
    </Box>
  );
};

export default Sidebar;