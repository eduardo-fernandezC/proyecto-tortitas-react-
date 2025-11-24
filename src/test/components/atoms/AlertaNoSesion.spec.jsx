import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AlertaNoSesion } from "../../components/atoms/AlertaNoSesion";

describe("Componente AlertaNoSesion", () => {

    const renderComponent = () => {
        return render(
            <MemoryRouter>
                <AlertaNoSesion />
            </MemoryRouter>
        );
    };

    it("muestra el mensaje principal correctamente", () => {
        renderComponent();
        expect(screen.getByText("Debes iniciar sesión")).toBeTruthy();
    });

    it("muestra el texto descriptivo", () => {
        renderComponent();
        expect(
            screen.getByText(/primero inicia sesión en tu cuenta/i)
        ).toBeTruthy();
    });

    it("muestra el botón de ir a iniciar sesión", () => {
        renderComponent();
        const boton = screen.getByRole("link", { name: /ir a iniciar sesión/i });
        expect(boton).toBeTruthy();
    });

    it("el enlace del botón dirige a /login", () => {
        renderComponent();
        const boton = screen.getByRole("link", { name: /ir a iniciar sesión/i });
        expect(boton.getAttribute("href")).toBe("/login");
    });
});
