import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Contacto } from "../../pages/user/Contacto";

jest.mock("../../components/atoms/Notification", () => ({
    notifyError: jest.fn(),
    notifySuccess: jest.fn(),
}));


const fillForm = () => {
    fireEvent.change(screen.getByLabelText("Nombre"), {
        target: { value: "Lucas" },
    });

    fireEvent.change(screen.getByLabelText("Correo electrónico"), {
        target: { value: "lucas@duoc.cl" },
    });

    fireEvent.change(screen.getByLabelText("Teléfono"), {
        target: { value: "987654321" },
    });

    fireEvent.change(screen.getByLabelText("Asunto"), {
        target: { value: "Consulta torta" },
    });

    fireEvent.change(screen.getByLabelText("Mensaje"), {
        target: { value: "Hola, quiero hacer un pedido de prueba" },
    });
};

describe("Página Contacto", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("muestra el título correctamente", () => {
        render(<Contacto />);
        expect(screen.getByText(/Contáctanos/i)).toBeTruthy();
    });

    it("renderiza correctamente los campos del formulario", () => {
        render(<Contacto />);

        expect(screen.getByLabelText("Nombre")).toBeTruthy();
        expect(screen.getByLabelText("Correo electrónico")).toBeTruthy();
        expect(screen.getByLabelText("Teléfono")).toBeTruthy();
        expect(screen.getByLabelText("Asunto")).toBeTruthy();
        expect(screen.getByLabelText("Mensaje")).toBeTruthy();
    });

    it("envía el formulario correctamente", () => {
        const { notifySuccess } = require("../../components/atoms/Notification");

        render(<Contacto />);

        fillForm();

        fireEvent.click(screen.getByRole("button", { name: /enviar mensaje/i }));

        expect(notifySuccess).toHaveBeenCalledWith("Mensaje enviado correctamente.");
        expect(screen.getByText(/mensaje enviado/i)).toBeTruthy();
    });

    it("permite volver a enviar un mensaje", () => {
        render(<Contacto />);

        fillForm();

        fireEvent.click(screen.getByRole("button", { name: /enviar mensaje/i }));

        const botonVolver = screen.getByRole("button", { name: /enviar otro mensaje/i });
        fireEvent.click(botonVolver);

        expect(screen.getByRole("button", { name: /enviar mensaje/i })).toBeTruthy();
    });
});
