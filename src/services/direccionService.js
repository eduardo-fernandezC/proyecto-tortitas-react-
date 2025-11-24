import { get } from "./api.js";

export const getDireccionesByUsuario = (idUsuario) =>
  get(`/direcciones/usuario/${idUsuario}`);
