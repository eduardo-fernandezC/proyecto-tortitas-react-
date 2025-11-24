import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../../../components/atoms/Button";

describe("Button Component", () => {

  it("renderiza el texto correctamente", () => {
    render(<Button text="Enviar" />);
    const boton = screen.getByRole("button");
    expect(boton.textContent).toBe("Enviar");
  });

  it("ejecuta onClick al hacer click", () => {
    const mockFn = jasmine.createSpy("onClick");
    render(<Button text="Click" onClick={mockFn} />);

    const boton = screen.getByText("Click");
    fireEvent.click(boton);

    expect(mockFn).toHaveBeenCalled();
  });

  it("aplica className adicional", () => {
    render(<Button text="Guardar" className="btn-extra" />);
    const boton = screen.getByText("Guardar");

    expect(boton.className.includes("btn-extra")).toBeTrue();
  });

  it("incluye siempre la clase base 'custom-btn'", () => {
    render(<Button text="OK" />);
    const boton = screen.getByText("OK");

    expect(boton.className.includes("custom-btn")).toBeTrue();
  });

  it("usa el tipo de botÃ³n especificado", () => {
    render(<Button text="Enviar" type="submit" />);
    const boton = screen.getByRole("button");

    expect(boton.getAttribute("type")).toBe("submit");
  });

});