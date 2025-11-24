import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductList } from "../../../components/organisms/ProductList";
import { CartContext } from "../../../Context/CartContext";

describe("ProductList Component", () => {
  const productos = [
    {
      id_producto: 1,
      nombre: "Dulce Tarde",
      precio: 6500,
      categoria: { nombre_categoria: "Tortas" },
      sabor: { nombre_sabor: "Vainilla" },
      imagenes: []
    },
    {
      id_producto: 2,
      nombre: "Trufa",
      precio: 5500,
      categoria: { nombre_categoria: "Postres" },
      sabor: { nombre_sabor: "Chocolate" },
      imagenes: []
    }
  ];

  const renderList = () =>
    render(
      <MemoryRouter>
        <CartContext.Provider value={{ agregarAlCarrito: () => {} }}>
          <ProductList productos={productos} />
        </CartContext.Provider>
      </MemoryRouter>
    );

  it("renderiza los nombres correctamente", () => {
    renderList();
    expect(screen.getByText("Dulce Tarde")).toBeTruthy();
    expect(screen.getByText("Trufa")).toBeTruthy();
  });

  it("muestra los precios correctamente", () => {
    renderList();

    expect(
      screen.getByText((text) =>
        text.replace(/\s/g, "").includes("6500")
      )
    ).toBeTruthy();

    expect(
      screen.getByText((text) =>
        text.replace(/\s/g, "").includes("5500")
      )
    ).toBeTruthy();
  });
});
