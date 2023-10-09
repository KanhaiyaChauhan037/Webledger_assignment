const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.model");

const userRouter = express.Router();

// user register route
userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // validate name, email, password
    if (!name || !email || !password) {
      res.status(400).send({ error: "Name, email, and password are required" });
    }

    // check if user with same email already exist
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res.status(409).send({ error: "User with this email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 5);

    // create New User
    const newUser = new UserModel({ name, email, password: hashedPassword });

    // Save the user to the database
    await newUser.save();

    res
      .status(200)
      .send({ message: "New user has been registered successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while registering the user" });
  }
});

// user Login Route
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(401).send({ message: "Wrong Credentials!" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const token = jwt.sign(
        { authorId: user._id, author: user.name },
        process.env.JWT_SECRET_KEY
      );
      res
        .status(200)
        .send({ message: "Login successful", token, user: user.name });
    } else {
      res.status(401).send({ message: "Wrong Credentials!" });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "An error occurred", error: error.message });
  }
});

module.exports = {
  userRouter,
};
