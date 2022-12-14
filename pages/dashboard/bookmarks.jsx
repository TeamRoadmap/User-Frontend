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
} from "@chakra-ui/react";
import { IoMdInformation } from "react-icons/io";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NextLink from "next/link";
import { BeatLoader } from "react-spinners";

export default function Bookmarks() {
  const { token, user } = useSelector((state) => state.user);
  const [bookmarks, setBookmarks] = useState();
  const [loading, setLoading] = useState(true);
  const bg = useColorModeValue("white", "gray.800");

  const getBookmarks = async () => {
    setLoading(true);
    const res = await axios.get(
      `https://roadmap-backend-host.herokuapp.com/api/v1//user/bookmarks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setBookmarks(res.data.data.bookmarks);
    setLoading(false);
  };

  useEffect(() => {
    getBookmarks();
  }, []);

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
        <Text>Here are all the courses you have bookmarked!</Text>
        {bookmarks?.length < 1 ? (
          <Heading fontSize="1rem">Please bookmark some courses</Heading>
        ) : (
          <Skeleton isLoaded={!loading}>
            {loading && <BeatLoader color="#6B46C1" />}
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
              gap={6}
            >
              {bookmarks?.map((bookmark) => {
                return (
                  <GridItem
                    colSpan={2}
                    key={bookmark.course.id}
                    cursor="pointer"
                  >
                    <NextLink
                      href={`/dashboard/courses/course/${bookmark?.course.public_id}`}
                    >
                      <Flex
                        w="100%"
                        key={bookmark.course.id}
                        h="fit-content"
                        rounded="8px"
                        bg={bg}
                        boxShadow={"md"}
                        direction={{ base: "column", md: "row" }}
                        p="1.5rem"
                        align="center"
                        gap="2rem"
                      >
                        <IconButton
                          color="purple.600"
                          icon={<IoMdInformation size="2rem" />}
                        />
                        <Flex
                          direction="column"
                          align={{ base: "center", md: "start" }}
                        >
                          <Text casing="capitalize">
                            {bookmark.course.title}
                          </Text>
                          <Text>{bookmark.course.description}</Text>
                        </Flex>
                      </Flex>
                    </NextLink>
                  </GridItem>
                );
              })}
            </Grid>
          </Skeleton>
        )}
      </Stack>
    </Layout>
  );
}

export { getServerSideProps } from "../../shared/lib/chakra";
