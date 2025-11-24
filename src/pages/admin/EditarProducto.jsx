import React, { useEffect, useState } from "react";
import { getProductoById } from "../../services/productService";
import { put } from "../../services/api";
import { getCategorias } from "../../services/categoriaService";
import { getSabores } from "../../services/saborService";
import { uploadImagen } from "../../services/imagenService";
import { notifySuccess, notifyError } from "../../components/atoms/Notification";
import { useParams } from "react-router-dom";
import "../../styles/pages/admin/editarProducto.css";

export const EditarProducto = () => {
    const { id } = useParams();
    const [form, setForm] = useState({});
    const [categorias, setCategorias] = useState([]);
    const [sabores, setSabores] = useState([]);
    const [imagen, setImagen] = useState(null);

    useEffect(() => {
        getProductoById(id).then(setForm);
        getCategorias().then(setCategorias);
        getSabores().then(setSabores);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await put(`/productos/${id}`, form);
            notifySuccess("Producto editado!");

            if (imagen) {
                await uploadImagen(id, imagen);
                notifySuccess("Imagen actualizada!");
            }
        } catch (err) {
            notifyError("Error al editar producto");
        }
    };

    return (
        <main className="form-container">
            <h1>Editar Producto</h1>

            <form onSubmit={handleSubmit} className="admin-form">
                <label>Nombre</label>
                <input name="nombre" value={form.nombre || ""} onChange={handleChange} />

                <label>Precio</label>
                <input name="precio" type="number" value={form.precio || ""} onChange={handleChange} />

                <label>Descripción</label>
                <textarea name="descripcion" value={form.descripcion || ""} onChange={handleChange} />

                <label>Categoría</label>
                <select name="id_categoria" value={form.id_categoria || ""} onChange={handleChange}>
                    {categorias.map(c => (
                        <option key={c.id_categoria} value={c.id_categoria}>
                            {c.nombre_categoria}
                        </option>
                    ))}
                </select>

                <label>Sabor</label>
                <select name="id_sabor" value={form.id_sabor || ""} onChange={handleChange}>
                    {sabores.map(s => (
                        <option key={s.id_sabor} value={s.id_sabor}>
                            {s.nombre_sabor}
                        </option>
                    ))}
                </select>

                <label>Imagen nueva (opcional)</label>
                <input type="file" onChange={(e) => setImagen(e.target.files[0])} />

                <button className="btn btn-primary mt-3">Guardar cambios</button>
            </form>
        </main>
    );
};
