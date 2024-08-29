import { FC } from "react";

interface PieceProps {
    type: string,
    isWhite: boolean
}

const Piece : FC<PieceProps> = ( {type, isWhite} ) => {
    const getImageSrc = (): string => {
        const color = isWhite ? 'white' : 'black';
        return `/src/assets/pieces/${color}_${type}.png`;
    }
    return (
        <div>{getImageSrc()}</div>
    )
}

export default Piece