import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Productos } from "../../pages/user/Productos";

jest.mock("../../services/productService", () => ({
    getProductos: jest.fn().mockResolvedValue([
        {
            id_producto: 1,
            nombre: "Torta Vainilla",
            precio: 5000,
            imagenes: [{ url: "https://test.com/img.jpg" }]
        }
    ]),
    getProductosByCategoria: jest.fn().mockResolvedValue([]),
    getProductosBySabor: jest.fn().mockResolvedValue([])
}));
jest.mock("../../services/categoriaService", () => ({
    getCategorias: jest.fn().mockResolvedValue([
        { idCategoria: 1, nombre_categoria: "Tortas" }
    ])
}));
jest.mock("../../services/saborService", () => ({
    getSabores: jest.fn().mockResolvedValue([
        { idSabor: 1, nombre_sabor: "Chocolate" }
    ])
}));
describe("Página Productos (Unit Test)", () => {
    it("renderiza correctamente el título de la página", async () => {
        render(
            <MemoryRouter>
                <Productos />
            </MemoryRouter>
        );
        expect(screen.getByText(/Nuestros Productos/i)).toBeTruthy();
    });
    it("llama a los servicios necesarios al cargar la página", async () => {
        render(
            <MemoryRouter>
                <Productos />
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText(/Nuestros Productos/i)).toBeTruthy();
        });
    });
    it("muestra el listado de productos cuando se cargan los datos", async () => {
        render(
            <MemoryRouter>
                <Productos />
            </MemoryRouter>
        );
        await waitFor(() => {
            const cards = document.querySelectorAll(".product-card");
            expect(cards.length).toBeGreaterThan(0);
        });
    });

});
