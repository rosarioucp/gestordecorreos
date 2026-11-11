import {describe, it, expect} from "vitest";
import {Contacto} from "../src/Contacto";
import {Correo} from "../src/Correo";
import {Filtro} from "../src/Filtro";
import {asuntoContiene} from "../src/Predicados";

describe ("Filtros" ,()=> {
    it("Un filtro tiene un nombre y devuelve correos con su predicado",()=>{
        const milagros = new Contacto ("Milagros", "mila@gmail.com");
        const notas = new Correo (milagros, "Excel", "Notas del parcial");
        const finales  = new Correo (milagros, "final", "la primer mesa es el 1");

        const filtroNotas = new Filtro ("NotasFinales", asuntoContiene("Excel"));
        expect (filtroNotas.nombre).toBe("NotasFinales");
        expect (filtroNotas.aplicar([notas, finales])).toEqual([notas]);




    });






})