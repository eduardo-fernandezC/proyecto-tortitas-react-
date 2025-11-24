import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ProductCard } from "../../../components/molecules/ProductCard";
import { CartContext } from "../../../Context/CartContext";

describe("ProductCard Component", () => {
  const mockProducto = {
    id_producto: 1,
    nombre: "Torta de Chocolate",
    precio: 15000,
    imagenes: [{ url: "/assets/images/cake.webp" }],
    categoria: { nombre_categoria: "Tortas" },
    sabor: { nombre_sabor: "Chocolate" }
  };

  const renderCard = () =>
    render(
      <BrowserRouter>
        <CartContext.Provider value={{ agregarAlCarrito: () => {} }}>
          <ProductCard producto={mockProducto} />
        </CartContext.Provider>
      </BrowserRouter>
    );

  it("muestra el nombre correctamente", () => {
    renderCard();
    expect(screen.getByText("Torta de Chocolate")).toBeTruthy();
  });

  it("muestra la categoría y el sabor", () => {
    renderCard();
    expect(screen.getByText("Tortas")).toBeTruthy();
    expect(screen.getAllByText("Chocolate").length).toBeGreaterThan(0);
  });

  it("muestra el precio correctamente", () => {
    renderCard();
    expect(
      screen.getByText((text) =>
        text.replace(/\s/g, "").includes("15000") ||
        text.replace(/\s/g, "").includes("15.000")
      )
    ).toBeTruthy();
  });

  it("tiene enlace al detalle del producto", () => {
    renderCard();
    const link = screen.getByRole("link", { name: /ver detalle/i });
    expect(link.getAttribute("href")).toBe("/detalle/1");
  });
});
