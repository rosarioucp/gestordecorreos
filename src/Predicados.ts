import {Correo} from "./Correo";

export type Predicado = (correo: Correo) => boolean;

export function asuntoContiene(texto: string):Predicado {
    return (correo: Correo) => correo.asunto.toLowerCase().includes(texto.toLowerCase());
}

export function cuerpoContiene(texto: string):Predicado  {
    return (correo: Correo) => correo.cuerpo.toLowerCase().includes(texto.toLowerCase());
}

export function enviadoPor (direccion: string):Predicado {
    return (correo: Correo) => correo.remitente?.direccion === direccion.trim().toLowerCase();
}

export function recibidoPor (direccion:string):Predicado {
    const buscada = direccion.trim().toLowerCase();
    return (correo: Correo) => correo.verDestinatarios().some(destinatario => destinatario.direccion === buscada);
}

export function y(predicado1: Predicado, predicado2: Predicado): Predicado {
    return (correo: Correo) => predicado1(correo) && predicado2(correo);
}