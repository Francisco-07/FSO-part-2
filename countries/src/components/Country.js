import { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({ country }) => {
  const [weather, setWeather] = useState({
    main: { temp: '0' },
    wind: { speed: 0 },
  })
  const [icon, setIcon] = useState('')
  const lat = country.latlng[0]
  const lon = country.latlng[1]
  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`
      )
      .then((response) => {
        setWeather(response.data)
        setIcon(response.data.weather[0].icon)
      })
      .catch((error) => {
        console.log(error)
      })
  })

  return (
    <div>
      <div>
        <div>Country: {country.name.common}</div>
        <div>Area: {country.area}</div>
        <h2>Languages</h2>
        <div>
          {Object.keys(country.languages).map((key, i) => (
            <ul key={i}>
              <li>{country.languages[key]}</li>
            </ul>
          ))}
        </div>
        <img src={country.flags.png} alt='test' />
        <h2>The weather in {country.capital}</h2>
        <div>Temperature: {weather.main.temp}°</div>
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt='icon'
        />
        <div>Wind: {weather.wind.speed * 3.6} Km/h</div>
      </div>
    </div>
  )
}
export default Country
