import React from "react";
import { render, screen } from "@testing-library/react";
import { Loader } from "../../../components/atoms/Loader";

describe("Loader Component", () => {

  it("renderiza el contenedor principal", () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toBeTruthy();
  });

  it("renderiza correctamente el spinner (div con la clase loader)", () => {
    render(<Loader />);
    const loader = document.querySelector(".loader");
    expect(loader).toBeTruthy();
  });

  it("contiene las clases de alineación correctas", () => {
    const { container } = render(<Loader />);
    const wrapper = container.firstChild;

    expect(wrapper.classList.contains("d-flex")).toBeTrue();
    expect(wrapper.classList.contains("flex-column")).toBeTrue();
    expect(wrapper.classList.contains("align-items-center")).toBeTrue();
  });

});
