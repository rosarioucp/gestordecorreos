import {describe, it, expect} from "vitest";
import {Contacto} from "../src/Contacto";
import {Correo} from "../src/Correo";
import {correosDeLaUcp, academicosImportantes, noLeidosEntrega} from "../src/FiltrosPredefinidos";

describe("Filtros complejos", () => {
    it("correosDeLaUcp encuentra los correos enviados desde la UCP", () => {
        const liliana = new Contacto("Liliana", "lili@ucp.edu.ar");
        const diego = new Contacto("Diego", "diego@ucp.edu.ar");
        const juan = new Contacto("Juan", "juan@gmail.com");
        const deLiliana = new Correo(liliana, "Clase", "Mañana no hay clase");
        const deDiego = new Correo(diego, "Apuntes", "Les paso los apuntes");
        const deJuan = new Correo(juan, "Partido", "El sabado jugamos");
        const filtro = correosDeLaUcp();
        expect(filtro.aplicar([deLiliana, deDiego, deJuan])).toEqual([deLiliana, deDiego]);
    });

    it("academicosImportantes encuentra los examenes enviados desde la UCP", () => {
        const liliana = new Contacto("Liliana", "lili@ucp.edu.ar");
        const juan = new Contacto("Juan", "juan@gmail.com");
        const examenUcp = new Correo(liliana, "Examen de Paradigmas", "Es el lunes");
        const claseUcp = new Correo(liliana, "Clase", "Mañana no hay clase");
        const examenGmail = new Correo(juan, "Examen de manejo", "Turno a las 9");
        const filtro = academicosImportantes();
        expect(filtro.aplicar([examenUcp, claseUcp, examenGmail])).toEqual([examenUcp]);
    });

    it("pendientesDeRevision encuentra los no leidos que hablan de una entrega", () => {
    const liliana = new Contacto("Liliana", "lili@ucp.edu.ar");
    const entregaSinLeer = new Correo(liliana, "TP", "La entrega es el viernes");
    const entregaLeida = new Correo(liliana, "TP", "La entrega es el lunes");
    const avisoSinLeer = new Correo(liliana, "Aviso", "Mañana no hay clase");
    entregaLeida.marcarLeido();
    const filtro = noLeidosEntrega();
    expect(filtro.aplicar([entregaSinLeer, entregaLeida, avisoSinLeer])).toEqual([entregaSinLeer]);
    });


});