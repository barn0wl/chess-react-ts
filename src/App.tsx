import './App.css'
import ChessBoard from './components/chessBoard/ChessBoard'
import { RootState } from './store'
import { useSelector } from 'react-redux'


function App() {
  const pieces = useSelector((state: RootState) => state.pieces)
  const selectedSquare = useSelector((state: RootState) => state.selectedSquare)
  const possibleMoves = useSelector((state: RootState)=> state.possibleMoves)

  return (
    <>
      <h1>Vite + React</h1>
      <ChessBoard pieces={pieces} selectedSquare={selectedSquare} possibleMoves={possibleMoves} isWhiteTurn={true}/>
      <div className="card">
        <p>
          Enjoy a Game of Chess
        </p>
      </div>
    </>
  )
}

export default App
