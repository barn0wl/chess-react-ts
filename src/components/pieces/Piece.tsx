import { FC } from "react";
import Rook from "../../models/pieces/rook";
import Bishop from "../../models/pieces/bishop";
import Knight from "../../models/pieces/knight";
import Queen from "../../models/pieces/queen";
import King from "../../models/pieces/king";
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
        if (piece instanceof Rook) {
            return `/src/assets/pieces/${color}_rook.png`
        } else if (piece instanceof Bishop) {
            return `/src/assets/pieces/${color}_bishop.png`
        } else if (piece instanceof Knight) {
            return `/src/assets/pieces/${color}_knight.png`
        } else if (piece instanceof Queen) {
            return `/src/assets/pieces/${color}_queen.png`
        } else if (piece instanceof King) {
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