import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Link,
  useColorModeValue,
  InputGroup,
  InputRightElement,
  Alert,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Layout from "../shared/components/layout";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NextLink from "next/link";
import { loginHandler } from "../redux/feature/user/thunk";
import { FiAlertCircle } from "react-icons/fi";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../shared/lib/firebase";
import { toast } from 'react-toastify';
export default function Login() {
  const notify = () => toast("logged in succesfully")
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { token, loading, error } = useSelector((state) => state.user);
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    if (token !== "") {
      router.push("/dashboard", undefined, { shallow: true });
    }
  }, [token]);

  const onSubmit = async (data) => {
    try {
      const res = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const token = await res.user.getIdToken();
      dispatch(loginHandler(token));
      dispatch({ type: "user/setToken", payload: token });
      notify();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <Flex
        minH={"105vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={8}
          mx={"auto"}
          maxW={"lg"}
          py={12}
          px={6}
        >
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text
              fontSize={"lg"}
              color={"gray.600"}
            >
              to enjoy all of our cool{" "}
              <Link
                href="/"
                color={"purple.400"}
              >
                features
              </Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    focusBorderColor="purple.500"
                    {...register("email", {
                      pattern: {
                        value:
                          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message:
                          "Only alphabets, numbers and hyphens (-) are allowed",
                      },
                    })}
                    required
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      focusBorderColor="purple.500"
                      type={showPassword ? "text" : "password"}
                      {...register("password")}
                      required
                    />
                    <InputRightElement h={"full"}>
                      <Button
                        variant={"ghost"}
                        onClick={() =>
                          setShowPassword((showPassword) => !showPassword)
                        }
                      >
                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox colorScheme="purple">Remember me</Checkbox>
                    <Link color={"purple.400"}>Forgot password?</Link>
                  </Stack>
                  {error?.length > 0 ? (
                    <Alert
                      status="error"
                      rounded="6"
                    >
                      <FiAlertCircle style={{ marginRight: "6px" }} />
                      There was an error processing your request - {error}
                    </Alert>
                  ) : (
                    <></>
                  )}
                  <Button
                    bg={"purple.600"}
                    color={"white"}
                    _hover={{
                      bg: "purple.800",
                    }}
                    type="submit"
                    isLoading={loading}
                  >
                    Sign in
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Don&apos;t have an account?{" "}
                    <NextLink
                      href="/signup"
                      passHref
                    >
                      <Link color="purple.500">Sign Up</Link>
                    </NextLink>
                  </Text>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </Layout>
  );
}

export { getServerSideProps } from "../shared/lib/chakra";
