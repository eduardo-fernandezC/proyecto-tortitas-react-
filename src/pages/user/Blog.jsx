import React from "react";
import { Title } from "../../components/atoms/Title";
import "../../styles/pages/user/blog.css";
;

import logoTortitas from "../../assets/images/logo.webp";
import cake from "../../assets/images/cake.webp";
import trufa from "../../assets/images/trufa.webp";
import emoCake from "../../assets/images/emoCake.webp";


export const Blog = () => {
  const posts = [
    {
      id: 1,
      titulo: "Cómo hacemos nuestras tortitas",
      fecha: "15 de octubre 2025",
      imagen: cake,
      texto: `
        En TORTITAS.CL elaboramos cada torta de manera artesanal,
        utilizando ingredientes seleccionados y recetas familiares.
        Cada bizcocho se hornea con cuidado, y decoramos cada creación
        con amor y dedicación.
      `,
    },
    {
      id: 2,
      titulo: "5 tips para conservar tus tortas frescas",
      fecha: "22 de septiembre 2025",
      imagen: emoCake,
      texto: `
        Guarda tus tortas en un lugar fresco y seco, lejos del sol.
        Si contienen crema, refrigéralas en un recipiente hermético.
      `,
    },
    {
      id: 3,
      titulo: "Los sabores más pedidos del mes",
      fecha: "5 de agosto 2025",
      imagen: trufa,
      texto: `
        Este mes, nuestros clientes han elegido sus favoritos:
        el clásico chocolate intenso, la nueva torta de frutos rojos
        y la amada dulce de leche con crema.
      `,
    },
  ];

  return (
    <main className="container mt-5 mb-5 blog-page">
      <Title text="Blog de TORTITAS.CL" />

      <section className="blog-post reverse">
        <div className="blog-image">
          <img src={logoTortitas} alt="Logo Tortitas.CL" />
        </div>
        <div className="blog-content">
          <h2 className="titulo">¿QUIÉNES SOMOS?</h2>
          <p className="texto">
            En <strong>Tortitas.CL</strong> creemos que cada momento especial merece un toque dulce y único. 
            Somos una pastelería creativa que combina sabor, diseño y alegría en cada una de nuestras preparaciones. 
            Nuestro eslogan, <strong>“Lo mejor en repostería en Chile”</strong>, refleja nuestro compromiso: 
            ofrecer tortas que no solo sean deliciosas, sino también inolvidables.
          </p>
          <p className="texto">
            Nos especializamos en tortas bonitas, divertidas y personalizadas, pensadas para cada celebración. 
            En Tortitas no vendemos solo tortas, vendemos sonrisas, recuerdos y experiencias 
            que se disfrutan desde el primer bocado.
          </p>
        </div>
      </section>

      {posts.map((post, index) => (
        <section
          key={post.id}
          className={`blog-post ${index % 2 === 0 ? "reverse" : ""}`}
        >
          <div className="blog-image">
            <img src={post.imagen} alt={post.titulo} />
          </div>
          <div className="blog-content">
            <h2 className="titulo">{post.titulo}</h2>
            <p className="fecha">{post.fecha}</p>
            <p className="texto">{post.texto}</p>
          </div>
        </section>
      ))}
    </main>
  );
};
