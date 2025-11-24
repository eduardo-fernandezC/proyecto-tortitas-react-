import { useState } from "react";

import { Title } from "../../components/atoms/Title";
import { Button } from "../../components/atoms/Button";
import { FormField } from "../../components/molecules/FormField";
import { notifyError, notifySuccess } from "../../components/atoms/Notification";

import { loginUsuario } from "../../services/usuarioService";

import "../../styles/pages/auth/login.css";

export const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return notifyError("Completa todos los campos.");
    }

    try {
      const usuario = await loginUsuario(form.email, form.password);
      notifySuccess(`Bienvenido ${usuario.nombre}`);

      localStorage.setItem("usuario", JSON.stringify(usuario));

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      notifyError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <main className="container login-page d-flex justify-content-center align-items-center">
      <div className="card login-card shadow p-4">
        <Title text="Iniciar Sesión" />

        <form onSubmit={handleSubmit}>
          <FormField
            label="Correo electrónico"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          <FormField
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          <Button text="Iniciar sesión" type="submit" className="w-100 mt-3" />
        </form>

        <p className="mt-4 text-center">
          ¿No tienes cuenta?{" "}
          <a href="/registro" className="link">
            Regístrate aquí
          </a>
        </p>
      </div>
    </main>
  );
};