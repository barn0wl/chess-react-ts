import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Game from "./models/game"
import Piece from "./models/piece"
import { pieceArrayToData, PieceData } from "./serialization"

interface gameState {
    pieces: PieceData[]
    isWhiteTurn : boolean
    selectedSquare?: [number, number],
    inCheckSquare?: [number, number],
    possibleMoves?: [number, number][]
}

const initialGame = new Game()
const initialBoard = initialGame.getBoard

const initialState: gameState = {
    pieces: pieceArrayToData(initialBoard.getPieceArray()),
    isWhiteTurn: true 
}

const gameSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        movePiece(state, action: PayloadAction<{piece: Piece, targetPos: [number, number]}>) {
            const {piece, targetPos} = action.payload
            piece.movePiece(initialBoard, targetPos)
            state.pieces = pieceArrayToData(initialBoard.getPieceArray())
        },
        setSelectedSquare(state, action: PayloadAction<[number, number] | undefined>) {
            console.log('selectedSquare has been set')
            state.selectedSquare = action.payload
        },
        setInCheckSquare(state, action: PayloadAction<[number, number] | undefined>) {
            state.selectedSquare = action.payload
        }
    }
})

export const {movePiece, setSelectedSquare, setInCheckSquare} = gameSlice.actions
export default gameSlice.reducer