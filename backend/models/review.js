const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    movie: {type: String, required: true},
    user: { type: String, required: true },
    content: { type: String, required: true },
    rating: { type: Number, required: true }
});

const Review = mongoose.model("review", reviewSchema);
module.exports = Review;