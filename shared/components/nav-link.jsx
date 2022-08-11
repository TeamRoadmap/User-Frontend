import { Link as ChakraLink, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function NavLink({ to, activeProps, children, _hover, ...props }) {
  const router = useRouter();
  const isActive = router.pathname === to;
  const color = useColorModeValue("black", "selected");
  const bg = useColorModeValue("gray.100", "gray.700");

  if (isActive) {
    return (
      <Link href={to}>
        <ChakraLink
          fontWeight="bold"
          {...props}
          {...activeProps}
          _hover={{ color: color }}
          color={color}
          bg={bg}
        >
          {children}
        </ChakraLink>
      </Link>
    );
  }

  return (
    <Link href={to}>
      <ChakraLink
        {...props}
        _hover={{ color: "selected" }}
      >
        {children}
      </ChakraLink>
    </Link>
  );
}

export default NavLink;