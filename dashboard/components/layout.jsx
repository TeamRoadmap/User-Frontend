import { Box } from "@chakra-ui/react";
import React from "react";
import Sidebar from "./sidebar";

export default function Layout({ children }) {
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
        <Sidebar />
        <Box
          as="main"
          p="4"
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}