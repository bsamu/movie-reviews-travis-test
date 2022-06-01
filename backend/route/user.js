require('dotenv').config();
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const Review = require('../models/review');

router.get('/:user', async (req, res) => {
    console.log("Im in user Route!")
    const token = req.headers.authorization;
    if (!token || token === "null") return res.sendStatus(400);

    const user = req.params.user;
    // console.log(req.params.user)
    // Ide kell ellenőrizni, hogy létezik-e a user? Ha olyanra keres, aki nincs, akkor error?
    const reviews = await Review.find({ user: user });
    if (!reviews) return res.json("This user has no reviews yet!");
    console.log(reviews);

    res.json(reviews);
});

module.exports = router;