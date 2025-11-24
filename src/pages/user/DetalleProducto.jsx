import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import { getProductoById } from "../../services/productService";
import { notifySuccess } from "../../components/atoms/Notification";
import { Loader } from "../../components/atoms/Loader";
import "../../styles/pages/user/detalle.css";

export const DetalleProducto = () => {
  const { id } = useParams();
  const { agregarAlCarrito } = useContext(CartContext);

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductoById(id)
      .then((data) => setProducto(data))
      .finally(() => setLoading(false));
  }, [id]);
  if (loading) {
    return (
      <main className="container text-center mt-5">
        <Loader />
      </main>
    );
  }

  if (!producto) {
    return (
      <main className="container text-center mt-5">
        <h1 className="titulo">Producto no encontrado</h1>
        <Link to="/productos">
          <button className="btn btn-primary mt-3">Volver a Productos</button>
        </Link>
      </main>
    );
  }

  const img = producto.imagenes?.[0]?.url || "https://placehold.co/600x400";

  return (
    <main className="container mt-5 detalle-producto">
      <div className="card producto-card mx-auto p-4">
        <div className="row align-items-center">
          <div className="col-md-6 text-center">
            <img src={img} alt={producto.nombre} className="img-fluid rounded" />
          </div>

          <div className="col-md-6 text-start">
            <h2 className="titulo mb-3">{producto.nombre}</h2>

            <p><strong>Descripción:</strong> {producto.descripcion}</p>

            <p><strong>Categoría:</strong> {producto.categoria?.nombre_categoria}</p>

            <p><strong>Sabor:</strong> {producto.sabor?.nombre_sabor}</p>

            <h4 className="precio mt-3">
              Precio: ${Number(producto.precio).toLocaleString()}
            </h4>

            <button
              className="btn btn-primary mt-4 w-100"
              onClick={() => {
                agregarAlCarrito(producto);
                notifySuccess(`${producto.nombre} agregado al carrito`);
              }}
            >
              Agregar al carrito
            </button>

            <Link to="/carrito" className="btn btn-outline-primary mt-3 w-100">
              Ver carrito
            </Link>

            <Link to="/productos" className="btn btn-outline-secondary mt-3 w-100">
              ← Volver a Productos
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
