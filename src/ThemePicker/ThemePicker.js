import { useEffect, useRef, useState, useContext, useReducer } from "react";
import { initialState } from "../Reducers/articulos_reducer";
import "./ThemePicker.css";

let timeout = null;
const ThemePicker = ({
  show = true,
  initialList = [],
  selectedItem = null,
  afterChange = (dumy) => 0,
  classname = "",
  background = true,
  border = true,
  backgroundBlur = true,
  contentBlur = true,
}) => {
  const input_ref = useRef(null);
  const [activeThemePicker, setActiveThemePicker] = useState(show);
  const [search, setSearch] = useState('');
  const [selected_item, setSelected_item] = useState(selectedItem);
  const [temp_item, setTemp_item] = useState(selected_item);
  const [list, setList] = useState(initialList);
  const [tempList, setTempList] = useState(list);
  const [elegido, setElegido] = useState(null);
  // const [theme_state, theme_dispatch ] = useReducer(theme_reducer, themes)
  const activeThemePicker_ref = useRef(activeThemePicker);

  useEffect(() => {
    //IMPORTANTE ME TOMO 5 DIAS ENTEROS
    /*
     * el problema esta en que yo registraba el window listener solo en el mounting
     * y en ese momento javascript se lleva un estado para el handlekeydown registrado
     * entonces cuando daba a una tecla yo procedia a cambiar el estado del componente
     * entonces en la nueva renderizacion el estado ha cambiado pero el registro para el evento
     * keydown del window tiene aun el estado anterior.
     * Para solucionarlo debo remover ese registro de evento keydown que tiene el estado anterior y registrar uno nuevo
     * con el nuevo estado del componente. Entonces aplico rel removeEventListener y el addEventListener
     * pero que pasa , que para hacerlo en cada keydown debo poner en el  useffect que se ejecute en cada cambio
     * de ese estado porque de lo contrario solo se me ejecutaba solo en el mounting y no en las actualizaciiones de renderizacion
     * entonces otra forma de solucionarlo que se me ocurrio ahorita es en cada renderizacion remover el listener y addicionarlo
     * */

    /*
     * useffect sirve para ejecutar un callback en cada effecto
     * un effecto es lo que necesita hacer react para mantener actualizado el componente
     * un effecto se refleja en el ciclo de vida del componente como monte desmonte actualizacion etc
     * useeffect tiene 2 argumentos el primero es el callback que se ejecutara cada vez que se realize un effecto
     * el segundo es un array opcional de variables que useffect estara escuchando a que cambien. Cuando una de estas
     * variables cambia su valor se ejecuta el callback del primer argumento
     * useffect sin el segundo argumento significa que se ejecutara el callback en el monte y en cada actualizacion del componente
     * useffect con array vacio significa que solo se ejecutara el callback en el monte. Esto porque se especifica que no ejecute nunca
     * mas ya que no escucha a ningun cambio de variable.
     * useffect con el segundo argumento con algun elemento variable ejecutrara el callback cada vez que la variable cambie de valor
     * Si se especifican mas de una variable, cualquiera que cambie se ejecutara el callback. Si cambian 2 se ejecutara 2 veces.
     * IMPORTANTE:
     * Con useeffect la unica forma de ejecutar una funcion despues del desmonte del componente es retornando un callback en el primer
     * argumento callback. Esta funcion retornada se ejecutara cada vez que el componente se desmonte.
     * Lamentablemente con useffect el desmonte se ejecuta siempre que haya un nuevo effecto a ejecutar.
     * ejemplos:
     * useffect(() => {
     *   console.log(props.a);
     *   return () => {
     *   console.log(props.a)
     * }
     * })
     * el callback del primer argumento se ejecutrara en el monte
     * (significa cuando se cargan todas las variables y pueda renderizar es decir despues del renderizado) y en cada actualizacion
     * como se va a ejecutar cada vez que el componente cambie de estado entonces el retorno se ejecutara antes de pasar al siguiente estado
     *
     * si por ejemplo props.a es 5 y cambia de valor a 8,
     * entonces primero se ejecuta el callback de retorno (react lo llama callback de limpieza)
     * y aqui lo importante este retorno tiene los antiguos valores de props.a es decir 5.
     * Y al actualizar el nuevo effecto con props.a a 8
     * se ejecutara el callback principal registrando el callback de retorno con ese
     * clousure (capturando el estado de las variables para una funcion)
     * Como ves siempre se ejecuta el retorno cada vez que se quiera ir a ejecutrar un nuevo effecto para registrar los nuevos cambios.
     * es decir que si no se especifica el retorno jamas se ejecutara nada al ir hacia otro estado por eso toma este retorno como la funcion
     * de limpieza.
     * IMPORTANTE:
     * los effectos se utilizan para utilizar cosas nativas como fetch o cosas que no estan implementadas en react totalmente como addeventlistener
     *
     * */
    window.removeEventListener("keydown", handleKeyDown);
    window.addEventListener("keydown", handleKeyDown);
    if (activeThemePicker) {
      input_ref.current.focus();
    } else {
      input_ref.current.blur();
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  useEffect(() => {
    console.log("EFFECT LIST ++++++", list, tempList, selected_item, search)
    if (selected_item) {
      let items = document.querySelectorAll(".theme-item");
      let item = items[list.indexOf(selected_item)]
      if (item) {
        item.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
      }
    } else {
      setSelected_item(list[0])
    }
  }, [list, selected_item]);

  const handleKeyDown = (e) => {
    let index = list.indexOf(selected_item);
    // enter key
    if (e.keyCode == 13 && activeThemePicker) {
      if (selected_item.list) {
        let newList = selected_item.list;
        newList.prevList = tempList;
        setSearch('')
        setList(newList);
        setSelected_item(newList[0]);
        setTempList(newList);
      } else {
        setList(initialList);
        setTempList(initialList);
        setElegido(list[index]);
        setActiveThemePicker(!activeThemePicker);
      }
    }
    if (e.keyCode == 27) {
      if (list.prevList && activeThemePicker) {
        setSearch('')
        setList(list.prevList);
        setTempList(list.prevList)
        if (list.prevList[0]) {
          setSelected_item(list.prevList[0])
        }
      } else {
        setSelected_item(null)
        setActiveThemePicker(!activeThemePicker);
      }
    }
    // shift tab key
    if (e.shiftKey && e.keyCode == 9 && activeThemePicker) {
      index = index - 1 >= 0 ? index - 1 : list.length - 1;
      setSelected_item(list[index])
      e.preventDefault();
    }
    // tab key
    if (!e.shiftKey && e.keyCode == 9 && activeThemePicker) {
      index = index + 1 < list.length ? index + 1 : 0;
      setSelected_item(list[index])
      e.preventDefault();
    }
    return;
  };
  const handleMouseOver = (e, item) => {
    setSelected_item(item);
  };
  const handleChange = (e) => {
    // update list
    setSearch(e.target.value)
    let newList = tempList.filter((item) => item.title.includes(e.target.value))
    if (list.prevList) {
      newList.prevList = list.prevList;
    }
    setList(newList)
  };
  const handleClick = (e, item) => {
    // e.preventDefault();
    input_ref.current.focus();
    if (item.list) {
      setList(item.list);
      setSelected_item(item.list[0]);
    } else {
      setSelected_item(item);
      setActiveThemePicker(!activeThemePicker);
      setTemp_item(item);
    }
    return;
  };

  const getItemIndex = (title, list) => {
    return list.findIndex((item) => item.title == title);
  };

  const listJsx = list.map((item) => {
    let isSelected = false;
    if (selected_item === item) {
      isSelected = true;
      /*
         tuve que hacer esto como en monkeytype porque al actualizar las variables css y esperar a que cada
         una actualice el dom secuencialmente hace que demore cuando le doy a tab varias veces entonces la fluidez
         de seleccionar otro item rapidamente es demorada por lo que necesite hacer que esto sea en un settimeout
         para poder limpiarlo en caso que presione de nuevo rapido.
      */
      if (timeout) {
        clearTimeout(timeout);
      }
      timeout = setTimeout(() => {
        afterChange(selected_item);
        timeout = null;
      }, 50);
    }

    return (
      <div
        className={`theme-item  ${isSelected ? "selected" : ""}`}
        onMouseOver={(e) => handleMouseOver(e, item)}
        onClick={(e) => handleClick(e, item)}
      >
        {item.icon && <i className={`${item.icon} icon`}></i>}
        <span className={`title`}>{item.title}</span>
      </div>
    );
  });
  return (
    <>
      <div
        className={`ThemePickerBackground ${activeThemePicker ? "" : "hide"} ${background ? "activ" : ""
          } ${backgroundBlur ? "blur" : ""}`}
        onClick={(e) => { }}
      >
        <div
          className={`ThemePickerContent ${border ? "border" : ""}`}
          style={
            contentBlur && activeThemePicker
              ? {
                background:
                  document.documentElement.style.getPropertyValue(
                    "--background"
                  ) + "2A",
                backdropFilter: "blur(5px)",
              }
              : {}
          }
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div className={`search-container`}>
            <i class="bi bi-search"></i>
            <input
              ref={input_ref}
              className={`search`}
              type="text"
              placeholder="Type to search.."
              onChange={(e) => handleChange(e)}
              value={search}
            />
          </div>
          <div
            className={`theme-list `}
            style={{
              WebkitScrollbarThumb: {
                backgroundColor: "white",
              },
            }}
          >
            {listJsx}
          </div>
        </div>
      </div>
    </>
  );
};

export default ThemePicker;
