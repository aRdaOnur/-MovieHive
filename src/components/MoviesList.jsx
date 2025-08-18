import React from 'react'
import Movie from './Movie'

function MoviesList({ movies, setIsAbout, isAbout }) {
  return (
    <div className='MoviesList'>
      {
        movies && 
        movies.map((movie) => {
          return <Movie 
            key={movie.imdbID} 
            title={movie.Title} 
            year={movie.Year} 
            poster={movie.Poster}
            imdbID={movie.imdbID}
            setIsAbout={setIsAbout}
            isAbout={isAbout}
          />
        })
      }
       
      
    </div>
  )
}

export default MoviesList