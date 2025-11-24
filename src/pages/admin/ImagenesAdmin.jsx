import React, { useState, useEffect } from "react";
import { getProductos } from "../../services/productService";
import { uploadImagen } from "../../services/imagenService";
import { Loader } from "../../components/atoms/Loader";
import { notifySuccess, notifyError } from "../../components/atoms/Notification";

export const ImagenesAdmin = () => {
    const [productos, setProductos] = useState([]);
    const [idProducto, setIdProducto] = useState("");
    const [imagen, setImagen] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProductos().then(setProductos);
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!idProducto || !imagen) {
            notifyError("Selecciona producto e imagen");
            return;
        }

        setLoading(true);

        try {
            await uploadImagen(idProducto, imagen);
            notifySuccess("Imagen subida y asociada correctamente");
            setImagen(null);
            setIdProducto("");
        } catch (error) {
            notifyError("Error al subir imagen");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="container mt-4">
            <h1 className="mb-4">Subir Imágenes</h1>

            {loading && <Loader />}

            <form className="card p-4" onSubmit={handleUpload}>
                <div className="mb-3">
                    <label className="form-label">Producto</label>
                    <select
                        className="form-select"
                        value={idProducto}
                        onChange={(e) => setIdProducto(e.target.value)}
                    >
                        <option value="">Seleccione un producto</option>
                        {productos.map((p) => (
                            <option key={p.id_producto} value={p.id_producto}>
                                {p.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Imagen WebP</label>
                    <input
                        type="file"
                        accept=".webp"
                        className="form-control"
                        onChange={(e) => setImagen(e.target.files[0])}
                    />
                </div>

                <button className="btn btn-success" type="submit">
                    Subir Imagen
                </button>
            </form>
        </main>
    );
};
