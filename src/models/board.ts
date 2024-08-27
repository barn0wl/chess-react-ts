import Piece from "./piece";

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
        const foundPiece = this.pieces.filter(
            (piece) => piece.getPosition === squarePosition
        )
        return foundPiece[0]
    }

    isEmpty(squarePosition: [number, number]) {

        const foundPiece = this.pieces.filter(
            (piece) => piece.getPosition == squarePosition
        )
        return foundPiece.length === 0 ? true : false
    }

    isEnemy (squarePosition: [number, number], isWhite: boolean ) {
        const piece = this.getPiece(squarePosition)
        return piece.isWhite === isWhite ? false : true
    }

    inBounds (squarePosition: [number, number]) {
        const [x, y] = squarePosition
        if ( x >= 0 && x <= 8 && y >= 0 && y <= 8 ) {
            return true
        } else {
            return false
        }
    }
}