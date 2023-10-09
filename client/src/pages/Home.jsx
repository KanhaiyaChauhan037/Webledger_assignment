import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RecipeCard from "../components/RecipeCard";
import { Grid, HStack, Skeleton, Stack } from "@chakra-ui/react";
import axios from "axios";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getRecipe = () => {
    axios.get(`https://recipe-application-1fov.onrender.com/recipes/`).then((res) => {
      // console.log(res.data.recipes);
      setRecipes(res.data.recipes);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getRecipe();
  }, []);
  // console.log("recipe state", recipes);

  const getsearchRecipes = (searchQuery) => {
    axios
      .get(`https://recipe-application-1fov.onrender.com/recipes/search`, {
        params: { query: searchQuery },
      })
      .then((res) => {
        setRecipes(res.data.recipes);
        setIsLoading(false);
      });
  };

  return (
    <>
      <Navbar onSearch={getsearchRecipes} />

      <Grid
        templateColumns={{
          sm: "repeat(1,1fr)",
          md: "repeat(2,1fr)",
          lg: "repeat(3,1fr)",
          xl: "repeat(4,1fr)",
        }}
        gap={3}
        p={8}
      >
        {isLoading
          ? [...Array(20).keys()].map((el) => {
              return (
                <Stack key={el} width={"100%"}>
                  <Skeleton
                    height={{ base: "250px", md: "250px" }}
                    width={{ base: "300px", md: "350px" }}
                    borderRadius={"md"}
                  />
                  <HStack width={"100%"}>
                    <Skeleton
                      height="16px"
                      h={"40px"}
                      w={"80"}
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
              );
            })
          : recipes?.map((el) => <RecipeCard key={el.id} el={el} />)}
      </Grid>
    </>
  );
};

export default Home;
