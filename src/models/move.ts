import Board from "./board";
import Piece from "./piece";

export default class Move {
    board: Board
    piece: Piece
    originalPosition : [number, number]
    targetPosition : [number, number]
    capturedPiece? : Piece

    constructor(
        board: Board,
        piece: Piece,
        originalPosition : [number, number],
        targetPosition : [number, number]
    ) {
        this.board = board,
        this.piece = piece,
        this.originalPosition = originalPosition
        this.targetPosition = targetPosition
    }

    executeMove() {
        this.capturedPiece = this.board.getPiece(this.targetPosition)
        if (this.capturedPiece) this.board.removePiece(this.capturedPiece)
        this.piece.setPosition = this.targetPosition   
    }

    undoMove() {
        this.piece.setPosition = this.originalPosition
        if (this.capturedPiece) {
            this.board.addPiece(this.capturedPiece)
            this.capturedPiece.setPosition = this.targetPosition
        }
    }  
}