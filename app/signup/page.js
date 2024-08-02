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
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../firebaseconfig";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async (e) => {
    try{
        e.preventDefault();
        console.log(user);
        console.log(error);
        const result = await createUserWithEmailAndPassword(email, password);
        console.log(result);
        setEmail('');
        setPassword('');
        if (result) {
            setTimeout(() => {
                router.push('/login')
            }, 2000)
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
              Sign Up
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
              Sign Up
            </Button>
            <Box mt={-3} textAlign="center">
              Already have an account?
              <Link href="/login" color="blue.400">
                Login
              </Link>
            </Box>
          </Stack>
        </FormControl>
            {
                user &&
                <Box bg='green' w='100%' p={4} mt={4} rounded='lg' color='white' textAlign='center'>
                    You have successfully registered
                </Box>
            }
      </Container>
    </Flex>
  );
}
