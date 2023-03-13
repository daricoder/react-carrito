import { articulos as arts } from "../database_articulos.js"

export const initialState = [...arts];

export const reducer = (state, action) => {
  if (action.type == "add_articulo") {
    console.log('hola reducer articulo')
    return [...state, action.payload]
  }
  else if (action.type == "set_articulos") {

    console.log('hola reducer articulo set',action.payload)
    return [...action.payload]
  }
  console.log(state)

  return state
}

