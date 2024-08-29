import './App.css'
import ChessBoard from './components/chessBoard/ChessBoard'
import { RootState } from './store'
import { useSelector } from 'react-redux'


function App() {
  const board = useSelector((state: RootState) => state.game.getBoard)

  return (
    <>
      <h1>Vite + React</h1>
      <ChessBoard board={board}/>
      <div className="card">
        <p>
          Enjoy a Game of Chess
        </p>
      </div>
    </>
  )
}

export default App
