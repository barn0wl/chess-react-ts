import Board from "../board";
import Piece from "../piece";


export default class Queen extends Piece {

    getPossibleMoves(board: Board): [number, number][] {
        let validMoves : [number, number][] = []
        const directions : [number, number][] = [ [1, 1], [1, -1], [-1, 1], [-1, -1], [0, 1], [0, -1], [-1, 0], [1, 0]]
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
        return validMoves
    }
}