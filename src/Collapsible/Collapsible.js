import "./Collapsible.css"

const Collapsible = () => {
  return (
    <div>

    </div>
  )
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
const handleCollapsible = async (e) => {
  let element = e.currentTarget;
  let content = element.nextElementSibling;
  // if (content.style.display == "block") {
  //   content.style.display = "none";
  // } else {
  //   content.style.display = "block";
  // }
  // console.log(content.style.maxHeight);
  //
  let show = true;
  if (content.style.maxHeight) {
    show = false
  }
  let lastparent = element;
  let temp = lastparent;
  let cont = null;
  let count = 0

  while (true) {
    let isLast = false
    cont = lastparent.nextElementSibling
    if (!lastparent.classList.contains("collapsible") || !cont) {
      break;
    }
    if (!lastparent.parentNode.previousElementSibling.classList.contains("collapsible")) {
      isLast = true;
    }
    if (show) {

      console.log('parent', lastparent, 'cont', cont, 'heightcont', cont.scrollHeight, cont.clientHeight, cont.style.maxHeight)

      if (isLast) {
        cont.style.transition = null;
      } else {
        cont.style.transition = "max-height 0s";
      }
      cont.style.maxHeight = cont.scrollHeight + "px"
      let icon = lastparent.querySelector('.icon-container')
      if (count == 0 && icon) {
        icon.style.transform = "rotate(180deg)"

      }
      lastparent = lastparent.parentNode.previousElementSibling

    } else {//hide
      let icon = lastparent.querySelector('.icon-container')
      if (count == 0 && icon) {
        icon.style.transform = null
      }

      console.log('hide')
      console.log('parent', lastparent, 'cont', cont, 'heightcont', cont.scrollHeight, cont.clientHeight, cont.style.maxHeight)
      if (count == 0) {
        console.log('await')
        cont.style.transition = null;
        cont.style.maxHeight = null;
        await sleep(200)
      } else {

        cont.style.transition = "max-height 0s";
        cont.style.maxHeight = cont.scrollHeight + "px"
      }
      lastparent = lastparent.parentNode.previousElementSibling


    }

    count = count + 1;
  }
};

export { handleCollapsible }
export default Collapsible
