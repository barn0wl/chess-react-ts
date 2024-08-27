import Board from "../board";
import Move from "../move";
import Piece from "../piece";


export default class Knight extends Piece {

    getValidMoves(board: Board): [number, number][] {
        const validMoves : [number, number][] = []
        const [x, y] = this.getPosition

        const directions : [number, number][] = [ [1, 2], [-1, 2], [-1, -2], [2, 1], [-2, 1], [-2, -1], [2, -1], [1, -2]]

        directions.forEach(
            (direction) => {
                const [targetX, targetY] = direction
                const newMove : [number, number] = [x + targetX, y + targetY]

                if (board.inBounds(newMove) && (board.isEmpty(newMove) || board.isEnemy(newMove, this.isWhite))) {
                    validMoves.push(newMove)
                }
            }
        )

        validMoves.filter(
            move => {
                const moveTest = new Move(board, this, this.getPosition, move, board.getPiece(move))
                return board.isInCheckAfterMove(this, moveTest) === false
            }
        )

        return validMoves
    }
}