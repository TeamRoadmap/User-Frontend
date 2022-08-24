import { Box } from "@chakra-ui/react";
import React from "react";
import CourseSidebar from "./course-sidebar";

export default function CourseLayout({ children }) {
  return (
    <Box
      ml={{ base: 0, md: 60 }}
      transition=".3s ease"
    >
      <Box
        as="section"
        _dark={{ bg: "gray.800" }}
        minH="100vh"
        w="66"
      >
        <CourseSidebar />
        <Box
          as="main"
          py="4"
          px="16"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
