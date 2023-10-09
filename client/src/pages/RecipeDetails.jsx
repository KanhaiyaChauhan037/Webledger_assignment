import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  ListItem,
  OrderedList,
  Skeleton,
  Text,
} from "@chakra-ui/react";
import "../App.css";

const RecipeDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [singleRecipe, setSingalRecipe] = useState({});

  const getRecipeDetails = () => {
    axios.get(`https://recipe-application-1fov.onrender.com/recipes/${id}`).then((res) => {
      // console.log(res.data.recipe);
      setSingalRecipe(res.data.recipe);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getRecipeDetails();
  }, []);

  console.log("singleRecipe:", singleRecipe);

  return (
    <>
      <Navbar />

      {isLoading ? (
        [...Array(20).keys()].map((el) => {
          return (
            <Flex
              justify={"center"}
              flexDir={{ base: "column", md: "row" }}
              width="87vw"
              marginX="auto"
              my="2rem"
              key={el}
            >
              {/* skeleton */}
              <Box
                width={{ base: "95%", lg: "50%" }}
                height={{ base: "40vh", lg: "60vh" }}
              >
                <Skeleton height={"100%"} width="100%" borderRadius={"xl"} />
              </Box>
              <Flex
                width="65%"
                px={"3rem"}
                flexDir="column"
                gap="2rem"
                py="2rem"
              >
                <Skeleton height="30px" />
                <Skeleton height="18px" width="250px" />
                <Skeleton height="40px" width="160px" borderRadius={"xl"} />
                <Skeleton height="18px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="18px" width="500px" />
                <Skeleton height="18px" width="500px" />
                <Skeleton height="18px" width="500px" />
                <Skeleton height="40px" width="160px" borderRadius={"xl"} />
                <Skeleton height="18px" width="500px" />
                <Skeleton height="18px" width="500px" />
                <Skeleton height="18px" width="500px" />
                <Skeleton height="18px" width="500px" />
              </Flex>
            </Flex>
          );
        })
      ) : (
        <Flex
          // Recipe Details mapping
          justify={"center"}
          flexDir={{ base: "column", md: "row" }}
          width={{ base: "87vw", md: "87vw" }}
          marginX="auto"
          my="2rem"
          textAlign={"justify"}
          h={"80vh"}
        >
          <Box
            width={{ base: "95%", lg: "50%" }}
            height={{ base: "40vh", lg: "60vh" }}
          >
            <Image
              height={"100%"}
              width="100%"
              borderRadius={"xl"}
              src={singleRecipe.image}
            />
          </Box>
          <Flex
            width={{ base: "95%", lg: "50%", sm: "100%" }}
            px={"2rem"}
            flexDir="column"
            gap="2rem"
            py="1rem"
            overflow={"auto"}
            className="custom-scrollbar"
            mt={4}
            
          >
            <Heading as="h4" size="md">
              {singleRecipe.title}
            </Heading>

            <Text height="18px" width="250px">
              Cooking time : {singleRecipe.readyInMinutes} minutes
            </Text>
            {/* <Text>{singleRecipe.summary}</Text> */}

            <Button height="40px" width="160px" borderRadius={"xl"} p={2}>
              Instructions
            </Button>
            <Text>{singleRecipe.instructions}</Text>
            <OrderedList>
              {singleRecipe.analyzedInstructions[0].steps?.map((el, i) => (
                <ListItem key={el.number}>{el.step}</ListItem>
              ))}
            </OrderedList>

            <Button height="40px" width="160px" borderRadius={"xl"} p={2}>
              Ingredients
            </Button>
            <OrderedList>
              {singleRecipe.extendedIngredients?.map((el, i) => (
                <ListItem key={el.id}>
                  {el.name} {"-"}
                  {el.amount}grams
                </ListItem>
              ))}
            </OrderedList>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default RecipeDetails;
