import { describe, it, expect } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { Filtro } from "../src/Filtro";
import { asuntoContiene, enviadoDesde } from "../src/Predicados";

describe("Filtros", () => {
    it("Un filtro tiene un nombre y devuelve correos con su predicado", () => {
        const milagros = new Contacto("Milagros", "mila@gmail.com");
        const notas = new Correo(milagros, "Excel", "Notas del parcial");
        const finales = new Correo(milagros, "final", "la primer mesa es el 1");
        const filtroNotas = new Filtro("NotasFinales", asuntoContiene("Excel"));
        expect(filtroNotas.nombre).toBe("NotasFinales");
        expect(filtroNotas.aplicar([notas, finales])).toEqual([notas]);
    });

    it("Un filtro funciona con 100 correos", () => {
        const liliana = new Contacto("Liliana", "lili@ucp.edu.ar");
        const juan = new Contacto("Juan", "juan@gmail.com");
        const deLaUcp = Array.from({ length: 50 }, () => new Correo(liliana, "Aviso", "Correo de la UCP"));
        const deGmail = Array.from({ length: 50 }, () => new Correo(juan, "Mensaje", "Correo de Gmail"));
        const todos = [...deLaUcp, ...deGmail];
        const filtroUcp = new Filtro("Correos de la UCP", enviadoDesde("@ucp.edu.ar"));
        expect(todos).toHaveLength(100);
        expect(filtroUcp.aplicar(todos)).toEqual(deLaUcp);
    });

})