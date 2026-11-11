import { describe, it, expect } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { asuntoContiene, cuerpoContiene, enviadoPor, recibidoPor, y, o, no } from "../src/Predicados";

describe("Predicados", () => {
    //busca el correo por una palabra en el asunto//
    it("el asunto tiene el texto que se busca", () => {
        const sofia = new Contacto("Sofia", "sofia@ucp.edu.ar");
        const correo1 = new Correo(sofia, "Examen final", "En la primer mesa de diciembre");
        const correo2 = new Correo(sofia, "Cumpleaños", "el 20 de octubre");
        const tieneExamen = asuntoContiene("examen");
        expect(tieneExamen(correo1)).toBe(true);
        expect(tieneExamen(correo2)).toBe(false);
    });
    //busca el correo por una palabra en el cuerpo//
    it("el cuerpo tiene el texto que se busca", () => {
        const juan = new Contacto("Juan", "juan@ucp.edu.ar");
        const correo1 = new Correo(juan, "Entrega sprint 2", "El 11 de noviembre");
        const correo2 = new Correo(juan, "Cuota", "Vence en 2 dias");
        const tieneMes = cuerpoContiene("noviembre");
        expect(tieneMes(correo1)).toBe(true);
        expect(tieneMes(correo2)).toBe(false);
    });
    //busca el correo por la persona que lo mando//
    it("el correo lo mando esta persona", () => {
        const laura = new Contacto("Laura", "laura@ucp.edu.ar");
        const juan = new Contacto("Juan", "juan@ucp.edu.ar");
        const correo1 = new Correo(laura, "Hola", "Texto");
        const correo2 = new Correo(juan, "Hola", "Texto");
        const envioLaura = enviadoPor("laura@ucp.edu.ar");
        expect(envioLaura(correo1)).toBe(true);
        expect(envioLaura(correo2)).toBe(false);
    });
    //busca el correo por la persona que lo recibio//
    it("el correo lo recibio esta persona", () => {
        const sofia = new Contacto("Sofia", "sofia@ucp.edu.ar");
        const laura = new Contacto("Laura", "laura@gmail.com");
        const juan = new Contacto("Juan", "juan@gmail.com");
        const correo1 = new Correo(laura, "Entrega", "Sprint 3");
        const correo2 = new Correo(sofia, "Cuota", "Vence el 10");

        correo1.agregarDestinatario(sofia);
        correo2.agregarDestinatario(juan);
        correo2.agregarDestinatario(laura);
        const recibeSofia = recibidoPor("sofia@ucp.edu.ar");
        const destino1 = recibidoPor("juan@gmail.com");
        const destino2 = recibidoPor("laura@gmail.com");

        expect(recibeSofia(correo1)).toBe(true);
        expect(recibeSofia(correo2)).toBe(false);
        expect(destino1(correo2)).toBe(true);
        expect(destino2(correo2)).toBe(true);
    });
});

describe("Combinadores", () => {
    //combinador y//
    it("el combinador y responde true solo si se cumplen los dos predicados", () => {
        const liliana = new Contacto("Liliana", "lili@ucp.edu.ar");
        const diego = new Contacto("Diego", "diego@ucp.edu.ar");
        const parcialLiliana = new Correo(liliana, "Parcial", "El sabado");
        const parcialDiego = new Correo(diego, "Parcial", "El sabado");
        const cumpleLiliana = new Correo(liliana, "Cumpleaños", "El 28");

        const parcialYdeLiliana = y(asuntoContiene("parcial"), enviadoPor("lili@ucp.edu.ar"));

        expect(parcialYdeLiliana(parcialLiliana)).toBe(true);
        expect(parcialYdeLiliana(parcialDiego)).toBe(false);
        expect(parcialYdeLiliana(cumpleLiliana)).toBe(false);

    });

    //combinador o//
    it("el combinador o responde true si se cumple al menos uno de los predicados", () => {
        const liliana = new Contacto("Liliana", "lili@ucp.edu.ar");
        const diego = new Contacto("Diego", "diego@ucp.edu.ar");

        const invitacion = new Correo(liliana, "Cumpleaños", "El 28 en casa");
        const regalo = new Correo(diego, "Llevar", "comprar el regalo");
        const parcial = new Correo(liliana, "Parcial", "El sabado");

        const cumpleORegalo = o(asuntoContiene("cumpleaños"), cuerpoContiene("regalo"));

        expect(cumpleORegalo(invitacion)).toBe(true);
        expect(cumpleORegalo(regalo)).toBe(true);
        expect(cumpleORegalo(parcial)).toBe(false);
    });

    //combinador not//
    it("el combinador no invierte el resultado del predicado", () => {
        const liliana = new Contacto("Liliana", "lili@ucp.edu.ar");
        const diego = new Contacto("Diego", "diego@ucp.edu.ar");

        const deLiliana = new Correo(liliana, "Cumpleaños", "El 28 en casa");
        const deDiego = new Correo(diego, "Llevar", "comprar el regalo");

        const noEnvioLiliana = no(enviadoPor("lili@ucp.edu.ar"));

        expect(noEnvioLiliana(deLiliana)).toBe(false);
        expect(noEnvioLiliana(deDiego)).toBe(true);
    });

});
