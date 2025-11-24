import { get, post, put, del } from "./api";

export const getSabores = () => get("/sabores");

export const createSabor = (data) =>
    post("/sabores", data);

export const updateSabor = (id, data) =>
    put(`/sabores/${id}`, data);

export const deleteSabor = (id) =>
    del(`/sabores/${id}`);
