import React from 'react';

const MovieCard = ({movie, selecteMovie}) => {
  const IMAGE_PATH = `https://image.tmdb.org/t/p/w500`
  return (
    <div className={'movie-card'} onClick={() => selecteMovie(movie)} >
      {movie.poster_path ? <img className={'movie-cover'} src={`${IMAGE_PATH}${movie.poster_path}`} alt=''/>
      : 
      <div className='placeholder'>No Image Available</div>
      }
      <h3 className={'movie-title'}>{movie.title}</h3>
    </div>
  )
}

export default MovieCard;