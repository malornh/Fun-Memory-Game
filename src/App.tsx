import './App.css'
import Board from './components/Board'
import { Analytics } from "@vercel/analytics/react"

function App() {

  return (
    <>
      <div className='background'>
        <Analytics/>
        <Board/>
      </div>
    </>
  )
}

export default App
