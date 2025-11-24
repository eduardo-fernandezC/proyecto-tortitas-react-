import React from "react";
import { render, screen } from "@testing-library/react";
import {
  notifySuccess,
  notifyError,
  notifyInfo,
  NotificationContainer,
} from "../../../components/atoms/Notification";
import { act } from "react-dom/test-utils";

describe("Notification Component", () => {

  beforeEach(() => {
    document.body.innerHTML = "";
    render(<NotificationContainer />);
  });

  it("renderiza el contenedor correctamente", () => {
    const container = document.querySelector(".Toastify");
    expect(container).toBeTruthy();
  });

  it("muestra una notificación de éxito", async () => {
    await act(() => {
      notifySuccess("Guardado con éxito");
    });

    expect(screen.getByText("Guardado con éxito")).toBeTruthy();
  });

  it("muestra una notificación de error", async () => {
    await act(() => {
      notifyError("Hubo un error");
    });

    expect(screen.getByText("Hubo un error")).toBeTruthy();
  });

  it("muestra una notificación informativa", async () => {
    await act(() => {
      notifyInfo("Información importante");
    });

    expect(screen.getByText("Información importante")).toBeTruthy();
  });

});
