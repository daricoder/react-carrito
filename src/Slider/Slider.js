import { useState } from "react";
import "./Slider.css";
let Slider = () => {
  let [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png",
    "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&quality=85&auto=format&fit=max&s=a52bbe202f57ac0f5ff7f47166906403",
    "https://cdn.britannica.com/25/7125-050-67ACEC3C/Abyssinian-sorrel.jpg",
  ];
  let images_jsx = images.map((image, index) => (
    <img className="slides" src={image} style={{ display: `${index != 0 ? "none" : "block"}` }} />
  ));
  let badges_jsx = images.map((image, index) => {
    if (index == currentSlide) {
      return (
        <div
          className="badge badge-current"
          onClick={() => handleSlide(index)}
        ></div>
      );
    }
    return <div className="badge" onClick={(e) => handleSlide(e,index)}></div>;
  });
  let current_image_jsx = images_jsx[currentSlide];

  let handleSlide = (e, slide,orientation) => {
    let el = e.currentTarget;
    let container = el.parentNode.parentNode;
    let imgs = container.querySelectorAll("img");
    const before_slide_index = currentSlide;

    if (slide == images.length) {
      setCurrentSlide(0);
      slide = 0;
    } else if (slide == -1) {
      setCurrentSlide(images.length - 1);
      slide = images.length - 1
    } else {
      setCurrentSlide(slide);
    }
    let after_img = imgs[slide];
    let current_img = imgs[before_slide_index];

    if(!orientation){
      orientation = slide - before_slide_index > 0 ? 1 : -1
    }


    after_img.style.transform = `translateX(${orientation * 100}%)`
    after_img.style.display = "block"
    setTimeout(() => {
      current_img.style.transform = `translateX(${-1 * orientation * 100}%)`
      after_img.style.transform = "translateX(0%)"
    }, 1);
    setTimeout(() => {
      current_img.style.transform = null
      current_img.style.display = "none"
    }, 200);
  };

  return (
    <>
      <div className="container-slider">
        {images_jsx}
        <div
          className="container-slider-control-arrow"
          style={{ width: "100%" }}
        >
          <div
            className="slider-control-arrow slider-control-arrow-back"
            onClick={(e) => handleSlide(e, currentSlide - 1, -1)}
          >
            &#10094;
          </div>
          <div
            className="slider-control-arrow slider-control-arrow-next"
            onClick={(e) => handleSlide(e, currentSlide + 1, 1)}
          >
            &#10095;
          </div>
        </div>
        <div
          className="container-slider-control-badges"
          style={{ width: "100%" }}
        >
          {badges_jsx}
        </div>
      </div>
    </>
  );
};

export default Slider;
