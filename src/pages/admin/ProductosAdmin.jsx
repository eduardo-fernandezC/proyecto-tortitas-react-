import React, { useEffect, useState } from "react";
import { getProductos, deleteProducto } from "../../services/productService";
import { Link } from "react-router-dom";
import { Button } from "../../components/atoms/Button";
import { notifySuccess, notifyError } from "../../components/atoms/Notification";
import "../../styles/pages/admin/productosadmin.css";

export const ProductosAdmin = () => {
    const [productos, setProductos] = useState([]);

    const cargar = () => {
        getProductos()
            .then(setProductos)
            .catch(() => notifyError("Error al cargar productos"));
    };

    useEffect(() => {
        cargar();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteProducto(id);
            notifySuccess("Producto eliminado");
            cargar();
        } catch {
            notifyError("No se pudo eliminar");
        }
    };

    return (
        <main className="productos-admin-container">
            <div className="prod-admin-header">
                <h1>Gestión de Productos</h1>

                <Link to="/admin/productos/crear" className="btn btn-success">
                    + Crear Producto
                </Link>
            </div>

            <table className="table table-hover mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Categoría</th>
                        <th>Sabor</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((p) => (
                        <tr key={p.id_producto}>
                            <td>{p.id_producto}</td>

                            <td>
                                <img
                                    src={p.imagenes?.[0]?.url || "https://placehold.co/80"}
                                    className="prod-admin-img"
                                />
                            </td>

                            <td>{p.nombre}</td>
                            <td>${p.precio.toLocaleString()}</td>
                            <td>{p.categoria?.nombre_categoria}</td>
                            <td>{p.sabor?.nombre_sabor}</td>

                            <td>
                                <Link
                                    to={`/admin/productos/editar/${p.id_producto}`}
                                    className="btn btn-primary btn-sm me-2"
                                >
                                    Editar
                                </Link>

                                <Button
                                    text="Eliminar"
                                    className="btn-danger btn-sm"
                                    onClick={() => handleDelete(p.id_producto)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};
