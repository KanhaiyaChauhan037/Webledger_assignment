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
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();

    let userData = { email, password };

    if (!email || !password) {
      toast({
        title: "Enter both email and password to login",
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
      let res = await fetch("https://recipe-application-1fov.onrender.com/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      let data = await res.json();

      setIsLoading(false);

      console.log(userData, res);

      if (res.status === 200) {
        toast({
          title: "Login successful",
          description: "Have a great day",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top",
        });
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user);
        setEmail("");
        setPassword("");
        navigate("/");

        console.log(data);
      } else {
        toast({
          title: "Login failed",
          status: "error",
          duration: 4000,
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
    <Box maxWidth="400px" margin="0 auto">
      <form onSubmit={handleLogin}>
        <Stack spacing={4}>
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
          <Button mt={3} type="submit" colorScheme="teal">
            Log in
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default Login;
