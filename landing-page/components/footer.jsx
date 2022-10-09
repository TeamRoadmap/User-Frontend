import React from "react";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";

export default function Footer() {
  const testimonialBg = useColorModeValue("gray.100", "gray.700");
  return (
    <Box bg={testimonialBg}>
      <Flex
        justify={{ base: "center", md: "space-around" }}
        align={"center"}
        direction={"column"}
        py={"1rem"}
      >
        <Flex
          direction={"row"}
          gap="0.4rem"
          m={"2rem"}
          align={"center"}
        >
          <Text
            textAlign={useBreakpointValue({ base: "start", md: "left" })}
            fontFamily={"heading"}
            fontSize="xl"
            mr="3px"
            color={useColorModeValue("gray.800", "white")}
          >
            ROADMAP
          </Text>
          <h1>© 2022</h1>
        </Flex>
        <Text>
          Created By &nbsp;
          <ChakraLink
            color="purple.600"
            href="https://github.com/TeamRoadmap"
          >
            Team Roadmap
          </ChakraLink>
        </Text>
      </Flex>
    </Box>
  );
}
