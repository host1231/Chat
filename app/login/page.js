"use client";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
  useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async (e) => {
    try{
        e.preventDefault();
        console.log(user);
        console.log(error);
        const result = await signInWithEmailAndPassword(email, password);
        console.log(result);
        setEmail("");
        setPassword("");
        if (result) {
            router.push('/');
            sessionStorage.setItem('user', true);
        }
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <Flex bg="teal.400" w="100%" h="100vh" justify="center" align="center">
      <Container maxW="lg">
        <FormControl
          as="form"
          onSubmit={handleSubmit}
          bg="white"
          rounded="lg"
          boxShadow="md"
        >
          <Stack spacing={6} p={8}>
            <Heading as="h4" textAlign="center" mb={6}>
              Login
            </Heading>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              variant="flushed"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Input
              type="password"
              id="password"
              placeholder="Enter your password"
              variant="flushed"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button
              type="submit"
              bg="blue.400"
              color="white"
              _hover={{ color: "black", bg: "gray.400" }}
            >
              Login
            </Button>
            <Box mt={-3} textAlign="center">
              Don't have an account?
              <Link href="/signup" color="blue.400">
                Sign Up
              </Link>
            </Box>
          </Stack>
        </FormControl>
        {error && (
          <Box
            bg="red"
            w="100%"
            p={4}
            mt={4}
            rounded="lg"
            color="white"
            textAlign="center"
          >
            Invalid login and password
          </Box>
        )}
      </Container>
    </Flex>
  );
}
