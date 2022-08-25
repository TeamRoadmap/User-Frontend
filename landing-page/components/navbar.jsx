import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	Collapse,
	Icon,
	Link as ChakraLink,
	Popover,
	PopoverTrigger,
	PopoverContent,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
	Divider,
	useColorMode,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
	const { isOpen, onToggle } = useDisclosure();
	const { colorMode, toggleColorMode } = useColorMode();
	const linkColor = useColorModeValue("gray.600", "gray.200");
	const linkHoverColor = useColorModeValue("gray.800", "white");
	const router = useRouter();
	const showAbout = router.pathname === "/" ? true : false;
	return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      p={"1rem"}
      width={"full"}
    >
      <Flex
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 0, md: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? (
                <CloseIcon
                  w={3}
                  h={3}
                />
              ) : (
                <HamburgerIcon
                  w={5}
                  h={5}
                />
              )
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "start", md: "start" }}
        >
          <Flex
            align={"baseline"}
            as={"a"}
            href="/"
          >
            <Text
              textAlign={useBreakpointValue({ base: "start", md: "left" })}
              fontFamily={"heading"}
              fontSize={{ base: "md", md: "xl" }}
              fontWeight={"600"}
              mr="3px"
              color={useColorModeValue("gray.800", "white")}
            >
              ROADMAP
            </Text>
          </Flex>
        </Flex>
        <Flex
          display={{ base: "none", md: "flex" }}
          ml={10}
          mr={10}
        >
          {showAbout ? (
            <DesktopNav />
          ) : (
            <ChakraLink
              p={2}
              href="/"
              fontSize={"md"}
              fontWeight={500}
              color={linkColor}
              _hover={{
                textDecoration: "none",
                color: linkHoverColor,
              }}
            >
              Home
            </ChakraLink>
          )}
        </Flex>
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
        >
          <Link href="/login">
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={400}
              borderColor={"purple.500"}
              variant={"outline"}
              rounded="8px"
            >
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              color={"white"}
              bg={"purple.600"}
              rounded="8px"
              _hover={{
                bg: "purple.800",
              }}
            >
              Sign Up
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Stack>
      </Flex>

      <Collapse
        in={isOpen}
        animateOpacity
      >
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
	const linkColor = useColorModeValue("gray.600", "gray.200");
	const linkHoverColor = useColorModeValue("gray.800", "white");
	const popoverContentBgColor = useColorModeValue("white", "gray.800");

	return (
		<Stack direction={"row"} spacing={4}>
			{NAV_ITEMS.map((navItem) => (
				<Box key={navItem.label}>
					<Popover trigger={"hover"} placement={"bottom-start"}>
						<PopoverTrigger>
							<ChakraLink
								p={2}
								href={navItem.href ?? "#"}
								fontSize={"md"}
								fontWeight={500}
								color={linkColor}
								_hover={{
									textDecoration: "none",
									color: linkHoverColor,
								}}
							>
								{navItem.label}
							</ChakraLink>
						</PopoverTrigger>

						{navItem.children && (
							<PopoverContent
								border={0}
								boxShadow={"xl"}
								bg={popoverContentBgColor}
								p={4}
								rounded={"xl"}
								minW={"sm"}
							>
								<Stack>
									{navItem.children.map((child) => (
										<DesktopSubNav key={child.label} {...child} />
									))}
								</Stack>
							</PopoverContent>
						)}
					</Popover>
				</Box>
			))}
		</Stack>
	);
};

const DesktopSubNav = ({ label, href, subLabel }) => {
	return (
		<ChakraLink
			href={href}
			role={"group"}
			display={"block"}
			p={2}
			rounded={"md"}
			_hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
		>
			<Stack direction={"row"} align={"center"}>
				<Box>
					<Text
						transition={"all .3s ease"}
						_groupHover={{ color: "pink.400" }}
						fontWeight={500}
					>
						{label}
					</Text>
					<Text fontSize={"sm"}>{subLabel}</Text>
				</Box>
				<Flex
					transition={"all .3s ease"}
					transform={"translateX(-10px)"}
					opacity={0}
					_groupHover={{ opacity: "100%", transform: "translateX(0)" }}
					justify={"flex-end"}
					align={"center"}
					flex={1}
				>
					<Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
				</Flex>
			</Stack>
		</ChakraLink>
	);
};

const MobileNav = () => {
	const router = useRouter();
	const showAbout = router.pathname === "/" ? true : false;

	const TextColor = useColorModeValue("gray.600", "gray.200");
	return (
		<Stack
			bg={useColorModeValue("white", "gray.800")}
			p={"1rem"}
			display={{ md: "none" }}
			direction={"column"}
			justify={"center"}
			spacing={"2rem"}
		>
			{showAbout ? (
				<>
					<Stack>
						{NAV_ITEMS.map((navItem) => (
							<MobileNavItem key={navItem.label} {...navItem} />
						))}
					</Stack>
					<Divider orientation="horizontal" />
				</>
			) : (
				<Flex
					py={1}
					as={ChakraLink}
					href="/"
					justify={"center"}
					align={"center"}
					_hover={{
						textDecoration: "none",
					}}
				>
					<Text fontWeight={600} fontSize={"lg"} color={TextColor}>
						Home
					</Text>
				</Flex>
			)}

			<Stack justify={"center"} direction={"column"} align="center">
				<Link href="/login">
					<Button
						px="10%"
						fontSize={"sm"}
						fontWeight={400}
						borderColor={"purple.500"}
						variant={"outline"}
						rounded="8px"
					>
						Login
					</Button>
				</Link>
				<Link href="/signup">
					<Button
						px="8.6%"
						fontSize={"sm"}
						fontWeight={600}
						color={"white"}
						bg={"purple.600"}
						rounded="8px"
						_hover={{
							bg: "purple.800",
						}}
					>
						Sign Up
					</Button>
				</Link>
			</Stack>
		</Stack>
	);
};

const MobileNavItem = ({ label, children, href }) => {
	const { isOpen, onToggle } = useDisclosure();

	return (
		<Stack
			onClick={onToggle}
			justify={"center"}
			direction={"column"}
			align="center"
		>
			<Flex
				py={1}
				as={ChakraLink}
				href={href ?? "#"}
				justify={"space-between"}
				align={"center"}
				_hover={{
					textDecoration: "none",
				}}
			>
				<Text
					fontWeight={600}
					fontSize={"md"}
					color={useColorModeValue("gray.600", "gray.200")}
				>
					{label}
				</Text>
			</Flex>
		</Stack>
	);
};

const NAV_ITEMS = [
	{
		label: "About Us",
		href: "#aboutus",
	},
	{
		label: "Features",
		href: "#features",
	},
];