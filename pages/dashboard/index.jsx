import Head from "next/head";
import { Layout } from "../../dashboard/components";
import {
  Grid,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  GridItem,
  Flex,
  useColorModeValue,
  Skeleton,
  IconButton,
  Icon,
  Image,
} from "@chakra-ui/react";
import { IoMdInformation } from "react-icons/io";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NextLink from "next/link";
import { BeatLoader } from "react-spinners";
import { FaGit, FaNodeJs, FaReact } from "react-icons/fa";
import { TbBrandDocker } from "react-icons/tb";
const data = [
  {
    isNew: false,
    imageURL: "/images/react-course.webp",
    courseName: " Basics of React",
    type: "Frontend",
    lastUpdated: "12/04/12",
    edit: "some link",
  },

  {
    isNew: false,
    imageURL: "/images/react-course.webp",
    courseName: " Basics of React",
    type: "Frontend",
    lastUpdated: "12/04/12",
    edit: "some link",
  },
  {
    isNew: false,
    imageURL: "/images/react-course.webp",
    courseName: " Basics of React",
    type: "Frontend",
    lastUpdated: "12/04/12",
    edit: "some link",
  },
];

const data2 = [
  {
    isNew: false,
    imageURL: "/images/simple-chart.png",
    courseName: "Upvotes/Downvotes",
  },

  {
    isNew: false,
    imageURL: "/images/user.png",
    courseName: "User Engangement",
  },
  {
    isNew: false,
    imageURL: "/images/quiz.png",
    courseName: " Quizzes Interaction",
  },
];

export default function Home() {
  const { token, user } = useSelector((state) => state.user);
  const [types, setTypes] = useState();
  const [loading, setLoading] = useState(true);
  const bg = useColorModeValue("white", "gray.800");

  const getType = async () => {
    setLoading(true);
    const res = await axios.get(
      `https://roadmap-backend-host.herokuapp.com/api/v1/coursetype`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTypes(res.data.data.courseTypes);
    setLoading(false);
  };

  useEffect(() => {
    getType();
  }, []);

  const Icon = (name) => {
    switch (name) {
      case "frontend":
        return <FaReact size="1.4rem" />;
      case "backend":
        return <FaNodeJs size="1.4rem" />;
      case "devops":
        return <TbBrandDocker size="1.4rem" />;
      case "git":
        return <FaGit size="1.4rem" />;
    }
  };

  return (
    <Layout>
      <Head>
        <title>Roadmap Dashboard</title>
        <meta
          name="description"
          content="Roadmap Creator App"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <Stack
        m="6"
        direction="column"
        gap="12"
      >
        <Heading fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}>
          <Text
            as={"span"}
            position={"relative"}
          >
            Hey There,
          </Text>{" "}
          <Text
            color={"purple.600"}
            as={"span"}
          >
            {user.name}!
          </Text>{" "}
        </Heading>
        <Text>
          Browse all our courses created by great creators in these domains.
        </Text>
        <Skeleton isLoaded={!loading}>
          <SimpleGrid
            columns={{ base: "1", md: "2", lg: "3" }}
            spacing="4"
          >
            {loading && <BeatLoader color="#6B46C1" />}
            {types?.map((type) => {
              return (
                <NextLink
                  key={type.id}
                  href={`/dashboard/courses/${type.public_id}`}
                >
                  <Flex
                    w="100%"
                    key={type.id}
                    h="fit-content"
                    rounded="8px"
                    bg={bg}
                    boxShadow={"md"}
                    direction={{ base: "column", md: "row" }}
                    p="1.5rem"
                    align="center"
                    cursor="pointer"
                    gap="2rem"
                  >
                    <IconButton
                      color="purple.600"
                      icon={Icon(type.name)}
                    />
                    <Flex
                      direction="column"
                      align={{ base: "center", md: "start" }}
                    >
                      <Text casing="capitalize">{type.name}</Text>
                      {/* <Text>
                  Discover the concepts, reference, guides and tutorials.
                </Text> */}
                    </Flex>
                  </Flex>
                </NextLink>
              );
            })}
          </SimpleGrid>
        </Skeleton>
      </Stack>
    </Layout>
  );
}

export { getServerSideProps } from "../../shared/lib/chakra";
