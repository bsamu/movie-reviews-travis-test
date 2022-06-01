import React, { useState } from 'react';
const axios = require('axios');

const Review = () => {
    const token = sessionStorage.getItem('token');
    const [movieId, setMovieId] = useState('dummy movie');
    const [content, setContent] = useState('dummy review');
    const [rating, setRating] = useState(5);

  return (
    <div>
        <button onClick={() => axios.post('http://localhost:4000/api/reviews/add', {
            token,
            movieId,
            content,
            rating
        })}>send review</button>
    </div>
  )
}

export default Review