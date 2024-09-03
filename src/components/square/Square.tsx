import { FC } from "react"
import "./Square.css"

interface SquareProps {
   position : [number, number],
   onClick: () => void,
   selectedSquare?: [number, number],
   isPossibleMove: boolean,
   isInCheck : boolean
}

const Square : FC<SquareProps> = ( {position, selectedSquare, isPossibleMove, onClick}) => {
   const [x, y] = position

   const getBackGroundColor = () => {
      if ((x + y) % 2 == 0) {
         if (selectedSquare && x === selectedSquare[0] && y === selectedSquare[1])
            return '#ffeb99'
         else if (isPossibleMove) return '#a0c4ff'
         else return 'white'
      } else {
         if (selectedSquare && x === selectedSquare[0] && y === selectedSquare[1])
            return '#ffc107'
         else if (isPossibleMove) return '#4682b4'
         else return '#363636'
      }
   }

   return (
      <button className="chess-square"
      style={ { backgroundColor: getBackGroundColor()}}
      onClick={onClick}/>
   )
}

export default Square