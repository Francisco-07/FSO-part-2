const Countries = ({ filteredData, setFilteredData }) => {
  return (
    <div>
      {filteredData.map((country, i) => (
        <ul key={i}>
          <li>
            {country.name.common}
            <button onClick={() => setFilteredData([country])}>show</button>
          </li>
        </ul>
      ))}
    </div>
  )
}
export default Countries
