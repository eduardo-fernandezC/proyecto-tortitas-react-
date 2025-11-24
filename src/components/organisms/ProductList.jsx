import React from "react";
import { ProductCard } from "../molecules/ProductCard";

export const ProductList = ({ productos }) => {
  return (
    <div className="product-grid">
      {productos.map((producto) => (
        <ProductCard key={producto.id_producto} producto={producto} />
      ))}
    </div>
  );
};