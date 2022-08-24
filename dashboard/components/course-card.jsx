import {
  Flex,
  Circle,
  Box,
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
import Image from "next/image";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const CourseCard = ({
  title,
  id,
  description,
  public_id,
  vote,
  type,
  bookmarked,
  coursesId,
  image,
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
    } catch (err) {
      console.log(err);
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
      pos={"relative"}
      zIndex={1}
    >
      <Box
        maxW="full"
        p="2"
        mb="8"
      >
        <NextLink href={`/dashboard/courses/course/${public_id}`}>
          {image !== null ? (
            <Image
              alt="img"
              p="4"
              width="4"
              height="2"
              layout="responsive"
              style={{
                borderRadius: "8px",
                objectFit: "contain",
                cursor: "pointer",
              }}
              src={image}
            />
          ) : (
            <Image
              alt="dummyimg"
              p="4"
              width="4"
              height="2"
              layout="responsive"
              style={{
                borderRadius: "8px",
                objectFit: "contain",
                cursor: "pointer",
              }}
              src="/images/dummy-img.webp"
            />
          )}
        </NextLink>
      </Box>

      <Box px="4">
        <Flex
          direction="column"
          gap="6"
        >
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text
              as="p"
              fontSize="xl"
              fontWeight="semibold"
              casing="capitalize"
              color={useColorModeValue("gray.700", "gray.200")}
            >
              {title}
            </Text>
            <ButtonGroup>
              <Tooltip label="Upvote">
                <IconButton
                  isLoading={loading}
                  variant={
                    vote == undefined || vote == false ? "ghost" : "solid"
                  }
                  onClick={() => onVote(true)}
                  colorScheme="green"
                  icon={<BiUpvote />}
                  aria-label="upvote"
                />
              </Tooltip>
              <Tooltip label="Downvote">
                <IconButton
                  isLoading={loading}
                  variant={
                    vote == undefined || vote == true ? "ghost" : "solid"
                  }
                  colorScheme="red"
                  onClick={() => onVote(false)}
                  icon={<BiDownvote />}
                  aria-label="downvote"
                />
              </Tooltip>
              <Tooltip label="bookmark">
                <IconButton
                  isLoading={bookLoading}
                  variant={bookmarked ? "solid" : "ghost"}
                  colorScheme="purple"
                  onClick={() => onBookmark(!bookmarked)}
                  icon={<BsBookmark size="1rem" />}
                  aria-label="bookmark"
                />
              </Tooltip>
            </ButtonGroup>
          </Flex>
          <Text
            as="p"
            fontSize="lg"
            color={lastUpdatedColor}
          >
            {description}
          </Text>
          <NextLink href={`/dashboard/courses/course/${public_id}`}>
            <Button>Learn more</Button>
          </NextLink>
        </Flex>
      </Box>
    </Box>
  );
};

export default CourseCard;
