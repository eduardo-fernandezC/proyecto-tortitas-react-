import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CartContext, CartProvider } from "../../Context/CartContext";

const TestComponent = () => {
  const {
    carrito,
    agregarAlCarrito,
    eliminarProducto,
    vaciarCarrito,
  } = React.useContext(CartContext);

  return (
    <div>
      <p data-testid="count">{carrito.length}</p>

      <button
        onClick={() =>
          agregarAlCarrito({
            id_producto: 1,
            nombre: "Torta",
            precio: 1000,
          })
        }
      >
        Agregar
      </button>

      <button onClick={() => eliminarProducto(1)}>Eliminar</button>
      <button onClick={vaciarCarrito}>Vaciar</button>
    </div>
  );
};

describe("CartContext", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("inicia con un carrito vacío", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );
    expect(screen.getByTestId("count").textContent).toBe("0");
  });

  it("agrega productos al carrito con id_producto", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Agregar"));
    expect(screen.getByTestId("count").textContent).toBe("1");
  });

  it("elimina productos correctamente", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Agregar"));
    fireEvent.click(screen.getByText("Eliminar"));

    expect(screen.getByTestId("count").textContent).toBe("0");
  });

  it("vacía el carrito completamente", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    fireEvent.click(screen.getByText("Agregar"));
    fireEvent.click(screen.getByText("Agregar"));
    fireEvent.click(screen.getByText("Vaciar"));

    expect(screen.getByTestId("count").textContent).toBe("0");
  });
});
