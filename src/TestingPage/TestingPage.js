import Alert from "../Alert/Alert";
import { useState } from "react";
import { showNotification } from "../Alert/Alert";

let alert = {
  message: "a a a a a  a a a a a a",
  // color: "warn",
  position: "corner-bottom-right",
  // type: "fixed"
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
    </div>
  );
};

export default TestingPage;
