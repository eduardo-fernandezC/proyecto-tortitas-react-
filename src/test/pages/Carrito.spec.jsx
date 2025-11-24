import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Carrito } from "../../pages/user/Carrito";
import { CartContext } from "../../Context/CartContext";

describe("Página Carrito", () => {

  const mockEliminar = jasmine.createSpy("eliminarProducto");
  const mockVaciar = jasmine.createSpy("vaciarCarrito");
  const mockAumentar = jasmine.createSpy("aumentarCantidad");
  const mockDisminuir = jasmine.createSpy("disminuirCantidad");

  const carritoEjemplo = [
    {
      id_producto: 1,
      nombre: "Torta Chocolate",
      precio: 10000,
      cantidad: 2
    }
  ];

  const renderCarrito = (carrito = carritoEjemplo, total = 20000) => {
    render(
      <MemoryRouter>
        <CartContext.Provider
          value={{
            carrito,
            total,
            eliminarProducto: mockEliminar,
            vaciarCarrito: mockVaciar,
            aumentarCantidad: mockAumentar,
            disminuirCantidad: mockDisminuir
          }}
        >
          <Carrito />
        </CartContext.Provider>
      </MemoryRouter>
    );
  };

  it("muestra mensaje cuando el carrito está vacío", () => {
    renderCarrito([], 0);
    expect(screen.getByText("Tu carrito está vacío")).toBeTruthy();
  });

  it("muestra productos del carrito y el total correcto", () => {
    renderCarrito();
    expect(screen.getByText("Torta Chocolate")).toBeTruthy();
    expect(screen.getByText(/Total:\s*\$20,000/)).toBeTruthy();
  });

  it("llama a eliminarProducto al hacer clic en Eliminar", () => {
    renderCarrito();
    fireEvent.click(screen.getByText("Eliminar"));
    expect(mockEliminar).toHaveBeenCalledWith(1);
  });
});
