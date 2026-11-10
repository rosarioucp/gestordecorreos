import {describe, it, expect} from "vitest";
import {Contacto} from "../src/Contacto";
import {Correo} from "../src/Correo";
import {asuntoContiene} from "../src/Predicados";

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





    
});