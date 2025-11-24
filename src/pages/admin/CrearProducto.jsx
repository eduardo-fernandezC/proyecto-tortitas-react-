import React, { useEffect, useState } from "react";
import { getCategorias } from "../../services/categoriaService";
import { getSabores } from "../../services/saborService";
import { post } from "../../services/api";
import { uploadImagen } from "../../services/imagenService";
import { notifySuccess, notifyError } from "../../components/atoms/Notification";
import "../../styles/pages/admin/crearProducto.css";

export const CrearProducto = () => {
    const [categorias, setCategorias] = useState([]);
    const [sabores, setSabores] = useState([]);

    const [form, setForm] = useState({
        nombre: "",
        precio: "",
        descripcion: "",
        stock: 1,
        categoriaId: null,
        saborId: null,
    });

    const [imagen, setImagen] = useState(null);

    useEffect(() => {
        getCategorias().then(setCategorias);
        getSabores().then(setSabores);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validarCampos = () => {
        if (
            form.nombre.trim() === "" ||
            form.descripcion.trim() === "" ||
            form.precio === "" ||
            form.stock === "" ||
            form.categoriaId === null ||
            form.saborId === null
        ) {
            notifyError("Debes completar todos los campos");
            return false;
        }

        if (Number(form.precio) <= 0) {
            notifyError("El precio debe ser mayor a 0");
            return false;
        }

        if (Number(form.stock) < 0) {
            notifyError("El stock no puede ser negativo");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validarCampos()) {
            return;
        }

        const data = {
            nombre: form.nombre.trim(),
            descripcion: form.descripcion.trim(),
            precio: Number(form.precio),
            stock: Number(form.stock),
            categoriaId: Number(form.categoriaId),
            saborId: Number(form.saborId),
        };

        console.log("JSON ENVIADO AL BACKEND: ", JSON.stringify(data, null, 2));

        try {
            const producto = await post("/productos", data);

            notifySuccess("Producto creado correctamente");

            if (imagen) {
                await uploadImagen(producto.id_producto, imagen);
                notifySuccess("Imagen subida correctamente");
            }

        } catch (err) {
            console.error(err);
            notifyError("Error al crear el producto");
        }
    };

    return (
        <main className="form-container">
            <h1>Crear Producto</h1>

            <form onSubmit={handleSubmit} className="admin-form">

                <label>Nombre</label>
                <input
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    placeholder="Ej: Torta de Chocolate"
                />

                <label>Precio</label>
                <input
                    name="precio"
                    type="number"
                    value={form.precio}
                    onChange={handleChange}
                    placeholder="Ej: 15990"
                />

                <label>Descripción</label>
                <textarea
                    name="descripcion"
                    value={form.descripcion}
                    onChange={handleChange}
                    placeholder="Describe el producto"
                />

                <label>Stock</label>
                <input
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                />

                <label>Categoría</label>
                <select
                    name="categoriaId"
                    value={form.categoriaId}
                    onChange={handleChange}
                >
                    <option value={null}>Seleccione</option>
                    {categorias.map((c) => (
                        <option key={c.idCategoria} value={c.idCategoria}>
                            {c.nombre_categoria}
                        </option>
                    ))}
                </select>

                <label>Sabor</label>
                <select
                    name="saborId"
                    value={form.saborId}
                    onChange={handleChange}
                >
                    <option value={null}>Seleccione</option>
                    {sabores.map((s) => (
                        <option key={s.idSabor} value={s.idSabor}>
                            {s.nombre_sabor}
                        </option>
                    ))}
                </select>

                <label>Imagen</label>
                <input
                    type="file"
                    onChange={(e) => setImagen(e.target.files[0])}
                />

                <button className="btn btn-success mt-3">Crear</button>
            </form>
        </main>
    );
};
