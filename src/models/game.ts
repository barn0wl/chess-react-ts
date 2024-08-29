import Board from "./board"

export default class Game {

    private board : Board
    isWhiteTurn : boolean

    constructor() {
        this.board = new Board()
        this.isWhiteTurn = true
    }

    nextTurn () {
        this.isWhiteTurn = !this.isWhiteTurn
    }

    get getBoard () {
        return this.board
    }
}