import Board from "../board";
import Move from "../move";
import Piece from "../piece";


export default class Rook extends Piece {

    getValidMoves(board: Board): [number, number][] {

        const validMoves : [number, number][] = []
        const directions : [number, number][] = [ [0, 1], [0, -1], [-1, 0], [1, 0]]
        const [x, y] = this.getPosition

        directions.forEach(
            (direction) => {
                const [dirX, dirY] = direction
                let iMove : [number, number] = [x + dirX, y + dirY]

                while (board.inBounds(iMove)) {
                    const [iMoveX, iMoveY] : [number, number] = iMove
                    if (board.isEmpty(iMove)) {
                        validMoves.push(iMove)
                        iMove = [iMoveX + dirX, iMoveY + dirY]
                    } else if (board.isEnemy(iMove, this.isWhite)) {
                        validMoves.push(iMove)
                        break
                    } else {
                        break
                    }
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