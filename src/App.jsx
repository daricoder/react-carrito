import { useContext, useState } from "react";
import { CarritoContext } from "./CarritoContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import CarritoItem from "./CarritoItem/CarritoItem";
import Sidebar from "./Sidebar/Sidebar";
import { openSidebar } from "./Sidebar/Sidebar";
import { handleCollapsible } from "./Collapsible/Collapsible";
import Table from "./TableComponent";
import Prueba from "./prueba";
import { clearAll } from "./Alert/Alert";
import Switch from './Switch/Switch'
// import ThemePicker from './ThemePicker/ThemePicker'

function App() {
  // clearAll();
  const navigate = useNavigate();
  let {
    articulo_headers,
    articulos,
    setArticulos,
    selectedItems,
    setSelectedItems,
    theme,
    articulos_state,
    articulos_dispatch
  } = useContext(CarritoContext);

  let items = articulos_state.map((art, index) => {
    return <CarritoItem item={art} />;
  });

  return (
    <>
      <div className={`App page-short }`}>
        <span >tema:{theme.title ?? ''}</span> <Switch />
        <div className={`container-grid-app`}>
          <div className={`header `}>
            <div
              className={`button glow`}
              onClick={() => openSidebar()}
            >
              <i className={`bi bi-list`}></i>
            </div>
            <div
              className={`button glow`}
              onClick={() => {
                clearAll();
                navigate("/carritoDetail");
              }}
            >
              Carrito({selectedItems.length})
            </div>
          </div>
          <div className={`body `}>
            <div className={`container-grid-app-level2`}>{items}</div>
          </div>
        </div>
        <div className={`container-ripple `}>
          <div className={`content-ripple`}>hola ripple</div>
        </div>
      </div>
      <Sidebar>
        <div
          className={`collapsible sidebar-menu-item container-ripple`}
          onClick={(e) => handleCollapsible(e)}
        > <div className={`content-ripple`} style={{ display: "flex" }}>
            <div>
              <i className={`bi bi-person-fill`}></i>
            </div>
            <div style={{ marginLeft: "10px" }}>Admin</div>
            <div className={`icon-container`} style={{ marginLeft: "auto" }}>
              <i className={`bi bi-caret-down-fill`}></i>
            </div>
          </div>
        </div>
        <div
          className={`collapsible-content`}
          onClick={() => {
            clearAll();
          }}
        >
          <div
            className={`collapsible sidebar-menu-item container-ripple`}
            onClick={(e) => handleCollapsible(e)}
          >
            <div className={`content-ripple`} style={{ display: "flex" }}>
              <div>
                <i className={`bi bi-instagram`}></i>
              </div>
              <div style={{ marginLeft: "10px" }}>Admin</div>
              <div className={`icon-container`} style={{ marginLeft: "auto" }}>
                <i className={`bi bi-caret-down-fill`}></i>
              </div>
            </div>
          </div>
          <div className={`collapsible-content`}>
            <div
              className={`sidebar-menu-item container-ripple`}
              onClick={() => {
                navigate("/admin");
              }}
            >
              <div className={`content-ripple`} style={{ display: "flex" }}>
                <div>
                  <i className={`bi bi-bell-fill`}></i>
                </div>
                <div style={{ marginLeft: "10px" }}>Add Articulos</div>
              </div>
            </div>
            <div className={`sidebar-menu-item container-ripple`}>
              <div className={`content-ripple`} style={{ display: "flex" }}>
                <div>
                  <i className={`bi bi-bell-fill`}></i>
                </div>
                <div style={{ marginLeft: "10px" }}>Notifications</div>
              </div>
            </div>
          </div>
          <div
            className={`collapsible sidebar-menu-item container-ripple`}
            onClick={(e) => handleCollapsible(e)}
          >
            <div className={`content-ripple`} style={{ display: "flex" }}>
              <div>
                <i className={`bi bi-instagram`}></i>
              </div>
              <div style={{ marginLeft: "10px" }}>Admin</div>
              <div className={`icon-container`} style={{ marginLeft: "auto" }}>
                <i className={`bi bi-caret-down-fill`}></i>
              </div>
            </div>
          </div>
          <div className={`collapsible-content`}>
            <div className={`sidebar-menu-item container-ripple`}>
              <div className={`content-ripple`} style={{ display: "flex" }}>
                <div>
                  <i className={`bi bi-bell-fill`}></i>
                </div>
                <div style={{ marginLeft: "10px" }}>Notifications</div>
              </div>
            </div>
            <div className={`sidebar-menu-item container-ripple`}>
              <div className={`content-ripple`} style={{ display: "flex" }}>
                <div>
                  <i className={`bi bi-bell-fill`}></i>
                </div>
                <div style={{ marginLeft: "10px" }}>Notifications</div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`collapsible sidebar-menu-item container-ripple`}
          onClick={(e) => handleCollapsible(e)}
        >
          <div className={`content-ripple`} style={{ display: "flex" }}>
            <div>
              <i className={`bi bi-person-fill`}></i>
            </div>
            <div style={{ marginLeft: "10px" }}>Admin</div>
            <div className={`icon-container`} style={{ marginLeft: "auto" }}>
              <i className={`bi bi-caret-down-fill`}></i>
            </div>
          </div>
        </div>
        <div
          className={`collapsible-content`}
          onClick={() => {
            clearAll();
          }}
        >
          <div
            className={`collapsible sidebar-menu-item container-ripple`}
            onClick={(e) => handleCollapsible(e)}
          >
            <div className={`content-ripple`} style={{ display: "flex" }}>
              <div>
                <i className={`bi bi-instagram`}></i>
              </div>
              <div style={{ marginLeft: "10px" }}>Admin</div>
              <div className={`icon-container`} style={{ marginLeft: "auto" }}>
                <i className={`bi bi-caret-down-fill`}></i>
              </div>
            </div>
          </div>
          <div className={`collapsible-content`}>
            <div
              className={`sidebar-menu-item container-ripple`}
            >
              <div className={`content-ripple`} style={{ display: "flex" }}>
                <div>
                  <i className={`bi bi-bell-fill`}></i>
                </div>
                <div style={{ marginLeft: "10px" }}>Notifications</div>
              </div>
            </div>
            <div className={`sidebar-menu-item container-ripple`}>
              <div className={`content-ripple`} style={{ display: "flex" }}>
                <div>
                  <i className={`bi bi-bell-fill`}></i>
                </div>
                <div style={{ marginLeft: "10px" }}>Notifications</div>
              </div>
            </div>
          </div>
          <div
            className={`collapsible sidebar-menu-item container-ripple`}
            onClick={(e) => handleCollapsible(e)}
          >
            <div className={`content-ripple`} style={{ display: "flex" }}>
              <div>
                <i className={`bi bi-instagram`}></i>
              </div>
              <div style={{ marginLeft: "10px" }}>Admin</div>
              <div className={`icon-container`} style={{ marginLeft: "auto" }}>
                <i className={`bi bi-caret-down-fill`}></i>
              </div>
            </div>
          </div>
          <div className={`collapsible-content`}>
            <div className={`sidebar-menu-item container-ripple`}>
              <div className={`content-ripple`} style={{ display: "flex" }}>
                <div>
                  <i className={`bi bi-bell-fill`}></i>
                </div>
                <div style={{ marginLeft: "10px" }}>Notifications</div>
              </div>
            </div>
            <div className={`sidebar-menu-item container-ripple`}>
              <div className={`content-ripple`} style={{ display: "flex" }}>
                <div>
                  <i className={`bi bi-bell-fill`}></i>
                </div>
                <div style={{ marginLeft: "10px" }}>Notifications</div>
              </div>
            </div>
          </div>
        </div>
      </Sidebar>
    </>
  );
}

export default App;
