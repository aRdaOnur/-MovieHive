import React from 'react'

function Movie({ title, year, poster, setIsAbout, isAbout, imdbID }) {
  return (
    <div 
    className='Movie'
    onClick={() => {
      isAbout ? setIsAbout('') : setIsAbout(imdbID)
    }}
    > 
        <img src={poster} alt='annen'/>
        
        <div className='about-movie'>
            <h3>{title}</h3>
            <p>📅 {year}</p>
        </div>

    </div>
  )
}

export default Movie