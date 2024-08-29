import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Game from "./models/game"
import Board from "./models/board"
import Piece from "./models/piece"

interface gameState {
    game: Game
    selectedSquare?: [number, number],
    inCheckSquare?: [number, number]
}

const initialState: gameState = {
    game: new Game()
}

const gameSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        movePiece(state, action: PayloadAction<{piece: Piece, targetPos: [number, number]}>) {
            const board = state.game.getBoard
            const {piece, targetPos} = action.payload
            piece.movePiece(board as Board, targetPos)
        },
        setSelectedSquare(state, action: PayloadAction<[number, number] | undefined>) {
            state.selectedSquare = action.payload
        },
        setInCheckSquare(state, action: PayloadAction<[number, number] | undefined>) {
            state.selectedSquare = action.payload
        }
    }
})

export const {setSelectedSquare, setInCheckSquare} = gameSlice.actions
export default gameSlice.reducer