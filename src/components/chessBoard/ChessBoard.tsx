import { FC } from "react"
import Square from "../square/Square"
import "./ChessBoard.css"
import PieceComponent from "../pieces/Piece"
import { setSelectedSquare } from "../../gameSlice"
import { useDispatch } from "react-redux"
import { PieceData } from "../../serialization"

interface ChessBoardProps {
    pieces: PieceData[],
    selectedSquare?: [number, number]
}

const ChessBoard : FC<ChessBoardProps> = ( {pieces, selectedSquare}) => {
    const dispatch = useDispatch()
    const rows = 8;
    const cols = 8;

    const getPiece = (xIndex: number, yIndex: number) => {
        const piece = pieces.find(
            index => index.position[0] === xIndex && index.position[1] === yIndex
        )
        return piece
    }

    const handleClick = (rowIndex: number, colIndex: number) => {
        const piece = getPiece(colIndex, rowIndex)
        console.log(`Clicked square at (${colIndex}, ${rowIndex})`)
        if (piece) console.log(`Piece clicked at ${piece.position}`)
        dispatch(setSelectedSquare([colIndex, rowIndex]))
      }

    // Generate the board
    const chessBoard = Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: cols }, (_, colIndex) => {
        // Alternate colors based on position
        return <Square key={`${rowIndex}-${colIndex}`}
        position={[colIndex, rowIndex]}
        onClick={() => handleClick(rowIndex, colIndex)}
        selectedSquare={selectedSquare}/>;
        })
    )

    return (
       <div className="chess-board">
            {chessBoard.flat()}
            { pieces.map((piece, index) => (
                <PieceComponent key={index} piece={piece}/>
            ))}
        </div>
    ) 
 }
 
 export default ChessBoard