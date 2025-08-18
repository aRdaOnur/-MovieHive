function Header({ setSearchedMovie }) {
  return (
    <div className="Header">
      <h1>🍯MovieHive</h1>
      <SearchBar setSearchedMovie={setSearchedMovie}/>
      <ResaultCount/>
    </div>
  )
}

function SearchBar({ setSearchedMovie }) {
  return (
    <input 
    className="SearchBar" 
    placeholder='Search movie...' 
    onChange={(el) => {
      setSearchedMovie(el.target.value)
    }}/>
  );
}
function ResaultCount() {
  return (
    <div className="ResaultCount">
      <p>Found 10 results</p>
    </div>
  );
}

export default Header