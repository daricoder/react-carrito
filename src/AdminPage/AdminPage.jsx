import { useRef, useState } from "react";
import "./AdminPage.css";
import { showNotification } from "../Alert/Alert";
import Form from "../Form/Form";

const AdminPage = () => {
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
    <div className="page-short">
      BIENVENIDO PUTO ADMIN
      <Form className="Form" />
    </div >
  );
};

export default AdminPage;
