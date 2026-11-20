import { describe, it, expect } from "vitest";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";
import { Filtro } from "../src/Filtro";
import { enviadoDesde } from "../src/Predicados";
import { ServidorDeCorreo } from "../src/ServidorDeCorreo";
import { correosDeLaUcp, academicosImportantes, noLeidosEntrega, correosPrioritarios, seguimientoEventos, noLeidos } from "../src/FiltrosPredefinidos";
import {Agenda} from "../src/Agenda";

describe("Escenarios", () => {
    it("Eliminar la copia de Belen conserva los correos de los otros usuarios", () => {
        const servidor = new ServidorDeCorreo();
        const remitente = new Contacto("Fabricio", "fabricio@ucp.edu.ar");
        const belen = new Contacto("Belén", "belen@ucp.edu.ar");
        const ian = new Contacto("Ian", "ian@ucp.edu.ar");
        const gestorFabricio = servidor.registrar(remitente);
        const gestorBelen = servidor.registrar(belen);
        const gestorIan = servidor.registrar(ian);
        const correo = new Correo(remitente, "Parcial", "Es el viernes");
        correo.agregarDestinatario(belen);
        correo.agregarDestinatario(ian);
        servidor.enviar(correo);
        const recibidoBelen = gestorBelen.verEntrada()[0]!;
        const recibidoIan = gestorIan.verEntrada()[0]!;
        gestorBelen.eliminar(recibidoBelen);
        expect(gestorBelen.verEntrada()).toEqual([]);
        expect(gestorBelen.verEliminados()).toEqual([recibidoBelen]);
        expect(gestorIan.verEntrada()).toEqual([recibidoIan]);
        expect(gestorFabricio.verEnviados()).toEqual([correo]);
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

    it("Para seguimiento encuentra los no leidos sobre proyectos o reuniones", () => {
        const liliana = new Contacto("Liliana", "lili@ucp.edu.ar");
        const proyectoSinLeer = new Correo(liliana, "Proyecto final", "Avances");
        const reunionSinLeer = new Correo(liliana, "Reunión de equipo", "El martes");
        const proyectoLeido = new Correo(liliana, "Proyecto final", "Correcciones");
        const cumpleSinLeer = new Correo(liliana, "Cumpleaños", "El 28");
        proyectoLeido.marcarLeido();
        const filtro = seguimientoEventos();
        expect(filtro.aplicar([proyectoSinLeer, reunionSinLeer, proyectoLeido, cumpleSinLeer])).toEqual([proyectoSinLeer, reunionSinLeer]);
        });
    
     it("eliminar un contacto no borra los correos que lo tienen como remitente", () => {
        const agenda = new Agenda();
        const sofia = new Contacto("Sofia", "sofia@gmail.com");
        agenda.agregarContacto(sofia);
        const correo = new Correo(sofia, "Hola", "Nos vemos mañana");
        agenda.eliminarContacto("sofia@gmail.com");
        expect(correo.remitente?.direccion).toBe("sofia@gmail.com");
        });
});