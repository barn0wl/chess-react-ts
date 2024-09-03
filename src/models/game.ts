import Board from "./board"

export enum GameState {
    ONGOING,
    CHECK,
    CHECKMATE
}

export default class Game {

    private board : Board
    isWhiteTurn : boolean
    private gameState : GameState

    constructor() {
        this.board = new Board()
        this.isWhiteTurn = true
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

    onMoveCompleted () : void {
        this.nextTurn()
        this.updateGameState()
    }
}