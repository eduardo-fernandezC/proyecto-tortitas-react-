import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Home } from "../../pages/user/Home";

jest.mock("../../services/productService", () => ({
    getProductos: jest.fn().mockResolvedValue([
        {
            id_producto: 1,
            nombre: "Torta Chocolate",
            imagenes: [{ url: "https://test.com/img1.jpg" }]
        }
    ])
}));
describe("Página Home", () => {
    it("renderiza correctamente el título principal", async () => {
        render(<Home />);
        expect(screen.getByText(/Productos Destacados/i)).toBeTruthy();
    });
    it("muestra el carrusel cuando llegan los productos", async () => {
        render(<Home />);
        await waitFor(() => {
            expect(document.querySelector(".carousel")).toBeTruthy();
        });
    });
    it("carga imágenes destacadas en el carrusel", async () => {
        render(<Home />);

        await waitFor(() => {
            const img = screen.getByRole("img");
            expect(img).toBeTruthy();
        });
    });

});
