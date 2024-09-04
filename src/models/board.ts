import King from "./pieces/king"
import Piece from "./piece"
import Move from "./move"
import Rook from "./pieces/rook"
import Knight from "./pieces/knight"
import Bishop from "./pieces/bishop"
import Queen from "./pieces/queen"
import Pawn from "./pieces/pawn"

export default class Board {

    private pieces : Piece[]
    private onMoveCallback : ((move: Move) => void) | null = null

    constructor (
        pieces : Piece[]
    ) {
        this.pieces = pieces.length > 0 ? pieces : this.initializeBoard()
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
            pieces.push(new Pawn(false, [i, 1]))
        }

        //adding white pieces
        pieces.push(new Rook(true, [0,7]))
        pieces.push(new Rook(true, [7,7]))
        pieces.push(new Knight(true, [6,7]))
        pieces.push(new Knight(true, [1,7]))
        pieces.push(new Bishop(true, [2,7]))
        pieces.push(new Bishop(true, [5,7]))
        pieces.push(new Queen(true, [3,7]))
        pieces.push(new King(true, [4,7]))
        for (let i = 0; i < 8; i++) {
            pieces.push(new Pawn(true, [i, 6]))
        }

        return pieces
    }

    setOnMoveCallback (callback: (move: Move)=> void) {
        this.onMoveCallback = callback
    }

    getPieceArray () : Piece[] {
        return this.pieces
    }

    addPiece(piece: Piece) {
        this.pieces.push(piece)
    }

    getPiece(squarePosition: [number, number]) {
        const foundPiece = this.pieces.find(
            (piece) => {
                const [x, y] = piece.getPosition
                return x === squarePosition[0] && y === squarePosition[1]
            }
        );
        return foundPiece
    }

    removePiece(piece: Piece) {
        this.pieces = this.pieces.filter(iPiece => iPiece !== piece)
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
        if ( x >= 0 && x <= 7 && y >= 0 && y <= 7 ) {
            return true
        } else {
            return false
        }
    }

    inCheck( isWhite: boolean ) {
        const kingPosition = this.findKing(isWhite)
        return this.pieces.some(
            piece => piece.isWhite !== isWhite
            && piece.getPossibleMoves(this).some(
                move => move[0] === kingPosition[0] && move[1] === kingPosition[1]
            )
        ) 
    }

    isInCheckAfterMove (isWhite: boolean, move: Move) {
        move.executeMove()
        console.log(this.pieces)
        const isInCheck = this.inCheck(isWhite)
        move.undoMove()
        console.log(this.pieces)
        return isInCheck
    }

    isCheckMate(isWhite: boolean) {
        if (this.inCheck(isWhite) && !this.isKingDefendable(isWhite)) {
            return true
        } else return false
    }

    isKingDefendable (isWhite: boolean) {
        return this.pieces.some(
            //the king and the piece in question are allies and there
            //exists moves that get the king out of check
            piece => {
                const legalMoves = piece.getLegalMoves(this)
                return piece.isWhite === isWhite && legalMoves.length !== 0
            }
        )
    }

    findKing (isWhite: boolean) {
        const king = this.pieces.find(piece => piece instanceof King && piece.isWhite === isWhite) as King
        const kingPosition = king.getPosition
        return kingPosition
    }

    movePiece (pieceToMove: Piece, targetPos: [number, number]) {
        if (pieceToMove instanceof Pawn && !pieceToMove.hasMoved) pieceToMove.hasMoved = true
        const move = new Move(this, pieceToMove, pieceToMove.getPosition, targetPos)
        move.executeMove()
        if (this.onMoveCallback) {
            this.onMoveCallback(move)
        }
    }
}