import './App.css';
import Header from './components/Header'
import SearchResults from './components/SearchResults'
import { useState, useEffect } from 'react';


function App() {
  const [ isAbout, setIsAbout ] = useState('');
  const [ searchedMovie, setSearchedMovie ] = useState();
  const [ movies, setMovies ] = useState([]);
  const [ aboutMovie, setAboutMovie ] = useState({});
  console.log(searchedMovie)

  useEffect(() => {
    if (!searchedMovie) return;
    fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&s=${searchedMovie}`)
    .then((res) => res.json())
    .then((res) => setMovies(res.Search))
  }, [searchedMovie]);


  useEffect(() => {
    if (!isAbout) return;
    fetch(`https://www.omdbapi.com/?apikey=${import.meta.env.VITE_API_KEY}&i=${isAbout}`)
    .then((res) => res.json())
    .then((res) => setAboutMovie(res))
  }, [isAbout]);

  return (
    <div className="App">
      <Header setSearchedMovie={setSearchedMovie}/>
      <div className='container'>
        <SearchResults movies={movies} setIsAbout={setIsAbout} isAbout={ isAbout }/>
        <Content isAbout={isAbout} aboutMovie={aboutMovie}/>
      </div>
    </div>
  );
}

function Content({ isAbout, aboutMovie }) {

  return (
    <div className="Content">
      {
        !isAbout ?
        <div className='content'>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <h3 className='content-title'>Movies You Watched</h3>
            <Button/>
          </div>
          <div className='stat'>
            <p>#️⃣ 0 movies</p>
            <p>⭐ 0.0</p>
            <p>💛 0.0</p>
            <p>⏳ 0 min</p>
          </div>
        </div > 
        :

          <About
            title={aboutMovie.Title}
            year={aboutMovie.Year}
            runtime={aboutMovie.Runtime}
            genre={aboutMovie.Genre}
            imdbRating={aboutMovie.imdbRating}
            plot={aboutMovie.Plot}
            actors={aboutMovie.Actors}
            director={aboutMovie.Director}
            poster={aboutMovie.Poster}
          />
      }
    </div>
  );
}

function Button() {
  return (
    <div className="Button">
      +
    </div>
  );
}

function About({ title, year, runtime, genre, imdbRating, plot, actors, director, poster, setIsAbout }) {
  return (
    <div className='About'>
      <div className='head'>
        <img alt='annen' src={poster}/>
        <div className='head-content'>
          <h1>{title}</h1>
          <p>{year} | {runtime}</p>
          <p>{genre}</p>
          <p>{imdbRating}⭐ IMDb rating</p>
        </div>
      </div>

      <div className='rating'>
        <div className='your-rate'>
          <p className='stars'>💛💛💛💛💛💛💛🤍🤍🤍</p>
          <p>8</p>
        </div>
        <button>Add to list</button>
        
      </div>
      <div className='description'>
        <p className="movie-description">{plot}</p>
        <p className="movie-actors">{actors}</p>
        <p className="movie-director">{director}</p>
      </div>
    </div>
  );
}


export default App;
