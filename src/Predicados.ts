import { Correo } from "./Correo";

export type Predicado = (correo: Correo) => boolean;

//predicados simples//
export function asuntoContiene(texto: string): Predicado {
    return (correo: Correo) => correo.asunto.toLowerCase().includes(texto.toLowerCase());
}

export function cuerpoContiene(texto: string): Predicado {
    return (correo: Correo) => correo.cuerpo.toLowerCase().includes(texto.toLowerCase());
}

export function enviadoPor(direccion: string): Predicado {
    return (correo: Correo) => correo.remitente?.direccion === direccion.trim().toLowerCase();
}

export function recibidoPor(direccion: string): Predicado {
    const buscada = direccion.trim().toLowerCase();
    return (correo: Correo) => correo.verDestinatarios().some(destinatario => destinatario.direccion === buscada);
}

//operadores and, or, not//

export function y(predicado1: Predicado, predicado2: Predicado): Predicado {
    return (correo: Correo) => predicado1(correo) && predicado2(correo);
}

export function o(predicado1: Predicado, predicado2: Predicado): Predicado {
    return (correo: Correo) => predicado1(correo) || predicado2(correo);
}

export function no(predicado: Predicado): Predicado {
    return (correo: Correo) => !predicado(correo);
}