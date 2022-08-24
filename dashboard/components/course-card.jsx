import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Text,
  IconButton,
  Button,
  Img,
  Stack,
  ButtonGroup,
  Divider,
} from "@chakra-ui/react";
import {
  AiOutlineEdit,
  AiOutlineArrowUp,
  AiOutlineArrowDown,
  AiOutlineEye,
  AiOutlineInfoCircle,
  AiOutlineSave,
  AiOutlineInsertRowAbove,
  AiOutlineSelect,
} from "react-icons/ai";
import { BsBookmark, BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import NextLink from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
// import Courseimg from "/images/react-course.webp";

const CourseCard = ({
  title,
  id,
  description,
  public_id,
  vote,
  type,
  bookmarked,
  enrolled,
  coursesId,
}) => {
  const { token, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const color = useColorModeValue("white", "gray.800");
  const [loading, setLoading] = useState(false);
  const [bookLoading, setBookLoading] = useState(false);
  const lastUpdatedColor = useColorModeValue("gray.600", "gray.300");

  const getCourseDetail = async () => {
    try {
      const res = await axios.get(
        `https://roadmap-backend-host.herokuapp.com/api/v1/course?type=${coursesId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: "course/setCourses", payload: res.data.data });
      setLoading(false);
      setBookLoading(false);
      setEnrollLoading(false);
    } catch (err) {
      setError("error occured");
    }
  };

  const onVote = async (data) => {
    setLoading(true);

    if (vote === undefined) {
      try {
        const res = await axios.post(
          `https://roadmap-backend-host.herokuapp.com/api/v1/course/${public_id}/vote`,
          {
            vote: data,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        getCourseDetail();
      } catch (err) {}
    } else {
      try {
        const res = await axios.patch(
          `https://roadmap-backend-host.herokuapp.com/api/v1/course/${public_id}/vote`,
          {
            vote: data,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        getCourseDetail();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onBookmark = async (data) => {
    setBookLoading(true);
    if (bookmarked == false) {
      try {
        const res = await axios.post(
          `https://roadmap-backend-host.herokuapp.com/api/v1/course/${public_id}/bookmark`,
          {
            bookmark: data,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        getCourseDetail();
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        const res = await axios.delete(
          `https://roadmap-backend-host.herokuapp.com/api/v1/course/${public_id}/bookmark`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        getCourseDetail();
      } catch (err) {
        console.log(err);
      }
    }
  };



  return (
    <Box
      maxW={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"md"}
      rounded={"md"}
      p="4"
      pos={"relative"}
      zIndex={1}
    >
      <Box maxW="full"></Box>

      <Box px="4">
        <Flex
          direction="column"
          gap="12"
        >
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text
              as="p"
              fontSize="md"
              fontWeight="semibold"
              casing="capitalize"
              color={useColorModeValue("gray.700", "gray.200")}
            >
              {title}
            </Text>
            <ButtonGroup>
              <IconButton
                isLoading={loading}
                variant={vote == undefined || vote == false ? "ghost" : "solid"}
                onClick={() => onVote(true)}
                colorScheme="green"
                icon={<AiOutlineArrowUp />}
                aria-label="upvote"
              />
              <IconButton
                isLoading={loading}
                variant={vote == undefined || vote == true ? "ghost" : "solid"}
                colorScheme="red"
                onClick={() => onVote(false)}
                icon={<AiOutlineArrowDown />}
                aria-label="downvote"
              />
            </ButtonGroup>
          </Flex>
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text
              as="p"
              fontSize="md"
              color={lastUpdatedColor}
            >
              {description}
            </Text>
            <IconButton
              isLoading={bookLoading}
              variant={bookmarked ? "solid" : "ghost"}
              colorScheme="purple"
              onClick={() => onBookmark(!bookmarked)}
              icon={<BsBookmark />}
              aria-label="bookmark"
            />
          </Flex>
          <Flex></Flex>
          <NextLink href={`/dashboard/courses/course/${public_id}`}>
            <Button>Learn more</Button>
          </NextLink>
        </Flex>
      </Box>
      {/* <Divider
        orientation="horizontal"
        w="100"
        p="2"
      />
      <ButtonGroup
        p="4"
        variant="link"
        bg="none"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <Button
          bg="none"
          rightIcon={<AiOutlineEye />}
        >
          Preview
        </Button>

        <Divider
          orientation="vertical"
          w="100"
          p="2"
        />
        {/* <NextLink href={`/dashboard/course/${public_id}`}> */}
      {/* <Button
          bg="none"
          rightIcon={<AiOutlineEdit />}
        >
          {" "}
          Edit
        </Button>
        {/* </NextLink> */}
      {/* <Divider
          orientation="vertical"
          w="100"
          p="2"
        />
        <Button
          bg="none"
          rightIcon={<AiOutlineInfoCircle />}
        >
          {" "}
          Info
        </Button>
      </ButtonGroup>  */}
    </Box>
  );
};

export default CourseCard;
