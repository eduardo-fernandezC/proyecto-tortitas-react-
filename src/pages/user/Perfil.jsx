import React, { useEffect, useState } from "react";
import { LoaderFullscreen } from "../../components/atoms/LoaderFullscreen";
import { AlertaNoSesion } from "../../components/atoms/AlertaNoSesion";

import {
    getUsuarioById,
    updateUsuario,
} from "../../services/usuarioService";

export const Perfil = () => {

    const idUsuario = JSON.parse(localStorage.getItem("usuario"))?.id_usuario;

    const [usuario, setUsuario] = useState(null);

    const [form, setForm] = useState({
        nombre: "",
        apellido: "",
        telefono: "",
    });

    useEffect(() => {
        if (!idUsuario) return;

        getUsuarioById(idUsuario).then((u) => {
            setUsuario(u);

            setForm({
                nombre: u.nombre,
                apellido: u.apellido,
                telefono: u.telefono,
            });
        });
    }, [idUsuario]);

    const handleChangeUser = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const guardarUsuario = async () => {
        const actualizado = {
            ...usuario,
            nombre: form.nombre,
            apellido: form.apellido,
            telefono: form.telefono,
        };

        await updateUsuario(idUsuario, actualizado);
        alert("Datos actualizados correctamente");
    };

    if (!idUsuario) return <AlertaNoSesion />;

    if (!usuario) return <LoaderFullscreen text="Cargando perfil..." />;

    return (
        <main className="container mt-5 mb-5">
            <h1>Mi Perfil</h1>
            <hr />

            {}
            <h3>Datos Personales</h3>

            <div className="row">
                <div className="col-md-6">

                    <label>Nombre</label>
                    <input
                        className="form-control"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleChangeUser}
                    />

                    <label className="mt-3">Apellido</label>
                    <input
                        className="form-control"
                        name="apellido"
                        value={form.apellido}
                        onChange={handleChangeUser}
                    />

                    <label className="mt-3">Teléfono</label>
                    <input
                        className="form-control"
                        name="telefono"
                        value={form.telefono}
                        onChange={handleChangeUser}
                    />

                    <button className="btn btn-primary mt-3" onClick={guardarUsuario}>
                        Guardar cambios
                    </button>
                </div>
            </div>

        </main>
    );
};
