import React from "react";
import { render, screen } from "@testing-library/react";
import { Footer } from "../../../components/organisms/Footer";

describe("Footer Component", () => {

  it("renderiza el nombre de la marca", () => {
    render(<Footer />);
    expect(screen.getByText("TORTITAS.CL")).toBeTruthy();
  });

  it("muestra la información de contacto", () => {
    render(<Footer />);
    expect(screen.getByText(/contacto@tortitas.cl/i)).toBeTruthy();
    expect(screen.getByText(/Av\. Los Dulces/i)).toBeTruthy();
    expect(screen.getByText(/\+56 9 8765 4321/)).toBeTruthy();
  });

  it("muestra los horarios correctamente", () => {
    render(<Footer />);
    expect(screen.getByText(/Lunes a Viernes/i)).toBeTruthy();
    expect(screen.getByText(/Sábados/i)).toBeTruthy();
    expect(screen.getByText(/Domingos: cerrado/i)).toBeTruthy();
  });

  it("muestra el año actual en el copyright", () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeTruthy();
  });

  it("tiene la estructura principal del footer (verifica clase .footer)", () => {
    const { container } = render(<Footer />);
    const footer = container.querySelector(".footer");
    expect(footer).toBeTruthy();
  });

});
