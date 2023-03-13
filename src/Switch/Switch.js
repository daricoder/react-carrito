import { useState, useContext } from "react";
import { CarritoContext } from "../CarritoContext";
import "./Switch.css";
const Switch = () => {
  let {
    articulo_headers,
    articulos,
    setArticulos,
    selectedItems,
    setSelectedItems,
    theme,
    setTheme,
  } = useContext(CarritoContext);
  return (
    <div className="switch">
      <label >
        <input
          type="checkbox"
          defaultChecked={theme == "dark" ? true : false}
          onChange={() => {
            theme == "light" ? setTheme("dark") : setTheme("light");
            console.log("change theme");
          }}
        />
        <span class="slider round"></span>
      </label>
    </div>
  );
};

export default Switch;
