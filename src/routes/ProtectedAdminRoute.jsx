import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedAdminRoute = ({ children }) => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) return <Navigate to="/login" />;

  if (usuario.rol?.id_rol !== 1) return <Navigate to="/" />;

  return children;
};