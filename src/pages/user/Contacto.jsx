import React, { useState } from "react";
import { Title } from "../../components/atoms/Title";
import { Button } from "../../components/atoms/Button";
import { FormField } from "../../components/molecules/FormField";
import { notifyError, notifySuccess } from "../../components/atoms/Notification";
import "../../styles/pages/user/contacto.css";


export const Contacto = () => {
  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.nombre.trim()) return notifyError("El nombre es obligatorio.");
    if (form.nombre.length > 100)
      return notifyError("El nombre no puede tener más de 100 caracteres.");

    if (!form.correo.trim()) return notifyError("El correo es obligatorio.");
    if (form.correo.length > 100)
      return notifyError("El correo no puede tener más de 100 caracteres.");
    if (
      !/^[\w.-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(form.correo)
    )
      return notifyError(
        "Solo se aceptan correos @duoc.cl, @profesor.duoc.cl o @gmail.com."
      );

    if (form.telefono && !/^[0-9]+$/.test(form.telefono))
      return notifyError("El teléfono solo debe contener números.");

    if (form.asunto.length < 5 || form.asunto.length > 60)
      return notifyError("El asunto debe tener entre 5 y 60 caracteres.");

    if (form.mensaje.length > 500)
      return notifyError("El mensaje no puede superar los 500 caracteres.");

    notifySuccess("Mensaje enviado correctamente.");
    setEnviado(true);
    setForm({ nombre: "", correo: "", telefono: "", asunto: "", mensaje: "" });
  };

  return (
    <main className="container mt-5 contacto-page">
      <Title text="Contáctanos" />
      {!enviado ? (
        <form
          onSubmit={handleSubmit}
          className="contacto-form mx-auto shadow-sm p-4 rounded"
        >
          <FormField
            label="Nombre"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
          />
          <FormField
            label="Correo electrónico"
            name="correo"
            type="email"
            value={form.correo}
            onChange={handleChange}
          />
          <FormField
            label="Teléfono"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
          />
          <FormField
            label="Asunto"
            name="asunto"
            value={form.asunto}
            onChange={handleChange}
          />
          <div className="mb-3 text-start">
            <label htmlFor="mensaje" className="form-label fw-bold">
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={form.mensaje}
              onChange={handleChange}
              className="form-control"
              rows="4"
              required
            ></textarea>
          </div>
          <Button text="Enviar mensaje" type="submit" className="w-100" />
        </form>
      ) : (
        <div className="text-center enviado mt-5">
          <h3>Mensaje enviado</h3>
          <p>
            Gracias por contactarte con nosotros, te responderemos pronto.
          </p>
          <Button
            text="Enviar otro mensaje"
            onClick={() => setEnviado(false)}
            className="mt-2"
          />
        </div>
      )}
    </main>
  );
};
