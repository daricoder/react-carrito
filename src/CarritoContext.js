import { createContext, useEffect, useState } from "react";
// import articulos from "./database_articulos.json"
// import articulos from "./database_articulos.json" assert {type: 'json'};
import { articulos as arts } from "./database_articulos.js"
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


  useEffect(() => {
    const fetchUser = () => {
      // this would usually be your own backend, or localStorage
      // for example
      fetch("http://localhost:4000/carrito/articulos").then((res) => {
        return res.json()
      }).then((data) => {
        setArticulos(data)
      }).catch((error) => console.log('An error occurred'));
    };

    fetchUser();

    function createRipple(event) {
      const button = event.currentTarget;

      const circle = document.createElement("span");
      const diameter = Math.max(button.clientWidth, button.clientHeight);
      const radius = diameter / 2;
      console.log(diameter);
      const rect = button.getBoundingClientRect();
      // circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.width = circle.style.height = `${rect.width}px`;
      // circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
      circle.style.left = `${event.clientX - rect.x}px`;
      // circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
      circle.style.top = `${event.clientY - rect.y}px`;
      //  circle.style.transition = `transform 0.5s ease,opacity 0.5s ease`;
      // circle.style.transform = "translate(-50%,-50%) scale(0)"
      // circle.style.opacity = "1"

      circle.classList.add("ripple");

      // button.appendChild(circle);
      button.prepend(circle);
      // setTimeout(() => {
      //
      //   circle.style.transform = "translate(-50%,-50%) scale(1)"
      //   circle.style.opacity = "0"
      // }, 1);
      setTimeout(() => {
        circle.remove();
      }, 500);
    }

    const loadRipples = () => {
      const buttons = document.querySelectorAll(".container-ripple");
      for (const button of buttons) {
        button.addEventListener("click", createRipple);
      }
      return
    }
    loadRipples()

  }, [])

  return (
    <CarritoContext.Provider value={value}>
      {props.children}
    </CarritoContext.Provider>
  );
}

export { CarritoContext };
