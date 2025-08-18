import MoviesList from './MoviesList'


function SearchResults({ movies, setIsAbout, isAbout}) {
 
  return (
    <div className='SearchResults'>
      <MoviesList movies={movies} setIsAbout={setIsAbout} isAbout={isAbout}/>
    </div>
  )
}

export default SearchResults