import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import Game, { GameState as EnumState } from "./models/game"
import { pieceArrayToData, PieceData, pieceDataArrayToPieceArray } from "./serialization"

interface GameState {
    pieces: PieceData[]
    isWhiteTurn : boolean
    selectedSquare?: [number, number]
    inCheckSquare?: [number, number]
    possibleMoves: [number, number][]
    isCheckMate: boolean
}

const initialState: GameState = {
    pieces: [],
    isWhiteTurn: true,
    possibleMoves: [],
    isCheckMate: false
}

const gameSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        initializeGameState(state) {
            const game = new Game([], true)
            const board = game.getBoard
            state.pieces = pieceArrayToData(board.getPieceArray())
            state.isWhiteTurn = game.isWhiteTurn
            state.isCheckMate = game.getGameState === EnumState.CHECKMATE? true : false
        },
        movePiece(state, action: PayloadAction<{startPos: [number, number], targetPos: [number, number]}>) {
            const initialBoard = pieceDataArrayToPieceArray(state.pieces)
            const {startPos, targetPos} = action.payload
            const game = new Game(initialBoard, state.isWhiteTurn)
            const board = game.getBoard
            const piece = board.getPiece(startPos)

            if (piece) {
                board.movePiece(piece, targetPos)
                console.log('state updated')
                state.pieces = pieceArrayToData(board.getPieceArray())
                state.isWhiteTurn = game.isWhiteTurn
                state.isCheckMate = game.getGameState === EnumState.CHECKMATE? true : false
                state.inCheckSquare = game.getGameState === EnumState.CHECK ? board.findKing(game.isWhiteTurn) : undefined
            }
        },
        setSelectedSquare(state, action: PayloadAction<[number, number] | undefined>) {
            console.log('selectedSquare has been set')
            state.selectedSquare = action.payload
        },
        setPossibleMoves(state, action: PayloadAction<[number, number] | undefined>) {
            const initialBoard = pieceDataArrayToPieceArray(state.pieces)
            if (action.payload) {
                const game = new Game(initialBoard, state.isWhiteTurn)
                const board = game.getBoard
                const piece = board.getPiece(action.payload)

                state.possibleMoves = piece ? piece.getLegalMoves(board) : []
            } else {
                state.possibleMoves = []
            }
        }
    }
})

export const {movePiece, setSelectedSquare, 
    setPossibleMoves, initializeGameState} = gameSlice.actions
export default gameSlice.reducer