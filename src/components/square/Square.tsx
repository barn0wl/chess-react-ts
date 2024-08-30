import { FC } from "react"
import "./Square.css"

interface SquareProps {
   position : [number, number],
   onClick: () => void,
   selectedSquare?: [number, number]
}

const Square : FC<SquareProps> = ( {position, selectedSquare, onClick}) => {
   const [x, y] = position

   const getBackGroundColor = () => {
      if ((x + y) % 2 == 0) {
         if (selectedSquare && x === selectedSquare[0] && y === selectedSquare[1])
            return '#ffeb99'
         else return 'white'
      } else {
         if (selectedSquare && x === selectedSquare[0] && y === selectedSquare[1])
            return '#ffc107'
         else return 'black'
      }
   }

   return (
      <button className="chess-square"
      style={ { backgroundColor: getBackGroundColor()}}
      onClick={onClick}/>
   )
}

export default Square