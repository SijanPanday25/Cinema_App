import { useEffect, useState } from 'react';
// axios is the service i have used to carry out the API pull requests. It seems to be the most popular one to use.
import axios from 'axios';
import './App.css';
import MovieCard from './components/MovieCard';
// adds yuotube function for trailer 
import YouTube from 'react-youtube';

function App() {

  //img for hero section
  const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280"
  // API URL
  const API_URL = 'https://api.themoviedb.org/3'
  // API Key
  const API_KEY = 'a89d14b3271db6828a54ca460d859bbc'
  // The array we will set the movie list to
  const [movies, setMovies] = useState([])
  // object for selecting movie on hero section
  const [selectedMovie, setSelectedMovie] = useState([])
  // The search box will be set to a string
  const [searchKey, setSearchKey] = useState('')

  const [playTrailer, setPlayTrailer] = useState(false)

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


    setMovies(results)
    await selectMovie(results[0])

  }
// this fatch appends the url so the movie object contains the video id which will be used to find the trailers on youtube
  const fetchMovie = async (id) => {
    const {data} = await axios.get(`${API_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: 'videos'
      }
    })

    return data
  }

  const selectMovie = async (movie) => {
    setPlayTrailer(false)
    const data = await fetchMovie (movie.id)
    setSelectedMovie(data)
  }

  useEffect(() => {
    fetchMovies()
  }, [])

  
  const renderMovies = () => (
    movies.map(movie => (
      <MovieCard
        key={movie.id}
        movie={movie}
        selecteMovie={selectMovie} //setting a prop for sellecting different moveis 
      />
    ))
  )

  // The search movies function which uses the searchKey
  const searchMovies = (e) => {
    e.preventDefault()
    fetchMovies(searchKey)
  }

  const renderTrailer = () => {
    const trailer = selectedMovie.videos.results.find(vid => vid.name === 'Official Trailer')
    const key = trailer ? trailer.key : selectedMovie.videos.results[0].key  // if it cant find the official trailer then it will find the first avilable video

    return (
      <YouTube 
        videoId={key}
        containerClassName = {"youtube-container"}
        opts={{
          width: "100%",
          height: "100%", 
          playerVars: {
            autoplay: 1,
            controls: 0    // this plays the trailer when button is clicked and removes the youtube controls
          }
        }}
      />
    )
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

      <div className='hero'style={{backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${selectedMovie.backdrop_path})`}}>
        <div className='hero-content content-style'>
          {playTrailer ? <button className='btn2 btn-closed' onClick={() => setPlayTrailer(false)}>Close</button> : null}
          {selectedMovie.videos && playTrailer ? renderTrailer () : null }
          <button className='btn1' onClick={() => setPlayTrailer(true)}>Play Trailer</button>
          <h1 className='hero-title'>{selectedMovie.title}</h1>
          <p className='hero-overview'>{selectedMovie.overview ? selectedMovie.overview : null }</p>
        </div>
      </div>


{/* The const renderMovies which reutnrs the list of movies */}
      <div className='container content-style'>
        {renderMovies()}
      </div>
    </div>
  );
}

export default App;
