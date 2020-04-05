import React from 'react'

/** Default image to be rendered if the API does not return one */
const DEFAULT_PLACEHOLDER_IMAGE = process.env.REACT_APP_DEFAULT_PLACEHOLDER_IMAGE

const Movie = ({ movie }) => {
     const poster = movie.poster === 'N/A' ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster

     return (
         <div className='movie'>
             <h2>{movie.Title}</h2>
             <div>
                <img
                    width='200'
                    alt={movie.Title}
                    src={poster}
                />
             </div>
             <p>({movie.Year})</p>
         </div>
     )
}

export default Movie
