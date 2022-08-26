import {
	Button,
	Flex,
	Heading,
	Stack,
	Text,
	Avatar,
	Wrap,
	WrapItem,
	useColorModeValue,
} from "@chakra-ui/react";
import Image from "next/image";
import HeaderImage from "../../public/images/user-dashboard.svg";
import DashBoardImg from "../../public/images/dashboard.png";
import Link from "next/link";

const Header = () => {
	const testimonialBg = useColorModeValue("gray.100", "gray.700");

	return (
    <>
      <Stack
        minH={"90vh"}
        direction={{ base: "column-reverse", md: "row" }}
        mx={{ base: "2rem", md: "4rem" }}
        mb={{ base: "2rem", md: "4rem" }}
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
            <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
              <Text
                as={"span"}
                position={"relative"}
              >
                Find
              </Text>
              <br />{" "}
              <Text
                color={"purple.600"}
                as={"span"}
              >
                Best Courses
              </Text>{" "}
            </Heading>
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              color={"gray.500"}
            >
              Browse Interactive courses created with our top creator which
              allows you to follow along with ease.
            </Text>
            <Link
              href="/signup"
              passHref
            >
              <Button
                rounded={"8px"}
                color={"white"}
                bg="purple.600"
                _hover={{
                  bg: "purple.800",
                }}
                p="1rem"
                maxW={"50%"}
              >
                Sign Up
              </Button>
            </Link>
          </Stack>
        </Flex>
        <Flex
          px={{ base: "0", md: "2rem" }}
          flex={1}
          justify={"center"}
          align={{ base: "flex-end", md: "center" }}
        >
          <img
            alt="HeaderImage"
            src="/images/dashboard.png"
            style={{
              borderRadius: "8px",
              boxShadow: "0px 0px 40px 20px rgba(0, 0, 0, 0.05)",
            }}
          />
        </Flex>
      </Stack>
    </>
  );
};
export default Header;
