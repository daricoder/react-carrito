import { useRef } from "react";
import "./Alert.css";

let alertRef;
let default_margin = 10;
let default_margin2 = 10;
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
    marginBottom: `${default_margin}px`,
    marginRight: `${default_margin}px`,
  },
  "corner-bottom-left": {
    marginBottom: `${default_margin}px`,
    marginLeft: `${default_margin}px`,
  },
  "corner-top-left": {
    marginTop: `${default_margin}px`,
    marginLeft: `${default_margin}px`,
  },
  "corner-top-right": {
    marginTop: `${default_margin}px`,
    marginRight: `${default_margin}px`,
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

const clearAll = () => {
  let alerts = document.body.querySelectorAll(`.Alert`);
  for (const item of alerts) {
    hideAlert(item);
  }
};

const hideAlert = (el) => {
  let sign_orientation = el.style.marginRight ? "" : "-";
  // el.style.transform = `translateX(${sign_orientation}100%) translateX(${sign_orientation}${default_margin})`;
  let position = "corner-";
  position = position + (el.style.marginTop ? "top-" : "bottom-");
  position = position + (el.style.marginLeft ? "left" : "right");
  el.style.transitionDuration = "0.1s";
  el.style.marginLeft = null;
  el.style.marginRight = null;
  el.style.transform = null;

  setTimeout(() => {
    el.remove();
    let alerts = document.body.querySelectorAll(`.Alert.${position}`);
    console.log(alerts);
    console.log(position);
    console.log(el.style.marginLeft);
    console.log(el);
    setPositons(alerts);
  }, 80);
};

const setPositons = (elements) => {
  // let alerts = document.body.querySelectorAll(".Alert");
  for (let [index, item] of elements.entries()) {
    // if (item != el) {
    let calc = `${
      (elements.length - 1 - index) * (default_margin + item.scrollHeight) +
      default_margin
    }px`;
    if (item.style.marginBottom) {
      item.style.marginBottom = calc;
    } else {
      item.style.marginTop = calc;
    }
    // }
  }
};

const showNotification = ({ message, color, position, type, margin }) => {
  if (!colors.includes(color)) {
    color = colors[0];
  }
  if (!types.includes(type)) {
    type = types[0];
  }
  if (!positions.includes(position)) {
    position = "corner-bottom-right";
  }

  if (margin) {
    default_margin = margin;
  } else {
    default_margin = default_margin2;
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
  // alerts.map((item,index,array) => {
  //   if(index!=(array.length-1)){
  //    item.style.marginTop= `${default_margin+item.scrollHeight}px`
  //   }
  // })
  if (type == "fixed") {
    el.querySelector("i").addEventListener("click", onClick);
  }
  el.style.marginBottom = position.includes("bottom")
    ? `${default_margin}px`
    : null;
  el.style.marginTop = position.includes("top") ? `${default_margin}px` : null;
  el.style.marginLeft = position.includes("left")
    ? `${default_margin}px`
    : null;
  el.style.marginRight = position.includes("right")
    ? `${default_margin}px`
    : null;
  // position = "corner-"
  // position = position + (el.style.marginTop ? "top-" : "bottom-")
  // position = position + (el.style.marginLeft ? "left" : "right")
  alerts = document.body.querySelectorAll(`.Alert.${position}`);
  setPositons(alerts);

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

export { showNotification, clearAll };
export default Alert;
