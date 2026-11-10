import {Correo} from "./Correo";

export function asuntoContiene(texto: string) {
    return (correo: Correo) => correo.asunto.toLowerCase().includes(texto.toLowerCase());
}

export function cuerpoContiene(texto: string) {
    return (correo: Correo) => correo.cuerpo.toLowerCase().includes(texto.toLowerCase());
}
