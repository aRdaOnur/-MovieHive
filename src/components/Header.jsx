function Header({ setSearchedMovie }) {
  return (
    <div className="Header">
      <h1>
        <img className="icon" src="./honey.png" alt="asgasd"/> 
        MovieHive
        </h1>
      <SearchBar setSearchedMovie={setSearchedMovie}/>
      <Profile/>
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
function Profile() {
  return (
      <div className="Profile">
        <img src="./default-profile.png"/>
        <p>IremArda</p>
      </div>
  );
}

export default Header