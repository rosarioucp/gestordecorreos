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


    it("encuentra un correo por el nombre o la direccion de un destinatario", () => {
    const sofia = new Contacto("Sofia", "sgomez@ucp.edu.ar");
    const laura = new Contacto("Laura", "laurarodriguez@gmail.com");
    const ian = new Contacto("Ian", "iperez@gmail.com");

    const correo = new Correo(sofia, "Saludo", "Hola");
    correo.agregarDestinatario(laura);
    correo.agregarDestinatario(ian);
    const correos = [correo];
    expect(buscarCorreos(correos, "ian")).toEqual([correo]);
    expect(buscarCorreos(correos, "rodriguez")).toEqual([correo]);
    });

    it("devuelve cada correo una sola vez aunque coincida en varios campos", () => {
    const sofia = new Contacto("Sofia", "sofia@ucp.edu.ar");
    const correo = new Correo(sofia, "Parcial", "El recuperatorio del parcial es el 21");
    const correos = [correo];
    expect(buscarCorreos(correos, "parcial")).toEqual([correo]);
    });


    it("devuelve una lista vacia si no hay coincidencias o la lista esta vacia", () => {
    const sofia = new Contacto("Sofia", "sofia@ucp.edu.ar");
    const correo = new Correo(sofia, "Parcial", "El recuperatorio del parcial es el 21");
    expect(buscarCorreos([correo], "vacaciones")).toEqual([]);
    expect(buscarCorreos([], "parcial")).toEqual([]);
    });


    it("no modifica los correos originales", () => {
    const sofia = new Contacto("Sofia", "sofia@ucp.edu.ar");
    const correo1 = new Correo(sofia, "Recuperatorio", "Los temas son...");
    const correo2 = new Correo(sofia, "Cumpleaños", "El 20 de octubre");
    const correos = [correo1, correo2];
    buscarCorreos(correos, "Recuperatorio");
    expect(correos).toEqual([correo1, correo2]);
    expect(correo1.asunto).toBe("Recuperatorio");
});
});