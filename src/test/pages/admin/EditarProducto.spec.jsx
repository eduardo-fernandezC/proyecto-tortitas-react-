import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { EditarProducto } from "../../../pages/admin/EditarProducto";

jest.mock("../../../services/productService", () => ({
  getProductoById: jest.fn(),
}));

jest.mock("../../../services/categoriaService", () => ({
  getCategorias: jest.fn(),
}));

jest.mock("../../../services/saborService", () => ({
  getSabores: jest.fn(),
}));

jest.mock("../../../services/api", () => ({
  put: jest.fn(),
}));

jest.mock("../../../services/imagenService", () => ({
  uploadImagen: jest.fn(),
}));

jest.mock("../../../components/atoms/Notification", () => ({
  notifySuccess: jest.fn(),
  notifyError: jest.fn(),
}));

import { getProductoById } from "../../../services/productService";
import { getCategorias } from "../../../services/categoriaService";
import { getSabores } from "../../../services/saborService";
import { put } from "../../../services/api";
import { uploadImagen } from "../../../services/imagenService";
import {
  notifySuccess,
  notifyError,
} from "../../../components/atoms/Notification";

const mockProducto = {
  nombre: "Torta Chocolate",
  precio: 12990,
  descripcion: "Deliciosa torta de chocolate",
  id_categoria: 1,
  id_sabor: 10,
};

const mockCategorias = [
  { id_categoria: 1, nombre_categoria: "Tortas" },
  { id_categoria: 2, nombre_categoria: "Postres" },
];

const mockSabores = [
  { id_sabor: 10, nombre_sabor: "Chocolate" },
  { id_sabor: 11, nombre_sabor: "Vainilla" },
];

const renderWithRouter = (id = "5") => {
  return render(
    <MemoryRouter initialEntries={[`/editar/` + id]}>
      <Routes>
        <Route path="/editar/:id" element={<EditarProducto />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("EditarProducto Page", () => {
  beforeEach(async () => {
    jest.clearAllMocks();

    getProductoById.mockResolvedValue(mockProducto);
    getCategorias.mockResolvedValue(mockCategorias);
    getSabores.mockResolvedValue(mockSabores);

    await act(async () => {
      renderWithRouter();
    });
  });

  it("carga datos del producto, categorías y sabores al iniciar", () => {
    expect(getProductoById).toHaveBeenCalledWith("5");
    expect(getCategorias).toHaveBeenCalled();
    expect(getSabores).toHaveBeenCalled();

    expect(screen.getByDisplayValue("Torta Chocolate")).toBeTruthy();
    expect(screen.getByDisplayValue("12990")).toBeTruthy();
    expect(screen.getByDisplayValue("Deliciosa torta de chocolate")).toBeTruthy();
  });

  it("permite editar campos del formulario", () => {
    const inputNombre = screen.getByLabelText("Nombre");
    fireEvent.change(inputNombre, { target: { value: "Torta Editada" } });

    expect(inputNombre.value).toBe("Torta Editada");
  });

  it("envía los datos correctamente al hacer submit", async () => {
    put.mockResolvedValue({});

    await act(async () => {
      fireEvent.click(screen.getByText("Guardar cambios"));
    });

    expect(put).toHaveBeenCalledWith("/productos/5", mockProducto);
    expect(notifySuccess).toHaveBeenCalledWith("Producto editado!");
  });

  it("sube imagen nueva si se selecciona un archivo", async () => {
    const file = new File(["test"], "imagen.jpg", { type: "image/jpg" });

    fireEvent.change(screen.getByLabelText("Imagen nueva (opcional)"), {
      target: { files: [file] },
    });

    put.mockResolvedValue({});

    await act(async () => {
      fireEvent.click(screen.getByText("Guardar cambios"));
    });

    expect(uploadImagen).toHaveBeenCalledWith("5", file);
  });

  it("muestra error si falla la edición", async () => {
    put.mockRejectedValue(new Error("Error"));

    await act(async () => {
      fireEvent.click(screen.getByText("Guardar cambios"));
    });

    expect(notifyError).toHaveBeenCalledWith("Error al editar producto");
  });
});
