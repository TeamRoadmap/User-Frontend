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
} from "react-icons/ai";
import { BsBookmark, BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import NextLink from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
// import Courseimg from "/images/react-course.webp";

const CourseCard = ({ title, id, description, public_id, genre_id }) => {
  const { token, user } = useSelector((state) => state.user);
  const { vote } = useSelector((state) => state.course);
  const [votec, setVotec] = useState();
  const dispatch = useDispatch();
  const color = useColorModeValue("white", "gray.800");
  const lastUpdatedColor = useColorModeValue("gray.600", "gray.300");
  const [bookmark, setbookmark] = useState(false);

  const onVote = async (data) => {
    if (vote == undefined) {
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
        setVotec(res.data.data.voteC.vote);
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
        setVotec(res.data.data.vote.vote);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    // dispatch({ type: "course/resetVote" });
  }, [public_id]);

  const onBookmark = async () => {
    try {
      const res = await axios.post(
        `https://roadmap-backend-host.herokuapp.com/api/v1/course/6fea8488-0580-4408-b6e2-1cb5e7da3b05/bookmark`,
        {
          bookmark: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // dispatch({ type: "course/setVote", payload: data });
    } catch (err) {
      console.log(err);
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
      <Box maxW="full">
        {/* <Img
          p="4"
          width="100%"
          height="100%"
          style={{ borderRadius: "1.2rem", objectFit: "contain" }}
          src={data.imageURL}
        /> */}
      </Box>

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
                variant={
                  votec === undefined || votec == false ? "ghost" : "solid"
                }
                onClick={() => onVote(true)}
                colorScheme="green"
                icon={<AiOutlineArrowUp />}
                aria-label="upvote"
              />
              <IconButton
                variant={
                  votec === undefined || votec == true ? "ghost" : "solid"
                }
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
              variant={bookmark ? "solid" : "ghost"}
              colorScheme="purple"
              onClick={() => onBookmark()}
              icon={<BsBookmark />}
              aria-label="bookmark"
            />
            <IconButton
              colorScheme="purple"
              onClick={() => onEnroll()}
              icon={<AiOutlineInsertRowAbove />}
              aria-label="saved"
            />
          </Flex>
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
