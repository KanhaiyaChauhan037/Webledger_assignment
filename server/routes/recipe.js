const express = require("express");
const axios = require("axios");
const recipeRouter = express.Router();
require("dotenv").config();

// Define a route to fetch random recipes
recipeRouter.get("/", async (req, res) => {
  try {
    // Make a GET request to the Spoonacular API
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/random?apiKey=${process.env.API_KEY}&number=20`
    );

    // Extract the recipe data from the response
    const recipes = response.data.recipes;

    // Send the recipes to the client
    res.status(200).send({ message: "data", recipes });
  } catch (error) {
    // Handle any errors that occur during the request
    console.error("Error fetching random recipes:", error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching random recipes" });
  }
});

// Define a route to fetch searched recipes
recipeRouter.get("/search", async (req, res) => {
  const { query } = req.query;
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${process.env.API_KEY}&number=20`
  );
  const recipes = response.data.results;
  res.status(200).send({ message: "data", recipes });
});

// Define a route to fetch single recipes
recipeRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const response = await axios.get(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`
  );
  const recipe = response.data;
  res.status(200).send({ message: "data", recipe });
});

module.exports = {
  recipeRouter,
};
