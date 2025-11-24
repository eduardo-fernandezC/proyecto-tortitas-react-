import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { Confirmacion } from "../../pages/user/Confirmacion";

describe("Página Confirmacion", () => {
    const mockForm = {
        nombre: "Lucas",
        correo: "lucas@test.com",
        direccion: "Calle 123",
        tipoEntrega: "envio",
    };

    const mockTotal = 15000;

    const renderWithRouter = (state) => {
        return render(
            <MemoryRouter initialEntries={[{ pathname: "/confirmacion", state }]}>
                <Routes>
                    <Route path="/confirmacion" element={<Confirmacion />} />
                </Routes>
            </MemoryRouter>
        );
    };

    it("muestra mensaje si no hay información de compra", () => {
        renderWithRouter(undefined);

        expect(screen.getByText(/No se encontró tu pedido/i)).toBeTruthy();
        expect(
            screen.getByRole("button", { name: /Ir a la tienda/i })
        ).toBeTruthy();
    });

    it("muestra los datos del pedido cuando hay información", () => {
        renderWithRouter({ form: mockForm, total: mockTotal });

        expect(screen.getByText(/¡Gracias por tu compra!/i)).toBeTruthy();
        expect(screen.getByText(/lucas@test\.com/i)).toBeTruthy();


        const total = screen.getByText(/\$15,000|\$15\.000/);
        expect(total).toBeTruthy();

        expect(
            screen.getByRole("button", { name: /Volver al inicio/i })
        ).toBeTruthy();
    });

    it("muestra correctamente la modalidad 'envio'", () => {
        renderWithRouter({ form: mockForm, total: mockTotal });

        const tipo = screen.getByText(/Tipo de entrega/i).parentElement.textContent.toLowerCase();

        expect(tipo.includes("envio")).toBeTrue();
    });

    it("muestra correctamente la modalidad 'retiro'", () => {
        renderWithRouter({
            form: { ...mockForm, tipoEntrega: "retiro" },
            total: mockTotal,
        });

        const tipo = screen.getByText(/Tipo de entrega/i).parentElement.textContent.toLowerCase();

        expect(tipo.includes("retiro")).toBeTrue();
    });
});
