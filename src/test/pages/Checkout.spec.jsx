import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Checkout } from "../../pages/user/Checkout";
import { CartContext } from "../../Context/CartContext";

jest.mock("../../services/carritoService", () => ({
    crearPedido: jest.fn(),
}));

jest.mock("../../services/direccionService", () => ({
    getDireccionesByUsuario: jest.fn().mockResolvedValue([]),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate,
}));

describe("Página Checkout", () => {
    const { crearPedido } = require("../../services/carritoService");

    const mockVaciarCarrito = jest.fn();

    const mockUser = {
        id_usuario: 10,
        nombre: "Papu",
        email: "papu@test.com",
    };

    const mockCarrito = [
        { id_producto: 1, nombre: "Torta Chocolate", precio: 10000, cantidad: 1 },
        { id_producto: 2, nombre: "Trufa", precio: 5000, cantidad: 2 },
    ];

    const renderCheckout = () => {
        localStorage.setItem("usuario", JSON.stringify(mockUser));

        return render(
            <CartContext.Provider value={{ carrito: mockCarrito, total: 20000, vaciarCarrito: mockVaciarCarrito }}>
                <MemoryRouter initialEntries={["/checkout"]}>
                    <Routes>
                        <Route path="/checkout" element={<Checkout />} />
                    </Routes>
                </MemoryRouter>
            </CartContext.Provider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    it("muestra el título correctamente", () => {
        renderCheckout();
        expect(screen.getByText(/Completa tu compra/i)).toBeTruthy();
    });

    it("renderiza los productos del carrito", () => {
        renderCheckout();

        expect(screen.getByText(/Torta Chocolate/i)).toBeTruthy();
        expect(screen.getByText(/Trufa/i)).toBeTruthy();
        expect(screen.getByText(/\$20,000/i)).toBeTruthy();
    });

    it("confirma la compra, vacía el carrito y navega a confirmación", async () => {
        crearPedido.mockResolvedValue({ ok: true });

        renderCheckout();

        fireEvent.click(screen.getByRole("button", { name: /confirmar compra/i }));

        await waitFor(() => {
            expect(crearPedido).toHaveBeenCalled();
            expect(mockVaciarCarrito).toHaveBeenCalled();

            expect(mockNavigate).toHaveBeenCalledWith("/confirmacion", {
                state: {
                    form: {
                        nombre: "Papu",
                        correo: "papu@test.com",
                        direccion: "Sin dirección",
                        tipoEntrega: "DOMICILIO",
                    },
                    total: 20000,
                },
            });
        });
    });
});
