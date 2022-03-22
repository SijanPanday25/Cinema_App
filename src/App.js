import { useEffect, useState } from 'react';
// axios is the service i have used to carry out the API pull requests. It seems to be the most popular one to use.
import axios from 'axios';
import './App.css';
import MovieCard from './components/MovieCard';

function App() {

  // API URL
  const API_URL = 'https://api.themoviedb.org/3'
  // API Key
  const API_KEY = 'a89d14b3271db6828a54ca460d859bbc'
  // The array we will set the movie list to
  const [movies, setMovies] = useState([])
  // object for selecting movie on hero section
  const [selectedMovie, setSelectedMovie] = useState({})
  // The search box will be set to a string
  const [searchKey, setSearchKey] = useState('')

  // This is the constant I have set for the API request we make when the application is opened, which grabs the movies, and subsequently reacts when a search function is submitted
  const fetchMovies = async (searchKey) => {
    // If a search key is set, we set it to search type, otherwise, we set it to discover movies
    const type = searchKey ? "search" : "discover"
    const {data: {results}} = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey
      }
    })


    selectedMovie(results[0])
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

  // The search movies function which uses the searchKey
  const searchMovies = (e) => {
    e.preventDefault()
    fetchMovies(searchKey)
  }


// What's returned into the HTML

  return (
    <div className= 'trailerApp'>
      <header className='header'>
        <div className='header-content content-style'>
          <span>Movie App</span>
{/* Search button, which sets the text input to Search Key when submitted */}
            <form onSubmit={searchMovies}>
              <input type='text' onChange={(e) => setSearchKey(e.target.value)}/>
              <button type='submit'>Search</button>
            </form>
        </div>
      </header>

      <div className='hero'>
        <h1>{selectedMovie.title}</h1>

      </div>




{/* The const renderMovies which reutnrs the list of movies */}
      <div className='container content-style'>
        {renderMovies()}
      </div>
    </div>
  );
}

export default App;
