import {Correo} from "./Correo";
import type {Predicado} from "./Predicados";

export function asuntosDe(correos: Correo[]): string[] {
    return correos.map(correo => correo.asunto);
}

export function correosCondicion(correos: Correo[], condicion: Predicado): Correo[] {
    return correos.filter(correo => condicion(correo));
}