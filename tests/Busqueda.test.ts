import {describe, it, expect} from "vitest";
import {Contacto} from "../src/Contacto";
import {Correo} from "../src/Correo";
import {buscarCorreos} from "../src/Busqueda";

describe("Busqueda", () => {
    it("encuentra un correo por su asunto", () => {
        const sofia = new Contacto("Sofia", "sofia@ucp.edu.ar");
        const correo1 = new Correo(sofia, "Parcial del viernes", "Temas:..");
        const correo2 = new Correo(sofia, "Cumpleaños", "El 21 de noviembre");
        const correos = [correo1, correo2];
        const resultado = buscarCorreos(correos, "Parcial");
        expect(resultado).toEqual([correo1]);
    });

    it("encuentra un correo aunque busque en mayuscula", () => {
        const sofia = new Contacto("Sofia", "sofia@ucp.edu.ar");
        const correo = new Correo(sofia, "Parcial del viernes", "Temas:..");
        const correos = [correo];
        const resultado = buscarCorreos(correos, "PARC");
        expect(resultado).toEqual([correo]);
    });

    it("encuentra un correo por su cuerpo", () => {
    const sofia = new Contacto("Sofia", "sofia@ucp.edu.ar");
    const correo = new Correo(sofia, "Aviso", "Hay que entregar el sprint 1");
    const correos = [correo];
    const resultado = buscarCorreos(correos, "entregar");
    expect(resultado).toEqual([correo]);
    });

    it("encuentra un correo por el nombre o la direccion del remitente", () => {
    const sofia = new Contacto("Sofia", "gomez@ucp.edu.ar");
    const correo = new Correo(sofia, "Saludo", "Hola");
    const correos = [correo];
    expect(buscarCorreos(correos, "sofia")).toEqual([correo]);
    expect(buscarCorreos(correos, "gomez")).toEqual([correo]);
    });

});