import Alert from "../Alert/Alert";
import { useState } from "react";
import { showNotification, clearAll} from "../Alert/Alert";

let alert = {
  message: "a a a a a  a a a a a a",
  color: "error",
  position: "corner-bottom-left",
  type: "fixed",
  margin:15
};

const TestingPage = () => {
  return (
    <div className="page-short-dark">
      {/*
    <Alert show={clicked} />
      */}
      <div
        className="button button-neumorphism"
        onClick={() => showNotification(alert)}
      >
        show alert
      </div>
      <div
        className="button button-neumorphism"
        onClick={() => clearAll()}
      >
        clear all
      </div>
    </div>
  );
};

export default TestingPage;
