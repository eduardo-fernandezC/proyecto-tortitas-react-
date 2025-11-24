import { get, post } from "./api.js";

export const crearPedido = (pedidoData) => 
  post("/pedidos/crear", pedidoData);

export const getDireccionesUsuario = (idUsuario) => 
  get(`/usuarios/${idUsuario}/direcciones`);
