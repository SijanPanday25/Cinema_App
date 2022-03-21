import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import MovieCard from './components/MovieCard';

function App() {

  // API URL
  const API_URL = 'https://api.themoviedb.org/3'
  // API Key
  const API_KEY = 'a89d14b3271db6828a54ca460d859bbc'
  // The array we will set the movies to
  const [movies, setMovies] = useState([])

  // This is the constant I have set for the API request we make when the application is opened, which grabs the movies
  const fetchMovies = async () => {
    const {data: {results}} = await axios.get(`${API_URL}/discover/movie`, {
      params: {
        api_key: API_KEY
      }
    })

    setMovies(results)

  }

  useEffect(() => {
    fetchMovies()
  }, [])

  const renderMovies = () => (
    movies.map(movie => (
      <MovieCard
        key={movie.id}
        movie={movie}
      />
    ))
  )

  return (
    <div className= 'trailerApp'>
      <h1>Hello World</h1>
      <div className='container'>
         {renderMovies()}
         </div>
    </div>
  );
}

export default App;
