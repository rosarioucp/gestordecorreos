import {describe, it, expect} from "vitest";
import {Contacto} from "../src/Contacto";
import {Correo} from "../src/Correo";
import {asuntoContiene} from "../src/Predicados";

describe("Predicados", () => {
    it("asuntoContiene responde si el asunto incluye el texto", () => {
        const sofia = new Contacto("Sofia", "sofia@ucp.edu.ar");
        const correo1 = new Correo(sofia, "Examen final", "En la primer mesa de diciembre");
        const correo2= new Correo(sofia, "Cumpleaños", "el 20 de octubre");
        const tieneExamen = asuntoContiene("examen");
        expect(tieneExamen(correo1)).toBe(true);
        expect(tieneExamen(correo2)).toBe(false);
    });
});