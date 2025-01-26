const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 500,
  },
  img: {
    type: String,
    required: true,
    maxLength: 500,
  },
  summary: {
    type: String,
    required: true,
    maxLength: 1000,
  },

});

module.exports = mongoose.model("Movie", movieSchema);