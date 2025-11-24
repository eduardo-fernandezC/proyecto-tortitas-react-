import React, { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import "../../styles/pages/user/carrito.css";


export const Carrito = () => {
  const {
    carrito,
    aumentarCantidad,
    disminuirCantidad,
    eliminarProducto,
    vaciarCarrito,
    total,
  } = useContext(CartContext);

  if (carrito.length === 0) {
    return (
      <main className="carrito-vacio-container">
        <div className="carrito-vacio-box">
          <h2 className="carrito-title">Tu carrito está vacío</h2>

          <Link to="/productos" className="btn-comprar">
            Ver productos
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="carrito-container">
      <h2 className="carrito-title">Tu Carrito</h2>

      <div className="carrito-lista">
        {carrito.map((p) => (
          <div key={p.id_producto} className="carrito-card">
            <div className="carrito-info">
              <h3 className="carrito-nombre">{p.nombre}</h3>

              <p className="carrito-precio">
                Precio: ${p.precio.toLocaleString()}
              </p>

              <div className="carrito-cantidad">
                <button onClick={() => disminuirCantidad(p.id_producto)}>
                  -
                </button>

                <span>{p.cantidad}</span>

                <button onClick={() => aumentarCantidad(p.id_producto)}>
                  +
                </button>
              </div>
            </div>

            <button
              className="carrito-eliminar"
              onClick={() => eliminarProducto(p.id_producto)}
            >
              Eliminar
            </button>
          </div>
        ))}
      </div>

      <div className="carrito-total">
        <h3>Total: ${total.toLocaleString()}</h3>
      </div>

      <div className="carrito-buttons">
        <button className="btn-vaciar" onClick={vaciarCarrito}>
          Vaciar carrito
        </button>

        <Link to="/checkout" className="btn-comprar">
          Continuar compra
        </Link>
      </div>
    </main>
  );
};
