import React, { useEffect, useState } from "react";
import {
    getCategorias,
    createCategoria,
    deleteCategoria
} from "../../services/categoriaService";

export const CategoriasAdmin = () => {
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const cargar = () => {
        getCategorias().then(setCategorias);
    };

    useEffect(() => {
        cargar();
    }, []);

    const handleCrear = async () => {
        if (!nombre.trim()) return alert("Nombre requerido");

        await createCategoria({
            nombre_categoria: nombre,
            descripcion: descripcion
        });

        setNombre("");
        setDescripcion("");
        cargar();
    };

    return (
        <main className="container mt-4">
            <h1>Categorías</h1>

            <div className="card p-3 mb-3">
                <label>Nombre</label>
                <input
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />

                <label className="mt-3">Descripción</label>
                <textarea
                    className="form-control"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />

                <button className="btn btn-success mt-3" onClick={handleCrear}>
                    Crear
                </button>
            </div>

            <ul className="list-group">
                {categorias.map((c) => (
                    <li
                        key={c.idCategoria}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <div>
                            <strong>{c.nombre_categoria}</strong>
                            <br />
                            <small>{c.descripcion}</small>
                        </div>

                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteCategoria(c.idCategoria).then(cargar)}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </main>
    );
};
