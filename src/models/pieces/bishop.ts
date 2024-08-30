import Board from "../board";
import Move from "../move";
import Piece from "../piece";


export default class Bishop extends Piece {

    getValidMoves(board: Board): [number, number][] {
        let validMoves : [number, number][] = []
        const directions : [number, number][] = [ [1, 1], [1, -1], [-1, 1], [-1, -1]]
        const [x, y] = this.getPosition

        directions.forEach(
            ([dirX, dirY]) => {
                let [iMoveX, iMoveY] = [x + dirX, y + dirY]

                while (board.inBounds([iMoveX, iMoveY])) {
                    const iMove : [number, number] = [iMoveX, iMoveY]
                    if (board.isEmpty(iMove)) {
                        validMoves.push(iMove)
                    } else if (board.isEnemy(iMove, this.isWhite)) {
                        validMoves.push(iMove)
                        break
                    } else {
                        break
                    }
                    iMoveX += dirX
                    iMoveY += dirY
                }
            }
        )

        validMoves = validMoves.filter(
            move => {
                const moveTest = new Move(board, this, this.getPosition, move)
                return board.isInCheckAfterMove(this.isWhite, moveTest) === false
            }
        )

        return validMoves
    }
}