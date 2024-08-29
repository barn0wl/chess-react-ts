import Board from "./board"
import Move from "./move"

export default abstract class Piece {
    readonly isWhite : boolean
    private position : [number, number]

    constructor (
        isWhite : boolean,
        position : [number, number]
    ) {
        this.isWhite = isWhite
        this.position = position
    }

    get getPosition () {
        return this.position
    }

    set setPosition (newCoord : [number, number]) {
        this.position = newCoord
    }

    abstract getValidMoves (board: Board) : [number, number][]
    //this function defines what the possible moves for this piece are

    movePiece (board: Board, targetPos: [number, number]) {
        const move = new Move(board, this, this.getPosition, targetPos)
        move.executeMove()
    }
}