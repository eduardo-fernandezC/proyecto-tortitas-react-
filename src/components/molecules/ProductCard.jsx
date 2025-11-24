import React, { useContext } from "react";
import { Button } from "../atoms/Button";
import { Title } from "../atoms/Title";
import { Link } from "react-router-dom";
import "../../styles/components/molecules/productcard.css";
import { CartContext } from "../../Context/CartContext";

export const ProductCard = ({ producto }) => {
  const img = producto.imagenes?.[0]?.url || "https://placehold.co/400x300";
  const { agregarAlCarrito } = useContext(CartContext);

  return (
    <div className="product-card shadow-sm">
      <div className="product-image">
        <img src={img} alt={producto.nombre} />
      </div>

      <div className="product-body">
        <Title text={producto.nombre} size="h4" />

        <p className="text-muted m-0">
          Categoría: <strong>{producto.categoria?.nombre_categoria}</strong>
        </p>

        <p className="text-muted m-0">
          Sabor: <strong>{producto.sabor?.nombre_sabor}</strong>
        </p>

        <p className="text-muted mt-2">
          Precio: ${Number(producto.precio).toLocaleString()}
        </p>

        <div className="d-grid gap-2 mt-3">
          <Link to={`/detalle/${producto.id_producto}`}>
            <Button text="Ver detalle" className="w-100" />
          </Link>

          <Button
            text="Agregar al carrito"
            className="btn-success w-100"
            onClick={() => agregarAlCarrito(producto)}
          />
        </div>
      </div>
    </div>
  );
};
