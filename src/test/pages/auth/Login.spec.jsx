import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Login } from "../../pages/auth/Login";

jest.mock("../../components/atoms/Notification", () => ({
    notifyError: jest.fn(),
    notifySuccess: jest.fn(),
}));

jest.mock("../../services/usuarioService", () => ({
    loginUsuario: jest.fn(),
}));

describe("Página Login", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
    });

    it("renderiza el título del formulario", () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        expect(screen.getByText("Iniciar Sesión")).toBeTruthy();
    });

    it("muestra error si los campos están vacíos", () => {
        const { notifyError } = require("../../components/atoms/Notification");

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText("Iniciar sesión"));

        expect(notifyError).toHaveBeenCalledWith("Completa todos los campos.");
    });

    it("muestra error si las credenciales son incorrectas", async () => {
        const { notifyError } = require("../../components/atoms/Notification");
        const { loginUsuario } = require("../../services/usuarioService");

        loginUsuario.mockRejectedValue(new Error("Credenciales inválidas"));

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText("Correo electrónico"), {
            target: { value: "wrong@test.com" },
        });

        fireEvent.change(screen.getByLabelText("Contraseña"), {
            target: { value: "1234" },
        });

        fireEvent.click(screen.getByText("Iniciar sesión"));

        expect(loginUsuario).toHaveBeenCalled();
        expect(notifyError).toHaveBeenCalledWith("Correo o contraseña incorrectos.");
    });

    it("inicia sesión correctamente y guarda el usuario", async () => {
        const { notifySuccess } = require("../../components/atoms/Notification");
        const { loginUsuario } = require("../../services/usuarioService");

        const usuarioMock = {
            nombre: "Lucas",
            email: "lucas@test.com",
        };

        loginUsuario.mockResolvedValue(usuarioMock);

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText("Correo electrónico"), {
            target: { value: "lucas@test.com" },
        });

        fireEvent.change(screen.getByLabelText("Contraseña"), {
            target: { value: "1234" },
        });

        fireEvent.click(screen.getByText("Iniciar sesión"));

        expect(loginUsuario).toHaveBeenCalledWith("lucas@test.com", "1234");

        expect(notifySuccess).toHaveBeenCalledWith("Bienvenido Lucas");

        const guardado = JSON.parse(localStorage.getItem("usuario"));
        expect(guardado).toEqual(usuarioMock);
    });
});
