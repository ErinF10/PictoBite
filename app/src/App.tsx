import { useState } from 'react'
import Api from './services/api'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Api />
    </>
  )
}

export default App
