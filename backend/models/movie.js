const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true }
    // stb
});

const Movie = mongoose.model("movie", movieSchema);
module.exports = Movie;