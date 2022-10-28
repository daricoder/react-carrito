import { useState } from "react";
import "./Slider.css"
let Slider = () => {
  let [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
    "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403",
    "https://cdn.britannica.com/25/7125-050-67ACEC3C/Abyssinian-sorrel.jpg",
  ];
  let images_jsx = images.map((image, index) => (
    <img className="slides" src={image} style={{ width: "100%" }} />
  ));
  let badges_jsx = images.map((image, index) => {

    if (index == currentSlide) {
      return <div className="badge badge-current" onClick={() => handleSlide(index)}></div>
    }
    return <div className="badge" onClick={() => handleSlide(index)}></div>
  });
  let current_image_jsx = images_jsx[currentSlide];

  let handleSlide = (slide) => {
    if (slide == images.length) {
      setCurrentSlide(0)
    } else if (slide == -1) {
      setCurrentSlide(images.length - 1)
    } else {
      setCurrentSlide(slide)
    }

  }

  return (
    <>
      <div className="container-slider">
        {images_jsx[currentSlide]}
        <div className="container-slider-control-arrow" style={{ width: "100%" }}>
          <div className="slider-control-arrow slider-control-arrow-back" onClick={() => handleSlide(currentSlide - 1)} >&#10094;</div>
          <div className="slider-control-arrow slider-control-arrow-next" onClick={() => handleSlide(currentSlide + 1)}>&#10095;</div>
        </div>
        <div className="container-slider-control-badges" style={{ width: "100%" }}>
          {badges_jsx}
        </div>
      </div>
    </>
  );
};

export default Slider
