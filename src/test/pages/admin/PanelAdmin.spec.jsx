import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { PanelAdmin } from "../../../pages/admin/PanelAdmin";

describe("PanelAdmin Page", () => {

  const renderPage = () =>
    render(
      <MemoryRouter>
        <PanelAdmin />
      </MemoryRouter>
    );

  it("renderiza el título principal", () => {
    renderPage();
    expect(screen.getByText("Panel de Administración")).toBeTruthy();
  });

  it("renderiza todas las tarjetas del panel", () => {
    renderPage();

    const expectedLabels = [
      "Productos",
      "Categorías",
      "Sabores",
      "Imágenes",
      "Usuarios"
    ];

    expectedLabels.forEach(label => {
      expect(screen.getByText(label)).toBeTruthy();
    });
  });

  it("enlace a Productos apunta a la ruta correcta", () => {
    renderPage();
    expect(screen.getByText("Productos").closest("a").href)
      .toContain("/admin/productos");
  });

  it("enlace a Categorías apunta a la ruta correcta", () => {
    renderPage();
    expect(screen.getByText("Categorías").closest("a").href)
      .toContain("/admin/categorias");
  });

  it("enlace a Sabores apunta a la ruta correcta", () => {
    renderPage();
    expect(screen.getByText("Sabores").closest("a").href)
      .toContain("/admin/sabores");
  });

  it("enlace a Imágenes apunta a la ruta correcta", () => {
    renderPage();
    expect(screen.getByText("Imágenes").closest("a").href)
      .toContain("/admin/imagenes");
  });

  it("enlace a Usuarios apunta a la ruta correcta", () => {
    renderPage();
    expect(screen.getByText("Usuarios").closest("a").href)
      .toContain("/admin/usuarios");
  });
});
