const Movie = require("../Models/Movie.js");
// Create a new movie

exports.createMovie = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      const movies = await Movie.insertMany(req.body);
      res.status(201).json({
        message: "Movies created successfully",
        movies,
      });
    } else {
      const movie = new Movie(req.body);
      await movie.save();
      res.status(201).json({
        message: "Movie created successfully",
        movie,
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get all movies
exports.getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single movie by ID
exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a movie by ID
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.status(200).json({ message: "Movie updated successfully", movie });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a movie by ID
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
