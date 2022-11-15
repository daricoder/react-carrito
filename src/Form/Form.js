
import { useRef, useState } from "react";
import "./Form.css";
import { showNotification } from "../Alert/Alert";

const Form = ({ className = '' }) => {
  let [dataForm, setDataForm] = useState({});
  const handleInputChange = (event) => {
    console.log(event.currentTarget.name);
    let el = event.currentTarget;
    let label = el.parentNode.querySelector(".input-icon");
    if (el.value != "") {
      label.style.display = "none";
    } else if (el.value == "") {
      label.style.display = "block";
    }

    setDataForm({ ...dataForm, [el.name]: el.value });
    return;
  };
  const handleClick = async (event) => {
    console.log(dataForm);
    console.log("wait....");
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataForm),
        // mode:'cors'
      };
      const response = await fetch(
        "http://localhost:4000/carrito/articulos",
        requestOptions
      );
      const data = await response.json();
      console.log(data);
      showNotification({ message: "Item Added!" });
    } catch (error) {
      showNotification({ message: "some error ocurred", color: "error", margin: 20 });
    }
  };

  return (
    <div className={`form-neumorphism ${className}`}>
      <div className="icon-container-circle">
        <i class="bi bi-bag-plus-fill"></i>
      </div>
      <div className="body">
        <div className="input-container">
          <span className="input-icon">Name</span>
          <input
            className="input-neumorphism"
            type="text"
            name="name"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-container">
          <span className="input-icon">Category</span>
          <input
            className="input-neumorphism"
            type="text"
            name="category"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-container">
          <span className="input-icon">Price</span>
          <input
            className="input-neumorphism"
            type="text"
            name="price"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-container">
          <span className="input-icon">Stock</span>
          <input
            className="input-neumorphism"
            type="text"
            name="stock"
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-container">
          <span className="input-icon">Description</span>
          <textarea className="input-neumorphism" rows="2" name="description" onChange={(e) => handleInputChange(e)}>
          </textarea>
        </div>
      </div>

      <div className="footer">
        <div
          className=" button-form-neumorphism"
          onClick={(e) => handleClick(e)}
        >
          Enviar
        </div>
      </div>
    </div >
  );
};

export default Form;
