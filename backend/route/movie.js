require('dotenv').config();
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Review = require('../models/review');
const Movie = require('../models/movie');

router.get('/:title', async (req, res) => {
    console.log("Im in movie Route!")
    const token = req.headers.authorization; // googlenál nem tudom hogy működik, de gondolom ott is van ilyen
    if (!token || token === "null") return res.sendStatus(400);

    const title = req.params.title;
    // console.log(req.params.title)
    const movie = await Movie.findOne({ title: title });
    if (!movie) return res.status(400).json("No such movie found!")
    // console.log(movie[0]._id)
    // console.log(movie[0].id);
    const reviews = await Review.find({ movie: movie._id });
    console.log(reviews);

    res.json(reviews);
    // res.json(movie);
});

module.exports = router;