import { FC } from "react"
import Square from "../square/Square"
import "./ChessBoard.css"
import Board from "../../models/board"

interface ChessBoardProps {
    board: Board
}

const ChessBoard : FC<ChessBoardProps> = ( {board}) => {
    const rows = 8;
    const cols = 8;

    const handleClick = (rowIndex: number, colIndex: number) => {
        const piece = board.getPiece([colIndex, rowIndex])
        console.log(`Clicked square at (${rowIndex}, ${colIndex})`)
        if (piece) console.log(`Piece clicked at ${piece.getPosition}`)
      }

    // Generate the board
    const chessBoard = Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: cols }, (_, colIndex) => {
        // Alternate colors based on position
        return <Square key={`${rowIndex}-${colIndex}`}
        position={[colIndex, rowIndex]}
        onClick={() => handleClick(colIndex, rowIndex)}/>;
        })
    )
    return (
       <div className="chess-board">{chessBoard.flat()}</div>
    ) 
 }
 
 export default ChessBoard