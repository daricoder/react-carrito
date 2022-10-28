import { createContext, useEffect, useState } from "react";
// import articulos from "./database_articulos.json"
// import articulos from "./database_articulos.json" assert {type: 'json'};
import {articulos as arts} from "./database_articulos.js"
let CarritoContext = createContext();

export default function(props) {
  let articulo_headers = ["id", "name", "category", "price", "stock"];
  let [count, setCount] = useState(0);
  let [selectedItems, setSelectedItems] = useState([]);
  let [articulos, setArticulos] = useState(arts);

  let value = {
    articulo_headers,
    articulos,
    setArticulos,
    count,
    setCount,
    selectedItems,
    setSelectedItems,
  };

  return (
    <CarritoContext.Provider value={value}>
      {props.children}
    </CarritoContext.Provider>
  );
}

export { CarritoContext };
