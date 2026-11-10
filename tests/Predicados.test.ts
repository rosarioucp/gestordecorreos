import {describe, it, expect} from "vitest";
import {Contacto} from "../src/Contacto";
import {Correo} from "../src/Correo";
import {asuntoContiene, cuerpoContiene, enviadoPor, recibidoPor} from "../src/Predicados";

describe("Predicados", () => {
    it("el asunto tiene el texto que se busca", () => {
        const sofia = new Contacto("Sofia", "sofia@ucp.edu.ar");
        const correo1 = new Correo(sofia, "Examen final", "En la primer mesa de diciembre");
        const correo2= new Correo(sofia, "Cumpleaños", "el 20 de octubre");
        const tieneExamen = asuntoContiene("examen");
        expect(tieneExamen(correo1)).toBe(true);
        expect(tieneExamen(correo2)).toBe(false);
    });

    it("el cuerpo tiene el texto que se busca", () => {
        const juan = new Contacto ("Juan", "juan@ucp.edu.ar");
        const correo1 = new Correo(juan, "Entrega sprint 2", "El 11 de noviembre");
        const correo2= new Correo(juan, "Cuota", "Vence en 2 dias");
        const tieneMes = cuerpoContiene ("noviembre");
        expect (tieneMes(correo1)).toBe(true);
        expect (tieneMes(correo2)).toBe(false);
    });

    it("el correo lo mando esta persona", () => {
        const laura = new Contacto("Laura", "laura@ucp.edu.ar");
        const juan = new Contacto("Juan", "juan@ucp.edu.ar");
        const correo1 = new Correo(laura, "Hola", "Texto");
        const correo2= new Correo(juan, "Hola", "Texto");
        const envioLaura = enviadoPor ("laura@ucp.edu.ar");
        expect(envioLaura(correo1)).toBe(true);
        expect(envioLaura(correo2)).toBe(false);
    });

    it("el correo lo recibio esta persona", () =>{
        const sofia = new Contacto("Sofia", "sofia@ucp.edu.ar");
        const laura = new Contacto("Laura", "laura@gmail.com");
        const juan = new Contacto("Juan", "juan@gmail.com");
        const correo1 = new Correo(laura, "Entrega", "Sprint 3")
        const correo2 = new Correo(laura, "Cuota", "Vence el 10")
        
        correo1.agregarDestinatario(sofia);
        correo2.agregarDestinatario(juan);
        const recibeSofia = recibidoPor ("sofia@gmail.com");
        
        expect(recibeSofia(correo1)).toBe(true);
        expect(recibeSofia(correo2)).toBe(false);
    });


});