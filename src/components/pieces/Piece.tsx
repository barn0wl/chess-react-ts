import { FC } from "react";
import "./Piece.css"
import { PieceData } from "../../serialization";

interface PieceProps {
    piece: PieceData
}

const Piece : FC<PieceProps> = ( {piece} ) => {

    const tileSize = 50
    const [x, y] = piece.position

    const style = {
        position: 'absolute' as 'absolute',
        left: `${x * tileSize}px`,
        top: `${y * tileSize}px`,
        width: `${tileSize}px`,
        height: `${tileSize}px`,
        zIndex: 2,
    }

    const getImageSrc = (): string => {
        const color = piece.isWhite ? 'white' : 'black'
        if (piece.type === 'Rook') {
            return `/src/assets/pieces/${color}_rook.png`
        } else if (piece.type === 'Bishop') {
            return `/src/assets/pieces/${color}_bishop.png`
        } else if (piece.type === 'Knight') {
            return `/src/assets/pieces/${color}_knight.png`
        } else if (piece.type === 'Queen') {
            return `/src/assets/pieces/${color}_queen.png`
        } else if (piece.type === 'King') {
            return `/src/assets/pieces/${color}_king.png`
        } else {
            return `/src/assets/pieces/${color}_pawn.png`
        }
    }
    return (
        <img className="chess-piece"
        src={getImageSrc()}
        style={style} />
    )
}

export default Piece