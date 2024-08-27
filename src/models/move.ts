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
        targetPosition : [number, number],
        capturedPiece? : Piece
    ) {
        this.board = board,
        this.piece = piece,
        this.originalPosition = originalPosition
        this.targetPosition = targetPosition
        this.capturedPiece = capturedPiece
    }

    executeMove() {
        this.piece.setPosition = this.targetPosition
        if (this.capturedPiece) this.board.removePiece(this.capturedPiece)
    }

    undoMove() {
        this.piece.setPosition = this.originalPosition
        if (this.capturedPiece) this.board.addPiece(this.capturedPiece)
    }
}