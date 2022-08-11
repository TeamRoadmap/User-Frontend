import Head from "next/head";
import { Layout } from "../../dashboard/components";
import { Grid, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";

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
        <Text>Browse Interactive courses created with our top creator which allows you to follow along with ease.</Text>
      </Stack>
    </Layout>
  );
}

export { getServerSideProps } from "../../shared/lib/chakra";
