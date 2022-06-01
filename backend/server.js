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

app.use(cors());
app.use(express.json());

// app.use('/api/login', loginRoutes);
app.use('/api/movie', movieRoutes);
app.use('/api/user', userRoutes);

app.post('/api/login', async (req, res) => {
    const code = req.body.code; //finding the authorization code sent by the frontend

    try {
        const response = await axios.post('https://oauth2.googleapis.com/token', { // exchanging the authorization code for a token
            'code': code,
            'client_id': process.env.CLIENT_ID,
            'client_secret': process.env.CLIENT_SECRET,
            'redirect_uri': 'http://localhost:3000/callback',
            'grant_type': 'authorization_code'
        })
        // response.data should be an object with an id_token key;
        const decoded = jwt.decode(response.data.id_token); // we cannot verify this token as it's signed by google, but we can decode it
        console.log('decoded is ', decoded);

        const userId = decoded.sub;
        const token = await jwt.sign({ id: userId }, process.env.JWT_SECRET);
        res.json(token);

    } catch (error) {
        console.log(error.response)
    }
})

app.post('/api/reviews/add', async (req, res) => { //adding a new review
    const { token, movieId, content, rating } = req.body
    console.log(`token is`, token)
    if (!token) return res.sendStatus(401); //running some basic checks on the token

    const decoded = jwt.decode(token);
    if (!decoded) return res.sendStatus(401);

    console.log(`
    new review by: ${decoded.id}, about the movie: ${movieId}. review content: ${content}. rating: ${rating}. this should now be pushed into the mongo db
    `)
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