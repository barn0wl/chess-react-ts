import Board from "../board";
import Piece from "../piece";


export default class King extends Piece {

    getPossibleMoves(board: Board): [number, number][] {
        let validMoves : [number, number][] = []
        const [x, y] = this.getPosition

        const directions : [number, number][] = [ [1, 1], [1, -1], [-1, 1], [-1, -1], [0, 1], [0, -1], [-1, 0], [1, 0] ]

        directions.forEach(
            (direction) => {
                const [targetX, targetY] = direction
                const newMove : [number, number] = [x + targetX, y + targetY]

                if (board.inBounds(newMove) && (board.isEmpty(newMove) || board.isEnemy(newMove, this.isWhite))) {
                    validMoves.push(newMove)
                }
            }
        )
        return validMoves
    }
}