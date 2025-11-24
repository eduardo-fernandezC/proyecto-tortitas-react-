import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { CategoriasAdmin } from "../../../pages/admin/CategoriasAdmin";

jest.mock("../../../services/categoriaService", () => ({
  getCategorias: jest.fn(),
  createCategoria: jest.fn(),
  deleteCategoria: jest.fn(),
}));

import {
  getCategorias,
  createCategoria,
  deleteCategoria,
} from "../../../services/categoriaService";

describe("CategoriasAdmin Page", () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const categoriasMock = [
    { idCategoria: 1, nombre_categoria: "Tortas", descripcion: "Postres dulces" },
    { idCategoria: 2, nombre_categoria: "Galletas", descripcion: "Crujientes y dulces" },
  ];

  it("carga y muestra la lista de categorías", async () => {
    getCategorias.mockResolvedValue(categoriasMock);

    await act(async () => {
      render(<CategoriasAdmin />);
    });

    expect(screen.getByText("Tortas")).toBeTruthy();
    expect(screen.getByText("Galletas")).toBeTruthy();
  });

  it("crea una categoría nueva", async () => {
    getCategorias.mockResolvedValue(categoriasMock);
    createCategoria.mockResolvedValue({});

    await act(async () => {
      render(<CategoriasAdmin />);
    });

    const inputNombre = screen.getByLabelText("Nombre", { selector: "input" });
    const inputDesc = screen.getByLabelText("Descripción", { selector: "textarea" });

    fireEvent.change(inputNombre, { target: { value: "Bebidas" } });
    fireEvent.change(inputDesc, { target: { value: "Jugos y refrescos" } });

    await act(async () => {
      fireEvent.click(screen.getByText("Crear"));
    });

    expect(createCategoria).toHaveBeenCalledWith({
      nombre_categoria: "Bebidas",
      descripcion: "Jugos y refrescos",
    });

    expect(getCategorias).toHaveBeenCalledTimes(2);
  });

  it("elimina una categoría de la lista", async () => {
    getCategorias.mockResolvedValue(categoriasMock);
    deleteCategoria.mockResolvedValue({});

    await act(async () => {
      render(<CategoriasAdmin />);
    });

    const botonEliminar = screen.getAllByText("Eliminar")[0];

    await act(async () => {
      fireEvent.click(botonEliminar);
    });

    expect(deleteCategoria).toHaveBeenCalledWith(1);
    expect(getCategorias).toHaveBeenCalledTimes(2);
  });

});
