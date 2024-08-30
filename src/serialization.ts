import Piece from "./models/piece"

export interface PieceData {
    isWhite: boolean
    position: [number, number]
}

export const pieceToData = (piece: Piece) : PieceData => {
    return {
        isWhite: piece.isWhite,
        position: piece.getPosition
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