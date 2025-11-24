import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProductosAdmin } from "../../../pages/admin/ProductosAdmin";
import * as productService from "../../../services/productService";

describe("Página ProductosAdmin", () => {
  const mockProductos = [
    {
      id_producto: 1,
      nombre: "Torta Chocolate",
      precio: 15000,
      categoria: { nombre_categoria: "Tortas" },
      sabor: { nombre_sabor: "Chocolate" },
      imagenes: [{ url: "test.jpg" }],
    },
    {
      id_producto: 2,
      nombre: "Trufa",
      precio: 5000,
      categoria: { nombre_categoria: "Postres" },
      sabor: { nombre_sabor: "Vainilla" },
      imagenes: [{ url: "foto.jpg" }],
    },
  ];

  beforeEach(() => {
    spyOn(productService, "getProductos").and.returnValue(
      Promise.resolve(mockProductos)
    );

    spyOn(productService, "deleteProducto").and.returnValue(
      Promise.resolve(true)
    );
  });

  const renderPage = () =>
    render(
      <MemoryRouter>
        <ProductosAdmin />
      </MemoryRouter>
    );

  it("renderiza correctamente el título principal", () => {
    renderPage();
    expect(screen.getByText("Gestión de Productos")).toBeTruthy();
  });

  it("carga y renderiza la lista de productos", async () => {
    renderPage();
    expect(await screen.findByText("Torta Chocolate")).toBeTruthy();
    expect(await screen.findByText("Trufa")).toBeTruthy();
  });

  it("muestra los enlaces de edición para cada producto", async () => {
    renderPage();

    const editarLinks = await screen.findAllByText("Editar");

    expect(editarLinks.length).toBe(2);
    expect(editarLinks[0].getAttribute("href")).toBe("/admin/productos/editar/1");
    expect(editarLinks[1].getAttribute("href")).toBe("/admin/productos/editar/2");
  });

  it("ejecuta deleteProducto al hacer clic en Eliminar", async () => {
    renderPage();

    const botonesEliminar = await screen.findAllByText("Eliminar");

    fireEvent.click(botonesEliminar[0]);

    await waitFor(() => {
      expect(productService.deleteProducto).toHaveBeenCalledWith(1);
    });
  });
});
