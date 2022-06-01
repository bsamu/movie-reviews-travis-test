import './App.css';
import { Routes, Route, Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Review from './components/Review';
import ReactPaginate from "react-paginate";

const axios = require('axios');

//openID flow
const Login = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getToken = async () => {
    let code = searchParams.get('code');
    console.log(code);
    const response = await axios.post('http://localhost:4000/api/login', {
      code //sending the authorization code to the backend
    });
    console.log(response);
    sessionStorage.setItem('token', response.data);
  }

  useEffect(() => {
    getToken();
  }, [])

  return <div>LOGIN</div>
}

const Home = () => {
  const [dataList, setDataList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(500);

  const getData = async () => {
    const resp = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=85fab37c2f17d03c3079dc817115e074&page=${page}`
    );
    console.log(resp.data);
    setDataList(resp.data.results);
  };

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <div>
        <h2>HOME</h2>
      {dataList.map((data) => (
        <div>
          <p>Title: {data.title}</p>
          <p>Overview: {data.overview}</p>
          <p>Release date: {data.release_date}</p>
        </div>
      ))}
      <div className='page-select-container'>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
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
  )
}

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/reviews' element={<Review />}/>
        <Route path='/callback' element={<Login />}/>
      </Routes>
    </div>
  );
}

export default App;
