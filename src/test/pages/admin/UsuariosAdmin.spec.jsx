import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UsuariosAdmin } from "../../../pages/admin/UsuariosAdmin";

import * as usuarioService from "../../../services/usuarioService";

describe("UsuariosAdmin Page", () => {
  const mockUsuarios = [
    {
      id_usuario: 1,
      email: "admin@test.com",
      nombre: "Admin",
      rol: { nombre: "ADMIN" },
    },
    {
      id_usuario: 2,
      email: "cliente@test.com",
      nombre: "Cliente",
      rol: { nombre: "USUARIO" },
    },
  ];

  beforeEach(() => {
    spyOn(usuarioService, "getUsuarios").and.returnValue(
      Promise.resolve(mockUsuarios)
    );

    spyOn(usuarioService, "deleteUsuario").and.returnValue(
      Promise.resolve(true)
    );
  });

  const renderPage = () => render(<UsuariosAdmin />);

  it("renderiza el título correctamente", () => {
    renderPage();
    expect(screen.getByText("Usuarios")).toBeTruthy();
  });

  it("carga y muestra usuarios en la tabla", async () => {
    renderPage();

    expect(await screen.findByText("admin@test.com")).toBeTruthy();
    expect(await screen.findByText("cliente@test.com")).toBeTruthy();
  });

  it("muestra los roles correctamente", async () => {
    renderPage();

    expect(await screen.findByText("ADMIN")).toBeTruthy();
    expect(await screen.findByText("USUARIO")).toBeTruthy();
  });

  it("llama a deleteUsuario al hacer clic en Eliminar", async () => {
    renderPage();

    const botonesEliminar = await screen.findAllByText("Eliminar");

    fireEvent.click(botonesEliminar[0]);

    await waitFor(() => {
      expect(usuarioService.deleteUsuario).toHaveBeenCalledWith(1);
    });
  });
});
