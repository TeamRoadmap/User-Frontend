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
        bg="#F9F9F6"
        _dark={{ bg: "gray.800" }}
        minH="100vh"
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
