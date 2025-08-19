import './App.css';
import Header from './components/Header'
import SearchResults from './components/SearchResults'
import { useState, useEffect } from 'react';


// supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dvtdlajmmvjwhvexyfzp.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


function App() {
  const [ isAbout, setIsAbout ] = useState('');
  const [ searchedMovie, setSearchedMovie ] = useState();
  const [ movies, setMovies ] = useState([]);
  const [ aboutMovie, setAboutMovie ] = useState({});

  const [ watchedMovies , setWatchedMovies ] = useState([]);

  async function getWatchedMovies() {
    const { data } = await supabase.from('watchedMovies').select();
    setWatchedMovies(data);
  }
  async function deleteWatchedMovies(id) {
    await supabase.from('watchedMovies').delete().eq("id", id);
    setWatchedMovies((prev) => prev.filter((movie) => movie.id !== id));
  }

  async function addToWatchedList( title, poster, runtime, imdb, honeyPoint, opinionText ) {
    await supabase.from("watchedMovies").insert({ title: title, poster: poster, duration: runtime, imdb: imdb, honeyPoint: honeyPoint, opinionText: opinionText});
    await getWatchedMovies();
  }

  useEffect(() => {
    getWatchedMovies();
  }, []);

  useEffect(() => {
    if (!searchedMovie) return;
    const temp = searchedMovie.replace(/ /g, '+');
    setSearchedMovie(temp);

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
        <Content deleteWatchedMovies={deleteWatchedMovies} addToWatchedList={addToWatchedList} watchedMovies={watchedMovies} isAbout={isAbout} aboutMovie={aboutMovie} setIsAbout={setIsAbout}/>
      </div>
    </div>
  );
}

function Content({ isAbout, aboutMovie, setIsAbout, watchedMovies,addToWatchedList, deleteWatchedMovies }) {
  const [ isRatingSetted, setIsRatingSetted ] = useState(false);
  return (
    <div className="Content">
      {
        !isAbout ?
        <>
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
          <WatchedList
            watchedMovies={watchedMovies}
            deleteWatchedMovies={deleteWatchedMovies}
          />
        </>
        :

          <About
            isRatingSetted = {isRatingSetted}
            setIsRatingSetted = {setIsRatingSetted}
            addToWatchedList={addToWatchedList}
            setIsAbout={setIsAbout}
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

function WatchedMovie({ poster, title, imdb, runtime, honeyPoint, opinionText, deleteWatchedMovies, id}) {
  const [ isClicked, setIsClicked ] = useState(false);
  return (
      <div 
      className='WatchedMovie'
      onClick={() => isClicked ? setIsClicked(false) : setIsClicked(true)}
      >
        
        <img 
          src={poster}
          alt=''
          onError={(e) => e.target.src = "./placeholder.jpg"} 
        />
        {
          isClicked ? 
          <p className="opinion-text">{opinionText}</p>
            :
          <div className='watched-movie-data'>
            <h2>{title}</h2>
            <p>⭐{imdb}</p>
            <p>💛{honeyPoint}</p>
            <p>⏳{runtime}</p>
          </div>
        }
        <button onClick={() => deleteWatchedMovies(id)}>-</button>
      </div>

  );
}

function WatchedList({ watchedMovies, deleteWatchedMovies }) {
  return (
    <div className="WatchedList">
      {
        watchedMovies.map((el) => {
          return <WatchedMovie 
            deleteWatchedMovies={deleteWatchedMovies}
            title={el.title}
            poster={el.poster}
            imdb={el.imdb}
            runtime={el.duration}
            honeyPoint={el.honeyPoint}
            opinionText={el.opinionText}
            id={el.id}
          />
        })
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

function About({ title, year, runtime, genre, imdbRating, plot, actors, director, poster, setIsAbout, addToWatchedList, isRatingSetted, setIsRatingSetted }) {
  const [ rating, setRating ] = useState(0);
  const [ opinionText, setOpinionText ] = useState('');

  return (
    <div className='About'>
      <div className='head'>
        <img 
          alt='' 
          src={poster}
          onError={(e) => e.target.src = "./placeholder.jpg"} 
        />
        <div className='head-content'>
          <h1>{title}</h1>
          <p>{year} | {runtime}</p>
          <p>{genre}</p>
          <p>{imdbRating}⭐ IMDb rating</p>
        </div>
      </div>

      <div className='rating'>
        <div className='your-text'>
          <textarea placeholder="Enter your opinion "
            onChange={(el) => {
              setOpinionText(el.target.value);
            }}
          ></textarea>

        </div>
        <div className='your-rate'>
          <div className='stars'>
            <Hearts 
            setRating={ setRating } 
            rating={ rating } 
            isRatingSetted = {isRatingSetted}
            setIsRatingSetted = {setIsRatingSetted}/>
          </div>
          <p>{rating}</p>
        </div>
        <button
         onClick={() => {
          addToWatchedList( title, poster, runtime, imdbRating, rating, opinionText)
          setIsAbout('')
         }}>Add to list</button>
        
      </div>
      <div className='description'>
        <p className="movie-description">{plot}</p>
        <p className="movie-actors">{actors}</p>
        <p className="movie-director">{director}</p>
      </div>
    </div>
  );
}

function Heart({ number, setRating, value, isRatingSetted, setIsRatingSetted}) {
    
  

  return (
    <div 
      className="Heart"
      onMouseEnter={() => {
        if ( !isRatingSetted ) {
          setRating(number+1)
        }
        
        
      }}
      onMouseLeave={() => {
        if ( !isRatingSetted ) {
          setRating(0);
        }
      }}
      onClick={() => {setIsRatingSetted(true); setRating(number+1); }}
      
      >{value}

    </div>
  );
}

  function Hearts({ setRating, rating, isRatingSetted, setIsRatingSetted }) {
    return (
      <div className='Hearts'>
        {Array.from({ length: 10 }, (_, i) => 
        i < rating ? (
          <Heart 
            isRatingSetted = {isRatingSetted}
            setIsRatingSetted = {setIsRatingSetted}
            value={"💛"} 
            key={i} 
            number={i} 
            setRating={setRating}
          />
        ): 
        <Heart
          isRatingSetted = {isRatingSetted}
          setIsRatingSetted = {setIsRatingSetted}
          value={"🤍"} 
          key={i} 
          number={i} 
          setRating={setRating}
        />
        )}
      </div>
    );

  }


export default App;
