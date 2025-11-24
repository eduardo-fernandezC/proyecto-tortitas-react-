import React from "react";
import { Link } from "react-router-dom";
import "../../styles/pages/admin/paneladmin.css";

export const PanelAdmin = () => {
    return (
        <main className="admin-container">
            <h1 className="admin-title">Panel de Administración</h1>

            <div className="admin-grid">
                <Link to="/admin/productos" className="admin-card">
                    <span className="material-symbols-outlined">cake</span>
                    <h3>Productos</h3>
                    <p>Crear, editar y eliminar productos</p>
                </Link>

                <Link to="/admin/categorias" className="admin-card">
                    <span className="material-symbols-outlined">category</span>
                    <h3>Categorías</h3>
                    <p>Gestiona categorías</p>
                </Link>

                <Link to="/admin/sabores" className="admin-card">
                    <span className="material-symbols-outlined">icecream</span>
                    <h3>Sabores</h3>
                    <p>Gestiona sabores</p>
                </Link>

                <Link to="/admin/imagenes" className="admin-card">
                    <span className="material-symbols-outlined">image</span>
                    <h3>Imágenes</h3>
                    <p>Sube imágenes de productos</p>
                </Link>

                <Link to="/admin/usuarios" className="admin-card">
                    <span className="material-symbols-outlined">group</span>
                    <h3>Usuarios</h3>
                    <p>Gestiona usuarios</p>
                </Link>
            </div>
        </main>
    );
};
