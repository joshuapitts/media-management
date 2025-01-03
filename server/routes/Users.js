import bcrypt from "bcrypt";
import express from "express";
const router = express.Router();

import db from "../models/index.js";
const { Users, Movies } = db;

// Get all users
router.get("/", async (req, res) => {
  try {
    const listOfUsers = await Users.findAll();
    res.json(listOfUsers);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred while fetching users" });
  }
});

// Register a new user
router.post("/", async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const existingUser = await Users.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await Users.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });

    console.log("User registered successfully:", newUser);
    res.json({ message: "Registration successful!", user: newUser });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "An error occurred while registering user" });
  }
});

// Login a user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ error: "User doesn't exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Wrong username or password" });
    }

    console.log("User logged in successfully:", user);
    res.json({
      message: "Login successful!",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});

// Add a movie for a user
router.post("/:userId/movies", async (req, res) => {
  const { userId } = req.params;
  const { title, category, posterPath, releaseDate } = req.body;

  if (!title || !category) {
    return res.status(400).json({ error: "Title and category are required" });
  }

  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const movie = await Movies.create({
      title,
      category,
      posterPath,
      releaseDate,
      UserId: userId,
    });

    console.log("Movie added successfully:", movie);
    res.json(movie);
  } catch (error) {
    console.error("Error adding movie:", error);
    res.status(500).json({ error: "An error occurred while adding the movie" });
  }
});

// Get all movies for a user
router.get("/:userId/movies", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const movies = await Movies.findAll({ where: { UserId: userId } });

    console.log(`Movies fetched for user ${userId}:`, movies);
    res.json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ error: "An error occurred while fetching movies" });
  }
});

// Delete a movie
router.delete("/movies/:movieId", async (req, res) => {
    const { movieId } = req.params;
  
    try {
      await Movies.destroy({ where: { id: movieId } });
      res.json({ message: "Movie removed successfully" });
    } catch (error) {
      console.error("Error removing movie:", error);
      res.status(500).json({ error: "An error occurred while removing the movie" });
    }
  });
  

export default router;
