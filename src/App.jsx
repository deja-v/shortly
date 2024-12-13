import { useState } from 'react'
import Url from './components/url'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2 className='title'>Shortly</h2>  
      <Url />

    </>
  )
}

export default App
