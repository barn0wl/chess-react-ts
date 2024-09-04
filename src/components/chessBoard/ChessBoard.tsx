import { FC, useEffect } from "react"
import Square from "../square/Square"
import "./ChessBoard.css"
import PieceComponent from "../pieces/Piece"
import { initializeGameState, movePiece, setPossibleMoves, setSelectedSquare } from "../../gameSlice"
import { useDispatch } from "react-redux"
import { PieceData } from "../../serialization"

interface ChessBoardProps {
    pieces: PieceData[],
    selectedSquare?: [number, number]
    possibleMoves: [number, number][]
    inCheckSquare?: [number, number]
    isWhiteTurn : boolean
}

const ChessBoard : FC<ChessBoardProps> = ( {pieces, selectedSquare, 
    possibleMoves, inCheckSquare, isWhiteTurn}) => {

    const dispatch = useDispatch()
    const rows = 8;
    const cols = 8;

    useEffect(() => {dispatch(initializeGameState())}, [dispatch])

    const getPiece = (rowIndex: number, colIndex: number) => {
        return pieces.find(
            piece => {
                const [pieceX, pieceY] = piece.position
                return colIndex === pieceX && rowIndex === pieceY
            }
        )
    }

    const isPossibleMove = (rowIndex: number, colIndex: number) => {
        return possibleMoves.some(
            move => {
                const [moveX, moveY] = move
                return colIndex === moveX && rowIndex == moveY
            }
        )
    }

    const isInCheck = (rowIndex: number, colIndex: number) => {
        return inCheckSquare !== undefined && inCheckSquare[0] === colIndex && inCheckSquare[1] === rowIndex
    }

    const handleClick = (rowIndex: number, colIndex: number) => {
        const piece = getPiece(rowIndex, colIndex)
        const clickedPosition: [number, number] = [colIndex, rowIndex]
        if (piece) console.log(piece.isWhite)
        console.log(`Clicked square at (${colIndex}, ${rowIndex})`)

        // Case 1: Handle if the click is on a possible move
        if (isPossibleMove(rowIndex, colIndex)) {
            if (selectedSquare) {
                const [startX, startY] = selectedSquare;
                handleMove([startX, startY], clickedPosition);
                dispatch(setSelectedSquare())
                dispatch(setPossibleMoves()) // Reset possible moves after a move
            }
        } else {
            // Case 2: Handle if the click is on a piece of the current player
            if (piece && piece.isWhite === isWhiteTurn) {
                dispatch(setSelectedSquare(clickedPosition))
                dispatch(setPossibleMoves(clickedPosition))
            } else {
                // Case 3: Handle if the click is on an empty square or an opponent's piece
                dispatch(setSelectedSquare())
                dispatch(setPossibleMoves())
            }
        }
        
      }

    const handleMove = (startPos: [number, number], targetPos: [number, number]) => {
    dispatch(movePiece({ startPos, targetPos }))
    }

    // Generate the board
    const chessBoard = Array.from({ length: rows }, (_, rowIndex) =>
        Array.from({ length: cols }, (_, colIndex) => {
        // Alternate colors based on position
        return <Square key={`${rowIndex}-${colIndex}`}
        position={[colIndex, rowIndex]}
        onClick={() => handleClick(rowIndex, colIndex)}
        selectedSquare={selectedSquare}
        isPossibleMove={isPossibleMove(rowIndex, colIndex)}
        isInCheck ={isInCheck(rowIndex, colIndex)} />;
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