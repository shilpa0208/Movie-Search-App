import React, { useState, useEffect } from 'react'
import '../../src/App.css'
import Header from '../../src/components/Header'
import Movie from '../../src/components/Movie'
import Search from '../../src/components/Search'


const MOVIE_API_KEY = process.env.REACT_APP_MOVIE_API_KEY
const MOVIE_API_BASE_URL = process.env.REACT_APP_MOVIE_API_BASE_URL

const App = () => {
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    fetch(MOVIE_API_BASE_URL + `?s=man&apikey=${MOVIE_API_KEY}`)
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

  const search = (searchValue) => {
    setLoading(true)
    setErrorMessage(null)

    fetch(MOVIE_API_BASE_URL + `?s=${searchValue}&apiKey=${MOVIE_API_KEY}`)
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
  }

  return (
    <div className="App">
      <Header text='MOVIE SEACH APP' />
        <Search search={search} />
        <p className='App-intro'> Sharing a few of my favorite movies</p>
        <div className='movies'>
          {loading && !errorMessage 
          ?  <span className='loading'>Loading...</span>
          : errorMessage 
            ? <div className='errorMessage'>{errorMessage}</div>
            : movies.map((movie, index) => (
              <Movie key={`${index}-${movie.Title}`} movie={movie}/>
            ))
          }
        </div>
    </div>
  );
}

export default App;
