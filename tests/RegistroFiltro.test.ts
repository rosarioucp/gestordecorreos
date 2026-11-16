import {describe, it, expect} from "vitest";
import {RegistroFiltros} from "../src/RegistroFiltro";
import {Filtro} from "../src/Filtro";
import {asuntoContiene, recibidoPor} from "../src/Predicados";
import {correosDeLaUcp, academicosImportantes, noLeidosEntrega, correosPrioritarios, seguimientoEventos} from "../src/FiltrosPredefinidos";
import {GestorDeCorreos} from "../src/GestorDeCorreos";
import { Contacto } from "../src/Contacto";
import { Correo } from "../src/Correo";

describe("RegistroFiltros", () => {
    it("registra hasta cinco filtros", () => {
        const registro = new RegistroFiltros();

        registro.agregarFiltro(correosDeLaUcp());
        registro.agregarFiltro(academicosImportantes());
        registro.agregarFiltro(noLeidosEntrega());
        registro.agregarFiltro(correosPrioritarios("lili@ucp.edu.ar"));
        registro.agregarFiltro(seguimientoEventos());

        expect(registro.listarFiltros()).toHaveLength(5);
    });

    it("rechaza un sexto filtro y conserva los cinco anteriores", () => {
        const registro = new RegistroFiltros();
        registro.agregarFiltro(correosDeLaUcp());
        registro.agregarFiltro(academicosImportantes());
        registro.agregarFiltro(noLeidosEntrega());
        registro.agregarFiltro(correosPrioritarios("lili@ucp.edu.ar"));
        registro.agregarFiltro(seguimientoEventos());

        const sexto = new Filtro("Examenes", asuntoContiene("examen"));

        expect(() => registro.agregarFiltro(sexto)).toThrow();
        expect(registro.listarFiltros()).toHaveLength(5);
    });

    //test de el mismo filtro en distintas bandejas//
    it("el mismo filtro se puede aplicar a distintas bandejas del gestor", () => {
    const gestor = new GestorDeCorreos();
    const liliana = new Contacto("Liliana", "lili@ucp.edu.ar");
    const diego = new Contacto("Diego", "diego@ucp.edu.ar");
    const parcialRecibido = new Correo(diego, "Parcial de Paradigmas", "El sabado");
    const avisoRecibido = new Correo(diego, "Aviso", "No hay clase");
    gestor.recibirCorreo(parcialRecibido);
    gestor.recibirCorreo(avisoRecibido);
    const parcialEnviado = new Correo(liliana, "Parcial de Fisica", "El lunes");
    parcialEnviado.agregarDestinatario(diego);
    gestor.enviar(parcialEnviado);
    const filtroParciales = new Filtro("Parciales", asuntoContiene("parcial"));
    expect(filtroParciales.aplicar(gestor.verEntrada())).toEqual([parcialRecibido]);
    expect(filtroParciales.aplicar(gestor.verEnviados())).toEqual([parcialEnviado]);
    });

    //filtro de cambios//
    it("el filtro refleja los cambios en los correos sin volver a guardarlos", () => {
    const gestor = new GestorDeCorreos();
    const liliana = new Contacto("Liliana", "lili@ucp.edu.ar");
    const ian = new Contacto("Ian", "ian@gmail.com");

    const borrador = new Correo(liliana, "Hola", "Texto");
    gestor.guardarBorrador(borrador);

    const paraIan = new Filtro("Para Ian", recibidoPor("ian@gmail.com"));

    expect(paraIan.aplicar(gestor.verBorradores())).toEqual([]);

    borrador.agregarDestinatario(ian);

    expect(paraIan.aplicar(gestor.verBorradores())).toEqual([borrador]);
    });
});