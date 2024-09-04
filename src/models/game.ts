import Board from "./board"
import Move from "./move"
import Piece from "./piece"

export enum GameState {
    ONGOING,
    CHECK,
    CHECKMATE
}

export default class Game {

    private board : Board
    isWhiteTurn : boolean
    private gameState : GameState

    constructor(
        initialBoard: Piece[],
        isWhiteTurn: boolean,
    ) {
        this.board = new Board(initialBoard)
        this.isWhiteTurn = isWhiteTurn
        this.gameState = GameState.ONGOING
        this.board.setOnMoveCallback(this.onMoveCompleted.bind(this))
    }

    nextTurn () {
        this.isWhiteTurn = !this.isWhiteTurn
    }

    get getBoard () {
        return this.board
    }

    get getGameState () {
        return this.gameState
    }

    updateGameState () {
        if (this.board.isCheckMate(this.isWhiteTurn)) {
            this.gameState = GameState.CHECKMATE
        } else if (this.board.inCheck(this.isWhiteTurn)) {
            this.gameState = GameState.CHECK
        } else {
            this.gameState = GameState.ONGOING
        }
    }

    isGameOver () : boolean {
        return this.gameState === GameState.CHECKMATE
    }

    onMoveCompleted (move: Move) : void {
        const piece = move.piece.constructor.name
        const color = move.piece.isWhite? 'white' : 'black'
        const [startX, startY] = move.originalPosition
        const [targetX, targetY] = move.targetPosition
        console.log(`Moved ${color} ${piece} from (${startX},${startY}) to (${targetX},${targetY})`)
        this.nextTurn()
        this.updateGameState()
        console.log('Gamestate updated')
    }
}