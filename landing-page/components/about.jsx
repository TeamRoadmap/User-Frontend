import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import Courses from "../../public/images/courses.png";
import Vote from "../../public/images/vote.png";
// import AboutImage1 from "../../public/images/about1.png";
// import Stats from "../../public/images/stats.png";

const About = () => {
  const testimonialBg = useColorModeValue("gray.100", "gray.700");
  return (
    <>
      <Stack
        id="aboutus"
        minH={"50vh"}
        direction={{ base: "column-reverse", md: "row" }}
        mx={{ base: "2rem", md: "4rem" }}
        spacing="2rem"
      >
        <Flex
          flex={1}
          align={"center"}
          justify={"center"}
        >
          <Stack
            spacing={6}
            w={"full"}
            maxW={"lg"}
          >
            <Heading fontSize={{ base: "2xl", md: "2xl", lg: "4xl" }}>
              <Text
                as={"span"}
                position={"relative"}
              >
                Courses based on different topics
              </Text>
            </Heading>
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              color={useColorModeValue("gray.700", "gray.300")}
            >
              Browse Interactive courses created with our top creator which
              allows you to follow along with ease.
            </Text>
          </Stack>
        </Flex>
        <Flex
          py="3rem"
          px={{ base: "0", md: "2rem" }}
          flex={1}
          justify={"center"}
          align={{ base: "flex-end", md: "center" }}
        >
          <img
            alt="courses Image"
            src="/images/courses.png"
            style={{
              borderRadius: "8px",
              boxShadow: "0px 0px 40px 20px rgba(0, 0, 0, 0.05)",
            }}
          />
        </Flex>
      </Stack>
      <Stack
        minH={"50vh"}
        direction={{ base: "column-reverse", md: "row-reverse" }}
        p={{ base: "2rem", md: "4rem" }}
        spacing="2rem"
        bg={testimonialBg}
        my="4rem"
      >
        <Flex
          flex={1}
          align={"center"}
          justify={"center"}
        >
          <Stack
            spacing={6}
            w={"full"}
            maxW={{ base: "xl", md: "2xl", lg: "4xl" }}
          >
            <Heading fontSize={{ base: "2xl", md: "2xl", lg: "4xl" }}>
              <Text
                as={"span"}
                position={"relative"}
              >
                Course Reviews
              </Text>
            </Heading>
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              color={useColorModeValue("gray.700", "gray.300")}
            >
              Choose Better Courses Based on your peers upvotes and downvotes
            </Text>
          </Stack>
        </Flex>
        <Flex
          py="3rem"
          px={{ base: "0", md: "2rem" }}
          flex={1}
          justify={"center"}
          align={{ base: "flex-end", md: "center" }}
        >
          <Image
            alt={"Vote Image"}
            src={Vote}
            style={{ borderRadius: "8px" }}
          />
        </Flex>
      </Stack>
      <Stack id="features">
        <Flex
          mx={{ base: "2rem", md: "2rem" }}
          direction={"column"}
        >
          <Stack
            direction={"column"}
            // p={{ base: "2rem", md: "4rem" }}
            spacing="2rem"
            mx={"2.5rem"}
            mt={"1rem"}
            justify={"center"}
          >
            <SimpleGrid
              columns={{ base: "1", md: "2" }}
              spacingX={{ base: "10px", md: "60px" }}
              spacingY={{ base: "10px", md: "60px" }}
            >
              <Box
                rounded={"8px"}
                bg={useColorModeValue("gray.100", "gray.700")}
              >
                <Flex
                  direction={"column"}
                  p={{ base: "2rem", md: "3rem", lg: "4rem" }}
                  gap="2rem"
                >
                  <Heading fontSize={{ base: "lg", md: "2xl", lg: "3xl" }}>
                    <Text
                      as={"span"}
                      position={"relative"}
                    >
                      Enroll Courses which are Easy to follow
                    </Text>
                  </Heading>
                  <Text
                    fontSize={{ base: "md", lg: "lg" }}
                    color={useColorModeValue("gray.700", "gray.300")}
                  >
                    Learn from Well Structured, Segregated and reviewed coures
                  </Text>
                </Flex>
              </Box>
              <Box
                rounded={"8px"}
                bg={useColorModeValue("gray.100", "gray.700")}
              >
                <Flex
                  direction={"column"}
                  p={{ base: "2rem", md: "3rem", lg: "4rem" }}
                  gap="2rem"
                >
                  <Heading fontSize={{ base: "lg", md: "2xl", lg: "3xl" }}>
                    <Text
                      as={"span"}
                      position={"relative"}
                    >
                      Bookmark Courses
                    </Text>
                  </Heading>
                  <Text
                    fontSize={{ base: "md", lg: "lg" }}
                    color={useColorModeValue("gray.700", "gray.300")}
                  >
                    Bookmark your Courses for later While Browsing different
                    courses
                  </Text>
                </Flex>
              </Box>
            </SimpleGrid>
          </Stack>
        </Flex>
      </Stack>
      <Stack
        py="8rem"
        px={"2rem"}
      >
        <Flex
          direction="column"
          align="center"
          justify="center"
          gap="1rem"
        >
          <Text
            textAlign={"center"}
            fontSize="xl"
          >
            “Reading is to the mind what exercise is to the body”
          </Text>
          <Box
            w={5}
            h={5}
            bg="purple.700"
            rounded="xl"
          ></Box>
        </Flex>
      </Stack>
    </>
  );
};
export default About;
