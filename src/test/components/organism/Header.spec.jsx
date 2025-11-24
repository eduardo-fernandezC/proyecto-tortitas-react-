import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Header } from "../../../components/organisms/Header";
import { CartContext } from "../../../Context/CartContext";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jasmine.createSpy("navigate"),
}));

describe("Header Component", () => {

  const mockCart = [
    { id: 1, nombre: "Torta", cantidad: 2, precio: 6500 },
    { id: 2, nombre: "Cupcake", cantidad: 1, precio: 2000 },
  ];

  const renderHeader = (logueado = false) => {
    if (logueado) {
      localStorage.setItem("usuario", JSON.stringify({ nombre: "Test" }));
    } else {
      localStorage.removeItem("usuario");
    }

    return render(
      <CartContext.Provider value={{ carrito: mockCart }}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </CartContext.Provider>
    );
  };

  it("renderiza correctamente el logo y los enlaces principales", () => {
    renderHeader();

    expect(screen.getByText("TORTITAS.CL")).toBeTruthy();
    expect(screen.getByText("Inicio")).toBeTruthy();
    expect(screen.getByText("Productos")).toBeTruthy();
    expect(screen.getByText("Blog")).toBeTruthy();
    expect(screen.getByText("Contacto")).toBeTruthy();
  });

  it("muestra correctamente la cantidad total en el carrito", () => {
    renderHeader();
    
    expect(screen.getByText("3")).toBeTruthy();
  });

  it("muestra botón de iniciar sesión cuando NO hay usuario", () => {
    renderHeader(false);
    expect(screen.getByText("Iniciar sesión")).toBeTruthy();
  });

  it("muestra botón de cerrar sesión cuando SÍ hay usuario", () => {
    renderHeader(true);
    expect(screen.getByText("Cerrar sesión")).toBeTruthy();
  });

});
