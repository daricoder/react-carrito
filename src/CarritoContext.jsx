import { createContext, useEffect, useState, useReducer } from "react";
// import articulos from "./database_articulos.json"
// import articulos from "./database_articulos.json" assert {type: 'json'};
import { articulos as arts } from "./database_articulos.js";
import {
  initialState as articulos_initialState,
  reducer as articulos_reducer,
} from "./Reducers/articulos_reducer";
import ThemePicker from "./ThemePicker/ThemePicker";
import { themes, reducer as theme_reducer } from "./Reducers/theme_reducer";
import Accordion from "./Accordion/Accordion";
import { hex2rgb, hexToCssHsl } from "./utils/colors";
let CarritoContext = createContext();
export default function(props) {
  let articulo_headers = ["id", "name", "category", "price", "stock"];
  let [count, setCount] = useState(0);
  let [theme, setTheme] = useState(themes[0]);
  let [selectedItems, setSelectedItems] = useState([]);
  let [articulos, setArticulos] = useState([]);
  let [keyboard_keydown, setKeyboard_keydown] = useState({ keycode: null });

  const [articulos_state, articulos_dispatch] = useReducer(articulos_reducer, [
    ...articulos_initialState,
  ]);

  let value = {
    articulo_headers,
    articulos,
    setArticulos,
    count,
    setCount,
    selectedItems,
    setSelectedItems,
    theme,
    setTheme,
    articulos_state,
    articulos_dispatch,
    keyboard_keydown,
    setKeyboard_keydown,
  };
  const handler = (e) => {
    // console.log("handler", activeThemePicker);
    // e.preventDefault()
    if (e.keyCode == 27) {
      // setKeyboard_keydown({ keycode: e.keyCode })
      // window.removeEventListener('keydown', () => console.log('removelistener'))
      // console.log('setActiveThemePicker', activeThemePicker, !activeThemePicker, e.keyCode)
      setTimeout(() => { }, 500);
      // setActiveThemePicker(!activeThemePicker);
    }
    // e.preventDefault()
    return;
  };

  useEffect(() => {
    console.log("mount");
    afterChange(theme)
    // window.addEventListener("keydown", handler);
    const fetchUser = async () => {
      // this would usually be your own backend, or localStorage
      // for example
      try {
        const res = await fetch("http://localhost:4000/carrito/articulos");
        const data = await res.json();
        articulos_dispatch({ type: "set_articulos", payload: data });
      } catch (err) {
        console.log("A error occurred");
      }
      return () => {
        // window.removeEventListener("keydown", handleKeyDown);
      };
    };

    fetchUser();

    function createRipple(event) {
      console.log("ripple");
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

    const loadRipples = (bool) => {
      const buttons = document.querySelectorAll(".container-ripple");
      for (const button of buttons) {
        if (bool) {
          button.addEventListener("click", createRipple);
        } else {
          button.removeEventListener("click", createRipple);
        }
      }
      return;
    };
    loadRipples(true);

    // unmount effect
    return () => {
      console.log("unmount");
      loadRipples(false);
      // window.removeEventListener("keydown", handler);
    };
  }, []);


  const afterChange = (selected_item) => {
    let { colors } = selected_item;
    for (let property in colors) {
      let rgbObject = hex2rgb(colors[property]);
      let hslObject = hexToCssHsl(colors[property]);
      document.documentElement.style.setProperty(
        `--${property}`,
        colors[property]
      );
      document.documentElement.style.setProperty(
        `--${property}-rgb`,
        Object.values(rgbObject).join()
      );
      document.documentElement.style.setProperty(
        `--${property}-r`,
        rgbObject["r"]
      );
      document.documentElement.style.setProperty(
        `--${property}-g`,
        rgbObject["g"]
      );
      document.documentElement.style.setProperty(
        `--${property}-b`,
        rgbObject["b"]
      );
      document.documentElement.style.setProperty(
        `--${property}-hsl`,
        `${hslObject.h},${hslObject.s}%,${hslObject.l}%`
      );
      document.documentElement.style.setProperty(
        `--${property}-h`,
        hslObject["h"]
      );
      document.documentElement.style.setProperty(
        `--${property}-s`,
        `${hslObject.s}%`
      );
      document.documentElement.style.setProperty(
        `--${property}-l`,
        `${hslObject.l}%`
      );
    }
    setTheme(selected_item)
  };

  return (
    <>
      <CarritoContext.Provider value={value}>
        {props.children}
      </CarritoContext.Provider>
      <ThemePicker
        show={false}
        contentBlur={true}
        background={true}
        backgroundBlur={false}
        border={true}
        initialList={themes}
        selectedItem={theme}
        afterChange={afterChange}
      />
      <Accordion />
    </>
  );
}

export { CarritoContext };
