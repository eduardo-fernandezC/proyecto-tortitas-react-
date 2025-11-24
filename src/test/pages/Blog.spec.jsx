import React from "react";
import { render, screen } from "@testing-library/react";
import { Blog } from "../../pages/user/Blog";

describe("Página Blog", () => {

    beforeEach(() => {
        render(<Blog />);
    });

    it("renderiza el título principal del blog", () => {
        expect(screen.getByText("Blog de TORTITAS.CL")).toBeTruthy();
    });

    it("renderiza las cuatro secciones del blog (incluye ¿QUIÉNES SOMOS?)", () => {
        const headers = screen.getAllByRole("heading", { level: 2 });

        const textosEsperados = [
            "¿QUIÉNES SOMOS?",
            "Cómo hacemos nuestras tortitas",
            "5 tips para conservar tus tortas frescas",
            "Los sabores más pedidos del mes",
        ];

        const encontrados = headers.map((h) => h.textContent.trim());

        textosEsperados.forEach((t) => {
            expect(encontrados).toContain(t);
        });

        expect(encontrados.length).toBe(4);
    });

    it("renderiza las imágenes correctas con su alt", () => {
        const imagenes = screen.getAllByRole("img");

        expect(imagenes.length).toBe(4);

        expect(imagenes[0].alt).toBe("Logo Tortitas.CL");
        expect(imagenes[1].alt).toBe("Cómo hacemos nuestras tortitas");
        expect(imagenes[2].alt).toBe("5 tips para conservar tus tortas frescas");
        expect(imagenes[3].alt).toBe("Los sabores más pedidos del mes");
    });
});
