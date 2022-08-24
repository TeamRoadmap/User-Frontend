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
  Skeleton,
  List,
  ListItem,
  ListIcon,
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
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { BeatLoader, GridLoader } from "react-spinners";
import { BiCheckCircle } from "react-icons/bi";
import { BsCircleFill, BsCircle } from "react-icons/bs";
import { TbCircleDot } from "react-icons/tb";

const CourseSidebar = ({ data }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { section, course, sectionProgress, sectionLoading } = useSelector(
    (state) => state.course
  );
  const { token } = useSelector((state) => state.user);
  const [activeSection, setActiveSection] = useState();
  const [progress, setProgress] = useState();
  const [loading, setLoading] = useState(false);
  // const [activeSubSection, setActiveSubSection] = useState();
  const sidebar = useDisclosure();
  const color = useColorModeValue("gray.600", "gray.300");
  const selectedColor = useColorModeValue("purple.600", "purple.600");
  const dispatch = useDispatch();

  const router = useRouter();

  const getSectionData = async (sectionId) => {
    setLoading(true);

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
      setLoading(false);
      setActiveSection(`${sectionId}`);
    } catch (err) {
      console.log(err);
      setActiveSection(false);
    }
  };

  const getSubsectionData = async (id) => {
    try {
      setLoading(true);
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
      setLoading(false);
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
      _dark={{ bg: "gray.900" }}
      border
      borderColor={useColorModeValue("gray.100", "gray.700")}
      color="inherit"
      borderRightWidth="1px"
      w="66"
      {...props}
    >
      <Flex
        px="4"
        py="6"
        direction="column"
        align="left"
        justify="space-between"
        gap="4"
      >
        <Text
          fontSize="xl"
          mt={{ sm: "2", md: "4" }}
          align="left"
          color="brand.500"
          _dark={{ color: "white" }}
          fontWeight="bold"
          casing="capitalize"
        >
          {!loading ? `${course?.title}` : "Loading...."}
        </Text>
        <Flex
          gap="4"
          direction="row"
          justifyContent="space-between"
        >
          <Button
            onClick={toggleColorMode}
            w="40%"
          >
            {colorMode === "light" ? <FiMoon /> : <FiSun color="#A0AEC0" />}
          </Button>
          <Button
            w="50%"
            onClick={() => router.push(`/dashboard/courses/${course.types[0]}`)}
            color={color}
          >
            Courses
          </Button>
        </Flex>

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
        {sectionLoading ? (
          <Stack>
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        ) : (
          // <Flex
          //   direction="column"
          //   align="left"
          //   mx="4"
          // >
          <List
            spacing="4"
            stylePosition="outside"
          >
            {section?.map((data) => {
              return (
                <div key={data.order}>
                  <ListItem
                    onClick={() => getSectionData(data.public_id)}
                    ml="2"
                    cursor="pointer"
                    py="1"
                  >
                    <ListIcon
                      as={
                        activeSection == `${data.public_id}`
                          ? BsCircleFill
                          : BsCircle
                      }
                      color="purple.600"
                    />
                    <Button
                      variant="link"
                      p="2"
                      py="0"
                      onClick={() => getSectionData(data.public_id)}
                      color={
                        activeSection == `${data.public_id}`
                          ? selectedColor
                          : color
                      }
                    >
                      <Text
                        textOverflow="ellipsis"
                        fontSize="1rem"
                        casing="capitalize"
                      >
                        {data.title}
                      </Text>
                    </Button>
                  </ListItem>
                  {/* <Stack
                    direction="row"
                    alignItems="center"
                    h="50px"
                  >
                    <Divider orientation="vertical" />
                    <Button
                      variant="link"
                      p="2"
                      py="0"
                      onClick={() => getSectionData(data.public_id)}
                      color={
                        activeSection == `${data.public_id}`
                          ? selectedColor
                          : color
                      }
                    >
                      <Text
                        textOverflow="ellipsis"
                        fontSize="1rem"
                        casing="capitalize"
                      >
                        {data.title}
                      </Text>
                    </Button>
                  </Stack> */}

                  <List
                    spacing={3}
                    stylePosition="inside"
                  >
                    {data?.subsections?.map((subsec, id) => {
                      return (
                        <ListItem
                          align="center"
                          onClick={() => getSubsectionData(subsec.public_id)}
                          cursor="pointer"
                          key={subsec?.id}
                        >
                          <ListIcon
                            as={
                              activeSection == `${subsec.public_id}`
                                ? BsCircleFill
                                : BsCircle
                            }
                            color="purple.600"
                          />
                          <Button
                            variant="link"
                            textTransform="capitalize"
                            color={
                              activeSection == `${subsec.public_id}`
                                ? selectedColor
                                : color
                            }
                          >
                            <Text
                              py="2"
                              fontSize="0.9rem"
                            >
                              {subsec.title}
                            </Text>
                          </Button>
                        </ListItem>
                        // <Stack
                        //   key={subsec?.id}
                        //   direction="row"
                        //   alignItems="flex-start"
                        //   h="50px"
                        //   px={4}
                        //   py="2"
                        // >
                        //   <Divider orientation="vertical" />
                        //   <Button
                        //     variant="link"
                        //     textTransform="capitalize"
                        //     onClick={() => getSubsectionData(subsec.public_id)}
                        //     color={
                        //       activeSection == `${subsec.public_id}`
                        //         ? selectedColor
                        //         : color
                        //     }
                        //     p="2"
                        //     py="0"
                        //   >
                        //     <Text
                        //       p="2"
                        //       fontSize="0.8rem"
                        //     >
                        //       {subsec.title}
                        //     </Text>
                        //   </Button>
                        // </Stack>
                      );
                    })}
                  </List>
                </div>
              );
            })}
          </List>
        )}
      </Flex>
    </Box>
  );
  return (
    <Box
      as="section"
      bg="white"
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
