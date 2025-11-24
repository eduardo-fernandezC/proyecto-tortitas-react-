import React, { useEffect, useState } from "react";
import { Title } from "../../components/atoms/Title";
import { ProductList } from "../../components/organisms/ProductList";
import { Loader } from "../../components/atoms/Loader";

import { 
  getProductos, 
  getProductosByCategoria, 
  getProductosBySabor 
} from "../../services/productService";

import { getCategorias } from "../../services/categoriaService";
import { getSabores } from "../../services/saborService";

import "../../styles/pages/user/productos.css";

export const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [sabores, setSabores] = useState([]);

  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [saborFiltro, setSaborFiltro] = useState("");

  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    setCargando(true);

    Promise.all([
      getProductos(),
      getCategorias(),
      getSabores()
    ]).then(([prods, cats, sabs]) => {
      setProductos(prods);
      setCategorias(cats);
      setSabores(sabs);
      setCargando(false);
    });
  }, []);

  const manejarFiltroCategoria = (e) => {
    const id = e.target.value;
    setCategoriaFiltro(id);
    setCargando(true);

    const accion = id === "" ? getProductos() : getProductosByCategoria(id);
    accion.then((res) => {
      setProductos(res);
      setCargando(false);
    });
  };

  const manejarFiltroSabor = (e) => {
    const id = e.target.value;
    setSaborFiltro(id);
    setCargando(true);

    const accion = id === "" ? getProductos() : getProductosBySabor(id);
    accion.then((res) => {
      setProductos(res);
      setCargando(false);
    });
  };

  return (
    <main className="container mt-5 productos-page">
      <Title text="Nuestros Productos" />

      <select
        className="form-select mb-3 w-25"
        value={categoriaFiltro}
        onChange={manejarFiltroCategoria}
      >
        <option value="">Todas las categorías</option>
        {categorias.map((cat) => (
          <option key={cat.idCategoria} value={cat.idCategoria}>
            {cat.nombre_categoria}
          </option>
        ))}
      </select>

      <select
        className="form-select mb-4 w-25"
        value={saborFiltro}
        onChange={manejarFiltroSabor}
      >
        <option value="">Todos los sabores</option>
        {sabores.map((s) => (
          <option key={s.idSabor} value={s.idSabor}>
            {s.nombre_sabor}
          </option>
        ))}
      </select>

      {cargando ? (
        <Loader />
      ) : (
        <ProductList productos={productos} />
      )}
    </main>
  );
};
