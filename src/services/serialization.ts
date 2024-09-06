import Piece from "../models/piece"
import Bishop from "../models/pieces/bishop"
import King from "../models/pieces/king"
import Knight from "../models/pieces/knight"
import Pawn from "../models/pieces/pawn"
import Queen from "../models/pieces/queen"
import Rook from "../models/pieces/rook"

export interface PieceData {
    type: string,
    isWhite: boolean
    position: [number, number]
    hasMoved?: boolean
}

export const pieceToData = (piece: Piece) : PieceData => {
    let hasMoved: boolean | undefined
    if (piece instanceof Pawn) hasMoved = piece.hasMoved
    return {
        type: piece.constructor.name,
        isWhite: piece.isWhite,
        position: piece.getPosition,
        hasMoved: hasMoved
    }
}

export const pieceArrayToData = (array: Piece[]) : PieceData[] => {
    const result : PieceData[] = []
    array.forEach(
        piece => {
            const pieceData = pieceToData(piece)
            result.push(pieceData)
        }
    )
    return result
}

export const pieceDataToPiece = (data: PieceData) : Piece => {
    switch (data.type) {
        case 'Rook':
            return new Rook(data.isWhite, data.position)
        case 'Bishop':
            return new Bishop(data.isWhite, data.position)
        case 'Queen':
            return new Queen(data.isWhite, data.position)
        case 'Knight':
            return new Knight(data.isWhite, data.position)
        case 'King':
            return new King(data.isWhite, data.position)
        default:
            return new Pawn(data.isWhite, data.position, data.hasMoved)
    }
}

export const pieceDataArrayToPieceArray = (array: PieceData[]) : Piece[] => {
    const result: Piece [] = []
    array.forEach(
        piece => result.push(pieceDataToPiece(piece))
    )
    return result
}