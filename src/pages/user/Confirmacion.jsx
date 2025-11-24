import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Title } from "../../components/atoms/Title";
import { Button } from "../../components/atoms/Button";
import "../../styles/pages/user/checkout.css";

export const Confirmacion = () => {
  const location = useLocation();
  const data = location.state;

  if (!data) {
    return (
      <main className="container text-center mt-5">
        <Title text="No se encontró tu pedido" />
        <p className="mt-3 fs-5">
          Puede que hayas recargado la página o todavía no completes una compra.
        </p>
        <Link to="/productos">
          <Button text="Ir a la tienda" className="mt-3" />
        </Link>
      </main>
    );
  }

  const { form, total } = data;

  return (
    <main className="container text-center mt-5 mb-5">
      <div
        className="card confirmacion-card mx-auto p-5"
        style={{ maxWidth: "600px" }}
      >
        <Title text="¡Gracias por tu compra!" />

        <p className="mt-3 fs-5">
          Tu pedido ha sido procesado correctamente.
        </p>

        <h5 className="mt-4">Detalles del pedido</h5>

        <ul className="list-group mt-3 text-start">
          <li className="list-group-item">
            <strong>Nombre:</strong> {form.nombre}
          </li>
          <li className="list-group-item">
            <strong>Correo:</strong> {form.correo}
          </li>
          <li className="list-group-item">
            <strong>Tipo de entrega:</strong> {form.tipoEntrega}
          </li>
          <li className="list-group-item">
            <strong>Dirección:</strong> {form.direccion}
          </li>
          <li className="list-group-item d-flex justify-content-between fw-bold">
            <span>Total:</span>
            <span>${total.toLocaleString()}</span>
          </li>
        </ul>

        <Link to="/">
          <Button text="Volver al inicio" className="mt-4" />
        </Link>
      </div>
    </main>
  );
};
