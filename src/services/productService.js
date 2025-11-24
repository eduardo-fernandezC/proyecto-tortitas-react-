import { get, post, put, del } from "./api";

export const getProductos = () => get("/productos");

export const getProductoById = (id) => get(`/productos/${id}`);

export const getProductosByCategoria = (idCategoria) =>
    get(`/productos/categoria/${idCategoria}`);

export const getProductosBySabor = (idSabor) =>
    get(`/productos/sabor/${idSabor}`);

export const createProducto = (data) =>
    post("/productos", data);

export const updateProducto = (id, data) =>
    put(`/productos/${id}`, data);

export const deleteProducto = (id) =>
    del(`/productos/${id}`);
