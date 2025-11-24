import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { DetalleProducto } from "../../pages/user/DetalleProducto";
import { CartContext } from "../../Context/CartContext";

jest.mock("../../services/productService", () => ({
    getProductoById: jest.fn(),
}));

jest.mock("../../components/atoms/Notification", () => ({
    notifySuccess: jest.fn(),
}));

describe("Página DetalleProducto", () => {
    const mockAgregarAlCarrito = jest.fn();
    const { getProductoById } = require("../../services/productService");

    const mockProducto = {
        id_producto: 1,
        nombre: "Torta Chocolate",
        descripcion: "Bizcocho con crema",
        categoria: { nombre_categoria: "Tortas" },
        sabor: { nombre_sabor: "Chocolate" },
        precio: 6500,
        imagenes: [{ url: "https://test.com/img.jpg" }],
    };

    const renderWithRouter = async (id = "1") => {
        render(
            <MemoryRouter initialEntries={[`/productos/${id}`]}>
                <CartContext.Provider value={{ agregarAlCarrito: mockAgregarAlCarrito }}>
                    <Routes>
                        <Route path="/productos/:id" element={<DetalleProducto />} />
                    </Routes>
                </CartContext.Provider>
            </MemoryRouter>
        );

        await waitFor(() => {});
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("muestra correctamente la información del producto", async () => {
        getProductoById.mockResolvedValue(mockProducto);

        await renderWithRouter("1");

        expect(screen.getByText("Torta Chocolate")).toBeTruthy();
        expect(screen.getByText(/Bizcocho con crema/i)).toBeTruthy();
        expect(
            screen.getByText("Precio: $6,500")
        ).toBeTruthy();
    });

    it("ejecuta agregarAlCarrito al hacer clic en el botón", async () => {
        getProductoById.mockResolvedValue(mockProducto);

        await renderWithRouter("1");

        const boton = screen.getByRole("button", { name: /agregar al carrito/i });
        fireEvent.click(boton);

        expect(mockAgregarAlCarrito).toHaveBeenCalledWith(mockProducto);
    });

    it("muestra mensaje de producto no encontrado cuando getProductoById devuelve null", async () => {
        getProductoById.mockResolvedValue(null);

        await renderWithRouter("999");

        expect(screen.getByText(/Producto no encontrado/i)).toBeTruthy();
    });

    it("contiene un enlace para volver a productos", async () => {
        getProductoById.mockResolvedValue(mockProducto);

        await renderWithRouter("1");

        const link = screen.getByRole("link", { name: /Volver a Productos/i });
        expect(link.getAttribute("href")).toBe("/productos");
    });
});
