
import { useContext } from "react"
import {CarritoContext} from "./CarritoContext"
let L = (props) => {
  // let objeto = useContext(CarritoContext)
  console.log('props', props)
  return (
    <div>
    {/*<p>este es el mensaje: {objeto.message}</p>
      <button type="button" onClick={(e) => { objeto = "que pasa" }}> cambiar objeto</button>
    */}
    </div>
  )
}


export default L
