require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const Review = require("../models/review");

router.get("/", async (req, res) => {
  console.log("Im in user Route!");
  const token = req.headers.authorization;
  console.log(token);
  if (!token || token === "null") return res.sendStatus(400);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) return res.sendStatus(401); //

  const user = decoded.id;
  // console.log(req.params.user)
  // Ide kell ellenőrizni, hogy létezik-e a user? Ha olyanra keres, aki nincs, akkor error?
  const reviews = await Review.find({ user: user });
  if (!reviews) return res.json("This user has no reviews yet!");
  console.log(reviews);

  res.json(reviews);
});

module.exports = router;
