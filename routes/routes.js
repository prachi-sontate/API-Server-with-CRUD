const express = require("express");
const  movieController  = require("../Controllers/MovieController");
const router = express.Router();

router.post("/movies", movieController.createMovie); // Create a movie
router.get("/movies", movieController.getMovies); // Get all movies
router.get("/movies/:id", movieController.getMovieById); // Get a movie by ID
router.put("/movies/:id", movieController.updateMovie); // Update a movie by ID
router.delete("/movies/:id", movieController.deleteMovie); // Delete a movie by ID

module.exports = router;
