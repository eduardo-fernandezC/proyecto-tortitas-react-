import React from "react";
import { render, screen } from "@testing-library/react";
import { LoaderFullscreen } from "../../../components/atoms/LoaderFullscreen";

describe("LoaderFullscreen Component", () => {

  it("renderiza el contenedor fullscreen", () => {
    const { container } = render(<LoaderFullscreen />);

    const wrapper = container.querySelector(".loader-fullscreen");
    expect(wrapper).toBeTruthy();
  });

  it("incluye el Loader interno", () => {
    render(<LoaderFullscreen />);

    const loader = document.querySelector(".loader");
    expect(loader).toBeTruthy();
  });

  it("muestra el texto por defecto 'Cargando...'", () => {
    render(<LoaderFullscreen />);

    expect(screen.getByText("Cargando...")).toBeTruthy();
  });

  it("muestra un texto personalizado si se pasa como prop", () => {
    render(<LoaderFullscreen text="Procesando pedido..." />);

    expect(screen.getByText("Procesando pedido...")).toBeTruthy();
  });
});
