import { useState } from "react";
import "./Select.css"
let options = ["option1", "option2", "option3"];

let options2 = [
  { option: "Selecciona", value: null },
  { option: "option1", value: "value1" },
  { option: "option2", value: "value2" },
  { option: "option3", value: "value3" },
];
let Select = () => {
  let [selectedItem, setSelectedItem] = useState(options2[0]);
  let [active, setActive] = useState(false);
  let [optionClicked, setOptionClicked] = useState(false);
  let [hoverOption, setHoverOption] = useState(false);


  let handleOption = (e, optionRef) => {
    setSelectedItem({ ...optionRef });
    setOptionClicked(true);
    setActive(false)
    let element = e.currentTarget;
    // let container = element.parentNode;
    // // let container = parent.querySelector(".container-select-options");
    //
    // container.style.display = "none";
  };
  let handleSelectedItem = (e) => {
    // setOptionClicked(false);
    let element = e.currentTarget;
    // element.focus();
    let container = element.nextSibling;

    if (active) {
      setActive(false)
    } else {
      setActive(true)
    }
    // console.log(container.style.display);
    // if ([null, "none", ""].includes(container.style.display)) {
    //   // container.style.display = "block";
    //   setActive(true)
    //   // container.style.opacity = "1";
    // } else {
    //   setActive(false)
    //   container.style.display = null;
    // }
  };

  let handleOptionMouseOver = (e) => {
    setHoverOption(true)
  }
  let handleOptionMouseOut = (e) => {
    setHoverOption(false)
  }

  let handleBlur = (e) => {

    console.log("blur", hoverOption)
    let element = e.currentTarget;
    let container = element.nextSibling;
    if (!hoverOption) {
      // setOptionClicked(false)
      setHoverOption(false);
      setActive(false);
    }
    // let container = element.nextSibling;
    // container.style.display = null;
    // container.style.opacity = "0";
  }

  let options2_jsx = options2.map((option2, index) => {
    return (
      <div
        className="select-option"
        key={index}
        onMouseOver={(e) => {
          handleOptionMouseOver(e);
        }}
        onMouseOut={(e) => {
          handleOptionMouseOut(e);
        }}
        onClick={(e) => {
          handleOption(e, option2);
        }}
      >
        {option2.option}
      </div>
    );
  });

  return (
    <>

      <div className="select">
        <div tabIndex={0} className="selected-item button-neumorphism" onClick={(e) => handleSelectedItem(e)} onBlur={(e) => handleBlur(e)}>
          <span>{selectedItem.option}</span>
        </div>
        <div className={`container-select-options ${active ? 'active' : ''}`} onBlur={(e) => handleBlur(e)}>{options2_jsx}</div>
      </div>
    </>
  );
};
export default Select;
