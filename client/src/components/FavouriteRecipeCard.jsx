import React from "react";
import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const FavouriteRecipeCard = ({ el, onDelete, }) => {
 
  const handleDelete = () => {
    // Call the onDelete function with the recipe's _id
    onDelete(el._id);
  };

  return (
    <Box boxShadow="2xl" rounded="md">
      <Link to={`/${el.recipe.id}`}>
        <Image
          src={el.recipe.image}
          alt="recipe picture"
          rounded="md"
          width={"100%"}
        />
      </Link>
      <Flex m={5} mb={3} justifyContent={"space-between"}>
        <Box alignContent={"center"}>
          <Heading as="h6" size="xs">
            {el.recipe.title}
          </Heading>
        </Box>
        
        <Box>
          <Button variant="outline" colorScheme="red">
            <AiFillDelete size={25} onClick={handleDelete} color="red" />
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default FavouriteRecipeCard;
