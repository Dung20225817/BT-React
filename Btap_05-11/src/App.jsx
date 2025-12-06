import React from 'react'
import './App.css'
import SearchForm from './components/SearchForm'
import AddUser from './components/AddUser'
import ResultTable from './components/ResultTable'

function App() {
  const [keyword, setKeyword] = React.useState('')
  const [newUser, setNewUser] = React.useState(null)

  function handleAddUser(user) {
    setNewUser(user)
  }

  function handleAddedConsumed() {
    setNewUser(null)
  }

  return (
    <div>
      <h1>Quản lý người dùng</h1>
      <div className="toolbar">
        <SearchForm onChangeValue={setKeyword} />
        <span className="keyword-display">Keyword: <strong>{keyword || '(Trống)'}</strong></span>
        <AddUser onAdd={handleAddUser} />
      </div>
      <ResultTable keyword={keyword} user={newUser} onAdded={handleAddedConsumed} />
    </div>
  )
}

export default App
