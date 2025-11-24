import React from "react";
import "../../styles/components/organisms/footer.css";

export const Footer = () => (
  <footer className="footer mt-5">
      <div className="container footer-content">
        <div className="footer-section">
          <h4 className="footer-title">TORTITAS.CL</h4>
          <p className="footer-text">
            Pastelería artesanal — endulzando momentos desde 2020.
          </p>
        </div>

        <div className="footer-section">
          <h5 className="footer-subtitle">Contacto</h5>
          <p>Av. Los Dulces 456, Santiago, Chile</p>
          <p>+56 9 8765 4321</p>
          <p>contacto@tortitas.cl</p>
        </div>

        <div className="footer-section">
          <h5 className="footer-subtitle">Horario</h5>
          <p>Lunes a Viernes: 9:00 – 19:00</p>
          <p>Sábados: 10:00 – 14:00</p>
          <p>Domingos: cerrado</p>
        </div>
      </div>

      <hr className="footer-divider" />

      <p className="footer-copy">
        © {new Date().getFullYear()} TORTITAS.CL — Todos los derechos reservados.
      </p>
    </footer>
);