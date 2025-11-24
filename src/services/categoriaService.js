import { get, post, put, del } from "./api";

export const getCategorias = () => get("/categorias");

export const createCategoria = (data) =>
    post("/categorias", data);

export const updateCategoria = (id, data) =>
    put(`/categorias/${id}`, data);

export const deleteCategoria = (id) =>
    del(`/categorias/${id}`);
