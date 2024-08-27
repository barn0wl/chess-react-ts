import Board from "./board"

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
}