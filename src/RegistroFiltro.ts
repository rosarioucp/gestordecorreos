import {Filtro} from "./Filtro";
import {Validacion} from "./Validacion";

export class RegistroFiltros {
    private static readonly LIMITE = 5;
    private _filtros: Filtro[] = [];

    agregarFiltro(filtro: Filtro): void {
        Validacion.validar(this._filtros.length < RegistroFiltros.LIMITE, "No se pueden registrar mas de cinco filtros");
        this._filtros.push(filtro);
    }

    listarFiltros(): Filtro[] {
        return [...this._filtros];
    }
}