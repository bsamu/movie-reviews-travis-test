import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
const axios = require("axios");

const Movies = () => {
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(1);
  const [reviewContent, setReviewContent] = useState("")
  const token = sessionStorage.getItem("token");
  const [rating, setRating] = useState(5);

  const getData = async () => {
    const resp = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=85fab37c2f17d03c3079dc817115e074&page=${page}`
    );
    console.log(resp.data);
    setDataList(resp.data.results);
  };

  const sendUserReview = async(dataId, dataTitle)=>{
    try {
      const resp = await axios.post("http://localhost:4000/api/reviews/add", {
      token,
      movieId: dataId,
      movieTitle: dataTitle,
      content: reviewContent,
      rating,
    })
    setReviewContent("")
    } catch (error) {

    }
  }

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <div>
      <h1>Movies</h1>
      {dataList.map((data) => (
        <div>
          <h2>{data.original_title}</h2>
          <p>Overview: {data.overview}</p>
          <img
            src={"https://image.tmdb.org/t/p/w200/" + data.poster_path}
            alt=""
            srcset=""
          />
          <p>Release date: {data.release_date}</p>
          <div>
            <textarea type="text" placeholder="Write your review here" value={reviewContent} onChange={(event)=> setReviewContent(event.target.value)}></textarea>
          </div>
          <button onClick={() => sendUserReview(data.id, data.original_title)}> Send your review</button>
        </div>
      ))}
      <div className="page-select-container">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={500}
          marginPagesDisplayed={2}
          pageRangeDisplayed={10}
          onPageChange={(data) => setPage(data.selected + 1)}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default Movies;

/* test({
  adult: false,
  backdrop_path: "/rr7E0NoGKxvbkb89eR1GwfoYjpA.jpg",
  belongs_to_collection: null,
  budget: 63000000,
  genres: [{ id: 18, name: "Drama" }],
  homepage: "http://www.foxmovies.com/movies/fight-club",
  id: 550,
  imdb_id: "tt0137523",
  original_language: "en",
  original_title: "Fight Club",
  overview:
    'A ticking-time-bomb insomniac and a slippery soap salesman channel primal male aggression into a shocking new form of therapy. Their concept catches on, with underground "fight clubs" forming in every town, until an eccentric gets in the way and ignites an out-of-control spiral toward oblivion.',
  popularity: 51.597,
  poster_path: "/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg",
  production_companies: [
    {
      id: 508,
      logo_path: "/7PzJdsLGlR7oW4J0J5Xcd0pHGRg.png",
      name: "Regency Enterprises",
      origin_country: "US",
    },
    {
      id: 711,
      logo_path: "/tEiIH5QesdheJmDAqQwvtN60727.png",
      name: "Fox 2000 Pictures",
      origin_country: "US",
    },
    {
      id: 20555,
      logo_path: "/hD8yEGUBlHOcfHYbujp71vD8gZp.png",
      name: "Taurus Film",
      origin_country: "DE",
    },
    {
      id: 54051,
      logo_path: null,
      name: "Atman Entertainment",
      origin_country: "",
    },
    {
      id: 54052,
      logo_path: null,
      name: "Knickerbocker Films",
      origin_country: "US",
    },
    {
      id: 4700,
      logo_path: "/A32wmjrs9Psf4zw0uaixF0GXfxq.png",
      name: "The Linson Company",
      origin_country: "US",
    },
  ],
  production_countries: [
    { iso_3166_1: "DE", name: "Germany" },
    { iso_3166_1: "US", name: "United States of America" },
  ],
  release_date: "1999-10-15",
  revenue: 100853753,
  runtime: 139,
  spoken_languages: [
    { english_name: "English", iso_639_1: "en", name: "English" },
  ],
  status: "Released",
  tagline: "Mischief. Mayhem. Soap.",
  title: "Fight Club",
  video: false,
  vote_average: 8.4,
  vote_count: 24150,
}); */
