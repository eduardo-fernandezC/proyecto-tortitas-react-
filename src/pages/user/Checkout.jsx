import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { crearPedido } from "../../services/carritoService";
import { getDireccionesByUsuario } from "../../services/direccionService";

import { CartContext } from "../../Context/CartContext";

import "../../styles/pages/user/checkout.css";

export const Checkout = () => {
  const navigate = useNavigate();

  const { carrito, total, vaciarCarrito } = useContext(CartContext);

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const idUsuario = usuario?.id_usuario;

  const [tipoEntrega, setTipoEntrega] = useState("DOMICILIO");
  const [metodoPago, setMetodoPago] = useState("TRANSFERENCIA");
  const [direcciones, setDirecciones] = useState([]);
  const [direccionTexto, setDireccionTexto] = useState("");

  useEffect(() => {
    if (!idUsuario) return;

    getDireccionesByUsuario(idUsuario)
      .then((res) => setDirecciones(res || []))
      .catch((err) => console.error("Error cargando direcciones:", err));
  }, [idUsuario]);

  const handleConfirmar = async () => {
    try {
      if (!usuario) {
        alert("Debes iniciar sesión para confirmar la compra.");
        return;
      }

      const direccionFinal =
        tipoEntrega === "RETIRO"
          ? "Retiro en local"
          : direccionTexto.trim() !== ""
          ? direccionTexto
          : "Sin dirección";

      const pedidoData = {
        idUsuario,
        direccionEnvio: direccionFinal,
        metodoPago,
        tipoEntrega,
        items: carrito.map((item) => ({
          idProducto: item.id_producto,
          cantidad: item.cantidad,
        })),
      };

      console.log("📦 Pedido final que se enviará:", pedidoData);

      const respuesta = await crearPedido(pedidoData);

      if (respuesta) {
        vaciarCarrito();

        navigate("/confirmacion", {
          state: {
            form: {
              nombre: usuario.nombre,
              correo: usuario.email,
              direccion: direccionFinal,
              tipoEntrega,
            },
            total,
          },
        });
      }
    } catch (error) {
      console.error("Error al crear pedido:", error);
      alert("Hubo un error al procesar el pedido.");
    }
  };

  return (
    <main className="checkout-container">
      <h1 className="checkout-title">Completa tu compra</h1>

      <div className="checkout-grid">
        <div className="checkout-left">

          <div className="checkout-section">
            <label className="checkout-label">Tipo de entrega</label>
            <select
              className="checkout-input"
              value={tipoEntrega}
              onChange={(e) => setTipoEntrega(e.target.value)}
            >
              <option value="DOMICILIO">Envío a domicilio</option>
              <option value="RETIRO">Retiro en local</option>
            </select>
          </div>

          {tipoEntrega === "DOMICILIO" && (
            <div className="checkout-section">
              <label className="checkout-label">Dirección de envío</label>
              <input
                type="text"
                placeholder="Ej: Av. Los Dulces 1234"
                className="checkout-input"
                value={direccionTexto}
                onChange={(e) => setDireccionTexto(e.target.value)}
              />
            </div>
          )}

          <div className="checkout-section">
            <label className="checkout-label">Método de pago</label>
            <select
              className="checkout-input"
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
            >
              <option value="TRANSFERENCIA">Transferencia bancaria</option>
              <option value="EFECTIVO">Efectivo</option>
            </select>
          </div>

          <button onClick={() => navigate(-1)} className="checkout-back">
            Volver
          </button>
        </div>

        <div className="checkout-right">
          <h3 className="checkout-subtitle">Resumen del pedido</h3>

          <div className="checkout-resumen-box">
            {carrito.map((item) => (
              <div key={item.id_producto} className="checkout-item">
                <span>
                  {item.nombre} × {item.cantidad}
                </span>
                <span>${(item.precio * item.cantidad).toLocaleString()}</span>
              </div>
            ))}

            <div className="checkout-total">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      <button onClick={handleConfirmar} className="checkout-button">
        Confirmar compra
      </button>
    </main>
  );
};
