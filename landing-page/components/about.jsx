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
import DummyImg from "../../public/images/dummy-img.svg";
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
        m={{ base: "2rem", md: "4rem" }}
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
                Courses based on different topics along with resources
              </Text>
            </Heading>
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              color={useColorModeValue("gray.700", "gray.300")}
            >
              Browse Interactive courses created with our top creator which
              allows you to follow along with ease.
            </Text>
            <Text
              fontSize={{ base: "sm", lg: "md" }}
              color={useColorModeValue("gray.600", "gray.500")}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </Stack>
        </Flex>
        <Flex
          py="6rem"
          px={{ base: "0", md: "2rem" }}
          flex={1}
          justify={"center"}
          align={{ base: "flex-end", md: "center" }}
        >
          <Image
            alt={"Create courses Image"}
            // src={AboutImage1}
          />
        </Flex>
      </Stack>
      <Stack
        minH={"50vh"}
        direction={{ base: "column-reverse", md: "row-reverse" }}
        p={{ base: "2rem", md: "4rem" }}
        spacing="2rem"
        bg={testimonialBg}
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
                Points for completing course path
              </Text>
            </Heading>
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              color={useColorModeValue("gray.700", "gray.300")}
            >
              Create Interactive courses with our course creator which allows
              you to create courses with ease.
            </Text>
            <Text
              fontSize={{ base: "sm", lg: "md" }}
              color={useColorModeValue("gray.600", "gray.500")}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </Stack>
        </Flex>
        <Flex
          py="6rem"
          px={{ base: "0", md: "2rem" }}
          flex={1}
          justify={"center"}
          align={{ base: "flex-end", md: "center" }}
        >
          <Image
            alt={"Statistics Image"}
            // src={Stats}
          />
        </Flex>
      </Stack>
      <Stack
        id="aboutus"
        minH={"50vh"}
        direction={{ base: "column-reverse", md: "row" }}
        m={{ base: "2rem", md: "4rem" }}
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
                Courses based on different topics along with resources
              </Text>
            </Heading>
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              color={useColorModeValue("gray.700", "gray.300")}
            >
              Browse Interactive courses created with our top creator which
              allows you to follow along with ease.
            </Text>
            <Text
              fontSize={{ base: "sm", lg: "md" }}
              color={useColorModeValue("gray.600", "gray.500")}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </Stack>
        </Flex>
        <Flex
          py="6rem"
          px={{ base: "0", md: "2rem" }}
          flex={1}
          justify={"center"}
          align={{ base: "flex-end", md: "center" }}
        >
          <Image
            alt={"Create courses Image"}
            // src={AboutImage1}
          />
        </Flex>
      </Stack>
      <Stack>
        <Flex mx={{base:"2rem" , md: "2rem"}} direction={"column"}>
        <Flex
          justifyContent={"center"}
          direction={{ base: "column", md: "row" }}
          w={"100%"}
          // mx={{base:"2rem" , md: "0"}}
        >
          <Flex w={{ base: "", md: "30%" }}>
            <Image src={DummyImg} />
          </Flex>
          <Flex
            p={"2rem"}
            bg={testimonialBg}
            justifyContent="flex-start"
          >
            <Text
              w={{ base: "", md: "80%" }}
              textAlign={{ base: "center", md: "left" }}
              fontWeight="700"
              fontSize={{ base: "2xl", md: "2xl", lg: "4xl" }}
            >
              Learn new things in a interactive manner
            </Text>
          </Flex>
        </Flex>
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
                    Sign Up and create text based course or roadmap.
                  </Text>
                </Heading>
                <Text
                  fontSize={{ base: "md", lg: "lg" }}
                  color={useColorModeValue("gray.700", "gray.300")}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore...
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
                    Add quizzes to your course to make it interactive.
                  </Text>
                </Heading>
                <Text
                  fontSize={{ base: "md", lg: "lg" }}
                  color={useColorModeValue("gray.700", "gray.300")}
                >
                  Create Interactive courses with our course creator which
                  allows you to create courses with ease.
                </Text>
              </Flex>
            </Box>
          </SimpleGrid>
        </Stack>
        </Flex>
      </Stack>
      {/* <Stack 
      direction={"column"}
      // p={{ base: "2rem", md: "4rem" }}
      spacing="2rem"
      mx="3.5rem"
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
                  Sign Up and create text based course or roadmap.
                </Text>
              </Heading>
              <Text
                fontSize={{ base: "md", lg: "lg" }}
                color={useColorModeValue("gray.700", "gray.300")}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore...
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
                  Add quizzes to your course to make it interactive.
                </Text>
              </Heading>
              <Text
                fontSize={{ base: "md", lg: "lg" }}
                color={useColorModeValue("gray.700", "gray.300")}
              >
                Create Interactive courses with our course creator which allows
                you to create courses with ease.
              </Text>
            </Flex>
          </Box>
        </SimpleGrid>
      </Stack> */}
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
