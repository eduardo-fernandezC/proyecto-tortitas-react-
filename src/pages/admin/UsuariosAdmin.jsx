import React, { useEffect, useState } from "react";
import { getUsuarios, deleteUsuario } from "../../services/usuarioService";

export const UsuariosAdmin = () => {
    const [usuarios, setUsuarios] = useState([]);

    const cargar = () => getUsuarios().then(setUsuarios);

    useEffect(() => {
        cargar();
    }, []);

    return (
        <main className="container mt-4">
            <h1>Usuarios</h1>

            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Correo</th>
                        <th>Nombre</th>
                        <th>Rol</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((u) => (
                        <tr key={u.id_usuario}>
                            <td>{u.id_usuario}</td>
                            <td>{u.email}</td>
                            <td>{u.nombre}</td>
                            <td>{u.rol?.nombre}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={async () => {
                                        await deleteUsuario(u.id_usuario);
                                        cargar();
                                    }}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};
