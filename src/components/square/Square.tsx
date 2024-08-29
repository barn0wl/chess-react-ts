import { FC } from "react"
import "./Square.css"

interface SquareProps {
   position : [number, number],
   onClick: () => void
}

const Square : FC<SquareProps> = ( {position, onClick}) => {
   const [x, y] = position
   return (
      <button className="chess-square"
      style={ { backgroundColor: (x + y) % 2 == 0? "white" : "black"}}
      onClick={onClick}/>
   )
}

export default Square