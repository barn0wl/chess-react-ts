import King from "./pieces/king";
import Piece from "./piece";
import Move from "./move";

export default class Board {

    private pieces : Piece[]

    constructor (
        pieces : Piece[] = []
    ) {
        this.pieces = pieces
    }

    addPiece(piece: Piece) {
        this.pieces.push(piece)
    }

    getPiece(squarePosition: [number, number]) {
        const foundPiece = this.pieces.find(
            (piece) => piece.getPosition === squarePosition
        )
        return foundPiece
    }

    removePiece(piece: Piece) {
        this.pieces.filter(iPiece => iPiece !== piece)
    }

    isEmpty(squarePosition: [number, number]) {
        return this.getPiece(squarePosition) === undefined
    }

    isEnemy (squarePosition: [number, number], isWhite: boolean ) {
        const piece = this.getPiece(squarePosition)
        return piece !== undefined && piece.isWhite !== isWhite
    }

    inBounds (squarePosition: [number, number]) {
        const [x, y] = squarePosition
        if ( x >= 0 && x <= 8 && y >= 0 && y <= 8 ) {
            return true
        } else {
            return false
        }
    }

    inCheck( isWhite: boolean ) {
        const king = this.pieces.find(piece => piece instanceof King && piece.isWhite === isWhite) as King
        const kingPosition = king.getPosition
        return this.pieces.some(
            piece => piece.isWhite !== isWhite
            && piece.getValidMoves(this).some(
                move => move[0] === kingPosition[0] && move[1] === kingPosition[1]
            )
        )
    }

    isInCheckAfterMove (piece: Piece, move: Move) {
        move.executeMove()
        const isInCheck = this.inCheck(piece.isWhite)
        move.undoMove()
        return isInCheck
    }
}