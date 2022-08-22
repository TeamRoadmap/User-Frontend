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
} from "@chakra-ui/react";

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
            Krishanu Dutta!
          </Text>{" "}
        </Heading>
        <Text>
          Browse Interactive courses created with our top creator which allows
          you to follow along with ease.
        </Text>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
          gap={6}
        >
          <Flex
            w="100%"
            h="fit-content"
            rounded="8px"
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"md"}
            direction={{ base: "column", md: "row" }}
            p="1.5rem"
            align="center"
            gap="2rem"
          >
            <img src="/images/information-square.svg" />
            <Flex
              direction="column"
              align={{ base: "center", md: "start" }}
            >
              <Text>Frontend</Text>
              <Text>
                Discover the concepts, reference, guides and tutorials.
              </Text>
            </Flex>
          </Flex>
          <Flex
            w="100%"
            h="fit-content"
            rounded="8px"
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"md"}
            direction={{ base: "column", md: "row" }}
            p="1.5rem"
            align="center"
            gap="2rem"
          >
            <img src="/images/information-square.svg" />
            <Flex
              direction="column"
              align={{ base: "center", md: "start" }}
            >
              <Text>Frontend</Text>
              <Text>
                Discover the concepts, reference, guides and tutorials.
              </Text>
            </Flex>
          </Flex>
          <Flex
            w="100%"
            h="fit-content"
            rounded="8px"
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"md"}
            direction={{ base: "column", md: "row" }}
            p="1.5rem"
            align="center"
            gap="2rem"
          >
            <img src="/images/information-square.svg" />
            <Flex
              direction="column"
              align={{ base: "center", md: "start" }}
            >
              <Text>Frontend</Text>
              <Text>
                Discover the concepts, reference, guides and tutorials.
              </Text>
            </Flex>
          </Flex>
          <Flex
            w="100%"
            h="fit-content"
            rounded="8px"
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"md"}
            direction={{ base: "column", md: "row" }}
            p="1.5rem"
            align="center"
            gap="2rem"
          >
            <img src="/images/information-square.svg" />
            <Flex
              direction="column"
              align={{ base: "center", md: "start" }}
            >
              <Text>Frontend</Text>
              <Text>
                Discover the concepts, reference, guides and tutorials.
              </Text>
            </Flex>
          </Flex>
          <Flex
            w="100%"
            h="fit-content"
            rounded="8px"
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"md"}
            direction={{ base: "column", md: "row" }}
            p="1.5rem"
            align="center"
            gap="2rem"
          >
            <img src="/images/information-square.svg" />
            <Flex
              direction="column"
              align={{ base: "center", md: "start" }}
            >
              <Text>Frontend</Text>
              <Text>
                Discover the concepts, reference, guides and tutorials.
              </Text>
            </Flex>
          </Flex>
        </Grid>
      </Stack>
    </Layout>
  );
}

export { getServerSideProps } from "../../shared/lib/chakra";
