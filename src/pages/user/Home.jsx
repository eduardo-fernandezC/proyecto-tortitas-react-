import React, { useEffect, useState } from "react";
import { CarouselHome } from "../../components/organisms/CarouselHome";
import { getProductos } from "../../services/productService";
import { Loader } from "../../components/atoms/Loader";
import "../../styles/pages/user/home.css";

export const Home = () => {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    getProductos().then((data) => {
      const top = data.slice(0, 5).map((p) => ({
        id: p.id_producto,
        src: p.imagenes?.[0]?.url || "https://placehold.co/900x400",
        title: p.nombre,
      }));

      setDestacados(top);
    });
  }, []);

  return (
    <main className="container text-center mt-5">
      <h1 className="titulo home-title">Productos Destacados</h1>

      {destacados.length > 0 ? (
        <CarouselHome images={destacados} />
      ) : (
        <Loader />
      )}
    </main>
  )
};
