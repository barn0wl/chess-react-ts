import Board from "../board";
import Move from "../move";
import Piece from "../piece";

export default class Pawn extends Piece {
    hasMoved : boolean

    constructor(
        isWhite : boolean,
        position : [number, number],
        hasMoved : boolean = false
    ) {
        super(isWhite, position)
        this.hasMoved = hasMoved
    }

    getValidMoves(board: Board): [number, number][] {

        let validMoves : [number, number][] = []
        const [x, y] = this.getPosition

        const direction = this.isWhite? -1 : 1

        //Normal move
        const forwardMove : [number, number] = [x, y + direction]
        if (board.isEmpty(forwardMove) && board.inBounds(forwardMove)) {
            validMoves.push(forwardMove)
        }

        //First move
        if (!this.hasMoved) {
            const firstMove : [number, number] = [x, y + 2 * direction]
            if (board.isEmpty(firstMove)) {
                validMoves.push(firstMove)
            }
        }

        //Diagonal capture
        const diagonalLeft : [number, number] = [x - 1, y + direction]
        const diagonalRight : [number, number] = [x + 1, y + direction]
        if (board.isEnemy(diagonalLeft, this.isWhite)) {
            validMoves.push(diagonalLeft)
        }

        if (board.isEnemy(diagonalRight, this.isWhite)) {
            validMoves.push(diagonalRight)
        }

        validMoves = validMoves.filter(
            move => {
                const moveTest = new Move(board, this, this.getPosition, move)
                return board.isInCheckAfterMove(this.isWhite, moveTest) === false
            }
        )

        return validMoves
    }
}