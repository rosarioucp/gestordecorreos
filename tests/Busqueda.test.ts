import {describe, it, expect} from "vitest";
import {Contacto} from "../src/Contacto";
import {Correo} from "../src/Correo";
import {buscarCorreos} from "../src/Busqueda";

describe("Busqueda", () => {
    it("encuentra un correo por su asunto", () => {
        const belen = new Contacto("Belen", "belen@ucp.edu.ar");
        const correo1 = new Correo(belen, "Parcial del viernes", "Temas:..");
        const correo2 = new Correo(belen, "Cumpleaños", "El 21 de noviembre");
        const correos = [correo1, correo2];
        const resultado = buscarCorreos(correos, "Parcial");
        expect(resultado).toEqual([correo1]);
    });

    it("encuentra un correo aunque busque en mayuscula", () => {
        const belen = new Contacto("Belen", "belen@ucp.edu.ar");
        const correo1 = new Correo(belen, "Parcial del viernes", "Temas:..");
        const correos = [correo1];
        const resultado = buscarCorreos(correos, "PARC");
        expect(resultado).toEqual([correo1]);
    });
});