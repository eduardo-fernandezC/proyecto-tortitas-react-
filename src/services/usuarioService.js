import { get, post, put, del } from "./api";

export const loginUsuario = (email, password) =>
  post("/usuarios/login", { email, password });

export const registrarUsuario = (usuario) =>
  post("/usuarios", {
    nombre: usuario.nombre,
    apellido: usuario.apellido ?? "",
    email: usuario.email,
    telefono: usuario.telefono ?? "N/A",
    password: usuario.password, 
    rol: { id_rol: usuario.rol.id_rol }
  });

export const getUsuarios = () => get("/usuarios");

export const getUsuarioById = (id) => get(`/usuarios/${id}`);

export const updateUsuario = (id, data) => put(`/usuarios/${id}`, data);

export const deleteUsuario = (id) => del(`/usuarios/${id}`);

export const crearDireccion = (data) =>
  post("/direcciones", data);

export const updateDireccionPrincipal = (idUsuario, idDireccion) =>
  put(`/usuarios/${idUsuario}/direccion-principal`, {
    id_direccion: idDireccion,
  });

export const getRegiones = () => get("/regiones");

export const getComunasByRegion = (idRegion) =>
  get(`/comunas/region/${idRegion}`);
