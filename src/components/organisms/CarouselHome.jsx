import React, { useEffect } from "react";
import { Carousel } from "bootstrap";
import "../../styles/components/organisms/carouselhome.css";

export const CarouselHome = ({ images }) => {
  useEffect(() => {
    const element = document.querySelector("#carouselHome");
    if (element) {
      new Carousel(element, {
        interval: 3000,
        ride: "carousel",
        wrap: true,
        pause: false,
      });
    }
  }, []);

  return (
    <div
      id="carouselHome"
      className="carousel slide carousel-container"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {images.map((item, index) => (
          <div
            key={item.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={item.src}
              alt={item.title}
              className="d-block w-100 carousel-image"
            />
            <div className="carousel-caption">
              <h3>{item.title}</h3>
              <a href={`/detalle/${item.id}`} className="btn-carousel">
                Ver producto
              </a>
            </div>
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselHome"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselHome"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
};