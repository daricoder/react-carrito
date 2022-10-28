import { useContext, useState } from "react";
import { CarritoContext } from "./CarritoContext";
import { Link } from "react-router-dom";


let T = (props) => {
  let [hoverState, setHoverState] = useState(false)
  let {
    articulo_headers,
    articulos,
    setArticulos,
    selectedItems,
    setSelectedItems,
  } = useContext(CarritoContext);
  let generate_headers = (array_headers, array_headers_exceptions) => {
    return array_headers.map((key, index, arr) => {
      if (!array_headers_exceptions.includes(key)) {
        return <th key={index}>{key}</th>;
      }
      return null;
    });
  };

  let handleOver = (e) => {
    let td = e.currentTarget.querySelector(".container-justify-center")
    let div = td.querySelector(".button")
    div.classList.remove('button-neumorphism')
    div.classList.add('button-neumorphism-green')
    // setHoverState(true)
  }
  let handleOut = (e) => {
    let td = e.currentTarget.querySelector(".container-justify-center")
    let div = td.querySelector(".button")
    div.classList.remove('button-neumorphism-green')
    div.classList.add('button-neumorphism')
    // setHoverState(false)
  }

  let articulos_header_JSX = generate_headers(articulo_headers, ["id"]);
  articulos_header_JSX = [...articulos_header_JSX, <th>select</th>];

  let articulos_JSX = articulos.map((art, index, arr) => (
    <tr key={index} className={art.stock == 0 ? "row-disabled" : ""} onMouseOver={(e) => handleOver(e)} onMouseOut={(e) => handleOut(e)}>
      {
        articulo_headers.map((header_key) => {
          if (header_key != "id") {
            return (
              <td
                className=""
                id={header_key}
              >
                <div>{art[header_key]}</div>
              </td>
            );
          }
          return null;
        })
      }
      < td className="container-flex container-justify-center" >
        {
          art.stock != 0 ? (
            <div
              className={hoverState ? "button button-neumorphism-green p-10 b-radious-25 margin-top margin-bottom" : "button button-neumorphism p-10 b-radious-25 margin-top margin-bottom"}
              onClick={(e) => handleAdd(e, art)}
            >
              <i class="bi bi-plus-lg"></i>
            </div>
          ) : (
            <span className="error">
              {" "}
              <stong>OUTED! </stong>
            </span>
          )
        }
      </td >
    </tr >
  ));

  let handleAdd = (event, art) => {
    // console.log("handleAdd", event);
    // console.log(articulos);
    art.stock = art.stock - 1;
    // un solo actualizado hace que todo el arbol del contexto sea actualizado asi que art.stock -1 no necesita setArticulos([...articulos])
    setSelectedItems([...selectedItems, art.id]);
    // setArticulos([...articulos]);
    // setCount(count + 1);
  };

  return (
    <>
      <table>
        <thead>
          <tr>{articulos_header_JSX}</tr>
        </thead>
        <tbody>{articulos_JSX}</tbody>
      </table>
    </>
  );
};

export default T;
