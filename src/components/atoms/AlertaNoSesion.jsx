import React from "react";
import { Link } from "react-router-dom";
import "../../styles/components/atoms/alerta-no-sesion.css";

export const AlertaNoSesion = () => {
    return (
        <div className="alerta-no-sesion-container">
            <div className="alerta-no-sesion-box">
                <h3>Debes iniciar sesión</h3>
                <p>Para acceder a tu perfil, primero inicia sesión en tu cuenta.</p>
                
                <Link to="/login" className="btn btn-primary mt-3">
                    Ir a iniciar sesión
                </Link>
            </div>
        </div>
    );
};
