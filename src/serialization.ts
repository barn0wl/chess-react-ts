import Piece from "./models/piece"

export interface PieceData {
    type: string,
    isWhite: boolean
    position: [number, number]
}

export const pieceToData = (piece: Piece) : PieceData => {
    return {
        type: piece.constructor.name,
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