import './App.css';
import axios from 'axios'
import {useState, useEffect} from 'react'

function App() {
  const [users, setUsers] = useState([])
  const [text, setText] = useState('')
  const [suggestions, setSuggestions] = useState([])
  useEffect( () => {
    const loadUsers = async() => {
      const response = await axios.get('https://reqres.in/api/users?page=2')
      console.log(response.data)
      setUsers(response.data.data)
    }
    loadUsers()
  }, [] )


  const onSuggestHandler = (text) => {
    setText(text)
    setSuggestions([])
  }

  const onChangeHandler = (text) => {
    let matches = [] 
    if(text.length > 0){
      matches = users.filter(user => {
        const regex = new RegExp(`${text}`, "gi");
        return user.email.match(regex)
      })
    }
    console.log("matches ", matches)
    setSuggestions(matches)
    setText(text)
  }



  return (
    <div className="App">
      <header>
        <h2>
          Email Auto Suggestion
        </h2>
      </header>
      <div className="search-container">
      <input type="text" className="search-field"
        onChange = {e => onChangeHandler(e.target.value) } placeholder="Search email"  value={text}
        onBlur = {() => {
          setTimeout(() => {
            setSuggestions([])
          }, 100);
        }} />
      </div>
      <div className="suggestion-container">
      {suggestions && suggestions.map((suggestion, i) => 
        <div key="i" className="col-md-12 justify-content-md-center suggestion" onClick = {() => onSuggestHandler(suggestion.email)}>{suggestion.email}</div>
        )}
      </div>
    </div>
  );
}

export default App;