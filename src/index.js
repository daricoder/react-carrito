import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CarritoContext from "./CarritoContext";
import TestingPage from "./TestingPage/TestingPage";
import AdminPage from "./AdminPage/AdminPage";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import CarritoDetail from "./CarritoDetailComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));


// changes here
root.render(
  <React.StrictMode>
    <CarritoContext>
      <Router>
        <Routes>
          <Route exact path="/" element={<App />} />
          <Route exact path="/carritoDetail" element={<CarritoDetail />} />
          <Route exact path="/practica" element={<App />} />
          <Route exact path="/testingpage" element={<TestingPage />} />
          <Route exact path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </CarritoContext>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

reportWebVitals();
