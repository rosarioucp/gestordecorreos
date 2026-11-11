import { Correo } from "./Correo";
import type { Predicado } from "./Predicados";

export class Filtro {
    readonly nombre: string;
    readonly predicado: Predicado;

    constructor(nombre: string, predicado: Predicado) {
        this.nombre = nombre;
        this.predicado = predicado;
    }

    aplicar(correos: Correo[]): Correo[] {
        return correos.filter(correo => this.predicado(correo));
    }
}

