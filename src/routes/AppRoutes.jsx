import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "../pages/user/Home";
import { Productos } from "../pages/user/Productos";
import { DetalleProducto } from "../pages/user/DetalleProducto";
import { Contacto } from "../pages/user/Contacto";
import { Blog } from "../pages/user/Blog";
import { Carrito } from "../pages/user/Carrito";
import { Checkout } from "../pages/user/Checkout";
import { Confirmacion } from "../pages/user/Confirmacion";
import { Perfil } from "../pages/user/Perfil";

import { Login } from "../pages/auth/Login";
import { Registro } from "../pages/auth/Registro";

import { Header } from "../components/organisms/Header";
import { Footer } from "../components/organisms/Footer";

import { ProtectedAdminRoute } from "./ProtectedAdminRoute";
import { PanelAdmin } from "../pages/admin/PanelAdmin";
import { ProductosAdmin } from "../pages/admin/ProductosAdmin";
import { CrearProducto } from "../pages/admin/CrearProducto";
import { EditarProducto } from "../pages/admin/EditarProducto";
import { CategoriasAdmin } from "../pages/admin/CategoriasAdmin";
import { SaboresAdmin } from "../pages/admin/SaboresAdmin";
import { ImagenesAdmin } from "../pages/admin/ImagenesAdmin";
import { UsuariosAdmin } from "../pages/admin/UsuariosAdmin";


export const AppRoutes = () => (
  <BrowserRouter>
    <Header />

    <Routes>
      {}
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/detalle/:id" element={<DetalleProducto />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/confirmacion" element={<Confirmacion />} />
      <Route path="/perfil" element={<Perfil />} />

      {}
      <Route path="/admin" element={<ProtectedAdminRoute><PanelAdmin /></ProtectedAdminRoute>} />
      <Route path="/admin/productos" element={<ProtectedAdminRoute><ProductosAdmin /></ProtectedAdminRoute>} />
      <Route path="/admin/productos/crear" element={<ProtectedAdminRoute><CrearProducto /></ProtectedAdminRoute>} />
      <Route path="/admin/productos/editar/:id" element={<ProtectedAdminRoute><EditarProducto /></ProtectedAdminRoute>} />
      <Route path="/admin/categorias" element={<ProtectedAdminRoute><CategoriasAdmin /></ProtectedAdminRoute>} />
      <Route path="/admin/sabores" element={<ProtectedAdminRoute><SaboresAdmin /></ProtectedAdminRoute>} />
      <Route path="/admin/imagenes" element={<ProtectedAdminRoute><ImagenesAdmin /></ProtectedAdminRoute>} />
      <Route path="/admin/usuarios" element={<ProtectedAdminRoute><UsuariosAdmin /></ProtectedAdminRoute>} />
    </Routes>

    <Footer />
  </BrowserRouter>
);