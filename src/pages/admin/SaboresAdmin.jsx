import React, { useEffect, useState } from "react";
import {
    getSabores,
    createSabor,
    deleteSabor
} from "../../services/saborService";

export const SaboresAdmin = () => {
    const [sabores, setSabores] = useState([]);
    const [nombre, setNombre] = useState("");

    const cargar = () => getSabores().then(setSabores);

    useEffect(() => {
        cargar();
    }, []);

    const handleCrear = async () => {
        if (!nombre.trim()) return;
        await createSabor({ nombre_sabor: nombre });
        setNombre("");
        cargar();
    };

    return (
        <main className="container mt-4">
            <h1>Sabores</h1>

            <div className="card p-3 mb-3">
                <label>Nuevo sabor</label>
                <input
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <button className="btn btn-success mt-2" onClick={handleCrear}>
                    Crear
                </button>
            </div>

            <ul className="list-group">
                {sabores.map((s) => (
                    <li key={s.idSabor} className="list-group-item d-flex justify-content-between">
                        {s.nombre_sabor}
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteSabor(s.idSabor).then(cargar)}
                        >
                            Eliminar
                        </button>
                    </li>
                ))}
            </ul>
        </main>
    );
};
