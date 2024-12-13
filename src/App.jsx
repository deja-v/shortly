import { useState } from 'react'
import Url from './components/url'
import ShortenedLink from './components/shortenedUrl'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h2 className='title'>Shortly</h2>  
      <Url />

      {/* <ShortenedLink /> */}
    </>
  )
}

export default App
