import { useState } from 'react'
import './App.css'
import InsertModal from './components/InsertModal'

function App() {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      <h1>Users</h1>
      <button onClick={() => { setOpen(!open) }}>Insert</button>
      <InsertModal isOpen={open} setOpen={setOpen}/>
    </>
  )
}

export default App
