import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Registro } from "../../pages/auth/Registro";

// Mock de las notificaciones
jest.mock("../../components/atoms/Notification", () => ({
    notifyError: jest.fn(),
    notifySuccess: jest.fn(),
}));

// Mock del servicio registrarUsuario
jest.mock("../../services/usuarioService", () => ({
    registrarUsuario: jest.fn().mockResolvedValue({ status: 200 }),
}));

describe("Página Registro", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renderiza correctamente el título del formulario", () => {
        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        expect(screen.getByText("Crear Cuenta")).toBeTruthy();
    });

    it("muestra error si los campos están vacíos", () => {
        const { notifyError } = require("../../components/atoms/Notification");

        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText("Registrarme"));

        expect(notifyError).toHaveBeenCalled();
    });

    it("muestra error si las contraseñas no coinciden", () => {
        const { notifyError } = require("../../components/atoms/Notification");

        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText("Nombre completo"), {
            target: { value: "Lucas" },
        });

        fireEvent.change(screen.getByLabelText("Correo electrónico"), {
            target: { value: "lucas@duoc.cl" },
        });

        fireEvent.change(screen.getByLabelText("Contraseña"), {
            target: { value: "1234" },
        });

        fireEvent.change(screen.getByLabelText("Confirmar contraseña"), {
            target: { value: "0000" },
        });

        fireEvent.click(screen.getByLabelText("Acepto los términos y condiciones"));

        fireEvent.click(screen.getByText("Registrarme"));

        expect(notifyError).toHaveBeenCalledWith("Las contraseñas no coinciden.");
    });

    it("muestra error si no acepta los términos", () => {
        const { notifyError } = require("../../components/atoms/Notification");

        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText("Nombre completo"), {
            target: { value: "Lucas" },
        });

        fireEvent.change(screen.getByLabelText("Correo electrónico"), {
            target: { value: "lucas@duoc.cl" },
        });

        fireEvent.change(screen.getByLabelText("Contraseña"), {
            target: { value: "1234" },
        });

        fireEvent.change(screen.getByLabelText("Confirmar contraseña"), {
            target: { value: "1234" },
        });

        fireEvent.click(screen.getByText("Registrarme"));

        expect(notifyError).toHaveBeenCalledWith("Debes aceptar los términos.");
    });

    it("registra correctamente si los datos son válidos", async () => {
        const { notifySuccess } = require("../../components/atoms/Notification");
        const { registrarUsuario } = require("../../services/usuarioService");

        render(
            <MemoryRouter>
                <Registro />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText("Nombre completo"), {
            target: { value: "Lucas" },
        });

        fireEvent.change(screen.getByLabelText("Correo electrónico"), {
            target: { value: "lucas@duoc.cl" },
        });

        fireEvent.change(screen.getByLabelText("Contraseña"), {
            target: { value: "1234" },
        });

        fireEvent.change(screen.getByLabelText("Confirmar contraseña"), {
            target: { value: "1234" },
        });

        fireEvent.click(screen.getByLabelText("Acepto los términos y condiciones"));

        fireEvent.click(screen.getByText("Registrarme"));

        expect(registrarUsuario).toHaveBeenCalled();
        expect(notifySuccess).toHaveBeenCalledWith("Registro exitoso.");
    });
});
