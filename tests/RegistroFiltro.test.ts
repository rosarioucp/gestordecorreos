import {describe, it, expect} from "vitest";
import {RegistroFiltros} from "../src/RegistroFiltro";
import {Filtro} from "../src/Filtro";
import {asuntoContiene} from "../src/Predicados";
import {correosDeLaUcp, academicosImportantes, noLeidosEntrega, correosPrioritarios, seguimientoEventos} from "../src/FiltrosPredefinidos";

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
});
