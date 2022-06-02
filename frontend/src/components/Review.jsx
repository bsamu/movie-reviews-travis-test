import React, { useState, useEffect } from "react";
import ReactStars from "react-rating-stars-component";

const axios = require("axios");

const Review = () => {
  const [myReviews, setMyReviews] = useState([])
  const token = sessionStorage.getItem("token");

  const getMyReviews = async()=> {
    const resp = await axios.get('http://localhost:4000/api/user/', {
      headers: {
        'Authorization': token
      }})
    console.log(resp.data)
    setMyReviews(resp.data)
  }

  useEffect(() => {
    getMyReviews();
  }, []);
  
  return (
    <div>
      <div>
        <h1>My reviews</h1>
        {myReviews.map(review => <div><p>Movie title: {review.movie_title}</p><p> My rating: <ReactStars edit={false} value={review.rating}/></p><p>My review: {review.content}</p></div>)}
      </div>
     
    </div>
  );
};

export default Review;
