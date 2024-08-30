import { FC } from "react"
import Square from "../square/Square"
import "./ChessBoard.css"
import PieceComponent from "../pieces/Piece"
import { setPossibleMoves, setSelectedSquare } from "../../gameSlice"
import { useDispatch } from "react-redux"
import { PieceData } from "../../serialization"

interface ChessBoardProps {
    pieces: PieceData[],
    selectedSquare?: [number, number],
    possibleMoves: [number, number][]
}

const ChessBoard : FC<ChessBoardProps> = ( {pieces, selectedSquare, possibleMoves}) => {
    const dispatch = useDispatch()
    const rows = 8;
    const cols = 8;

    const getPiece = (xIndex: number, yIndex: number) => {
        const piece = pieces.find(
            index => index.position[0] === xIndex && index.position[1] === yIndex
        )
        return piece
    }

    const isPossibleMove = (rowIndex: number, colIndex: number) => {
        return possibleMoves.some(
            move => {
                const [moveX, moveY] = move
                return colIndex === moveX && rowIndex == moveY
            }
        )
    }

    const handleClick = (rowIndex: number, colIndex: number) => {
        const piece = getPiece(colIndex, rowIndex)
        if (!isPossibleMove(rowIndex, colIndex)) {
            if (piece) {
                dispatch(setSelectedSquare([colIndex, rowIndex]))
                dispatch(setPossibleMoves([colIndex, rowIndex]))
            }
        }
        console.log(`Clicked square at (${colIndex}, ${rowIndex})`)  
      }

    // Generate the board
    const chessBoard = Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: cols }, (_, colIndex) => {
        // Alternate colors based on position
        return <Square key={`${rowIndex}-${colIndex}`}
        position={[colIndex, rowIndex]}
        onClick={() => handleClick(rowIndex, colIndex)}
        selectedSquare={selectedSquare}
        isPossibleMove={isPossibleMove(rowIndex, colIndex)}/>;
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