import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormField } from "../../../components/molecules/FormField";

describe("FormField Component", () => {
  it("renderiza la etiqueta correctamente", () => {
    render(<FormField label="Correo" name="email" />);
    expect(screen.getByText("Correo")).toBeTruthy();
  });

  it("renderiza el input con el nombre correcto", () => {
    render(<FormField label="Nombre" name="nombre" />);
    const input = screen.getByRole("textbox");
    expect(input.getAttribute("name")).toBe("nombre");
  });

  it("aplica correctamente el placeholder si existe", () => {
    render(
      <FormField
        label="Usuario"
        name="user"
        placeholder="Ingresa tu usuario"
      />
    );
    expect(screen.getByPlaceholderText("Ingresa tu usuario")).toBeTruthy();
  });

  it("pasa correctamente el tipo de input", () => {
    render(<FormField label="Clave" name="clave" type="password" />);
    const input = screen.getByLabelText("Clave");
    expect(input.type).toBe("password");
  });

  it("marca el campo como requerido", () => {
    render(<FormField label="Teléfono" name="phone" />);
    const input = screen.getByRole("textbox");
    expect(input).toBeRequired();
  });

  it("ejecuta correctamente la función onChange", () => {
    const fn = jasmine.createSpy("onChange");

    render(<FormField label="Correo" name="email" onChange={fn} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test@test.com" } });

    expect(fn).toHaveBeenCalled();
  });
});
