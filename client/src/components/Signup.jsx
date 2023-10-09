import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSignup = async (e) => {
    e.preventDefault();
    let userData = { name, email, password };

    if (!name || !email || !password) {
      toast({
        title: "Please fill all credentials",
        description: "All fields are required",
        status: "error",
        duration: 5000,
        position: "top",
        isClosable: true,
      });
      return;
    }

    try {
      setIsLoading(true);
      let res = await fetch("https://recipe-application-1fov.onrender.com/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      let data = await res.json();
      console.log(userData, res);
      setIsLoading(false);
      if (res.status === 200) {
        toast({
          title: "Registered successfully",
          description: "Have a great day",
          status: "success",
          duration: 6000,
          isClosable: true,
          position: "top",
        });
        setEmail("")
        setPassword("")
        setName("")
        console.log(data);
      } else {
        toast({
          title: "Registration failed",
          status: "error",
          duration: 6000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <Box maxWidth="400px" margin="0 auto">
        <form onSubmit={handleSignup}>
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            <Button type="submit" colorScheme="teal" mt={3}>
              Sign up
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default Signup;
