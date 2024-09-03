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

    abstract getPossibleMoves (board: Board) : [number, number][]
    //this function defines what the possible moves for this piece are

    getLegalMoves (board : Board) : [number, number][] {
        const possibleMoves = this.getPossibleMoves(board)
        return possibleMoves.filter(
            move => {
                const moveTest = new Move(board, this, this.getPosition, move)
                return !board.isInCheckAfterMove(this.isWhite, moveTest)
            }
        )
    }
}