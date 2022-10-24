import Filter from './components/Filter'
import Country from './components/Country'
import Countries from './components/Countries'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [filter, setFilter] = useState('')

  const handleFilter = (e) => {
    setFilter(e.target.value)
    const filteredCountries = data.filter((country) =>
      country.name.common.toLowerCase().match(filter.toLowerCase())
    )
    setFilteredData(filteredCountries)
  }
  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setData(response.data)
    })
  }, [])

  return (
    <div>
      <Filter filter={filter} handleFilter={handleFilter} />
      {filter === '' ? (
        <div>Write a country name</div>
      ) : filteredData.length === 0 ? (
        <div>Nothing found</div>
      ) : filteredData.length > 10 ? (
        <div>you should be more specific!</div>
      ) : filteredData.length <= 10 && filteredData.length >= 2 ? (
        <Countries
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        />
      ) : filteredData.length === 1 ? (
        <Country country={filteredData[0]} />
      ) : (
        <div>Write a country name</div>
      )}
    </div>
  )
}

export default App
