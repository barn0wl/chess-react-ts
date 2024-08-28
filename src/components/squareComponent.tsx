import { FC } from "react";

interface SquareProps {
   isWhite: boolean,
   position : [number, number]
}

const SquareComponent : FC<SquareProps> = () => {
   return (
      <div className="chess-square"></div>
   ) 
}

export default SquareComponent