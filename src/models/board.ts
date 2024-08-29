import King from "./pieces/king";
import Piece from "./piece";
import Move from "./move";
import Rook from "./pieces/rook";
import Knight from "./pieces/knight";
import Bishop from "./pieces/bishop";
import Queen from "./pieces/queen";
import Pawn from "./pieces/pawn";

export default class Board {

    private pieces : Piece[]

    constructor (
        pieces : Piece[] = this.initializeBoard()
    ) {
        this.pieces = pieces
    }

    private initializeBoard () : Piece[] {
        const pieces : Piece[] = []

        //adding black pieces
        pieces.push(new Rook(false, [0,0]))
        pieces.push(new Rook(false, [7,0]))
        pieces.push(new Knight(false, [6,0]))
        pieces.push(new Knight(false, [1,0]))
        pieces.push(new Bishop(false, [2,0]))
        pieces.push(new Bishop(false, [5,0]))
        pieces.push(new Queen(false, [3,0]))
        pieces.push(new King(false, [4,0]))
        for (let i = 0; i < 8; i++) {
            pieces.push(new Pawn(true, [i, 1]))
        }

        //adding white pieces
        pieces.push(new Rook(false, [0,7]))
        pieces.push(new Rook(false, [7,7]))
        pieces.push(new Knight(false, [6,7]))
        pieces.push(new Knight(false, [1,7]))
        pieces.push(new Bishop(false, [2,7]))
        pieces.push(new Bishop(false, [5,7]))
        pieces.push(new Queen(false, [3,7]))
        pieces.push(new King(false, [4,7]))
        for (let i = 0; i < 8; i++) {
            pieces.push(new Pawn(true, [i, 6]))
        }

        return pieces
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

    isInCheckAfterMove (isWhite: boolean, move: Move) {
        move.executeMove()
        const isInCheck = this.inCheck(isWhite)
        move.undoMove()
        return isInCheck
    }

    isCheckMate(isWhite: boolean) {
        if (this.inCheck(isWhite) && !this.isKingDefendable(isWhite)) {
            return true
        } else return false
    }

    isKingDefendable (isWhite: boolean) {
        return this.pieces.some(
            //the king and the piece in question are allies
            piece => piece.isWhite === isWhite
            && piece.getValidMoves(this).some(
                move => {
                    //there exists a move for this piece after which the king isnt
                    //in check anymore
                    const moveObject = new Move(this, piece, piece.getPosition, move)
                    this.isInCheckAfterMove(isWhite, moveObject) === false
                }
            )
        )
    }

}