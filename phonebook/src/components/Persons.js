const Persons = ({ name, number, test }) => {
  return (
    <div>
      <div>
        {name} {number}
        <button onClick={test}>Delete</button>
      </div>
    </div>
  )
}
export default Persons
