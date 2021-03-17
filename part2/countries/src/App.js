import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      find countires:
      <input
        type="text"
        placeholder="search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
    </div>
  )
}

const View = ({ country }) => {
  return (
    <div>
      <h2>{country.name} </h2>
      <span>capital: {country.capital} <br /></span>
      <span>population: {country.population}</span>
      <h3>Spoken languages</h3>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag" width="150"></img>
    </div>
  )
}

const Results = ({ searchTerm, countires, showResults, setShowResults, weather }) => {
  if (!searchTerm) {
    return (<div>Please enter a search term :)</div>)
  }
  else if (countires.length > 10) {
    return (<div>Too many matches, please specify another filter.</div>)
  }
  else if (countires.length <= 10 && countires.length > 1) {
    const addCountry = (country) => setShowResults(showResults.concat(country))
    return (
      <div>
        {countires.map(country => <div key={country.name}>
          <span>{country.name}</span>
          <button onClick={() => addCountry(country.name)}>show</button>
          {showResults.includes(country.name) ? <View country={country} /> : null}
        </div>
        )}
      </div>)
  }
  else if (countires.length === 1) {
    const country = countires[0]
    if (weather.current) {
      return (
        <div>
          <View country={country} />
          <h3>Weather in {country.capital}</h3>
          <b>temperature:</b>
          <span>{weather.current.temperature} C <br /></span>
          <img src={weather.current.weather_icons} alt='weather' /> <br />
          <b>wind:</b>
          <span>{weather.current.wind_speed}
            kpm direction: {weather.current.wind_dir}
          </span>


        </div>

      )
    } else return (<div />)
  }
  else {
    return (<div>No matches</div>)
  }
}

const App = () => {
  const [countires, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showResults, setShowResults] = useState([])
  const [weather, setWeather] = useState({})


  useEffect(() => {
    const promise = axios.get('https://restcountries.eu/rest/v2/name/' + searchTerm)
    promise.then(response => {
      setCountries(response.data)
    })
    let params = {}
    if (countires.length === 1) {
      console.log(countires[0].capital)
      params = {
        access_key: process.env.REACT_APP_API_KEY,
        query: countires[0].capital ? countires[0].capital : 'helsinki'
      }
      const promise2 = axios.get('http://api.weatherstack.com/current', { params })
      promise2.then(response => setWeather(response.data))
      console.log(weather);
    }
  }, [searchTerm])

  const handleSearchChange = (event) => setSearchTerm(event.target.value)

  return (
    <div>
      <Filter searchTerm={searchTerm} handleSearchChange={handleSearchChange} />
      <Results searchTerm={searchTerm} countires={countires}
        showResults={showResults} setShowResults={setShowResults} weather={weather} />
    </div >
  );
}

export default App;
