import React from "react";
import { render, screen } from "@testing-library/react";
import { Title } from "../../../components/atoms/Title";

describe("Title Component", () => {

  it("renderiza el texto correctamente", () => {
    render(<Title text="Título de prueba" />);
    expect(screen.getByText("Título de prueba")).toBeTruthy();
  });

  it("usa el tamaño correcto de encabezado según la prop 'size'", () => {
    render(<Title text="Subtítulo" size="h3" />);
    const element = screen.getByText("Subtítulo");
    expect(element.tagName).toBe("H3");
  });

  it("aplica la clase CSS por defecto correctamente", () => {
    render(<Title text="Con clase" />);
    const element = screen.getByText("Con clase");
    expect(element.classList.contains("titulo")).toBeTrue();
  });

  it("permite asignar una clase CSS personalizada", () => {
    render(<Title text="Con clase custom" className="texto-grande" />);
    const element = screen.getByText("Con clase custom");
    expect(element.classList.contains("texto-grande")).toBeTrue();
  });

  it("permite usar cualquier etiqueta de encabezado", () => {
    const sizes = ["h1", "h2", "h3", "h4", "h5", "h6"];

    sizes.forEach((tag) => {
      render(<Title text={`Título ${tag}`} size={tag} />);
      const element = screen.getByText(`Título ${tag}`);
      expect(element.tagName).toBe(tag.toUpperCase());
    });
  });

});
