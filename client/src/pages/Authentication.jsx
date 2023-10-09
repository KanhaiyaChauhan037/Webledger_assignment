import React, { useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import Navbar from "../components/Navbar";

const Authentication = () => {
  const [isSignup, setIsSignup] = useState(true);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <>
      <Navbar />
      <Box
        maxWidth="400px"
        margin="100px auto"
        boxShadow="dark-lg"
        p="5"
        rounded="md"
      >
        <Flex
          justifyContent={"space-between"}
          textAlign={"center"}
          fontSize={"2xl"}
          fontWeight={"bold"}
          mb={7}
        >
          <Box
            border={"0.5px solid grey"}
            w={"50%"}
            p={"5px"}
            backgroundColor={isSignup ? "teal" : "white"}
            color={isSignup ? "white" : "black"}
            onClick={() => setIsSignup(true)} // Set isSignup to true when clicking "Sign up"
            _hover={{ cursor: "pointer" }}
          >
            Sign Up
          </Box>
          <Box
            border={"0.5px solid grey"}
            w={"50%"}
            p={"5px"}
            backgroundColor={!isSignup ? "teal" : "white"}
            color={!isSignup ? "white" : "black"}
            onClick={() => setIsSignup(false)} // Set isSignup to false when clicking "Log In"
            _hover={{ cursor: "pointer" }}
          >
            Log In
          </Box>
        </Flex>

        {isSignup ? <Signup /> : <Login />}
        <Button
          variant="link"
          onClick={toggleForm}
          mt={"20px"}
          textAlign={"center"}
          colorScheme="cyan"
        >
          {isSignup
            ? "Already have an account? Login"
            : "Don't have an account? Signup"}
        </Button>
      </Box>
    </>
  );
};

export default Authentication;
