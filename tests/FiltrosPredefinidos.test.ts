import { describe, it, expect } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { correosDeLaUcp, academicosImportantes, noLeidosEntrega, correosPrioritarios, seguimientoEventos, noLeidos } from "../src/FiltrosPredefinidos";
import { GestorDeCorreos } from "../src/GestorDeCorreos";

describe("Filtros complejos", () => {
    //test correo desde la ucp//
    it("Encuentra los correos enviados desde la UCP", () => {
        const liliana = new Contacto("Liliana", "lili@ucp.edu.ar");
        const diego = new Contacto("Diego", "diego@ucp.edu.ar");
        const juan = new Contacto("Juan", "juan@gmail.com");
        const deLiliana = new Correo(liliana, "Clase", "Mañana no hay clase");
        const deDiego = new Correo(diego, "Apuntes", "Les paso los apuntes");
        const deJuan = new Correo(juan, "Partido", "El sabado jugamos");
        const filtro = correosDeLaUcp();
        expect(filtro.aplicar([deLiliana, deDiego, deJuan])).toEqual([deLiliana, deDiego]);
    });

    //correo desde la ucp y con asunto sobre examen//
    it("Encuentra los correos de examenes enviados desde la UCP", () => {
        const liliana = new Contacto("Liliana", "lili@ucp.edu.ar");
        const juan = new Contacto("Juan", "juan@gmail.com");
        const examenUcp = new Correo(liliana, "Examen de Paradigmas", "Es el lunes");
        const claseUcp = new Correo(liliana, "Clase", "Mañana no hay clase");
        const examenGmail = new Correo(juan, "Examen de manejo", "Turno a las 9");
        const filtro = academicosImportantes();
        expect(filtro.aplicar([examenUcp, claseUcp, examenGmail])).toEqual([examenUcp]);
    });

    //correos NO leidos sobre una entrega//
    it("Encuentra los no leidos que hablan de una entrega", () => {
        const liliana = new Contacto("Liliana", "lili@ucp.edu.ar");
        const entregaSinLeer = new Correo(liliana, "TP", "La entrega es el viernes");
        const entregaLeida = new Correo(liliana, "TP", "La entrega es el lunes");
        const avisoSinLeer = new Correo(liliana, "Aviso", "Mañana no hay clase");
        entregaLeida.marcarLeido();
        const filtro = noLeidosEntrega();
        expect(filtro.aplicar([entregaSinLeer, entregaLeida, avisoSinLeer])).toEqual([entregaSinLeer]);
    });

    it("correosPrioritarios encuentra los favoritos que mando ese contacto", () => {
        const liliana = new Contacto("Liliana", "lili@gmail.com");
        const diego = new Contacto("Diego", "diego@gmail.com");

        const correoLiliana1 = new Correo(liliana, "Viaje", "Pasaje a Colombia");
        const correoDiego1 = new Correo(diego, "Fotos", "Fotos de cumpleaños");
        const correoLiliana2 = new Correo(liliana, "Aviso", "Mañana no hay clase");
        correoLiliana1.marcarFavorito();
        correoDiego1.marcarFavorito();
        const filtro = correosPrioritarios("lili@gmail.com");
        expect(filtro.aplicar([correoLiliana1, correoDiego1, correoLiliana2])).toEqual([correoLiliana1]);
    });

    it("para Seguimiento encuentra los no leidos sobre proyectos o reuniones", () => {
        const liliana = new Contacto("Liliana", "lili@ucp.edu.ar");

        const proyectoSinLeer = new Correo(liliana, "Proyecto final", "Avances");
        const reunionSinLeer = new Correo(liliana, "Reunión de equipo", "El martes");
        const proyectoLeido = new Correo(liliana, "Proyecto final", "Correcciones");
        const cumpleSinLeer = new Correo(liliana, "Cumpleaños", "El 28");
        proyectoLeido.marcarLeido();
        const filtro = seguimientoEventos();
        expect(filtro.aplicar([proyectoSinLeer, reunionSinLeer, proyectoLeido, cumpleSinLeer]))
            .toEqual([proyectoSinLeer, reunionSinLeer]);
    });

    it("noLeidos obtiene los no leidos de una bandeja y refleja los cambios", () => {
        const gestor = new GestorDeCorreos();
        const liliana = new Contacto("Liliana", "lili@ucp.edu.ar");
        const correo1 = new Correo(liliana, "Parcial", "El sabado");
        const correo2 = new Correo(liliana, "Aviso", "No hay clase");
        gestor.recibirCorreo(correo1);
        gestor.recibirCorreo(correo2);
        const filtro = noLeidos();
        expect(filtro.aplicar(gestor.verEntrada())).toEqual([correo1, correo2]);
        correo1.marcarLeido();
        expect(filtro.aplicar(gestor.verEntrada())).toEqual([correo2]);
        correo1.marcarNoLeido();
        expect(filtro.aplicar(gestor.verEntrada())).toEqual([correo1, correo2]);
    });

}); 