import {describe, it, expect} from "vitest";
import {Contacto} from "../src/Contacto";
import {Correo} from "../src/Correo";
import {asuntosDe, correosCondicion} from "../src/Estadisticas";
import {esFavorito} from "../src/Predicados";

describe("Estadisticas", () => {
    it("asuntosDe devuelve los asuntos de los correos, en orden", () => {
        const liliana = new Contacto("Liliana", "lili@ucp.edu.ar");
        const parcial = new Correo(liliana, "Parcial", "El sabado");
        const aviso = new Correo(liliana, "Aviso", "No hay clase");
        expect(asuntosDe([parcial, aviso])).toEqual(["Parcial", "Aviso"]);
        expect(asuntosDe([])).toEqual([]);
    });

    it("correosCondiciondevuelve los correos que cumplen el predicado", () => {
    const liliana = new Contacto("Liliana", "lili@ucp.edu.ar");
    const favorito = new Correo(liliana, "Viaje", "Los pasajes");
    const comun = new Correo(liliana, "Aviso", "No hay clase");
    favorito.marcarFavorito();
    expect(correosCondicion([favorito, comun], esFavorito())).toEqual([favorito]);
    expect(correosCondicion([], esFavorito())).toEqual([]);
});
});