import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import axios from "axios";

export default function Slider() {
  const [slides, setSlides] = useState([]);

  const base_url = import.meta.env.VITE_API_BASE_URL;
  useEffect(() => {
    axios
      .get(base_url + "sliders")
      .then((result) => setSlides(result.data.sliders))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Carousel
        autoPlay={true}
        interval={10000}
        infiniteLoop={true}
        dynamicHeight={true}
        showThumbs={false}
        useKeyboardArrows={true}
      >
        {slides?.map((slide) => (
          <div key={slide.id}>
            <img
              src={slide.image_url}
              className="max-h-96 object-cover rounded-2xl"
            />

            <div className="legend">
              <h1 className="text-2xl">{slide.title}</h1>
              <p className="detls">{slide.detail}</p>
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
}
