require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 4000;
const mongoose = require('mongoose');

// const loginRoutes = require('./route/login');
const movieRoutes = require('./route/movie');
const userRoutes = require('./route/user');
const Review = require('./models/review');

app.use(cors());
app.use(express.json());

// app.use('/api/login', loginRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api/user', userRoutes);

app.post('/api/login', async (req, res) => {
    const code = req.body.code; //finding the authorization code sent by the frontend
    if (!code) return res.sendStatus(400); //if no authorization code is sent, return bad request

    const response = await axios.post('https://oauth2.googleapis.com/token', { // exchanging the authorization code for a token
    'code': code,
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET,
    'redirect_uri': 'http://localhost:3000/callback',
    'grant_type': 'authorization_code'
    });

    if (!response) return res.sendStatus(500); //if no response is received, google is dead and society is about to collapse. also, return 500.
    if (response.status !== 200) return res.sendStatus(401); //if we receive a response but it's not OK, it's  probably the user's fault lol

    const decoded = jwt.decode(response.data.id_token); // we cannot verify this token as it's signed by google, but we can decode it
    console.log('decoded is ', decoded); //this should contain a bunch of data about the authorized google account
    if (!decoded) return res.sendStatus(500);

    const userId = decoded.sub; //decoded.sub is the unique id of the authorized google account
    const sessionToken = await jwt.sign({ id: userId}, process.env.JWT_SECRET, {expiresIn: "1h"}); //here we're creating our own JWT, signing it with our own JWT secret, then sending it back to the frontend, where it will be saved to the sessionStorage
    res.json(sessionToken);
})

app.post('/api/reviews/add', async (req, res) => { //adding a new review
    const { token, movieId, content, rating } = req.body
    console.log(`token is`, token)
    if (!token) return res.sendStatus(401); //if we don't have a token, the user is not authorized yet

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.sendStatus(401); //if the token is not valid, the user is not authorized

    console.log(`
    new review by: ${decoded.id}, about the movie: ${movieId}. review content: ${content}. rating: ${rating}. this should now be pushed into the mongo db
    `)

    const review = Review({
        movie: movieId,
        user: decoded.id,
        content: content,
        rating: rating
    });

    review.save(() => {
        res.send(review);
    });
})

// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`)
// })

mongoose.connect(process.env.CONNECTION_STRING, () => {
    console.log("MongoDB connected using Mongoose.");

    app.listen(process.env.PORT, () => {
        console.log(`Listening at localhost: ${process.env.PORT}...`)
    });
}, e => console.error(e));