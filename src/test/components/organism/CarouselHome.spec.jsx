import React from "react";
import { render, screen } from "@testing-library/react";
import { CarouselHome } from "../../../components/organisms/CarouselHome";

jest.mock("bootstrap", () => ({
  Carousel: function () {
    return {  };
  },
}));

describe("CarouselHome Component", () => {

  const images = [
    { id: 1, src: "img1.jpg", title: "Imagen 1" },
    { id: 2, src: "img2.jpg", title: "Imagen 2" },
  ];

  it("renderiza todas las imágenes", () => {
    render(<CarouselHome images={images} />);

    expect(screen.getByAltText("Imagen 1")).toBeTruthy();
    expect(screen.getByAltText("Imagen 2")).toBeTruthy();
  });

  it("muestra los títulos de las imágenes", () => {
    render(<CarouselHome images={images} />);

    expect(screen.getByText("Imagen 1")).toBeTruthy();
    expect(screen.getByText("Imagen 2")).toBeTruthy();
  });

  it("genera enlaces a los detalles correctos", () => {
    render(<CarouselHome images={images} />);

    const links = screen.getAllByRole("link");

    expect(links[0].getAttribute("href")).toBe("/detalle/1");
    expect(links[1].getAttribute("href")).toBe("/detalle/2");
  });

  it("la primera imagen tiene la clase 'active'", () => {
    const { container } = render(<CarouselHome images={images} />);
    const firstItem = container.querySelector(".carousel-item.active");

    expect(firstItem).toBeTruthy();
    expect(firstItem.querySelector("img").getAttribute("src")).toBe("img1.jpg");
  });

});
