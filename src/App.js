import { useContext, useState } from "react";
import { CarritoContext } from "./CarritoContext";
import { Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import CarritoItem from "./CarritoItem/CarritoItem";
import Table from "./TableComponent";
import Prueba from "./prueba";
function App() {
  let {
    articulo_headers,
    articulos,
    setArticulos,
    selectedItems,
    setSelectedItems,
  } = useContext(CarritoContext);

  let items = articulos.map((art, index) => {
    return <CarritoItem item={art} />;
  });

  return (
    <div className="App page-short-dark ">
      <div className="container-grid-app">
        <div className="child-grid-app-carrito">
          <Link className="link" to="/carritoDetails">
            <div className="button button-neumorphism">
              Carrito({selectedItems.length})
            </div>
          </Link>
        </div>
        {items}
      </div>
    </div>
  );
}

export default App;
