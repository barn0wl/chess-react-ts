import './App.css'
import ChessBoard from './components/chessBoard/ChessBoard'
import { RootState } from './services/store'
import { useSelector } from 'react-redux'


function App() {
  const pieces = useSelector((state: RootState) => state.pieces)
  const selectedSquare = useSelector((state: RootState) => state.selectedSquare)
  const possibleMoves = useSelector((state: RootState)=> state.possibleMoves)
  const inCheckSquare = useSelector((state: RootState) => state.inCheckSquare)
  const isWhiteTurn = useSelector((state: RootState) => state.isWhiteTurn)

  return (
    <>
      <h1>Vite + React Chess</h1>
      <ChessBoard pieces={pieces} selectedSquare={selectedSquare}
      possibleMoves={possibleMoves} isWhiteTurn={isWhiteTurn} inCheckSquare={inCheckSquare}/>
      <div className="card">
        <p>
          Enjoy a Game of Chess
        </p>
      </div>
    </>
  )
}

export default App
