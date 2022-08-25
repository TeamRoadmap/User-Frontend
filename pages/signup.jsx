import Layout from "../shared/components/layout";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  Link,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  Alert,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { signUpHandler } from "../redux/feature/user/thunk";
import { FiAlertCircle } from "react-icons/fi";
import { auth } from "../shared/lib/firebase";
import { toast } from "react-toastify";
export default function SignUp() {
  const notify = () => toast("Wellcome User");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { token, user, loading, error } = useSelector((state) => state.user);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm();
  useEffect(() => {
    if (token !== "") {
      router.push("/dashboard", undefined, { shallow: true });
    }
  }, [token]);
  const onSubmit = async (data) => {
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const token = await response.user.getIdToken();
      dispatch(
        signUpHandler({
          name: `${data.firstName} ${data?.lastName}`,
          email: data.email,
          role: "user",
        })
      );
      dispatch({ type: "user/setToken", payload: token });
      notify();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <Flex
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack
          spacing={8}
          mx={"auto"}
          maxW={"lg"}
          py={6}
          px={6}
        >
          <Stack align={"center"}>
            <Heading
              fontSize={"4xl"}
              textAlign={"center"}
            >
              Sign up
            </Heading>
            <Text
              fontSize={"lg"}
              color={"gray.600"}
            >
              to enjoy all of our cool features ✌️
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
                <HStack>
                  <Box>
                    <FormControl
                      id="firstName"
                      isRequired
                    >
                      <FormLabel>First Name</FormLabel>
                      <Input
                        type="text"
                        focusBorderColor="purple.500"
                        {...register("firstName")}
                        required
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        type="text"
                        focusBorderColor="purple.500"
                        {...register("lastName")}
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl
                  id="email"
                  isRequired
                >
                  <FormLabel>Email address</FormLabel>
                  <Input
                    focusBorderColor="purple.500"
                    type="email"
                    {...register("email", {
                      pattern: {
                        value:
                          /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/,
                        message: "Please enter valid email (lowercase letter)",
                      },
                    })}
                    required
                  />
                </FormControl>
                {errors?.email?.message && (
                  <Text color="red">{errors?.email?.message}</Text>
                )}
                <FormControl
                  id="password"
                  isRequired
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      focusBorderColor="purple.500"
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        minLength: {
                          value: 6,
                          message: "Please enter min 6 characters",
                        },
                      })}
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
                  {errors?.password?.message && (
                    <Text color="red">{errors?.password?.message}</Text>
                  )}
                </FormControl>
                <Stack
                  spacing={10}
                  pt={2}
                >
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
                    loadingText="Submitting"
                    size="lg"
                    bg={"purple.600"}
                    color={"white"}
                    _hover={{
                      bg: "purple.800",
                    }}
                    type="submit"
                    isLoading={loading}
                  >
                    Sign up
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Already a user?{" "}
                    <NextLink
                      href="/login"
                      passHref
                    >
                      <Link color="purple.500">Login</Link>
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
