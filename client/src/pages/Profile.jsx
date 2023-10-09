import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  Box,
  Grid,
  HStack,
  Heading,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import FavouriteRecipeCard from "../components/FavouriteRecipeCard";
import axios from "axios";
import { Link } from "react-router-dom";

const Profile = () => {
  const [favouriteRecipe, setFavouriteRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToast();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getFavouriteRecipies = async () => {
      try {
        const response = await axios.get(
          "https://recipe-application-1fov.onrender.com/favourite",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("checking",response.data);
        setFavouriteRecipe(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    getFavouriteRecipies();
  }, []);

  const handleDeleteFavourite = async (id) => {
    try {
      // Send a DELETE request to your backend API to delete the favorite recipe
      await axios.delete(
        `https://recipe-application-1fov.onrender.com/favorite/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Show a success toast
      toast({
        position: "top",
        title: "Favorite recipe deleted",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      // Handle any errors here
      console.error("deleting favorite recipe Error:", error);
      // Show an error toast
      toast({
        position: "top",
        title: "Error deleting favorite recipe",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  console.log("fav", favouriteRecipe);

  return (
    <>
      <Navbar />

      <Box>
        <Box>
          <Heading as="h3" size="lg" p={7}>
            Profile: {localStorage.getItem("user")}
          </Heading>
        </Box>
        <Box>
          <Text
            fontSize="lg"
            ml={7}
            fontWeight={"semibold"}
            textDecoration={"underline"}
          >
            Favorite Recipes
          </Text>

          <Grid
            templateColumns={{
              sm: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap={3}
            p={8}
          >
            {isLoading && favouriteRecipe.length === 0 ? (
              [...Array(favouriteRecipe.length).keys()].map((i) => (
                <Stack key={i} width={"100%"}>
                  <Skeleton
                    height={{ base: "250px", md: "250px" }}
                    width={{ base: "300px", md: "350px" }}
                    borderRadius={"md"}
                  />
                  <HStack width={"100%"}>
                    <Skeleton
                      height="16px"
                      h={"40px"}
                      w={"80px"}
                      borderRadius={"md"}
                    />
                    <Skeleton
                      height="16px"
                      w={"20%"}
                      h={"40px"}
                      borderRadius={"md"}
                    />
                  </HStack>
                </Stack>
              ))
            ) : favouriteRecipe.length === 0 ? (
              <Text textAlign={"center"} fontSize="xl" fontWeight={"bold"}>
                There are no favorite recipes available.{" "}
                <Link
                  to={"/"}
                  style={{ textDecoration: "underline", color: "teal" }}
                >
                  Add Some Recipe{" "}
                </Link>
              </Text>
            ) : (
              favouriteRecipe.map((el, i) => (
                <FavouriteRecipeCard
                  key={el._id}
                  el={el}
                  onDelete={handleDeleteFavourite}
                />
              ))
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
