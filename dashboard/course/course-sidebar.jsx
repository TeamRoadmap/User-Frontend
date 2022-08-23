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
  Stack,
  Divider,
} from "@chakra-ui/react";
import {
  AiOutlineContainer,
  AiOutlineFund,
  AiOutlineHome,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineSetting,
} from "react-icons/ai";
import { FiLogOut, FiMoon, FiSkipBack, FiSun } from "react-icons/fi";
import React from "react";
import NavLink from "../../shared/components/nav-link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "../../shared/lib/firebase";
import { useState } from "react";
import axios from "axios";

const CourseSidebar = ({ data }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { section, course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.user);
  const [activeSection, setActiveSection] = useState();
  // const [activeSubSection, setActiveSubSection] = useState();
  const sidebar = useDisclosure();
  const color = useColorModeValue("gray.600", "gray.300");
  const selectedColor = useColorModeValue("purple.600", "purple.600");
  const dispatch = useDispatch();
  console.log(section);
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

  const getSectionData = async (sectionId) => {
    try {
      const res = await axios.get(
        `https://roadmap-backend-host.herokuapp.com/api/v1/section/${sectionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "course/setSectionData",
        payload: { ...res.data.data.section, type: "section" },
      });
      setActiveSection(`${sectionId}`);
    } catch (err) {
      console.log(err);
      setActiveSection(false);
    }
  };
  const getSubsectionData = async (id) => {
    try {
      const res = await axios.get(
        `https://roadmap-backend-host.herokuapp.com/api/v1/subsection/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: "course/setSectionData",
        payload: { ...res.data.data.subsection, type: "subsection" },
      });
      if (activeSection !== id) {
        setActiveSection(`${id}`);
      } else {
        setActiveSection();
      }
    } catch (err) {
      setActiveSection(false);
      console.log(err);
    }
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
      w={{ md: "40%", lg: "20%", xl: "12%" }}
      {...props}
    >
      <Flex
        px="4"
        py="6"
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
          {course?.title}
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
        gap="4"
        m="4"
        aria-label="Main Navigation"
      >
        <Text
          fontSize="lg"
          ml="2"
          color="brand.500"
          _dark={{ color: "white" }}
          fontWeight="600"
        >
          Sections
        </Text>
        <Flex
          direction="column"
          align="left"
          mx="4"
        >
          {section?.map((data) => {
            return (
              <div key={data.order}>
                <Stack
                  direction="row"
                  alignItems="flex-start"
                  h="50px"
                >
                  <Divider orientation="vertical" />
                  <Button
                    variant="link"
                    fontSize="1.2rem"
                    p="2"
                    py="0"
                    textTransform="capitalize"
                    onClick={() => getSectionData(data.public_id)}
                    color={
                      activeSection == `${data.public_id}`
                        ? selectedColor
                        : color
                    }
                  >
                    {data.title}
                  </Button>
                </Stack>

                <Flex direction="column">
                  {data?.subsections?.map((subsec, id) => {
                    return (
                      <Stack
                        key={subsec?.id}
                        direction="row"
                        alignItems="flex-start"
                        h="50px"
                        px={4}
                        py="2"
                      >
                        <Divider orientation="vertical" />
                        <Button
                          variant="link"
                          textTransform="capitalize"
                          onClick={() => getSubsectionData(subsec.public_id)}
                          color={
                            activeSection == `${subsec.public_id}`
                              ? selectedColor
                              : color
                          }
                          p="2"
                          py="0"
                          fontSize="1.2rem"
                        >
                          {subsec.title}
                        </Button>
                      </Stack>
                    );
                  })}
                </Flex>
              </div>
            );
          })}
        </Flex>
        <Button
          m="6"
          onClick={toggleColorMode}
        >
          {colorMode === "light" ? <FiMoon /> : <FiSun color="#A0AEC0" />}
        </Button>
        <Button
          m="6"
          onClick={() => router.push("/dashboard/")}
          color={color}
        >
          Dashboard
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

export default CourseSidebar;
