import React from 'react'
import './App.css'
import SearchForm from './components/SearchForm'
import AddStudent from './components/AddStudent'
import ResultTable from './components/ResultTable'

function App() {
  const [keyword, setKeyword] = React.useState('')
  const [newStudent, setNewStudent] = React.useState(null)

  function handleAddStudent(student) {
    setNewStudent(student)
  }

  function handleAddedConsumed() {
    setNewStudent(null)
  }

  return (
    <div>
      <h1>Quản lý học sinh</h1>
      <div className="toolbar">
        <SearchForm onChangeValue={setKeyword} />
        <span className="keyword-display">Keyword: <strong>{keyword || '(Trống)'}</strong></span>
        <AddStudent onAdd={handleAddStudent} />
      </div>
      <ResultTable keyword={keyword} student={newStudent} onAdded={handleAddedConsumed} />
    </div>
  )
}

export default App
