import { useState } from 'react'
import './App.css'
import InsertModal from './components/InsertModal'
import UserState from './components/UserState'

function App() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <h1>Users</h1>
      <UserState/>
      <button onClick={() => { setOpen(!open) }}>Insert</button>
      <InsertModal isOpen={open} setOpen={setOpen}/>
    </>
  )
}

export default App
