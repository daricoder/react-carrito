import { useContext, useState } from "react";
import { CarritoContext } from "./CarritoContext";
import CarritoItem from "./CarritoItem/CarritoItem";
let T = (props) => {
  let {
    articulo_headers,
    articulos,
    setArticulos,
    selectedItems,
    setSelectedItems,
  } = useContext(CarritoContext);
  let articulos_header_JSX = articulo_headers.map((key, index, arr) => {
    if (key != "id") {
      return <th key={index}>{key}</th>;
    }
  });
  let articulos_JSX = selectedItems.map((art, index, arr) => (
    <tr key={index} className={art.stock == 0 ? "row-disabled" : ""}>
      {articulo_headers.map((header_key) => {
        let jsx = null;
        if (header_key != "id") {
          jsx = <td id={header_key}>{art[header_key]}</td>;
        }
        return jsx;
      })}
    </tr>
  ));
  return (
    <>
      {/* 

<div className="CarritoDetail">
  <table>
    <thead>
      <tr>{articulos_header_JSX}</tr>
    </thead>
    <tbody>{articulos_JSX}</tbody>
  </table>
  <div className="container-flex container-justify-end">
    <div className="button-neumorphism">Comprar</div>
  </div>
</div>

      */}
      <div className="page-short-dark ">
        <div className="grid-CarritoDetail">
          <div>
            <div>
              Carrito Detail
            </div>
          </div>
          <div>
            <table>
              <thead>
                <tr>{articulos_header_JSX}</tr>
              </thead>
              <tbody>{articulos_JSX}</tbody>
            </table>
          </div>
          <div>
            <div className="button button-neumorphism">
              Proceder al Pago
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default T;
