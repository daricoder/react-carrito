import { useRef } from "react";
import "./Alert.css";

let alertRef;
let default_margin = "10px";
let colors = ["success", "warn", "error"];
let types = ["autohide", "fixed"];
let positions = [
  "corner-bottom-right",
  "corner-bottom-left",
  "corner-top-left",
  "corner-top-right",
];
let positions_info = {
  "corner-bottom-right": {
    marginBottom: `${default_margin}`,
    marginRight: `${default_margin}`,
  },
  "corner-bottom-left": {
    marginBottom: `${default_margin}`,
    marginLeft: `${default_margin}`,
  },
  "corner-top-left": {
    marginTop: `${default_margin}`,
    marginLeft: `${default_margin}`,
  },
  "corner-top-right": {
    marginTop: `${default_margin}`,
    marginRight: `${default_margin}`,
  },
};

const Alert = ({ show }) => {
  alertRef = useRef(null);
  const alert_jsx = (
    <div ref={alertRef} className="Alert">
      <div className="Message">Este es el mensaje</div>
      <div className="Alert-button">
        <i class="bi bi-x-lg"></i>
      </div>
    </div>
  );
  if (show) {
    alert_jsx.style.transform = "translate(-10%,0)";
  } else if (show == false && alertRef.current != null) {
    alert_jsx.style.transform = "translate(100%,0)";
  }

  return alert_jsx;
};

const onClick = (e) => {
  console.log(e.currentTarget);
  console.log(e.currentTarget.parentNode);
  hideAlert(e.currentTarget.parentNode);
};

const hideAlert = (el) => {
  let sign_orientation = el.style.marginRight ? "" : "-";
  el.style.transform = `translateX(${sign_orientation}100%) translateX(${sign_orientation}${default_margin})`;

  setTimeout(() => {
    el.remove();
  }, 500);
};

const showNotification = ({ message, color, position, type }) => {

  if (!colors.includes(color)) {
    color = colors[0];
  }
  if (!types.includes(type)) {
    type = types[0];
  }
  if (!positions.includes(position)) {
    position = "corner-bottom-right";
  }




  let text_el_childs = "";
  if (type == "fixed") {
    text_el_childs = `
    <span class="piedra">x</span>
    <i class="bi bi-x"></i>
    `;
  }
  let text_elem = `
    <div class="Alert ${position} ${color} hidden">
      ${text_el_childs}
      ${message}
    </div>
`;

  document.body.insertAdjacentHTML("beforeend", text_elem);
  let alerts = document.body.querySelectorAll(".Alert");
  let el = alerts[alerts.length - 1];
  if (type == "fixed") {
    el.querySelector("i").addEventListener("click", onClick);
  }
  el.style.marginBottom = position.includes("bottom") ? default_margin : null;
  el.style.marginTop = position.includes("top") ? default_margin : null;
  el.style.marginLeft = position.includes("left") ? default_margin : null;
  el.style.marginRight = position.includes("right") ? default_margin : null;

  console.log(
    el.style.marginBottom,
    el.style.marginTop,
    el.style.marginLeft,
    el.style.marginRight
  );
  setTimeout(() => {
    let sign_orientation = position.includes("right") ? "-" : "";
    el.style.transform = `translate(0)`;
  }, 1);

  if (type != "fixed") {
    setTimeout(() => {
      hideAlert(el);
    }, 2000);
  }
  return;
};

export { showNotification };
export default Alert;
