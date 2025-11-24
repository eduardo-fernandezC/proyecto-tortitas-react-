import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "../../../components/atoms/Input";

describe("Input Component", () => {

  it("muestra la etiqueta correctamente", () => {
    render(<Input label="Nombre" name="nombre" />);
    expect(screen.getByText("Nombre")).toBeTruthy();
  });

  it("renderiza el placeholder si existe", () => {
    render(<Input label="Correo" name="correo" placeholder="Escribe tu correo" />);
    expect(screen.getByPlaceholderText("Escribe tu correo")).toBeTruthy();
  });

  it("aplica correctamente el atributo required", () => {
    render(<Input label="Correo" name="correo" required />);
    const input = screen.getByRole("textbox");
    expect(input).toBeRequired();
  });

  it("dispara el evento onChange correctamente", () => {
    const mockChange = jasmine.createSpy("onChange");

    render(<Input label="Correo" name="correo" onChange={mockChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test@test.com" } });

    expect(mockChange).toHaveBeenCalled();
  });

  it("respeta el tipo del input", () => {
    render(<Input label="Clave" type="password" name="clave" />);
    const input = screen.getByLabelText("Clave");
    expect(input.type).toBe("password");
  });
});
