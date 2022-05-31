const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Number, required: true },
    // stb egyéb 
    rating: { type: Number, required: true },
    reviews: [reviewSchema]
});

const reviewSchema = new mongoose.Schema({
    user: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true }
});

const Movie = mongoose.model("movie", movieSchema);
module.exports = Movie;