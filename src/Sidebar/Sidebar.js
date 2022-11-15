import "./Sidebar.css"
import { useRef, useState } from "react"
const Sidebar = (props) => {
  // const sidebar_ref = useRef()
  const [isOpen, setIsOpen] = useState(false);
  //   const openSidebar = () => {
  // setIsOpen(true)
  //   }
  return (
    <>
      <div className="sidebar-dark">

      </div>
      <div tabIndex={0} className={`sidebar-app` + (isOpen ? 'opened' : '')} onBlur={() => { console.log("blur"); }}>
        {props.children}
      </div>
    </>
  )
}

const openSidebar = () => {

  const el = document.querySelector(".sidebar-app")
  const dark = document.querySelector(".sidebar-dark")
  el.classList.add("opened");
  dark.classList.add("opened")
  dark.style.animation = null
  el.focus()
  console.log(el)
}

const closeSidebar = () => {

  const el = document.querySelector(".sidebar-app")
  const dark = document.querySelector(".sidebar-dark")
  el.classList.remove("opened");
  // dark.classList.remove("opened");
  dark.style.transition = "0.5s ease"
  dark.style.background = "rgba(0,0,0,0)"
  dark.style.backdropFilter = "blur(0px)"
  setTimeout(() => {
    dark.classList.remove("opened");
    dark.style.background = null
    dark.style.backdropFilter = null
    dark.style.transition = null
  }, 500);

  el.focus()
  console.log(el)
}
export { openSidebar }

export default Sidebar
