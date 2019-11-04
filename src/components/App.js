import React, { useState, useEffect } from 'react'
import '../../src/App.css'
import Header from '../../src/components/Header'
import Movie from '../../src/components/Movie'


const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY
const MOVIE_API_URL = `https://www.omdbapi.com/?s=man&apikey=${MOVIE_API_KEY}`

const App = () => {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        if (jsonResponse.Response === 'True') {
          setMovies(jsonResponse.Search)
          setLoading(false)
        } else {
          setErrorMessage(jsonResponse.Error)
          setLoading(false)
        }
      })
  }, [])

  return (
    <div className="App">
      <Header text='HOOKED' />
        <p className='App-intro'> Sharing a few of my favorite movies</p>
        <div className='movies'>
          {loading && !errorMessage 
          ?  (<span>Loading...</span>)
          : errorMessage 
            ? (<div className='errorMessage'>{errorMessage}</div>)
            : ( movies.map((movie, index) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie}/>
            )))
          }
        </div>
    </div>
  );
}

export default App;
